import { useContext } from "react";
import { notificationBannerContext } from "../contexts/NotificationBannerContext";

export default function useNotificationBanner() {
    return useContext(notificationBannerContext);
}