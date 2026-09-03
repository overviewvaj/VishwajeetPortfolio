import {
    useEffect,
    useMemo,
    useState,
    type CSSProperties,
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
    angle: number;
    radius: number;
}

interface SceneConnection {
    from: SceneProject;
    to: SceneProject;
}

function WorkScene({
    projects,
    onSelectProject,
}: WorkSceneProps) {
    const [scrollProgress, setScrollProgress] =
        useState(0);

    const [activeProjectId, setActiveProjectId] =
        useState<string | null>(null);

    const [time, setTime] = useState(0);

    /*
     * -----------------------------------------------------
     * SCROLL PROGRESS
     * -----------------------------------------------------
     */

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

    /*
     * -----------------------------------------------------
     * AMBIENT ANIMATION CLOCK
     * -----------------------------------------------------
     */

    useEffect(() => {
        let animationFrame = 0;

        const animate = () => {
            setTime(
                performance.now() / 1000,
            );

            animationFrame =
                requestAnimationFrame(
                    animate,
                );
        };

        animationFrame =
            requestAnimationFrame(
                animate,
            );

        return () => {
            cancelAnimationFrame(
                animationFrame,
            );
        };
    }, []);

    /*
     * -----------------------------------------------------
     * PROJECT POSITIONING
     * -----------------------------------------------------
     */

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
                        2 -
                        Math.PI / 2;

                    const radius =
                        project.category ===
                            "flagship"
                            ? 29
                            : project.category ===
                                "engineering"
                                ? 38
                                : project.category ===
                                    "research"
                                    ? 46
                                    : 43;

                    const depth =
                        project.category ===
                            "flagship"
                            ? 1
                            : project.category ===
                                "engineering"
                                ? 0.78
                                : project.category ===
                                    "analytics"
                                    ? 0.68
                                    : 0.55;

                    return {
                        project,
                        angle,
                        radius,
                        depth,
                        x:
                            50 +
                            Math.cos(angle) *
                            radius,
                        y:
                            50 +
                            Math.sin(angle) *
                            radius,
                    };
                },
            );
        }, [projects]);

    /*
     * -----------------------------------------------------
     * NETWORK CONNECTIONS
     * -----------------------------------------------------
     */

    const connections =
        useMemo<SceneConnection[]>(() => {
            if (
                sceneProjects.length < 2
            ) {
                return [];
            }

            const result: SceneConnection[] =
                [];

            for (
                let index = 0;
                index <
                sceneProjects.length;
                index++
            ) {
                const current =
                    sceneProjects[index];

                const next =
                    sceneProjects[
                    (index + 1) %
                    sceneProjects.length
                    ];

                result.push({
                    from: current,
                    to: next,
                });
            }

            return result;
        }, [sceneProjects]);

    /*
     * -----------------------------------------------------
     * PROJECT SELECTION
     * -----------------------------------------------------
     */

    const handleSelect = (
        project: Project,
    ) => {
        setActiveProjectId(
            project.id,
        );

        onSelectProject(project);
    };

    /*
     * -----------------------------------------------------
     * SCENE ROTATION
     * -----------------------------------------------------
     */

    const rotation =
        time * 0.8 +
        scrollProgress * 16;

    /*
     * -----------------------------------------------------
     * RENDER
     * -----------------------------------------------------
     */

    return (
        <div
            className="work-scene"
            style={
                {
                    "--scene-progress":
                        scrollProgress,
                    "--scene-time":
                        time,
                    "--scene-rotation":
                        `${rotation}deg`,
                } as CSSProperties
            }
        >
            {/* BACKGROUND GRID */}

            <div className="work-scene__grid" />

            {/* AMBIENT LIGHT */}

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

            {/* DISTANT ORBIT */}

            <div className="work-scene__distant-orbit">
                <span />
                <span />
                <span />
            </div>

            {/* CENTRAL SYSTEM */}

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

                <span className="work-scene__core-crosshair" />

                <span className="work-scene__core-center" />

                <span className="work-scene__core-label">
                    SYSTEM CORE
                </span>
            </div>

            {/* NETWORK CONNECTIONS */}

            <div className="work-scene__connections">
                {connections.map(
                    (
                        connection,
                        index,
                    ) => (
                        <div
                            key={`${connection.from.project.id}-${connection.to.project.id}`}
                            className="work-scene__connection"
                            style={
                                {
                                    "--connection-index":
                                        index,
                                    "--from-x":
                                        `${connection.from.x}%`,
                                    "--from-y":
                                        `${connection.from.y}%`,
                                    "--to-x":
                                        `${connection.to.x}%`,
                                    "--to-y":
                                        `${connection.to.y}%`,
                                } as CSSProperties
                            }
                        >
                            <span className="work-scene__connection-line" />

                            <span className="work-scene__connection-pulse" />
                        </div>
                    ),
                )}
            </div>

            {/* PROJECT NODES */}

            <div
                className="work-scene__nodes"
                style={{
                    transform:
                        `rotate(${rotation * 0.08}deg)`,
                }}
            >
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
                            className="work-scene__node-wrapper"
                            style={
                                {
                                    left: `${x}%`,
                                    top: `${y}%`,
                                    opacity:
                                        0.42 +
                                        depth *
                                        0.58,
                                    zIndex:
                                        Math.round(
                                            depth *
                                            100,
                                        ),
                                    transform:
                                        `
                                            translate(-50%, -50%)
                                            scale(${0.72 + depth * 0.28})
                                        `,
                                } as CSSProperties
                            }
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

            {/* PRIMARY DATA SCAN */}

            <div className="work-scene__scanline" />

            {/* SECONDARY DATA SCAN */}

            <div
                className="
                    work-scene__scanline
                    work-scene__scanline--secondary
                "
            />

            
        </div>
    );
}

export default WorkScene;