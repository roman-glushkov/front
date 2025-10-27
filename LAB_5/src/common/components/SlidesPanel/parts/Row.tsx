import React from 'react';
import { Slide } from '../../../../store/types/presentation';
import { SlidePreview } from './Preview';
import { SlideNumber } from './Number';

interface Props {
  slide: Slide;
  index: number;
  scale: number;
  selected: boolean;
  hovered: boolean;
  onClick: () => void;
  onDragStart: () => void;
  onDragEnter: () => void;
  onDragEnd: () => void;
  noop: () => void;
  noopChange: () => void;
}

export function SlideRow({
  slide,
  index,
  scale,
  selected,
  hovered,
  onClick,
  onDragStart,
  onDragEnter,
  onDragEnd,
  noop,
  noopChange,
}: Props) {
  return (
    <div
      className={`slide-row ${selected ? 'selected' : ''} ${hovered ? 'hovered' : ''}`}
      draggable
      onClick={onClick}
      onDragStart={onDragStart}
      onDragEnter={onDragEnter}
      onDragEnd={onDragEnd}
    >
      <SlideNumber number={index + 1} />
      <SlidePreview slide={slide} scale={scale} noop={noop} noopChange={noopChange} />
    </div>
  );
}
