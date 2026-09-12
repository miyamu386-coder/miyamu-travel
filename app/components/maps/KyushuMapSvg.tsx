type Props = {
  onSelectPrefecture: (
    prefectureId: string
  ) => void;
};

export default function KyushuMapSvg({
  onSelectPrefecture,
}: Props) {
  return (
    <div className="region-map">
      <h3>九州・沖縄地方</h3>
    </div>
  );
}