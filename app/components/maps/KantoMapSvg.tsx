type Props = {
  onSelectPrefecture: (prefectureId: string) => void;
};

const prefectures = [
  { id: "ibaraki", name: "茨城県" },
  { id: "tochigi", name: "栃木県" },
  { id: "gunma", name: "群馬県" },
  { id: "saitama", name: "埼玉県" },
  { id: "chiba", name: "千葉県" },
  { id: "tokyo", name: "東京都" },
  { id: "kanagawa", name: "神奈川県" },
];

export default function KantoMapSvg({
  onSelectPrefecture,
}: Props) {
  return (
    <div className="region-map">
      <h3>関東地方</h3>

      <div className="prefecture-buttons">
        {prefectures.map((prefecture) => (
          <button
            key={prefecture.id}
            className="prefecture-button"
            onClick={() =>
              onSelectPrefecture(prefecture.id)
            }
          >
            {prefecture.name}
          </button>
        ))}
      </div>
    </div>
  );
}