
import { useEffect, useState } from "react";

const BrainAnimation = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className={`absolute inset-0 rounded-full bg-primary/10 transition-all duration-1000 ${animate ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`} />
      <div className="relative z-10">
        <svg 
          viewBox="0 0 512 512" 
          className={`w-full h-auto transition-all duration-1000 text-primary ${animate ? 'opacity-100' : 'opacity-0'}`}
          fill="currentColor"
        >
          <path d="M208 96a48 48 0 1 0 96 0 48 48 0 1 0-96 0zM320 256a64 64 0 1 0 0-128 64 64 0 1 0 0 128zM192 256a64 64 0 1 0 0-128 64 64 0 1 0 0 128zM384 384a64 64 0 1 0 0-128 64 64 0 1 0 0 128zM128 384a64 64 0 1 0 0-128 64 64 0 1 0 0 128zM256 512a64 64 0 1 0 0-128 64 64 0 1 0 0 128zM256 384a32 32 0 1 1 0-64 32 32 0 1 1 0 64z" />
        </svg>
      </div>
    </div>
  );
};

export default BrainAnimation;
