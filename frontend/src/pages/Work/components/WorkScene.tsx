import {
    useEffect,
    useMemo,
    useState,
} from "react";

import type { Project } from "../data/projects";
import ProjectNode from "./ProjectNode";

interface WorkSceneProps {
    projects: Project[];
    onSelectProject: (project: Project) => void;
}

interface SceneProject {
    project: Project;
    x: number;
    y: number;
    depth: number;
}

function WorkScene({
    projects,
    onSelectProject,
}: WorkSceneProps) {
    const [scrollProgress, setScrollProgress] =
        useState(0);

    const [activeProjectId, setActiveProjectId] =
        useState<string | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            const documentHeight =
                document.documentElement.scrollHeight -
                window.innerHeight;

            if (documentHeight <= 0) {
                setScrollProgress(0);
                return;
            }

            const progress =
                window.scrollY / documentHeight;

            setScrollProgress(
                Math.min(
                    Math.max(progress, 0),
                    1,
                ),
            );
        };

        handleScroll();

        window.addEventListener(
            "scroll",
            handleScroll,
            {
                passive: true,
            },
        );

        return () => {
            window.removeEventListener(
                "scroll",
                handleScroll,
            );
        };
    }, []);

    const sceneProjects =
        useMemo<SceneProject[]>(() => {
            const total = projects.length;

            return projects.map(
                (project, index) => {
                    const angle =
                        (index /
                            Math.max(
                                total,
                                1,
                            )) *
                        Math.PI *
                        2;

                    const radius =
                        project.category ===
                            "flagship"
                            ? 31
                            : project.category ===
                                "engineering"
                                ? 39
                                : 47;

                    return {
                        project,

                        x:
                            50 +
                            Math.cos(angle) *
                            radius,

                        y:
                            50 +
                            Math.sin(angle) *
                            radius,

                        depth:
                            project.category ===
                                "flagship"
                                ? 1
                                : project.category ===
                                    "engineering"
                                    ? 0.75
                                    : 0.5,
                    };
                },
            );
        }, [projects]);

    const handleSelect = (
        project: Project,
    ) => {
        setActiveProjectId(
            project.id,
        );

        onSelectProject(project);
    };

    return (
        <div
            className="work-scene"
            style={
                {
                    "--scene-progress":
                        scrollProgress,
                } as React.CSSProperties
            }
        >
            <div className="work-scene__grid" />

            <div
                className="
                    work-scene__ambient
                    work-scene__ambient--one
                "
            />

            <div
                className="
                    work-scene__ambient
                    work-scene__ambient--two
                "
            />

            <div className="work-scene__core">
                <span
                    className="
                        work-scene__core-ring
                        work-scene__core-ring--one
                    "
                />

                <span
                    className="
                        work-scene__core-ring
                        work-scene__core-ring--two
                    "
                />

                <span
                    className="
                        work-scene__core-ring
                        work-scene__core-ring--three
                    "
                />

                <span className="work-scene__core-center" />
            </div>

            <div className="work-scene__nodes">
                {sceneProjects.map(
                    ({
                        project,
                        x,
                        y,
                        depth,
                    }) => (
                        <div
                            key={
                                project.id
                            }
                            className="
                                work-scene__node-wrapper
                            "
                            style={{
                                left: `${x}%`,
                                top: `${y}%`,
                                opacity:
                                    0.45 +
                                    depth *
                                    0.55,
                                transform: `
                                    translate(
                                        -50%,
                                        -50%
                                    )
                                    scale(
                                        ${0.72 +
                                    depth *
                                    0.28
                                    }
                                    )
                                `,
                            }}
                        >
                            <ProjectNode
                                project={
                                    project
                                }
                                active={
                                    activeProjectId ===
                                    project.id
                                }
                                onSelect={
                                    handleSelect
                                }
                            />
                        </div>
                    ),
                )}
            </div>

            <div className="work-scene__scanline" />
        </div>
    );
}

export default WorkScene;