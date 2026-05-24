'use client';

import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

const defaultVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'section' | 'article' | 'header' | 'footer';
};

export function ScrollReveal({ children, delay = 0, className, as = 'div' }: Props) {
  const Comp = motion[as];
  return (
    <Comp
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      variants={defaultVariants}
      className={className}
    >
      {children}
    </Comp>
  );
}
