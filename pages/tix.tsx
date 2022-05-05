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
import Container from "../components/Tickets/Container";
import { TIX_ROOT } from "../lib/constants";

const Tix: NextPage = () => {
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

  const nextView = () => {
    router.push(
      `${TIX_ROOT}?view=${parseInt(view ? (view as string) : "0") + 1}`
    );
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
      router.push(TIX_ROOT);
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
    <Quantity cart={cart} />,
    <Info info={info} onSubmit={onSubmitInfo} />,
    <Checkout cart={cart} orderCompleted={orderCompleted} />,
    <Completed order={order} />,
  ];

  const showNext = view === "0" || (view === "1" && cart.cart.tickets);

  return (
    <Container>
      <OrderSummary info={info} order={order} cart={cart.cart} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-4/5 lg:w-3/5"
      >
        <div className="font-bold text-3xl lg:m-10">
          VOLTA X Peter Kalisch: Backwash
        </div>
        <div className="grid grid-cols-2 grid-rows-1 lg:m-10 mt-10">
          <div>
            <div>Location</div>
            <img className="w-3 inline" src="location.png" />
            <a href="https://www.navel.la/" target="_blank"><div className="inline ml-2 text-xs underline decoration-red-500">Navel LA</div></a>
          </div>
          <div>
            <div>Date</div>
            <div className="text-xs">
              Sunday, June 12
            </div>
          </div>
        </div>
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
    </Container>
  );
};

export default Tix;
