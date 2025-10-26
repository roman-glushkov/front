import React, { useState, useEffect } from 'react';
import { Slide } from '../../../../store/types/presentation';

interface UseSlidesLogicArgs {
  slides: Slide[];
  selectedSlideIds: string[];
  setSelectedSlideIds: React.Dispatch<React.SetStateAction<string[]>>;
  onSlidesReorder?: (newOrder: Slide[]) => void;
}

export function useSlidesLogic({
  slides,
  selectedSlideIds,
  setSelectedSlideIds,
  onSlidesReorder,
}: UseSlidesLogicArgs) {
  const [localSlides, setLocalSlides] = useState(slides);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  useEffect(() => {
    setLocalSlides(slides);
  }, [slides]);

  const handleDragStart = (index: number) => {
    const slideId = localSlides[index].id;
    if (!selectedSlideIds.includes(slideId)) {
      setSelectedSlideIds([slideId]);
    }
    setDragIndex(index);
  };

  const handleDragEnter = (index: number) => setHoverIndex(index);

  const handleDragEnd = () => {
    if (dragIndex === null || hoverIndex === null) {
      setDragIndex(null);
      setHoverIndex(null);
      return;
    }

    let updated = [...localSlides];

    // если drag начался с выделенного слайда — перемещаем всю группу
    const selectedIndexes = updated
      .map((s, i) => (selectedSlideIds.includes(s.id) ? i : -1))
      .filter((i) => i !== -1);

    if (selectedIndexes.includes(dragIndex)) {
      const draggedSlides = selectedIndexes.map((i) => updated[i]);
      updated = updated.filter((_, i) => !selectedIndexes.includes(i));
      updated.splice(hoverIndex, 0, ...draggedSlides);
    } else {
      const [removed] = updated.splice(dragIndex, 1);
      updated.splice(hoverIndex, 0, removed);
    }

    setLocalSlides(updated);
    onSlidesReorder?.(updated);

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
