import React, { useMemo } from "react";
import ReactDOM from "react-dom/client";

import "@vkontakte/vkui/dist/vkui.css";
import "@vkontakte/vkui/dist/unstable.css";
import "@vkontakte/vkui/dist/fonts.css";
import {
    AdaptivityProvider,
    AppRoot,
    ConfigProvider,
    WebviewType,
} from "@vkontakte/vkui";
import Layout from "./layout";

const App = (): JSX.Element => {
    const appearance = useMemo(() => {
        return window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
    }, []);

    return (
        <ConfigProvider
            appearance={appearance}
            webviewType={WebviewType.INTERNAL}
            transitionMotionEnabled={false}
        >
            <AdaptivityProvider>
                <AppRoot mode="full">
                    <Layout />
                </AppRoot>
            </AdaptivityProvider>
        </ConfigProvider>
    );
};

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(<App />);
