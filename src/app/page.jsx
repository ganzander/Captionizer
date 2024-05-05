import "./globals.css";
import DemoSection from "../components/demoSection";
import PageHeaders from "../components/pageHeaders";
import UploadForm from "../components/uploadForm";

export default function Home() {
  return (
    <div className="items-center">
      <PageHeaders
        h1Text="Add epic captions to your videos"
        h2Text="Just add your video and we will do the rest"
      />
      <div className="flex justify-center">
        <UploadForm />
      </div>
      <DemoSection />
    </div>
  );
}
