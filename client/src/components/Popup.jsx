import React, { useState, useRef, useEffect } from "react";

export default ({ anchorRef, children, isOpen, onClose }) => {
  const popupRef = useRef(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (!isOpen || !anchorRef.current) return;

    const anchorRect = anchorRef.current.getBoundingClientRect();
    const popupHeight = popupRef.current?.offsetHeight || 0;
    const viewportHeight = window.innerHeight;
    
    const fitsBelow = anchorRect.bottom + popupHeight < viewportHeight;
    const top = fitsBelow ? anchorRect.bottom + window.scrollY : anchorRect.top - popupHeight + window.scrollY;
    
    setPosition({ top, left: anchorRect.left + window.scrollX });
  }, [isOpen, anchorRef]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target) &&
        (!anchorRef.current || !anchorRef.current.contains(event.target))
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose, anchorRef]);

  if (!isOpen) return null;

  return (
    <div 
      ref={popupRef} 
      style={{
        position: "absolute",
        top: position.top,
        left: position.left,
        backgroundColor: "var(--black1)",
        border: "1px solid black",
        padding: "8px",
        boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
        zIndex: 1000,
      }}
      // onClick={onClose}
    >
      {children}
    </div>
  );
};