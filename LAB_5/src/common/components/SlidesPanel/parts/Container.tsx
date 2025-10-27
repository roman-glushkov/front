import React from 'react';
import { Slide } from '../../../../store/types/presentation';
import { SlideRow } from './Row';

interface Props {
  slides: Slide[];
  hoverIndex: number | null;
  selectedSlideId: string;
  scale: number;
  onSlideClick: (slideId: string, index: number) => void;
  handleDragStart: (index: number) => void;
  handleDragEnter: (index: number) => void;
  handleDragEnd: () => void;
  noop: () => void;
  noopChange: () => void;
}

export default function SlidesContainer({
  slides,
  hoverIndex,
  selectedSlideId,
  scale,
  onSlideClick,
  handleDragStart,
  handleDragEnter,
  handleDragEnd,
  noop,
  noopChange,
}: Props) {
  return (
    <div className="slides-container">
      {slides.map((slide, i) => (
        <SlideRow
          key={slide.id}
          slide={slide}
          index={i}
          scale={scale}
          selected={selectedSlideId === slide.id}
          hovered={i === hoverIndex}
          onClick={() => onSlideClick(slide.id, i)}
          onDragStart={() => handleDragStart(i)}
          onDragEnter={() => handleDragEnter(i)}
          onDragEnd={handleDragEnd}
          noop={noop}
          noopChange={noopChange}
        />
      ))}
    </div>
  );
}
