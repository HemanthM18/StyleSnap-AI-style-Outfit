import axios from "axios";

export async function analyzeImage(base64Data) {
  try {
    const response = await axios.post("http://localhost:5000/analyze", {
      base64: base64Data,
    });
    return response.data;
  } catch (error) {
    console.error("Clarifai API Error:", error);
    return null;
  }
}
