from datetime import datetime
from enum import Enum

from pydantic import BaseModel, Field


class UserMode(str, Enum):
    technical = "technical"
    non_technical = "non-technical"


class ChatRequest(BaseModel):
    question: str = Field(..., min_length=1)
    mode: UserMode


class ChatMessage(BaseModel):
    id: str
    role: str
    content: str
    timestamp: datetime
