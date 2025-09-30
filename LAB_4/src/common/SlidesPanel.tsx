// src/common/SlidesPanel.tsx
import React from 'react';
import { Editor } from '../store/editor';
import { TextElement } from '../store/types/presentation';
import './SlidesPanel.css';

type Props = {
  editor: Editor;
  onUpdate: () => void;
};

export default function SlidesPanel({ editor, onUpdate }: Props) {
  return (
    <div className="slides-panel">
      <h3>Слайды</h3>
      <div className="slides-container">
        {editor.pres.slides.map((s, i) => (
          <div
            key={s.id}
            onClick={() => {
              editor.selectSlide(s.id, i);
              onUpdate();
            }}
            className={`slide ${editor.selSlideId === s.id ? 'selected' : ''}`}
          >
            <div
              className="slide-thumbnail"
              style={{
                backgroundColor: s.background.type === 'color' ? s.background.value : 'white',
              }}
            >
              {s.elements.map((el) => {
                const textEl = el as TextElement;
                const bg = el.type === 'text' ? textEl.color : '#e0e0e0';
                return (
                  <div
                    key={el.id}
                    className="thumb-element"
                    style={{
                      left: `${el.position.x / 4}px`,
                      top: `${el.position.y / 4}px`,
                      width: `${el.size.width / 4}px`,
                      height: `${el.size.height / 4}px`,
                      backgroundColor: bg,
                      font:
                        el.type === 'text'
                          ? `${Math.max(8, textEl.fontSize / 4)}px ${textEl.font}`
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
}
