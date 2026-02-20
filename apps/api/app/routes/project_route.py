from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.core.dependencies import get_db
from app.models.resume_chunk_model import ResumeChunkModel
from app.repositories.resume_repository import ResumeRepository

router = APIRouter(prefix="/projects", tags=["Projects"])


@router.get("/{project_id}")
async def get_project(project_id: int, db: AsyncSession = Depends(get_db)):

    repo = ResumeRepository(db)
    active_resume = await repo.get_active_resume()

    if not active_resume:
        raise HTTPException(status_code=404, detail="No active resume found")

    result = await db.execute(
        select(ResumeChunkModel)
        .where(
            ResumeChunkModel.id == project_id,
            ResumeChunkModel.resume_id == active_resume.id,
            ResumeChunkModel.section == "projects"
        )
    )

    project = result.scalar_one_or_none()

    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    return {
        "id": project.id,
        "title": project.metadata.get("title"),
        "company": project.metadata.get("company"),
        "tech_stack": project.metadata.get("tech_stack"),
        "description": project.metadata.get("description"),
        "impact": project.metadata.get("impact"),
    }
