import { useProfileQuery } from "@/services/user";
import Markdown from "markdown-to-jsx";

import {
    Box,
    Typography,
    TextField,
    Button,
    CircularProgress,
} from "@mui/material";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

// interface ChatbotPageProps {
//     userId: number | null; // Accept userId as a prop
// }
interface Message {
    type: "user" | "bot";
    text: string;
}
const ChatbotPage = () => {
    const { data: profile } = useProfileQuery();
    // console.log(profile);
    // console.log(userId)
    const [query, setQuery] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const handleSendMessage = async () => {
        if (query.trim()) {
            setMessages((prevMessages) => [
                ...prevMessages,
                { type: "user", text: query },
            ]);
            setQuery("");
            setLoading(true);

            try {
                console.log(profile?.id);
                const response = await axios.post(
                    "https://aidrawing.rentaghr.com/askdb",
                    {
                        user_query: query,
                        user_id: profile?.id,
                    }
                );

                setMessages((prevMessages) => [
                    ...prevMessages,
                    { type: "bot", text: response.data.response },
                ]);
            } catch (error) {
                console.error("Error fetching chatbot response:", error);
                setMessages((prevMessages) => [
                    ...prevMessages,
                    {
                        type: "bot",
                        text: "Sorry, there was an error. Please try again later.",
                    },
                ]);
            } finally {
                setLoading(false);
            }
        }
    };

    const truncateText = (text: string, maxLength: number): string => {
        if (text.length <= maxLength) return text;
        return text.slice(0, maxLength) + "...";
    };


    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <Box
            sx={{
                width: "100%",
                height: "33rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                position: "relative",
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    padding: "0.5rem",
                    background:
                        "linear-gradient(to bottom right, #2732DD, #09a6f7)",
                    color: "#fff",
                    textAlign: "center",
                }}
            >
                <Typography variant="h5">Hestia</Typography>
            </Box>

            <Box
                sx={{
                    width: "100%",
                    maxWidth: "700px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    alignItems: "center",
                }}
            >
                <Box
                    sx={{
                        flex: 1,
                        width: "98%",
                        padding: 1,
                        borderRadius: 1,
                        border: "1px solid #ddd",
                        overflowY: "auto",
                        height: "24.5rem",
                        maxHeight: "24.5rem",
                        minHeight: "24.5rem",
                        marginTop: "1rem",
                        scrollbarWidth: "none",
                        "&::-webkit-scrollbar": { display: "none" },
                    }}
                >
                    {messages.map((message, index) => (
                        <Box
                            key={index}
                            sx={{
                                display: "flex",
                                justifyContent:
                                    message.type === "user"
                                        ? "flex-end"
                                        : "flex-start",
                                mb: 1,
                                fontSize: "0.9rem",
                            }}
                        >
                            <Box
                                sx={{
                                    padding: 1,
                                    borderRadius: 1,
                                    background:
                                        message.type === "user"
                                            ? "linear-gradient(to bottom right, #a1cca2, #81C784)"
                                            : "linear-gradient(to bottom right, #82c1f2, #64B5F6)",
                                    maxWidth: "75%",
                                }}
                            >
                                {message.type === "bot" &&
                                    message.text.length > 100 ? (
                                    <>
                                        <Markdown>
                                            {truncateText(message.text, 100)}
                                        </Markdown>
                                        <Link
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            href={{
                                                pathname: `/chatbotfullresponse`,
                                                query: { text: message.text, type: message.type },
                                            }}
                                            onClick={() => {
                                                localStorage.setItem("fullMessage", message.text);
                                            }}
                                            style={{
                                                color: "blue",
                                                textDecoration: "underline",
                                            }}
                                        >
                                            View More
                                        </Link>
                                    </>
                                ) : (
                                    <Markdown>{message.text}</Markdown>
                                )}
                            </Box>
                        </Box>
                    ))}
                    {loading && (
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "start",
                                mt: 2,
                            }}
                        >
                            <CircularProgress size={20} />
                            <Typography
                                variant="body2"
                                sx={{ ml: 1, fontSize: "1rem" }}
                            >
                                loading...
                            </Typography>
                        </Box>
                    )}
                    <div ref={messagesEndRef} />
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        gap: 1,
                        width: "100%",
                        maxWidth: "700px",
                        paddingX: "4px",
                        position: "absolute",
                        bottom: 0,
                    }}
                >
                    <TextField
                        placeholder="Enter your query..."
                        fullWidth
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") handleSendMessage();
                        }}
                        sx={{ backgroundColor: "white", borderRadius: "10px" }}
                    />
                    <Button
                        variant="contained"
                        onClick={handleSendMessage}
                        disabled={loading}
                    >
                        Send
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default ChatbotPage;
