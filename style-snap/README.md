# StyleSnap — AI Outfit Recommender

StyleSnap is an AI-powered web application that analyzes your outfit image using **Clarifai’s Machine Learning API** to detect **fashion attributes** and **dominant colors**.  
It then displays the predicted concepts (like “fashion”, “casual”, “elegant”) and visual color palette extracted from your image.

---

## 🚀 Tech Stack

**Frontend:** React.js  
**Backend:** Node.js + Express.js  
**AI Model:** Clarifai API (General Image Recognition + Color Recognition)  
**Other Tools:** Axios, browser-image-compression, CORS  

---

## 🎯 Project Overview

The goal of this project is to build a real-world AI application using modern frontend and backend technologies.  
Users can upload any fashion/outfit photo, and the system automatically:

1. Compresses and processes the image on the frontend  
2. Sends it to the backend (Node.js server)  
3. Backend calls Clarifai AI models to:
   - Detect **fashion concepts** (tags like “man”, “casual”, “elegant”)
   - Extract **dominant colors** from the outfit  
4. Displays the AI-generated insights on the screen

---

## 🧠 How It Works

| Step | Description |
|------|--------------|
| 🖼️ **Upload Image** | User uploads an outfit photo (JPG/PNG) |
| ⚙️ **Frontend Compression** | Image is compressed using `browser-image-compression` |
| 🔗 **Backend API Call** | The Base64 image is sent to the Node.js backend |
| 🤖 **AI Processing (Clarifai)** | Two Clarifai models analyze the image: <br>• `general-image-recognition` → fashion-related tags <br>• `color-recognition` → dominant color palette |
| 🎨 **Results Displayed** | Detected concepts & colors appear beautifully on the web UI |

---

## 💻 Features

- ✅ AI-powered fashion concept detection  
- ✅ Dominant color palette extraction  
- ✅ React frontend + Node backend architecture  
- ✅ Real-time results display  
- ✅ Responsive and clean UI  
- ✅ Secure backend API (no CORS or key exposure issues)