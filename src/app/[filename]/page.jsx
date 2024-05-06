"use client";
import ResultVideo from "../../components/ResultVideo";
import TranscriptionEditor from "../../components/TranscriptionEditor";
import { clearTranscriptionItems } from "../../libs/awsTranscriptionHelper";
import axios from "axios";
import { useEffect, useState } from "react";

export default function FilePage({ params }) {
  const filename = params.filename;
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [isFetchingInfo, setIsFetchingInfo] = useState(false);
  const [awsTranscriptionItems, setAwsTranscriptionItems] = useState([]);

  useEffect(() => {
    getTranscription();
  }, [filename]);

  function getTranscription() {
    setIsFetchingInfo(true);
    axios.get("/api/transcribe?filename=" + filename).then((response) => {
      setIsFetchingInfo(false);
      const status = response.data?.status;
      const transcription = response.data?.transcription;
      if (status === "IN_PROGRESS") {
        setIsTranscribing(true);
        setTimeout(getTranscription, 3000);
      } else {
        setIsTranscribing(false);
        console.log(transcription);
        setAwsTranscriptionItems(
          clearTranscriptionItems(transcription.results.items)
        );
      }
    });
  }

  if (isTranscribing) {
    return <div className="flex flex-col justify-center items-center ">
       <div className="text-center py-10 text-2xl">Transcribing your video...</div>
       {/* <img className="justify-cnter" width={44} src="/giphy.gif" alt="" /> */}
    </div>;
  }

  if (isFetchingInfo) {
    return <div className="text-center py-10 text-2xl">Fetching information...</div>;
  }

  async function postVideo(e) {
    e.preventDefault();
    const videoUrl =
      "https://ganesh-epic-captions.s3.amazonaws.com/" + filename;
    await axios.post("/api/setVideos", { videoUrl });
  }

  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-8 sm:gap-16 p-10">
        <div className="">
          <h2 className="text-2xl m-4 text-center text-white">Transcription</h2>
          <TranscriptionEditor
            awsTranscriptionItems={awsTranscriptionItems}
            setAwsTranscriptionItems={setAwsTranscriptionItems}
          />
        </div>
        <div className="w-full">
          <h2 className="text-2xl text-center m-4 text-white">Result</h2>
          <ResultVideo
            filename={filename}
            transcriptionItems={awsTranscriptionItems}
          />
          <button
            className="bg-green-600 mx-5 mt-5 py-2 px-6 rounded-full inline-flex gap-2 border-2 border-purple-700/50 cursor-pointer"
            onClick={postVideo}
          >
            Save this video for future
          </button>
        </div>
      </div>
    </div>
  );
}
