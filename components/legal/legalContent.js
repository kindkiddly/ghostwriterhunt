/**
 * GhostWriterHunt — Legal document content
 * Semantic HTML with class hooks styled in LegalDocumentPage.js
 */

import {
  BUSINESS_ADDRESS,
  BUSINESS_OWNER,
  BUSINESS_PHONE_DISPLAY_LABELED,
  BUSINESS_PHONE_TEL,
} from "@/lib/siteAddress";

const CONTACT_SECTION = `
<div class="legal-contact-section">
  <h2 class="legal-contact-heading">Contact</h2>
  <p class="legal-contact-intro">Questions about these policies or your project? Reach the GhostWriterHunt team directly.</p>
  <div class="legal-contact-grid">
    <div class="legal-contact-card">
      <p class="legal-contact-label">New Projects</p>
      <a href="mailto:ghostwriterhunt@lumexforge.com" class="legal-contact-email">ghostwriterhunt@lumexforge.com</a>
      <p class="legal-contact-note">New projects &amp; consultations</p>
    </div>
    <div class="legal-contact-card">
      <p class="legal-contact-label">Client Support</p>
      <a href="mailto:support.gwh@lumexforge.com" class="legal-contact-email">support.gwh@lumexforge.com</a>
      <p class="legal-contact-note">Client support &amp; project help</p>
    </div>
    <div class="legal-contact-card">
      <p class="legal-contact-label">Phone</p>
      <a href="${BUSINESS_PHONE_TEL}" class="legal-contact-email">${BUSINESS_PHONE_DISPLAY_LABELED}</a>
      <p class="legal-contact-note">Customer support line</p>
    </div>
  </div>
  <p class="legal-contact-location">GhostWriterHunt · Owner: ${BUSINESS_OWNER} · ${BUSINESS_ADDRESS}</p>
</div>
`;

export const legalContent = {
  privacy: {
    title: "Privacy Policy",
    lastUpdated: "October 2026",
    content: `
<h2>Introduction</h2>
<p>This Privacy Policy explains how GhostWriterHunt collects, uses, shares and protects the information you provide when you visit ghostwriterhunt.lumexforge.com or use GhostWriterHunt's ghostwriting and publishing services. Please read it carefully. If you do not agree with this policy, please do not use the website.</p>
<p>GhostWriterHunt is owned and operated by ${BUSINESS_OWNER} as a sole proprietor. The website is hosted and available at ghostwriterhunt.lumexforge.com. Use of that domain address does not mean that any other company owns or operates GhostWriterHunt.</p>
<hr />
<h2>Information GhostWriterHunt Collects</h2>
<h3>Information You Provide Directly</h3>
<p>GhostWriterHunt collects information you voluntarily provide when you:</p>
<ul>
  <li>Submit a consultation request or contact form</li>
  <li>Purchase or inquire about services</li>
  <li>Communicate with the team via email or phone</li>
  <li>Subscribe to the newsletter</li>
</ul>
<p>This information may include your name, email address, phone number, book project details and any other information you choose to provide.</p>
<h3>Information Collected Automatically</h3>
<p>When you visit the website, certain information about your device and browsing behavior is collected automatically, including:</p>
<ul>
  <li>IP address and browser type</li>
  <li>Pages visited and time spent on each page</li>
  <li>Referring website addresses</li>
  <li>Device type and operating system</li>
</ul>
<hr />
<h2>How GhostWriterHunt Uses Your Information</h2>
<p>Information collected through contact, inquiry and project forms is used to:</p>
<ul>
  <li>Respond to consultation requests and service inquiries</li>
  <li>Provide quotes and information about requested services</li>
  <li>Communicate with you about book projects, timelines and deliverables</li>
  <li>Process payments and deliver ghostwriting, editing, design and publishing services</li>
  <li>Send project-related calls or text messages when you have separately opted in</li>
  <li>Send other marketing communications only when you have given consent</li>
  <li>Operate, secure and improve the website</li>
  <li>Comply with legal obligations</li>
</ul>
<p>Service providers may process information when necessary to host the website, operate payment systems, deliver communications and support other business operations. They are expected to handle information only as needed to provide those services and subject to applicable requirements.</p>
<hr />
<h2>SMS Communications</h2>
<p>Customers who voluntarily provide their phone number and separately opt in through a GhostWriterHunt form may receive text messages related to their submitted inquiries, requested service information, quotes, consultation scheduling, and related project communications, consistent with the consent provided.</p>
<p>Providing a phone number alone does not constitute consent to receive text messages. SMS consent is optional and is not a condition of purchasing services. Message frequency varies. Message and data rates may apply. Reply STOP to opt out or HELP for assistance.</p>
<p>You may also contact GhostWriterHunt at <a href="mailto:ghostwriterhunt@lumexforge.com">ghostwriterhunt@lumexforge.com</a> or <a href="mailto:support.gwh@lumexforge.com">support.gwh@lumexforge.com</a> about SMS preferences, opt-out requests or privacy questions.</p>
<hr />
<h2>Mobile Information and SMS Consent</h2>
<p>Mobile phone numbers collected through our SMS opt-in process and SMS consent records will not be sold, rented, shared, or disclosed to third parties or affiliates for their marketing or promotional purposes. Service providers may process information as necessary to deliver and support requested communications, subject to applicable requirements. Such providers may not use this information for their own marketing.</p>
<hr />
<h2>Information Sharing</h2>
<p>GhostWriterHunt does not sell, trade or rent your personal information to third parties for their marketing. Information may be shared in the following circumstances:</p>
<ul>
  <li>With service providers who assist in operating the website, processing payments, delivering communications and providing services</li>
  <li>When required by law, regulation or legal process, or to protect legal rights and safety</li>
  <li>In connection with necessary business operations, such as professional advisers, subject to confidentiality obligations</li>
  <li>With your explicit consent</li>
</ul>
<hr />
<h2>NDA and Confidentiality</h2>
<p>All client projects are protected by a Non-Disclosure Agreement (NDA). Your book ideas, manuscript content, personal story and project details are confidential and will not be disclosed to third parties under any circumstances.</p>
<hr />
<h2>Data Security</h2>
<p>GhostWriterHunt uses appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure or destruction. All data is transmitted using SSL encryption.</p>
<hr />
<h2>Your Rights</h2>
<p>You have the right to:</p>
<ul>
  <li>Access the personal information GhostWriterHunt holds about you</li>
  <li>Request correction of inaccurate data</li>
  <li>Request deletion of your personal data</li>
  <li>Opt out of marketing communications at any time</li>
  <li>Withdraw consent for SMS communications</li>
</ul>
<hr />
<h2>Cookies</h2>
<p>The website uses cookies to enhance your browsing experience. Please see the <a href="/cookie-policy">Cookie Policy</a> for full details.</p>
<hr />
${CONTACT_SECTION}
`,
  },

  terms: {
    title: "Terms & Conditions",
    lastUpdated: "October 2026",
    content: `
<h2>1. Agreement</h2>
<p>By using this website or placing an order with GhostWriterHunt, you agree to these Terms &amp; Conditions. If you do not agree, please do not use the website or services. You must be of legal age in your location to purchase services.</p>
<h2>2. Definitions</h2>
<p><strong>Website</strong> means all pages and content at ghostwriterhunt.lumexforge.com.</p>
<p><strong>Client, you, your</strong> means the person placing an order, or anyone ordering on their behalf.</p>
<p><strong>Company</strong> means GhostWriterHunt, a book-writing, editing, formatting, and publishing service owned and operated by ${BUSINESS_OWNER} as a sole proprietor, located in ${BUSINESS_ADDRESS}. The website is available at ghostwriterhunt.lumexforge.com.</p>
<p><strong>Services</strong> means ghostwriting, ebook writing, manuscript editing, proofreading, formatting, cover design, publishing assistance, book marketing and related author services GhostWriterHunt provides.</p>
<p><strong>Order</strong> means any purchase of services, confirmed by payment through secure checkout or a payment link GhostWriterHunt sends you.</p>
<h2>3. Services</h2>
<p>Each order is for your personal or business use. The scope, deliverables and timeline of your project are confirmed in your package details or your custom project plan.</p>
<p>Professional software and digital tools are used in research, drafting and production. All work is directed, reviewed and finalized by the GhostWriterHunt team.</p>
<h2>4. Ownership and Confidentiality</h2>
<p>Once your order is paid in full, you own 100% of the rights to the final work. All projects are covered by a confidentiality commitment. GhostWriterHunt does not share your work or identity with anyone.</p>
<h2>5. Revisions</h2>
<p>Revisions are included as described in your package. Professional and Complete Publishing packages include unlimited revisions. Revision requests must match the original project requirements.</p>
<h2>6. Payments</h2>
<p>All prices are shown in US dollars. Orders are confirmed by payment through secure checkout or a payment link GhostWriterHunt sends you. Custom project amounts are agreed after consultation.</p>
<h2>7. Refunds and Cancellations</h2>
<p>Refunds and cancellations are handled according to the <a href="/refund-policy">Refund Policy</a>.</p>
<h2>8. Timelines and Client Cooperation</h2>
<p>Project timelines depend on the package and on timely feedback and materials from you. Delays in client feedback may extend delivery dates.</p>
<h2>9. Text Messages (SMS)</h2>
<p>GhostWriterHunt sends SMS text messages only to individuals who have separately and expressly opted in through the optional SMS consent checkbox on a GhostWriterHunt form. Messages relate to the recipient's inquiry, requested service details, quotes, consultation scheduling, or related project communications.</p>
<p>Providing a phone number alone is not consent to receive text messages. Consent is not required to purchase services. Message frequency varies. Message and data rates may apply. Reply STOP to opt out and HELP for assistance.</p>
<p>The <a href="/privacy-policy">Privacy Policy</a> governs how GhostWriterHunt handles personal information and SMS consent records. Questions: <a href="mailto:ghostwriterhunt@lumexforge.com">ghostwriterhunt@lumexforge.com</a>, <a href="mailto:support.gwh@lumexforge.com">support.gwh@lumexforge.com</a>, or <a href="${BUSINESS_PHONE_TEL}">${BUSINESS_PHONE_DISPLAY_LABELED}</a>.</p>
<h2>10. Website Content</h2>
<p>The GhostWriterHunt name, logo, website design and content belong to GhostWriterHunt and may not be used without written permission.</p>
<h2>11. Limitation of Liability</h2>
<p>To the maximum extent permitted by law, GhostWriterHunt is not liable for indirect, incidental or consequential damages. Total liability for any claim is limited to the amount you paid for the specific order.</p>
<h2>12. Changes to These Terms</h2>
<p>These Terms may be updated from time to time. The &quot;Last updated&quot; date shows the latest version.</p>
<h2>13. Governing Law</h2>
<p>These Terms are governed by the laws of the State of Texas, USA. Disputes will be resolved in the state or federal courts located in Fort Bend County, Texas.</p>
<h2>14. Contact</h2>
<p><a href="mailto:ghostwriterhunt@lumexforge.com">ghostwriterhunt@lumexforge.com</a> (new projects), <a href="mailto:support.gwh@lumexforge.com">support.gwh@lumexforge.com</a> (client support), <a href="${BUSINESS_PHONE_TEL}">${BUSINESS_PHONE_DISPLAY_LABELED}</a>, GhostWriterHunt (${BUSINESS_OWNER}), ${BUSINESS_ADDRESS}.</p>
<hr />
${CONTACT_SECTION}
`,
  },

  refund: {
    title: "Refund Policy",
    lastUpdated: "",
    content: `
<p>Please read this policy carefully before placing an order.</p>
<h2>Change of Mind</h2>
<p>You may cancel and receive a full refund within 1 hour of placing your order. After that, a 40% processing fee applies to any approved refund.</p>
<h2>Delivery Not Meeting Requirements</h2>
<p>If your delivered work does not meet the requirements you documented, GhostWriterHunt will first:</p>
<ol>
  <li>Revise and, if needed, reassign or rewrite the work until it meets your requirements.</li>
  <li>Offer a credit of equal value toward future services, usable at any time.</li>
</ol>
<p>If GhostWriterHunt still cannot deliver what was agreed, and the work clearly does not meet the documented requirements, a partial refund will be agreed with you.</p>
<h2>Late Delivery</h2>
<p>If an agreed deadline is missed through GhostWriterHunt's fault, and you have contacted the team at least three times without resolution, you may request a refund. The delay must be confirmed with written records.</p>
<h2>Refund Time Frame</h2>
<p>Refund requests must be made within 30 days of delivery. Requests after this period cannot be accepted.</p>
<h2>When Refunds Are Not Issued</h2>
<ol>
  <li>Minor issues such as small typing or grammar errors, which GhostWriterHunt corrects free of charge.</li>
  <li>Delays caused by late feedback, approvals or materials from the client.</li>
  <li>Personal preference about writing style, when the work meets the agreed requirements.</li>
</ol>
<h2>Payment Disputes</h2>
<p>Please contact GhostWriterHunt before opening a dispute with your bank. Most concerns are resolved quickly and directly.</p>
${CONTACT_SECTION}
`,
  },

  cookies: {
    title: "Cookie Policy",
    lastUpdated: "September 2026",
    content: `
<h2>What Are Cookies</h2>
<p>Cookies are small text files stored on your device when you visit a website. They help websites remember your preferences and improve your browsing experience.</p>
<hr />
<h2>How GhostWriterHunt Uses Cookies</h2>
<p>GhostWriterHunt uses cookies for the following purposes:</p>
<h3>Essential Cookies</h3>
<p>These cookies are necessary for the website to function properly. They enable core features such as:</p>
<ul>
  <li>Page navigation and access to secure areas</li>
  <li>Form submission functionality</li>
  <li>Session management</li>
</ul>
<p>These cookies cannot be disabled as they are essential to the operation of the website.</p>
<h3>Analytics Cookies</h3>
<p>Analytics cookies help GhostWriterHunt understand how visitors interact with the website. This helps:</p>
<ul>
  <li>Improve website content and structure</li>
  <li>Identify popular pages and content</li>
  <li>Understand visitor behavior patterns</li>
</ul>
<p>Analytics data is anonymized and does not identify individual users.</p>
<h3>Marketing Cookies</h3>
<p>With your consent, marketing cookies may be used to:</p>
<ul>
  <li>Show you relevant content about services</li>
  <li>Measure the effectiveness of marketing campaigns</li>
  <li>Personalize your experience based on your interests</li>
</ul>
<hr />
<h2>Managing Cookies</h2>
<p>You can control cookies through your browser settings:</p>
<ul>
  <li><strong>Chrome:</strong> Settings → Privacy and Security → Cookies</li>
  <li><strong>Firefox:</strong> Options → Privacy and Security → Cookies</li>
  <li><strong>Safari:</strong> Preferences → Privacy → Cookies</li>
  <li><strong>Edge:</strong> Settings → Cookies and Site Permissions</li>
</ul>
<p>Please note that disabling certain cookies may affect the functionality of the website.</p>
<hr />
<h2>Third Party Cookies</h2>
<p>The website may use third party services that set their own cookies, including:</p>
<ul>
  <li>Google Analytics (analytics)</li>
  <li>Other performance measurement tools</li>
</ul>
<p>These third party cookies are governed by their respective privacy policies.</p>
<hr />
${CONTACT_SECTION}
`,
  },

  legal: {
    title: "Legal",
    lastUpdated: "October 2026",
    content: `
<h2>Legal Information</h2>
<p>This page provides access to all legal documents governing your use of GhostWriterHunt's website and professional ghostwriting services.</p>
<h2>About GhostWriterHunt</h2>
<p>GhostWriterHunt is an independently operated book-writing, editing, formatting, and publishing service owned by ${BUSINESS_OWNER} as a sole proprietor. GhostWriterHunt provides ghostwriting, ebook writing, manuscript editing, proofreading, formatting, cover design, publishing assistance, and related author services.</p>
<p>The website is available at ghostwriterhunt.lumexforge.com. That domain is used for hosting and access to the GhostWriterHunt website and does not mean that GhostWriterHunt is owned or operated by the domain registrar or any unrelated company.</p>
<hr />
<h2>Legal Documents</h2>
<ul class="legal-doc-list">
  <li class="legal-doc-item">
    <a href="/privacy-policy" class="legal-doc-link">Privacy Policy</a>
    <p class="legal-doc-desc">How GhostWriterHunt collects, uses and protects your personal information when you use the website and services.</p>
  </li>
  <li class="legal-doc-item">
    <a href="/terms-of-use" class="legal-doc-link">Terms &amp; Conditions</a>
    <p class="legal-doc-desc">The terms and conditions governing your use of the website and the services GhostWriterHunt provides.</p>
  </li>
  <li class="legal-doc-item">
    <a href="/refund-policy" class="legal-doc-link">Refund Policy</a>
    <p class="legal-doc-desc">How refunds, cancellations and payment disputes are handled for GhostWriterHunt orders.</p>
  </li>
  <li class="legal-doc-item">
    <a href="/cookie-policy" class="legal-doc-link">Cookie Policy</a>
    <p class="legal-doc-desc">How GhostWriterHunt uses cookies and similar tracking technologies on the website.</p>
  </li>
  <li class="legal-doc-item">
    <a href="/legal#sms-consent" class="legal-doc-link">Call and Text Message Consent Agreement</a>
    <p class="legal-doc-desc">Your rights and GhostWriterHunt's obligations regarding calls, SMS and text message communications.</p>
  </li>
</ul>
<hr />
<h2 id="sms-consent">Call and Text Message Consent Agreement</h2>
<p>By providing a phone number and checking the separate, optional SMS consent checkbox on a GhostWriterHunt form, you agree to receive text messages related to your submitted inquiry, requested service information, quotes, consultation scheduling, and related project communications, consistent with the consent provided.</p>
<p>Providing a phone number alone does not constitute SMS consent. Consent is not a condition of purchase. Message frequency varies. Message and data rates may apply. Reply STOP to opt out or HELP for assistance.</p>
<p>Mobile opt-in data and SMS consent records are not shared with third parties or affiliates for their marketing or promotional purposes. Service providers may process information only as needed to deliver and support the communications service, subject to applicable requirements.</p>
<p>Carriers are not liable for delayed or undelivered messages.</p>
<h3>How to Withdraw Your Consent</h3>
<p>You may withdraw SMS consent at any time by replying STOP to a message, replying HELP for assistance, or emailing <a href="mailto:support.gwh@lumexforge.com">support.gwh@lumexforge.com</a>. You may receive one final message confirming your opt-out.</p>
<p>By opting in, you confirm that you are the owner or authorized user of the phone number provided and that you understand and agree to the terms outlined above and in the <a href="/privacy-policy">Privacy Policy</a>.</p>
<hr />
${CONTACT_SECTION}
`,
  },
};
