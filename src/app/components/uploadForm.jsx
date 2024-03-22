"use client";
import UploadIcon from "./uploadIcon";
export default function UploadForm() {
  function upLoad(e) {
    e.preventDefault();
    console.log(e);
    const files = e.target.files;
    if (files.length > 0) {
      const file = files[0];
    }
  }

  return (
    <label className="flex gap-2 bg-green-600 py-2 px-6 rounded-full border-2 border-purple-700/50 cursor-pointer">
      <UploadIcon />
      <span>Choose files</span>
      <input onChange={upLoad} type="file" className="hidden" />
    </label>
  );
}
