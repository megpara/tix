export const fulfillmentWithIntent = (fulfillments: any, intents: any) =>
  fulfillments.map((fulfillment: any) => {
    const intent = intents.find((intent: any) => intent.uuid === fulfillment.uuid);
    return { ...intent, ...fulfillment };
  });
