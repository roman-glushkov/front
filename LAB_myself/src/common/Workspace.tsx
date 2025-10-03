// src/common/Workspace.tsx
import React, { useEffect, useRef, useState } from 'react';
import './Workspace.css';
import { Slide, Element as SlideElement } from '../store/types/presentation';

type Props = {
  slide?: Slide;
  selectedElId?: string;
  onSelectElement: (elId: string, backgroundColor: string, slideId: string) => void;
  onSaveText: (elId: string, newText: string) => void;
};

const Workspace: React.FC<Props> = ({ slide, selectedElId, onSelectElement, onSaveText }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (editingId && textareaRef.current) {
      textareaRef.current.focus();
      // переместим курсор в конец
      const len = textareaRef.current.value.length;
      textareaRef.current.setSelectionRange(len, len);
    }
  }, [editingId]);

  if (!slide) {
    return (
      <div className="workspace-panel">
        <h3>Рабочая область</h3>
        <div className="workspace">
          <p>Выберите слайд</p>
        </div>
      </div>
    );
  }

  const startEditing = (el: SlideElement) => {
    if (el.type !== 'text') return;
    onSelectElement(el.id, (el as any).color ?? '', slide.id);
    setEditingId(el.id);
    setEditingText((el as any).content ?? '');
  };

  const commitEditing = (elId: string | null) => {
    if (!elId) {
      setEditingId(null);
      return;
    }
    onSaveText(elId, editingText);
    setEditingId(null);
    setEditingText('');
  };

  return (
    <div className="workspace-panel">
      <h3>Рабочая область</h3>
      <div className="workspace">
        <div
          className="workspace-content"
          style={{
            backgroundColor:
              slide.background && (slide.background as any).type === 'color'
                ? (slide.background as any).value
                : 'white',
          }}
        >
          {slide.elements.map((el) => {
            const style: React.CSSProperties = {
              position: 'absolute',
              left: el.position?.x ?? 0,
              top: el.position?.y ?? 0,
              width: el.size?.width ?? 100,
              height: el.size?.height ?? 40,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 4,
              boxSizing: 'border-box',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            };

            if (el.type === 'text') {
              const isEditing = editingId === el.id;
              return (
                <div key={el.id}>
                  {!isEditing && (
                    <div
                      className={`element ${selectedElId === el.id ? 'selected' : ''}`}
                      style={{
                        ...style,
                        backgroundColor: (el as any).color ?? 'transparent',
                        font: `${(el as any).fontSize ?? 14}px ${(el as any).font ?? 'Arial'}`,
                      }}
                      onClick={() => startEditing(el)}
                    >
                      {(el as any).content}
                    </div>
                  )}

                  {isEditing && (
                    <textarea
                      ref={textareaRef}
                      className="element-edit-textarea"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          commitEditing(el.id);
                        }
                        if (e.key === 'Escape') {
                          setEditingId(null);
                        }
                      }}
                      onBlur={() => commitEditing(el.id)}
                      style={{
                        position: 'absolute',
                        left: el.position?.x ?? 0,
                        top: el.position?.y ?? 0,
                        width: el.size?.width ?? 100,
                        height: el.size?.height ?? 40,
                        fontSize: (el as any).fontSize ?? 14,
                        fontFamily: (el as any).font ?? 'Arial',
                        padding: 4,
                        boxSizing: 'border-box',
                      }}
                    />
                  )}
                </div>
              );
            }

            if (el.type === 'image') {
              return (
                <img
                  key={el.id}
                  src={(el as any).src}
                  alt=""
                  className={`element ${selectedElId === el.id ? 'selected' : ''}`}
                  style={{
                    ...style,
                    objectFit: 'cover',
                  }}
                  onClick={() => onSelectElement(el.id, '', slide.id)}
                />
              );
            }

            return null;
          })}
        </div>
      </div>
    </div>
  );
};

export default Workspace;
