from sqlalchemy import Column, Integer, String, Text
from ..utils.db import Base

class Ticket(Base):
    __tablename__ = "tickets"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    description = Column(Text)

    # AI fields
    summary = Column(Text)
    category = Column(String)
    tags = Column(String)