import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// ✅ Clarifai credentials
const PAT = "b10e0c4baa264ef38ff4c3bda242014d"; // your Clarifai API key
const USER_ID = "hemanthm31"; // from URL
const APP_ID = "StyleSnapAI"; // from URL

// ✅ Model IDs
const GENERAL_MODEL_ID = "general-image-recognition";
const GENERAL_MODEL_VERSION_ID = "aa7f35c01e0642fda5cf400f543e7c40";
const COLOR_MODEL_ID = "color-recognition";
const COLOR_MODEL_VERSION_ID = "dd9458324b4b45c2be1a7ba84d27cd04";

app.post("/analyze", async (req, res) => {
  const { base64 } = req.body;

  if (!base64 || base64.length < 100) {
    return res.status(400).json({ error: "Invalid or empty image data" });
  }

  try {
    // 🔹 1. General image recognition (concepts)
    const generalResponse = await axios.post(
      `https://api.clarifai.com/v2/models/${GENERAL_MODEL_ID}/versions/${GENERAL_MODEL_VERSION_ID}/outputs`,
      {
        user_app_id: {
          user_id: USER_ID,
          app_id: APP_ID,
        },
        inputs: [
          {
            data: {
              image: { base64 },
            },
          },
        ],
      },
      {
        headers: {
          Authorization: `Key ${PAT}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    const concepts =
      generalResponse.data.outputs[0].data.concepts || [];

    // 🔹 2. Color recognition (dominant colors)
    const colorResponse = await axios.post(
      `https://api.clarifai.com/v2/models/${COLOR_MODEL_ID}/versions/${COLOR_MODEL_VERSION_ID}/outputs`,
      {
        user_app_id: {
          user_id: USER_ID,
          app_id: APP_ID,
        },
        inputs: [
          {
            data: {
              image: { base64 },
            },
          },
        ],
      },
      {
        headers: {
          Authorization: `Key ${PAT}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    const colors =
      colorResponse.data.outputs[0].data.colors || [];

    // ✅ Send both AI results to frontend
    res.json({ concepts, colors });
  } catch (error) {
    console.error(
      "Clarifai API Error:",
      error.response?.data || error.message
    );
    res.status(500).json({
      error: "Clarifai API request failed",
      details: error.response?.data || error.message,
    });
  }
});

app.listen(5000, () =>
  console.log("✅ Server running on http://localhost:5000")
);
