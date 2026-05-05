const express = require("express");
const multer = require("multer");
const axios = require("axios");
const path = require("path");
const cors = require("cors");

const app = express();
const upload = multer({ dest: "uploads/" }); // upload folder

app.use(cors()); // allow frontend to access
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // serve files

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Route to handle file uploads
app.post("/api/process-doc", upload.single("file"), async (req, res) => {
  try {
    const fileUrl = `http://localhost:5000/uploads/${req.file.filename}`;

    // Post to your n8n production webhook
    const n8nResponse = await axios.post(
      "http://localhost:5678/webhook/check-job-offer", // <--- replace this
      {
        type: "file",
        content: fileUrl
      },
      {
        headers: { "Content-Type": "application/json" }
      }
    );

    res.json(n8nResponse.data);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "Failed to process document." });
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
