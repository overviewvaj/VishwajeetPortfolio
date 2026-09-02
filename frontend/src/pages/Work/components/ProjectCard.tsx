import type { Project } from "../data/projects";

interface ProjectCardProps {
    project: Project;
    index: number;
    onSelect: (project: Project) => void;
}

function ProjectCard({
    project,
    index,
    onSelect,
}: ProjectCardProps) {
    return (
        <article
            className="work-project-card"
            style={
                {
                    "--card-accent": project.visual.accent,
                } as React.CSSProperties
            }
        >
            <div className="work-project-card__top">
                <span className="work-project-card__index">
                    {String(index + 1).padStart(2, "0")}
                </span>

                <span className="work-project-card__category">
                    {project.category.toUpperCase()}
                </span>
            </div>

            <div className="work-project-card__body">
                <h3>{project.title}</h3>

                <p>{project.shortDescription}</p>
            </div>

            <div className="work-project-card__metrics">
                {project.metrics.slice(0, 3).map((metric) => (
                    <div
                        key={`${project.id}-${metric.label}`}
                        className="work-project-card__metric"
                    >
                        <strong>{metric.value}</strong>
                        <span>{metric.label}</span>
                    </div>
                ))}
            </div>

            <div className="work-project-card__footer">
                <div className="work-project-card__technologies">
                    {project.technologies.slice(0, 4).map((technology) => (
                        <span key={technology}>
                            {technology}
                        </span>
                    ))}
                </div>

                <button
                    type="button"
                    onClick={() => onSelect(project)}
                    className="work-project-card__open"
                >
                    EXPLORE
                    <span aria-hidden="true">↗</span>
                </button>
            </div>
        </article>
    );
}

export default ProjectCard;