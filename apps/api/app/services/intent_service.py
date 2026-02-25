from tkinter import constants
from openai import AsyncOpenAI
import os
import json
from app.utils import constants


class IntentService:

    def __init__(self):
        self.client = AsyncOpenAI(
            api_key=os.getenv("OPENAI_API_KEY")
        )

    async def classify(self, message: str) -> str:

        prompt = f"""
Classify the user's intent.

Return ONLY valid JSON in this format:

{{
  "intent": "list_projects | semantic_search | list_skills | list_experience"
}}

User message:
{message}
"""

        response = await self.client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You classify user intents."},
                {"role": "user", "content": prompt}
            ],
            temperature=0,
            response_format={
                "type": "json_schema",
                "json_schema": {
                    "name": "intent_classification",
                    "schema": {
                        "type": "object",
                        "properties": {
                            "intent": {
                                "type": "string",
                                "enum": constants.SEGREGATION_ARR
                            }
                        },
                        "required": ["intent"]
                    }
                }
            }
        )

        try:
            return response.choices[0].message.parsed["intent"]
        except Exception:
            return "semantic_search"
