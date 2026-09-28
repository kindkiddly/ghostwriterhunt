import PaymentsClient from "./PaymentsClient";

export default function PaymentsPage({ searchParams }) {
  const params = searchParams || {};
  const prefillContactId = typeof params.contactId === "string" ? params.contactId : "";
  const prefillConversationId = typeof params.conversationId === "string" ? params.conversationId : "";

  return (
    <PaymentsClient prefillContactId={prefillContactId} prefillConversationId={prefillConversationId} />
  );
}
