import { motion } from "framer-motion";

export default function Landing() {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      className="mb-10"
    >
      <div className="text-3xl">Come to the show</div>
    </motion.div>
  );
}
