from tkinter import constants
from openai import AsyncOpenAI
import os
import json
from app.utils import constants


class ResumeParserService:

    def __init__(self):
        self.client = AsyncOpenAI(
            api_key=os.getenv("OPENAI_API_KEY")
        )

    async def parse_resume(self, raw_text: str) -> dict:

        prompt = f"""
            You are a resume parser.

            Extract structured JSON from the resume text.

            Return ONLY valid JSON with this structure:

            {{
            "projects": [
                {{
                "title": "",
                "company": "",
                "tech_stack": [],
                "description": "",
                "impact": ""
                }}
            ],
            "experience": [],
            "skills": [],
            "education": []
            }}

            Resume Text:
            {raw_text}
            """

        response = await self.client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You extract structured resume data."},
                {"role": "user", "content": prompt}
            ],
            temperature=0,  # Randomness
            response_format={
                "type": "json_schema",
                "json_schema": {
                    "name": "resume_structure",
                    "schema": {
                        "type": "object",
                        "properties": {
                            "projects": {
                                "type": "array",
                                "items": {
                                    "type": "object",
                                    "properties": {
                                        "title": {"type": "string"},
                                        "company": {"type": "string"},
                                        "tech_stack": {
                                            "type": "array",
                                            "items": {"type": "string"}
                                        },
                                        "description": {"type": "string"},
                                        "impact": {"type": "string"}
                                    },
                                    "required": constants.RESUME_PARSE_SECTION
                                }
                            },
                            "experience": {"type": "array"},
                            "skills": {"type": "array"},
                            "education": {"type": "array"}
                        },
                        "required": ["projects"]
                    }
                }
            }
        )

        return response.choices[0].message.parsed
