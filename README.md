# Support Ticket System 

A full-stack support ticket management system featuring an AI-powered analysis engine that automatically categorizes, tags, and summarizes incoming tickets using LLMs (Llama 3 via Groq).

## 🚀 Features

- *Ticket Management*: Create, view, and track support tickets.
- *AI Analysis*: Automatic categorization (billing, technical, account), tagging, and one-sentence summaries.
- *Modern UI*: Clean and responsive dashboard built with React and Redux Toolkit.
- *Dockerized*: Easy setup for both development and production environments.

## 🛠️ Tech Stack

- *Frontend*: React, TypeScript, Redux Toolkit, CSS Modules.
- *Backend*: FastAPI, SQLAlchemy (PostgreSQL), Pydantic.
- *AI*: LangChain, ChatGroq (Llama 3.3).
- *Infrastructure*: Docker, Docker Compose, PostgreSQL.

---

## 🏗️ Setup & Installation

### Prerequisites

- [Docker](https://www.docker.com/get-started) and [Docker Compose](https://docs.docker.com/compose/install/)
- (Optional for local development) Python 3.9+ and Node.js 18+

### 1. Clone the repository
bash
git clone <repository-url>
cd SupportTicketSystem


### 2. Environment Configuration
Create a .env file in the root directory and fill in your credentials. You can use the provided .env.example as a template.

bash
cp .env.example .env


*Required Environment Variables:*
For Backend:
- DATABASE_URL: Your database url.
- GROK_API_KEY: Your API key from [Groq Console](https://console.groq.com/).

For Frontend:
- REACT_APP_API_URL: Set to http://localhost:8000 for local Docker setup.

### 3. Running with Docker Compose (Recommended)
This is the fastest way to get the entire system up and running.

bash
docker-compose up --build


- *Frontend*: [http://localhost:3000](http://localhost:3000)
- *Backend API*: [http://localhost:8000](http://localhost:8000)
- *API Documentation*: [http://localhost:8000/docs](http://localhost:8000/docs)

---

## 🛠️ Local Development (Without Docker)

If you prefer to run the services individually:

### Backend
1. Navigate to the backend directory: cd backend
2. Create a virtual environment: python -m venv venv
3. Activate it: source venv/bin/activate (or venv\Scripts\activate on Windows)
4. Install dependencies: pip install -r requirements.txt
5. Run the server: uvicorn app.main:app --reload

### Frontend
1. Navigate to the frontend directory: cd frontend
2. Install dependencies: npm install
3. Start the development server: npm start