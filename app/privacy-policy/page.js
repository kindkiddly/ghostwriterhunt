import LegalDocumentPage from "@/components/legal/LegalDocumentPage";

export const metadata = {
  title: "Privacy Policy",
  description:
    "How GhostWriterHunt collects, uses and protects your personal information.",
};

export default function PrivacyPolicyPage() {
  return <LegalDocumentPage type="privacy" />;
}
