# NivaanGrow website

A responsive, multi-page business website built with semantic HTML, CSS, and vanilla JavaScript. It has no build step, package installation, account system, or login/registration screens.

## Preview and publish

- Open `index.html` in a browser for a local preview. Navigation, responsive layouts, and portfolio filters work locally.
- The contact form uses Netlify Forms. Deploy the site to Netlify and confirm that the `business-inquiry` form appears under **Forms** in your Netlify site dashboard. The contact page is marked for Netlify Forms; local-file submissions remain disabled.
- To receive each inquiry by email, add `nivaangrowth@gmail.com` under **Site configuration → Notifications → Form submission notifications → Add notification → Email notification** in Netlify. Netlify also stores accepted submissions in the Forms dashboard. This notification must be enabled in the Netlify account; the project cannot configure account-level email notifications itself.
- The form submits multiple service selections, validates optional phone numbers (7–15 digits), and only displays success after Netlify returns an accepted response. On other hosting providers, configure an equivalent form backend before relying on submissions.
- WhatsApp links appear only after a real WhatsApp number is entered in `js/main.js`; no number is configured by default.
- A compact sun/moon theme toggle appears in the shared navigation. It switches between light and dark themes and remembers the visitor’s selection on that browser.
- Pricing is not finalized. Package names are enquiry prompts, not commitments; advertising spend is separate from agency fees unless a written agreement states otherwise.
- The uploaded logo image is `assets/images/nivaan-growth-logo-upload.png`, used by the shared header and footer. Replace this image while preserving its filename to update the logo site-wide. A local or unconfigured submission is explicitly reported as unavailable, never shown as successfully sent.
- The site can also be deployed as static files on any host. Configure an equivalent form endpoint before using the form on hosts other than Netlify.
- The original `Images/` directory is preserved. The site’s replaceable sample photos are in `assets/images/`.
- DM Sans and Manrope are loaded from Google Fonts. This external font request is noted in the privacy-policy starter; switch to local fonts or update the notice if your privacy requirements call for it.

## Pages

- `index.html` — homepage
- `about.html` — about and values
- `services.html` — service descriptions
- `pricing.html` — package options and custom-quote approach (prices and deliverables remain unconfigured)
- `process.html` — project process
- `portfolio.html` — illustrative concepts, category filters, and image preview
- `projects.html` — legacy portfolio URL; use `portfolio.html` for new links
- `contact.html` — inquiry form and contact placeholders
- `privacy-policy.html` and `terms.html` — legal starter templates; complete and review before publishing
- `404.html` — not-found page

## Add your real business details

1. In `js/main.js`, update the `business` object with your real email, display phone, international phone number, WhatsApp number, location, and confirmed social profile URLs. Leave values blank until they are correct.
2. Replace the sample photos in `assets/images/` with images you own or have permission to use. Keep the filenames, or update the image paths and alt text in the HTML pages.
3. Replace illustrative portfolio entries in `portfolio.html` with your approved work. Do not present the sample concepts as actual clients or results.
4. In `pricing.html`, replace the custom-quote wording and "to be agreed" values only after confirming actual prices and deliverables.
5. Complete every bracketed legal placeholder in the privacy and terms pages. Check that the text accurately describes your business, jurisdiction, form provider, and data practices; obtain suitable legal review.
6. Replace `YOUR-DOMAIN.example` in `robots.txt`, `sitemap.xml`, and page canonical links with your published domain.
7. Add your legal business name and any required address or registration information to the footer and legal pages.
8. Change the brand palette and typography using the CSS custom properties at the top of `style.css`; update service copy in `services.html` and package details in `pricing.html`.

## Main files

- `style.css`, `pages.css`, `responsive.css` — shared, page-specific, and responsive styles
- `js/main.js` — shared navigation, footer, and editable contact/social details
- `js/projects.js` — portfolio category filtering
- `js/contact.js` — inquiry form validation and Netlify submission feedback

There are no user accounts or authentication dependencies in this website.
