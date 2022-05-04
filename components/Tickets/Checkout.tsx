import { PayPalButtons } from "@paypal/react-paypal-js";
import {
  CreateOrderActions,
  OnApproveActions,
  OnApproveData,
} from "@paypal/paypal-js/types/components/buttons";
import { CartHook } from "../../hooks/types";
import { OrderResponseBody } from "@paypal/paypal-js";
import { useState } from "react";
import { COST_PER_TICKET } from "./constants";

type Props = {
  cart: CartHook;
  orderCompleted: (order: OrderResponseBody) => void;
};

export default function Checkout({ cart, orderCompleted }: Props) {
  const [processing, setProcessing] = useState(false);

  const cost = cart.cart.tickets * COST_PER_TICKET;

  const createOrder = (
    data: Record<string, unknown>,
    actions: CreateOrderActions
  ) => {
    const value = cost.toString();
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value,
          },
          description: "Ticket for Volta Navel",
        },
      ],
      application_context: {
        shipping_preference: "NO_SHIPPING",
      },
    });
  };

  const onApprove = (data: OnApproveData, actions: OnApproveActions) => {
    setProcessing(true);
    return actions.order!.capture().then((order) => {
      if (order.status === "COMPLETED") {
        orderCompleted(order);
      }
      if (order.status === "VOIDED") {
        // order voided
        alert("Something went wrong :(");
      }
      setProcessing(false);
    });
  };
  return (
    <div className="">
      {/* <div className="text-4xl text-center mb-0">
        {cart.cart.tickets}x Tickets
      </div> */}
      <div className="text-center bg-red-500 rounded-full p-5 m-auto mb-5 w-24 h-24 flex items-center justify-center text-3xl">
        ${cost}
      </div>
      <PayPalButtons
        style={{ color: "black" }}
        createOrder={(data, actions) => createOrder(data, actions)}
        // @ts-ignore
        onApprove={(data, actions) => onApprove(data, actions)}
      />
    </div>
  );
}
