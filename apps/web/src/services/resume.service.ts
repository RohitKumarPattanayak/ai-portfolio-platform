import { api } from "./api"

export const getResumes = async (isActive: boolean | null = null) => {
  const url = isActive === null ? '/resume' : `/resume?isActive=${isActive}`;
  const response = await api.get(url);
  return isActive ? response.data[0] : response.data;
};

// export const getResumes = async () => {
//   const response = await api.get("/resume") // adjust endpoint
//   return response.data
// }