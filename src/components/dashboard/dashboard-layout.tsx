import { styled } from "@mui/material/styles";
import { FC, ReactNode, useState } from "react";
import { IconButton, Dialog, DialogContent } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import { DashboardNavbar } from "./dashboard-navbar";
import { DashboardSidebar } from "./dashboard-sidebar";
import useDialog from "@/hooks/useDialog";
import Subbar from "./dashboard-subbar";
import ChatbotPage from "@/pages/chatbot.page";

interface DashboardLayoutProps {
    children?: ReactNode;
}

const DashboardLayoutRoot = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    flex: "1 1 auto",
    maxWidth: "100%",
    marginTop: 75,
    marginBottom: theme.spacing(2),

    [theme.breakpoints.up("md")]: {
        marginLeft: 200,
    },

    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
}));

export const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
    const [isSidebarOpen, openSidebar, closeSidebar] = useDialog();
    const [openChatbot, setOpenChatbot] = useState(false);
    // const [userId, setUserId] = useState<number | null>(null);

    const toggleChatbot = () => {
        // const uniqueUserId = Math.floor(Math.random()*1000000)
        // setUserId(uniqueUserId)
        setOpenChatbot(!openChatbot);
    };

    return (
        <>
            <DashboardLayoutRoot>{children}</DashboardLayoutRoot>
            <DashboardNavbar onOpenSidebar={openSidebar} />
            <DashboardSidebar onClose={closeSidebar} open={isSidebarOpen} />

            {/* Chatbot button with animation */}
            <IconButton
                color="primary"
                onClick={toggleChatbot}
                sx={{
                    position: "fixed",
                    bottom: 16,
                    right: 16,
                    backgroundColor: "#007bff",
                    color: "#fff",
                    "&:hover": {
                        backgroundColor: "#0056b3",
                    },
                    animation: `moveRotate 5s infinite`,
                    "@keyframes moveRotate": {
                        "0%": { transform: "translateX(0)" },
                        "25%": { transform: "translateX(10px)" },
                        "50%": { transform: "translateX(-10px)" },
                        "75%": { transform: "translateX(0) rotate(0deg)" },
                        "100%": { transform: "rotate(360deg)" },
                    },
                }}
            >
                <ChatIcon fontSize="medium" />
            </IconButton>

            {/* Modal dialog for the chatbot content */}
            <Dialog
                open={openChatbot}
                onClose={toggleChatbot}
                sx={{
                    "& .MuiDialog-paper": {
                        position: "fixed",
                        right: 16,
                        width: "24rem",
                        maxHeight: "40rem",
                        borderRadius: "8px",
                        boxShadow: "0px 4px 20px rgba(0,0,0,0.2)",
                    },
                }}
            >
                <DialogContent sx={{paddingX:0 , paddingTop:0 , paddingBottom:"0px" ,height: "34rem"}} >
                    <ChatbotPage />
                </DialogContent>
            </Dialog>
        </>
    );
};
