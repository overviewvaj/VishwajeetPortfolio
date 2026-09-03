import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ScrollFrameLayout from "../../components/layout/ScrollFrameLayout";

import "./Work.css";

import {
    projects,
    type ProjectCategory,
    type Project,
} from "./data/projects";

import WorkNavigation from "./components/WorkNavigation";
import ProjectCard from "./components/ProjectCard";

function Work() {
    const navigate = useNavigate();

    const [activeCategory, setActiveCategory] =
        useState<ProjectCategory | "all">("all");

    /*
     * =====================================================
     * FILTER PROJECTS
     * =====================================================
     */

    const filteredProjects = useMemo(() => {
        if (activeCategory === "all") {
            return projects;
        }

        return projects.filter(
            (project) =>
                project.category === activeCategory,
        );
    }, [activeCategory]);

    /*
     * =====================================================
     * PROJECT NAVIGATION
     * =====================================================
     */

    const handleProjectSelect = (
        project: Project,
    ) => {
        navigate(project.route);
    };

    /*
     * =====================================================
     * PAGE RENDER
     * =====================================================
     */

    return (
        <ScrollFrameLayout
            frameCount={300}
            framePath="/frames/ezgif-frame-{index}.jpg"
            scrollHeight="100%"
            lerp={0.09}
            className="work-page"
            contentClassName="work-page__content"
        >
            {/* =====================================================
                HERO
            ===================================================== */}

            <section
                className="work-hero"
                aria-labelledby="work-title"
            >
                <div className="work-hero__inner">
                    <div className="work-hero__eyebrow">
                        <span className="work-hero__tag">WORK</span>
                        <span>•</span>
                        SYSTEMS ARCHITECTURE
                        <span>•</span>
                        REGULATORY PLATFORMS
                        <span>•</span>
                        AI ENGINES
                    </div>

                    <h1
                        id="work-title"
                        className="work-hero__title"
                    >
                        Systems I have
                        <br />
                        designed, engineered
                        <br />
                        and delivered.
                    </h1>

                    <p className="work-hero__description">
                        Production systems, regulatory infrastructure, AI platforms,
                        and independent research — explored as systems rather than screenshots.
                    </p>
                </div>

                {/* =================================================
                    CATEGORY NAVIGATION
                ================================================= */}

                <WorkNavigation
                    activeCategory={activeCategory}
                    onCategoryChange={setActiveCategory}
                />
            </section>

            {/* =====================================================
                PROJECT SYSTEMS
            ===================================================== */}

            <section
                className="work-projects"
                aria-label="Engineered project systems"
            >
                <div className="work-projects__inner">
                    <div className="work-projects__intro">
                        <span>
                            <span className="work-projects__count">
                                {String(filteredProjects.length).padStart(2, "0")}
                            </span>{" "}
                            SYSTEMS
                        </span>

                        <span>CLICK A SYSTEM TO EXPLORE</span>
                    </div>

                    <div className="work-projects__grid">
                        {filteredProjects.map((project, index) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                index={index}
                                onSelect={handleProjectSelect}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </ScrollFrameLayout>
    );
}

export default Work;