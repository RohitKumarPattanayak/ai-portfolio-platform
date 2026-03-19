export const streamChatConversation = async (
    params: {userId: number, message: string},
): Promise<void> => {
    const {userId , message } = params;
    const baseUrl = (import.meta.env.VITE_BASE_API_URL || "http://localhost:8000").replace(/\/$/, "");
    const authApiKey = import.meta.env.VITE_AUTH_API_KEY;

    const fetchHeaders: Record<string, string> = {
        "Content-Type": "application/json",
    };

    if (authApiKey) {
        fetchHeaders["Authorization"] = `Bearer ${authApiKey}`;
    }

    const response = await fetch(`${baseUrl}/chat/conversation`, {
        method: "POST",
        headers: fetchHeaders,
        body: JSON.stringify({
            user_id: userId,
            message: message,
        }),
    });

    if (!response.ok) {
        throw new Error("Network response was not ok");
    }

    return response.json();
};
export interface ChatMessage {
    id: number;
    message: string;
    role: string;
    mode: string;
    user_id: number;
    resume_id: number;
    created_at: string;
    updated_at: string | null;
}

export const getChatConversation = async (
    userId: number,
): Promise<ChatMessage[]> => {
    const baseUrl = (import.meta.env.VITE_BASE_API_URL || "http://localhost:8000").replace(/\/$/, "");
    const authApiKey = import.meta.env.VITE_AUTH_API_KEY;

    const fetchHeaders: Record<string, string> = {
        "Content-Type": "application/json",
    };

    if (authApiKey) {
        fetchHeaders["Authorization"] = `Bearer ${authApiKey}`;
    }

    const response = await fetch(`${baseUrl}/chat/get-conversation/${userId}`, {
        method: "GET",
        headers: fetchHeaders,
    });

    if (!response.ok) {
        throw new Error("Network response was not ok");
    }

    return response.json();
};