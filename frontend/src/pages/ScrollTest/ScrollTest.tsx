import ScrollFrameLayout from "../../components/layout/ScrollFrameLayout";

function ScrollTest() {
    return (
        <ScrollFrameLayout
            frameCount={300}
            framePath="/frames/ezgif-frame-{index}.jpg"
            scrollHeight="500vh"
            lerp={0.09}
            contentClassName="scroll-test__content"
        >
            <section
                style={{
                    minHeight: "500vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding:
                        "120px 20px 240px",
                    pointerEvents: "none",
                }}
            >
                <div
                    style={{
                        position: "fixed",
                        top: "50%",
                        left: "50%",
                        transform:
                            "translate(-50%, -50%)",
                        textAlign: "center",
                        fontFamily:
                            '"JetBrains Mono", monospace',
                        color: "#ffffff",
                    }}
                >
                    <div
                        style={{
                            fontSize: "11px",
                            letterSpacing: "0.2em",
                            opacity: 0.65,
                            marginBottom: "12px",
                        }}
                    >
                        SHARED PORTFOLIO SYSTEM
                    </div>

                    <h1
                        style={{
                            margin: 0,
                            fontSize:
                                "clamp(28px, 5vw, 72px)",
                            fontWeight: 500,
                            letterSpacing:
                                "-0.04em",
                        }}
                    >
                        LAYOUT TEST
                    </h1>

                    <p
                        style={{
                            marginTop: "16px",
                            fontSize: "12px",
                            letterSpacing:
                                "0.08em",
                            opacity: 0.55,
                        }}
                    >
                        SCROLL TO CONTROL SEQUENCE
                    </p>
                </div>
            </section>
        </ScrollFrameLayout>
    );
}

export default ScrollTest;