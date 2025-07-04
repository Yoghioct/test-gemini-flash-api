# Gemini Flash API

A powerful Node.js API service that leverages Google's Gemini 1.5 Flash model to provide text generation, image analysis, document processing, and audio transcription capabilities.

## Features

- 🤖 Text Generation: Generate text responses using Gemini's advanced language model
- 🖼️ Image Analysis: Analyze and describe images with multimodal capabilities
- 📄 Document Processing: Process and analyze document contents
- 🎵 Audio Transcription: Transcribe and analyze audio files

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Google Cloud API Key with Gemini API access

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/gemini-flash-api.git
cd gemini-flash-api
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your Gemini API key:
```env
GEMINI_API_KEY=your_api_key_here
PORT=3000
```

## Usage

Start the server:
```bash
npm start
```

The API will be available at `http://localhost:3000`

### API Endpoints

#### 1. Text Generation
```http
POST /generate-text
Content-Type: application/json

{
    "prompt": "Your text prompt here"
}
```

#### 2. Image Analysis
```http
POST /generate-from-image
Content-Type: multipart/form-data

image: [image file]
prompt: "Optional prompt for image analysis"
```

#### 3. Document Processing
```http
POST /generate-from-document
Content-Type: multipart/form-data

document: [document file]
```

#### 4. Audio Transcription
```http
POST /generate-from-audio
Content-Type: multipart/form-data

audio: [audio file]
```

## Response Format

All endpoints return JSON responses in the following format:
```json
{
    "output": "Generated or analyzed content"
}
```

## Error Handling

The API returns appropriate HTTP status codes and error messages:
- 200: Successful request
- 500: Server error with detailed message

## Security

- API key is stored in environment variables
- Temporary files are automatically cleaned up after processing
- Input validation and sanitization are implemented

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Google Gemini AI for providing the powerful AI model
- Express.js for the web framework
- Multer for file upload handling 