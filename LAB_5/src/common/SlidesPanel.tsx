import React from 'react';
import { Slide } from '../store/types/presentation';
import Workspace from './Workspace';
import './SlidesPanel.css';

interface Props {
  slides: Slide[];
  selectedSlideId: string;
  onSlideClick: (slideId: string, index: number) => void;
}

export default function SlidesPanel({ slides, selectedSlideId, onSlideClick }: Props) {
  const scale = 0.25;

  const noop = () => {};
  const noopChange = () => {};

  return (
    <div className="slides-panel">
      <h3>Слайды</h3>
      <div className="slides-container">
        {slides.map((s, i) => (
          <div
            key={s.id}
            className={`slide-row ${selectedSlideId === s.id ? 'selected' : ''}`}
            onClick={() => onSlideClick(s.id, i)}
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
