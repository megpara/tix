import type { NextPage } from "next";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import Checkout from "../components/Tickets/Checkout";
import Quantity from "../components/Tickets/Quantity";
import useCart from "../hooks/useCart";
import { OrderResponseBody } from "@paypal/paypal-js";

import VoltaLogo from "../assets/patch.png";
import { useEffect, useState } from "react";
import Completed from "../components/Tickets/Completed";
import Landing from "../components/Landing";
import Info from "../components/Tickets/Info";
import OrderSummary from "../components/OrderSummary";
import api from "../lib/api";
import { Info as InfoType } from "../lib/types";

const Home: NextPage = () => {
  const [uuid, setUuid] = useState("");
  const [info, setInfo] = useState<InfoType>({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [order, setOrder] = useState<OrderResponseBody | null>(null);
  const router = useRouter();
  const cart = useCart();

  const view = router.query.view ? router.query.view : "0";
  console.log(view);
  const nextView = () => {
    router.push(`/?view=${parseInt(view ? (view as string) : "0") + 1}`);
  };

  useEffect(() => {
    let goToStart = false;
    const viewInt = parseInt(view as string);
    if (viewInt > 1 && cart.cart.tickets === 0) {
      goToStart = true;
    }
    if (viewInt > 2 && info.firstName === "") {
      goToStart = true;
    }
    if (goToStart) {
      router.push("/");
    }
  }, [view]);

  const onSubmitInfo = async (values: any) => {
    setInfo(values);
    const uuid = await api.registerIntent(values, cart.cart.tickets);
    setUuid(uuid);
    nextView();
  };

  const orderCompleted = async (order: OrderResponseBody) => {
    setOrder(order);
    const response = await api.registerFulfillment(order, uuid);
    console.log(response);
    nextView();
  };

  const Steps = [
    <Landing />,
    <Quantity cart={cart} />,
    <Info info={info} onSubmit={onSubmitInfo} />,
    <Checkout cart={cart} orderCompleted={orderCompleted} />,
    <Completed order={order} />,
  ];

  const showNext = view === "0" || (view === "1" && cart.cart.tickets);

  return (
    <div className="flex flex-col items-center justify-center bg-black text-white h-full w-full">
      <OrderSummary info={info} order={order} cart={cart.cart} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-3/4 mb-10"
      >
        <img className="m-auto" style={{ maxWidth: 250 }} src={VoltaLogo.src} />
      </motion.div>
      {Steps[parseInt(view as string)]}
      <AnimatePresence>
        {showNext && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="btn"
            onClick={nextView}
          >
            Next
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
