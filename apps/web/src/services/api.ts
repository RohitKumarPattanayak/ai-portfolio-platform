import axios from "axios"

const baseUrl = import.meta.env.VITE_BASE_API_URL
const authApiKey = import.meta.env.VITE_AUTH_API_KEY

export const api = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
    headers: authApiKey
      ? { Authorization: `Bearer ${authApiKey}` }
      : {},
  })

/**
 * Interceptor to handle refresh token when access token is expired.
 * It will attempt to refresh the token only for the get_logged_user endpoint.
 */
api.interceptors.response.use(
  async (response) => {
    const originalRequest = response.config as { _retry?: boolean; url?: string }
    const requestUrl = originalRequest?.url ?? ""
    const isGetLoggedUserCall = requestUrl.includes("/user/get_logged_user")
    const responseData = response.data
    const isEmptyObjectResponse =
      responseData &&
      typeof responseData === "object" &&
      !Array.isArray(responseData) &&
      Object.keys(responseData).length === 0

    // Attempt a single refresh only for get_logged_user when API returns {}.
    if (isGetLoggedUserCall && isEmptyObjectResponse && !originalRequest?._retry) {
      originalRequest._retry = true

      try {
        await api.post("/user/refresh")
        return api(originalRequest)
      } catch {
        return response
      }
    }

    return response
  },
  async (error) => {
    return Promise.reject(error)
  }
)