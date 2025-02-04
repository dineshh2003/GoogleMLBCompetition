export const projectData = {
    sections: [
      {
        id: "understanding",
        title: "1. Problem Understanding",
        content: `Objective: Extract fundamental Statcast metrics (e.g., pitch speed, exit velocity) from archival baseball game videos using computer vision and AI.
        
  Deliverables:
  - Hosted project URL
  - Project description
  - Open-source code repository
  - Insights and findings`,
      },
      {
        id: "dataset",
        title: "2. Dataset Preparation",
        content: `Archival Videos:
  - Collect old baseball game videos (ensure usage rights)
  - Use publicly available MLB archival datasets
  - Licensed materials
  
  Annotations:
  - If no labeled data exists, annotate key metrics manually
  - Semi-automatic annotation for training/testing
  
  Data Cleaning:
  - Standardize video formats
  - Segment clips
  - Ensure quality for computer vision tasks`,
      },
      {
        id: "tech-stack",
        title: "3. Technology Stack",
        content: `Google Cloud Platform Tools:
  - Vertex AI: Train and deploy machine learning models
  - Google Cloud Storage: Store video datasets and outputs
  - Google Cloud Functions: Host APIs for metric extraction
  - Cloud Run: Deploy the application
  - BigQuery: Store extracted Statcast metrics
  - Gemini AI: Advanced NLP integration
  - Imagen: Enhance visual analysis`,
      },
      {
        id: "pipeline",
        title: "4. Solution Pipeline",
        content: `Step 1: Extract Video Frames
  - Use OpenCV for frame extraction
  - High FPS capture for key moments
  
  Step 2: Object Detection
  - Pre-trained computer vision models
  - YOLOv8 or Google's AutoML Vision
  - Detect baseball, players, equipment
  
  Step 3: Track Motion
  - Object tracking algorithms
  - DeepSORT or Kalman Filter
  - Track baseball trajectory
  
  Step 4: Analyze Events
  - Machine learning models
  - TensorFlow/PyTorch implementation
  - Vertex AI custom models`,
      },
      {
        id: "development",
        title: "5. Application Development",
        content: `Frontend:
  - User-friendly dashboard
  - Video upload functionality
  - Metrics visualization
  - React/Angular/Vue.js implementation
  
  Backend:
  - Python/Flask or Node.js
  - API development
  - Cloud Run hosting
  - BigQuery integration`,
      },
      {
        id: "testing",
        title: "6. Testing and Deployment",
        content: `Testing:
  - Multiple archival video testing
  - Model fine-tuning
  - Edge case handling
  - Performance optimization
  
  Deployment:
  - Cloud Run/App Engine hosting
  - CI/CD pipeline implementation
  - Monitoring and logging`,
      },
      {
        id: "submission",
        title: "7. Submission Components",
        content: `A. Hosted Project:
  - Live URL
  - Real-time metric extraction
  - User interface
  
  B. Project Description:
  - Features and functionality
  - Technology stack
  - Data sources
  - Findings and learnings
  
  C. Open Source Repository:
  - MIT License
  - Detailed README
  - Installation guide
  - Contribution guidelines`,
      },
      {
        id: "final",
        title: "8. Final Touches",
        content: `Documentation:
  - User instructions
  - System architecture diagrams
  - Model explanations
  - API documentation
  
  Presentation:
  - Demo video
  - Performance metrics
  - Future improvements`,
      },
    ],
  }
  
  