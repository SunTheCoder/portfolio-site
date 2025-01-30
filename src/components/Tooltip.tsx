'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TooltipProps {
  text: string;
  children: React.ReactNode;
  className?: string;
}

export default function Tooltip({ text, children, className = "" }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div 
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute z-50 px-2 py-1 text-sm text-white bg-gray-900 rounded-md whitespace-nowrap"
            style={{ 
              top: "100%",
              left: "50%",
              transform: "translateX(-50%)",
              marginTop: "0.5rem"
            }}
          >
            {text}
            <div 
              className="absolute w-2 h-2 bg-gray-900 rotate-45"
              style={{
                top: "-0.25rem",
                left: "50%",
                transform: "translateX(-50%)"
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 