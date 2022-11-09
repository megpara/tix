import { useEffect, useState } from "react";
import api from "../lib/api";
import { fulfillmentWithIntent } from "../lib/utils";
import { IntentData, FulfillmentData } from "./types";

const EVENT = "MILK";

export default function useAdmin() {
  const [intents, setIntents] = useState<IntentData[]>([]);
  const [fulfillments, setFulfillments] = useState<FulfillmentData[]>([]);

  useEffect(() => {
    api.getTicketIntents(EVENT).then(setIntents);
    api.getTicketFulfillments(EVENT).then(setFulfillments);
  }, []);

  const fulfillmentsXIntents = fulfillmentWithIntent(fulfillments, intents);
  return { intents, fulfillments: fulfillmentsXIntents };
}
