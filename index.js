// index.js
const express = require('express');
const dotenv = require('dotenv');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { GoogleGenerativeAI, imageToGenerativePart } = require('@google/generative-ai');


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Inisialisasi Gemini 1.5 Flash
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'models/gemini-1.5-flash' });

// Konfigurasi Multer untuk upload file
const upload = multer({ dest: 'uploads/' });


app.post('/generate-text', async (req, res) => {
  const { prompt } = req.body;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    res.json({ output: response.text() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route penting!
app.post('/api/chat', async (req, res) => {
  const userMessage = req.body.message;

  if (!userMessage) {
    return res.status(400).json({ reply: "Message is required." });
  }

  try {
    const result = await model.generateContent(userMessage);
    const response = await result.response;
    const text = response.text();

    res.json({ reply: text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "Something went wrong." });
  }
});


app.post('/generate-from-image', upload.single('image'), async (req, res) => {
  const prompt = req.body.prompt || 'Describe the image';

  try {
    // Baca file gambar
    const imgBuffer = fs.readFileSync(req.file.path);
    const imgPart = imageToGenerativePart({
      mimeType: req.file.mimetype,
      data: imgBuffer
    });

    // Panggil Gemini dengan multimodal input
    const result = await model.generateContent([prompt, imgPart]);
    const response = await result.response;
    res.json({ output: response.text() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    // Hapus file sementara
    fs.unlinkSync(req.file.path);
  }
});

app.post('/generate-from-document', upload.single('document'), async (req, res) => {
  try {
    const docBuffer = fs.readFileSync(req.file.path);
    const base64Data = docBuffer.toString('base64');
    const docPart = {
      inline: {
        mimeType: req.file.mimetype,
        data: base64Data
      }
    };

    const result = await model.generateContent(['Analyze this document:', docPart]);
    const response = await result.response;
    res.json({ output: response.text() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    fs.unlinkSync(req.file.path);
  }
});

app.post('/generate-from-audio', upload.single('audio'), async (req, res) => {
  try {
    const audioBuffer = fs.readFileSync(req.file.path);
    const base64Data = audioBuffer.toString('base64');
    const audioPart = {
      inline: {
        mimeType: req.file.mimetype,
        data: base64Data
      }
    };

    const result = await model.generateContent(['Transcribe or analyze the following audio:', audioPart]);
    const response = await result.response;
    res.json({ output: response.text() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    fs.unlinkSync(req.file.path);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Gemini API server is running at http://localhost:${PORT}`);
});
