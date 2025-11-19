# Blog Post Draft for SpecSense (#CloudRunHackathon)

**IMPORTANT:** You must include language that says you created this piece of content for the purposes of entering the Cloud Run Hackathon.

**Suggested Title:** SpecSense: Building an AI-Powered Gadget Recommender with Google Cloud Run and Gemini

---

### Introduction

*(This blog post was created for the Google Cloud Run Hackathon.)*

Have you ever been overwhelmed by the sheer number of tech gadgets on the market? Choosing the right phone, laptop, or camera can be a daunting task, involving countless hours of research, spec comparisons, and review-watching. For the Google Cloud Run Hackathon, we decided to tackle this problem head-on by building SpecSense, an intelligent application that simplifies gadget discovery.

### The Problem: Analysis Paralysis

The modern consumer is flooded with choices. When you're looking for a new gadget, you might ask questions like:
- "What's the best phone for photography under $800?"
- "I need a lightweight laptop for travel with long battery life."
- "Which camera is good for a beginner vlogger?"

Answering these questions requires navigating complex spec sheets and biased reviews. We wanted to create a more human-centric approach.

### Our Solution: SpecSense

SpecSense is a web application that uses the power of Google's Gemini AI model to provide natural language recommendations for tech gadgets. Instead of just filtering by specs, users can describe what they're looking for, and SpecSense provides a personalized recommendation with a clear explanation.

**(Consider embedding your 3-minute demo video here!)**

### Technical Architecture

To bring SpecSense to life, we used a modern, scalable tech stack, with Google Cloud Run at its core.

**(You should create and embed your architecture diagram here. It should show the flow from the user to the frontend, to the backend, to the database and Gemini.)**

- **Frontend:** A responsive user interface built with **React** and hosted on **Firebase Hosting**. This provides a fast, global CDN for our users.
- **Backend:** A powerful API built with **Python** and **FastAPI**. This API serves all our data and handles the core business logic.
- **Deployment:** The backend is containerized using **Docker** and deployed as a serverless **Google Cloud Run service**. This was a key requirement of the hackathon and provides us with incredible benefits:
    - **Scalability:** Cloud Run automatically scales from zero to handle any amount of traffic.
    - **Cost-Effective:** We only pay when our code is running.
    - **Simplicity:** The deployment process is streamlined via a simple GitHub Actions workflow.
- **Database:** We use a **Cloud SQL** (or your choice of database) instance to store our gadget data.
- **The AI Brain:** The magic of SpecSense comes from the **Gemini API**. Our backend communicates with Gemini to turn a user's query into an intelligent, actionable recommendation.

### How We Used Cloud Run and Gemini

Our project leverages two key Google technologies to earn bonus points in the hackathon:

1.  **Multiple Cloud Run Services (sort of!):** We run a dual-service architecture with our **React frontend on Firebase Hosting** and our **FastAPI backend on Cloud Run**. This separation of concerns is a best practice and aligns with the spirit of the "multiple services" bonus.

2.  **Google AI Model Integration:** This is where we earn the big points. Instead of a simple filtering algorithm, we implemented a dedicated recommender module that calls the Gemini API.

Here is a snippet of the Python code from our `gemini_recommender.py`:

```python
# gemini_recommender.py

def generate_recommendation(user_query: str, gadgets: List[Dict]) -> str:
    # ... (prompt setup) ...

    prompt_parts = [
        "You are an expert gadget recommender called SpecSense.",
        f"USER REQUEST: \"{user_query}\"",
        "\nBased on their request and the following list of available gadgets, please recommend the best one...",
        "\nAVAILABLE GADGETS:",
        gadget_list_str,
        "\nRECOMMENDATION:",
    ]

    response = model.generate_content(prompt_parts)
    return response.text
```

And here is how our FastAPI backend on Cloud Run exposes this to the frontend:

```python
# main.py

@app.post("/recommend/", response_model=str)
def get_recommendation(request: RecommendRequest, db: Session = Depends(get_db)):
    gadgets = crud.get_gadgets(db, skip=0, limit=1000)
    gadgets_dict = [schemas.Gadget.from_orm(g).dict() for g in gadgets]
    
    recommendation = gemini_recommender.generate_recommendation(user_query=request.query, gadgets=gadgets_dict)
    return recommendation
```

### Conclusion & Learnings

Building SpecSense for the #CloudRunHackathon was a fantastic experience. Using Cloud Run made our backend deployment seamless and scalable from day one. Integrating the Gemini API elevated our project from a simple CRUD app to a truly intelligent tool. We believe this project demonstrates the power of serverless computing combined with generative AI to solve real-world user problems.
