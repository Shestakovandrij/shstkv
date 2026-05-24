'use client';

import { useEffect, useState } from 'react';

type State = {
  direction: 'up' | 'down';
  atTop: boolean;
};

export function useScrollDirection(threshold = 8): State {
  const [state, setState] = useState<State>({ direction: 'up', atTop: true });

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const y = window.scrollY;
        const diff = y - lastY;
        const nextAtTop = y < 24;

        if (Math.abs(diff) >= threshold) {
          const nextDir: 'up' | 'down' = diff > 0 ? 'down' : 'up';
          setState((prev) =>
            prev.direction === nextDir && prev.atTop === nextAtTop
              ? prev
              : { direction: nextDir, atTop: nextAtTop },
          );
          lastY = y;
        } else if (state.atTop !== nextAtTop) {
          setState((prev) => ({ ...prev, atTop: nextAtTop }));
        }

        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [threshold]);

  return state;
}
