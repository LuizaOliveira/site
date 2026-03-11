'use client';

import { FC } from 'react';

interface AnimatedTextWithColorProps {
  text: string;
  highlightText: string;
  className?: string;
  highlightClassName?: string;
  delay?: number;
}

export const AnimatedTextWithColor: FC<AnimatedTextWithColorProps> = ({
  text,
  highlightText,
  className = '',
  highlightClassName = '',
}) => {
  return (
    <h2 className={className}>
      {text} <span className={highlightClassName}>{highlightText}</span>
    </h2>
  );
};
