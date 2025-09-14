# RAG-Powered News Chatbot Frontend

A modern React frontend for a RAG-powered news chatbot built for Voosh assignment. This application allows users to ask questions about recent news and get AI-powered responses based on a curated news corpus.

## 🚀 Live Demo

- **Frontend**: [Deployed on Vercel](https://your-vercel-app.vercel.app)
- **Backend**: [Deployed on Render](https://chatbot-backend-yrvu.onrender.com)

## ✨ Features

- 💬 Interactive chat interface with real-time messaging
- 🔄 Session management with reset functionality
- 📱 Responsive design with modern UI/UX
- ⚡ Fast loading with optimized performance
- 🎨 Beautiful SCSS styling
- 🔍 Source attribution for news articles
- 📊 Loading states and error handling

## 🛠️ Tech Stack

- **Frontend**: React 19.1.1, SCSS, Axios
- **Backend**: Node.js, Express.js, Redis
- **AI/ML**: Jina Embeddings, Google Gemini API
- **Deployment**: Vercel (Frontend), Render (Backend)

## 🚀 Quick Start

### Prerequisites

- Node.js 16+
- npm or yarn
- Backend API running (see backend repository)

### Installation

1. Clone the repository:

```bash
git clone <your-frontend-repo-url>
cd chatbot_frontend
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
# Create .env.local file
echo "REACT_APP_API_URL=http://localhost:8000/api" > .env.local
```

4. Start the development server:

```bash
npm start
```

5. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 📦 Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (one-way operation)

## 🌐 Deployment on Vercel

### Automatic Deployment

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variable in Vercel dashboard:
   - `REACT_APP_API_URL` = `https://chatbot-backend-yrvu.onrender.com/api`
4. Deploy!

### Manual Deployment

1. Build the project:

```bash
npm run build
```

2. Install Vercel CLI:

```bash
npm i -g vercel
```

3. Deploy:

```bash
vercel --prod
```

## 🔧 Environment Variables

| Variable            | Description     | Default                     |
| ------------------- | --------------- | --------------------------- |
| `REACT_APP_API_URL` | Backend API URL | `http://localhost:8000/api` |

## 📱 Usage

1. **Start a conversation**: Type your question about recent news
2. **View sources**: Each response includes source attribution
3. **Reset session**: Click the reset button to start fresh
4. **Session persistence**: Your chat history is maintained per session

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── ChatWindow.js    # Main chat interface
│   ├── MessageList.js   # Message display
│   ├── InputBox.js      # Message input
│   └── LoadingSpinner.js # Loading indicator
├── services/            # API services
│   └── api.js          # Axios configuration
├── styles/              # SCSS stylesheets
├── utils/               # Utility functions
│   └── sessionManager.js # Session management
└── App.js              # Main application component
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is part of the Voosh Full Stack Developer assignment.
