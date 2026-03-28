from pydantic import BaseModel

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

    class Config:
        orm_mode = True