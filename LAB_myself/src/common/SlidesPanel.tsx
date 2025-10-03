// src/common/SlidesPanel.tsx
import React from 'react';
import './SlidesPanel.css';
import { Slide, TextElement } from '../store/types/presentation';

type Props = {
  slides: Slide[];
  selectedId: string;
  onSelect: (id: string, index: number) => void;
};

const SlidesPanel: React.FC<Props> = ({ slides, selectedId, onSelect }) => {
  return (
    <div className="slides-panel">
      <h3>Слайды</h3>
      <div className="slides-container">
        {slides.map((s, i) => (
          <div
            key={s.id}
            onClick={() => onSelect(s.id, i)}
            className={`slide ${selectedId === s.id ? 'selected' : ''}`}
          >
            <div
              className="slide-thumbnail"
              style={{
                backgroundColor:
                  s.background && (s.background as any).type === 'color'
                    ? (s.background as any).value
                    : 'white',
              }}
            >
              {s.elements?.map((el) => {
                const textEl = el as TextElement;
                const bg = el.type === 'text' ? (textEl.color ?? '#e0e0e0') : '#e0e0e0';
                return (
                  <div
                    key={el.id}
                    className="thumb-element"
                    style={{
                      left: (el.position?.x ?? 0) / 4,
                      top: (el.position?.y ?? 0) / 4,
                      width: (el.size?.width ?? 40) / 4,
                      height: (el.size?.height ?? 30) / 4,
                      backgroundColor: bg,
                      font:
                        el.type === 'text'
                          ? `${Math.max(8, (textEl.fontSize ?? 12) / 4)}px ${textEl.font ?? 'Arial'}`
                          : '10px Arial',
                    }}
                  >
                    {el.type === 'text' ? textEl.content : '🖼️'}
                  </div>
                );
              })}
            </div>
            <div className="slide-index">Слайд {i + 1}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SlidesPanel;
