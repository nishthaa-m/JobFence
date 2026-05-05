# 🛡️JobFence

JobFence AI is an intelligent verification system designed to detect fraudulent job postings and internships. By analyzing job descriptions from various sources (PDFs, text, and web links), JobFence uses NLP to evaluate the legitimacy of opportunities, extract key details, and flag potential scams before you apply.

---

## Features

* ✅ **Fraud Detection & Scoring**: AI-powered analysis to rate the authenticity of a job posting.
* 📄 **Multi-Format Support**: Upload job details via PDF documents, plain text, or direct web links.
* 🚩 **Red Flag Identification**: Automatically detects suspicious language, unrealistic compensation, or missing crucial details.
* 📊 **Visual Trust Score**: See a clear breakdown of why a job posting is considered safe or risky.
* 💡 **Actionable Feedback**: Get recommendations on what to verify with the employer before proceeding.

---

## 🛠️Tech Stack

| Component      | Technology                |
| -------------- | ------------------------- |
| Frontend       | React 18 + TypeScript     |
| Styling        | Tailwind CSS + shadcn/ui  |
| Backend        | Python Flask              |
| NLP Processing | spaCy + en_core_web_sm    |
| Build Tool     | Vite                      |

---

## 📦Prerequisites

* Node.js v18+
* Python 3.9+ (recommend using 3.11)
* Git with Git LFS

---

## ⚙️Installation

### 1. Clone Repository

```bash
git lfs install
git clone https://github.com/nishthaa-m/JobFence.git
cd JobFence
```

### 2. Backend Setup

```bash
cd backend

# Create virtual environment
# On Windows:
py -3.11 -m venv .venv
.venv\Scripts\activate

# On Linux/macOS:
python3 -m venv .venv
source .venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -r requirements.txt
```

### 3. Start Backend (from `/backend`):

```bash
flask run --port 5000 --debug
```
(Backend will be running on port 5000)

> 📦 Includes Flask, flask-cors, spaCy, PyMuPDF, and other NLP dependencies.

If needed, install spaCy model manually:

```bash
python -m spacy download en_core_web_sm
```

### 4. Frontend Setup

```bash
cd ../frontend
npm install
```

### 5. Start Frontend (from `/frontend`):

```bash
npm run dev
```
(The app will be available on the port specified by Vite, usually 5173 or 8080)

---

## 📁Project Structure

```
JobFence/
├── backend/
│   ├── app/
│   │   ├── __init__.py      # App initialization
│   │   ├── analyzer.py      # Core NLP and fraud analysis logic
│   │   ├── routes.py        # API routes
│   │   └── ...              
│   └── requirements.txt     # Python dependencies
├── frontend/
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── api/             # API service handlers
│   │   ├── components/      # React UI components (Verifier, Uploader, etc.)
│   │   ├── types/           # TypeScript interfaces
│   │   └── main.tsx         # App entry
│   └── vite.config.ts       # Build config
└── README.md                # This file
```

---

## 🛠️Troubleshooting

| Error                        | Solution                                                  |
| ---------------------------- | --------------------------------------------------------- |
| ModuleNotFoundError          | Reinstall requirements: `pip install -r requirements.txt` |
| spaCy model missing          | Run: `python -m spacy download en_core_web_sm`            |
| fitz (PyMuPDF) not found     | Run: `pip install PyMuPDF`                                |
| Python not found             | Reinstall Python and ensure it's added to PATH            |
| App Execution Alias conflict | Disable "python.exe" alias in Windows Settings            |

---

📅 **Stay safe and secure! Start verifying jobs with JobFence!**
