import useAdmin from "../hooks/useAdmin";

// You can match fuillments to intents using their uuid, to get the ticket number from the intent
export default function Admin() {
  const { intents, fulfillments } = useAdmin();

  return (
    <div style={{ color: "red" }}>
      <h1>Admin</h1>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        <div>
          <h2>Intents</h2>
          {intents
            .filter((intent) => intent.firstName !== "Ariel" && intent.lastName !== "Klevecz")
            .map((intent) => (
              <div key={intent.uuid} style={{ margin: "10px 0px" }}>
                {intent.firstName} {intent.lastName} ({intent.email}): {intent.numTickets} | {intent.date}
              </div>
            ))}
        </div>
        <div>
          <h2>Fulfillments</h2>
          {fulfillments.map((item: any) => (
            <div key={item.uuid} style={{ margin: "10px 0px" }}>
              {" "}
              {item.firstName} {item.lastName} - {item.numTickets} tickets - {item.date}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
