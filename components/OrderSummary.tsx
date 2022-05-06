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
    <div className="absolute left-5 top-5">
      {cart.tickets > 0 && (
        <div>
          {cart.tickets}x Tickets: ${cart.total}.00
        </div>
      )}
    </div>
  );
}
