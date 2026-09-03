export interface JournalPhoto {
    id: string;
    url: string;
    caption: string;
    rotation?: number;
    aspect?: "portrait" | "landscape" | "square";
    tapeColor?: string;
}

export interface JournalNote {
    id: string;
    text: string;
    author?: string;
    rotation?: number;
    type?: "handwritten" | "typewriter" | "stamp" | "badge";
}

export interface JournalEntry {
    id: string;
    pageNumber: number;
    title: string;
    subtitle: string;
    date: string;
    location: string;
    category: "Travel" | "Architecture" | "Engineering" | "Reflections";
    themeColor: string;
    bgImage: string;
    filmStrip: Array<{ url: string; caption: string }>;
    photos: JournalPhoto[];
    notes: JournalNote[];
    stickers: string[];
    narrative: string[];
}

export const journalEntries: JournalEntry[] = [
    {
        id: "spain-historical-sites",
        pageNumber: 1,
        title: "Exploring Spain's Historical Sites",
        subtitle: "Like true adventurers across the Andalusian coast",
        date: "September 2024",
        location: "Málaga & Granada, Spain",
        category: "Travel",
        themeColor: "#38bdf8",
        bgImage:
            "https://images.unsplash.com/photo-1509840841025-9088ba78a826?q=80&w=1400&auto=format&fit=crop",
        filmStrip: [
            {
                url: "https://images.unsplash.com/photo-1583200405436-1e646271c778?q=80&w=600&auto=format&fit=crop",
                caption: "Castle approach",
            },
            {
                url: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?q=80&w=600&auto=format&fit=crop",
                caption: "Coastal overlook",
            },
            {
                url: "https://images.unsplash.com/photo-1562883676-8c7feb83f09b?q=80&w=600&auto=format&fit=crop",
                caption: "Old stone archway",
            },
        ],
        photos: [
            {
                id: "photo-1",
                url: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?q=80&w=800&auto=format&fit=crop",
                caption: "Alcazaba fortified walls",
                rotation: -3,
                aspect: "portrait",
                tapeColor: "rgba(255, 255, 255, 0.5)",
            },
            {
                id: "photo-2",
                url: "https://images.unsplash.com/photo-1509840841025-9088ba78a826?q=80&w=800&auto=format&fit=crop",
                caption: "Mediterranean sea horizon from the battlements",
                rotation: 4,
                aspect: "square",
                tapeColor: "rgba(56, 189, 248, 0.4)",
            },
        ],
        notes: [
            {
                id: "note-1",
                text: "Always check for local buses, or risk becoming the villain of your own vacation hike.",
                type: "handwritten",
                rotation: -2,
            },
            {
                id: "note-2",
                text: "Except one castle was my pick: cue a 3-hour hike in the blazing sun, with my entire family questioning my life choices — only to find out there was a direct shuttle.",
                type: "typewriter",
                rotation: 1,
            },
        ],
        stickers: ["TRAVEL TIP", "CASTLE EXPEDITION", "MEDITERRANEAN"],
        narrative: [
            "We started before sunrise to beat the Andalusian midday heat, ascending through winding limestone trails lined with olive trees and oleanders.",
            "Reaching the summit rewarded us with unbroken 360-degree vistas of the Mediterranean meeting the Moroccan coastline across the Alboran Sea.",
            "Despite the grueling uphill trek that sparked unanimous family debate over our itinerary planning, the afternoon light cutting through ancient Moorish battlements made every single step worthwhile.",
        ],
    },

    {
        id: "london-urban-geometry",
        pageNumber: 2,
        title: "London Urban Geometry",
        subtitle: "Monochrome brutalism & glass monoliths",
        date: "November 2024",
        location: "City of London & Barbican",
        category: "Architecture",
        themeColor: "#a78bfa",
        bgImage:
            "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1400&auto=format&fit=crop",
        filmStrip: [
            {
                url: "https://images.unsplash.com/photo-1529655683826-aba9b3e77383?q=80&w=600&auto=format&fit=crop",
                caption: "Barbican concrete towers",
            },
            {
                url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&auto=format&fit=crop",
                caption: "Leadenhall reflections",
            },
            {
                url: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=600&auto=format&fit=crop",
                caption: "Thames dusk skyline",
            },
        ],
        photos: [
            {
                id: "photo-lon-1",
                url: "https://images.unsplash.com/photo-1529655683826-aba9b3e77383?q=80&w=800&auto=format&fit=crop",
                caption: "Barbican lakeside walkway",
                rotation: 3,
                aspect: "portrait",
                tapeColor: "rgba(167, 139, 250, 0.4)",
            },
            {
                id: "photo-lon-2",
                url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
                caption: "Steel meets bush-hammered concrete",
                rotation: -3,
                aspect: "landscape",
                tapeColor: "rgba(255, 255, 255, 0.45)",
            },
        ],
        notes: [
            {
                id: "note-lon-1",
                text: "The Barbican was designed as a fortress of peace within the bustling City. If you get lost, that's by architectural design.",
                type: "handwritten",
                rotation: 2,
            },
            {
                id: "note-lon-2",
                text: "A study in contrasting eras: 1960s utopian concrete standing shoulder-to-shoulder with 2020s glass skyscrapers.",
                type: "typewriter",
                rotation: -1,
            },
        ],
        stickers: ["BRUTALISM", "LONDON", "GEOMETRY // 02"],
        narrative: [
            "Walking through the Barbican Estate on an overcast autumn Sunday reveals how textured bush-hammered concrete can feel sculptural rather than cold.",
            "Water fountains and elevated walkways insulate the residential estate from the roaring financial district just two streets away.",
            "Every angle presents geometric lines that echo modular computing architectures: standardized modules assembled into organic communities.",
        ],
    },

    {
        id: "alhambra-moorish-patterns",
        pageNumber: 3,
        title: "The Alhambra & Geometric Symmetry",
        subtitle: "Mathematical precision carved in gypsum and cedar",
        date: "October 2024",
        location: "Granada, Andalusia",
        category: "Architecture",
        themeColor: "#f59e0b",
        bgImage:
            "https://images.unsplash.com/photo-1568084680786-a84f91d1153c?q=80&w=1400&auto=format&fit=crop",
        filmStrip: [
            {
                url: "https://images.unsplash.com/photo-1568084680786-a84f91d1153c?q=80&w=600&auto=format&fit=crop",
                caption: "Court of the Lions",
            },
            {
                url: "https://images.unsplash.com/photo-1588614959060-4d144f28b207?q=80&w=600&auto=format&fit=crop",
                caption: "Nasrid tilework",
            },
            {
                url: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=600&auto=format&fit=crop",
                caption: "Water garden reflection",
            },
        ],
        photos: [
            {
                id: "photo-alh-1",
                url: "https://images.unsplash.com/photo-1568084680786-a84f91d1153c?q=80&w=800&auto=format&fit=crop",
                caption: "Intricate stalactite vaulting (Muqarnas)",
                rotation: -2,
                aspect: "portrait",
                tapeColor: "rgba(245, 158, 11, 0.4)",
            },
            {
                id: "photo-alh-2",
                url: "https://images.unsplash.com/photo-1588614959060-4d144f28b207?q=80&w=800&auto=format&fit=crop",
                caption: "Zellij tile tessellations",
                rotation: 3,
                aspect: "square",
                tapeColor: "rgba(255, 255, 255, 0.5)",
            },
        ],
        notes: [
            {
                id: "note-alh-1",
                text: "All 17 wallpaper symmetry groups known to modern mathematics are represented in the tiling of the Alhambra.",
                type: "handwritten",
                rotation: -2,
            },
            {
                id: "note-alh-2",
                text: "Water is not merely decorative here — it acts as an acoustic shield, cooling mechanism, and mirror of infinite geometry.",
                type: "typewriter",
                rotation: 2,
            },
        ],
        stickers: ["TESSELLATION", "ANDALUSIA", "14TH CENTURY"],
        narrative: [
            "Entering the Nasrid Palaces feels like stepping inside an intricate physical manifestation of algorithmic geometry.",
            "Centuries before modern group theory was formulated, Moorish artisans mastered repetitive symmetry across plane tiles, creating hypnotic infinite patterns.",
            "Sitting beside the central reflecting pool in the Court of the Myrtles, the quiet rippling water reflects cedar ceilings carved with thousands of individual interlocking stars.",
        ],
    },

    {
        id: "machine-cognition-notes",
        pageNumber: 4,
        title: "Engineering Journal: Autonomous Systems",
        subtitle: "Late night architectural blueprints & deterministic AI",
        date: "December 2024",
        location: "London AI Laboratory",
        category: "Engineering",
        themeColor: "#38bdf8",
        bgImage:
            "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1400&auto=format&fit=crop",
        filmStrip: [
            {
                url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop",
                caption: "Code architecture",
            },
            {
                url: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop",
                caption: "Hardware & low latency",
            },
            {
                url: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=600&auto=format&fit=crop",
                caption: "Terminal telemetry",
            },
        ],
        photos: [
            {
                id: "photo-ai-1",
                url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
                caption: "Vector retrieval pipeline debug logs",
                rotation: 2,
                aspect: "landscape",
                tapeColor: "rgba(56, 189, 248, 0.4)",
            },
            {
                id: "photo-ai-2",
                url: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop",
                caption: "Deterministic execution bounds",
                rotation: -3,
                aspect: "portrait",
                tapeColor: "rgba(255, 255, 255, 0.4)",
            },
        ],
        notes: [
            {
                id: "note-ai-1",
                text: "The greatest risk in enterprise AI is not lack of capability — it is the illusion of confidence without ground truth.",
                type: "handwritten",
                rotation: 1,
            },
            {
                id: "note-ai-2",
                text: "A well-engineered system does not promise magical infallibility; it enforces boundaries, verifies citations, and handles edge failure gracefully.",
                type: "typewriter",
                rotation: -2,
            },
        ],
        stickers: ["AI GOVERNANCE", "DETERMINISTIC", "LAB NOTES"],
        narrative: [
            "Spent the past three weeks refining the retrieval reranker for our financial regulatory assistant.",
            "The challenge was not finding candidate passages, but rejecting plausible-sounding near-matches that misstate statutory capital rules.",
            "By implementing strict source-attribution grounding, we proved that accuracy in AI systems is fundamentally an engineering and verification problem, not just model size.",
        ],
    },

    {
        id: "scottish-highlands-expedition",
        pageNumber: 5,
        title: "The Scottish Highlands & Skye",
        subtitle: "Lochs, volcanic ridges, and driving through the mist",
        date: "May 2024",
        location: "Isle of Skye & Glen Coe, Scotland",
        category: "Travel",
        themeColor: "#34d399",
        bgImage:
            "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=1400&auto=format&fit=crop",
        filmStrip: [
            {
                url: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=600&auto=format&fit=crop",
                caption: "Glen Coe pass",
            },
            {
                url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=600&auto=format&fit=crop",
                caption: "Quiraing ridges",
            },
            {
                url: "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=600&auto=format&fit=crop",
                caption: "Eilean Donan Castle",
            },
        ],
        photos: [
            {
                id: "photo-scot-1",
                url: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=800&auto=format&fit=crop",
                caption: "The dramatic cleft of Glen Coe in afternoon rain",
                rotation: -4,
                aspect: "portrait",
                tapeColor: "rgba(52, 211, 153, 0.4)",
            },
            {
                id: "photo-scot-2",
                url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800&auto=format&fit=crop",
                caption: "Quiraing volcanic escarpment",
                rotation: 3,
                aspect: "landscape",
                tapeColor: "rgba(255, 255, 255, 0.5)",
            },
        ],
        notes: [
            {
                id: "note-scot-1",
                text: "The weather changes four times in twenty minutes. Waterproof boots are not optional gear here.",
                type: "handwritten",
                rotation: -1,
            },
            {
                id: "note-scot-2",
                text: "Standing atop the Quiraing, the wind is strong enough to lean into. The earth feels older and raw here.",
                type: "typewriter",
                rotation: 2,
            },
        ],
        stickers: ["HIGHLANDS", "ROAD TRIP", "WILD SCOTLAND"],
        narrative: [
            "Drove 500 miles north across the Scottish border, winding through Loch Lomond before arriving at the haunting, monolithic peaks of Glen Coe.",
            "Crossed over the Skye Bridge just as the clouds parted to reveal the dramatic jagged peaks of the Black Cuillin mountain range.",
            "Nothing puts modern technical problems into perspective quite like sitting on ancient volcanic basalt overlooking the North Atlantic swell.",
        ],
    },

    {
        id: "barcelona-gaudi-structures",
        pageNumber: 6,
        title: "Gaudí & Nature's Structural Logic",
        subtitle: "Catenary arches, hyper-paraboloids and biomimicry",
        date: "July 2024",
        location: "Barcelona, Catalonia",
        category: "Architecture",
        themeColor: "#f43f5e",
        bgImage:
            "https://images.unsplash.com/photo-1583422409516-2895a77efded?q=80&w=1400&auto=format&fit=crop",
        filmStrip: [
            {
                url: "https://images.unsplash.com/photo-1583422409516-2895a77efded?q=80&w=600&auto=format&fit=crop",
                caption: "Sagrada Família columns",
            },
            {
                url: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=80&w=600&auto=format&fit=crop",
                caption: "Casa Batlló facade",
            },
            {
                url: "https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?q=80&w=600&auto=format&fit=crop",
                caption: "Park Güell mosaics",
            },
        ],
        photos: [
            {
                id: "photo-barc-1",
                url: "https://images.unsplash.com/photo-1583422409516-2895a77efded?q=80&w=800&auto=format&fit=crop",
                caption: "Forest of branched stone pillars distributing vault load",
                rotation: 2,
                aspect: "portrait",
                tapeColor: "rgba(244, 63, 94, 0.4)",
            },
            {
                id: "photo-barc-2",
                url: "https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?q=80&w=800&auto=format&fit=crop",
                caption: "Trencadís ceramic mosaic serpents",
                rotation: -3,
                aspect: "square",
                tapeColor: "rgba(255, 255, 255, 0.4)",
            },
        ],
        notes: [
            {
                id: "note-barc-1",
                text: "Gaudí inverted weighted chains to calculate pure compression arches without needing buttresses. Nature computes physics organically.",
                type: "handwritten",
                rotation: -2,
            },
            {
                id: "note-barc-2",
                text: "Light filters through stained glass from cool ocean blues on the east to fiery sunset oranges on the west, mimicking diurnal rhythms.",
                type: "typewriter",
                rotation: 1,
            },
        ],
        stickers: ["BIOMIMICRY", "GAUDÍ", "CATALONIA"],
        narrative: [
            "Stepping into the nave of the Sagrada Família does not feel like entering a stone basilica; it feels like walking into an enchanted stone forest.",
            "Gaudí's brilliance was rooted in understanding natural mathematics: tree branches, bone structures, and sea shells distribute mechanical stress far more efficiently than rectangular grids.",
            "In an age of generative design and neural topology optimization, Gaudí solved the exact same load-distribution equations with physical hanging strings and lead weights in 1898.",
        ],
    },
];
