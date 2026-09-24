import LegalDocumentPage from "@/components/legal/LegalDocumentPage";

export const metadata = {
  title: "Legal",
  description:
    "Legal information, policies and text message consent for GhostWriterHunt.",
};

export default function LegalPage() {
  return <LegalDocumentPage type="legal" />;
}
