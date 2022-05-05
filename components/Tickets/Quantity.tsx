import { CartHook } from "../../hooks/types";
import MinusButton from "../Button/Minus";
import PlusButton from "../Button/Plus";
import { COST_PER_TICKET } from "./constants";
import Container from "./Container";

type Props = {
  cart: CartHook;
};

export default function Quantity({ cart }: Props) {
  return (
    <div className="w-4/5 lg:w-3/5 mb-5 text-3xl">
      <div className="mt-10 lg:m-10">
      <div className="font-bold text-red-500 mb-10">Tickets</div>
      <div className="border-b text-base flex justify-between">
        <div>GA</div>
        <div>${COST_PER_TICKET}</div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex justify-between" style={{ width: 80 }}>
          <MinusButton onClick={() => cart.decrementValue("tickets")} />
          <div className="p-2">{cart.cart.tickets}</div>
          <PlusButton onClick={() => cart.incrementValue("tickets")} />
        </div>
        <div className="w-full flex justify-end">
        <div className="text-center text-lg my-5 bg-red-500 rounded-full p-5 ml-10 w-20 h-10 flex items-center justify-center">
          ${cart.cart.tickets * COST_PER_TICKET}
        </div>
        </div>
      </div>
      </div>
    </div>
  );
}
