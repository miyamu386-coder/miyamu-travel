type Props = {
  onSelectPrefecture: (
    prefectureId: string
  ) => void;
};

export default function ChugokuMapSvg({
  onSelectPrefecture,
}: Props) {
  return (
    <div className="region-map">
      <h3>中国地方</h3>
    </div>
  );
}