import { Capacitor, registerPlugin } from "@capacitor/core";
import { Directory, Filesystem } from "@capacitor/filesystem";

export type ShortPhoto = { imagePath: string; src: string };
const Share = registerPlugin<{ share(options: { files: string[] }): Promise<unknown> }>("Share");

export const SHORT_LIMIT = 12;
export const PHOTO_SECONDS = 2;
const WIDTH = 720;
const HEIGHT = 1280;
const FPS = 24;
const FORMATS = ["video/mp4", "video/webm;codecs=vp8", "video/webm"];

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("写真を読み込めませんでした。"));
    image.src = src;
  });
}

function createCanvas() {
  const canvas = document.createElement("canvas");
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  const context = canvas.getContext("2d", { alpha: false });
  if (!context) throw new Error("動画の描画を開始できませんでした。");
  return { canvas, context };
}

async function makeFrame(photo: ShortPhoto) {
  let src = photo.src;
  if (Capacitor.isNativePlatform()) {
    const { data } = await Filesystem.readFile({ path: photo.imagePath, directory: Directory.Data });
    if (typeof data !== "string") throw new Error("写真を読み込めませんでした。");
    src = `data:image/jpeg;base64,${data}`;
  }
  const image = await loadImage(src);
  const { canvas, context } = createCanvas();
  const fit = Math.min(WIDTH / image.naturalWidth, HEIGHT / image.naturalHeight);
  const width = image.naturalWidth * fit;
  const height = image.naturalHeight * fit;
  context.fillStyle = "#162822";
  context.fillRect(0, 0, WIDTH, HEIGHT);
  context.drawImage(image, (WIDTH - width) / 2, (HEIGHT - height) / 2, width, height);
  return canvas;
}

export async function createLandscapeShort(
  photos: ShortPhoto[],
  signal: AbortSignal,
  onProgress: (index: number) => void,
) {
  if (photos.length < 2 || photos.length > SHORT_LIMIT) throw new Error("写真を2〜12枚選んでください。");
  const { canvas, context } = createCanvas();
  if (typeof MediaRecorder === "undefined" || !canvas.captureStream) {
    throw new Error("この端末では動画を書き出せません。");
  }
  const mimeType = FORMATS.find((format) => MediaRecorder.isTypeSupported(format));
  if (!mimeType) throw new Error("この端末では使える動画形式がありません。");

  const frames: HTMLCanvasElement[] = [];
  for (const photo of photos) {
    signal.throwIfAborted();
    frames.push(await makeFrame(photo));
  }
  signal.throwIfAborted();

  const stream = canvas.captureStream(FPS);
  try {
    const recorder = new MediaRecorder(stream, { mimeType, videoBitsPerSecond: 3_000_000 });
    const blob = await new Promise<Blob>((resolve, reject) => {
      const chunks: Blob[] = [];
      let tickId = 0;
      let started: number | undefined;
      let lastIndex = -1;

      function cleanup() {
        cancelAnimationFrame(tickId);
        signal.removeEventListener("abort", abort);
        document.removeEventListener("visibilitychange", checkVisibility);
      }
      function fail(error: unknown) {
        cleanup();
        if (recorder.state !== "inactive") recorder.stop();
        reject(error);
      }
      function abort() {
        fail(new DOMException("中断", "AbortError"));
      }
      function checkVisibility() {
        if (document.hidden) fail(new Error("画面を開いたままもう一度作成してください。"));
      }

      recorder.ondataavailable = (event) => {
        if (event.data.size) chunks.push(event.data);
      };
      recorder.onerror = () => fail(new Error("動画の書き出しに失敗しました。"));
      recorder.onstop = () => {
        cleanup();
        if (!chunks.length) {
          reject(new Error("動画を書き出せませんでした。"));
          return;
        }
        const type = (chunks[0].type || recorder.mimeType || mimeType).split(";")[0];
        resolve(new Blob(chunks, { type }));
      };

      function frame(now: number) {
        started ??= now;
        const index = Math.floor((now - started) / (PHOTO_SECONDS * 1000));
        if (index >= frames.length) {
          recorder.stop();
          return;
        }
        if (index !== lastIndex) {
          onProgress(index + 1);
          lastIndex = index;
        }
        context.drawImage(frames[index], 0, 0);
        tickId = requestAnimationFrame(frame);
      }

      try {
        context.drawImage(frames[0], 0, 0);
        recorder.start();
        signal.addEventListener("abort", abort, { once: true });
        document.addEventListener("visibilitychange", checkVisibility);
        tickId = requestAnimationFrame(frame);
        checkVisibility();
      } catch (error) {
        fail(error);
      }
    });
    const extension = blob.type === "video/mp4" ? "mp4" : "webm";
    return new File([blob], `miyamu-travel-${Date.now()}.${extension}`, { type: blob.type });
  } finally {
    stream.getTracks().forEach((track) => track.stop());
  }
}

function readBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(reader.error);
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result.split(",")[1] : "";
      if (result) resolve(result);
      else reject(new Error("共有用ファイルを作れませんでした。"));
    };
    reader.readAsDataURL(file);
  });
}

export async function shareLandscapeShort(file: File) {
  if (Capacitor.isNativePlatform()) {
    const path = `travel-shorts/${file.name}`;
    const saved = await Filesystem.writeFile({
      path,
      directory: Directory.Cache,
      data: await readBase64(file),
      recursive: true,
    });
    try {
      await Share.share({ files: [saved.uri] });
    } finally {
      await Filesystem.deleteFile({ path, directory: Directory.Cache }).catch(() => {});
    }
    return;
  }

  if (navigator.canShare?.({ files: [file] })) {
    await navigator.share({ files: [file] });
    return;
  }
  throw new Error("このブラウザではファイル共有を使えません。「動画を保存」を使ってください。");
}
