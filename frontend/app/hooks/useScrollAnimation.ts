import { useEffect, useRef, MutableRefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface UseScrollAnimationOptions {
  onEnter?: () => void;
  onLeave?: () => void;
  onEnterBack?: () => void;
  onLeaveBack?: () => void;
  threshold?: number;
}

export function useScrollAnimation(
  elementRef: MutableRefObject<HTMLElement | null>,
  options: UseScrollAnimationOptions = {}
) {
  const {
    onEnter,
    onLeave,
    onEnterBack,
    onLeaveBack,
    threshold = 0.85
  } = options;

  const triggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    // Criar o ScrollTrigger
    const trigger = ScrollTrigger.create({
      trigger: elementRef.current,
      start: `top ${threshold * 100}%`,
      onEnter: () => onEnter?.(),
      onLeave: () => onLeave?.(),
      onEnterBack: () => onEnterBack?.(),
      onLeaveBack: () => onLeaveBack?.(),
    });

    triggerRef.current = trigger;

    return () => {
      if (triggerRef.current) {
        triggerRef.current.kill();
      }
    };
  }, [threshold, onEnter, onLeave, onEnterBack, onLeaveBack]);

  return triggerRef;
}
