import React from 'react';

// A simple non-3D replacement component
const SimpleBlackHole = () => {
  return (
    <div className="w-full h-full rounded-full overflow-hidden relative">
      {/* Black hole effect using CSS */}
      <div className="absolute inset-0 bg-black rounded-full">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 opacity-50 animate-spin-slow"></div>
        <div className="absolute inset-[15%] rounded-full bg-black border-4 border-purple-500/30"></div>
        <div className="absolute inset-[40%] rounded-full bg-gradient-to-br from-purple-900/50 to-black"></div>
      </div>
    </div>
  );
};

export default SimpleBlackHole;