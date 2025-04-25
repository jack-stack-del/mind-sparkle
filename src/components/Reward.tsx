
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

const Reward = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Trigger confetti
    const duration = 2000;
    const end = Date.now() + duration;

    const confettiColors = ["#FFD0D0", "#D0FFD0", "#D0D0FF"];

    (function frame() {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: confettiColors
      });
      
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: confettiColors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());

    // Hide the reward after 4 seconds
    const timer = setTimeout(() => {
      setVisible(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      <div className="peach-gradient text-white px-8 py-4 rounded-lg shadow-lg animate-bounce">
        <h3 className="text-xl font-bold">New High Score! 🏆</h3>
        <p>Congratulations! Keep it up!</p>
      </div>
    </div>
  );
};

export default Reward;
