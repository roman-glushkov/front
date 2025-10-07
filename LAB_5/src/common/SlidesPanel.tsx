import React from 'react';
import { Slide } from '../store/types/presentation';
import './SlidesPanel.css';

interface Props {
  slides: Slide[];
  selectedSlideId: string;
  onSlideClick: (slideId: string, index: number) => void;
}

export default function SlidesPanel({ slides, selectedSlideId, onSlideClick }: Props) {
  return (
    <div className="slides-panel">
      <h3>Слайды</h3>
      <div className="slides-container">
        {slides.map((s, i) => (
          <div
            key={s.id}
            onClick={() => onSlideClick(s.id, i)}
            className={`simple-slide ${selectedSlideId === s.id ? 'selected' : ''}`}
          >
            Слайд {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
}
