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

export type IntentData = {
  uuid: string;
  firstName: string;
  lastName: string;
  email: string;
  slug: string;
  numTickets: number;
  date: string;
  timestamp: string;
};

export type FulfillmentData = {
  uuid: string;
  firstName: string;
  lastName: string;
  id: string;
  payer_id: string;
  update_time: string;
  timestamp: string;
};
