from pydantic import BaseModel, ConfigDict

class TicketCreate(BaseModel):
    title: str
    description: str

class TicketResponse(BaseModel):
    id: int
    title: str
    description: str
    summary: str
    category: str
    tags: str

    model_config = ConfigDict(from_attributes=True)