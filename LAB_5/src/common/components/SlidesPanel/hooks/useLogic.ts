import { useState, useEffect } from 'react';
import { Slide } from '../../../../store/types/presentation';

export function useSlidesLogic(slides: Slide[], onSlidesReorder?: (newOrder: Slide[]) => void) {
  const [localSlides, setLocalSlides] = useState(slides);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  useEffect(() => {
    setLocalSlides(slides);
  }, [slides]);

  const handleDragStart = (index: number) => setDragIndex(index);
  const handleDragEnter = (index: number) => setHoverIndex(index);
  const handleDragEnd = () => {
    if (dragIndex !== null && hoverIndex !== null && dragIndex !== hoverIndex) {
      const updated = [...localSlides];
      const [removed] = updated.splice(dragIndex, 1);
      updated.splice(hoverIndex, 0, removed);
      setLocalSlides(updated);
      if (onSlidesReorder) onSlidesReorder(updated);
    }
    setDragIndex(null);
    setHoverIndex(null);
  };

  const noop = () => {};
  const noopChange = () => {};

  return {
    localSlides,
    hoverIndex,
    handleDragStart,
    handleDragEnter,
    handleDragEnd,
    setLocalSlides,
    noop,
    noopChange,
  };
}
