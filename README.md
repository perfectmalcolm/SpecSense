# SpecSense

## Overview

SpecSense is an innovative application designed to empower online buyers by providing them with the best price-to-performance value for electronic gadgets. Users can select a device, input a price range, and receive intelligent rankings based on criteria such as newness, flagship status (old but still high-performing), or affordability (cheap and used). The integrated AI logic helps list and sort these options, enabling informed purchasing decisions.

## Technologies Used

### Backend
*   **Framework:** FastAPI (Python)
*   **Database:** PostgreSQL (Google Cloud SQL)
*   **ORM:** SQLAlchemy
*   **Deployment:** Google Cloud Run (Containerized with Docker)

### Frontend
*   **Framework:** React (JavaScript)
*   **Styling:** Tailwind CSS
*   **Deployment:** Firebase Hosting

### AI/Ranking Logic
*   Custom Python logic for ranking based on user preferences.
*   Google Custom Search API for product suggestions.

## Deployment Status

The SpecSense application is deployed and fully functional:
*   **Backend:** Deployed on Google Cloud Run.
*   **Frontend:** Deployed on Firebase Hosting.

## Local Development Setup

To run SpecSense locally, follow these steps:

### Prerequisites

*   Python 3.9+
*   Node.js and npm
*   PostgreSQL (local instance)
*   Google Cloud SDK (for `gcloud` commands and Cloud SQL Auth Proxy)
*   Docker (if you plan to build/run containers locally)

### 1. Clone the Repository

\`\`\`bash
git clone https://github.com/perfectmalcolm/SpecSense.git
cd SpecSense
\`\`\`

### 2. Backend Setup

#### Install Python Dependencies

\`\`\`bash
pip install -r requirements.txt
\`\`\`

#### Database Configuration

The backend connects to a PostgreSQL database. For local development, you can either:

**Option A: Use a Local PostgreSQL Instance**

1.  Ensure you have a local PostgreSQL server running.
2.  Create a database (e.g., \`specsense_db\`) and a user (e.g., \`specsense_user\`) with a password.
3.  Set the following environment variables in your terminal before running the backend:
    \`\`\`powershell
    $env:USE_LOCAL_DB="1"
    $env:DB_USER="your_local_db_user"
    $env:DB_PASSWORD="your_local_db_password"
    $env:DB_NAME="your_local_db_name"
    \`\`\`
    (Replace with your actual local PostgreSQL credentials).

**Option B: Connect to Cloud SQL (Requires Cloud SQL Auth Proxy)**

1.  Ensure the Cloud SQL Auth Proxy is installed and in your PATH.
2.  Start the proxy in the background, replacing \`YOUR_CONNECTION_NAME\` with your Cloud SQL instance connection name (e.g., \`specsense-c3c45bad:us-central1:specsense-db\`):
    \`\`\`powershell
    Start-Process -NoNewWindow cloud_sql_proxy.exe -ArgumentList "-instances=YOUR_CONNECTION_NAME=tcp:5432"
    \`\`\`
3.  Set the following environment variables:
    \`\`\`powershell
    $env:DB_USER="your_cloud_db_user"
    $env:DB_PASSWORD="your_cloud_db_password"
    $env:DB_NAME="your_cloud_db_name"
    $env:CLOUD_SQL_CONNECTION_NAME="YOUR_CONNECTION_NAME"
    \`\`\`

#### Run the Backend

\`\`\`powershell
C:\Users\Malcolm\AppData\Roaming\Python\Python313\Scripts\uvicorn.exe main:app --reload --port 8000
\`\`\`
(Adjust the path to \`uvicorn.exe\` if necessary).

The backend will be accessible at \`http://127.0.0.1:8000\`.

### 3. Frontend Setup

\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`

The frontend will typically run on \`http://localhost:5173\` (or another port if 5173 is in use).

## Features

*   **Gadget Listing:** Browse available gadgets.
*   **Smart Search:** Search for gadgets with Google Custom Search integration.
*   **Advanced Filtering & Ranking:** Filter by price range and rank gadgets by newness, flagship status, or affordability.
*   **Modern UI/UX:** A sleek, dark-themed interface designed for ease of use.

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues.