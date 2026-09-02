import type { ProjectCategory } from "../data/projects";

interface WorkNavigationProps {
    activeCategory: ProjectCategory | "all";
    onCategoryChange: (
        category: ProjectCategory | "all",
    ) => void;
}

const categories: Array<{
    id: ProjectCategory | "all";
    label: string;
}> = [
        {
            id: "all",
            label: "ALL SYSTEMS",
        },
        {
            id: "flagship",
            label: "FLAGSHIP",
        },
        {
            id: "engineering",
            label: "ENGINEERING",
        },
        {
            id: "research",
            label: "RESEARCH",
        },
        {
            id: "analytics",
            label: "ANALYTICS",
        },
    ];

function WorkNavigation({
    activeCategory,
    onCategoryChange,
}: WorkNavigationProps) {
    return (
        <nav
            className="work-navigation"
            aria-label="Work project categories"
        >
            {categories.map((category) => (
                <button
                    key={category.id}
                    type="button"
                    className={
                        activeCategory === category.id
                            ? "work-navigation__item work-navigation__item--active"
                            : "work-navigation__item"
                    }
                    onClick={() =>
                        onCategoryChange(category.id)
                    }
                >
                    <span className="work-navigation__indicator" />
                    {category.label}
                </button>
            ))}
        </nav>
    );
}

export default WorkNavigation;