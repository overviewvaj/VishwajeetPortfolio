import { useState } from "react";
import ScrollFrameLayout from "../../components/layout/ScrollFrameLayout";
import { CONTACT_CONFIG } from "./config/contactConfig";
import "./ReachUs.css";

interface FormData {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
}

const INITIAL_FORM: FormData = {
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
};

function ReachUs() {
    const [form, setForm] = useState<FormData>(INITIAL_FORM);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const [copied, setCopied] = useState<boolean>(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleCopyEmail = () => {
        navigator.clipboard.writeText(CONTACT_CONFIG.recipientEmail);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        // Strict mandatory field validation
        if (
            !form.name.trim() ||
            !form.email.trim() ||
            !form.subject.trim() ||
            !form.message.trim()
        ) {
            setError(
                "Please fill in all mandatory fields: Name, Email, Subject, and Message.",
            );
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(form.email.trim())) {
            setError("Please provide a valid email address.");
            return;
        }

        setIsSubmitting(true);

        // 1. If Formspree ID is configured
        if (CONTACT_CONFIG.formspreeId) {
            try {
                const res = await fetch(
                    `https://formspree.io/f/${CONTACT_CONFIG.formspreeId}`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                        },
                        body: JSON.stringify(form),
                    },
                );

                if (res.ok) {
                    setSubmitted(true);
                    setForm(INITIAL_FORM);
                    setIsSubmitting(false);
                    return;
                }
            } catch (err) {
                console.error("Formspree error:", err);
            }
        }

        // 2. If Web3Forms Access Key is configured
        if (CONTACT_CONFIG.web3FormsAccessKey) {
            try {
                const res = await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: JSON.stringify({
                        access_key: CONTACT_CONFIG.web3FormsAccessKey,
                        name: form.name.trim(),
                        email: form.email.trim(),
                        phone: form.phone.trim(),
                        subject: form.subject.trim(),
                        message: form.message.trim(),
                        from_name: "Portfolio ReachUs Form",
                    }),
                });

                const data = await res.json();
                if (data.success) {
                    setSubmitted(true);
                    setForm(INITIAL_FORM);
                    setIsSubmitting(false);
                    return;
                } else {
                    console.error("Web3Forms error response:", data);
                    setError(
                        data.message ||
                            "Unable to deliver message through the contact service. Please reach out directly below."
                    );
                    setIsSubmitting(false);
                    return;
                }
            } catch (err) {
                console.error("Web3Forms error:", err);
                setError(
                    "Network connection or ad-blocker prevented automatic submission. You can reach out directly below."
                );
                setIsSubmitting(false);
                return;
            }
        }

        // 3. Fallback to mailto when no API provider key is configured
        const mailtoSubject = encodeURIComponent(
            form.subject || `Inquiry from ${form.name || "Portfolio Visitor"}`,
        );
        const mailtoBody = encodeURIComponent(
            `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\n\nMessage:\n${form.message}`,
        );
        const mailtoUrl = `mailto:${CONTACT_CONFIG.recipientEmail}?subject=${mailtoSubject}&body=${mailtoBody}`;

        window.location.href = mailtoUrl;
        setSubmitted(true);
        setIsSubmitting(false);
    };

    return (
        <ScrollFrameLayout
            frameCount={300}
            framePath="/frames/ezgif-frame-{index}.jpg"
            scrollHeight="100%"
            lerp={0.09}
            className="reach-us-page"
            contentClassName="reach-us-page__content"
        >
            <main className="reach-us-container">
                {/* =====================================================
                    HEADER (MATCHING REFERENCE SCREENSHOT)
                ===================================================== */}
                <header className="reach-us-header">
                    <div className="reach-us-header__eyebrow">
                        CONNECT // COLLABORATE
                    </div>
                    <h1 className="reach-us-header__title">Get in touch!</h1>
                    <p className="reach-us-header__subtitle">
                        Have an engineering inquiry, advisory opportunity, or want to
                        discuss model risk governance, AI architectures, and
                        regulatory data pipelines? Connect directly or leave a note below.
                    </p>
                </header>

                {/* =====================================================
                    DIRECT CONNECT CHANNELS (LINKEDIN, GITHUB, MEDIUM)
                ===================================================== */}
                <section
                    className="reach-us-channels"
                    aria-label="Direct professional channels"
                >
                    {/* LinkedIn */}
                    <a
                        href="https://www.linkedin.com/in/vishwajeet--joshi/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="reach-us-channel-card reach-us-channel-card--linkedin"
                        title="Connect on LinkedIn"
                    >
                        <div className="reach-us-channel-card__top">
                            <div className="reach-us-channel-card__icon">
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                                </svg>
                            </div>
                            <span className="reach-us-channel-card__arrow">
                                ↗
                            </span>
                        </div>
                        <div>
                            <h3 className="reach-us-channel-card__platform">
                                LinkedIn
                            </h3>
                            <span className="reach-us-channel-card__handle">
                                in/vishwajeet--joshi
                            </span>
                        </div>
                    </a>

                    {/* GitHub */}
                    <a
                        href="https://github.com/overviewvaj"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="reach-us-channel-card reach-us-channel-card--github"
                        title="View GitHub Repositories"
                    >
                        <div className="reach-us-channel-card__top">
                            <div className="reach-us-channel-card__icon">
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
                                </svg>
                            </div>
                            <span className="reach-us-channel-card__arrow">
                                ↗
                            </span>
                        </div>
                        <div>
                            <h3 className="reach-us-channel-card__platform">
                                GitHub
                            </h3>
                            <span className="reach-us-channel-card__handle">
                                github.com/overviewvaj
                            </span>
                        </div>
                    </a>

                    {/* Medium */}
                    <a
                        href="https://medium.com/@vishwajeetjoshi6"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="reach-us-channel-card reach-us-channel-card--medium"
                        title="Read Medium Publications"
                    >
                        <div className="reach-us-channel-card__top">
                            <div className="reach-us-channel-card__icon">
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
                                </svg>
                            </div>
                            <span className="reach-us-channel-card__arrow">
                                ↗
                            </span>
                        </div>
                        <div>
                            <h3 className="reach-us-channel-card__platform">
                                Medium
                            </h3>
                            <span className="reach-us-channel-card__handle">
                                @vishwajeetjoshi6
                            </span>
                        </div>
                    </a>
                </section>

                {/* =====================================================
                    CONTACT FORM (MATCHING REFERENCE PATTERN)
                ===================================================== */}
                <div className="reach-us-form-card">
                    {submitted && (
                        <div className="reach-us-success-banner">
                            <h4>Message Dispatched</h4>
                            <p className="reach-us-banner-desc">
                                Thank you! Your inquiry has been sent directly to Vishwajeet ({CONTACT_CONFIG.recipientEmail}).
                                You will receive a response shortly.
                            </p>
                        </div>
                    )}

                    {error && (
                        <div className="reach-us-error-banner">
                            <h4>Submission Notice</h4>
                            <p className="reach-us-banner-desc">{error}</p>
                            <div className="reach-us-banner-actions">
                                <button
                                    type="button"
                                    className="reach-us-banner-btn"
                                    onClick={handleCopyEmail}
                                >
                                    {copied ? "✓ Copied Email" : `Copy ${CONTACT_CONFIG.recipientEmail}`}
                                </button>
                                <a
                                    href={`mailto:${CONTACT_CONFIG.recipientEmail}?subject=${encodeURIComponent(form.subject || "Portfolio Inquiry")}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\n\nMessage:\n${form.message}`)}`}
                                    className="reach-us-banner-btn reach-us-banner-btn--alt"
                                >
                                    Open Mail Client ↗
                                </a>
                            </div>
                        </div>
                    )}

                    <form
                        className="reach-us-form"
                        onSubmit={handleSubmit}
                    >
                        {/* 2-Column Row 1: Name & Email */}
                        <div className="reach-us-form__grid">
                            <div className="reach-us-field">
                                <label
                                    htmlFor="name"
                                    className="reach-us-label"
                                >
                                    Name
                                    <span
                                        className="reach-us-required"
                                        title="Mandatory"
                                    >
                                        *
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="reach-us-input"
                                    placeholder="John Carter"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                    disabled={isSubmitting}
                                />
                            </div>

                            <div className="reach-us-field">
                                <label
                                    htmlFor="email"
                                    className="reach-us-label"
                                >
                                    Email
                                    <span
                                        className="reach-us-required"
                                        title="Mandatory"
                                    >
                                        *
                                    </span>
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="reach-us-input"
                                    placeholder="example@youremail.com"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                    disabled={isSubmitting}
                                />
                            </div>
                        </div>

                        {/* 2-Column Row 2: Phone & Subject */}
                        <div className="reach-us-form__grid">
                            <div className="reach-us-field">
                                <label
                                    htmlFor="phone"
                                    className="reach-us-label"
                                >
                                    Phone
                                    <span className="reach-us-optional">
                                        (optional)
                                    </span>
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    className="reach-us-input"
                                    placeholder="(123) 345 - 6789"
                                    value={form.phone}
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                />
                            </div>

                            <div className="reach-us-field">
                                <label
                                    htmlFor="subject"
                                    className="reach-us-label"
                                >
                                    Subject
                                    <span
                                        className="reach-us-required"
                                        title="Mandatory"
                                    >
                                        *
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    className="reach-us-input"
                                    placeholder="ex. Model Risk Governance Discussion"
                                    value={form.subject}
                                    onChange={handleChange}
                                    required
                                    disabled={isSubmitting}
                                />
                            </div>
                        </div>

                        {/* Full Width Row 3: Message */}
                        <div className="reach-us-field">
                            <label
                                htmlFor="message"
                                className="reach-us-label"
                            >
                                Message
                                <span
                                    className="reach-us-required"
                                    title="Mandatory"
                                >
                                    *
                                </span>
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                className="reach-us-textarea"
                                placeholder="Please type your message here..."
                                value={form.message}
                                onChange={handleChange}
                                rows={5}
                                required
                                disabled={isSubmitting}
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="reach-us-submit-btn"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Sending message..." : "Send message"}
                        </button>
                    </form>
                </div>
            </main>
        </ScrollFrameLayout>
    );
}

export default ReachUs;
