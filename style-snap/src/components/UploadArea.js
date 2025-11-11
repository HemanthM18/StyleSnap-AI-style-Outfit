import React, { useRef } from "react";
import imageCompression from "browser-image-compression";

export default function UploadArea({ onImageSelected }) {
  const fileRef = useRef();

  async function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;

    try {
      // Compress image before converting to Base64
      const options = {
        maxSizeMB: 1,              // Max size of 1MB after compression
        maxWidthOrHeight: 800,     // Resize image to 800px if larger
        useWebWorker: true         // Use Web Workers for faster compression
      };

      const compressedFile = await imageCompression(file, options);

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result.split(",")[1];
        onImageSelected(URL.createObjectURL(compressedFile), base64);
      };
      reader.readAsDataURL(compressedFile);
    } catch (error) {
      console.error("Image compression failed:", error);
    }
  }

  return (
    <div
      style={{
        border: "2px dashed #ccc",
        padding: 20,
        textAlign: "center",
        borderRadius: 8,
      }}
    >
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        onChange={handleFile}
        style={{ display: "none" }}
      />
      <button
        onClick={() => fileRef.current.click()}
        style={{
          padding: "8px 12px",
          cursor: "pointer",
          borderRadius: 6,
          background: "#2563eb",
          color: "#fff",
          border: "none",
        }}
      >
        Upload Outfit Image
      </button>
      <p style={{ marginTop: 10, color: "#666" }}>
        Upload a photo of your outfit (jpg/png)
      </p>
    </div>
  );
}
