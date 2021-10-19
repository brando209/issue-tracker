import React from 'react';
import useNotificationBanner from '../../../hooks/useNotificationBanner';
import './NotificationBanner.css';

export default function NotificationBanner(props) {
    const banner = useNotificationBanner();
    return (
        <div className={'notification-banner-container ' + (banner.show ? "show" : "")}>
            <div className="notification-banner">
                {banner.text}
            </div>
        </div>
    );
};