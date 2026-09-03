import {
    BrowserRouter,
    Routes,
    Route,
    useParams,
    Link,
} from "react-router-dom";

import Home from "./pages/Home/Home";
import Studio from "./pages/Studio/Studio";
import Work from "./pages/Work/Work";
import Journal from "./pages/Journal/Journal";
import ReachUs from "./pages/ReachUs/ReachUs";
import ScrollTest from "./pages/ScrollTest/ScrollTest";
import ScrollFrameLayout from "./components/layout/ScrollFrameLayout";

import {
    getProjectBySlug,
} from "./pages/Work/data/projects";

import ProjectPage from "./pages/Work/projects/ProjectPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/Studio"
                    element={<Studio />}
                />

                <Route
                    path="/work"
                    element={<Work />}
                />

                <Route
                    path="/work/:slug"
                    element={<ProjectRoute />}
                />

                <Route
                    path="/Journal"
                    element={<Journal />}
                />

                <Route
                    path="/journal"
                    element={<Journal />}
                />

                <Route
                    path="/ReachUs"
                    element={<ReachUs />}
                />

                <Route
                    path="/reachus"
                    element={<ReachUs />}
                />

                <Route
                    path="/Contact"
                    element={<ReachUs />}
                />

                <Route
                    path="/contact"
                    element={<ReachUs />}
                />

                {/* Temporary scroll-frame system test */}
                <Route
                    path="/scroll-test"
                    element={<ScrollTest />}
                />
            </Routes>
        </BrowserRouter>
    );
}

function ProjectRoute() {
    const { slug } = useParams<{ slug: string }>();

    const project = slug
        ? getProjectBySlug(slug)
        : undefined;

    if (!project) {
        return (
            <ScrollFrameLayout
                scrollHeight="100%"
                lerp={0.09}
            >
                <div
                    style={{
                        minHeight: "70vh",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        padding: "160px 40px 80px",
                    }}
                >
                    <div
                        style={{
                            fontFamily: "JetBrains Mono, monospace",
                            fontSize: "12px",
                            letterSpacing: "0.14em",
                            color: "#38bdf8",
                            marginBottom: "16px",
                        }}
                    >
                        STATUS // 404 NOT FOUND
                    </div>

                    <h1
                        style={{
                            fontFamily: "Instrument Serif, Georgia, serif",
                            fontSize: "clamp(3rem, 6vw, 5rem)",
                            fontWeight: 400,
                            margin: "0 0 16px",
                            color: "#ffffff",
                        }}
                    >
                        System not found.
                    </h1>

                    <p
                        style={{
                            fontFamily: "Inter, sans-serif",
                            fontSize: "1rem",
                            color: "rgba(255, 255, 255, 0.7)",
                            marginBottom: "32px",
                            maxWidth: "480px",
                        }}
                    >
                        The requested engineering system or architecture specification
                        could not be located.
                    </p>

                    <Link
                        to="/work"
                        style={{
                            fontFamily: "JetBrains Mono, monospace",
                            fontSize: "11px",
                            letterSpacing: "0.12em",
                            color: "#030712",
                            background: "#38bdf8",
                            padding: "12px 24px",
                            borderRadius: "4px",
                            textDecoration: "none",
                            fontWeight: 600,
                        }}
                    >
                        ← RETURN TO ALL SYSTEMS
                    </Link>
                </div>
            </ScrollFrameLayout>
        );
    }

    return (
        <ProjectPage
            project={project}
        />
    );
}

export default App;