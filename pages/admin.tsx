import useAdmin from "../hooks/useAdmin";

// You can match fuillments to intents using their uuid, to get the ticket number from the intent

const FulfillmentItem = ({ children }: any) => (
  <td className="border-2 p-2 select-all" style={{ width: 280 }}>
    {children}
  </td>
);

export default function Admin() {
  const { intents, fulfillments } = useAdmin();
  if (fulfillments.length === 0 || !fulfillments[0].date) {
    return <div>loading...</div>;
  }
  return (
    <div style={{ color: "red" }}>
      <h1>Admin</h1>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        {/* <div>
          <h2>Intents</h2>
          {intents
            .filter((intent) => intent.firstName !== "Ariel" && intent.lastName !== "Klevecz")
            .map((intent) => (
              <div key={intent.uuid} style={{ margin: "10px 0px" }}>
                {intent.firstName} {intent.lastName} ({intent.email}): {intent.numTickets} | {intent.date}
              </div>
            ))}
        </div> */}
        <table style={{ userSelect: "all" }}>
          <thead>
            <tr>tickets</tr>
          </thead>
          <tbody>
            {fulfillments
              .sort((a, b) => a.lastName!.localeCompare(b.lastName!))
              .sort((a, b) => a.date!.localeCompare(b.date!))
              .map((item: any) => (
                <tr key={item.uuid} style={{ margin: "0px 0px", userSelect: "all" }} className="flex">
                  <FulfillmentItem>
                    {item.firstName} {item.lastName}
                  </FulfillmentItem>
                  <FulfillmentItem>{item.email}</FulfillmentItem>
                  <FulfillmentItem>{item.numTickets} tickets</FulfillmentItem>
                  <FulfillmentItem>{item.date}</FulfillmentItem>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
