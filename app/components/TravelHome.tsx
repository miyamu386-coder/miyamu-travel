import JapanMap from "./JapanMap";

export default function TravelHome() {
  return (
    <section className="travel-home">
      <header className="travel-header">
        <h1>みやむTravel</h1>
        <p>モフ太郎と、日本を旅しよう。</p>
      </header>

      <JapanMap />
    </section>
  );
}