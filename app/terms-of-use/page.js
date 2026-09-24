import LegalDocumentPage from "@/components/legal/LegalDocumentPage";

export const metadata = {
  title: "Terms of Use",
  description:
    "Terms and conditions for using GhostWriterHunt's website and professional ghostwriting services.",
};

export default function TermsOfUsePage() {
  return <LegalDocumentPage type="terms" />;
}
