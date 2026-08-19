// src/data/candidatesData.ts
var candidatesData = {
  "candidates": [
    {
      "member": {
        "id": "CAND-001",
        "name": "Sarah Johnson",
        "jobRole": "Senior Data Engineer",
        "yearsExperience": 9,
        "education": "MS Computer Science",
        "status": "COMPLETED",
        "skills": ["Vector Databases", "RAG Systems", "Data Pipeline Architecture", "Distributed Search"],
        "technologies": ["Pinecone", "Qdrant", "PostgreSQL/pgvector", "Apache Kafka", "Docker", "Kubernetes"],
        "programmingLanguages": ["Python", "SQL", "Scala"],
        "projects": [
          {
            "name": "Distributed Vector Pipeline",
            "description": "Designed real-time embedding generation and Pinecone indexing pipeline processing 50M document corpus with sub-50ms p99 latency",
            "role": "Lead Data Architect",
            "technologies": ["Python", "Pinecone", "Kafka", "Docker"]
          }
        ],
        "experience": [
          {
            "company": "DataCorp Systems",
            "role": "Senior Data Engineer",
            "duration": "4 years",
            "highlights": ["Scaled vector DB indexing engine across multi-region deployment"]
          }
        ],
        "certifications": ["AWS Certified Data Analytics Specialist"]
      },
      "missions": [
        { "day": 7, "title": "Embeddings Explained", "passed": true, "attempts": 1 },
        { "day": 8, "title": "Vector Databases Overview", "passed": true, "attempts": 1 },
        { "day": 10, "title": "Retrieval & Matching Engine", "passed": true, "attempts": 2 },
        { "day": 12, "title": "Prompt Engineering Fundamentals", "passed": true, "attempts": 4 },
        { "day": 16, "title": "Chatbot Backend & API Integration", "passed": true, "attempts": 1 },
        { "day": 22, "title": "Multi-Agent Orchestration", "passed": true, "attempts": 2 },
        { "day": 23, "title": "Model Context Protocol (MCP)", "passed": true, "attempts": 2 },
        { "day": 28, "title": "Docker & Kubernetes Deployment", "passed": true, "attempts": 3 },
        { "day": 29, "title": "Monitoring, Logging & Observability", "skipped": true },
        { "day": 31, "title": "Capstone Project & Final Demo", "passed": true, "attempts": 1 }
      ],
      "signals": { "commitDays": 28, "missionsCompleted": 30, "missionsFirstTry": 20 }
    },
    {
      "member": {
        "id": "CAND-002",
        "name": "Alex Turner",
        "jobRole": "Backend Software Engineer",
        "yearsExperience": 5,
        "education": "B.Tech Computer Science",
        "status": "COMPLETED",
        "skills": ["Microservices", "API Gateways", "LLM Integration", "Server-Sent Events"],
        "technologies": ["Go", "FastAPI", "Redis", "gRPC", "Docker", "ChromaDB"],
        "programmingLanguages": ["Go", "Python", "TypeScript"],
        "projects": [
          {
            "name": "Streaming Chatbot API Middleware",
            "description": "Engineered high-throughput Server-Sent Events (SSE) streaming proxy for LLM responses with Redis session caching",
            "role": "Backend Lead",
            "technologies": ["Go", "FastAPI", "Redis", "Docker"]
          }
        ],
        "experience": [
          {
            "company": "CloudScale Technologies",
            "role": "Backend Software Engineer",
            "duration": "5 years"
          }
        ],
        "certifications": ["CKAD Certified Kubernetes Application Developer"]
      },
      "missions": [
        { "day": 7, "title": "Embeddings Explained", "passed": true, "attempts": 3 },
        { "day": 8, "title": "Vector Databases Overview", "passed": true, "attempts": 2 },
        { "day": 10, "title": "Retrieval & Matching Engine", "passed": true, "attempts": 4 },
        { "day": 12, "title": "Prompt Engineering Fundamentals", "passed": true, "attempts": 5 },
        { "day": 13, "title": "Function Calling & Structured Outputs", "passed": true, "attempts": 4 },
        { "day": 16, "title": "Chatbot Backend & API Integration", "passed": true, "attempts": 1 },
        { "day": 18, "title": "Streaming Responses", "passed": true, "attempts": 1 },
        { "day": 22, "title": "Multi-Agent Orchestration", "passed": true, "attempts": 3 },
        { "day": 28, "title": "Docker & Kubernetes Deployment", "passed": true, "attempts": 1 },
        { "day": 31, "title": "Capstone Project & Final Demo", "passed": true, "attempts": 2 }
      ],
      "signals": { "commitDays": 22, "missionsCompleted": 29, "missionsFirstTry": 10 }
    },
    {
      "member": {
        "id": "CAND-003",
        "name": "Emily Chen",
        "jobRole": "AI Engineer",
        "yearsExperience": 6,
        "education": "MS Artificial Intelligence",
        "status": "COMPLETED",
        "skills": ["Multi-Agent Systems", "Model Context Protocol (MCP)", "LLM Fine-Tuning", "RAG Systems"],
        "technologies": ["LangChain", "LlamaIndex", "vLLM", "DeepSpeed", "Weaviate", "PyTorch"],
        "programmingLanguages": ["Python", "C++"],
        "projects": [
          {
            "name": "AI Video Summarization & Q&A Engine",
            "description": "Developed multimodal video chunking, Whisper audio transcription, and RAG summarization agent with semantic search",
            "role": "Lead AI Engineer",
            "technologies": ["Python", "PyTorch", "Whisper", "Weaviate", "RAG"]
          },
          {
            "name": "MCP Multi-Tool Agent Orchestrator",
            "description": "Built Model Context Protocol (MCP) tool integration server enabling LLMs to securely query databases and execute workflows",
            "role": "AI Engineer",
            "technologies": ["Python", "MCP", "LangChain"]
          }
        ],
        "experience": [
          {
            "company": "NeuralMind Research",
            "role": "AI Engineer",
            "duration": "3 years"
          }
        ],
        "certifications": ["DeepLearning.AI Generative AI Specialist", "PyTorch Certified Engineer"]
      },
      "missions": [
        { "day": 7, "title": "Embeddings Explained", "passed": true, "attempts": 1 },
        { "day": 8, "title": "Vector Databases Overview", "passed": true, "attempts": 1 },
        { "day": 10, "title": "Retrieval & Matching Engine", "passed": true, "attempts": 1 },
        { "day": 11, "title": "RAG End-to-End & LLM API Basics", "passed": true, "attempts": 1 },
        { "day": 12, "title": "Prompt Engineering Fundamentals", "passed": true, "attempts": 1 },
        { "day": 13, "title": "Function Calling & Structured Outputs", "passed": true, "attempts": 1 },
        { "day": 21, "title": "LangChain Agents", "passed": true, "attempts": 1 },
        { "day": 22, "title": "Multi-Agent Orchestration", "passed": true, "attempts": 1 },
        { "day": 23, "title": "Model Context Protocol (MCP)", "passed": true, "attempts": 1 },
        { "day": 31, "title": "Capstone Project & Final Demo", "passed": true, "attempts": 1 }
      ],
      "signals": { "commitDays": 31, "missionsCompleted": 31, "missionsFirstTry": 30 }
    },
    {
      "member": {
        "id": "CAND-004",
        "name": "David Miller",
        "jobRole": "Business Analyst",
        "yearsExperience": 8,
        "education": "MBA",
        "status": "COMPLETED",
        "skills": ["Prompt Engineering", "Conversation Memory", "LLM Evaluation", "Requirements Specs"],
        "technologies": ["OpenAI API", "Claude API", "Metabase", "Jira", "SQL"],
        "programmingLanguages": ["SQL", "Python"],
        "projects": [
          {
            "name": "Customer Support Copilot Specs",
            "description": "Designed system prompt templates, few-shot evaluation sets, and conversation context window policies for customer support AI",
            "role": "Lead Product Analyst",
            "technologies": ["Prompt Engineering", "SQL"]
          }
        ],
        "experience": [
          {
            "company": "FinTech Global",
            "role": "Senior Business Analyst",
            "duration": "8 years"
          }
        ]
      },
      "missions": [
        { "day": 7, "title": "Embeddings Explained", "passed": true, "attempts": 4 },
        { "day": 8, "title": "Vector Databases Overview", "passed": true, "attempts": 5 },
        { "day": 10, "title": "Retrieval & Matching Engine", "passed": true, "attempts": 5 },
        { "day": 12, "title": "Prompt Engineering Fundamentals", "passed": true, "attempts": 3 },
        { "day": 16, "title": "Chatbot Backend & API Integration", "passed": true, "attempts": 2 },
        { "day": 20, "title": "Conversation Memory & Context Management", "passed": true, "attempts": 3 },
        { "day": 22, "title": "Multi-Agent Orchestration", "passed": true, "attempts": 4 },
        { "day": 23, "title": "Model Context Protocol (MCP)", "passed": true, "attempts": 5 },
        { "day": 28, "title": "Docker & Kubernetes Deployment", "skipped": true },
        { "day": 31, "title": "Capstone Project & Final Demo", "passed": true, "attempts": 2 }
      ],
      "signals": { "commitDays": 18, "missionsCompleted": 28, "missionsFirstTry": 6 }
    },
    {
      "member": {
        "id": "CAND-005",
        "name": "Michael Brown",
        "jobRole": "DevOps Engineer",
        "yearsExperience": 10,
        "education": "B.Tech Information Technology",
        "status": "COMPLETED",
        "skills": ["Kubernetes Deployment", "GPU Cluster Management", "Model Inference Infrastructure", "Observability"],
        "technologies": ["Ray Serve", "Triton Server", "Docker", "Kubernetes", "Prometheus", "Grafana", "Terraform"],
        "programmingLanguages": ["Python", "Go", "Bash"],
        "projects": [
          {
            "name": "vLLM GPU Inference Cluster",
            "description": "Automated autoscaling GPU node deployment and load balancing for high-concurrency vLLM model serving",
            "role": "DevOps Architect",
            "technologies": ["Kubernetes", "Docker", "Ray", "Prometheus"]
          }
        ],
        "experience": [
          {
            "company": "InfraCore Systems",
            "role": "DevOps Lead",
            "duration": "10 years"
          }
        ],
        "certifications": ["AWS Certified Solutions Architect Professional", "CKA Certified Kubernetes Administrator"]
      },
      "missions": [
        { "day": 7, "title": "Embeddings Explained", "passed": true, "attempts": 2 },
        { "day": 8, "title": "Vector Databases Overview", "passed": true, "attempts": 2 },
        { "day": 10, "title": "Retrieval & Matching Engine", "passed": true, "attempts": 2 },
        { "day": 12, "title": "Prompt Engineering Fundamentals", "passed": true, "attempts": 4 },
        { "day": 18, "title": "Streaming Responses", "passed": true, "attempts": 1 },
        { "day": 22, "title": "Multi-Agent Orchestration", "passed": true, "attempts": 2 },
        { "day": 23, "title": "Model Context Protocol (MCP)", "passed": true, "attempts": 3 },
        { "day": 28, "title": "Docker & Kubernetes Deployment", "passed": true, "attempts": 1 },
        { "day": 29, "title": "Monitoring, Logging & Observability", "passed": true, "attempts": 1 },
        { "day": 31, "title": "Capstone Project & Final Demo", "passed": true, "attempts": 1 }
      ],
      "signals": { "commitDays": 30, "missionsCompleted": 31, "missionsFirstTry": 22 }
    },
    {
      "member": {
        "id": "CAND-006",
        "name": "Wendy Foster",
        "jobRole": "Marketing Manager",
        "yearsExperience": 12,
        "education": "BA Marketing",
        "status": "COMPLETED"
      },
      "missions": [
        { "day": 1, "title": "VS Code & Python Environment Setup", "passed": true, "attempts": 3 },
        { "day": 7, "title": "Embeddings Explained", "passed": true, "attempts": 5 },
        { "day": 8, "title": "Vector Databases Overview", "passed": true, "attempts": 5 },
        { "day": 12, "title": "Prompt Engineering Fundamentals", "passed": true, "attempts": 4 },
        { "day": 16, "title": "Chatbot Backend & API Integration", "passed": true, "attempts": 4 },
        { "day": 17, "title": "Chatbot Frontend Development", "passed": true, "attempts": 2 },
        { "day": 22, "title": "Multi-Agent Orchestration", "passed": true, "attempts": 5 },
        { "day": 27, "title": "Security, Privacy & Guardrails", "skipped": true },
        { "day": 28, "title": "Docker & Kubernetes Deployment", "skipped": true },
        { "day": 31, "title": "Capstone Project & Final Demo", "passed": true, "attempts": 3 }
      ],
      "signals": { "commitDays": 19, "missionsCompleted": 24, "missionsFirstTry": 2 }
    },
    {
      "member": {
        "id": "CAND-007",
        "name": "Ethan Brooks",
        "jobRole": "Computer Science Intern",
        "yearsExperience": 0,
        "education": "BS Computer Science (in progress)",
        "status": "COMPLETED"
      },
      "missions": [
        { "day": 1, "title": "VS Code & Python Environment Setup", "passed": true, "attempts": 1 },
        { "day": 3, "title": "First AI Project, React Frontend & GitHub", "passed": true, "attempts": 1 },
        { "day": 7, "title": "Embeddings Explained", "passed": true, "attempts": 2 },
        { "day": 8, "title": "Vector Databases Overview", "passed": true, "attempts": 1 },
        { "day": 12, "title": "Prompt Engineering Fundamentals", "passed": true, "attempts": 1 },
        { "day": 16, "title": "Chatbot Backend & API Integration", "passed": true, "attempts": 1 },
        { "day": 22, "title": "Multi-Agent Orchestration", "passed": true, "attempts": 1 },
        { "day": 27, "title": "Security, Privacy & Guardrails", "skipped": true },
        { "day": 28, "title": "Docker & Kubernetes Deployment", "skipped": true },
        { "day": 31, "title": "Capstone Project & Final Demo", "passed": true, "attempts": 2 }
      ],
      "signals": { "commitDays": 26, "missionsCompleted": 27, "missionsFirstTry": 22 }
    },
    {
      "member": {
        "id": "CAND-008",
        "name": "Harold Whitfield",
        "jobRole": "Distinguished Engineer",
        "yearsExperience": 28,
        "education": "BS Computer Science",
        "status": "COMPLETED"
      },
      "missions": [
        { "day": 1, "title": "VS Code & Python Environment Setup", "passed": true, "attempts": 1 },
        { "day": 4, "title": "Reading & Processing Structured Data", "passed": true, "attempts": 1 },
        { "day": 5, "title": "Reading & Processing Unstructured Data", "passed": true, "attempts": 1 },
        { "day": 14, "title": "Fine-Tuning: Concepts & When to Use It", "skipped": true },
        { "day": 15, "title": "Fine-Tuning: Hands-On with LoRA & QLoRA", "skipped": true },
        { "day": 21, "title": "LangChain Agents", "passed": true, "attempts": 5 },
        { "day": 22, "title": "Multi-Agent Orchestration", "passed": true, "attempts": 4 },
        { "day": 23, "title": "Model Context Protocol (MCP)", "passed": true, "attempts": 5 },
        { "day": 27, "title": "Security, Privacy & Guardrails", "passed": true, "attempts": 1 },
        { "day": 28, "title": "Docker & Kubernetes Deployment", "passed": true, "attempts": 1 },
        { "day": 31, "title": "Capstone Project & Final Demo", "passed": true, "attempts": 2 }
      ],
      "signals": { "commitDays": 25, "missionsCompleted": 27, "missionsFirstTry": 15 }
    },
    {
      "member": {
        "id": "CAND-009",
        "name": "Zara Ahmadi",
        "jobRole": "AI Engineer",
        "yearsExperience": 1,
        "education": "BS Computer Science",
        "status": "COMPLETED"
      },
      "missions": [
        { "day": 7, "title": "Embeddings Explained", "passed": true, "attempts": 1 },
        { "day": 8, "title": "Vector Databases Overview", "passed": true, "attempts": 1 },
        { "day": 10, "title": "Retrieval & Matching Engine", "passed": true, "attempts": 1 },
        { "day": 12, "title": "Prompt Engineering Fundamentals", "passed": true, "attempts": 1 },
        { "day": 13, "title": "Function Calling & Structured Outputs", "passed": true, "attempts": 1 },
        { "day": 21, "title": "LangChain Agents", "passed": true, "attempts": 1 },
        { "day": 22, "title": "Multi-Agent Orchestration", "passed": true, "attempts": 1 },
        { "day": 23, "title": "Model Context Protocol (MCP)", "passed": true, "attempts": 1 },
        { "day": 27, "title": "Security, Privacy & Guardrails", "passed": true, "attempts": 1 },
        { "day": 31, "title": "Capstone Project & Final Demo", "passed": true, "attempts": 1 }
      ],
      "signals": { "commitDays": 31, "missionsCompleted": 31, "missionsFirstTry": 29 }
    },
    {
      "member": {
        "id": "CAND-010",
        "name": "Gerald Combs",
        "jobRole": "IT Support Specialist",
        "yearsExperience": 20,
        "education": "AAS Information Technology",
        "status": "COMPLETED"
      },
      "missions": [
        { "day": 1, "title": "VS Code & Python Environment Setup", "passed": true, "attempts": 2 },
        { "day": 7, "title": "Embeddings Explained", "passed": true, "attempts": 5 },
        { "day": 8, "title": "Vector Databases Overview", "passed": false, "attempts": 4 },
        { "day": 10, "title": "Retrieval & Matching Engine", "passed": false, "attempts": 3 },
        { "day": 12, "title": "Prompt Engineering Fundamentals", "passed": true, "attempts": 5 },
        { "day": 16, "title": "Chatbot Backend & API Integration", "passed": true, "attempts": 4 },
        { "day": 22, "title": "Multi-Agent Orchestration", "passed": false, "attempts": 3 },
        { "day": 27, "title": "Security, Privacy & Guardrails", "skipped": true },
        { "day": 28, "title": "Docker & Kubernetes Deployment", "skipped": true },
        { "day": 31, "title": "Capstone Project & Final Demo", "passed": true, "attempts": 3 }
      ],
      "signals": { "commitDays": 22, "missionsCompleted": 23, "missionsFirstTry": 1 }
    },
    {
      "member": {
        "id": "CAND-011",
        "name": "Mia Alvarez",
        "jobRole": "UX Researcher",
        "yearsExperience": 6,
        "education": "MA Human-Computer Interaction",
        "status": "COMPLETED"
      },
      "missions": [
        { "day": 1, "title": "VS Code & Python Environment Setup", "passed": true, "attempts": 2 },
        { "day": 2, "title": "Local LLM & AI Coding Assistant Setup", "passed": true, "attempts": 1 },
        { "day": 3, "title": "First AI Project, React Frontend & GitHub", "passed": true, "attempts": 3 },
        { "day": 4, "title": "Reading & Processing Structured Data", "passed": true, "attempts": 2 },
        { "day": 7, "title": "Embeddings Explained", "skipped": true },
        { "day": 8, "title": "Vector Databases Overview", "skipped": true },
        { "day": 12, "title": "Prompt Engineering Fundamentals", "skipped": true },
        { "day": 16, "title": "Chatbot Backend & API Integration", "skipped": true },
        { "day": 22, "title": "Multi-Agent Orchestration", "skipped": true },
        { "day": 31, "title": "Capstone Project & Final Demo", "passed": true, "attempts": 4 }
      ],
      "signals": { "commitDays": 9, "missionsCompleted": 14, "missionsFirstTry": 5 }
    },
    {
      "member": {
        "id": "CAND-012",
        "name": "Chen Wei",
        "jobRole": "Mobile App Developer",
        "yearsExperience": 7,
        "education": "BS Computer Engineering",
        "status": "COMPLETED"
      },
      "missions": [
        { "day": 7, "title": "Embeddings Explained", "passed": true, "attempts": 4 },
        { "day": 8, "title": "Vector Databases Overview", "passed": true, "attempts": 5 },
        { "day": 9, "title": "Building & Populating the Vector Database", "passed": true, "attempts": 4 },
        { "day": 10, "title": "Retrieval & Matching Engine", "passed": true, "attempts": 4 },
        { "day": 16, "title": "Chatbot Backend & API Integration", "passed": true, "attempts": 1 },
        { "day": 18, "title": "Streaming Responses", "passed": true, "attempts": 1 },
        { "day": 22, "title": "Multi-Agent Orchestration", "passed": true, "attempts": 2 },
        { "day": 28, "title": "Docker & Kubernetes Deployment", "passed": true, "attempts": 1 },
        { "day": 30, "title": "Production Readiness & Final Testing", "passed": true, "attempts": 1 },
        { "day": 31, "title": "Capstone Project & Final Demo", "passed": true, "attempts": 1 }
      ],
      "signals": { "commitDays": 27, "missionsCompleted": 30, "missionsFirstTry": 14 }
    },
    {
      "member": {
        "id": "CAND-013",
        "name": "Ravi Patel",
        "jobRole": "Software Engineer",
        "yearsExperience": 15,
        "education": "MS Computer Science",
        "status": "COMPLETED"
      },
      "missions": [
        { "day": 1, "title": "VS Code & Python Environment Setup", "passed": true, "attempts": 3 },
        { "day": 4, "title": "Reading & Processing Structured Data", "passed": true, "attempts": 2 },
        { "day": 7, "title": "Embeddings Explained", "passed": true, "attempts": 3 },
        { "day": 8, "title": "Vector Databases Overview", "passed": true, "attempts": 2 },
        { "day": 12, "title": "Prompt Engineering Fundamentals", "passed": true, "attempts": 3 },
        { "day": 16, "title": "Chatbot Backend & API Integration", "passed": true, "attempts": 2 },
        { "day": 22, "title": "Multi-Agent Orchestration", "passed": true, "attempts": 2 },
        { "day": 27, "title": "Security, Privacy & Guardrails", "passed": true, "attempts": 1 },
        { "day": 28, "title": "Docker & Kubernetes Deployment", "passed": true, "attempts": 1 },
        { "day": 31, "title": "Capstone Project & Final Demo", "passed": true, "attempts": 1 }
      ],
      "signals": { "commitDays": 27, "missionsCompleted": 30, "missionsFirstTry": 13 }
    },
    {
      "member": {
        "id": "CAND-014",
        "name": "Bethany Cole",
        "jobRole": "HR Manager",
        "yearsExperience": 10,
        "education": "BA Human Resources",
        "status": "COMPLETED"
      },
      "missions": [
        { "day": 1, "title": "VS Code & Python Environment Setup", "passed": true, "attempts": 4 },
        { "day": 7, "title": "Embeddings Explained", "passed": true, "attempts": 5 },
        { "day": 8, "title": "Vector Databases Overview", "skipped": true },
        { "day": 12, "title": "Prompt Engineering Fundamentals", "passed": true, "attempts": 5 },
        { "day": 16, "title": "Chatbot Backend & API Integration", "passed": true, "attempts": 4 },
        { "day": 20, "title": "Conversation Memory & Context Management", "passed": true, "attempts": 3 },
        { "day": 22, "title": "Multi-Agent Orchestration", "skipped": true },
        { "day": 27, "title": "Security, Privacy & Guardrails", "skipped": true },
        { "day": 28, "title": "Docker & Kubernetes Deployment", "skipped": true },
        { "day": 31, "title": "Capstone Project & Final Demo", "passed": true, "attempts": 4 }
      ],
      "signals": { "commitDays": 17, "missionsCompleted": 20, "missionsFirstTry": 1 }
    },
    {
      "member": {
        "id": "CAND-015",
        "name": "Noah Kim",
        "jobRole": "Principal Architect",
        "yearsExperience": 20,
        "education": "MS Computer Science",
        "status": "COMPLETED"
      },
      "missions": [
        { "day": 1, "title": "VS Code & Python Environment Setup", "passed": true, "attempts": 1 },
        { "day": 7, "title": "Embeddings Explained", "passed": true, "attempts": 1 },
        { "day": 8, "title": "Vector Databases Overview", "passed": true, "attempts": 1 },
        { "day": 14, "title": "Fine-Tuning: Concepts & When to Use It", "skipped": true },
        { "day": 15, "title": "Fine-Tuning: Hands-On with LoRA & QLoRA", "skipped": true },
        { "day": 21, "title": "LangChain Agents", "passed": true, "attempts": 1 },
        { "day": 22, "title": "Multi-Agent Orchestration", "passed": true, "attempts": 1 },
        { "day": 23, "title": "Model Context Protocol (MCP)", "passed": true, "attempts": 1 },
        { "day": 27, "title": "Security, Privacy & Guardrails", "passed": true, "attempts": 1 },
        { "day": 31, "title": "Capstone Project & Final Demo", "passed": true, "attempts": 1 }
      ],
      "signals": { "commitDays": 29, "missionsCompleted": 29, "missionsFirstTry": 27 }
    },
    {
      "member": {
        "id": "CAND-016",
        "name": "Isabella Rossi",
        "jobRole": "Software Engineer",
        "yearsExperience": 5,
        "education": "BS Computer Science",
        "status": "COMPLETED"
      },
      "missions": [
        { "day": 1, "title": "VS Code & Python Environment Setup", "passed": true, "attempts": 2 },
        { "day": 7, "title": "Embeddings Explained", "passed": false, "attempts": 4 },
        { "day": 8, "title": "Vector Databases Overview", "passed": true, "attempts": 3 },
        { "day": 12, "title": "Prompt Engineering Fundamentals", "passed": false, "attempts": 5 },
        { "day": 16, "title": "Chatbot Backend & API Integration", "passed": true, "attempts": 2 },
        { "day": 22, "title": "Multi-Agent Orchestration", "passed": false, "attempts": 4 },
        { "day": 27, "title": "Security, Privacy & Guardrails", "skipped": true },
        { "day": 28, "title": "Docker & Kubernetes Deployment", "skipped": true },
        { "day": 31, "title": "Capstone Project & Final Demo", "passed": true, "attempts": 2 }
      ],
      "signals": { "commitDays": 19, "missionsCompleted": 21, "missionsFirstTry": 2 }
    },
    {
      "member": {
        "id": "CAND-017",
        "name": "Tyler Brooks",
        "jobRole": "Junior Developer",
        "yearsExperience": 0,
        "education": "GED + Coding Bootcamp Certificate",
        "status": "COMPLETED"
      },
      "missions": [
        { "day": 1, "title": "VS Code & Python Environment Setup", "passed": true, "attempts": 3 },
        { "day": 3, "title": "First AI Project, React Frontend & GitHub", "passed": true, "attempts": 5 },
        { "day": 7, "title": "Embeddings Explained", "passed": true, "attempts": 5 },
        { "day": 8, "title": "Vector Databases Overview", "passed": true, "attempts": 5 },
        { "day": 10, "title": "Retrieval & Matching Engine", "passed": true, "attempts": 5 },
        { "day": 12, "title": "Prompt Engineering Fundamentals", "passed": true, "attempts": 5 },
        { "day": 16, "title": "Chatbot Backend & API Integration", "passed": true, "attempts": 4 },
        { "day": 22, "title": "Multi-Agent Orchestration", "passed": true, "attempts": 5 },
        { "day": 28, "title": "Docker & Kubernetes Deployment", "passed": true, "attempts": 4 },
        { "day": 31, "title": "Capstone Project & Final Demo", "passed": true, "attempts": 3 }
      ],
      "signals": { "commitDays": 30, "missionsCompleted": 31, "missionsFirstTry": 1 }
    },
    {
      "member": {
        "id": "CAND-018",
        "name": "Diane Foster",
        "jobRole": "AI Engineer",
        "yearsExperience": 4,
        "education": "MS Computer Science",
        "status": "COMPLETED"
      },
      "missions": [
        { "day": 7, "title": "Embeddings Explained", "passed": true, "attempts": 1 },
        { "day": 8, "title": "Vector Databases Overview", "passed": true, "attempts": 1 },
        { "day": 10, "title": "Retrieval & Matching Engine", "passed": true, "attempts": 1 },
        { "day": 12, "title": "Prompt Engineering Fundamentals", "passed": true, "attempts": 1 },
        { "day": 13, "title": "Function Calling & Structured Outputs", "passed": true, "attempts": 1 },
        { "day": 22, "title": "Multi-Agent Orchestration", "passed": true, "attempts": 1 },
        { "day": 23, "title": "Model Context Protocol (MCP)", "passed": true, "attempts": 1 },
        { "day": 27, "title": "Security, Privacy & Guardrails", "passed": true, "attempts": 1 },
        { "day": 28, "title": "Docker & Kubernetes Deployment", "passed": true, "attempts": 1 },
        { "day": 31, "title": "Capstone Project & Final Demo", "passed": true, "attempts": 1 }
      ],
      "signals": { "commitDays": 31, "missionsCompleted": 31, "missionsFirstTry": 31 }
    },
    {
      "member": {
        "id": "CAND-019",
        "name": "Frank DeLuca",
        "jobRole": "Legacy Systems Engineer",
        "yearsExperience": 25,
        "education": "BS Computer Science",
        "status": "COMPLETED"
      },
      "missions": [
        { "day": 1, "title": "VS Code & Python Environment Setup", "passed": true, "attempts": 2 },
        { "day": 4, "title": "Reading & Processing Structured Data", "passed": true, "attempts": 1 },
        { "day": 7, "title": "Embeddings Explained", "passed": true, "attempts": 4 },
        { "day": 8, "title": "Vector Databases Overview", "passed": true, "attempts": 3 },
        { "day": 16, "title": "Chatbot Backend & API Integration", "passed": true, "attempts": 1 },
        { "day": 17, "title": "Chatbot Frontend Development", "passed": true, "attempts": 5 },
        { "day": 19, "title": "Response Formatting & Rich Outputs", "passed": true, "attempts": 4 },
        { "day": 22, "title": "Multi-Agent Orchestration", "passed": true, "attempts": 3 },
        { "day": 28, "title": "Docker & Kubernetes Deployment", "passed": true, "attempts": 1 },
        { "day": 31, "title": "Capstone Project & Final Demo", "passed": true, "attempts": 2 }
      ],
      "signals": { "commitDays": 26, "missionsCompleted": 29, "missionsFirstTry": 11 }
    },
    {
      "member": {
        "id": "CAND-020",
        "name": "Priyanka Sharma",
        "jobRole": "Software Engineer",
        "yearsExperience": 5,
        "education": "BS Computer Science",
        "status": "COMPLETED"
      },
      "missions": [
        { "day": 1, "title": "VS Code & Python Environment Setup", "passed": true, "attempts": 1 },
        { "day": 3, "title": "First AI Project, React Frontend & GitHub", "passed": true, "attempts": 1 },
        { "day": 4, "title": "Reading & Processing Structured Data", "skipped": true },
        { "day": 7, "title": "Embeddings Explained", "passed": false, "attempts": 2 },
        { "day": 8, "title": "Vector Databases Overview", "skipped": true },
        { "day": 12, "title": "Prompt Engineering Fundamentals", "passed": true, "attempts": 1 },
        { "day": 16, "title": "Chatbot Backend & API Integration", "passed": true, "attempts": 1 },
        { "day": 22, "title": "Multi-Agent Orchestration", "passed": true, "attempts": 1 },
        { "day": 27, "title": "Security, Privacy & Guardrails", "passed": true, "attempts": 1 },
        { "day": 31, "title": "Capstone Project & Final Demo", "passed": true, "attempts": 1 }
      ],
      "signals": { "commitDays": 24, "missionsCompleted": 27, "missionsFirstTry": 19 }
    }
  ]
};

// src/server/sessionStore.ts
var sessions = /* @__PURE__ */ new Map();
function getOrCreateSession(sessionId, candidate) {
  let session = sessions.get(sessionId);
  if (!session) {
    const fallbackCandidate = candidatesData?.candidates?.[0];
    const effectiveCandidate = candidate || fallbackCandidate;
    if (!effectiveCandidate) {
      throw new Error(`Session ${sessionId} not found and no candidate provided.`);
    }
    session = {
      sessionId,
      candidate: effectiveCandidate,
      conversationHistory: [],
      memoryLayer: [],
      questionsAsked: 0,
      daysCovered: [],
      topicsCovered: [],
      currentDifficulty: "adaptive",
      done: false,
      createdAt: Date.now(),
      lastActiveAt: Date.now()
    };
    sessions.set(sessionId, session);
  } else {
    session.lastActiveAt = Date.now();
    if (candidate) {
      session.candidate = candidate;
    }
  }
  return session;
}

// src/server/aiService.ts
import { GoogleGenAI, Type } from "@google/genai";

// src/data/curriculumData.ts
var curriculumData = {
  "cohort": "AI Cohort \xB7 31 days \xB7 8 modules",
  "modules": [
    {
      "n": 1,
      "title": "Environment & Tooling",
      "days": [1, 3]
    },
    {
      "n": 2,
      "title": "Data Foundations",
      "days": [4, 6]
    },
    {
      "n": 3,
      "title": "Embeddings & Vector Search",
      "days": [7, 10]
    },
    {
      "n": 4,
      "title": "LLM Core, Prompting & Fine-Tuning",
      "days": [11, 15]
    },
    {
      "n": 5,
      "title": "Chatbot Application Build",
      "days": [16, 20]
    },
    {
      "n": 6,
      "title": "Agentic AI & MCP",
      "days": [21, 24]
    },
    {
      "n": 7,
      "title": "Evaluation, Security & Deployment",
      "days": [25, 28]
    },
    {
      "n": 8,
      "title": "Production & Capstone",
      "days": [29, 31]
    }
  ],
  "days": [
    {
      "day": 1,
      "title": "VS Code & Python Environment Setup",
      "type": "SETUP",
      "tools": [
        "VS Code",
        "Python",
        "Python Extension",
        "Pylance",
        "Virtual Environment"
      ],
      "objectives": [
        "Install VS Code and Python on your machine",
        "Configure the Python extension and Pylance",
        "Create and activate a project virtual environment (.venv)",
        "Run and debug your first Python program inside VS Code",
        "Verify the development environment is ready for the remaining course"
      ]
    },
    {
      "day": 2,
      "title": "Local LLM & AI Coding Assistant Setup",
      "type": "SETUP",
      "tools": [
        "Ollama",
        "Qwen2.5-Coder",
        "GitHub Copilot",
        "Cline"
      ],
      "objectives": [
        "Install Ollama and download a local coding model",
        "Verify the local model works through the Ollama CLI",
        "Connect VS Code to the local model using GitHub Copilot or Cline",
        "Generate code using the local AI assistant",
        "Confirm the complete AI coding workflow works offline"
      ]
    },
    {
      "day": 3,
      "title": "First AI Project, React Frontend & GitHub",
      "type": "BUILD",
      "tools": [
        "Python",
        "Ollama",
        "FastAPI",
        "React",
        "Vite",
        "Git",
        "GitHub"
      ],
      "objectives": [
        "Build a command-line chatbot powered by your local Ollama model",
        "Scaffold a FastAPI backend with a health endpoint",
        "Create a React application using Vite",
        "Connect the React frontend with the FastAPI backend",
        "Initialize Git, commit the project, and publish it to GitHub"
      ]
    },
    {
      "day": 4,
      "title": "Reading & Processing Structured Data",
      "type": "BUILD",
      "tools": [
        "Pandas",
        "SQLite",
        "SQL",
        "SQLAlchemy"
      ],
      "objectives": [
        "Create synthetic healthcare plans and claims datasets",
        "Load and clean structured CSV data using Pandas",
        "Store the processed data in a SQLite database",
        "Write SQL queries to answer common healthcare questions",
        "Document reusable SQL queries for later chatbot integration"
      ]
    },
    {
      "day": 5,
      "title": "Reading & Processing Unstructured Data",
      "type": "BUILD",
      "tools": [
        "pdfplumber",
        "PyPDF",
        "python-docx",
        "Tesseract OCR",
        "BeautifulSoup",
        "Requests"
      ],
      "objectives": [
        "Extract text from healthcare PDFs and Word documents",
        "Perform OCR on scanned enrollment forms",
        "Scrape useful content from a public healthcare webpage",
        "Clean and normalize extracted text from multiple sources",
        "Store the processed text files for knowledge-base creation"
      ]
    },
    {
      "day": 6,
      "title": "Building the Knowledge Base",
      "type": "BUILD",
      "tools": [
        "LangChain Text Splitters",
        "JSONL",
        "Python"
      ],
      "objectives": [
        "Convert structured and unstructured healthcare data into a unified knowledge base",
        "Split long documents into retrieval-friendly chunks",
        "Attach metadata such as source, plan type, and document section to every chunk",
        "Export all processed records into a knowledge_base.jsonl file",
        "Validate chunk quality before using them for embeddings"
      ]
    },
    {
      "day": 7,
      "title": "Embeddings Explained",
      "type": "AI_CORE",
      "tools": [
        "Sentence Transformers",
        "OpenAI Embeddings",
        "Scikit-learn",
        "Matplotlib"
      ],
      "objectives": [
        "Understand how text is converted into vector embeddings",
        "Generate embeddings for every knowledge base chunk",
        "Store embeddings alongside the original documents",
        "Visualize embedding clusters using PCA",
        "Analyze whether similar healthcare concepts cluster together"
      ]
    },
    {
      "day": 8,
      "title": "Vector Databases Overview",
      "type": "BUILD",
      "tools": [
        "ChromaDB",
        "Pinecone"
      ],
      "objectives": [
        "Learn the role of vector databases in RAG applications",
        "Set up a local Chroma vector database",
        "Create a cloud-based Pinecone index for comparison",
        "Compare local and managed vector database solutions",
        "Select the most suitable database for the chatbot project"
      ]
    },
    {
      "day": 9,
      "title": "Building & Populating the Vector Database",
      "type": "BUILD",
      "tools": [
        "ChromaDB",
        "Sentence Transformers"
      ],
      "objectives": [
        "Load knowledge base embeddings into the vector database",
        "Store documents together with metadata for filtering",
        "Verify that every knowledge base chunk has been indexed",
        "Test semantic search with healthcare-related questions",
        "Evaluate retrieval quality and metadata filtering"
      ]
    },
    {
      "day": 10,
      "title": "The Retrieval & Matching Engine",
      "type": "SHIP_IT",
      "tools": [
        "SQLite",
        "ChromaDB",
        "Python"
      ],
      "objectives": [
        "Build a query router that decides between SQL, vector search, or hybrid retrieval",
        "Implement structured data lookup for plans and claims",
        "Implement semantic retrieval from the vector database",
        "Merge and deduplicate results from multiple retrieval sources",
        "Evaluate retrieval accuracy using a diverse set of healthcare questions"
      ]
    },
    {
      "day": 11,
      "title": "RAG End-to-End & LLM API Basics",
      "type": "BUILD",
      "tools": [
        "OpenAI SDK",
        "Ollama",
        "Groq",
        "Python"
      ],
      "objectives": [
        "Connect the retrieval engine to an LLM to build a complete RAG pipeline",
        "Configure a local or hosted LLM provider using the OpenAI-compatible SDK",
        "Create a grounded prompt that answers only from retrieved context",
        "Generate answers using retrieved knowledge",
        "Evaluate chatbot responses against the retrieval-only baseline"
      ]
    },
    {
      "day": 12,
      "title": "Prompt Engineering Fundamentals",
      "type": "LEARN",
      "tools": [
        "LLMs",
        "Prompt Templates"
      ],
      "objectives": [
        "Understand zero-shot, few-shot, and chain-of-thought prompting",
        "Design multiple system prompt variations for the chatbot",
        "Compare prompts based on accuracy, compliance, and tone",
        "Evaluate prompt performance using a fixed question set",
        "Finalize the production-ready system prompt"
      ]
    },
    {
      "day": 13,
      "title": "Advanced Prompting: Function Calling & Structured Outputs",
      "type": "BUILD",
      "tools": [
        "OpenAI Function Calling",
        "Pydantic",
        "Python"
      ],
      "objectives": [
        "Define tool schemas for healthcare-related chatbot functions",
        "Implement LLM function calling with automatic tool execution",
        "Validate structured outputs using Pydantic models",
        "Log tool calls for debugging and auditing",
        "Test different user queries to verify correct tool selection"
      ]
    },
    {
      "day": 14,
      "title": "Fine-Tuning: Concepts & When to Use It",
      "type": "LEARN",
      "tools": [
        "JSONL",
        "OpenAI",
        "LoRA",
        "QLoRA"
      ],
      "objectives": [
        "Understand when fine-tuning is more appropriate than prompting or RAG",
        "Identify chatbot issues that fine-tuning can solve",
        "Create a high-quality fine-tuning dataset",
        "Validate and organize the dataset into training and test sets",
        "Prepare the project for model fine-tuning"
      ]
    },
    {
      "day": 15,
      "title": "Fine-Tuning: Hands-On with LoRA & QLoRA",
      "type": "SHIP_IT",
      "tools": [
        "PEFT",
        "Transformers",
        "BitsAndBytes",
        "OpenAI Fine-Tuning",
        "LoRA"
      ],
      "objectives": [
        "Train or fine-tune an LLM using LoRA or the OpenAI fine-tuning workflow",
        "Load and evaluate the fine-tuned model",
        "Compare the base model and fine-tuned model on unseen test cases",
        "Measure improvements in tone, consistency, and response quality",
        "Document whether fine-tuning provides measurable benefits for the chatbot"
      ]
    },
    {
      "day": 16,
      "title": "Chatbot Backend & API Integration",
      "type": "BUILD",
      "tools": [
        "FastAPI",
        "SQLite",
        "Python"
      ],
      "objectives": [
        "Create a /chat API endpoint for the healthcare chatbot",
        "Integrate retrieval, function calling, and LLM response generation",
        "Implement session-based conversation management",
        "Build a conversation history endpoint",
        "Test the complete backend API using Postman or cURL"
      ]
    },
    {
      "day": 17,
      "title": "Chatbot Frontend Development",
      "type": "BUILD",
      "tools": [
        "Streamlit",
        "Requests",
        "UUID"
      ],
      "objectives": [
        "Build an interactive chat interface for the chatbot",
        "Connect the frontend to the backend chat API",
        "Maintain conversation history across user interactions",
        "Add a healthcare plan selector and new conversation option",
        "Validate end-to-end communication between frontend and backend"
      ]
    },
    {
      "day": 18,
      "title": "Full-Stack Integration & Streaming Responses",
      "type": "BUILD",
      "tools": [
        "FastAPI",
        "StreamingResponse",
        "Server-Sent Events",
        "Streamlit"
      ],
      "objectives": [
        "Implement real-time streaming responses from the LLM",
        "Display generated tokens incrementally in the chat interface",
        "Add loading indicators for a better user experience",
        "Handle interrupted or failed streaming requests gracefully",
        "Verify smooth end-to-end streaming between backend and frontend"
      ]
    },
    {
      "day": 19,
      "title": "Response Formatting & Rich Outputs",
      "type": "BUILD",
      "tools": [
        "Pydantic",
        "Markdown",
        "Streamlit"
      ],
      "objectives": [
        "Add citations to chatbot responses using retrieved knowledge",
        "Create structured cards for claims and coverage summaries",
        "Render Markdown content with tables, lists, and formatting",
        "Validate structured outputs before displaying them",
        "Improve chatbot readability and response trustworthiness"
      ]
    },
    {
      "day": 20,
      "title": "Conversation Memory & Context Management",
      "type": "SHIP_IT",
      "tools": [
        "SQLite",
        "FastAPI",
        "LLM",
        "Token Management"
      ],
      "objectives": [
        "Persist conversation history across multiple user sessions",
        "Build context-aware conversations using previous messages",
        "Implement automatic conversation summarization for long chats",
        "Manage token limits while preserving important context",
        "Ensure the chatbot remembers user preferences throughout a conversation"
      ]
    },
    {
      "day": 21,
      "title": "Agentic Frameworks: LangChain Agents & Tool Use",
      "type": "BUILD",
      "tools": [
        "LangChain",
        "LangChain Agents",
        "ReAct",
        "Python"
      ],
      "objectives": [
        "Convert function-calling workflows into a reasoning agent",
        "Wrap chatbot capabilities as reusable LangChain tools",
        "Build a ReAct agent capable of selecting the correct tool automatically",
        "Analyze reasoning traces to understand agent decision making",
        "Evaluate whether the agent chooses the right tools for healthcare queries"
      ]
    },
    {
      "day": 22,
      "title": "Multi-Agent Orchestration",
      "type": "BUILD",
      "tools": [
        "CrewAI",
        "LangGraph",
        "Python"
      ],
      "objectives": [
        "Create specialized agents for different healthcare domains",
        "Build a router agent that delegates requests to the correct specialist",
        "Implement a complete multi-agent workflow",
        "Compare multi-agent performance with a single-agent architecture",
        "Identify scenarios where multiple agents provide measurable benefits"
      ]
    },
    {
      "day": 23,
      "title": "Model Context Protocol (MCP)",
      "type": "BUILD",
      "tools": [
        "MCP Python SDK",
        "Claude Desktop",
        "Cline",
        "Python"
      ],
      "objectives": [
        "Understand the purpose of the Model Context Protocol",
        "Build an MCP server exposing healthcare chatbot tools",
        "Connect the MCP server to an MCP-compatible client",
        "Expose multiple chatbot capabilities through standardized MCP tools",
        "Verify successful tool execution through live MCP interactions"
      ]
    },
    {
      "day": 24,
      "title": "Agentic Chatbot Integration",
      "type": "SHIP_IT",
      "tools": [
        "LangChain",
        "MCP",
        "FastAPI",
        "Python"
      ],
      "objectives": [
        "Integrate agents, MCP tools, retrieval, and conversation memory",
        "Replace mock tools with live MCP-powered tool calls",
        "Implement retries, timeouts, and graceful error handling",
        "Perform failure testing to validate chatbot reliability",
        "Build a production-style agentic chatbot pipeline"
      ]
    },
    {
      "day": 25,
      "title": "Chatbot Evaluation & Testing",
      "type": "SHIP_IT",
      "tools": [
        "Python",
        "Evaluation Dataset",
        "Automated Testing"
      ],
      "objectives": [
        "Create a benchmark dataset covering representative healthcare questions",
        "Evaluate chatbot responses for accuracy, grounding, and consistency",
        "Measure retrieval quality and end-to-end response performance",
        "Identify common failure cases and document improvement areas",
        "Establish baseline metrics before production deployment"
      ]
    },
    {
      "day": 26,
      "title": "Performance Optimization & Cost Management",
      "type": "OPTIMIZE",
      "tools": [
        "tiktoken",
        "Python",
        "FastAPI"
      ],
      "objectives": [
        "Measure token usage across the chatbot pipeline",
        "Optimize retrieval and prompt size to reduce latency and cost",
        "Implement response caching for repeated queries",
        "Benchmark response time before and after optimization",
        "Document performance improvements using measurable metrics"
      ]
    },
    {
      "day": 27,
      "title": "Security, Privacy & Guardrails",
      "type": "BUILD",
      "tools": [
        "FastAPI",
        "Python",
        "Authentication",
        "Input Validation"
      ],
      "objectives": [
        "Secure chatbot APIs against unauthorized access",
        "Validate and sanitize user inputs before processing",
        "Protect sensitive healthcare information throughout the pipeline",
        "Implement prompt-injection and jailbreak safeguards",
        "Test common security scenarios and document mitigation strategies"
      ]
    },
    {
      "day": 28,
      "title": "Docker & Kubernetes Deployment",
      "type": "SHIP_IT",
      "tools": [
        "Docker",
        "Kubernetes",
        "FastAPI",
        "React"
      ],
      "objectives": [
        "Containerize the chatbot backend and frontend using Docker",
        "Deploy the application to a Kubernetes cluster",
        "Configure health checks and environment variables",
        "Verify the deployed chatbot functions correctly",
        "Prepare the application for production hosting"
      ]
    },
    {
      "day": 29,
      "title": "Monitoring, Logging & Observability",
      "type": "BUILD",
      "tools": [
        "Python Logging",
        "Prometheus",
        "Grafana"
      ],
      "objectives": [
        "Add structured logging throughout the chatbot pipeline",
        "Monitor API performance and chatbot usage",
        "Track failures, latency, and tool execution metrics",
        "Build dashboards for production observability",
        "Use monitoring insights to improve chatbot reliability"
      ]
    },
    {
      "day": 30,
      "title": "Production Readiness & Final Testing",
      "type": "SHIP_IT",
      "tools": [
        "FastAPI",
        "Docker",
        "Kubernetes",
        "Python"
      ],
      "objectives": [
        "Perform complete end-to-end testing of the chatbot",
        "Validate retrieval, agent workflows, and frontend integration",
        "Fix production issues discovered during testing",
        "Complete deployment and operational documentation",
        "Prepare the chatbot for real-world production usage"
      ]
    },
    {
      "day": 31,
      "title": "Capstone Project & Final Demo",
      "type": "CAPSTONE",
      "tools": [
        "FastAPI",
        "React",
        "LangChain",
        "MCP",
        "Docker",
        "Kubernetes"
      ],
      "objectives": [
        "Demonstrate the complete enterprise healthcare chatbot",
        "Showcase retrieval, RAG, agents, MCP, and conversation memory",
        "Present the deployed application with production architecture",
        "Evaluate the chatbot using real-world scenarios",
        "Publish the final project with source code and documentation"
      ]
    }
  ]
};

// src/server/aiService.ts
function formatMemoryContext(memoryLayer) {
  if (!memoryLayer || memoryLayer.length === 0) {
    return "No previous questions answered yet in this interview session.";
  }
  return memoryLayer.map((item, idx) => {
    const qNum = item.questionNumber || idx + 1;
    const topicInfo = item.topic ? ` [Topic: ${item.topic}${item.curriculumDay ? `, Day ${item.curriculumDay}` : ""}]` : "";
    const diffInfo = item.difficulty ? ` (Difficulty: ${item.difficulty})` : "";
    const scoreStr = item.score !== void 0 ? `${item.score}/10` : "N/A";
    const statusStr = item.status || "evaluated";
    const reasonStr = item.reason || "No specific evaluation note.";
    const demonstratedStr = item.conceptsDemonstrated && item.conceptsDemonstrated.length > 0 ? item.conceptsDemonstrated.join(", ") : "None noted";
    const missingStr = item.conceptsMissingOrFlawed && item.conceptsMissingOrFlawed.length > 0 ? item.conceptsMissingOrFlawed.join(", ") : "None noted";
    return `Memory Record #${idx + 1} (Question #${qNum})${topicInfo}${diffInfo}:
  \u2022 Question Asked: "${item.question}"
  \u2022 Candidate Answer: "${item.candidateAnswer || "(No response provided)"}"
  \u2022 Evaluation Score: ${scoreStr}
  \u2022 Evaluation Status: ${statusStr}
  \u2022 Reason / Rationale: ${reasonStr}
  \u2022 Concepts Demonstrated: ${demonstratedStr}
  \u2022 Missing or Flawed Concepts: ${missingStr}`;
  }).join("\n\n");
}
var TECHNICAL_ONTOLOGY = [
  "vector",
  "embedding",
  "rag",
  "chunk",
  "prompt",
  "mcp",
  "agent",
  "docker",
  "kubernetes",
  "index",
  "cosine",
  "hnsw",
  "retrieval",
  "rerank",
  "pipeline",
  "token",
  "latency",
  "database",
  "grpc",
  "schema",
  "fallback",
  "cache",
  "throughput",
  "concurrency",
  "failover",
  "consistency",
  "qdrant",
  "pinecone",
  "pgvector",
  "kafka",
  "fastapi",
  "ollama",
  "redis",
  "chroma",
  "microservices",
  "ivf",
  "quantization",
  "bm25",
  "precision",
  "recall",
  "lora",
  "context window"
];
var REASONING_KEYWORDS = [
  "because",
  "since",
  "therefore",
  "due to",
  "leads to",
  "result",
  "reason",
  "why",
  "analyze",
  "investigate",
  "debug",
  "troubleshoot",
  "root cause",
  "diagnose",
  "mitigate",
  "prevent",
  "isolate",
  "handle",
  "solve",
  "resolve",
  "scenario",
  "edge case",
  "failure mode",
  "condition",
  "if",
  "when",
  "unless",
  "fallback",
  "circuit breaker",
  "retry",
  "backoff"
];
var ENGINEERING_KEYWORDS = [
  "tradeoff",
  "trade-off",
  "scale",
  "scalability",
  "latency",
  "throughput",
  "cost",
  "memory",
  "cpu",
  "ram",
  "p99",
  "p95",
  "sla",
  "sharding",
  "replication",
  "partition",
  "durability",
  "consistency",
  "availability",
  "cap theorem",
  "acid",
  "cache",
  "caching",
  "eviction",
  "lru",
  "bottleneck",
  "production",
  "architecture",
  "choose",
  "prefer",
  "versus",
  "vs",
  "instead of",
  "compromise",
  "overhead",
  "benchmark"
];
var COMMUNICATION_KEYWORDS = [
  "first",
  "second",
  "third",
  "furthermore",
  "moreover",
  "specifically",
  "in summary",
  "for example",
  "for instance",
  "in addition",
  "to summarize",
  "pros",
  "cons",
  "advantage",
  "disadvantage",
  "tradeoff",
  "approach",
  "strategy",
  "consideration"
];
var TRADEOFF_KEYWORDS = [
  "tradeoff",
  "trade-off",
  "latency",
  "scale",
  "throughput",
  "cost",
  "bottleneck",
  "failover",
  "concurrency",
  "fallback",
  "cache",
  "consistency",
  "architecture",
  "p99",
  "sharding"
];
function getCandidateCurriculumContext(candidate) {
  const passedMissions = (candidate.missions || []).filter((m) => m.passed === true);
  const passedDays = passedMissions.map((m) => m.day);
  const completedCurriculumDays = curriculumData.days.filter((d) => passedDays.includes(d.day)).map((d) => ({
    day: d.day,
    title: d.title,
    type: d.type,
    tools: d.tools,
    objectives: d.objectives ? d.objectives.slice(0, 4) : []
  }));
  const uncompletedDays = curriculumData.days.filter((d) => !passedDays.includes(d.day)).map((d) => ({
    day: d.day,
    title: d.title
  }));
  const activeCompletedDays = completedCurriculumDays.length > 0 ? completedCurriculumDays : curriculumData.days.slice(0, 5).map((d) => ({
    day: d.day,
    title: d.title,
    type: d.type,
    tools: d.tools,
    objectives: d.objectives ? d.objectives.slice(0, 4) : []
  }));
  return {
    candidateProfile: {
      id: candidate.member.id,
      name: candidate.member.name,
      role: candidate.member.jobRole,
      yearsExperience: candidate.member.yearsExperience,
      education: candidate.member.education,
      skills: candidate.member.skills || ["Vector Databases", "RAG Systems", "LLM Architectures"],
      technologies: candidate.member.technologies || ["Python", "Docker", "Kubernetes"],
      programmingLanguages: candidate.member.programmingLanguages || ["Python"],
      projects: candidate.member.projects || [],
      experience: candidate.member.experience || [],
      certifications: candidate.member.certifications || [],
      internships: candidate.member.internships || [],
      commitDays: candidate.signals?.commitDays,
      missionsCompleted: candidate.signals?.missionsCompleted,
      missionsFirstTry: candidate.signals?.missionsFirstTry
    },
    completedCurriculumDays: activeCompletedDays,
    uncompletedDays
  };
}
function ensureSelected4Days(session) {
  if (session.selectedDays && session.selectedDays.length === 4) {
    return session.selectedDays;
  }
  const context = getCandidateCurriculumContext(session.candidate);
  const passedDays = context.completedCurriculumDays;
  const chosen = [];
  const chosenDayNums = /* @__PURE__ */ new Set();
  for (const d of passedDays) {
    if (chosen.length >= 4) break;
    if (!chosenDayNums.has(d.day)) {
      chosenDayNums.add(d.day);
      chosen.push({
        day: d.day,
        title: d.title,
        type: d.type,
        tools: d.tools,
        objectives: d.objectives && d.objectives.length > 0 ? d.objectives : ["Design and optimization in production"]
      });
    }
  }
  if (chosen.length < 4) {
    for (const d of curriculumData.days) {
      if (chosen.length >= 4) break;
      if (!chosenDayNums.has(d.day)) {
        chosenDayNums.add(d.day);
        chosen.push({
          day: d.day,
          title: d.title,
          type: d.type,
          tools: d.tools,
          objectives: d.objectives && d.objectives.length > 0 ? d.objectives : ["Design and optimization in production"]
        });
      }
    }
  }
  session.selectedDays = chosen.slice(0, 4);
  return session.selectedDays;
}
function cleanJsonText(rawText) {
  if (!rawText) return "{}";
  let cleaned = rawText.trim();
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();
  }
  return cleaned;
}
var geminiQuotaCooldownUntil = 0;
function isGeminiInCooldown() {
  return Date.now() < geminiQuotaCooldownUntil;
}
function setGeminiCooldown(seconds = 60) {
  geminiQuotaCooldownUntil = Date.now() + seconds * 1e3;
}
async function generateContentWithFallback(ai, params) {
  if (isGeminiInCooldown()) {
    throw new Error("Gemini API is in quota cooldown. Using local engine.");
  }
  const models = ["gemini-3.7-flash", "gemini-3.1-flash-lite", "gemini-flash-latest"];
  let lastError = null;
  for (const model of models) {
    try {
      const apiCallPromise = ai.models.generateContent({
        model,
        contents: params.contents,
        config: params.config
      });
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error(`Model ${model} timed out after 5s`)), 5e3);
      });
      const response = await Promise.race([apiCallPromise, timeoutPromise]);
      if (response && response.text) {
        return response;
      }
    } catch (err) {
      lastError = err;
      let errMsg = "";
      if (typeof err?.message === "string") {
        errMsg = err.message;
      } else {
        try {
          errMsg = JSON.stringify(err);
        } catch {
          errMsg = String(err);
        }
      }
      if (errMsg.includes("429") || errMsg.includes("503") || errMsg.includes("RESOURCE_EXHAUSTED") || errMsg.includes("Quota exceeded") || errMsg.includes("high demand") || errMsg.includes("exceeded your current quota")) {
        setGeminiCooldown(60);
        break;
      }
    }
  }
  throw lastError || new Error("Gemini model calls unavailable");
}
function normalizeText(text) {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, " ");
}
function tokenize(text) {
  const stopWords = /* @__PURE__ */ new Set(["is", "a", "the", "and", "or", "in", "on", "at", "for", "with", "to", "of", "that", "this", "it", "by", "as", "an", "be", "are"]);
  return normalizeText(text).split(/\s+/).filter((word) => word.length > 2 && !stopWords.has(word));
}
function extractDomainConcepts(text, currentTopicObjectives = []) {
  const tokens = tokenize(text);
  const found = [];
  TECHNICAL_ONTOLOGY.forEach((term) => {
    if (text.toLowerCase().includes(term) && !found.includes(term)) {
      found.push(term);
    }
  });
  currentTopicObjectives.forEach((obj) => {
    tokenize(obj).forEach((t) => {
      if (tokens.includes(t) && !found.includes(t) && t.length > 4) {
        found.push(t);
      }
    });
  });
  return found;
}
function detectLanguageStyle(text) {
  if (!text) return "english";
  if (/[\u0900-\u097F]/.test(text)) {
    return "hindi";
  }
  const hinglishWords = [
    "kya",
    "kaise",
    "samajh",
    "batao",
    "bataiye",
    "hai",
    "hain",
    "nahi",
    "nahin",
    "mujhe",
    "hum",
    "aap",
    "mera",
    "meri",
    "karo",
    "karna",
    "raha",
    "rahi",
    "sahi",
    "galat",
    "baat",
    "pehle",
    "kuch",
    "bhi",
    "se",
    "ko",
    "par",
    "aur",
    "toh",
    "yeh",
    "woh",
    "achha",
    "accha",
    "kaun",
    "kab",
    "kahan",
    "kyun",
    "kyu",
    "matlab",
    "bolo",
    "ha",
    "haan"
  ];
  const words = text.toLowerCase().split(/\s+/);
  const matchCount = words.filter((w) => hinglishWords.includes(w)).length;
  if (matchCount >= 1 || words.length > 0 && matchCount / words.length > 0.08) {
    return "hinglish";
  }
  return "english";
}
function classifyCandidateIntentLocal(message, activeTopicObjectives = [], candidateSkills = []) {
  const raw = (message || "").trim();
  const lower = raw.toLowerCase();
  const tokens = tokenize(raw);
  if (!raw || raw === "(No answer provided)" || raw === "(Candidate skipped question)" || raw === "n/a" || raw === "none") {
    return {
      intent: "admitting_lack_of_knowledge",
      isClarificationRequest: false,
      isOffTopic: false,
      isExplicitDontKnow: true,
      understandingLevel: "skipped",
      detectedConcepts: [],
      missingTradeoffs: true
    };
  }
  const explanationReqRegex = /\b(explain|samjha|samjhao|samjhayein|detail|details|what is|how does|kaise kaam|kaise karta|tell me about|batao|bataiye)\b/i;
  const clarificationRegex = /\b(clarif|what do you mean|rephrase|repeat|could you explain|what does that mean|didn't understand|didnt understand|don't understand|dont understand|what is meant by|can you elaborate|please elaborate|give an example|give me an example|for example|explain more|explain this|explain further|elaborate|give example)\b/i;
  const isQuestionMarkBrief = lower.endsWith("?") && tokens.length < 12;
  if (explanationReqRegex.test(lower) && (lower.startsWith("what") || lower.startsWith("how") || lower.includes("samjha") || lower.includes("batao") || lower.includes("explain"))) {
    return {
      intent: "asking_explanation",
      isClarificationRequest: true,
      isOffTopic: false,
      isExplicitDontKnow: false,
      understandingLevel: "confused",
      detectedConcepts: extractDomainConcepts(raw, activeTopicObjectives),
      missingTradeoffs: true
    };
  }
  if (clarificationRegex.test(lower) || isQuestionMarkBrief) {
    return {
      intent: "asking_clarification",
      isClarificationRequest: true,
      isOffTopic: false,
      isExplicitDontKnow: false,
      understandingLevel: "confused",
      detectedConcepts: extractDomainConcepts(raw, activeTopicObjectives),
      missingTradeoffs: true
    };
  }
  const confusionRegex = /\b(confused|getting mixed up|hard to follow|lost me|don't get it|dont get it|samajh nahi)\b/i;
  if (confusionRegex.test(lower)) {
    return {
      intent: "expressing_confusion",
      isClarificationRequest: true,
      isOffTopic: false,
      isExplicitDontKnow: false,
      understandingLevel: "confused",
      detectedConcepts: [],
      missingTradeoffs: true
    };
  }
  const dontKnowRegex = /\b(don't know|dont know|no idea|not sure|pass|passing|never used|haven't used|havent used|haven't studied|havent studied|haven't|havent|skip|skipped|skipping|idk|no clue|dunno|pata nahi|maloom nahi|unsure|don't recall|dont recall|no answer|leave this|next question|next|nothing|chhor do|aage badho)\b/i;
  if (dontKnowRegex.test(lower) && tokens.length < 15) {
    return {
      intent: "admitting_lack_of_knowledge",
      isClarificationRequest: false,
      isOffTopic: false,
      isExplicitDontKnow: true,
      understandingLevel: "skipped",
      // Explicitly marked as skipped!
      detectedConcepts: [],
      missingTradeoffs: true
    };
  }
  const detectedConcepts = extractDomainConcepts(message, activeTopicObjectives);
  const hasTradeoff = TRADEOFF_KEYWORDS.some((term) => lower.includes(term));
  if (detectedConcepts.length === 0 && tokens.length < 4 && !dontKnowRegex.test(lower) && !clarificationRegex.test(lower)) {
    return {
      intent: "irrelevant",
      isClarificationRequest: false,
      isOffTopic: true,
      isExplicitDontKnow: false,
      isIrrelevant: true,
      understandingLevel: "irrelevant",
      detectedConcepts: [],
      missingTradeoffs: true
    };
  }
  const skillMatches = candidateSkills.filter((s) => lower.includes(s.toLowerCase())).length;
  if (detectedConcepts.length === 0 && skillMatches === 0 && tokens.length < 5) {
    return {
      intent: "off_topic",
      isClarificationRequest: false,
      isOffTopic: true,
      isExplicitDontKnow: false,
      understandingLevel: "off_topic",
      detectedConcepts: [],
      missingTradeoffs: true
    };
  }
  let understandingLevel = "partial";
  if (tokens.length >= 18 && (detectedConcepts.length >= 2 || hasTradeoff)) {
    understandingLevel = "strong";
  } else if (tokens.length >= 8 || detectedConcepts.length >= 1) {
    understandingLevel = "partial";
  } else {
    understandingLevel = "incorrect";
  }
  return {
    intent: "answering",
    isClarificationRequest: false,
    isOffTopic: false,
    isExplicitDontKnow: false,
    understandingLevel,
    detectedConcepts,
    missingTradeoffs: !hasTradeoff
  };
}
function extractCandidateDemonstratedContext(conversationHistory, candidate) {
  const mentionedProjects = [];
  const mentionedTechnologies = [];
  const demonstratedConcepts = [];
  const candidateMsgs = conversationHistory.filter((c) => c.role === "candidate");
  const allCandidateText = candidateMsgs.map((c) => c.text).join(" ").toLowerCase();
  (candidate.member.projects || []).forEach((p) => {
    if (p.name && allCandidateText.includes(p.name.toLowerCase()) && !mentionedProjects.includes(p.name)) {
      mentionedProjects.push(p.name);
    }
  });
  const allKnownTechs = [
    ...candidate.member.technologies || [],
    ...candidate.member.skills || [],
    ...candidate.member.programmingLanguages || []
  ];
  allKnownTechs.forEach((tech) => {
    if (tech && allCandidateText.includes(tech.toLowerCase()) && !mentionedTechnologies.includes(tech)) {
      mentionedTechnologies.push(tech);
    }
  });
  TECHNICAL_ONTOLOGY.forEach((term) => {
    if (allCandidateText.includes(term) && !demonstratedConcepts.includes(term)) {
      demonstratedConcepts.push(term);
    }
  });
  return {
    mentionedProjects,
    mentionedTechnologies,
    demonstratedConcepts
  };
}
function generateLocalResponse(session, candidateMessage) {
  const context = getCandidateCurriculumContext(session.candidate);
  const candidateName = context.candidateProfile.name;
  const candidateRole = context.candidateProfile.role;
  const candidateExp = context.candidateProfile.yearsExperience;
  const projects = context.candidateProfile.projects;
  const skills = context.candidateProfile.skills;
  const technologies = context.candidateProfile.technologies;
  const languages = context.candidateProfile.programmingLanguages;
  const selected4Days = ensureSelected4Days(session);
  const nextQNum = candidateMessage ? Math.min(session.questionsAsked + 1, 8) : 1;
  const dayIndex = Math.min(Math.floor((nextQNum - 1) / 2), 3);
  const targetDayObj = selected4Days[dayIndex];
  const isSecondQuestionOnDay = nextQNum % 2 === 0;
  const demonstratedContext = extractCandidateDemonstratedContext(
    session.conversationHistory,
    session.candidate
  );
  const targetTopicLower = (targetDayObj.title + " " + (targetDayObj.objectives || []).join(" ")).toLowerCase();
  const matchedProject = projects.find((p) => {
    const pText = (p.name + " " + (p.description || "") + " " + (p.technologies || []).join(" ")).toLowerCase();
    return targetTopicLower.split(/\s+/).some((w) => w.length > 4 && pText.includes(w));
  }) || projects[0];
  const matchedTechs = technologies.filter((t) => targetTopicLower.includes(t.toLowerCase()));
  const candidatePrimaryTech = matchedTechs.length > 0 ? matchedTechs[0] : technologies[0] || languages && languages[0] || "your production stack";
  if (!candidateMessage || session.questionsAsked === 0) {
    let profileIntro = "";
    if (matchedProject) {
      profileIntro = ` Drawing from your experience as a ${candidateRole} (${candidateExp} years experience) and your work on "${matchedProject.name}" with ${matchedProject.technologies?.slice(0, 2).join(" and ") || candidatePrimaryTech},`;
    } else if (technologies.length > 0) {
      profileIntro = ` Drawing from your experience as a ${candidateRole} working with ${technologies.slice(0, 2).join(" and ")},`;
    } else {
      profileIntro = ` With your background as a ${candidateRole},`;
    }
    const primaryObjective = targetDayObj.objectives[0] || "How do you optimize vector retrieval accuracy?";
    return {
      reply: `Welcome ${candidateName}!${profileIntro} let's begin our technical interview with Question 1 of 8 on Day ${targetDayObj.day}: ${targetDayObj.title}. Why is ${primaryObjective} essential in this architecture, and what fundamental mechanism in ${candidatePrimaryTech} enables it?`,
      topic: targetDayObj.title,
      curriculumDay: targetDayObj.day,
      isFollowUp: false,
      shouldAdvanceQuestionCount: true
    };
  }
  const langStyle = detectLanguageStyle(candidateMessage);
  const analysis = classifyCandidateIntentLocal(candidateMessage, targetDayObj.objectives, skills);
  const rawMsg = candidateMessage.trim();
  const detectedConcepts = analysis.detectedConcepts;
  let dynamicSubject = "";
  if (detectedConcepts.length > 0) {
    dynamicSubject = detectedConcepts[0];
  } else {
    const tokens = tokenize(rawMsg);
    if (tokens.length > 0) {
      dynamicSubject = tokens[0];
    }
  }
  if (analysis.intent === "asking_explanation" || analysis.intent === "asking_clarification" || analysis.intent === "expressing_confusion") {
    const objClarification = targetDayObj.objectives[0] || "the core design requirements";
    const topicFocus = dynamicSubject ? dynamicSubject : targetDayObj.title;
    if (langStyle === "hinglish") {
      return {
        reply: `Haan bilkul! Day ${targetDayObj.day} (${targetDayObj.title}) me ${topicFocus} ka matlab hai: ${objClarification}. Real production environment me aapke stack (${candidatePrimaryTech}) ke saath isko kaise configure karenge?`,
        topic: targetDayObj.title,
        curriculumDay: targetDayObj.day,
        isFollowUp: true,
        shouldAdvanceQuestionCount: false,
        intentAnalysis: analysis
      };
    } else if (langStyle === "hindi") {
      return {
        reply: `\u092C\u093F\u0932\u094D\u0915\u0941\u0932! Day ${targetDayObj.day} (${targetDayObj.title}) \u092E\u0947\u0902 ${topicFocus} \u0915\u0947 \u092C\u093E\u0930\u0947 \u092E\u0947\u0902: \u092E\u0941\u0916\u094D\u092F \u0909\u0926\u094D\u0926\u0947\u0936\u094D\u092F \u0939\u0948 ${objClarification}\u0964 \u0906\u092A \u0935\u093E\u0938\u094D\u0924\u0935\u093F\u0915 \u0909\u0924\u094D\u092A\u093E\u0926\u0928 \u0938\u0947\u091F\u0905\u092A \u092E\u0947\u0902 ${candidatePrimaryTech} \u0915\u0947 \u0938\u093E\u0925 \u0907\u0938\u0947 \u0915\u0948\u0938\u0947 \u0932\u093E\u0917\u0942 \u0915\u0930\u0947\u0902\u0917\u0947?`,
        topic: targetDayObj.title,
        curriculumDay: targetDayObj.day,
        isFollowUp: true,
        shouldAdvanceQuestionCount: false,
        intentAnalysis: analysis
      };
    } else {
      return {
        reply: `To clarify Day ${targetDayObj.day} (${targetDayObj.title}) regarding ${topicFocus}: our core focus is ${objClarification}. Specifically, how would you configure ${candidatePrimaryTech} in your pipeline to manage this in practice?`,
        topic: targetDayObj.title,
        curriculumDay: targetDayObj.day,
        isFollowUp: true,
        shouldAdvanceQuestionCount: false,
        intentAnalysis: analysis
      };
    }
  }
  if (analysis.intent === "admitting_lack_of_knowledge" || analysis.understandingLevel === "skipped") {
    const objText = targetDayObj.objectives[0] || "the core system requirement";
    return {
      reply: `Understood! We will skip this question and move forward. Let's move to Question #${nextQNum} of 8 on Day ${targetDayObj.day}: ${targetDayObj.title}. When dealing with ${objText} in ${candidatePrimaryTech}, what is the primary technical trade-off you evaluate?`,
      topic: targetDayObj.title,
      curriculumDay: targetDayObj.day,
      isFollowUp: isSecondQuestionOnDay,
      shouldAdvanceQuestionCount: true,
      intentAnalysis: analysis
    };
  }
  if (analysis.intent === "irrelevant" || analysis.understandingLevel === "irrelevant") {
    const objText = targetDayObj.objectives[0] || "the core architecture";
    return {
      reply: `That response doesn't seem directly connected to our discussion on ${targetDayObj.title}. To keep our technical evaluation focused, let's proceed to Question #${nextQNum} of 8 on Day ${targetDayObj.day} (${targetDayObj.title}): How do you handle ${objText} in ${candidatePrimaryTech}?`,
      topic: targetDayObj.title,
      curriculumDay: targetDayObj.day,
      isFollowUp: isSecondQuestionOnDay,
      shouldAdvanceQuestionCount: true,
      intentAnalysis: analysis
    };
  }
  if (analysis.intent === "off_topic") {
    if (langStyle === "hinglish") {
      return {
        reply: `Aapne ${dynamicSubject || "is point"} ki baat ki. Technical context ko maintain karne ke liye, Question #${nextQNum} (Day ${targetDayObj.day}: ${targetDayObj.title}) par aate hain: aap ${candidatePrimaryTech} me is requirement ko kaise approach karte hain?`,
        topic: targetDayObj.title,
        curriculumDay: targetDayObj.day,
        isFollowUp: true,
        shouldAdvanceQuestionCount: false,
        intentAnalysis: analysis
      };
    } else if (langStyle === "hindi") {
      return {
        reply: `\u0906\u092A\u0928\u0947 ${dynamicSubject || "\u0907\u0938 \u0935\u093F\u0937\u092F"} \u0915\u093E \u0909\u0932\u094D\u0932\u0947\u0916 \u0915\u093F\u092F\u093E\u0964 \u0906\u0907\u090F \u0924\u0915\u0928\u0940\u0915\u0940 \u092E\u0942\u0932\u094D\u092F\u093E\u0902\u0915\u0928 \u0915\u0947 \u0932\u093F\u090F Question #${nextQNum} (Day ${targetDayObj.day}: ${targetDayObj.title}) \u092A\u0930 \u0927\u094D\u092F\u093E\u0928 \u0915\u0947\u0902\u0926\u094D\u0930\u093F\u0924 \u0915\u0930\u0947\u0902: ${candidatePrimaryTech} \u092E\u0947\u0902 \u0906\u092A\u0915\u093E \u0915\u094D\u092F\u093E \u0926\u0943\u0937\u094D\u091F\u093F\u0915\u094B\u0923 \u0930\u0939\u0947\u0917\u093E?`,
        topic: targetDayObj.title,
        curriculumDay: targetDayObj.day,
        isFollowUp: true,
        shouldAdvanceQuestionCount: false,
        intentAnalysis: analysis
      };
    } else {
      return {
        reply: `I see you mentioned ${dynamicSubject || "that aspect"}. To keep our technical evaluation structured, let's connect that back to Question #${nextQNum} on Day ${targetDayObj.day} (${targetDayObj.title}): how does ${dynamicSubject || "this"} impact ${targetDayObj.objectives[0] || "your system design"} in ${candidatePrimaryTech}?`,
        topic: targetDayObj.title,
        curriculumDay: targetDayObj.day,
        isFollowUp: true,
        shouldAdvanceQuestionCount: false,
        intentAnalysis: analysis
      };
    }
  }
  let qualityPrefix = "";
  if (analysis.understandingLevel === "strong") {
    qualityPrefix = dynamicSubject ? `Good analysis on ${dynamicSubject}. ` : `Solid explanation. `;
  } else if (analysis.understandingLevel === "partial") {
    qualityPrefix = dynamicSubject ? `Thanks for your thoughts on ${dynamicSubject}. ` : `Noted. `;
  } else if (analysis.understandingLevel === "incorrect") {
    qualityPrefix = dynamicSubject ? `I see your perspective on ${dynamicSubject}, though production systems often require different safeguards. ` : `Understood. `;
  }
  if (nextQNum === 2) {
    if (langStyle === "hinglish") {
      return {
        reply: `${qualityPrefix}Question #2 (Day ${targetDayObj.day}: ${targetDayObj.title}): Maan lijiye production me ${dynamicSubject || candidatePrimaryTech} index update ke baad irrelevant chunks return karne lage. Is scenario me aap root cause diagnose karne ke liye kaunse exact metrics ya pipeline stages sabse pehle inspect karenge?`,
        topic: targetDayObj.title,
        curriculumDay: targetDayObj.day,
        isFollowUp: true,
        shouldAdvanceQuestionCount: true,
        intentAnalysis: analysis
      };
    } else if (langStyle === "hindi") {
      return {
        reply: `${qualityPrefix}Question #2 (Day ${targetDayObj.day}: ${targetDayObj.title}): \u092E\u093E\u0928 \u0932\u0940\u091C\u093F\u090F \u0909\u0924\u094D\u092A\u093E\u0926\u0928 \u092E\u0947\u0902 ${dynamicSubject || candidatePrimaryTech} \u0907\u0902\u0921\u0947\u0915\u094D\u0938 \u0905\u092A\u0921\u0947\u091F \u0915\u0947 \u092C\u093E\u0926 \u0905\u092A\u094D\u0930\u093E\u0938\u0902\u0917\u093F\u0915 \u092A\u0930\u093F\u0923\u093E\u092E \u0926\u0947\u0928\u0947 \u0932\u0917\u0947\u0964 \u0906\u092A \u092E\u0942\u0932 \u0915\u093E\u0930\u0923 \u0915\u093E \u0928\u093F\u0926\u093E\u0928 \u0915\u0930\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u0938\u092C\u0938\u0947 \u092A\u0939\u0932\u0947 \u0915\u093F\u0928 \u092E\u0948\u091F\u094D\u0930\u093F\u0915\u094D\u0938 \u092F\u093E \u092A\u093E\u0907\u092A\u0932\u093E\u0907\u0928 \u091A\u0930\u0923\u094B\u0902 \u0915\u0940 \u091C\u093E\u0902\u091A \u0915\u0930\u0947\u0902\u0917\u0947?`,
        topic: targetDayObj.title,
        curriculumDay: targetDayObj.day,
        isFollowUp: true,
        shouldAdvanceQuestionCount: true,
        intentAnalysis: analysis
      };
    } else {
      return {
        reply: `${qualityPrefix}Moving to Question #2 on Day ${targetDayObj.day} (${targetDayObj.title}): Suppose in production your ${dynamicSubject || candidatePrimaryTech} setup suddenly returns irrelevant or degraded chunks after an index update. What specific similarity metrics, embeddings, or pipeline stages would you inspect first to diagnose the root cause?`,
        topic: targetDayObj.title,
        curriculumDay: targetDayObj.day,
        isFollowUp: true,
        shouldAdvanceQuestionCount: true,
        intentAnalysis: analysis
      };
    }
  }
  if (nextQNum === 3) {
    const objText = targetDayObj.objectives[0] || "data ingestion and processing";
    if (langStyle === "hinglish") {
      return {
        reply: `${qualityPrefix}Aaiye ab Question #3 ke liye next topic par chalte hain: Day ${targetDayObj.day} (${targetDayObj.title}). ${objText} ke liye different strategies compare karte waqt, ${candidatePrimaryTech} me ek approach choose karne ka technical criteria kya hota hai?`,
        topic: targetDayObj.title,
        curriculumDay: targetDayObj.day,
        isFollowUp: false,
        shouldAdvanceQuestionCount: true,
        intentAnalysis: analysis
      };
    } else if (langStyle === "hindi") {
      return {
        reply: `${qualityPrefix}\u0906\u0907\u090F \u0905\u092C Question #3 \u0915\u0947 \u0932\u093F\u090F \u0905\u0917\u0932\u0947 \u0935\u093F\u0937\u092F \u092A\u0930 \u092C\u0922\u093C\u0924\u0947 \u0939\u0948\u0902: Day ${targetDayObj.day} (${targetDayObj.title})\u0964 ${objText} \u0915\u0947 \u0932\u093F\u090F \u0935\u093F\u092D\u093F\u0928\u094D\u0928 \u0930\u0923\u0928\u0940\u0924\u093F\u092F\u094B\u0902 \u0915\u0940 \u0924\u0941\u0932\u0928\u093E \u0915\u0930\u0924\u0947 \u0938\u092E\u092F, ${candidatePrimaryTech} \u092E\u0947\u0902 \u090F\u0915 \u0926\u0943\u0937\u094D\u091F\u093F\u0915\u094B\u0923 \u091A\u0941\u0928\u0928\u0947 \u0915\u0947 \u0924\u0915\u0928\u0940\u0915\u0940 \u092E\u093E\u0928\u0926\u0902\u0921 \u0915\u094D\u092F\u093E \u0939\u0948\u0902?`,
        topic: targetDayObj.title,
        curriculumDay: targetDayObj.day,
        isFollowUp: false,
        shouldAdvanceQuestionCount: true,
        intentAnalysis: analysis
      };
    } else {
      return {
        reply: `${qualityPrefix}Let's proceed to Question #3 of 8 on Day ${targetDayObj.day}: ${targetDayObj.title}. When comparing different architectural strategies for ${objText}, what concrete technical criteria guide when you would choose one approach over another in ${candidatePrimaryTech}?`,
        topic: targetDayObj.title,
        curriculumDay: targetDayObj.day,
        isFollowUp: false,
        shouldAdvanceQuestionCount: true,
        intentAnalysis: analysis
      };
    }
  }
  if (nextQNum === 4) {
    if (langStyle === "hinglish") {
      return {
        reply: `${qualityPrefix}Question #4 (Day ${targetDayObj.day}: ${targetDayObj.title}): ${dynamicSubject || candidatePrimaryTech} ke context me, aap practically kaise measure aur benchmark karte hain ki aapka system accuracy aur latency thresholds par khara utar raha hai?`,
        topic: targetDayObj.title,
        curriculumDay: targetDayObj.day,
        isFollowUp: true,
        shouldAdvanceQuestionCount: true,
        intentAnalysis: analysis
      };
    } else if (langStyle === "hindi") {
      return {
        reply: `${qualityPrefix}Question #4 (Day ${targetDayObj.day}: ${targetDayObj.title}): ${dynamicSubject || candidatePrimaryTech} \u0915\u0947 \u0938\u0902\u0926\u0930\u094D\u092D \u092E\u0947\u0902, \u0906\u092A \u0935\u094D\u092F\u093E\u0935\u0939\u093E\u0930\u093F\u0915 \u0930\u0942\u092A \u0938\u0947 \u0915\u0948\u0938\u0947 \u092E\u093E\u092A\u0924\u0947 \u0939\u0948\u0902 \u0915\u093F \u0906\u092A\u0915\u0940 \u092A\u094D\u0930\u0923\u093E\u0932\u0940 \u0938\u091F\u0940\u0915\u0924\u093E \u0914\u0930 \u0932\u0947\u091F\u0947\u0902\u0938\u0940 \u0938\u0940\u092E\u093E\u0913\u0902 \u0915\u094B \u092A\u0942\u0930\u093E \u0915\u0930 \u0930\u0939\u0940 \u0939\u0948?`,
        topic: targetDayObj.title,
        curriculumDay: targetDayObj.day,
        isFollowUp: true,
        shouldAdvanceQuestionCount: true,
        intentAnalysis: analysis
      };
    } else {
      return {
        reply: `${qualityPrefix}For Question #4 on Day ${targetDayObj.day} (${targetDayObj.title}): Following up on your discussion of ${dynamicSubject || candidatePrimaryTech}, how do you practically evaluate and benchmark whether this implementation is meeting target precision and latency thresholds under real-world traffic?`,
        topic: targetDayObj.title,
        curriculumDay: targetDayObj.day,
        isFollowUp: true,
        shouldAdvanceQuestionCount: true,
        intentAnalysis: analysis
      };
    }
  }
  if (nextQNum === 5) {
    const objText = targetDayObj.objectives[0] || "service orchestration";
    if (langStyle === "hinglish") {
      return {
        reply: `${qualityPrefix}Moving to Question #5 on Day ${targetDayObj.day}: ${targetDayObj.title}. ${candidatePrimaryTech} me ${objText} ke dauran kaunse subtle failure modes ya edge cases (jaise memory leaks ya context fragmentation) bottleneck ban sakte hain?`,
        topic: targetDayObj.title,
        curriculumDay: targetDayObj.day,
        isFollowUp: false,
        shouldAdvanceQuestionCount: true,
        intentAnalysis: analysis
      };
    } else if (langStyle === "hindi") {
      return {
        reply: `${qualityPrefix}Question #5 \u0915\u0947 \u0932\u093F\u090F Day ${targetDayObj.day}: ${targetDayObj.title} \u092A\u0930 \u092C\u0922\u093C\u0924\u0947 \u0939\u0948\u0902\u0964 ${candidatePrimaryTech} \u092E\u0947\u0902 ${objText} \u0915\u0947 \u0926\u094C\u0930\u093E\u0928 \u0915\u094C\u0928 \u0938\u0947 \u0905\u092A\u094D\u0930\u0924\u094D\u092F\u093E\u0936\u093F\u0924 \u0935\u093F\u092B\u0932\u0924\u093E \u092E\u094B\u0921 \u092F\u093E \u092C\u0949\u091F\u0932\u0928\u0947\u0915 \u0909\u0924\u094D\u092A\u0928\u094D\u0928 \u0939\u094B \u0938\u0915\u0924\u0947 \u0939\u0948\u0902?`,
        topic: targetDayObj.title,
        curriculumDay: targetDayObj.day,
        isFollowUp: false,
        shouldAdvanceQuestionCount: true,
        intentAnalysis: analysis
      };
    } else {
      return {
        reply: `${qualityPrefix}Turning to Question #5 of 8 on Day ${targetDayObj.day}: ${targetDayObj.title}. What subtle failure modes or edge-case bottlenecks (such as context fragmentation or memory pressure) can cause ${objText} to degrade when implemented with ${candidatePrimaryTech}?`,
        topic: targetDayObj.title,
        curriculumDay: targetDayObj.day,
        isFollowUp: false,
        shouldAdvanceQuestionCount: true,
        intentAnalysis: analysis
      };
    }
  }
  if (nextQNum === 6) {
    if (langStyle === "hinglish") {
      return {
        reply: `${qualityPrefix}Question #6 (Day ${targetDayObj.day}: ${targetDayObj.title}): ${dynamicSubject || "is failure scenario"} ko prevent karne ke liye aap ${candidatePrimaryTech} me kaunsa circuit-breaker ya retry fallback mechanism implement karenge?`,
        topic: targetDayObj.title,
        curriculumDay: targetDayObj.day,
        isFollowUp: true,
        shouldAdvanceQuestionCount: true,
        intentAnalysis: analysis
      };
    } else if (langStyle === "hindi") {
      return {
        reply: `${qualityPrefix}Question #6 (Day ${targetDayObj.day}: ${targetDayObj.title}): ${dynamicSubject || "\u0907\u0938 \u0935\u093F\u092B\u0932\u0924\u093E \u092A\u0930\u093F\u0926\u0943\u0936\u094D\u092F"} \u0915\u094B \u0930\u094B\u0915\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u0906\u092A ${candidatePrimaryTech} \u092E\u0947\u0902 \u0915\u094C\u0928 \u0938\u093E \u092B\u0949\u0932\u092C\u0948\u0915 \u092F\u093E \u0938\u0930\u094D\u0915\u093F\u091F-\u092C\u094D\u0930\u0947\u0915\u0930 \u0924\u0902\u0924\u094D\u0930 \u0932\u093E\u0917\u0942 \u0915\u0930\u0947\u0902\u0917\u0947?`,
        topic: targetDayObj.title,
        curriculumDay: targetDayObj.day,
        isFollowUp: true,
        shouldAdvanceQuestionCount: true,
        intentAnalysis: analysis
      };
    } else {
      return {
        reply: `${qualityPrefix}For Question #6 on Day ${targetDayObj.day} (${targetDayObj.title}): In light of your points on ${dynamicSubject || candidatePrimaryTech}, what concrete mitigation pattern (such as circuit-breaking, backpressure management, or fallback caches) would you implement to guarantee high availability?`,
        topic: targetDayObj.title,
        curriculumDay: targetDayObj.day,
        isFollowUp: true,
        shouldAdvanceQuestionCount: true,
        intentAnalysis: analysis
      };
    }
  }
  if (nextQNum === 7) {
    const objText = targetDayObj.objectives[0] || "the core architecture";
    const projectRef = matchedProject ? `your project "${matchedProject.name}"` : `your experience with ${candidatePrimaryTech}`;
    if (langStyle === "hinglish") {
      return {
        reply: `${qualityPrefix}Aaiye ab Day ${targetDayObj.day} (${targetDayObj.title}) ke sath Question #7 par chalte hain. ${projectRef} ke background ko dhyan me rakhte hue, aap ${objText} ke metadata structure aur access controls ko kaise design karenge?`,
        topic: targetDayObj.title,
        curriculumDay: targetDayObj.day,
        isFollowUp: false,
        shouldAdvanceQuestionCount: true,
        intentAnalysis: analysis
      };
    } else if (langStyle === "hindi") {
      return {
        reply: `${qualityPrefix}\u0906\u0907\u090F \u0905\u092C Day ${targetDayObj.day} (${targetDayObj.title}) \u0915\u0947 \u0938\u093E\u0925 Question #7 \u092A\u0930 \u092C\u0922\u093C\u0924\u0947 \u0939\u0948\u0902\u0964 ${projectRef} \u0915\u0947 \u0906\u0927\u093E\u0930 \u092A\u0930, \u0906\u092A ${objText} \u0915\u0947 \u0932\u093F\u090F \u0921\u0947\u091F\u093E \u0938\u0902\u0930\u091A\u0928\u093E \u0914\u0930 \u090F\u0915\u094D\u0938\u0947\u0938 \u0928\u093F\u092F\u0902\u0924\u094D\u0930\u0923 \u0915\u0948\u0938\u0947 \u0921\u093F\u091C\u093E\u0907\u0928 \u0915\u0930\u0947\u0902\u0917\u0947?`,
        topic: targetDayObj.title,
        curriculumDay: targetDayObj.day,
        isFollowUp: false,
        shouldAdvanceQuestionCount: true,
        intentAnalysis: analysis
      };
    } else {
      return {
        reply: `${qualityPrefix}Moving to Question #7 of 8 on Day ${targetDayObj.day}: ${targetDayObj.title}. Drawing directly from ${projectRef}: How would you structure metadata filtering and state partitioning for ${objText} to ensure strict isolation and consistency?`,
        topic: targetDayObj.title,
        curriculumDay: targetDayObj.day,
        isFollowUp: false,
        shouldAdvanceQuestionCount: true,
        intentAnalysis: analysis
      };
    }
  }
  if (langStyle === "hinglish") {
    return {
      reply: `${qualityPrefix}Yeh hamara final Question #8 of 8 hai (Day ${targetDayObj.day}: ${targetDayObj.title}): Maan lijiye peak production traffic me ${dynamicSubject || candidatePrimaryTech} par sudden p99 latency spike aur queue backup shuru ho jata hai. Step-by-step batayein ki aap root cause ko isolate aur resolve karne ke liye kya triage procedure follow karenge?`,
      topic: targetDayObj.title,
      curriculumDay: targetDayObj.day,
      isFollowUp: true,
      shouldAdvanceQuestionCount: true,
      intentAnalysis: analysis
    };
  } else if (langStyle === "hindi") {
    return {
      reply: `${qualityPrefix}\u092F\u0939 \u0939\u092E\u093E\u0930\u093E \u0905\u0902\u0924\u093F\u092E Question #8 of 8 \u0939\u0948 (Day ${targetDayObj.day}: ${targetDayObj.title}): \u092E\u093E\u0928 \u0932\u0940\u091C\u093F\u090F \u092A\u0940\u0915 \u092A\u094D\u0930\u094B\u0921\u0915\u094D\u0936\u0928 \u091F\u094D\u0930\u0948\u092B\u093F\u0915 \u092E\u0947\u0902 ${dynamicSubject || candidatePrimaryTech} \u092A\u0930 \u0905\u091A\u093E\u0928\u0915 p99 \u0932\u0947\u091F\u0947\u0902\u0938\u0940 \u0938\u094D\u092A\u093E\u0907\u0915 \u0939\u094B \u091C\u093E\u0924\u093E \u0939\u0948\u0964 \u0906\u092A \u092E\u0942\u0932 \u0915\u093E\u0930\u0923 \u0915\u094B \u0905\u0932\u0917 \u0915\u0930\u0928\u0947 \u0914\u0930 \u0939\u0932 \u0915\u0930\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u091A\u0930\u0923-\u0926\u0930-\u091A\u0930\u0923 \u0915\u094D\u092F\u093E \u092A\u094D\u0930\u0915\u094D\u0930\u093F\u092F\u093E \u0905\u092A\u0928\u093E\u090F\u0902\u0917\u0947?`,
      topic: targetDayObj.title,
      curriculumDay: targetDayObj.day,
      isFollowUp: true,
      shouldAdvanceQuestionCount: true,
      intentAnalysis: analysis
    };
  } else {
    return {
      reply: `${qualityPrefix}This is Question #8 of 8 (our final question) on Day ${targetDayObj.day} (${targetDayObj.title}): Suppose during a peak traffic surge, your ${dynamicSubject || candidatePrimaryTech} service suffers an unexpected p99 latency spike and downstream timeouts. Walk me through your step-by-step live incident triage procedure to isolate and resolve the root bottleneck.`,
      topic: targetDayObj.title,
      curriculumDay: targetDayObj.day,
      isFollowUp: true,
      shouldAdvanceQuestionCount: true,
      intentAnalysis: analysis
    };
  }
}
function processLocalInterviewStep(session, candidateMessage) {
  if (!session.memoryLayer) {
    session.memoryLayer = [];
  }
  const selected4Days = ensureSelected4Days(session);
  if (candidateMessage && session.questionsAsked >= 8) {
    const activeQ = session.activeQuestion?.text || "Question #8";
    const activeTopic = session.activeQuestion?.topic || selected4Days[3].title;
    const activeDay = session.activeQuestion?.curriculumDay || selected4Days[3].day;
    const analysis = classifyCandidateIntentLocal(
      candidateMessage,
      [activeTopic],
      session.candidate.member.skills
    );
    let localScore = 6;
    let localStatus = "partially_correct";
    let localReason = "Evaluated final candidate response using local engine.";
    if (analysis.understandingLevel === "strong") {
      localScore = 9;
      localStatus = "correct";
      localReason = "Candidate clearly articulated technical details and domain reasoning.";
    } else if (analysis.understandingLevel === "incorrect") {
      localScore = 3;
      localStatus = "incorrect";
      localReason = "Answer contained misconceptions or lacked technical depth.";
    } else if (analysis.understandingLevel === "confused") {
      localScore = 2;
      localStatus = "confused";
      localReason = "Candidate expressed confusion or requested explanation.";
    }
    const memoryRecord = {
      id: `mem_local_${Date.now()}_${session.memoryLayer.length + 1}`,
      questionNumber: 8,
      question: activeQ,
      topic: activeTopic,
      curriculumDay: activeDay,
      difficulty: session.activeQuestion?.difficulty || session.currentDifficulty,
      candidateAnswer: candidateMessage,
      score: localScore,
      status: localStatus,
      reason: localReason,
      conceptsDemonstrated: analysis.detectedConcepts || [],
      conceptsMissingOrFlawed: analysis.missingTradeoffs ? ["Production Trade-offs & Bottlenecks"] : [],
      timestamp: Date.now()
    };
    session.memoryLayer.push(memoryRecord);
    if (!session.evaluationHistory) session.evaluationHistory = [];
    session.evaluationHistory.push({
      turnNumber: session.conversationHistory.length,
      answerStatus: analysis.understandingLevel,
      isClarificationRequest: analysis.isClarificationRequest,
      isOffTopic: analysis.isOffTopic,
      isAnswered: !analysis.isClarificationRequest && !analysis.isOffTopic,
      conceptsUnderstood: analysis.detectedConcepts,
      conceptsMissing: analysis.missingTradeoffs ? ["System Trade-offs & Bottlenecks"] : [],
      feedbackComment: `Score: ${localScore}/10 (${localStatus}) - ${localReason}`
    });
    session.questionsAsked = 8;
    const feedback = analyzeCandidateAnswersLocal(session.candidate, session.conversationHistory);
    session.done = true;
    session.feedback = feedback;
    return {
      reply: `Thank you, ${session.candidate?.member?.name || "Candidate"}. That concludes our 8-question technical interview evaluation covering 4 core topics. Compiling your final Performance Report now...`,
      done: true,
      feedback,
      questionNumber: 8,
      daysCoveredCount: session.daysCovered.length,
      topic: activeTopic,
      curriculumDay: activeDay,
      isFollowUp: false,
      currentDifficulty: session.currentDifficulty
    };
  }
  const stepResult = generateLocalResponse(session, candidateMessage);
  if (candidateMessage && stepResult.intentAnalysis) {
    const analysis = stepResult.intentAnalysis;
    let localScore = 7;
    let localStatus = "partially_correct";
    let localReason = "Evaluated response using local NLP engine.";
    if (analysis.understandingLevel === "strong") {
      localScore = 9;
      localStatus = "correct";
      localReason = "Candidate clearly articulated technical details and domain reasoning.";
    } else if (analysis.understandingLevel === "incorrect") {
      localScore = 3;
      localStatus = "incorrect";
      localReason = "Answer contained misconceptions or lacked technical depth.";
    } else if (analysis.understandingLevel === "confused") {
      localScore = 2;
      localStatus = "confused";
      localReason = "Candidate expressed confusion or requested explanation.";
    } else if (analysis.isClarificationRequest) {
      localScore = 5;
      localStatus = "clarification_requested";
      localReason = "Candidate requested clarification or an example.";
    } else if (analysis.missingTradeoffs) {
      localScore = 6;
      localStatus = "minor_mistake";
      localReason = "Answer was partially correct but missed critical production trade-offs.";
    }
    const memoryRecord = {
      id: `mem_local_${Date.now()}_${session.memoryLayer.length + 1}`,
      questionNumber: session.questionsAsked || 1,
      question: session.activeQuestion?.text || "Initial Question",
      topic: session.activeQuestion?.topic || stepResult.topic,
      curriculumDay: session.activeQuestion?.curriculumDay || stepResult.curriculumDay,
      difficulty: session.activeQuestion?.difficulty || session.currentDifficulty,
      candidateAnswer: candidateMessage,
      score: localScore,
      status: localStatus,
      reason: localReason,
      conceptsDemonstrated: analysis.detectedConcepts || [],
      conceptsMissingOrFlawed: analysis.missingTradeoffs ? ["Production Trade-offs & Bottlenecks"] : [],
      timestamp: Date.now()
    };
    session.memoryLayer.push(memoryRecord);
    if (!session.evaluationHistory) session.evaluationHistory = [];
    session.evaluationHistory.push({
      turnNumber: session.conversationHistory.length,
      answerStatus: analysis.understandingLevel,
      isClarificationRequest: analysis.isClarificationRequest,
      isOffTopic: analysis.isOffTopic,
      isAnswered: !analysis.isClarificationRequest && !analysis.isOffTopic,
      conceptsUnderstood: analysis.detectedConcepts,
      conceptsMissing: analysis.missingTradeoffs ? ["System Trade-offs & Production Bottlenecks"] : [],
      feedbackComment: `Score: ${localScore}/10 (${localStatus}) - ${localReason}`
    });
    if (analysis.detectedConcepts.length > 0) {
      if (!session.conceptsUnderstood) session.conceptsUnderstood = [];
      analysis.detectedConcepts.forEach((c) => {
        if (!session.conceptsUnderstood.includes(c)) session.conceptsUnderstood.push(c);
      });
    }
    if (analysis.missingTradeoffs) {
      if (!session.conceptsStruggling) session.conceptsStruggling = [];
      if (!session.conceptsStruggling.includes("Production Trade-offs & Scalability")) {
        session.conceptsStruggling.push("Production Trade-offs & Scalability");
      }
    }
    if (candidateMessage) {
      session.questionsAsked += 1;
      if (stepResult.curriculumDay && !session.daysCovered.includes(stepResult.curriculumDay)) {
        session.daysCovered.push(stepResult.curriculumDay);
      }
      if (stepResult.topic && !session.topicsCovered.includes(stepResult.topic)) {
        session.topicsCovered.push(stepResult.topic);
      }
    }
    if (analysis.understandingLevel === "strong") {
      session.currentDifficulty = "hard";
    } else if (analysis.understandingLevel === "incorrect" || analysis.understandingLevel === "confused") {
      session.currentDifficulty = "easy";
    } else {
      session.currentDifficulty = "medium";
    }
  } else if (!candidateMessage) {
    if (stepResult.curriculumDay && !session.daysCovered.includes(stepResult.curriculumDay)) {
      session.daysCovered.push(stepResult.curriculumDay);
    }
    if (stepResult.topic && !session.topicsCovered.includes(stepResult.topic)) {
      session.topicsCovered.push(stepResult.topic);
    }
    session.questionsAsked = 1;
  }
  session.conversationHistory.push({
    role: "interviewer",
    text: stepResult.reply,
    dayCovered: stepResult.curriculumDay,
    topic: stepResult.topic
  });
  session.activeQuestion = {
    text: stepResult.reply,
    topic: stepResult.topic,
    curriculumDay: stepResult.curriculumDay,
    difficulty: session.currentDifficulty
  };
  return {
    reply: stepResult.reply,
    done: false,
    questionNumber: session.questionsAsked,
    daysCoveredCount: session.daysCovered.length,
    currentDayTitle: stepResult.topic,
    topic: stepResult.topic,
    curriculumDay: stepResult.curriculumDay,
    isFollowUp: stepResult.isFollowUp,
    isClarificationRequest: stepResult.intentAnalysis?.isClarificationRequest,
    isOffTopic: stepResult.intentAnalysis?.isOffTopic,
    currentDifficulty: session.currentDifficulty
  };
}
async function processGeminiInterviewStep(session, candidateMessage) {
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build"
      },
      retryOptions: {
        attempts: 1
      }
    }
  });
  const context = getCandidateCurriculumContext(session.candidate);
  const selected4Days = ensureSelected4Days(session);
  if (candidateMessage && session.questionsAsked >= 8) {
    if (!session.memoryLayer) session.memoryLayer = [];
    const activeQ = session.activeQuestion?.text || "Question #8";
    const activeTopic = session.activeQuestion?.topic || selected4Days[3].title;
    const activeDay = session.activeQuestion?.curriculumDay || selected4Days[3].day;
    const memoryRecord = {
      id: `mem_${Date.now()}_${session.memoryLayer.length + 1}`,
      questionNumber: 8,
      question: activeQ,
      topic: activeTopic,
      curriculumDay: activeDay,
      difficulty: session.activeQuestion?.difficulty || session.currentDifficulty,
      candidateAnswer: candidateMessage,
      score: 7,
      status: "partially_correct",
      reason: "Evaluated final candidate response.",
      conceptsDemonstrated: [],
      conceptsMissingOrFlawed: [],
      timestamp: Date.now()
    };
    session.memoryLayer.push(memoryRecord);
    if (!session.evaluationHistory) session.evaluationHistory = [];
    session.evaluationHistory.push({
      turnNumber: session.conversationHistory.length,
      answerStatus: "partial",
      isClarificationRequest: false,
      isOffTopic: false,
      isAnswered: true,
      conceptsUnderstood: [],
      conceptsMissing: [],
      feedbackComment: "Score: 7/10 (partially_correct) - Evaluated final response."
    });
    session.questionsAsked = 8;
    let feedback;
    try {
      feedback = await generateGeminiFinalFeedback(session);
    } catch (e) {
      console.warn("[AI Service] Gemini final feedback fallback to local analysis:", e?.message);
      feedback = analyzeCandidateAnswersLocal(session.candidate, session.conversationHistory);
    }
    session.done = true;
    session.feedback = feedback;
    return {
      reply: `Thank you, ${session.candidate?.member?.name || "Candidate"}. That concludes our 8-question technical interview evaluation covering 4 core topics. Compiling your final Performance Report now...`,
      done: true,
      feedback,
      questionNumber: 8,
      daysCoveredCount: session.daysCovered.length,
      topic: activeTopic,
      curriculumDay: activeDay,
      isFollowUp: false,
      currentDifficulty: session.currentDifficulty
    };
  }
  const nextQNum = candidateMessage ? Math.min(session.questionsAsked + 1, 8) : 1;
  const dayIndex = Math.min(Math.floor((nextQNum - 1) / 2), 3);
  const targetDay = selected4Days[dayIndex];
  const isSecondQuestionOnDay = nextQNum % 2 === 0;
  if (!session.memoryLayer) {
    session.memoryLayer = [];
  }
  const memoryContext = formatMemoryContext(session.memoryLayer);
  const demonstratedContext = extractCandidateDemonstratedContext(session.conversationHistory, session.candidate);
  const prompt = `
You are an expert Lead Technical Interviewer conducting a dynamic, human-like technical interview with candidate ${context.candidateProfile.name} (${context.candidateProfile.role}).

==================================================
MANDATORY DISTRIBUTION RULE: EXACTLY 8 QUESTIONS ACROSS 4 DAYS (EXACTLY 2 QUESTIONS PER DAY)
==================================================
The interview consists of 8 technical questions distributed across EXACTLY 4 DIFFERENT DAYS/TOPICS, asking EXACTLY 2 QUESTIONS PER DAY:
- Questions #1 & #2: Day ${selected4Days[0].day} (${selected4Days[0].title})
- Questions #3 & #4: Day ${selected4Days[1].day} (${selected4Days[1].title})
- Questions #5 & #6: Day ${selected4Days[2].day} (${selected4Days[2].title})
- Questions #7 & #8: Day ${selected4Days[3].day} (${selected4Days[3].title})

CURRENT TURN REQUIREMENT:
- You are generating Question #${nextQNum} of 8.
- MUST BE ON Day ${targetDay.day}: "${targetDay.title}".
- Topic: ${targetDay.title}
- Day Objectives: ${JSON.stringify(targetDay.objectives || [])}
- ${isSecondQuestionOnDay ? `This is the 2nd (and final) question on Day ${targetDay.day}. Ask a follow-up or deeper technical trade-off/system design question on ${targetDay.title} tightly connected to the candidate's previous response. Do NOT switch topics yet!` : `This is the 1st question on Day ${targetDay.day}. Introduce a core question on ${targetDay.title} connected to the candidate's profile/projects.`}
${nextQNum === 8 ? "- State clearly to the candidate that this is Question #8 of 8 (the final question)." : ""}
- Do NOT ask questions from any other Day on this turn!

==================================================
1. MEMORY LAYER (PREVIOUS QUESTIONS, ANSWERS, SCORES & EVALUATIONS)
==================================================
Below is the stored memory layer of all questions previously asked in this interview session, candidate's answers, scores, and short evaluation reasons:

${memoryContext}

CRITICAL MEMORY & ADAPTIVE RULES:
\u2022 NEVER REPEAT A PREVIOUS QUESTION: Review every question recorded in the memory layer above. Never repeat any question or identical question concept that has already been asked.
\u2022 EVALUATE LATEST ANSWER WITH SCORE & RATIONALE:
  For the active question ("${session.activeQuestion?.text || "Initial Question"}"), evaluate the candidate's latest response and award an explicit numeric score from 0 to 10 along with a status and short evaluation reason:
  - 'correct' (Score 9-10): Thorough, accurate, and technically sound explanation.
  - 'mostly_correct' (Score 7-8): Good grasp with minor details missing.
  - 'minor_mistake' (Score 5-6): Answer is mostly on track but contains a minor mistake, edge-case omission, or small flaw.
  - 'partially_correct' (Score 4-5): Partial understanding; misses core mechanics or trade-offs.
  - 'incorrect' (Score 1-3): Fundamentally flawed or wrong technical reasoning.
  - 'confused' (Score 0-3): Candidate expresses confusion or asks for explanation.
  - 'clarification_requested': Candidate requested clarification or example (do not penalize or advance question count).

==================================================
2. DYNAMIC LANGUAGE & SCRIPT MATCHING (MANDATORY)
==================================================
Observe the EXACT language, script, and code-switching style used by the candidate in their latest message:
- If candidate speaks English \u2192 reply in clear, professional English.
- If candidate speaks Hindi in Devanagari script \u2192 reply in fluent Hindi in Devanagari script.
- If candidate speaks Hinglish / Hindi in Latin script \u2192 reply in natural Hinglish!
- If candidate switches languages or scripts mid-interview \u2192 adapt IMMEDIATELY and reply in their new language/script.

==================================================
3. CANDIDATE PROFILE, RESUME CONTEXT & DEMONSTRATED KNOWLEDGE
==================================================
Candidate Profile Details:
- Name: ${context.candidateProfile.name}
- Role: ${context.candidateProfile.role} (${context.candidateProfile.yearsExperience} yrs exp)
- Education: ${JSON.stringify(context.candidateProfile.education || "N/A")}
- Key Skills: ${JSON.stringify(context.candidateProfile.skills)}
- Primary Technologies & Languages: ${JSON.stringify([...context.candidateProfile.technologies, ...context.candidateProfile.programmingLanguages])}
- Work Experience: ${JSON.stringify(context.candidateProfile.experience)}
- Projects Built/Led: ${JSON.stringify(context.candidateProfile.projects)}
- Certifications: ${JSON.stringify(context.candidateProfile.certifications)}
- Studied / Completed Curriculum Days: ${JSON.stringify(context.completedCurriculumDays.map((d) => `Day ${d.day}: ${d.title}`))}

Demonstrated Knowledge & Explicit Mentions in Interview:
- Mentioned Projects: ${JSON.stringify(demonstratedContext.mentionedProjects)}
- Mentioned Technologies: ${JSON.stringify(demonstratedContext.mentionedTechnologies)}
- Demonstrated Concepts: ${JSON.stringify(demonstratedContext.demonstratedConcepts)}

==================================================
4. CONTEXTUAL UNDERSTANDING OF CANDIDATE'S MESSAGE
==================================================
- Current Question Number: #${nextQNum} of 8
- Target Day for this Question: Day ${targetDay.day} (${targetDay.title})
- Topics Covered So Far: ${JSON.stringify(session.topicsCovered)}
- Days Covered So Far: ${JSON.stringify(session.daysCovered)}
- Current Difficulty Level: ${session.currentDifficulty}
- Conversation History:
${session.conversationHistory.map((h, i) => `Turn ${i + 1} [${h.role.toUpperCase()}]: ${h.text}`).join("\n\n")}
- Candidate's Latest Message:
  "${candidateMessage || "(Candidate initiated interview)"}"

==================================================
5. STRICT QUESTION-GENERATION & RELEVANCE RULES (MANDATORY)
==================================================
Questions must be generated strictly based on:
1. The candidate's profile, including their role, experience, skills, projects, and technologies mentioned in their profile/resume.
2. The curriculum topics that the candidate is currently being interviewed on (Day ${targetDay.day}: "${targetDay.title}").
3. Any projects, work experience, or technologies that the candidate has explicitly mentioned or demonstrated knowledge of during the interview.
4. The concepts already tested in earlier questions.

The interviewer MUST NOT ask random questions that are unrelated to the candidate's profile, experience, skills, projects, or the relevant curriculum topic.

==================================================
6. ANTI-REPETITION & QUESTION ANGLE VARIATION (CRITICAL)
==================================================
\u2022 DO NOT REPEAT THE SAME QUESTION PATTERN, WORDING, OR EVALUATION ANGLE ACROSS QUESTIONS.
\u2022 Never ask essentially the same question twice, even if the phrasing is different.
\u2022 Before generating Question #${nextQNum}, review ALL previous questions in the Memory Layer. Reject any question that tests the same concept, skill, or reasoning angle.
\u2022 Each question MUST introduce a NEW assessment dimension.

BANNED GENERIC PATTERNS - NEVER REPEAT THESE:
- Do NOT repeatedly ask "What trade-offs guide your setup?"
- Do NOT repeatedly ask "What architectural principles guide your setup?"
- Do NOT repeatedly ask "How would you handle scalability?"
- Do NOT repeatedly ask "How would you design this?"

VARY THE QUESTION TYPE AND REASONING ANGLE ACROSS THE 8 QUESTIONS:
- Conceptual: e.g., "Why are embeddings useful in semantic search?" or "What mechanism determines index resolution in ${targetDay.title}?"
- Scenario-based: e.g., "Suppose retrieval is returning irrelevant chunks after an index update. What would you investigate first?"
- Debugging / Root Cause: e.g., "Your vector search suddenly returns high latency or empty payloads under concurrency. How would you diagnose it?"
- System Design: e.g., "How would you structure metadata filtering and state partitioning in a RAG pipeline?"
- Comparison: e.g., "When would you choose one vector indexing or chunking strategy over another in production?"
- Practical & Metrics: e.g., "How would you evaluate and benchmark whether your embedding model is meeting accuracy and latency SLAs?"
- Failure-based: e.g., "What subtle edge case or memory bottleneck could cause this service to degrade under high ingestion?"
- Candidate-profile-based: Connect to a specific technology or project explicitly stated in the candidate's resume/profile.

\u2022 STRICT NO-ELABORATION RULE:
- Do not ask the candidate to "elaborate" unless their previous answer is genuinely incomplete.
- Ask a direct question based on what the candidate has already answered.
- The interview should feel like a natural technical conversation, NOT a fixed questionnaire.

==================================================
7. GENERATE THE NEXT INTERVIEW QUESTION DIRECTLY:
==================================================
- Generate Question #${nextQNum} of 8 on Day ${targetDay.day}: "${targetDay.title}".
- Formulate this question with a distinct reasoning angle that has NOT been used in previous turns.
- Keep the candidate's exact language/script (English / Hinglish / Hindi).
`;
  const response = await generateContentWithFallback(ai, {
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          internalUnderstanding: {
            type: Type.OBJECT,
            properties: {
              detectedLanguage: { type: Type.STRING, description: "Language/script detected e.g. English, Hinglish, Hindi" },
              candidateIntent: { type: Type.STRING },
              semanticMeaning: { type: Type.STRING },
              isAnsweringActiveQuestion: { type: Type.BOOLEAN },
              specificPointsMentioned: { type: Type.ARRAY, items: { type: Type.STRING } },
              conceptsUnderstood: { type: Type.ARRAY, items: { type: Type.STRING } },
              conceptsMisunderstood: { type: Type.ARRAY, items: { type: Type.STRING } },
              candidateInteractionType: { type: Type.STRING },
              keyInformationExtracted: { type: Type.STRING },
              recommendedAction: { type: Type.STRING }
            },
            required: [
              "detectedLanguage",
              "candidateIntent",
              "semanticMeaning",
              "isAnsweringActiveQuestion",
              "candidateInteractionType",
              "keyInformationExtracted",
              "recommendedAction"
            ]
          },
          nextTurn: {
            type: Type.OBJECT,
            properties: {
              reply: { type: Type.STRING, description: "Natural conversational response spoken directly to candidate in their language/script." },
              curriculumDay: { type: Type.INTEGER },
              topic: { type: Type.STRING },
              isFollowUp: { type: Type.BOOLEAN },
              shouldAdvanceQuestionCount: { type: Type.BOOLEAN },
              reasoningAngle: {
                type: Type.STRING,
                description: "The distinct reasoning angle for this question: conceptual, scenario_based, debugging, comparison, practical_evaluation, failure_analysis, system_design, or candidate_profile"
              },
              newAssessmentDimension: {
                type: Type.STRING,
                description: "The fresh technical competency or dimension tested in this turn."
              }
            },
            required: ["reply", "curriculumDay", "topic", "isFollowUp", "shouldAdvanceQuestionCount"]
          },
          answerEvaluation: {
            type: Type.OBJECT,
            properties: {
              score: { type: Type.INTEGER, description: "Score from 0 to 10 evaluating the candidate's latest answer." },
              status: {
                type: Type.STRING,
                description: "Status: correct, mostly_correct, minor_mistake, partially_correct, incorrect, confused, or clarification_requested"
              },
              reason: { type: Type.STRING, description: "Short 1-2 sentence evaluation/reason for the score given." },
              conceptsDemonstrated: { type: Type.ARRAY, items: { type: Type.STRING } },
              conceptsMissingOrFlawed: { type: Type.ARRAY, items: { type: Type.STRING } },
              understandingLevel: { type: Type.STRING },
              isClarificationRequest: { type: Type.BOOLEAN },
              isOffTopic: { type: Type.BOOLEAN },
              isAnswered: { type: Type.BOOLEAN },
              difficultyRecommendation: { type: Type.STRING }
            },
            required: ["score", "status", "reason", "understandingLevel", "isClarificationRequest", "isOffTopic", "isAnswered", "difficultyRecommendation"]
          }
        },
        required: ["internalUnderstanding", "nextTurn", "answerEvaluation"]
      }
    }
  });
  const parsed = JSON.parse(cleanJsonText(response.text || "{}"));
  const nextTurn = parsed.nextTurn;
  const answerEval = parsed.answerEvaluation;
  if (!nextTurn || !nextTurn.reply) {
    throw new Error("Invalid JSON structure returned by Gemini API");
  }
  nextTurn.curriculumDay = targetDay.day;
  nextTurn.topic = targetDay.title;
  if (candidateMessage && answerEval) {
    const memoryRecord = {
      id: `mem_${Date.now()}_${session.memoryLayer.length + 1}`,
      questionNumber: session.questionsAsked || 1,
      question: session.activeQuestion?.text || "Initial Question",
      topic: session.activeQuestion?.topic || targetDay.title,
      curriculumDay: session.activeQuestion?.curriculumDay || targetDay.day,
      difficulty: session.activeQuestion?.difficulty || session.currentDifficulty,
      candidateAnswer: candidateMessage,
      score: typeof answerEval.score === "number" ? Math.max(0, Math.min(10, answerEval.score)) : 7,
      status: answerEval.status || answerEval.understandingLevel || "partially_correct",
      reason: answerEval.reason || parsed.internalUnderstanding?.semanticMeaning || "Evaluated candidate answer based on technical depth and accuracy.",
      conceptsDemonstrated: answerEval.conceptsDemonstrated || parsed.internalUnderstanding?.conceptsUnderstood || [],
      conceptsMissingOrFlawed: answerEval.conceptsMissingOrFlawed || parsed.internalUnderstanding?.conceptsMisunderstood || [],
      timestamp: Date.now()
    };
    session.memoryLayer.push(memoryRecord);
    if (!session.evaluationHistory) session.evaluationHistory = [];
    session.evaluationHistory.push({
      turnNumber: session.conversationHistory.length,
      answerStatus: answerEval.understandingLevel || "partial",
      isClarificationRequest: !!answerEval.isClarificationRequest,
      isOffTopic: !!answerEval.isOffTopic,
      isAnswered: !!answerEval.isAnswered,
      conceptsUnderstood: memoryRecord.conceptsDemonstrated || [],
      conceptsMissing: memoryRecord.conceptsMissingOrFlawed || [],
      feedbackComment: `Score: ${memoryRecord.score}/10 (${memoryRecord.status}) - ${memoryRecord.reason}`
    });
    if (candidateMessage) {
      session.questionsAsked += 1;
      if (!session.daysCovered.includes(targetDay.day)) {
        session.daysCovered.push(targetDay.day);
      }
      if (!session.topicsCovered.includes(targetDay.title)) {
        session.topicsCovered.push(targetDay.title);
      }
    }
    if (answerEval.difficultyRecommendation === "harder") {
      session.currentDifficulty = "hard";
    } else if (answerEval.difficultyRecommendation === "easier") {
      session.currentDifficulty = "easy";
    } else {
      session.currentDifficulty = "medium";
    }
  } else if (!candidateMessage) {
    if (!session.daysCovered.includes(targetDay.day)) {
      session.daysCovered.push(targetDay.day);
    }
    if (!session.topicsCovered.includes(targetDay.title)) {
      session.topicsCovered.push(targetDay.title);
    }
    session.questionsAsked = 1;
  }
  session.conversationHistory.push({
    role: "interviewer",
    text: nextTurn.reply,
    dayCovered: targetDay.day,
    topic: targetDay.title
  });
  session.activeQuestion = {
    text: nextTurn.reply,
    topic: targetDay.title,
    curriculumDay: targetDay.day,
    difficulty: session.currentDifficulty
  };
  return {
    reply: nextTurn.reply,
    done: false,
    questionNumber: session.questionsAsked,
    daysCoveredCount: session.daysCovered.length,
    currentDayTitle: targetDay.title,
    topic: targetDay.title,
    curriculumDay: targetDay.day,
    isFollowUp: nextTurn.isFollowUp,
    isClarificationRequest: answerEval?.isClarificationRequest,
    isOffTopic: answerEval?.isOffTopic,
    currentDifficulty: session.currentDifficulty
  };
}
async function generateGeminiFinalFeedback(session) {
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build"
      },
      retryOptions: {
        attempts: 1
      }
    }
  });
  const context = getCandidateCurriculumContext(session.candidate);
  const prompt = `
Generate an in-depth, personalized Performance Report for candidate ${context.candidateProfile.name} (${context.candidateProfile.role}, ${context.candidateProfile.yearsExperience} yrs exp) based strictly on their actual technical interview transcript.

Candidate Profile & Experience:
- Listed Skills: ${JSON.stringify(context.candidateProfile.skills)}
- Primary Technologies: ${JSON.stringify(context.candidateProfile.technologies)}
- Projects Led/Built: ${JSON.stringify(context.candidateProfile.projects)}
- Completed Missions/Curriculum Days: ${JSON.stringify(context.completedCurriculumDays, null, 2)}
- Days Covered in Session: ${JSON.stringify(session.daysCovered)} (${session.daysCovered.length} days)
- Topics Discussed: ${JSON.stringify(session.topicsCovered)}
- Total Questions Asked & Answered: ${session.questionsAsked}

Memory Layer Records (Questions, Answers, Scores & Evaluations):
${formatMemoryContext(session.memoryLayer)}

Turn-by-Turn Evaluation History:
${JSON.stringify(session.evaluationHistory || [], null, 2)}

Full Interview Transcript:
${session.conversationHistory.map((h, i) => `Turn ${i + 1} [${h.role.toUpperCase()}]: ${h.text}`).join("\n\n")}

CRITICAL EVALUATION INSTRUCTIONS:
1. "summary": Provide a clear, 2-3 sentence executive evaluation of their technical depth, problem-solving, and communication demonstrated during THIS specific interview transcript.
2. "strengths": List 3-5 specific strengths derived directly from technical concepts, architecture choices, or trade-offs they correctly explained during the session.
3. "gaps": List 2-4 specific technical gaps, misconceptions, or areas where they struggled or gave incomplete/incorrect/non-answers/skipped questions during the interview.
4. "next": List 3 actionable, highly specific recommendations for their career growth and technical skill refinement based on the gaps identified.
5. "overallScore": Calculate a realistic, strictly calibrated overall score (10-98) based on their actual answers in the transcript:
   - ONLY correct and partially correct answers should contribute positively to the score.
   - Wrong / incorrect answers should reduce performance accordingly.
   - Skipped questions ("I don't know", pass, skip, or unanswered) should also reduce performance accordingly.
   - If the candidate gave incorrect answers or skipped questions, the score MUST reflect this reduction (e.g. 15-45 out of 100).
   - If the candidate gave strong, accurate, detailed answers with trade-offs across all questions, assign high scores (85-98 out of 100).
6. "competencies": Provide calibrated 10-99 scores matching their true answer quality:
   - technicalUnderstanding: Depth of knowledge on covered topics (10-99)
   - problemSolving: Handling edge cases, scale, and trade-offs (10-98)
   - engineeringDecision: System design choices, technology selection, and architecture reasoning (10-97)
   - communication: Clarity of explanations and responsive back-and-forth dialogue (15-98)
`;
  const response = await generateContentWithFallback(ai, {
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { type: Type.STRING },
          strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
          gaps: { type: Type.ARRAY, items: { type: Type.STRING } },
          next: { type: Type.ARRAY, items: { type: Type.STRING } },
          overallScore: { type: Type.INTEGER },
          competencies: {
            type: Type.OBJECT,
            properties: {
              technicalUnderstanding: { type: Type.INTEGER },
              problemSolving: { type: Type.INTEGER },
              engineeringDecision: { type: Type.INTEGER },
              communication: { type: Type.INTEGER }
            },
            required: ["technicalUnderstanding", "problemSolving", "engineeringDecision", "communication"]
          }
        },
        required: ["summary", "strengths", "gaps", "next", "overallScore", "competencies"]
      }
    }
  });
  const parsed = JSON.parse(cleanJsonText(response.text || "{}"));
  const localAnalysis = analyzeCandidateAnswersLocal(session.candidate, session.conversationHistory);
  return {
    ...parsed,
    overallScore: localAnalysis.overallScore,
    competencies: localAnalysis.competencies,
    breakdown: localAnalysis.breakdown
  };
}
async function processInterviewStep(session, candidateMessage) {
  if (candidateMessage) {
    session.conversationHistory.push({
      role: "candidate",
      text: candidateMessage
    });
  }
  if (session.done && session.feedback) {
    return {
      reply: `Thank you, ${session.candidate?.member?.name || "Candidate"}. That concludes our technical interview evaluation.`,
      done: true,
      feedback: session.feedback,
      questionNumber: session.questionsAsked,
      daysCoveredCount: session.daysCovered.length,
      topic: void 0,
      curriculumDay: void 0,
      isFollowUp: false,
      isClarificationRequest: false,
      isOffTopic: false,
      currentDifficulty: session.currentDifficulty
    };
  }
  if (process.env.GEMINI_API_KEY && !isGeminiInCooldown()) {
    try {
      return await processGeminiInterviewStep(session, candidateMessage);
    } catch {
      return processLocalInterviewStep(session, candidateMessage);
    }
  } else {
    return processLocalInterviewStep(session, candidateMessage);
  }
}
function analyzeCandidateAnswersLocal(candidate, conversationHistory) {
  const candidateName = candidate.member.name;
  const candidateRole = candidate.member.jobRole;
  const yearsExp = candidate.member.yearsExperience;
  const qaPairs = [];
  for (let i = 0; i < conversationHistory.length; i++) {
    if (conversationHistory[i].role === "interviewer") {
      const question = conversationHistory[i].text;
      const topic = conversationHistory[i].topic;
      let answer = "";
      if (i + 1 < conversationHistory.length && conversationHistory[i + 1].role !== "interviewer") {
        answer = conversationHistory[i + 1].text;
      }
      qaPairs.push({ question, answer: answer || "(No answer provided)", topic });
    }
  }
  const clarificationRegex = /\b(don't understand|dont understand|didn't understand|rephrase|repeat|what do you mean|clarify|can you explain|what does that mean)\b/i;
  const dontKnowRegex = /\b(don't know|dont know|not sure|no idea|pass|no clue|idk|skip|skipped|skipping|dunno|haven't studied|havent studied|nothing|none|n\/a|pata nahi|maloom nahi|unsure|no answer|leave this|next question|next)\b/i;
  let correctCount = 0;
  let partiallyCorrectCount = 0;
  let incorrectCount = 0;
  let skippedCount = 0;
  let irrelevantCount = 0;
  const questionEvaluations = [];
  const strengths = [];
  const gaps = [];
  const next = [];
  let totalScoredWords = 0;
  let scoredTurnCount = 0;
  let totalScorePoints = 0;
  let tradeoffHits = 0;
  let totalTechPoints = 0;
  let totalProbPoints = 0;
  let totalEngPoints = 0;
  let totalCommPoints = 0;
  qaPairs.forEach((pair, idx) => {
    const qNum = idx + 1;
    const topicLabel = pair.topic || `Topic ${qNum}`;
    const answerText = (pair.answer || "").trim();
    const lower = answerText.toLowerCase();
    const words = answerText.split(/\s+/).filter(Boolean);
    if (clarificationRegex.test(lower)) {
      return;
    }
    const isExplicitDontKnow = dontKnowRegex.test(lower);
    const isUnansweredOrSkipped = !answerText || answerText === "(No answer provided)" || answerText === "(Candidate skipped question)" || isExplicitDontKnow && words.length < 15 || lower === "skip" || lower === "skipped" || lower === "pass" || lower === "next";
    const techHits = TECHNICAL_ONTOLOGY.filter((k) => lower.includes(k)).length;
    const hasTradeoff = TRADEOFF_KEYWORDS.some((k) => lower.includes(k));
    if (isUnansweredOrSkipped) {
      skippedCount++;
      questionEvaluations.push({
        questionNumber: qNum,
        questionText: pair.question,
        candidateAnswer: !answerText || answerText === "(No answer provided)" ? "(No answer provided - Question Skipped)" : answerText,
        classification: "skipped",
        score: 0,
        topic: topicLabel,
        feedbackNote: `Question skipped / no answer provided; reduced overall performance score.`
      });
      gaps.push(`Skipped question on ${topicLabel}`);
      return;
    }
    if (techHits === 0 && words.length < 4) {
      irrelevantCount++;
      questionEvaluations.push({
        questionNumber: qNum,
        questionText: pair.question,
        candidateAnswer: answerText,
        classification: "irrelevant",
        score: 0,
        topic: topicLabel,
        feedbackNote: `Answer lacked relevant technical content ("${answerText.slice(0, 30)}..."); reduced overall score.`
      });
      gaps.push(`Irrelevant or non-technical response on ${topicLabel}`);
      scoredTurnCount++;
      totalScoredWords += words.length;
      return;
    }
    scoredTurnCount++;
    totalScoredWords += words.length;
    if (hasTradeoff) tradeoffHits++;
    let qTech = 0;
    let qProb = 0;
    let qEng = 0;
    let qComm = 0;
    if (words.length >= 18 && techHits >= 2) {
      correctCount++;
      questionEvaluations.push({
        questionNumber: qNum,
        questionText: pair.question,
        candidateAnswer: answerText,
        classification: "correct",
        score: 100,
        topic: topicLabel,
        feedbackNote: `Strong, accurate response with solid domain reasoning (100%).`
      });
      strengths.push(`Solid technical depth on ${topicLabel}`);
    } else if (words.length >= 8 || techHits >= 1) {
      partiallyCorrectCount++;
      questionEvaluations.push({
        questionNumber: qNum,
        questionText: pair.question,
        candidateAnswer: answerText,
        classification: "partially_correct",
        score: 50,
        topic: topicLabel,
        feedbackNote: `Partially correct answer (50%); missed some trade-offs.`
      });
    } else {
      incorrectCount++;
      questionEvaluations.push({
        questionNumber: qNum,
        questionText: pair.question,
        candidateAnswer: answerText,
        classification: "incorrect",
        score: 0,
        topic: topicLabel,
        feedbackNote: `Incorrect technical reasoning (0%).`
      });
      gaps.push(`Incorrect technical reasoning on ${topicLabel}`);
    }
    if (techHits >= 3 && words.length >= 18) {
      qTech = 100;
    } else if (techHits >= 2 && words.length >= 12) {
      qTech = 85;
    } else if (techHits >= 1) {
      qTech = 60;
    } else if (words.length >= 12) {
      qTech = 35;
    } else {
      qTech = 15;
    }
    const reasoningHits = REASONING_KEYWORDS.filter((k) => lower.includes(k)).length;
    const hasCausal = ["because", "since", "therefore", "due to", "leads to", "result", "reason"].some((k) => lower.includes(k));
    const hasTroubleshoot = ["debug", "troubleshoot", "root cause", "diagnose", "investigate", "mitigate", "edge case", "failure", "fallback", "retry"].some((k) => lower.includes(k));
    if ((reasoningHits >= 3 || hasCausal && hasTroubleshoot) && words.length >= 18) {
      qProb = 100;
    } else if (reasoningHits >= 2 || hasCausal || hasTroubleshoot) {
      qProb = 80;
    } else if (reasoningHits >= 1) {
      qProb = 55;
    } else if (words.length >= 12) {
      qProb = 35;
    } else {
      qProb = 15;
    }
    const engHits = ENGINEERING_KEYWORDS.filter((k) => lower.includes(k)).length;
    const hasExplicitDecision = ["tradeoff", "trade-off", "vs", "versus", "instead of", "prefer", "chose", "choose", "compromise"].some((k) => lower.includes(k));
    const hasConstraint = ["latency", "scale", "scalability", "throughput", "cost", "memory", "cpu", "p99", "sla", "bottleneck", "production", "architecture", "sharding", "cache"].some((k) => lower.includes(k));
    if (hasExplicitDecision && hasConstraint && words.length >= 18) {
      qEng = 100;
    } else if (hasExplicitDecision || engHits >= 2 && hasConstraint) {
      qEng = 85;
    } else if (engHits >= 1 || hasConstraint) {
      qEng = 55;
    } else if (words.length >= 12) {
      qEng = 30;
    } else {
      qEng = 15;
    }
    const commHits = COMMUNICATION_KEYWORDS.filter((k) => lower.includes(k)).length;
    const hasStructure = answerText.includes("\n") || answerText.includes("1.") || answerText.includes("- ") || answerText.includes("\u2022") || answerText.includes("```") || answerText.includes(":");
    if ((hasStructure || commHits >= 2) && words.length >= 25) {
      qComm = 100;
    } else if (words.length >= 18 && (hasStructure || commHits >= 1)) {
      qComm = 85;
    } else if (words.length >= 12) {
      qComm = 65;
    } else if (words.length >= 6) {
      qComm = 40;
    } else {
      qComm = 20;
    }
    totalTechPoints += qTech;
    totalProbPoints += qProb;
    totalEngPoints += qEng;
    totalCommPoints += qComm;
  });
  const TOTAL_INTERVIEW_QUESTIONS = 8;
  const totalEarnedPoints = questionEvaluations.reduce((sum, q) => sum + (typeof q.score === "number" ? q.score : 0), 0);
  const overallScore = Math.round(totalEarnedPoints / TOTAL_INTERVIEW_QUESTIONS * 10) / 10;
  const technicalUnderstanding = Math.round(totalTechPoints / TOTAL_INTERVIEW_QUESTIONS * 10) / 10;
  const problemSolving = Math.round(totalProbPoints / TOTAL_INTERVIEW_QUESTIONS * 10) / 10;
  const engineeringDecision = Math.round(totalEngPoints / TOTAL_INTERVIEW_QUESTIONS * 10) / 10;
  const communication = Math.round(totalCommPoints / TOTAL_INTERVIEW_QUESTIONS * 10) / 10;
  if (strengths.length === 0) {
    if (correctCount > 0) strengths.push("Demonstrated strong domain understanding on core questions.");
    else strengths.push("Active participation and structured responses during questioning.");
  }
  if (gaps.length === 0) {
    if (skippedCount > 0) gaps.push(`Skipped ${skippedCount} question(s) ("I don't know"); recommend reviewing these specific topics.`);
    else gaps.push("Can further expand on multi-region failover and distributed edge cases.");
  }
  if (incorrectCount > 0 || skippedCount > 0) {
    next.push("Review Weak & Skipped Topics");
  }
  if (next.length < 2) next.push("Production Deployment & Latency Optimization");
  if (next.length < 3) next.push("Distributed System Architecture");
  const summary = `${candidateName} (${candidateRole}, ${yearsExp} yrs exp) completed evaluation. Results: ${correctCount} correct, ${partiallyCorrectCount} partially correct, ${incorrectCount} incorrect, ${skippedCount} skipped ("I don't know"), ${irrelevantCount} irrelevant. Overall score: ${overallScore}/100 calculated strictly from evaluated answers.`;
  return {
    summary,
    strengths: strengths.slice(0, 4),
    gaps: gaps.slice(0, 4),
    next: next.slice(0, 3),
    overallScore,
    competencies: {
      technicalUnderstanding,
      problemSolving,
      engineeringDecision,
      communication
    },
    breakdown: {
      correctCount,
      partiallyCorrectCount,
      incorrectCount,
      skippedCount,
      irrelevantCount,
      questionEvaluations
    }
  };
}
async function generateFinalFeedback(session) {
  if (process.env.GEMINI_API_KEY && !isGeminiInCooldown()) {
    try {
      return await generateGeminiFinalFeedback(session);
    } catch {
      return analyzeCandidateAnswersLocal(session.candidate, session.conversationHistory);
    }
  }
  return analyzeCandidateAnswersLocal(session.candidate, session.conversationHistory);
}

// src/server/interviewHandler.ts
async function handleInterviewLogic(body) {
  const { sessionId, candidate, message, chatHistory, forceEvaluate } = body || {};
  const effectiveSessionId = sessionId || `sess_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  let session;
  try {
    session = getOrCreateSession(effectiveSessionId, candidate);
  } catch (err) {
    console.error("Error creating session, using fallback session:", err);
    session = getOrCreateSession(effectiveSessionId, void 0);
  }
  if (Array.isArray(chatHistory) && chatHistory.length > 0) {
    const validMsgs = chatHistory.filter((m) => m.sender !== "system" && m.text);
    session.conversationHistory = validMsgs.map((m) => ({
      role: m.sender === "ai" ? "interviewer" : "candidate",
      text: m.text,
      dayCovered: m.curriculumDay,
      topic: m.topic
    }));
    validMsgs.forEach((m) => {
      if (m.curriculumDay && !session.daysCovered.includes(m.curriculumDay)) {
        session.daysCovered.push(m.curriculumDay);
      }
      if (m.topic && !session.topicsCovered.includes(m.topic)) {
        session.topicsCovered.push(m.topic);
      }
    });
  }
  const msgTrim = typeof message === "string" ? message.trim().toLowerCase() : "";
  const isConcludeRequest = forceEvaluate || msgTrim === "conclude interview" || msgTrim === "generate report" || msgTrim === "finish interview";
  if (isConcludeRequest) {
    try {
      const feedback = await generateFinalFeedback(session);
      session.done = true;
      session.feedback = feedback;
      return {
        status: 200,
        data: {
          reply: `Thank you, ${session.candidate?.member?.name || "Candidate"}. That concludes our technical interview evaluation.`,
          done: true,
          feedback: session.feedback,
          questionNumber: session.questionsAsked,
          daysCoveredCount: session.daysCovered.length
        }
      };
    } catch {
      const feedback = analyzeCandidateAnswersLocal(session.candidate, session.conversationHistory);
      session.done = true;
      session.feedback = feedback;
      return {
        status: 200,
        data: {
          reply: `Thank you, ${session.candidate?.member?.name || "Candidate"}. That concludes our technical interview evaluation.`,
          done: true,
          feedback,
          questionNumber: session.questionsAsked,
          daysCoveredCount: session.daysCovered.length
        }
      };
    }
  }
  if (session.done && session.feedback) {
    return {
      status: 200,
      data: {
        reply: "Interview completed.",
        done: true,
        feedback: session.feedback,
        questionNumber: session.questionsAsked,
        daysCoveredCount: session.daysCovered.length
      }
    };
  }
  try {
    const result = await processInterviewStep(session, message);
    return {
      status: 200,
      data: {
        reply: result.reply,
        done: result.done,
        feedback: result.feedback,
        questionNumber: result.questionNumber ?? session.questionsAsked,
        daysCoveredCount: result.daysCoveredCount ?? session.daysCovered.length,
        topic: result.topic,
        curriculumDay: result.curriculumDay,
        isFollowUp: result.isFollowUp,
        isClarificationRequest: result.isClarificationRequest,
        isOffTopic: result.isOffTopic,
        currentDifficulty: result.currentDifficulty ?? session.currentDifficulty
      }
    };
  } catch {
    try {
      const result = processLocalInterviewStep(session, message);
      return {
        status: 200,
        data: {
          reply: result.reply,
          done: result.done,
          feedback: result.feedback,
          questionNumber: result.questionNumber ?? session.questionsAsked,
          daysCoveredCount: result.daysCoveredCount ?? session.daysCovered.length,
          topic: result.topic,
          curriculumDay: result.curriculumDay,
          isFollowUp: result.isFollowUp,
          isClarificationRequest: result.isClarificationRequest,
          isOffTopic: result.isOffTopic,
          currentDifficulty: result.currentDifficulty ?? session.currentDifficulty
        }
      };
    } catch (fallbackErr) {
      return {
        status: 200,
        data: {
          reply: "Thank you for your answer. Moving forward: how do you optimize latency and resource usage in your deployment?",
          done: false,
          questionNumber: session.questionsAsked || 1,
          daysCoveredCount: session.daysCovered.length || 1,
          topic: "System Performance",
          curriculumDay: 7,
          isFollowUp: false
        }
      };
    }
  }
}

// src/server/interviewApiEntry.ts
async function handler(req, res) {
  try {
    if (res && typeof res.setHeader === "function") {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type");
      res.setHeader("Content-Type", "application/json");
    }
    if (req && req.method === "OPTIONS") {
      if (typeof res?.status === "function") {
        return res.status(200).end();
      }
      if (res && typeof res.end === "function") {
        res.statusCode = 200;
        return res.end();
      }
      return;
    }
    let body = req?.body;
    if (typeof body === "string") {
      try {
        body = JSON.parse(body);
      } catch {
      }
    }
    const result = await handleInterviewLogic(body || {});
    if (res && typeof res.status === "function" && typeof res.json === "function") {
      return res.status(result.status || 200).json(result.data);
    }
    if (res && typeof res.end === "function") {
      res.statusCode = result.status || 200;
      res.setHeader("Content-Type", "application/json");
      return res.end(JSON.stringify(result.data));
    }
    if (typeof Response !== "undefined") {
      return new Response(JSON.stringify(result.data), {
        status: result.status || 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      });
    }
  } catch (err) {
    console.error("Error in /api/interview:", err);
    const fallbackResponse = {
      reply: "Thank you. Let us proceed with the next technical question.",
      done: false,
      questionNumber: 1,
      daysCoveredCount: 1
    };
    if (res && typeof res.status === "function" && typeof res.json === "function") {
      return res.status(200).json(fallbackResponse);
    }
    if (res && typeof res.end === "function") {
      res.statusCode = 200;
      return res.end(JSON.stringify(fallbackResponse));
    }
    if (typeof Response !== "undefined") {
      return new Response(JSON.stringify(fallbackResponse), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      });
    }
  }
}
export {
  handler as default
};
