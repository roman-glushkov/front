import React from 'react';
import { Slide, TextElement } from '../store/types/presentation';
import './Workspace.css';

interface Props {
  slide?: Slide;
  selElId: string;
  onElementClick: (elementId: string) => void;
}

export default function Workspace({ slide, selElId, onElementClick }: Props) {
  return (
    <div className="workspace-panel">
      <h3>Рабочая область</h3>
      <div className="workspace">
        {slide ? (
          <div
            className="workspace-content"
            style={{
              backgroundColor: slide.background.type === 'color' ? slide.background.value : 'white',
            }}
          >
            {slide.elements.map((el) => {
              const textEl = el as TextElement;
              const backgroundColor = el.type === 'text' ? textEl.color : '#e0e0e0';
              return (
                <div
                  key={el.id}
                  onClick={() => onElementClick(el.id)}
                  className={`element ${selElId === el.id ? 'selected' : ''}`}
                  style={{
                    left: el.position.x,
                    top: el.position.y,
                    width: el.size.width,
                    height: el.size.height,
                    backgroundColor,
                    font: el.type === 'text' ? `${textEl.fontSize}px ${textEl.font}` : '16px Arial',
                  }}
                >
                  {el.type === 'text' ? textEl.content : '🖼️'}
                </div>
              );
            })}
          </div>
        ) : (
          <p>Выберите слайд</p>
        )}
      </div>
    </div>
  );
}
