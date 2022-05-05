import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      className="mb-10 bg-black h-full w-full text-white"
    >
      <div className="text-red-500 underline underline-offset-8 p-8">
        upcoming
      </div>
      <div className="grid grid-cols-3 grid-rows-3 m-10">
        <div className="w-60 m-auto">
          <img src="backwashb&w.png" />
          <div className="text-gray-500 uppercase font-bold mt-5">
            Sunday, June 12
          </div>
          <Link href="/tix">
            <div className="font-bold text-2xl mt-2 cursor-pointer hover:text-red-500">
              VOLTA X Peter Kalisch: Backwash
            </div>
          </Link>
          <div className="mt-2">
            <img className="w-3 inline" src="location.png" />
            <div className="inline ml-2 text-xs">Navel LA</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
