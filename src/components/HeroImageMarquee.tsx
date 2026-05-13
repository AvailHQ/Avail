import { motion } from "framer-motion";

const images = [
  { src: "/figure/swim.png", alt: "Swimmer training in a pool" },
  { src: "/figure/tennis.png", alt: "Female tennis player training" },
  { src: "/figure/football.png", alt: "Female football player training" },
  { src: "/figure/ice_hockey.png", alt: "Female ice hockey player training" },
  { src: "/figure/running.png", alt: "Female runner training on a track" },
  {
    src: "/figure/cricket.png",
    alt: "Female cricket player training on a track",
  },
];

function ImageSet({ hidden = false }: { hidden?: boolean }) {
  return (
    <div
      className="flex shrink-0 gap-4 px-2 sm:gap-5 sm:px-2.5 wide:gap-6 wide:px-3"
      aria-hidden={hidden}
    >
      {images.map((image) => (
        <figure
          key={`${hidden ? "clone" : "primary"}-${image.src}`}
          className="h-[150px] w-[266px] shrink-0 overflow-hidden rounded-[10px] border border-white/70 bg-white shadow-[0_16px_44px_rgba(24,42,52,0.14)] sm:h-[190px] sm:w-[337px] hero:h-[220px] hero:w-[391px] wide:h-[260px] wide:w-[462px]"
        >
          <img
            src={image.src}
            alt={hidden ? "" : image.alt}
            className="h-full w-full object-cover saturate-[1.04] contrast-[1.02]"
            draggable={false}
          />
        </figure>
      ))}
    </div>
  );
}

export default function HeroImageMarquee() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.55 }}
      className="relative mt-12 w-screen overflow-hidden sm:mt-14 wide:mt-16"
      aria-label="Athlete training image carousel"
    >
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white via-white/85 to-transparent sm:w-36"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white via-white/85 to-transparent sm:w-36"
        aria-hidden="true"
      />

      <div className="hero-image-marquee flex w-max">
        <ImageSet />
        <ImageSet hidden />
      </div>
    </motion.div>
  );
}
