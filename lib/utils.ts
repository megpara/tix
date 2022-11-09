import { FulfillmentData, IntentData } from "../hooks/types";

export const fulfillmentWithIntent = (fulfillments: FulfillmentData[], intents: IntentData[]) =>
  fulfillments.map((fulfillment) => {
    const intent = intents.find((intent) => intent.uuid === fulfillment.uuid);
    return { ...intent, ...fulfillment };
  });
