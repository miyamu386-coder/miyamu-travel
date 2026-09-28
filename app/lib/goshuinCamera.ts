import {
  Camera,
  CameraResultType,
  CameraSource,
} from "@capacitor/camera";

/**
 * カメラで御朱印を撮影
 */
export async function takeGoshuinPhoto(): Promise<
  string | null
> {
  try {
    const photo = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
      correctOrientation: true,
    });

    return photo.dataUrl ?? null;
  } catch (error) {
    console.log(
      "御朱印カメラ撮影をキャンセル、または失敗:",
      error,
    );

    return null;
  }
}

/**
 * 写真ライブラリから御朱印画像を選択
 */
export async function pickGoshuinPhoto(): Promise<
  string | null
> {
  try {
    const photo = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Photos,
      correctOrientation: true,
    });

    return photo.dataUrl ?? null;
  } catch (error) {
    console.log(
      "御朱印画像の選択をキャンセル、または失敗:",
      error,
    );

    return null;
  }
}