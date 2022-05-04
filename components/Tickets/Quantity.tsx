import { CartHook } from "../../hooks/types";
import MinusButton from "../Button/Minus";
import PlusButton from "../Button/Plus";
import { COST_PER_TICKET } from "./constants";

type Props = {
  cart: CartHook;
};

export default function Quantity({ cart }: Props) {
  return (
    <div className="w-3/4 mb-5 text-3xl">
      <div className="text-center mb-4">How many tickets do you need?</div>
      <div className="flex justify-center items-center">
        <div className="flex justify-between" style={{ width: 90 }}>
          <MinusButton onClick={() => cart.decrementValue("tickets")} />
          <div>{cart.cart.tickets}</div>
          <PlusButton onClick={() => cart.incrementValue("tickets")} />
        </div>
        <div className="text-center my-5 bg-red-500 rounded-full p-5 ml-10 w-24 h-24 flex items-center justify-center">
          ${cart.cart.tickets * COST_PER_TICKET}
        </div>
      </div>
    </div>
  );
}
