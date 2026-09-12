type Props = {
  onSelectPrefecture: (
    prefectureId: string
  ) => void;
};

export default function ChubuMapSvg({
  onSelectPrefecture,
}: Props) {
  return (
    <div className="region-map">
      <h3>中部地方</h3>
    </div>
  );
}