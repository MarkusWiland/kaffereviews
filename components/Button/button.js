import React from "react";

export default function button({ className, active, children, size, onClick }) {
  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  );
}
