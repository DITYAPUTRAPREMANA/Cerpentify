import React from "react";
import abc from "../assets/abc.png";
import globe from "../assets/globe.png";
import shape1 from "../assets/shape1.png";
import shape2 from "../assets/shape2.png";
import shape3 from "../assets/shape3.png";
import computer from "../assets/computer.png";
import cat from "../assets/cat.png";

const icons = [
  { src: computer, alt: "computer icon", style: "top-[10%] left-[10%]", size: 100 },
  { src: abc, alt: "abc icon", style: "top-[15%] left-[30%]", size: 100 },
  { src: globe, alt: "globe icon", style: "top-[17%] left-[90%]", size: 100},
  { src: shape1, alt: "shape1 icon", style: "bottom-[15%] left-[30%]", size: 100 },
  { src: globe, alt: "globe icon", style: "bottom-[10%] right-[10%]", size: 100 },
  { src: computer, alt: "computer icon", style: "bottom-[20%] right-[5%]", size: 100 },
  { src: shape2, alt: "shape2 icon", style: "top-[10%] right-[10%]", size: 100 },
  { src: abc, alt: "abc icon", style: "bottom-[25%] left-[15%]", size: 100 },
  { src: shape3, alt: "shape3 icon", style: "top-[35%] right-[15%]", size: 100 },
  { src: cat, alt: "cat icon", style: "bottom-[10%] right-[40%]", size: 100 },
];

const squiggles = [
];

export default function BackgroundPattern() {
  return (
    <div className="absolute inset-0 w-full min-h-screen bg-[#FCEEED] overflow-hidden -z-10">
      {/* Background Icons */}
      {icons.map((icon, idx) => (
        <img
          key={idx}
          src={icon.src}
          alt={icon.alt}
          className={`absolute ${icon.style}`}
          style={{ width: icon.size, height: icon.size }}
        />
      ))}

      {/* Decorative Squiggles */}
      {squiggles.map((item, index) => (
        <div
          key={index}
          className={`absolut w-16 h-1 bg-purple-400 rotate-12 rounded-full ${item.style}`}
        />
      ))}
    </div>
  );
}
