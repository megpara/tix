export type Cart = {
  tickets: number;
  total: number;
};

export type CartKey = keyof Cart;

export type CartHook = {
  cart: Cart;
  incrementValue: (key: CartKey) => void;
  decrementValue: (key: CartKey) => void;
};
