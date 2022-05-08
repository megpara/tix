import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { Router, useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      className="mb-10 h-full w-full text-white"
    >
      <div className="grid grid-cols-3">
      <div className="text-red-500 font-bold underline underline-offset-8 text-sm m-5">
        Upcoming
      </div>
      {/* <img src="/volta_white_logo.png" className="w-24 m-auto"/> */}
      </div>
      <div className="m-20">
        <div className="w-60 m-auto">
          <img src="backwashb&w.png" />
          <div className="text-neutral-500 uppercase font-bold mt-5">
            Sunday, June 12
          </div>
          <Link href="/tix">
            <div className="font-bold text-2xl mt-2 cursor-pointer hover:text-red-500">
              VOLTA X Peter Kalisch: Backwash
            </div>
          </Link>
          <div className="mt-2 mb-5">
            <img className="w-3 inline" src="location.png" />
            <div className="inline ml-2 text-xs">Navel LA</div>
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
