import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { Router, useRouter } from "next/router";
import { event } from "./config";

export default function Home() {
  const router = useRouter();

  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      className="mb-10 h-full w-full text-white"
    >
      <div className="">
        <div className="text-red-500 font-bold underline underline-offset-8 text-sm m-5">
          Upcoming
        </div>

        <div className="m-5">
          <div className="m-auto" style={{ maxWidth: 500 }}>
            <img src="olfaction.jpeg" style={{ maxHeight: 400 }} />
            <div className="text-gray-500 uppercase font-bold mt-5">
              {event.dates.join(" || ")}
            </div>
            <Link href="/tix">
              <div className="font-bold text-2xl mt-2 cursor-pointer hover:text-red-500">
                {event.title}
              </div>
            </Link>
            <div className="mt-2 mb-5">
              <img className="w-3 inline" src="location.png" />
              <div className="inline ml-2 text-xs">{event.location}</div>
            </div>
          </div>
          <AnimatePresence>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="btn"
              onClick={() => {
                router.push("/tix");
              }}
            >
              Tickets
            </motion.button>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
