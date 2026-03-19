import { useMutation, useQuery } from "@tanstack/react-query"
import { getChatConversation, streamChatConversation } from "../services/chat.service"

const chatMutations = {
  getChatResponse: (options = {}) => ({
    mutationKey: ["chat-response"],
    mutationFn: streamChatConversation,
    ...options
  }),
}

const chatQueries = {
  getChatResponse: (userId: number, options = {}) => ({
    queryKey: ["get-user-conversations", userId],
    queryFn: () => getChatConversation(userId),
    ...options
  }),
}

export const chatResponseMutation = () => {
  return useMutation(chatMutations.getChatResponse())
} 

export const getChatConversationQuery = (userId: number) => {
  return useQuery(chatQueries.getChatResponse(userId))
} 