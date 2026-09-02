import { useNavigate } from "react-router-dom";
import type { Project } from "../data/projects";

interface ProjectPageProps {
    project: Project;
}

function ProjectPage({
    project,
}: ProjectPageProps) {
    const navigate = useNavigate();

    return (
        <main
            className="project-page"
            style={
                {
                    "--project-accent":
                        project.visual.accent,
                } as React.CSSProperties
            }
        >
            <div className="project-page__ambient" />

            <header className="project-page__header">
                <button
                    type="button"
                    className="project-page__back"
                    onClick={() => navigate("/work")}
                >
                    ← BACK TO WORK
                </button>

                <div className="project-page__meta">
                    <span>
                        {project.category.toUpperCase()}
                    </span>

                    <span>
                        {project.experience.toUpperCase()}
                    </span>
                </div>
            </header>

            <section className="project-page__hero">
                <p className="project-page__eyebrow">
                    SYSTEM //{" "}
                    {project.id.toUpperCase()}
                </p>

                <h1>{project.title}</h1>

                <p className="project-page__description">
                    {project.description}
                </p>

                <div className="project-page__technologies">
                    {project.technologies.map(
                        (technology) => (
                            <span key={technology}>
                                {technology}
                            </span>
                        ),
                    )}
                </div>
            </section>

            {project.sections.context && (
                <section
                    id="context"
                    className="project-section"
                >
                    <div className="project-section__index">
                        01
                    </div>

                    <div>
                        <p className="project-section__label">
                            CONTEXT
                        </p>

                        <h2>
                            The problem behind
                            the system.
                        </h2>

                        <p>
                            This section will
                            describe the business,
                            regulatory and technical
                            context that required the
                            system to exist.
                        </p>
                    </div>
                </section>
            )}

            {project.sections.system && (
                <section
                    id="system"
                    className="project-section"
                >
                    <div className="project-section__index">
                        02
                    </div>

                    <div>
                        <p className="project-section__label">
                            SYSTEM
                        </p>

                        <h2>
                            What was actually
                            built.
                        </h2>

                        <p>
                            The production system,
                            its responsibilities
                            and how it operated
                            within the wider
                            ecosystem.
                        </p>
                    </div>
                </section>
            )}

            {project.sections.architecture && (
                <section
                    id="architecture"
                    className="project-section project-section--architecture"
                >
                    <div className="project-section__index">
                        03
                    </div>

                    <div>
                        <p className="project-section__label">
                            ARCHITECTURE
                        </p>

                        <h2>
                            From data to
                            decision.
                        </h2>

                        <div className="project-architecture">
                            <div>
                                DATA
                            </div>

                            <span>→</span>

                            <div>
                                PROCESS
                            </div>

                            <span>→</span>

                            <div>
                                INTELLIGENCE
                            </div>

                            <span>→</span>

                            <div>
                                GOVERNANCE
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {project.sections.engineering && (
                <section
                    id="engineering"
                    className="project-section"
                >
                    <div className="project-section__index">
                        04
                    </div>

                    <div>
                        <p className="project-section__label">
                            ENGINEERING
                        </p>

                        <h2>
                            The engineering
                            decisions.
                        </h2>

                        <p>
                            Technologies,
                            architecture decisions,
                            data pipelines,
                            validation and
                            implementation
                            considerations.
                        </p>
                    </div>
                </section>
            )}

            {project.sections.governance && (
                <section
                    id="governance"
                    className="project-section"
                >
                    <div className="project-section__index">
                        05
                    </div>

                    <div>
                        <p className="project-section__label">
                            GOVERNANCE
                        </p>

                        <h2>
                            Engineering under
                            control.
                        </h2>

                        <p>
                            Controls, authorization,
                            auditability, regulatory
                            requirements and
                            responsible AI/data
                            practices.
                        </p>
                    </div>
                </section>
            )}

            {project.sections.impact && (
                <section
                    id="impact"
                    className="project-section project-section--impact"
                >
                    <div className="project-section__index">
                        06
                    </div>

                    <div>
                        <p className="project-section__label">
                            IMPACT
                        </p>

                        <div className="project-impact">
                            {project.metrics.map(
                                (metric) => (
                                    <div
                                        key={`${project.id}-${metric.label}`}
                                        className="project-impact__metric"
                                    >
                                        <strong>
                                            {
                                                metric.value
                                            }
                                        </strong>

                                        <span>
                                            {
                                                metric.label
                                            }
                                        </span>
                                    </div>
                                ),
                            )}
                        </div>
                    </div>
                </section>
            )}

            {project.sections.demo && (
                <section
                    id="demo"
                    className="project-section project-section--demo"
                >
                    <div className="project-section__index">
                        07
                    </div>

                    <div>
                        <p className="project-section__label">
                            DEMO
                        </p>

                        <h2>
                            Explore the system.
                        </h2>

                        <p>
                            A sanitized,
                            representative
                            interactive demonstration
                            will live here. No
                            confidential employer or
                            customer data will be
                            exposed.
                        </p>

                        <div className="project-demo-placeholder">
                            <span>
                                INTERACTIVE DEMO
                            </span>
                        </div>
                    </div>
                </section>
            )}

            <footer className="project-page__footer">
                <button
                    type="button"
                    onClick={() => navigate("/work")}
                >
                    ← RETURN TO SYSTEMS
                </button>
            </footer>
        </main>
    );
}

export default ProjectPage;