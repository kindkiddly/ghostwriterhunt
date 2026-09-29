import LegalDocumentPage from "@/components/legal/LegalDocumentPage";

export const metadata = {
  title: "Refund Policy",
  description:
    "GhostWriterHunt refund policy for orders, cancellations and payment disputes.",
};

export default function RefundPolicyPage() {
  return <LegalDocumentPage type="refund" />;
}
