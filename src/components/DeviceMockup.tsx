import { motion } from "framer-motion";

export default function DeviceMockup() {
  return (
    <motion.div
      className="relative w-full flex justify-center items-end px-6"
      initial={{ opacity: 0, y: 48 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.55 }}
    >
      {/* Glow shadow underneath the device */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[75%] h-16 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(79,163,199,0.22) 0%, rgba(111,191,158,0.12) 40%, transparent 75%)",
          filter: "blur(24px)",
        }}
        aria-hidden="true"
      />

      {/* Tablet frame */}
      <div
        className="relative w-full max-w-[960px] max-h-[620px] overflow-hidden"
        style={{
          perspective: "1200px",
        }}
      >
        <motion.div
          className="relative w-full"
          style={{
            transformStyle: "preserve-3d",
            transform: "rotateX(4deg)",
          }}
          whileHover={{ transform: "rotateX(1deg)" }}
          transition={{ type: "spring", stiffness: 180, damping: 26 }}
        >
          <div className="relative w-full">
            {/* Screen content */}
            <img
              src="/figure/Example.svg"
              alt="Avail example screen"
              className="block w-full h-full object-cover object-top select-none pointer-events-none"
              draggable={false}
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
