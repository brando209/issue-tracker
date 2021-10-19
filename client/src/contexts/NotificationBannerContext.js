import React, { useState, createContext } from 'react';

export const notificationBannerContext = createContext({ });

export default function ProvideNotificationBanner(props) {
    const notificationBanner = useProvideNotificationBanner();

    return (
        <notificationBannerContext.Provider value={notificationBanner}>
            {props.children}
        </notificationBannerContext.Provider>
    )
}

function useProvideNotificationBanner() {
    const [text, setText] = useState("Notification Banner");
    const [show, setShow] = useState(false);

    const showNotificationWithText = (value) => {
        setText(value);
        setShow(true);
        setTimeout(() => { 
            setShow(false);
            setText("");
        }, 5000);
    }

    return {
        text,
        show,
        showNotificationWithText
    }
}