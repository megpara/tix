import { OrderResponseBody } from "@paypal/paypal-js";
type Props = {
  order: OrderResponseBody | null;
};
export default function Completed({ order }: Props) {
  return (
    <div className="text-center text-2xl mb-5">
      <div>Thanks {order && order.payer.name?.given_name}</div>
      <div>See your ass at the show</div>
    </div>
  );
}
