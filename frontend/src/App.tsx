import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import Home from "./pages/Home/Home";
import Studio from "./pages/Studio/Studio";
import Work from "./pages/Work/Work";

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
            </Routes>
        </BrowserRouter>
    );
}

function ProjectRoute() {
    const slug = window.location.pathname.split("/").pop();

    const project = slug
        ? getProjectBySlug(slug)
        : undefined;

    if (!project) {
        return (
            <main
                style={{
                    minHeight: "100vh",
                    display: "grid",
                    placeItems: "center",
                    background: "#050505",
                    color: "#ffffff",
                    fontFamily:
                        "system-ui, sans-serif",
                }}
            >
                <div>
                    <h1>404</h1>

                    <p>
                        Project system not found.
                    </p>

                    <a href="/work">
                        Return to Work
                    </a>
                </div>
            </main>
        );
    }

    return <ProjectPage project={project} />;
}

export default App;