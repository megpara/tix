import { OrderResponseBody } from "@paypal/paypal-js";
import { Cart } from "../../hooks/types";
import { Info } from "../../lib/types";
import { event } from "../../lib/config";

type Props = {
  order: OrderResponseBody | null;
  cart: Cart;
  info: Info;
  date: string;
};
export default function Completed({ cart, info, order, date }: Props) {
  return (
    <div className="text-center text-2xl mb-5 w-4/5 lg:w-5/12">
      <div>Thanks {order && order.payer.name?.given_name}! You're all set.</div>
      <div className="mb-10">We will check you in at the door.</div>
      <div className="text-sm text-left">Order #{order?.id}</div>
      <div className="text-xs text-left">
        {info.firstName} {info.lastName}
      </div>
      <div className="text-xs text-left mb-5">{info.email}</div>
      <div className="flex justify-between text-sm border-b mb-10">
        <div>{cart.tickets}x Tickets</div>
        <div>${cart.total}.00</div>
      </div>
      <div className="text-base mb-5">{date}</div>
      <a href="https://www.navel.la/" target="_blank" rel="noreferrer">
        <div className="text-sm">{event.location}</div>
      </a>
      <div className="text-sm">{event.address}</div>
      <a href={event.googleMapsLink}>
        <div className="text-red-500 mb-5 text-sm underline underline-offset-2">
          Map
        </div>
      </a>
      <div className="text-sm mt-20">
        (Screenshot this page for your records)
      </div>
    </div>
  );
}
