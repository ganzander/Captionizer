import SparkleIcon from "./sparkleIcon";

export default function DemoSection() {
  return (
    <section className="flex justify-center gap-10 m-8 sm:mt-12 items-center">
      <div className="hidden sm:block bg-gray-800/50 w-[240px] rounded-xl overflow-hidden">
        <video
          src="https://dawid-epic-captions.s3.us-east-1.amazonaws.com/without-captions.mp4"
          preload="true"
          muted
          autoPlay
          loop
        ></video>
      </div>
      <div className="hidden sm:block">
        <SparkleIcon />
      </div>
      <div className="bg-gray-800/50 w-[240px] rounded-xl overflow-hidden">
        <video
          src="https://dawid-epic-captions.s3.us-east-1.amazonaws.com/with-captions.mp4"
          preload="true"
          muted
          autoPlay
          loop
        ></video>
      </div>
    </section>
  );
}
