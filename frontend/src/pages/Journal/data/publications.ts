export type PublicationPlatform = "medium" | "linkedin";

export interface Publication {
    id: string;
    title: string;
    platform: PublicationPlatform;
    link: string;
    pubDate: string;
    formattedDate: string;
    readTime: string;
    author: string;
    categories: string[];
    excerpt: string;
    heroImage: string;
    keyQuote: string;
    points: string[];
}

export const BASELINE_PUBLICATIONS: Publication[] = [
    // -------------------------------------------------------------
    // MEDIUM ARTICLES (Also monitored live via RSS)
    // -------------------------------------------------------------
    {
        id: "medium-zero-knowledge-aml",
        title: "Zero-Knowledge Data Sharing: Training AML Models Across Competitors",
        platform: "medium",
        link: "https://medium.com/@vishwajeetjoshi6/zero-knowledge-data-sharing-training-aml-models-across-competitors-13068de0ecf6",
        pubDate: "2026-08-25T07:27:07Z",
        formattedDate: "August 25, 2026",
        readTime: "8 min read",
        author: "Vishwajeet Joshi",
        categories: ["Machine Learning", "Anti-Money Laundering", "Generative AI", "Fintech"],
        excerpt:
            "Evaluating conditional diffusion models and (ε, δ)-differential privacy for centralized fraud detection on siloed banking data without moving a single PII field.",
        heroImage:
            "https://cdn-images-1.medium.com/max/1024/1*ftXCi2zBeBJh1kh81imi1Q.jpeg",
        keyQuote:
            "It’s closer to: knowledge of the pattern, provable ignorance of the person.",
        points: [
            "Why raw PII pooling across competitor banks violates GDPR, PATRIOT Act §314(b), and PRA SS1/23.",
            "Conditional tabular diffusion (TabDDPM) modeling rare SAR-confirmed fraud topologies without mode collapse.",
            "DP-SGD encoder architecture bounding privacy loss under formal (ε, δ)-differential privacy guarantees.",
        ],
    },
    {
        id: "medium-pure-llms-banking-audits",
        title: "Why Pure LLMs Fail Banking Audits: Combining Knowledge Graphs with Constraint Logic",
        platform: "medium",
        link: "https://medium.com/@vishwajeetjoshi6/why-pure-llms-fail-banking-audits-combining-knowledge-graphs-with-constraint-logic-c42b2158ec6e",
        pubDate: "2026-08-23T04:01:01Z",
        formattedDate: "August 23, 2026",
        readTime: "9 min read",
        author: "Vishwajeet Joshi",
        categories: ["Fintech", "Banking", "RegTech", "Artificial Intelligence"],
        excerpt:
            "How neuro-symbolic AI — pairing language models with knowledge graphs and Prolog/Datalog rule engines — solves the explainability problem colliding with Basel 3.1 and Consumer Duty.",
        heroImage:
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
        keyQuote:
            "The goal was never to make the LLM more trustworthy. It’s to stop asking a probabilistic model to be the thing that has to be trusted for a deterministic number in the first place.",
        points: [
            "Basel 3.1 (PS1/26) and Consumer Duty mandate reconstructable chains of reasoning, not just statistical outputs.",
            "FinVerBench benchmarks reveal LLM accuracy drops from 95.6% to near zero on multivariate capital calculations.",
            "Splitting tasks: LLMs for extraction, knowledge graphs for entity relationships, and Prolog/Datalog for deterministic resolution.",
        ],
    },
    {
        id: "medium-enterprise-ai-agents-2026",
        title: "What Is Enterprise AI Agents? A Complete Guide for 2026",
        platform: "medium",
        link: "https://medium.com/@vishwajeetjoshi6/what-is-enterprise-ai-agents-a-complete-guide-for-2026-99ae0ef6c691",
        pubDate: "2026-08-22T04:31:03Z",
        formattedDate: "August 22, 2026",
        readTime: "7 min read",
        author: "Vishwajeet Joshi",
        categories: ["Generative AI", "Enterprise AI", "Automation", "Architecture"],
        excerpt:
            "Two years ago, 'AI agent' was a research term. In 2026, it’s a line item in the software budget. A working definition, the mechanics of how these systems operate, and where they create verified ROI.",
        heroImage:
            "https://cdn-images-1.medium.com/max/1024/1*YUx4JFltxYrYg3PS2vKsHw.jpeg",
        keyQuote:
            "An agent without guardrails isn’t more capable, it’s just less predictable.",
        points: [
            "Moving from checklist automation to outcome delegation across APIs and data pipelines.",
            "The five core agentic pillars: goal-directed planning, tool use, memory/context, self-correction, and bounded autonomy.",
            "Real-world enterprise adoption curves led by banking & insurance (47% deployment) and engineering.",
        ],
    },
    {
        id: "medium-what-is-agentic-ai",
        title: "What Is Agentic AI? A Practical Explainer for Business Teams",
        platform: "medium",
        link: "https://medium.com/@vishwajeetjoshi6/what-is-agentic-ai-a-practical-explainer-for-business-teams-49dcf9ff86f1",
        pubDate: "2026-08-15T17:58:41Z",
        formattedDate: "August 15, 2026",
        readTime: "6 min read",
        author: "Vishwajeet Joshi",
        categories: ["AI in Business", "Agentic AI", "Generative AI"],
        excerpt:
            "A clear-eyed look at what agentic AI is, how it’s different from chatbots, and what it means for how organizations responsibly delegate multi-step work.",
        heroImage:
            "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
        keyQuote:
            "The right question isn't 'should we use agentic AI?' but 'how much autonomy makes sense for this specific task, and what guardrails manage the risk?'",
        points: [
            "Why agentic systems plan, act, and adapt rather than waiting for discrete prompt turns.",
            "Autonomy as a spectrum: low (single-turn), moderate (checkpointed), and high (bounded end-to-end).",
            "A 7-point practical evaluation checklist for leadership deciding when to grant autonomy.",
        ],
    },
    {
        id: "medium-ai-agents-vs-assistants",
        title: "AI Agents vs AI Assistants: What’s the Difference (and Why it Matters)",
        platform: "medium",
        link: "https://medium.com/@vishwajeetjoshi6/ai-agents-vs-ai-assistants-whats-the-difference-and-why-it-matters-375d70d2efeb",
        pubDate: "2026-08-05T10:07:53Z",
        formattedDate: "August 5, 2026",
        readTime: "5 min read",
        author: "Vishwajeet Joshi",
        categories: ["AI Agents", "Data Analytics", "Systems"],
        excerpt:
            "The core distinction between responding and acting, why autonomy alters the risk profile, and how delegating process requires a fundamentally different trust architecture.",
        heroImage:
            "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop",
        keyQuote:
            "Assistant = a single request, a single response. Agent = a goal, a plan, and a sequence of independent actions taken to reach it.",
        points: [
            "Responding vs. acting: why assistants require continuous human steering while agents pursue objectives.",
            "Compounding error risks: why autonomous systems demand explicit permission scopes and checkpoints.",
            "Systems architecture: agents require stateful memory, tool-calling interfaces, and dynamic replanning.",
        ],
    },

    // -------------------------------------------------------------
    // LINKEDIN ARTICLES (LinkedIn Pulse & Newsletters)
    // -------------------------------------------------------------
    {
        id: "linkedin-second-line-defence",
        title: "The Second Line of Defence: Why Model Risk Governance Is the Next Frontier in Prudential Product Management",
        platform: "linkedin",
        link: "https://www.linkedin.com/pulse/second-line-defence-why-model-risk-governance-next-frontier-joshi-5qb5f/",
        pubDate: "2026-07-20T09:00:00Z",
        formattedDate: "July 2026",
        readTime: "7 min read",
        author: "Vishwajeet Joshi",
        categories: ["RegTech", "AI Governance", "Risk Management", "Banking"],
        excerpt:
            "The UK financial sector is rapidly adopting sophisticated AI/ML models for everything from fraud detection and customer scoring to internal Capital Calculation (RWA). Why PRA SS1/23 elevates model risk to board accountability.",
        heroImage:
            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
        keyQuote:
            "Model risk is no longer just a quant validation check — it is a foundational pillar of prudential risk and board accountability under SS1/23.",
        points: [
            "Supervisory shift under PRA SS1/23 requiring explicit 2nd-line model challenge and inventory tracking.",
            "Managing emergent operational risk as machine learning enters internal ratings-based (IRB) capital frameworks.",
            "Why explainability and provenance must be architectural primitives rather than retrofitted documentation.",
        ],
    },
    {
        id: "linkedin-beyond-the-ratio",
        title: "Beyond the Ratio: The Strategic Imperative of Prudential Data Automation",
        platform: "linkedin",
        link: "https://www.linkedin.com/pulse/beyond-ratio-strategic-imperative-prudential-data-automation-joshi-mcz1e/",
        pubDate: "2026-06-15T09:00:00Z",
        formattedDate: "June 2026",
        readTime: "6 min read",
        author: "Vishwajeet Joshi",
        categories: ["Prudential Regulation", "Data Architecture", "Fintech"],
        excerpt:
            "In the UK regulatory landscape, compliance maturity is no longer measured solely by achieving the 'right' LCR, NSFR or COREP ratios. Today, the PRA and FCA expect end-to-end data integrity and defensible submission processes.",
        heroImage:
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
        keyQuote:
            "A defensible regulatory submission is not just the ratio output — it is proof of data lineage, automated validation gates, and auditable transformations.",
        points: [
            "Transitioning from spreadsheet reconciliations to deterministic, automated data lakehouse pipelines.",
            "Meeting regulatory expectations for BCBS 239 risk data aggregation and reporting.",
            "How automated validation controls reduce reporting turnaround cycles from days to minutes.",
        ],
    },
    {
        id: "linkedin-cloud-solutions",
        title: "Choosing the Right Cloud Solution: IaaS vs. PaaS vs. SaaS",
        platform: "linkedin",
        link: "https://www.linkedin.com/pulse/choosing-right-cloud-solution-iaas-vs-paas-saas-vishwajeet-joshi-izupc/",
        pubDate: "2026-05-10T09:00:00Z",
        formattedDate: "May 2026",
        readTime: "5 min read",
        author: "Vishwajeet Joshi",
        categories: ["Cloud Architecture", "Enterprise Engineering", "Systems"],
        excerpt:
            "As businesses scale and modernize, selecting the right cloud model becomes a pivotal decision influencing efficiency, security compliance, operational cost management, and long-term architectural agility.",
        heroImage:
            "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
        keyQuote:
            "Architectural choice isn't just about hosting — it dictates operational overhead, regulatory boundary controls, and scaling velocity.",
        points: [
            "Evaluating shared responsibility models across financial data sovereignty constraints.",
            "Balancing developer velocity with regulatory oversight and vendor lock-in risk.",
            "Pragmatic decision matrices for financial services transitioning legacy infrastructure to hybrid cloud.",
        ],
    },
    {
        id: "linkedin-automating-regulatory-reporting",
        title: "Automating Regulatory Reporting: A Financial Sector Case Study",
        platform: "linkedin",
        link: "https://www.linkedin.com/pulse/automating-regulatory-reporting-financial-sector-case-joshi-ggpve/",
        pubDate: "2026-04-12T09:00:00Z",
        formattedDate: "April 2026",
        readTime: "6 min read",
        author: "Vishwajeet Joshi",
        categories: ["Regulatory Reporting", "Automation", "Fintech"],
        excerpt:
            "In the highly regulated financial sector, timely and accurate regulatory reporting is critical. How replacing manual spreadsheets with automated reconciliation pipelines eliminates systemic compliance risk.",
        heroImage:
            "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop",
        keyQuote:
            "Spreadsheet-based regulatory reporting is a ticking operational risk. Automated reconciliation guarantees data repeatability and traceability.",
        points: [
            "Real-world risks of human intervention and manual transcription errors in capital reporting.",
            "Designing automated validation rules, variance anomaly checks, and audit trails.",
            "Demonstrated reduction in submission lead time and elimination of regulatory audit non-conformances.",
        ],
    },
    {
        id: "linkedin-speed-vs-accuracy",
        title: "Balancing Speed and Accuracy in Data Analysis: A Strategic Imperative",
        platform: "linkedin",
        link: "https://www.linkedin.com/pulse/balancing-speed-accuracy-data-analysis-strategic-imperative-joshi-9dqke/",
        pubDate: "2026-03-08T09:00:00Z",
        formattedDate: "March 2026",
        readTime: "5 min read",
        author: "Vishwajeet Joshi",
        categories: ["Data Engineering", "Strategy", "Analytics"],
        excerpt:
            "In today's fast-paced, data-centric environment, finding the right balance between speed and accuracy is crucial. While rapid insights offer competitive edge, rushing analysis often leads to costly strategic miscalculations.",
        heroImage:
            "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
        keyQuote:
            "Speed without verifiable accuracy produces confident hallucinations; accuracy without velocity creates stale intelligence.",
        points: [
            "Architecting layered data quality gates to support fast exploratory analytics without contaminating core models.",
            "Automated sanity-check heuristics for high-throughput streaming and batch telemetry.",
            "Frameworks for decision-makers to quantify trade-offs between decision latency and confidence intervals.",
        ],
    },
];

/**
 * Strips HTML tags and extracts plain text summary.
 */
function cleanHtmlSnippet(html: string, maxLen = 190): string {
    const text = html.replace(/<[^>]*>?/gm, " ").replace(/\s+/g, " ").trim();
    if (text.length <= maxLen) return text;
    return text.slice(0, maxLen).trim() + "…";
}

/**
 * Extracts first image URL from HTML content if available.
 */
function extractFirstImage(html: string): string | null {
    const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
    return match ? match[1] : null;
}

/**
 * Formats date to "Month Day, Year"
 */
function formatDate(dateStr: string): string {
    try {
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) return dateStr;
        return date.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
        });
    } catch {
        return dateStr;
    }
}

/**
 * Fetches published Medium articles for @vishwajeetjoshi6 via RSS-to-JSON
 * and merges them seamlessly with both Medium and LinkedIn baseline publications.
 */
export async function fetchAllPublications(): Promise<{
    publications: Publication[];
    isMediumLive: boolean;
}> {
    const MEDIUM_FEED_URL = "https://medium.com/feed/@vishwajeetjoshi6";
    const PRIMARY_API = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(MEDIUM_FEED_URL)}`;
    const BACKUP_API = `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(MEDIUM_FEED_URL)}`)}`;

    let fetchedItems: any[] = [];
    let isMediumLive = false;

    try {
        const res = await fetch(PRIMARY_API, { cache: "no-cache" });
        if (res.ok) {
            const data = await res.json();
            if (data.status === "ok" && Array.isArray(data.items)) {
                fetchedItems = data.items;
                isMediumLive = true;
            }
        }
    } catch {
        try {
            const resBackup = await fetch(BACKUP_API);
            if (resBackup.ok) {
                const data = await resBackup.json();
                if (data.status === "ok" && Array.isArray(data.items)) {
                    fetchedItems = data.items;
                    isMediumLive = true;
                }
            }
        } catch {
            // Silently fallback to baseline
        }
    }

    // Merge strategy: Map by link to prevent duplicates
    const publicationMap = new Map<string, Publication>();

    // 1. Add all baseline publications (Medium + LinkedIn)
    for (const pub of BASELINE_PUBLICATIONS) {
        publicationMap.set(pub.link.split("?")[0], pub);
    }

    // 2. Parse and merge any new live items from Medium
    if (fetchedItems.length > 0) {
        for (const item of fetchedItems) {
            const link: string = item.link || item.guid || "";
            if (!link) continue;
            const cleanLink = link.split("?")[0];
            const existing = publicationMap.get(cleanLink);

            if (existing) {
                // Update pubDate if newer
                publicationMap.set(cleanLink, {
                    ...existing,
                    pubDate: item.pubDate || existing.pubDate,
                });
            } else {
                // Brand new article published on Medium!
                const title: string = item.title || "Untitled Article";
                const content: string = item.content || item.description || "";
                const heroImage: string =
                    item.thumbnail ||
                    extractFirstImage(content) ||
                    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop";

                const rawExcerpt = cleanHtmlSnippet(content);
                const categories: string[] = Array.isArray(item.categories) && item.categories.length > 0
                    ? item.categories.map((c: string) => c.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()))
                    : ["Artificial Intelligence", "Technology"];

                const wordCount = content.replace(/<[^>]*>/g, "").split(/\s+/).length;
                const readTime = `${Math.max(3, Math.ceil(wordCount / 200))} min read`;

                publicationMap.set(cleanLink, {
                    id: cleanLink.split("/").pop() || String(Math.random()),
                    title,
                    platform: "medium",
                    link,
                    pubDate: item.pubDate || new Date().toISOString(),
                    formattedDate: formatDate(item.pubDate || new Date().toISOString()),
                    readTime,
                    author: item.author || "Vishwajeet Joshi",
                    categories,
                    excerpt: rawExcerpt,
                    heroImage,
                    keyQuote: `Key thesis from "${title}" published on Medium.`,
                    points: [
                        "Full published article available directly on Medium.",
                        "Explores architectures, technical trade-offs, and production engineering practices.",
                        "Click 'Read on Medium' to view the complete publication.",
                    ],
                });
            }
        }
    }

    // Sort descending by date
    const combined = Array.from(publicationMap.values()).sort(
        (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime(),
    );

    return {
        publications: combined,
        isMediumLive,
    };
}
