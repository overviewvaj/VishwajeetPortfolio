import { useMemo } from "react";
import type { Project } from "../data/projects";

interface ProjectNodeProps {
    project: Project;
    active?: boolean;
    onSelect: (project: Project) => void;
}

function ProjectNode({
    project,
    active = false,
    onSelect,
}: ProjectNodeProps) {
    const particleCount = useMemo(
        () => Math.min(project.visual.particleCount, 1200),
        [project.visual.particleCount],
    );

    const particles = useMemo(() => {
        return Array.from({ length: particleCount }, (_, index) => {
            const angle = (index / particleCount) * Math.PI * 2;
            const radius =
                52 +
                Math.sin(index * 0.73) * 18 +
                Math.cos(index * 0.21) * 9;

            return {
                id: index,
                x: Math.cos(angle) * radius,
                y: Math.sin(angle) * radius,
                size: 0.7 + ((index * 17) % 10) / 10,
                opacity: 0.15 + ((index * 13) % 7) / 20,
            };
        });
    }, [particleCount]);

    return (
        <button
            type="button"
            className={`work-project-node ${active ? "work-project-node--active" : ""
                }`}
            onClick={() => onSelect(project)}
            aria-label={`Open ${project.title}`}
            style={
                {
                    "--node-accent": project.visual.accent,
                    "--node-glow": project.visual.glow,
                } as React.CSSProperties
            }
        >
            <span className="work-project-node__orbit work-project-node__orbit--one" />
            <span className="work-project-node__orbit work-project-node__orbit--two" />
            <span className="work-project-node__orbit work-project-node__orbit--three" />

            <span className="work-project-node__particles" aria-hidden="true">
                {particles.slice(0, 40).map((particle) => (
                    <span
                        key={particle.id}
                        className="work-project-node__particle"
                        style={{
                            left: `${50 + particle.x / 2}%`,
                            top: `${50 + particle.y / 2}%`,
                            width: `${particle.size}px`,
                            height: `${particle.size}px`,
                            opacity: particle.opacity,
                        }}
                    />
                ))}
            </span>

            <span className="work-project-node__core">
                <span className="work-project-node__core-inner" />
            </span>

            <span className="work-project-node__label">
                <span className="work-project-node__category">
                    {project.category.toUpperCase()}
                </span>

                <span className="work-project-node__title">
                    {project.shortTitle}
                </span>
            </span>
        </button>
    );
}

export default ProjectNode;