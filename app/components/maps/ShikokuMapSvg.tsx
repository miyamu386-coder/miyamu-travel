type Props = {
  onSelectPrefecture: (
    prefectureId: string
  ) => void;
};

export default function ShikokuMapSvg({
  onSelectPrefecture,
}: Props) {
  return (
    <div className="region-map">
      <h3>四国地方</h3>
    </div>
  );
}