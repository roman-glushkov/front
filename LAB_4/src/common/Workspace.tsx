// src/common/Workspace.tsx
import React from 'react';
import { Editor } from '../store/editor';
import { TextElement } from '../store/types/presentation';
import './Workspace.css';

type Props = {
  editor: Editor;
  onUpdate: () => void;
};

export default function Workspace({ editor, onUpdate }: Props) {
  const slide = editor.currentSlide;

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
              const bg = el.type === 'text' ? textEl.color : '#e0e0e0';
              return (
                <div
                  key={el.id}
                  onClick={() => {
                    editor.selectElement(el.id, bg, slide.id);
                    onUpdate();
                  }}
                  className={`element ${editor.selElId === el.id ? 'selected' : ''}`}
                  style={{
                    left: `${el.position.x}px`,
                    top: `${el.position.y}px`,
                    width: `${el.size.width}px`,
                    height: `${el.size.height}px`,
                    backgroundColor: bg,
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
