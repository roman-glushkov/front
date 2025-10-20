import React, { useState, useEffect } from 'react';
import { Slide } from '../store/types/presentation';
import Workspace from './Workspace';
import './SlidesPanel.css';

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
  const [localSlides, setLocalSlides] = useState(slides);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  useEffect(() => {
    setLocalSlides(slides);
  }, [slides]);

  const scale = 0.25;
  const noop = () => {};
  const noopChange = () => {};

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

  return (
    <div className="slides-panel">
      <h3>Слайды</h3>
      <div className="slides-container">
        {localSlides.map((s, i) => (
          <div
            key={s.id}
            className={`slide-row ${selectedSlideId === s.id ? 'selected' : ''} ${i === hoverIndex ? 'hovered' : ''}`}
            draggable
            onClick={() => onSlideClick(s.id, i)}
            onDragStart={() => handleDragStart(i)}
            onDragEnter={() => handleDragEnter(i)}
            onDragEnd={handleDragEnd}
          >
            <div className="slide-number">{i + 1}</div>

            <div className="slide-preview-wrapper">
              <div
                className="slide-preview"
                style={{
                  transform: `scale(${scale})`,
                  transformOrigin: 'top left',
                  width: `${960}px`,
                  height: `${540}px`,
                  pointerEvents: 'none',
                }}
              >
                <Workspace
                  slide={s}
                  selElId=""
                  onElementClick={noop}
                  setSelElId={noop}
                  updateSlide={noopChange}
                  handleTextChange={noopChange}
                  handleTextCommit={noopChange}
                  handleTextKeyDown={noopChange}
                  preview
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
