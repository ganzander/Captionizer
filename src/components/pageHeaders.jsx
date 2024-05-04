export default function PageHeaders(props) {
  return (
    <section className="text-center mt-24 mb-8">
      <h1 className="text-3xl" style={{ textShadow: "3px 3px 0 black" }}>
        {/* Add epic captions to your videos */}
        {props.h1Text}
      </h1>
      <h2 className="text-white/75">
        {/* Just add your video and we will do the rest */}
        {props.h2Text}
      </h2>
    </section>
  );
}
