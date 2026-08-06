import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Ignore initial mount/reload so browser retains current scroll position (e.g. Gallery, Services, About)
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // Scroll to top only when user navigates to a new page route
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
