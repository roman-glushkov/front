import React, { useState } from 'react';
import { Slide, TextElement, ImageElement } from '../store/types/presentation';
import './Workspace.css';

interface Props {
  slide?: Slide;
  selElId: string;
  onElementClick: (elementId: string) => void;
  setSelElId: (elementId: string) => void;
  updateSlide: (updater: (s: Slide) => Slide) => void;
  handleTextChange: (e: React.ChangeEvent<HTMLInputElement>, elId: string) => void;
  handleTextCommit: (e: React.FocusEvent<HTMLInputElement>, elId: string) => void;
  handleTextKeyDown: (e: React.KeyboardEvent<HTMLInputElement>, elId: string) => void;
  preview?: boolean;
}

export default function Workspace({
  slide,
  selElId,
  setSelElId,
  handleTextChange,
  handleTextCommit,
  handleTextKeyDown,
}: Props) {
  const [editingElId, setEditingElId] = useState('');

  return (
    <div className="workspace-panel">
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
              const imageEl = el as ImageElement;
              const backgroundColor = el.type === 'text' ? textEl.color : '#e0e0e0';
              const isEditing = editingElId === el.id;

              return (
                <div
                  key={el.id}
                  className={`element ${selElId === el.id ? 'selected' : ''}`}
                  onClick={() => setSelElId(el.id)}
                  onDoubleClick={() => {
                    if (el.type === 'text') setEditingElId(el.id);
                  }}
                  style={{
                    position: 'absolute',
                    left: el.position.x,
                    top: el.position.y,
                    width: el.size.width,
                    height: el.size.height,
                    backgroundColor,
                    font: el.type === 'text' ? `${textEl.fontSize}px ${textEl.font}` : '16px Arial',
                  }}
                >
                  {el.type === 'text' ? (
                    isEditing ? (
                      <input
                        autoFocus
                        value={textEl.content}
                        onChange={(e) => handleTextChange(e, el.id)}
                        onKeyDown={(e) => handleTextKeyDown(e, el.id)}
                        onBlur={(e) => {
                          handleTextCommit(e, el.id);
                          setEditingElId('');
                        }}
                        style={{
                          width: '100%',
                          height: '100%',
                          color: '#1f2937',
                        }}
                      />
                    ) : (
                      textEl.content
                    )
                  ) : (
                    <img
                      src={imageEl.src}
                      alt="Изображение"
                      style={{
                        width: imageEl.size.width === 0 ? 'auto' : '100%',
                        height: imageEl.size.height === 0 ? 'auto' : '100%',
                      }}
                    />
                  )}
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
