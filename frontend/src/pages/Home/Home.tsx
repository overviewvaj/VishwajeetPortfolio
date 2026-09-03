import ScrollFrameLayout from "../../components/layout/ScrollFrameLayout";

import "./Home.css";

function Home() {
    return (
        <ScrollFrameLayout
            frameCount={300}
            framePath="/frames/ezgif-frame-{index}.jpg"
            scrollHeight="100vh"
            noScroll={true}
            lerp={0.09}
            className="home-page"
            contentClassName="home-page__content"
        >
            <section
                className="home-hero"
                aria-labelledby="home-title"
            >
                <div className="home-hero__content">
                    <div className="home-hero__eyebrow">
                        DATA
                        <span>•</span>
                        ANALYTICS
                        <span>•</span>
                        REGULATORY TECHNOLOGY
                        <span>•</span>
                        AI
                    </div>

                    <h1
                        id="home-title"
                        className="home-hero__title"
                    >
                        Beyond data,
                        <br />
                        I build systems
                        <br />
                        that matter.
                    </h1>

                    <p className="home-hero__description">
                        Building intelligent data platforms,
                        regulatory technology, and AI-driven
                        solutions where complex information
                        becomes clear, actionable decisions.
                    </p>
                </div>
            </section>
        </ScrollFrameLayout>
    );
}

export default Home;