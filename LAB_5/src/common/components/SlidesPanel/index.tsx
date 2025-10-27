import React from 'react';
import { Slide } from '../../../store/types/presentation';
import { useSlidesLogic } from './hooks/useLogic';
import SlidesContainer from './parts/Container';
import './styles.css';

interface Props {
  slides: Slide[];
  selectedSlideId: string;
  onSlideClick: (slideId: string, index: number) => void;
  onSlidesReorder?: (newOrder: Slide[]) => void;
}

export default function SlidesPanel({
  slides,
  selectedSlideId,
  onSlideClick,
  onSlidesReorder,
}: Props) {
  const {
    localSlides,
    hoverIndex,
    handleDragStart,
    handleDragEnter,
    handleDragEnd,
    noop,
    noopChange,
  } = useSlidesLogic(slides, onSlidesReorder);

  return (
    <div className="slides-panel">
      <h3>Слайды</h3>
      <SlidesContainer
        slides={localSlides}
        hoverIndex={hoverIndex}
        selectedSlideId={selectedSlideId}
        scale={0.25}
        onSlideClick={onSlideClick}
        handleDragStart={handleDragStart}
        handleDragEnter={handleDragEnter}
        handleDragEnd={handleDragEnd}
        noop={noop}
        noopChange={noopChange}
      />
    </div>
  );
}
