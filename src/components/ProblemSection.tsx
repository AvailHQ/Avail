import React, { useState } from "react";
import { motion } from "framer-motion";

const IcKitman = () => (
  <div className="w-7 h-7 rounded-full bg-[#111827] shadow-sm flex items-center justify-center">
    <img
      src="/figure/kitman-logo.png"
      alt="Kitman Labs"
      style={{ objectFit: "contain" }}
    />
  </div>
);

const IcWHOOP = () => (
  <div className="w-7 h-7 rounded-full bg-[#111827] shadow-sm flex items-center justify-center">
    <svg viewBox="0 0 20 20" aria-hidden="true" className="w-6 h-6">
      <circle cx="10" cy="10" r="10" fill="#111111" />
      <path
        d="M4 7 L7 14 L10 9.5 L13 14 L16 7"
        fill="none"
        stroke="white"
        strokeWidth="1.85"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </div>
);

const IcCatapult = () => (
  <div className="w-7 h-7 rounded-full bg-[#fff] shadow-sm flex items-center justify-center">
    <svg
      viewBox="0 0 40 82"
      className="w-5 h-5"
      aria-label="Catapult Sports"
      role="img"
    >
      <path
        fill="#000"
        className="text-white"
        d="M5.33 25.13L34.08 6.81l4.23-2.7V0L23.9 9.26L8.14 19.34C2.84 22.71.67 26.67.01 29.88a22.9 22.9 0 0 1 5.32-4.75zM38.31 20.44v-4.07L6.91 36.78C2.78 39.78.05 43.93.05 49.16A14.65 14.65 0 0 0 5.79 60.8l32.53 21.15V64.19L12.5 48a6.1 6.1 0 0 1-2.7-5.07a5.94 5.94 0 0 1 2.69-5zM7.09 28.13C2.22 31.22.37 34.58.09 38.49a29.32 29.32 0 0 1 6.49-5.7l31.73-20.51V8.16z"
      />
    </svg>
  </div>
);

const IcOura = () => (
  <div className="w-7 h-7 rounded-full bg-black shadow-sm flex items-center justify-center">
    <svg
      aria-hidden="true"
      viewBox="0 0 253 320"
      xmlns="http://www.w3.org/2000/svg"
      color="#fff"
      className="w-4 h-auto"
    >
      <path
        d="M63.443 27.388H190.38V0H63.443zM643.464 174.105H554.68V83.082h88.783c31.634 0 52.89 18.292 52.89 45.513 0 27.221-21.256 45.51-52.89 45.51m29.409 21.29c30.456-8.686 50.136-34.907 50.136-66.8 0-41.397-31.967-69.212-79.547-69.212H528.035v244.66h26.646V198.174h90.3l57.501 105.867h28.83l-59.946-108.218zM389.668 308.653c65.348 0 110.987-45.903 110.987-111.63V59.384h-27.387v135.793c0 50.688-34.377 86.09-83.6 86.09-40.798 0-84.709-26.94-84.709-86.09V59.384h-27.382v137.64c0 65.726 46.093 111.628 112.093 111.628m478.192-217.35 57.757 126.333H809.735zm-12.848-31.916L743.16 304.044h28.606l27.662-62.713h136.493l27.67 62.713h28.603L880.342 59.383zm-728.077-4.611C56.944 54.775 0 111.719 0 181.712c0 69.996 56.944 126.94 126.937 126.94 69.996 0 126.94-56.944 126.94-126.94 0-69.993-56.944-126.937-126.94-126.937m0 226.49c-54.893 0-99.553-44.66-99.553-99.553 0-54.892 44.661-99.55 99.554-99.55 54.894 0 99.556 44.658 99.556 99.55 0 54.893-44.662 99.553-99.556 99.553"
        fill="#fff"
      ></path>
    </svg>
  </div>
);

const IcFitrWoman = () => (
  <div className="w-7 h-7 rounded-full bg-[#1A1A2E] shadow-sm flex items-center justify-center">
    <img
      src="https://cdn.prod.website-files.com/64dcd735afbf93965ff9356b/64e22c5a3e1459ad41569f7b_Fitr%20logo%20%40%203x.png"
      loading="lazy"
      width="182"
      sizes="182px"
      alt=""
      srcSet="https://cdn.prod.website-files.com/64dcd735afbf93965ff9356b/64e22c5a3e1459ad41569f7b_Fitr%20logo%20%40%203x-p-500.png 500w, https://cdn.prod.website-files.com/64dcd735afbf93965ff9356b/64e22c5a3e1459ad41569f7b_Fitr%20logo%20%40%203x.png 930w"
      className="navbar2_logo"
    />
  </div>
);

const VW = 800,
  VH = 510;
const ML = 54,
  MR = 14,
  MT = 14,
  MB = 44;
const MW = VW - ML - MR;
const MH = VH - MT - MB;
const CX = ML + MW / 2;
const CY = MT + MH / 2;

interface PosStyle {
  left: string;
  top: string;
}

interface Competitor {
  name: string;
  Icon: () => React.ReactElement;
  mx: number;
  my: number;
  desc: string;
}

type AxisX = "tracking" | "decision";
type AxisY = "data" | "female";

interface ActiveAxes {
  x: AxisX;
  y: AxisY;
}

function pos(mx: number, my: number): PosStyle {
  return {
    left: `${(((ML + mx * MW) / VW) * 100).toFixed(2)}%`,
    top: `${(((MT + (1 - my) * MH) / VH) * 100).toFixed(2)}%`,
  };
}

const COMPETITORS: Competitor[] = [
  { name: "WHOOP", Icon: IcWHOOP, mx: 0.17, my: 0.26, desc: "Recovery & strain wearable" },
  { name: "Oura", Icon: IcOura, mx: 0.06, my: 0.1, desc: "Sleep & readiness ring tracker" },
  { name: "Catapult", Icon: IcCatapult, mx: 0.63, my: 0.18, desc: "GPS load tracking for teams" },
  { name: "Kitman Labs", Icon: IcKitman, mx: 0.7, my: 0.47, desc: "Load & injury analytics platform" },
  { name: "FitrWoman", Icon: IcFitrWoman, mx: 0.19, my: 0.77, desc: "Cycle tracking for female athletes" },
];

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay },
});

function getAxes(mx: number, my: number): ActiveAxes {
  return {
    x: mx < 0.5 ? "tracking" : "decision",
    y: my < 0.5 ? "data" : "female",
  };
}

export default function ProblemSection() {
  const [activeAxes, setActiveAxes] = useState<ActiveAxes | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section className="w-full bg-white py-28 px-6" aria-labelledby="matrix-headline">
      <div className="max-w-[860px] mx-auto">
        <motion.p
          {...inView(0)}
          className="text-center text-[11px] font-semibold tracking-[0.14em] uppercase text-[#9CA3AF] mb-5"
        >
          The Load Management Landscape
        </motion.p>

        <motion.h2
          {...inView(0.07)}
          id="matrix-headline"
          className="text-center font-bold tracking-[-0.03em] text-[#111318] leading-[1.13] mb-5"
          style={{ fontSize: "clamp(24px, 3.4vw, 40px)" }}
        >
          The only decision intelligence system
          <br />
          built for women's sport
        </motion.h2>

        <motion.p
          {...inView(0.13)}
          className="text-center text-[15px] leading-[1.65] text-[#6B7280] max-w-[460px] mx-auto mb-14"
        >
          Avail transforms physiological variability into clear, actionable
          training decisions.
        </motion.p>

        <motion.div
          {...inView(0.2)}
          className="relative w-full select-none"
          style={{ aspectRatio: `${VW} / ${VH}` }}
        >
          <svg
            className="absolute inset-0 w-full h-full overflow-visible"
            viewBox={`0 0 ${VW} ${VH}`}
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
          >
            <defs>
              <pattern id="matrixDots" width="26" height="26" patternUnits="userSpaceOnUse">
                <circle cx="13" cy="13" r="1.1" fill="rgba(0,0,0,0.13)" />
              </pattern>
              <radialGradient id="availQuad" cx="75%" cy="30%" r="55%">
                <stop offset="0%" stopColor="rgba(116,199,167,0.08)" />
                <stop offset="100%" stopColor="rgba(116,199,167,0)" />
              </radialGradient>
            </defs>

            <rect x={ML} y={MT} width={MW} height={MH} fill="url(#matrixDots)" />
            <rect
              x={CX}
              y={MT}
              width={ML + MW - CX}
              height={CY - MT}
              fill="url(#availQuad)"
            />

            <line x1={ML} y1={CY} x2={ML + MW - 2} y2={CY} stroke="#D1D5DB" strokeWidth="1" />
            <path
              d={`M ${ML + MW - 9} ${CY - 4} L ${ML + MW} ${CY} L ${ML + MW - 9} ${CY + 4}`}
              fill="none"
              stroke="#C4CAD3"
              strokeWidth="1.1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <line x1={CX} y1={MT + MH} x2={CX} y2={MT + 2} stroke="#D1D5DB" strokeWidth="1" />
            <path
              d={`M ${CX - 4} ${MT + 9} L ${CX} ${MT} L ${CX + 4} ${MT + 9}`}
              fill="none"
              stroke="#C4CAD3"
              strokeWidth="1.1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <text
              x={ML + MW * 0.25}
              y={VH - 10}
              textAnchor="middle"
              fontSize="9.5"
              fill={activeAxes?.x === "tracking" ? "#1A7A55" : "#B8BEC8"}
              fontFamily="Inter, system-ui, sans-serif"
              fontWeight={activeAxes?.x === "tracking" ? "700" : "600"}
              letterSpacing="0.07em"
            >
              Tracking
            </text>
            <text
              x={ML + MW * 0.75}
              y={VH - 10}
              textAnchor="middle"
              fontSize="9.5"
              fill={activeAxes?.x === "decision" ? "#1A7A55" : "#B8BEC8"}
              fontFamily="Inter, system-ui, sans-serif"
              fontWeight={activeAxes?.x === "decision" ? "700" : "600"}
              letterSpacing="0.07em"
            >
              Decision Integration
            </text>

            <text
              transform={`rotate(-90, 20, ${MT + MH * 0.74})`}
              x="20"
              y={MT + MH * 0.74 + 4}
              textAnchor="middle"
              fontSize="9.5"
              fill={activeAxes?.y === "data" ? "#1A7A55" : "#B8BEC8"}
              fontFamily="Inter, system-ui, sans-serif"
              fontWeight={activeAxes?.y === "data" ? "700" : "600"}
              letterSpacing="0.07em"
            >
              Data Collection
            </text>
            <text
              transform={`rotate(-90, 20, ${MT + MH * 0.26})`}
              x="20"
              y={MT + MH * 0.26 + 4}
              textAnchor="middle"
              fontSize="9.5"
              fill={activeAxes?.y === "female" ? "#1A7A55" : "#B8BEC8"}
              fontFamily="Inter, system-ui, sans-serif"
              fontWeight={activeAxes?.y === "female" ? "700" : "600"}
              letterSpacing="0.07em"
            >
              FEMALE-SPECIFIC MODELS
            </text>
          </svg>

          {COMPETITORS.map(({ name, Icon, mx, my, desc }, i) => (
            <motion.div
              key={name}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
              style={pos(mx, my)}
              initial={{ opacity: 0, scale: 0.72 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.38,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.4 + i * 0.07,
              }}
              onMouseEnter={() => {
                setHoveredCard(name);
                setActiveAxes(getAxes(mx, my));
              }}
              onMouseLeave={() => {
                setHoveredCard(null);
                setActiveAxes(null);
              }}
            >
              <motion.div
                animate={
                  hoveredCard === name
                    ? {
                        scale: 1.035,
                        y: -4,
                        boxShadow: "0 10px 28px rgba(0,0,0,0.18)",
                      }
                    : {
                        scale: 1,
                        y: 0,
                        boxShadow: "0 3px 16px rgba(0,0,0,0.14)",
                      }
                }
                transition={{ duration: 0.045, ease: "linear" }}
                className="bg-white border border-[#B8C4CF] rounded-[9px] cursor-default"
                style={{ padding: "9px 12px" }}
              >
                <div className="flex items-center gap-[7px] mb-[5px]">
                  <span className="flex-shrink-0 rounded-[4px] overflow-hidden leading-none">
                    <Icon />
                  </span>
                  <span className="text-[10.5px] font-bold text-[#1E2D3D] tracking-[0.01em] leading-none whitespace-nowrap">
                    {name}
                  </span>
                </div>
                <p className="text-[9px] leading-none text-[#6B7280] whitespace-nowrap">
                  {desc}
                </p>
              </motion.div>
            </motion.div>
          ))}

          <motion.div
            className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
            style={pos(0.83, 0.92)}
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            onMouseEnter={() => {
              setHoveredCard("AVAIL");
              setActiveAxes(getAxes(0.83, 0.92));
            }}
            onMouseLeave={() => {
              setHoveredCard(null);
              setActiveAxes(null);
            }}
          >
            <div
              className="absolute -inset-[20px] rounded-[28px] pointer-events-none"
              style={{
                background: "radial-gradient(ellipse, rgba(116,199,167,0.18) 0%, transparent 65%)",
                filter: "blur(14px)",
              }}
            />
            <div
              className="absolute -inset-[6px] rounded-[20px] pointer-events-none"
              style={{
                background: "radial-gradient(ellipse, rgba(116,199,167,0.30) 0%, transparent 70%)",
                filter: "blur(5px)",
              }}
            />
            <motion.div
              animate={
                hoveredCard === "AVAIL"
                  ? {
                      scale: 1.025,
                      y: -5,
                      boxShadow:
                        "0 10px 34px rgba(111,191,158,0.42), 0 0 0 7px rgba(116,199,167,0.13), 0 1px 4px rgba(0,0,0,0.06)",
                    }
                  : {
                      scale: 1,
                      y: 0,
                      boxShadow:
                        "0 4px 30px rgba(111,191,158,0.40), 0 0 0 7px rgba(116,199,167,0.13), 0 1px 4px rgba(0,0,0,0.06)",
                    }
              }
              transition={{ duration: 0.045, ease: "linear" }}
              className="relative bg-white rounded-[16px] cursor-default"
              style={{
                width: 248,
                padding: "16px 19px",
                border: "2px solid #74c7a7",
              }}
            >
              <div className="flex items-center gap-[8px] mb-[8px]">
                <img src="/figure/logo.svg" alt="" className="flex-shrink-0" style={{ width: 22, height: 22 }} aria-hidden="true" />
                <span className="text-[16px] font-bold text-[#1A7A55] tracking-[0.06em] leading-none">
                  AVAIL
                </span>
              </div>
              <p className="text-[12px] font-semibold leading-[1.5] text-[#4aaa82]">
                Cycle-aware load intelligence
                <br />
                for elite women's sport
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
