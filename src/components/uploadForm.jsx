"use client";
import axios from "axios";
import UploadIcon from "./uploadIcon";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UploadForm() {
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();
  async function upLoad(e) {
    e.preventDefault();
    const files = e.target.files;
    if (files.length > 0) {
      const file = files[0];
      setIsUploading(true);
      const res = await axios.postForm("/api/upload", {
        file,
      });
      setIsUploading(false);
      console.log(res.data);
      const newName = res.data.newName;
      router.push("/" + newName);
    }
  }

  return (
    <>
      {isUploading && (
        <div className="bg-black/90 text-white fixed inset-0 flex items-center">
          <div className="w-full text-center">
            <h2 className="text-4xl mb-4">Uploading</h2>
            <h3 className="text-xl">Please Wait</h3>
          </div>
        </div>
      )}
      <label className="flex gap-2 bg-white text-purple-500 py-2 px-6 rounded-full border-2 border-purple-700/50 cursor-pointer">
        <UploadIcon />
        <span>Choose files</span>
        <input onChange={upLoad} type="file" className="hidden" />
      </label>
    </>
  );
}
