import { useRouter } from "next/router";
import { Box, Typography } from "@mui/material";

const Chatbotfullresponse: React.FC = () => {
    const router = useRouter();
    const { text } = router.query;

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
            {/* <Typography variant="h5" gutterBottom>
                Full Response
            </Typography> */}
            <Typography variant="body1">
                {text ? decodeURIComponent(text as string) : "Loading..."} {/* Decoding the query parameter */}
            </Typography>
        </Box>
    );
};

export default Chatbotfullresponse;
