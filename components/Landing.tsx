import { motion } from "framer-motion";
import styles from "../styles/MainStyles.module.css";

export default function Landing() {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      className="mb-10"
    >
      <div className={styles.nav}>upcoming</div>
      <div className="text-3xl">Come to the show</div>
    </motion.div>
  );
}
