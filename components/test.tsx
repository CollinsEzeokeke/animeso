"use client"

import { motion, useScroll, useTransform } from 'framer-motion';

const TopDescentComponent = () => {
  const { scrollYProgress } = useScroll();
  
  // Reverse the scroll progress calculation
  const y = useTransform(scrollYProgress, 
    [0, 0.25, 0.75, 1], 
    ['0%', '-100%', '-100%', '0%']
  );

  return (
    <motion.div 
      style={{
        y,
        position: 'fixed',
        top: '20vh',
        left: '50%',
        translateX: '-50%',
        transition: 'y 0.3s cubic-bezier(0.33, 1, 0.68, 1)'
      }}
      className="descent-element"
    >
      <div className="p-6 bg-white rounded-lg shadow-xl">
        Scroll up to see me descend!
      </div>
    </motion.div>
  );
};

export default TopDescentComponent;
