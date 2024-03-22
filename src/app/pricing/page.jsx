import PageHeaders from "../components/pageHeaders";

export default function Pricing() {
  return (
    <div>
      <PageHeaders
        h1Text={"Check Out Our Pricing"}
        h2Text={"Our Pricing Is Very Good"}
      />
      <div className="bg-white text-slate-700 rounded-lg max-w-sm mx-auto p-4 text-center">
        <h3 className="font-bold text-3xl">Free</h3>
        <h4>Free Forever</h4>
      </div>
    </div>
  );
}
