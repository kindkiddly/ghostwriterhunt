import LegalDocumentPage from "@/components/legal/LegalDocumentPage";

export const metadata = {
  title: "Cookie Policy",
  description:
    "How GhostWriterHunt uses cookies and similar technologies on our website.",
};

export default function CookiePolicyPage() {
  return <LegalDocumentPage type="cookies" />;
}
