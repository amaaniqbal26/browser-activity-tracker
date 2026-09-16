import React from "react";

/**
 * Simple reusable Card component
 * Props:
 *  - children: content inside the card
 *  - className: extra Tailwind classes to customize spacing/width/etc.
 */
export default function Card({ children, className = "" }) {
  return (
    <div
      className={
        "bg-white border border-[#E5E7EB] rounded-xl shadow-sm p-6 " + className
      }
    >
      {children}
    </div>
  );
}
