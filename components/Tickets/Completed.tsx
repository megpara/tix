import { OrderResponseBody } from "@paypal/paypal-js";
import { Cart } from "../../hooks/types";
import { Info } from "../../lib/types";

type Props = {
  order: OrderResponseBody | null;
  cart: Cart;
  info: Info;
};
export default function Completed({ cart, info, order }: Props) {
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
      <div className="text-base mb-5">June 12, 8pm</div>
      <a href="https://www.navel.la/" target="_blank">
        <div className="text-sm">Navel LA</div>
      </a>
      <div className="text-sm">1611 S Hope Street</div>
      <a href="https://www.google.com/maps/d/u/0/viewer?mid=1btUtt4_74gw3JO2Zfz_m26OYyiDATLlv&ll=34.03582020886561%2C-118.26735479243314&z=17">
        <div className="text-red-500 mb-5 text-sm underline underline-offset-2">
          Parking
        </div>
      </a>
      <div className="text-sm mt-20">(Screenshot this page for your records)</div>
    </div>
  );
}
