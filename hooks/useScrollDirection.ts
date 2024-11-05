// hooks/useScrollDirection.js
import { useEffect, useState } from "react";

export default function useScrollDirection(onHide,isFilterOpen) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.scrollY;
		if (!isFilterOpen) {
		  if (currentPosition > 55 && currentPosition > scrollPosition) {
			setVisible(false);
			//document.body.style.overflow = "auto"; // Включить скролл
			if (onHide) onHide(); // Вызываем onHide, если оно передано
		  } else if (currentPosition < scrollPosition || currentPosition <= 55) {
			setVisible(true);
			//document.body.style.overflow = "hidden"; // Отключить скролл
		  }

		  setScrollPosition(currentPosition);
		}
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollPosition, onHide]);

  return visible;
}
