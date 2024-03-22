import SparkleIcon from "./sparkleIcon";

export default function DemoSection() {
  return (
    <section className="flex justify-around mt-12 items-center">
      <div className="bg-gray-800/50 w-[240px] h-[480px] rounded-xl"></div>
      <div>
        <SparkleIcon />
      </div>
      <div className="bg-gray-800/50 w-[240px] h-[480px] rounded-xl"></div>
    </section>
  );
}
