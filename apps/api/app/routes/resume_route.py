from fastapi import APIRouter, Depends, UploadFile, File, Form
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.core.dependencies import get_db
from app.services.resume_injestion_service import ResumeIngestionService
from app.repositories.resume_repository import ResumeRepository
from app.models.resume_model import ResumeModel
from app.services.file_parser import FileParserService

router = APIRouter(prefix="/resume", tags=["Resume"])


@router.post("/upload")
async def upload_resume(
    name: str = Form(...),
    file: UploadFile = File(...),
    db: AsyncSession = Depends(get_db)
):
    RIservice = ResumeIngestionService(db)
    Fservice = FileParserService()

    content = await file.read()
    text = Fservice.parse(file.filename, content)
    resume = await RIservice.upload_resume(name=name, raw_text=text)

    return {"message": "Resume uploaded", "resume_id": resume.id}


@router.get("/")
async def list_resumes(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(ResumeModel))
    resumes = result.scalars().all()

    return [
        {
            "id": r.id,
            "name": r.name,
            "is_active": r.is_active
        }
        for r in resumes
    ]


@router.post("/activate/{resume_id}")
async def activate_resume(resume_id: int, db: AsyncSession = Depends(get_db)):
    repo = ResumeRepository(db)
    await repo.switch_active_resume(resume_id)
    return {"message": "Resume activated"}


@router.delete("/{resume_id}")
async def delete_resume(resume_id: int, db: AsyncSession = Depends(get_db)):
    repo = ResumeRepository(db)
    await repo.delete_resume(resume_id)
    return {"message": "Resume deleted"}
