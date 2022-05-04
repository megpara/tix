import axios from "axios";
import { Info } from "./types";
import { OrderResponseBody } from "@paypal/paypal-js";

const endpoints = {
  intent: "/api/intent",
  fulfillment: "/api/fulfillment",
};

const api = axios.create();

const registerIntent = async (info: Info, numTickets: number) => {
  const res = await api.post(endpoints.intent, { ...info, numTickets });
  return res.data;
};

const registerFulfillment = async (order: OrderResponseBody, uuid: string) => {
  const {
    create_time,
    update_time,
    id,
    payer: { name, payer_id, email_address, phone },
  } = order;
  const firstName = name ? name.given_name : "";
  const lastName = name ? name.surname : "";
  const phoneNumber = phone ? phone.phone_number.national_number : "";
  const res = await api.post(endpoints.fulfillment, {
    uuid,
    create_time,
    update_time,
    id,
    firstName,
    lastName,
    email_address,
    phoneNumber,
    payer_id,
  });
  return res.data;
};

export default { registerIntent, registerFulfillment };
