import { useQuery } from "@tanstack/react-query"
import { getResumes } from "../services/resume.service"

const dashboardQueries = {
  getResumes: (isActive: boolean | null = null, options = {}) => ({
    queryKey: ['fetch-resumes', isActive],
    queryFn: () => getResumes(isActive),
    options
  }),
}


export const dashboardFetchResumes = (isActive: boolean | null = null) => {
  return useQuery(dashboardQueries.getResumes(isActive))
} 