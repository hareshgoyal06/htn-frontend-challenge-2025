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
    if (onClick) {
      setTimeout(() => {
        onClick(); // Ensure login toggle happens **after** the coin animation
      }); // Delay state change to prevent re-render from hiding the coin early
    }
  };

  return (
    <div className="relative flex flex-col items-center">
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
