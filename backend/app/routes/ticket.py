from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from ..utils.db import SessionLocal
from ..models.ticket import Ticket
from ..schema.schemas import TicketCreate
from ..services.ai_service import generate_ai_fields

router = APIRouter()

# DB Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Create Ticket
@router.post("/tickets", status_code=status.HTTP_201_CREATED)
def create_ticket(ticket: TicketCreate, db: Session = Depends(get_db)):
    try:
        # Input validation (extra safety)
        if not ticket.title.strip():
            raise HTTPException(status_code=400, detail="Title cannot be empty")

        if not ticket.description.strip():
            raise HTTPException(status_code=400, detail="Description cannot be empty")

        # AI Processing
        try:
            ai_data = generate_ai_fields(ticket.description)
        except Exception:
            ai_data = {
                "summary": "AI failed",
                "category": "unknown",
                "tags": ""
            }

        new_ticket = Ticket(
            title=ticket.title,
            description=ticket.description,
            summary=ai_data.get("summary"),
            category=ai_data.get("category"),
            tags=ai_data.get("tags"),
        )

        db.add(new_ticket)
        db.commit()
        db.refresh(new_ticket)

        return new_ticket

    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail="Database error occurred"
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


# Get All Tickets
@router.get("/tickets")
def get_tickets(db: Session = Depends(get_db)):
    try:
        tickets = db.query(Ticket).all()
        return tickets
    except SQLAlchemyError:
        raise HTTPException(
            status_code=500,
            detail="Error fetching tickets"
        )


# Get Single Ticket
@router.get("/tickets/{id}")
def get_ticket(id: int, db: Session = Depends(get_db)):
    try:
        ticket = db.query(Ticket).filter(Ticket.id == id).first()

        if not ticket:
            raise HTTPException(
                status_code=404,
                detail=f"Ticket with id {id} not found"
            )

        return ticket

    except SQLAlchemyError:
        raise HTTPException(
            status_code=500,
            detail="Error fetching ticket"
        )