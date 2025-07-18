// src/components/NavbarDropdownList.jsx
"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export default function NavbarDropdownList_({ title_, links_ = [] }) {
  const [open_, setOpen] = useState(false);
  const ref_ = useRef(null);
  const timeoutRef_ = useRef(null);
  const [isTouch_, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0);

    const handleClickOutside_ = (e) => {
      if (ref_.current && !ref_.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside_);
    return () => document.removeEventListener("mousedown", handleClickOutside_);
  }, []);

  const handleMouseEnter_ = () => {
    if (!isTouch_) {
      clearTimeout(timeoutRef_.current);
      setOpen(true);
    }
  };

  const handleMouseLeave_ = () => {
    if (!isTouch_) {
      timeoutRef_.current = setTimeout(() => setOpen(false), 100);
    }
  };

  const handleButtonClick_ = () => {
    if (isTouch_) {
      setOpen((prev) => !prev);
    }
  };

  return (
    <div
      className="relative group"
      ref={ref_}
      onMouseEnter={handleMouseEnter_}
      onMouseLeave={handleMouseLeave_}
    >
      {/* Botón del menú */}
      <button
        className="text-white hover:bg-blue-600 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
        tabIndex={0}
        aria-haspopup="true"
        aria-expanded={open_}
        onClick={handleButtonClick_}
      >
        {title_} ▾
      </button>

      {/* Lista desplegable */}
      {open_ && (
        <div className="absolute right-0 mt-2 w-48 bg-white text-sm text-gray-800 rounded-md shadow-lg z-50 py-2">
          {links_.map(({ label_, href_ }) => (
            <Link
              key={href_}
              href={href_}
              className="block px-4 py-2 hover:bg-blue-100 transition"
              onClick={() => setOpen(false)}
            >
              {label_}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
