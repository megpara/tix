import { useEffect, useState } from "react";
import api from "../lib/api";
import { IntentData, FulfillmentData } from "./types";

const EVENT = "MILK";

export default function useAdmin() {
  const [intents, setIntents] = useState<IntentData[]>([]);
  const [fulfillments, setFulfillments] = useState<FulfillmentData[]>([]);

  useEffect(() => {
    api.getTicketIntents(EVENT).then(setIntents);
    api.getTicketFulfillments(EVENT).then(setFulfillments);
  }, []);

  const fulfillmentWithIntent = fulfillments.map((fulfillment) => {
    const intent = intents.find((intent) => intent.uuid === fulfillment.uuid);
    return { ...intent, ...fulfillment };
  });

  return { intents, fulfillments: fulfillmentWithIntent };
}
