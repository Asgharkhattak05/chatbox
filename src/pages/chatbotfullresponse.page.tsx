import { useRouter } from "next/router";
import { Box, Typography } from "@mui/material";
import Markdown from "markdown-to-jsx";

const Chatbotfullresponse: React.FC = () => {
    const router = useRouter();
    const { text, type } = router.query;

    return (
        <Box
            sx={{
                width: "100%",
                maxWidth: "700px",
                margin: "auto",
                padding: "1rem",
                border: "1px solid #ddd",
                borderRadius: "8px",
                backgroundColor: "#f9f9f9",
                height: "90vh",
            }}
        >
            <Box
                sx={{
                    padding: 1,
                    borderRadius: 1,
                    background:
                        type === "user"
                            ? "linear-gradient(to bottom right, #a1cca2, #81C784)"
                            : "linear-gradient(to bottom right, #82c1f2, #64B5F6)",
                    maxWidth: "100%",
                    wordBreak: "break-word",
                }}
            >
                {text ? (
                    <Markdown>{decodeURIComponent(text as string)}</Markdown>
                ) : (
                    "Loading..."
                )}
            </Box>
        </Box>
    );
};

export default Chatbotfullresponse;
