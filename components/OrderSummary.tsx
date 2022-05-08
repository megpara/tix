import { Info } from "../lib/types";
import { OrderResponseBody } from "@paypal/paypal-js";
import { Cart } from "../hooks/types";

type Props = {
  info: Info | null;
  order: OrderResponseBody | null;
  cart: Cart;
};

export default function OrderSummary({ info, order, cart }: Props) {
  return (
    <div className="flex m-5 w-full">
      {cart.tickets > 0 && (
        <div className="pl-5">
          {cart.tickets}x Tickets: ${cart.total}.00
        </div>
      )}
    </div>
  );
}
