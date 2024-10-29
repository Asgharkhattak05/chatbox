import {
    Box,
    Drawer,
    Link,
    Stack,
    Theme,
    Typography,
    useMediaQuery,
} from "@mui/material";
import { TFunction } from "i18next";
import { FC, ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Home as HomeIcon } from "../../assets/icons/home";
import { Users as UsersIcon } from "../../assets/icons/users";
import { Scrollbar } from "../scrollbar";
import { DashboardSidebarSection } from "./dashboard-sidebar-section";
import { OrganizationPopover } from "./organization-popover";
import { useProfileQuery } from "src/services/user";
import { ChartPie } from "@/assets/icons/chart-pie";
import { ChartLine as ChartLineIcon } from "@/assets/icons/chart-line";
import { useRouter } from "next/router";
import { LanguageButton } from "../Language/LanguageButton";
import { SettingsButton } from "../settings-button";
import useResponsive from "@/hooks/useResponsive";

interface DashboardSidebarProps {
    onClose?: () => void;
    open?: boolean;
}

interface Item {
    title: string;
    children?: Item[];
    adminOnly?: boolean;
    chip?: ReactNode;
    icon?: ReactNode;
    path?: string;
}

interface Section {
    title: string;
    items: Item[];
}

const getSections = (
    t: TFunction,
    nonViewedNotificationsCount: number
): Section[] => [
    {
        title: t("main"),
        items: [
            {
                title: t("Dashboard"),

                path: "/",
                icon: <ChartPie fontSize="small" />,
            },

            {
                title: t("Statistics"),
                path: "/statistics",
                icon: <ChartLineIcon fontSize="small" />,
            },

            {
                title: t("Properties"),
                path: "/property",
                icon: <HomeIcon fontSize="small" />,
            },

            {
                title: t("Customers"),
                path: "/customers",
                icon: <UsersIcon fontSize="small" />,
            },
        ],
    },
];

export const DashboardSidebar: FC<DashboardSidebarProps> = (props) => {
    const { onClose, open } = props;
    const router = useRouter();
    const { t } = useTranslation();
    const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"), {
        noSsr: true,
    });

    const isAdmin = useProfileQuery().data?.isAdmin ?? false;

    //  filter out the Contact notifications for now as in the page they are not shown and if there is one i get the unerad badge for something that i can not see at all

    const sections = useMemo(() => {
        const sectionsData = getSections(t, 0);

        // Check if the user is not an admin (isAdmin is false)
        if (!isAdmin) {
            // Filter sections based on the adminOnly attribute
            return sectionsData.map((section) => ({
                ...section,
                items: section.items.filter((item) => !item.adminOnly),
            }));
        }

        // If the user is an admin, return all sections without filtering
        return sectionsData;
    }, [t, isAdmin]);

    const organizationsRef = useRef<HTMLButtonElement | null>(null);
    const [openOrganizationsPopover, setOpenOrganizationsPopover] =
        useState<boolean>(false);

    const handlePathChange = () => {
        if (!router.isReady) {
            return;
        }

        if (open) {
            onClose?.();
        }
    };

    useEffect(
        handlePathChange,
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [router.isReady, router.asPath]
    );

    const handleCloseOrganizationsPopover = (): void => {
        setOpenOrganizationsPopover(false);
    };

    const belowMd = useResponsive("down", "md");

    const content = (
        <>
            <Scrollbar
                sx={{
                    height: "100%",
                    "& .simplebar-content": {
                        height: "100%",
                    },
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                    }}
                >
                    <Box
                        sx={{
                            flexGrow: 1,
                            backgroundColor: "background.default",
                        }}
                    >
                        {sections.map((section, index) => (
                            <DashboardSidebarSection
                                key={section.title}
                                path={router.asPath}
                                sx={{
                                    height: "100vh",
                                    pt: 2,

                                    width: "100%",
                                    overflowY: "hidden",
                                    textWrap: "nowrap",
                                }}
                                {...section}
                            />
                        ))}
                        {belowMd ? (
                            <Stack direction="row" justifyContent="center">
                                <LanguageButton />
                                <SettingsButton />
                            </Stack>
                        ) : null}
                    </Box>
                </Box>
            </Scrollbar>
            <OrganizationPopover
                anchorEl={organizationsRef.current}
                onClose={handleCloseOrganizationsPopover}
                open={openOrganizationsPopover}
            />
        </>
    );

    if (lgUp) {
        return (
            <Drawer
                anchor="left"
                open
                PaperProps={{
                    sx: {
                        display: "absolute",
                        top: "64px",
                        backgroundColor: "#FFF",
                        border: 0,
                        color: "#FFFFFF",
                        width: 200,
                    },
                }}
                variant="permanent"
            >
                {content}
            </Drawer>
        );
    }

    return (
        <Drawer
            anchor="left"
            onClose={onClose}
            open={open}
            PaperProps={{
                sx: {
                    paddingTop: !open ? "100px" : 0,
                    width: 200,
                },
            }}
            sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
            variant="temporary"
        >
            {open && (
                <Stack p={2} alignItems="center">
                    <Link href="/">
                        <Typography variant="h5">PropertyPro</Typography>
                    </Link>
                </Stack>
            )}
            {content}
        </Drawer>
    );
};
