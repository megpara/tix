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
import Info from "../components/Tickets/Info";
import OrderSummary from "../components/OrderSummary";
import api from "../lib/api";
import { Info as InfoType } from "../lib/types";
import Container from "../components/Tickets/Container";
import { TIX_ROOT } from "../lib/constants";
import axios from "axios";
import { event } from "../lib/config";
import Date from "../components/Tickets/Date";

const Tix: NextPage = () => {
  const [uuid, setUuid] = useState("");
  const [date, setDate] = useState("");
  const [info, setInfo] = useState<InfoType>({
    firstName: "",
    lastName: "",
    email: "",
    toggle: true,
  });
  const [order, setOrder] = useState<OrderResponseBody | null>(null);
  const router = useRouter();
  const cart = useCart();

  const selectDate = (date: string) => setDate(date);
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

  const onSubmitInfo = async (info: any) => {
    setInfo(info);
    const uuid = await api.registerIntent(info, cart.cart.tickets, date);
    setUuid(uuid);
    if (info.toggle) {
      axios.post("/api/subscribe", { values: info }).catch(console.log);
    }
    nextView();
  };

  const orderCompleted = async (order: OrderResponseBody) => {
    setOrder(order);
    const response = api.registerFulfillment(
      order,
      uuid,
      cart.cart.tickets,
      info.email,
      date
    );
    nextView();
  };

  const Steps = [
    <Date date={date} selectDate={selectDate} key={date} />,
    <Quantity cart={cart} key="quantity" />,
    <Info info={info} onSubmit={onSubmitInfo} key="info" />,
    <Checkout cart={cart} orderCompleted={orderCompleted} key="checkout" />,
    <Completed
      order={order}
      cart={cart.cart}
      info={info}
      key="completed"
      date={date}
    />,
  ];

  const showNext =
    (date && view === "0") || (view === "1" && cart.cart.tickets);

  return (
    <Container>
      <OrderSummary info={info} order={order} cart={cart.cart} />
      {view !== "3" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-4/5 lg:w-3/5"
        >
          <div className="font-bold text-3xl lg:m-10">{event.title}</div>
          <div className="grid grid-rows-1 lg:m-10 mt-10 pr-4">
            <div>
              <div>Location</div>
              <img className="w-3 inline" src="location.png" />
              <a href="https://www.navel.la/" rel="noreferrer" target="_blank">
                <div className="grid-column inline ml-2 text-xs underline decoration-red-500">
                  {event.location}
                </div>
              </a>
            </div>
            {date && (
              <div>
                <div className="">Date</div>
                {/* <div className="text-xs">Sunday, June 12</div>
              <div className="text-xs">8pm</div> */}
                <div>{date}</div>
              </div>
            )}
          </div>
        </motion.div>
      )}
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
