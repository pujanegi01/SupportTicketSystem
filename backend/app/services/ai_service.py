from langchain_groq import ChatGroq
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import JsonOutputParser
from ..utils.config import settings

# Parser
parser = JsonOutputParser()

# Prompt
prompt = PromptTemplate(
    template="""
    Analyze the support ticket:

    {description}

    IMPORTANT:
    - Return ONLY valid JSON
    - No extra text

    Format:
    {{
        "summary": "One sentence summary of the issue",
        "category": "billing | technical | account",
        "tags": "comma separated"
    }}
    """,
    input_variables=["description"],
)

llm = ChatGroq(
    api_key=settings.GROK_API_KEY,
    model="llama-3.3-70b-versatile",           
    temperature=0.3,
    max_tokens=256
)

# Chain
chain = prompt | llm | parser

def generate_ai_fields(description: str):
    try:
        return chain.invoke({"description": description})
    except Exception as e:
        print(f"Error in AI processing: {e}")
        return {
            "summary": "AI processing failed",
            "category": "technical",
            "tags": "error",
            "error": str(e)
        }