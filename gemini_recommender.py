import google.generativeai as genai
import os
from typing import List, Dict


# Set up the model configuration (moved outside to be shared)
generation_config = {
  "temperature": 0.9,
  "top_p": 1,
  "top_k": 1,
  "max_output_tokens": 2048,
}

safety_settings = [
  {
    "category": "HARM_CATEGORY_HARASSMENT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    "category": "HARM_CATEGORY_HATE_SPEECH",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
]

def generate_recommendation(user_query: str, gadgets: List[Dict], google_api_key: str) -> str:
    """
    Generates a gadget recommendation based on a user query and a list of gadgets.

    Args:
        user_query: The user's request in natural language.
        gadgets: A list of dictionaries, where each dictionary represents a gadget.
        google_api_key: The Google API key for authentication.

    Returns:
        A string containing the recommendation.
    """
    if not google_api_key:
        raise ValueError("GOOGLE_API_KEY must be provided for Gemini recommendation.")

    genai.configure(api_key=google_api_key)
    model = genai.GenerativeModel(model_name="gemini-1.5-pro-latest",
                                  generation_config=generation_config,
                                  safety_settings=safety_settings)

    if not gadgets:
        return "I couldn't find any gadgets to recommend."

    # Create a simplified list of gadgets for the prompt
    gadget_list_str = ""
    for g in gadgets:
        gadget_list_str += f"- {g.get('name', 'N/A')}: Price ${g.get('price', 'N/A')}, Specs: {g.get('specifications', 'N/A')}\n"

    prompt_parts = [
        "You are an expert gadget recommender called SpecSense.",
        "A user is looking for a new gadget. Their request is:",
        f"USER REQUEST: \"{user_query}\"",
        "\nBased on their request and the following list of available gadgets, please recommend the best one and provide a brief, friendly explanation for why it's a good fit.",
        "\nAVAILABLE GADGETS:",
        gadget_list_str,
        "\nRECOMMENDATION:",
    ]

    try:
        response = model.generate_content(prompt_parts)
        return response.text
    except Exception as e:
        print(f"An error occurred while generating recommendation: {e}")
        return "I'm sorry, I had trouble generating a recommendation. Please try again."
