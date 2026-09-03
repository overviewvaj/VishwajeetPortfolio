import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Work.css";

import {
    projects,
    type ProjectCategory,
    type Project,
} from "./data/projects";

import WorkScene from "./components/WorkScene";
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
     * PAGE
     * =====================================================
     */

    return (
        <main className="work-page">
            {/* =====================================================
                SYSTEM ENVIRONMENT
            ===================================================== */}

            <WorkScene
                projects={filteredProjects}
                onSelectProject={
                    handleProjectSelect
                }
            />

            {/* =====================================================
                HEADER
            ===================================================== */}

            <header className="work-header">
                <div className="work-header__content">
                    <div className="work-header__title">
                        <h1>
                            Systems I have
                            <br />
                            designed, engineered
                            <br />
                            and delivered.
                        </h1>
                    </div>

                    <p className="work-header__description">
                        Production systems, regulatory
                        infrastructure, AI platforms and
                        independent research — explored
                        as systems rather than screenshots.
                    </p>
                </div>

                {/* =================================================
                    CATEGORY NAVIGATION
                ================================================= */}

                <WorkNavigation
                    activeCategory={
                        activeCategory
                    }
                    onCategoryChange={
                        setActiveCategory
                    }
                />
            </header>

            {/* =====================================================
                PROJECT SYSTEMS
            ===================================================== */}

            <section className="work-projects">
                <div className="work-projects__intro">
                    <span>
                        {String(
                            filteredProjects.length,
                        ).padStart(2, "0")}{" "}
                        SYSTEMS
                    </span>

                    <span>
                        CLICK A SYSTEM TO EXPLORE
                    </span>
                </div>

                <div className="work-projects__grid">
                    {filteredProjects.map(
                        (
                            project,
                            index,
                        ) => (
                            <ProjectCard
                                key={
                                    project.id
                                }
                                project={
                                    project
                                }
                                index={
                                    index
                                }
                                onSelect={
                                    handleProjectSelect
                                }
                            />
                        ),
                    )}
                </div>
            </section>

            {/* =====================================================
                FOOTER
            ===================================================== */}

            <footer className="work-footer">
                <div className="work-footer__inner">
                    <div className="work-footer__content">
                        <div className="work-footer__name">
                            Vishwajeet Joshi
                        </div>

                        <div className="work-footer__descriptor">
                            DATA · SYSTEMS ·
                            REGULATION ·
                            INTELLIGENCE
                        </div>

                        <div className="work-footer__location">
                            LONDON · UK
                        </div>
                    </div>
                </div>
            </footer>
        </main>
    );
}

export default Work;