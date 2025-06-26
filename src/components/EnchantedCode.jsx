import React, { useState, useEffect, useRef } from 'react';

const EnchantedCode = ({ 
  code, 
  className, 
  isAbsolute = false,
  position = {} 
}) => {
  const [displayedCode, setDisplayedCode] = useState(code);
  const originalCode = useRef(code);
  const intervalRef = useRef(null);
  const timeoutRefs = useRef([]);
  
  // Pool of characters to use for substitution
  const substitutionChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?/';
  
  // Function to get a random character from the pool
  const getRandomChar = () => {
    return substitutionChars.charAt(Math.floor(Math.random() * substitutionChars.length));
  };
  
  // Function to get a random index from the code
  const getRandomIndex = (text) => {
    // Skip whitespace and line breaks
    const validIndices = [];
    for (let i = 0; i < text.length; i++) {
      if (text[i] !== ' ' && text[i] !== '\n' && text[i] !== '\t') {
        validIndices.push(i);
      }
    }
    
    if (validIndices.length === 0) return -1;
    return validIndices[Math.floor(Math.random() * validIndices.length)];
  };
  
  // Function to substitute characters at random positions
  const glitchText = () => {
    // Clear any existing timeouts
    timeoutRefs.current.forEach(timeout => clearTimeout(timeout));
    timeoutRefs.current = [];
    
    // Get current code
    const currentCode = originalCode.current;
    
    // Number of characters to substitute - between 3 and 7% of the code length (increased from 1-5%)
    const numToSubstitute = Math.max(3, Math.floor(Math.random() * (currentCode.length * 0.07)));
    
    // Create a copy of the original code
    let newCode = currentCode;
    
    // Keep track of substituted indices
    const substitutedIndices = [];
    
    // Substitute characters
    for (let i = 0; i < numToSubstitute; i++) {
      // Get a random index that hasn't been substituted yet
      let index;
      do {
        index = getRandomIndex(currentCode);
      } while (index === -1 || substitutedIndices.includes(index));
      
      substitutedIndices.push(index);
      
      // Substitute the character
      newCode = newCode.substring(0, index) + getRandomChar() + newCode.substring(index + 1);
    }
    
    // Update the displayed code
    setDisplayedCode(newCode);
    
    // Schedule reversion of each substituted character
    substitutedIndices.forEach((index, i) => {
      // Revert after a random delay between 50ms and 200ms (reduced from 100-500ms)
      const timeout = setTimeout(() => {
        setDisplayedCode(prevCode => {
          return prevCode.substring(0, index) + currentCode[index] + prevCode.substring(index + 1);
        });
      }, 50 + Math.random() * 150);
      
      timeoutRefs.current.push(timeout);
    });
  };
  
  useEffect(() => {
    // Update original code ref if code prop changes
    originalCode.current = code;
    setDisplayedCode(code);
  }, [code]);
  
  useEffect(() => {
    // Start the glitching effect
    intervalRef.current = setInterval(() => {
      glitchText();
      // Random interval between 300ms and 1000ms (reduced from 1000-3000ms)
    }, 200 + Math.random() * 300);
    
    return () => {
      // Clean up on unmount
      clearInterval(intervalRef.current);
      timeoutRefs.current.forEach(timeout => clearTimeout(timeout));
    };
  }, []);
  
  // Determine the full className
  const preClassName = isAbsolute 
    ? `${className} absolute ${Object.entries(position).map(([key, value]) => `${key}-${value}`).join(' ')}`
    : className;
  
  return (
    <pre className={preClassName}>
      <code>{displayedCode}</code>
    </pre>
  );
};

export default EnchantedCode;