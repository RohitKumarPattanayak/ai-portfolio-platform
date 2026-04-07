## AI-Powered Interactive Portfolio Platform

## 📖 Overview
An AI-driven portfolio platform that automatically transforms a raw resume into a dynamic, interactive developer profile. The system parses structured data from resumes (PDF/DOCX) and generates a fully integrated portfolio UI with an embedded conversational assistant that allows recruiters and visitors to explore experience, projects, and technical skills through natural language queries.

The platform leverages a Retrieval-Augmented Generation (RAG) pipeline to retrieve relevant professional context and produce accurate, context-aware responses in real time. The architecture combines modern frontend frameworks with a scalable backend and vector-based semantic search to deliver an intelligent, conversational representation of a developer’s professional background.

## 🛠️ Technologies & Stack Used

**Frontend**
- **Framework:** React (TypeScript) managed via Vite
- **Styling:** Tailwind CSS
- **State Management:** Zustand, TanStack React Query
- **Routing:** React Router DOM
- **Data Visualization:** Recharts

**Backend**
- **Server:** Python, FastAPI, Uvicorn
- **Database ORM:** SQLAlchemy, Alembic
- **AI & Processing:** OpenAI API, PyPDF, Python-Docx

**Database & Infrastructure**
- **Database:** PostgreSQL
- **Vector Search:** `pgvector` extension for embeddings
- **Containerization:** Docker & Docker Compose (Master-Replica configuration)

## 🚀 Optimizations Implemented

- **Database Performance:** Configured PostgreSQL Read Replicas via Docker Compose to manage read-heavy analytics and reduce primary database load.
- **Fast Similarity Search:** Applied Hierarchical Navigable Small World (HNSW) indexing on resume chunks to execute blazing-fast semantic vector searches without full-table scans.
- **Frontend Code Splitting:** Implemented robust route-based and heavy-component code splitting to minimize initial bundle sizes and fast-track application loading.
- **React Rendering Checks:** Addressed unnecessary component re-renders and eliminated UI flickering by strictly applying constraints across Context layers using `React.memo`, `useCallback`, and `useMemo`.
- **Latency Optimizations:** Fine-tuned internal structured data pipelines to prevent SQL persistency crashes and seamlessly process unstructured chat messages.
