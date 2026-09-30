/**
 * GhostWriterHunt — Legal document content
 * Semantic HTML with class hooks styled in LegalDocumentPage.js
 */

import { BUSINESS_ADDRESS } from "@/lib/siteAddress";

const CONTACT_SECTION = `
<div class="legal-contact-section">
  <h2 class="legal-contact-heading">Contact Us</h2>
  <p class="legal-contact-intro">Questions about our policies or your project? Reach our team directly.</p>
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
  </div>
  <p class="legal-contact-location">GhostWriterHunt · ${BUSINESS_ADDRESS}</p>
</div>
`;

export const legalContent = {
  privacy: {
    title: "Privacy Policy",
    lastUpdated: "September 2026",
    content: `
<h2>Introduction</h2>
<p>GhostWriterHunt ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose and safeguard your information when you visit our website ghostwriterhunt.lumexforge.com and use our professional ghostwriting services. Please read this policy carefully. If you disagree with its terms, please discontinue use of our site.</p>
<hr />
<h2>Information We Collect</h2>
<h3>Information You Provide Directly</h3>
<p>We collect information you voluntarily provide when you:</p>
<ul>
  <li>Submit a consultation request or contact form</li>
  <li>Purchase or inquire about our services</li>
  <li>Communicate with our team via email or phone</li>
  <li>Subscribe to our newsletter</li>
</ul>
<p>This information may include your name, email address, phone number, book project details and any other information you choose to provide.</p>
<h3>Information Collected Automatically</h3>
<p>When you visit our website we automatically collect certain information about your device and browsing behavior, including:</p>
<ul>
  <li>IP address and browser type</li>
  <li>Pages visited and time spent on each page</li>
  <li>Referring website addresses</li>
  <li>Device type and operating system</li>
</ul>
<hr />
<h2>How We Use Your Information</h2>
<p>We use the information we collect to:</p>
<ul>
  <li>Respond to your consultation requests and service inquiries</li>
  <li>Provide, manage and improve our ghostwriting services</li>
  <li>Send project updates and communications related to your book project</li>
  <li>Send marketing communications (only with your consent)</li>
  <li>Analyze website usage to improve user experience</li>
  <li>Comply with legal obligations</li>
</ul>
<hr />
<h2>Text Message Communications</h2>
<p>By providing your phone number and opting in to SMS communications, you agree to receive text messages from GhostWriterHunt related to:</p>
<ol>
  <li><strong>Project Updates</strong>: Notifications regarding your book project status, milestones and deliverables.</li>
  <li><strong>Client Support</strong>: Assistance with your project and responses to your inquiries.</li>
  <li><strong>Consultation Reminders</strong>: Reminders about scheduled calls and consultations.</li>
  <li><strong>Account Alerts</strong>: Important alerts regarding your account or project.</li>
  <li><strong>Service Updates</strong>: Information about new services and offerings from GhostWriterHunt.</li>
</ol>
<p><strong>To opt out of SMS messages:</strong> Reply STOP to any text message from us, or email <a href="mailto:support.gwh@lumexforge.com">support.gwh@lumexforge.com</a>. Message and data rates may apply.</p>
<hr />
<h2>Information Sharing</h2>
<p>We do not sell, trade or rent your personal information to third parties. We may share your information only in the following circumstances:</p>
<ul>
  <li>With service providers who assist us in operating our website and delivering our services</li>
  <li>When required by law or to protect our legal rights</li>
  <li>With your explicit consent</li>
</ul>
<hr />
<h2>NDA and Confidentiality</h2>
<p>All client projects are protected by a Non-Disclosure Agreement (NDA). Your book ideas, manuscript content, personal story and project details are completely confidential and will never be disclosed to third parties under any circumstances.</p>
<hr />
<h2>Data Security</h2>
<p>We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure or destruction. All data is transmitted using SSL encryption.</p>
<hr />
<h2>Your Rights</h2>
<p>You have the right to:</p>
<ul>
  <li>Access the personal information we hold about you</li>
  <li>Request correction of inaccurate data</li>
  <li>Request deletion of your personal data</li>
  <li>Opt out of marketing communications at any time</li>
  <li>Withdraw consent for SMS communications</li>
</ul>
<hr />
<h2>Cookies</h2>
<p>We use cookies to enhance your browsing experience. Please see our <a href="/cookie-policy">Cookie Policy</a> for full details.</p>
<hr />
${CONTACT_SECTION}
`,
  },

  terms: {
    title: "Terms & Conditions",
    lastUpdated: "",
    content: `
<h2>1. Agreement</h2>
<p>By using this website or placing an order with GhostWriterHunt, you agree to these Terms &amp; Conditions. If you do not agree, please do not use our website or services. You must be of legal age in your location to purchase our services.</p>
<h2>2. Definitions</h2>
<p><strong>Website</strong> means all pages and content at ghostwriterhunt.lumexforge.com.</p>
<p><strong>Client, you, your</strong> means the person placing an order, or anyone ordering on their behalf.</p>
<p><strong>Company, we, our</strong> means GhostWriterHunt, based in Rosenberg, Texas, USA.</p>
<p><strong>Services</strong> means all writing, editing, design, publishing and marketing work we provide.</p>
<p><strong>Order</strong> means any purchase of our services, confirmed by payment through our secure checkout or a payment link we send you.</p>
<h2>3. Our Services</h2>
<p>Each order is for your personal or business use. The scope, deliverables and timeline of your project are confirmed in your package details or your custom project plan.</p>
<p>We use professional software and digital tools in research, drafting and production. All work is directed, reviewed and finalized by our team.</p>
<h2>4. Ownership and Confidentiality</h2>
<p>Once your order is paid in full, you own 100% of the rights to the final work. All projects are covered by our confidentiality commitment. We never share your work or identity with anyone.</p>
<h2>5. Revisions</h2>
<p>Revisions are included as described in your package. Our Professional and Complete Publishing packages include unlimited revisions. Revision requests must match the original project requirements.</p>
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
<p>If your delivered work does not meet the requirements you documented, we will first:</p>
<ol>
  <li>Revise and, if needed, reassign or rewrite the work until it meets your requirements.</li>
  <li>Offer a credit of equal value toward future services, usable at any time.</li>
</ol>
<p>If we still cannot deliver what was agreed, and the work clearly does not meet the documented requirements, a partial refund will be agreed with you.</p>
<h2>Late Delivery</h2>
<p>If we miss an agreed deadline through our own fault, and you have contacted us at least three times without resolution, you may request a refund. The delay must be confirmed with written records.</p>
<h2>Refund Time Frame</h2>
<p>Refund requests must be made within 30 days of delivery. Requests after this period cannot be accepted.</p>
<h2>When Refunds Are Not Issued</h2>
<ol>
  <li>Minor issues such as small typing or grammar errors, which we correct free of charge.</li>
  <li>Delays caused by late feedback, approvals or materials from the client.</li>
  <li>Personal preference about writing style, when the work meets the agreed requirements.</li>
</ol>
<h2>Payment Disputes</h2>
<p>Please contact us before opening a dispute with your bank. We resolve most concerns quickly and directly.</p>
<h2>Contact</h2>
<p>Email <a href="mailto:ghostwriterhunt@lumexforge.com">ghostwriterhunt@lumexforge.com</a> for any refund request. GhostWriterHunt, Rosenberg, Texas, USA.</p>
`,
  },

  cookies: {
    title: "Cookie Policy",
    lastUpdated: "September 2026",
    content: `
<h2>What Are Cookies</h2>
<p>Cookies are small text files stored on your device when you visit a website. They help websites remember your preferences and improve your browsing experience.</p>
<hr />
<h2>How We Use Cookies</h2>
<p>GhostWriterHunt uses cookies for the following purposes:</p>
<h3>Essential Cookies</h3>
<p>These cookies are necessary for the website to function properly. They enable core features such as:</p>
<ul>
  <li>Page navigation and access to secure areas</li>
  <li>Form submission functionality</li>
  <li>Session management</li>
</ul>
<p>These cookies cannot be disabled as they are essential to the operation of our website.</p>
<h3>Analytics Cookies</h3>
<p>We use analytics cookies to understand how visitors interact with our website. This helps us:</p>
<ul>
  <li>Improve website content and structure</li>
  <li>Identify popular pages and content</li>
  <li>Understand visitor behavior patterns</li>
</ul>
<p>Analytics data is anonymized and does not identify individual users.</p>
<h3>Marketing Cookies</h3>
<p>With your consent we may use marketing cookies to:</p>
<ul>
  <li>Show you relevant content about our services</li>
  <li>Measure the effectiveness of our marketing campaigns</li>
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
<p>Please note that disabling certain cookies may affect the functionality of our website.</p>
<hr />
<h2>Third Party Cookies</h2>
<p>Our website may use third party services that set their own cookies, including:</p>
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
    lastUpdated: "September 2026",
    content: `
<h2>Legal Information</h2>
<p>This page provides access to all legal documents governing your use of GhostWriterHunt's website and professional ghostwriting services.</p>
<hr />
<h2>Our Legal Documents</h2>
<ul class="legal-doc-list">
  <li class="legal-doc-item">
    <a href="/privacy-policy" class="legal-doc-link">Privacy Policy</a>
    <p class="legal-doc-desc">How we collect, use and protect your personal information when you use our website and services.</p>
  </li>
  <li class="legal-doc-item">
    <a href="/terms-of-use" class="legal-doc-link">Terms &amp; Conditions</a>
    <p class="legal-doc-desc">The terms and conditions governing your use of our website and the services we provide.</p>
  </li>
  <li class="legal-doc-item">
    <a href="/refund-policy" class="legal-doc-link">Refund Policy</a>
    <p class="legal-doc-desc">How refunds, cancellations and payment disputes are handled for GhostWriterHunt orders.</p>
  </li>
  <li class="legal-doc-item">
    <a href="/cookie-policy" class="legal-doc-link">Cookie Policy</a>
    <p class="legal-doc-desc">How we use cookies and similar tracking technologies on our website.</p>
  </li>
  <li class="legal-doc-item">
    <a href="/legal#sms-consent" class="legal-doc-link">Text Message Consent Agreement</a>
    <p class="legal-doc-desc">Your rights and our obligations regarding SMS and text message communications.</p>
  </li>
</ul>
<hr />
<h2 id="sms-consent">Text Message Consent Agreement</h2>
<p>By providing your phone number and opting in to text message communications, you agree to receive SMS messages from GhostWriterHunt related to the following purposes:</p>
<ol>
  <li><strong>Project Updates</strong>: Notifications regarding the status of your book project, including milestone completions, draft deliveries and revision updates.</li>
  <li><strong>Client Support</strong>: Assistance with your project, responses to your inquiries and resolution of any issues related to your ghostwriting or publishing services.</li>
  <li><strong>Consultation Reminders</strong>: Reminders about upcoming consultation calls, project review meetings and scheduled check-ins with your assigned writer.</li>
  <li><strong>Account Alerts</strong>: Important notifications regarding your account, payment confirmations, contract updates and project timeline changes.</li>
  <li><strong>Service Communications</strong>: Information about new services, relevant updates and important announcements from GhostWriterHunt.</li>
</ol>
<h3>How to Withdraw Your Consent</h3>
<p>You have the right to withdraw your consent to receive text messages from GhostWriterHunt at any time using any of the following methods:</p>
<ol>
  <li><strong>Reply STOP</strong>: Reply to any text message you receive from us with the word "STOP." This will automatically unsubscribe you from further text communications.</li>
  <li><strong>Contact Us</strong>: Email <a href="mailto:support.gwh@lumexforge.com">support.gwh@lumexforge.com</a> and request to be unsubscribed from text message communications.</li>
  <li><strong>Update Preferences</strong>: Contact us directly to update your communication preferences and opt out of receiving text messages.</li>
</ol>
<p>Please note that even if you opt out of promotional text messages, you may still receive transactional messages directly related to your active book project.</p>
<p>By opting in, you confirm that you are the owner or authorized user of the phone number provided and that you understand and agree to the terms outlined above.</p>
<p>Message and data rates may apply. Message frequency varies based on your project status and activity.</p>
<hr />
${CONTACT_SECTION}
`,
  },
};
