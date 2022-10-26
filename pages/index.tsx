import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { Router, useRouter } from "next/router";
import { event } from "../lib/config";

export default function Home() {
  const router = useRouter();

  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      className="mb-10 h-full w-full text-white"
    >
      <div className="pb-10">
        <div className="text-red-500 font-bold underline underline-offset-8 text-sm m-5">
          Upcoming
        </div>

        <div className="md:m-10 m-12">
          <div className="m-auto" style={{ maxWidth: 500 }}>
            <img src="olfaction.png" style={{ maxHeight: 400 }} />
            <div className="text-gray-500 uppercase font-bold mt-5">
              {event.dates.join(" | ")}, 6pm
            </div>
            <Link href="/tix">
              <div className="font-bold text-2xl mt-2 cursor-pointer hover:text-red-500">
                {event.title}
              </div>
            </Link>
            <div className="mt-2 mb-5">
              <img className="w-3 inline" src="location.png" />
              <a href="https://artandolfaction.com/" rel="noreferrer" target="_blank">
              <div className="inline ml-2 text-xs underline decoration-red-500">{event.location}</div>
              </a>
            </div>
            <div className="text-sm mb-5">{event.description}</div>
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
      </div>
    </motion.div>
  );
}
