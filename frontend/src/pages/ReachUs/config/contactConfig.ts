/**
 * Contact Form Configuration
 *
 * To receive messages directly in your inbox without visitors opening an email app:
 * 1. Web3Forms (Free): Get a free access key at https://web3forms.com for your email
 *    and paste it in frontend/.env as VITE_WEB3FORMS_ACCESS_KEY=your_key_here
 *    OR
 * 2. Formspree (Free): Create a form at https://formspree.io and paste the form ID
 *    in frontend/.env as VITE_FORMSPREE_ID=your_form_id
 */

export const CONTACT_CONFIG = {
    recipientEmail: "vishwajeetjoshi6@gmail.com",
    web3FormsAccessKey:
        ((import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string) || "")
            .trim() || "c4216bb6-ff3a-49b3-9c15-361c804341d4",
    formspreeId:
        ((import.meta.env.VITE_FORMSPREE_ID as string) || "").trim(),
};
