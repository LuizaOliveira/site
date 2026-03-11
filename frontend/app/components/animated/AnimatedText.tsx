'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap-trial/SplitText';:

interface AnimatedTextProps {
  children: string;
  className?: string;
  delay?: number;
  animationType?: 'chars' | 'words' | 'lines';
}

export function AnimatedText({ 
  children, 
  className = '', 
  delay = 0,
  animationType = 'chars' 
}: AnimatedTextProps) {
  const textRef = useRef<HTMLDivElement>(null);
  const splitRef = useRef<SplitText | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(SplitText);
    }
  }, []);

  useEffect(() => {
    if (!textRef.current) return;

    // Create split text
    splitRef.current = new SplitText(textRef.current, { type: 'chars,words,lines' });

    // Animate based on type
    if (animationType === 'chars') {
      gsap.from(splitRef.current.chars, {
        x: 150,
        opacity: 0,
        duration: 0.7,
        ease: 'power4',
        stagger: 0.04,
        delay: delay,
      });
    } else if (animationType === 'words') {
      gsap.from(splitRef.current.words, {
        y: -100,
        opacity: 0,
        rotation: 'random(-80, 80)',
        duration: 0.7,
        ease: 'back',
        stagger: 0.15,
        delay: delay,
      });
    } else if (animationType === 'lines') {
      gsap.from(splitRef.current.lines, {
        rotationX: -100,
        transformOrigin: '50% 50% -160px',
        opacity: 0,
        duration: 0.8,
        ease: 'power3',
        stagger: 0.25,
        delay: delay,
      });
    }

    // Cleanup
    return () => {
      if (splitRef.current) {
        splitRef.current.revert();
      }
    };
  }, [children, delay, animationType]);

  return (
    <div ref={textRef} className={className} style={{ perspective: '500px' }}>
      {children}
    </div>
  );
}
