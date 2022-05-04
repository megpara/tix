import { useEffect, useState } from "react";
import { COST_PER_TICKET } from "../components/Tickets/constants";
import { Cart, CartHook, CartKey } from "./types";

const MAX_TICKETS = 10;
const defaultCart: Cart = {
  tickets: 0,
  total: 0,
};
export default function useCart(): CartHook {
  const [cart, setCart] = useState<Cart>(defaultCart);

  const incrementValue = (key: CartKey) => {
    const newValue = cart[key] + 1;
    setCart({
      ...cart,
      [key]: newValue >= MAX_TICKETS ? MAX_TICKETS : newValue,
    });
  };

  const decrementValue = (key: CartKey) => {
    const newValue = cart[key] - 1;
    setCart({ ...cart, [key]: newValue >= 0 ? newValue : 0 });
  };

  useEffect(() => {
    const total = cart.tickets * COST_PER_TICKET;
    setCart({ ...cart, total });
  }, [cart.tickets]);

  return { cart, incrementValue, decrementValue };
}
