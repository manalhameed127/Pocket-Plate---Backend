import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function LandingPage() {
  const navigate = useNavigate();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;
      const progress = Math.min(
        window.scrollY / totalHeight,
        1,
      );
      setScrollProgress(progress);

      if (progress > 0.75) {
        setTimeout(() => {
          window.scrollTo(0, 0);
          navigate("/home");
        }, 600);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, [navigate]);

  const scale = 1 + scrollProgress * 4.5;
  const opacity =
    scrollProgress < 0.55
      ? 1
      : Math.max(0, 1 - (scrollProgress - 0.55) / 0.2);
  const tummyScale =
    scrollProgress > 0.45
      ? Math.min((scrollProgress - 0.45) / 0.3, 1)
      : 0;

  return (
    <div className="relative" style={{ height: "300vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden bg-gradient-to-b from-[#D6EEF8] via-[#E8F4F8] to-[#F0F8FC]">
        {/* Top Brand */}
        <div
          className="absolute top-7 left-1/2 -translate-x-1/2 text-center z-10 flex flex-col items-center gap-1.5"
          style={{
            opacity: Math.max(0, 1 - scrollProgress * 6),
          }}
        >
          <div className="text-2xl md:text-3xl font-serif font-semibold text-[#1A1A2E] tracking-tight">
            Pocket<span className="text-[#FF6B35]">Plate</span>
          </div>
          <div className="text-xs md:text-sm text-[#4A4560] font-semibold tracking-wide">
            AI-powered budget food ordering
          </div>
        </div>

        {/* Scroll Hint */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
          style={{
            opacity: Math.max(0, 1 - scrollProgress * 8),
          }}
        >
          <span className="text-[10px] font-extrabold tracking-[0.18em] uppercase text-[#4A4560]/50">
            scroll
          </span>
          <div className="w-0.5 h-9 bg-gradient-to-b from-[#4A4560]/40 to-transparent animate-pulse" />
        </div>

        {/* Baymax SVG */}
        <div
          className="absolute inset-0 flex items-center justify-center z-[3] pointer-events-none"
          style={{ opacity }}
        >
          <svg
            className="w-[340px] max-w-[70vw] h-auto drop-shadow-2xl transition-transform duration-100"
            style={{
              transform: `scale(${scale}) translateY(-${scrollProgress * 18}%)`,
              transformOrigin: "50% 63%",
            }}
            viewBox="0 0 400 520"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Shadow */}
            <ellipse
              cx="200"
              cy="510"
              rx="90"
              ry="10"
              fill="rgba(0,80,120,0.1)"
            />

            {/* Body */}
            <rect
              x="62"
              y="210"
              width="276"
              height="260"
              rx="80"
              fill="#F5F5F5"
            />
            <ellipse
              cx="200"
              cy="225"
              rx="100"
              ry="22"
              fill="white"
              opacity="0.6"
            />
            <path
              d="M 200 212 Q 198 340 200 468"
              fill="none"
              stroke="#E0E0E0"
              strokeWidth="1.5"
              strokeDasharray="4,5"
            />
            <path
              d="M 80 335 Q 200 325 320 335"
              fill="none"
              stroke="#E0E0E0"
              strokeWidth="1.2"
              strokeDasharray="4,5"
            />

            {/* Tummy Panel */}
            <rect
              x="118"
              y="258"
              width="164"
              height="140"
              rx="36"
              fill="white"
              stroke="#E8E8E8"
              strokeWidth="2"
            />
            <rect
              x="128"
              y="266"
              width="144"
              height="50"
              rx="26"
              fill="rgba(255,255,255,0.8)"
              opacity="0.5"
            />

            {/* Arms */}
            <g>
              <ellipse
                cx="44"
                cy="285"
                rx="24"
                ry="38"
                fill="#F0F0F0"
                transform="rotate(-18,44,285)"
              />
              <path
                d="M 34 268 Q 28 285 35 302"
                fill="none"
                stroke="#E0E0E0"
                strokeWidth="1.5"
              />
              <ellipse
                cx="26"
                cy="322"
                rx="19"
                ry="28"
                fill="#F0F0F0"
                transform="rotate(-10,26,322)"
              />
              <ellipse
                cx="18"
                cy="348"
                rx="16"
                ry="14"
                fill="#EBEBEB"
              />
              <path
                d="M 10 343 Q 14 338 18 343"
                fill="none"
                stroke="#D8D8D8"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
              <path
                d="M 18 340 Q 22 335 26 340"
                fill="none"
                stroke="#D8D8D8"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </g>
            <g>
              <ellipse
                cx="356"
                cy="285"
                rx="24"
                ry="38"
                fill="#F0F0F0"
                transform="rotate(18,356,285)"
              />
              <path
                d="M 366 268 Q 372 285 365 302"
                fill="none"
                stroke="#E0E0E0"
                strokeWidth="1.5"
              />
              <ellipse
                cx="374"
                cy="322"
                rx="19"
                ry="28"
                fill="#F0F0F0"
                transform="rotate(10,374,322)"
              />
              <ellipse
                cx="382"
                cy="348"
                rx="16"
                ry="14"
                fill="#EBEBEB"
              />
              <path
                d="M 374 343 Q 378 338 382 343"
                fill="none"
                stroke="#D8D8D8"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
              <path
                d="M 382 340 Q 386 335 390 340"
                fill="none"
                stroke="#D8D8D8"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </g>

            {/* Legs */}
            <ellipse
              cx="152"
              cy="478"
              rx="30"
              ry="18"
              fill="#EBEBEB"
            />
            <ellipse
              cx="148"
              cy="488"
              rx="34"
              ry="13"
              fill="#E4E4E4"
            />
            <ellipse
              cx="248"
              cy="478"
              rx="30"
              ry="18"
              fill="#EBEBEB"
            />
            <ellipse
              cx="252"
              cy="488"
              rx="34"
              ry="13"
              fill="#E4E4E4"
            />

            {/* Head */}
            <ellipse
              cx="200"
              cy="175"
              rx="86"
              ry="76"
              fill="#F5F5F5"
            />
            <ellipse
              cx="200"
              cy="140"
              rx="52"
              ry="28"
              fill="white"
              opacity="0.55"
            />
            <path
              d="M 130 212 Q 200 200 270 212"
              fill="none"
              stroke="#E4E4E4"
              strokeWidth="2"
            />

            {/* Face */}
            <ellipse
              cx="170"
              cy="168"
              rx="13"
              ry="11"
              fill="#1A1A1A"
            />
            <ellipse
              cx="230"
              cy="168"
              rx="13"
              ry="11"
              fill="#1A1A1A"
            />
            <circle cx="176" cy="163" r="3.5" fill="white" />
            <circle cx="236" cy="163" r="3.5" fill="white" />
            <path
              d="M 182 192 Q 200 196 218 192"
              fill="none"
              stroke="#1A1A1A"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Body seams */}
            <path
              d="M 65 295 Q 60 340 70 390"
              fill="none"
              stroke="#E0E0E0"
              strokeWidth="1.2"
              strokeDasharray="3,5"
            />
            <path
              d="M 335 295 Q 340 340 330 390"
              fill="none"
              stroke="#E0E0E0"
              strokeWidth="1.2"
              strokeDasharray="3,5"
            />
          </svg>
        </div>

        {/* Tummy Fill Effect */}
        {tummyScale > 0 && (
          <div
            className="absolute rounded-full bg-white pointer-events-none z-[5]"
            style={{
              width: `${tummyScale * 3000}px`,
              height: `${tummyScale * 3000}px`,
              left: "50%",
              top: "63%",
              transform: "translate(-50%, -50%)",
              opacity: 1,
            }}
          />
        )}
      </div>
    </div>
  );
}