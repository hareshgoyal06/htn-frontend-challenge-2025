import React from "react";

interface Layer {
  src: string;
  zIndex: number;
  speed: number;
  offsetY?: string;
}

const layers: Layer[] = [
  { src: "/images/layer6.png", zIndex: 1, speed: 90 },
  { src: "/images/layer5.png", zIndex: 2, speed: 84 },
  { src: "/images/layer4.png", zIndex: 3, speed: 75, offsetY: "30px" },
  { src: "/images/layer3.png", zIndex: 4, speed: 74, offsetY: "50px" },
  { src: "/images/layer2.png", zIndex: 5, speed: 70, offsetY: "50px" },
  { src: "/images/layer1.png", zIndex: 6, speed: 63 },
];

const ParallaxScroll: React.FC = () => {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black">
      {layers.map((layer, index) => (
        <div
          key={index}
          className="absolute left-0 w-[300%] h-full flex"
          style={{
            zIndex: layer.zIndex,
            animation: `scrollLeft ${layer.speed}s linear infinite`,
          }}
        >
          {/* First Layer */}
          <div
            className="w-1/3 h-full relative"
            style={{
              backgroundImage: `url(${layer.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              top: layer.offsetY || "0px",
            }}
          />
          {/* Mirrored Layer (Flipped for Symmetry) */}
          <div
            className="w-1/3 h-full relative"
            style={{
              backgroundImage: `url(${layer.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              transform: "scaleX(-1)",
              top: layer.offsetY || "0px",
            }}
          />
          {/* Extra Duplicate for Seamless Scrolling */}
          <div
            className="w-1/3 h-full relative"
            style={{
              backgroundImage: `url(${layer.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              top: layer.offsetY || "0px",
            }}
          />
        </div>
      ))}
      {/* Smooth Auto-Scroll Animation */}
      <style>
        {`
          @keyframes scrollLeft {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-66.66%);
            }
          }
        `}
      </style>
    </div>
  );
};

export default ParallaxScroll;
