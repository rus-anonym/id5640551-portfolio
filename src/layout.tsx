import React from "react";
import {
    Panel,
    PanelHeader,
    SplitCol,
    SplitLayout,
    VKCOM,
    View,
    ViewWidth,
    useAdaptivity,
    usePlatform,
} from "@vkontakte/vkui";
import Portfolio from "./portfolio";

const Layout = (): JSX.Element => {
    const platform = usePlatform();
    const { viewWidth } = useAdaptivity();

    const hasHeader = platform !== VKCOM;
    const isDesktop = viewWidth >= ViewWidth.TABLET;

    return (
        <SplitLayout
            style={{ justifyContent: "center" }}
            header={hasHeader && <PanelHeader separator={false} />}
        >
            <SplitCol
                animate={!isDesktop}
                spaced={isDesktop}
                width={isDesktop ? "40vw" : "100%"}
                maxWidth={isDesktop ? "40vw" : "100%"}
            >
                <View activePanel="main">
                    <Panel id="main">
                        <PanelHeader style={{ textAlign: "center" }}>id5640551-portfolio</PanelHeader>
                        <Portfolio />
                    </Panel>
                </View>
            </SplitCol>
        </SplitLayout>
    );
};

export default Layout;
