import React, { useState } from "react";
import UploadArea from "./components/UploadArea";
import { analyzeImage } from "./utils/clarifaiApi";
import Recommendations from "./components/Recommendations";

function App() {
  const [imageURL, setImageURL] = useState(null);
  const [concepts, setConcepts] = useState([]);  // default empty array
  const [colors, setColors] = useState([]);      // default empty array
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleImage(imgUrl, base64) {
    setImageURL(imgUrl);
    setLoading(true);
    setError(null);

    try {
      const result = await analyzeImage(base64);
      setLoading(false);
      if (result) {
        setConcepts(result.concepts || []);
        setColors(result.colors || []);
      } else {
        setError("No data returned from AI");
      }
    } catch (err) {
      console.error("Error analyzing image:", err);
      setLoading(false);
      setError("Failed to analyze image");
    }
  }

  return (
    <div style={{ maxWidth: 900, margin: "40px auto", padding: 20 }}>
      <h1 style={{ textAlign: "center" }}>StyleSnap — AI Outfit Recommender</h1>

      <UploadArea onImageSelected={handleImage} />

      {loading && <p style={{ textAlign: "center", marginTop: 20 }}>Analyzing image... ⏳</p>}
      {error && <p style={{ textAlign: "center", color: "red" }}>{error}</p>}

      {imageURL && !loading && (
        <div style={{ marginTop: 20, textAlign: "center" }}>
          <img
            src={imageURL}
            alt="Uploaded outfit"
            style={{ maxWidth: "60%", borderRadius: 10 }}
          />

          <h3>AI Detected Concepts:</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {(concepts || []).map((c, i) => (
              <li key={i}>
                {c.name} ({(c.value * 100).toFixed(1)}%)
              </li>
            ))}
          </ul>

          <h3>Dominant Colors:</h3>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 10,
              flexWrap: "wrap",
            }}
          >
            {(colors || []).map((col, i) => (
              <div
                key={i}
                style={{
                  width: 40,
                  height: 40,
                  background: col.raw_hex,
                  border: "1px solid #ccc",
                }}
                title={col.raw_hex}
              ></div>
            ))}
          </div>

          <Recommendations
            dominantColor={colors[0]?.raw_hex}
            products={[]}
          />
        </div>
      )}
    </div>
  );
}

export default App;
