import React, { useState } from "react";
import { Button as PixelButton } from "pixel-retroui";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const CustomButton: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = "",
}) => {
  const [showCoin, setShowCoin] = useState(false);

  const handleClick = () => {
    setShowCoin(true); // Show the coin

    // Keep coin visible for 1 second before hiding
    setTimeout(() => {
      setShowCoin(false);
    }, 1000);

    if (onClick) {
      setTimeout(() => {
        onClick(); // Ensure login toggle happens **after** the coin animation
      }, 500); // Delay state change to prevent re-render from hiding the coin early
    }
  };

  return (
    <div className="relative flex flex-col items-center">
      {/* Coin Icon (Visible only when showCoin is true) */}
      {showCoin && (
        <i className="nes-icon coin is-large absolute -top-16 animate-bounce transition-opacity duration-300"></i>
      )}

      {/* Button */}
      <PixelButton
        onClick={handleClick}
        type="button"
        className={`nes-btn is-primary ${className}`}
      >
        {children}
      </PixelButton>
    </div>
  );
};

export default CustomButton;
