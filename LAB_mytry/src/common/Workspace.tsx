import React, { useState, useRef } from 'react';
import { Slide, TextElement, ImageElement, SlideElement } from '../store/types/presentation';
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

interface DragState {
  draggingId: string;
  startX: number;
  startY: number;
  origX: number;
  origY: number;
  raf?: number;
}

type Corner = 'nw' | 'ne' | 'sw' | 'se';

export default function Workspace({
  slide,
  selElId,
  setSelElId,
  updateSlide,
  handleTextChange,
  handleTextCommit,
  handleTextKeyDown,
  preview,
}: Props) {
  const [editingElId, setEditingElId] = useState('');
  const dragStateRef = useRef<DragState | null>(null);

  // ---- Перемещение элементов ----
  const startDrag = (e: React.PointerEvent, el: SlideElement) => {
    if (preview) return;
    if (editingElId) return;

    e.stopPropagation();
    setSelElId(el.id);
    bringToFront(el.id);

    const ds: DragState = {
      draggingId: el.id,
      startX: e.clientX,
      startY: e.clientY,
      origX: el.position.x,
      origY: el.position.y,
    };
    dragStateRef.current = ds;

    const onPointerMove = (ev: PointerEvent) => {
      const cur = dragStateRef.current;
      if (!cur) return;

      const dx = ev.clientX - cur.startX;
      const dy = ev.clientY - cur.startY;

      if (cur.raf) cancelAnimationFrame(cur.raf);
      cur.raf = requestAnimationFrame(() => {
        updateSlide((s: Slide) => ({
          ...s,
          elements: s.elements.map((item) =>
            item.id === cur.draggingId
              ? { ...item, position: { x: cur.origX + dx, y: cur.origY + dy } }
              : item
          ),
        }));
      });
    };

    const onPointerUp = () => {
      if (dragStateRef.current?.raf) cancelAnimationFrame(dragStateRef.current.raf);
      dragStateRef.current = null;
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  };

  // ---- Изменение размера ----
  const startResize = (e: React.PointerEvent, el: SlideElement, corner: Corner) => {
    e.stopPropagation();
    if (preview) return;

    const startX = e.clientX;
    const startY = e.clientY;
    const origWidth = el.size.width;
    const origHeight = el.size.height;
    const origX = el.position.x;
    const origY = el.position.y;

    const onPointerMove = (ev: PointerEvent) => {
      const dx = ev.clientX - startX;
      const dy = ev.clientY - startY;

      updateSlide((s: Slide) => ({
        ...s,
        elements: s.elements.map((item) => {
          if (item.id !== el.id) return item;

          let newWidth = origWidth;
          let newHeight = origHeight;
          let newX = origX;
          let newY = origY;

          switch (corner) {
            case 'se':
              newWidth = origWidth + dx;
              newHeight = origHeight + dy;
              break;
            case 'sw':
              newWidth = origWidth - dx;
              newHeight = origHeight + dy;
              newX = origX + dx;
              break;
            case 'ne':
              newWidth = origWidth + dx;
              newHeight = origHeight - dy;
              newY = origY + dy;
              break;
            case 'nw':
              newWidth = origWidth - dx;
              newHeight = origHeight - dy;
              newX = origX + dx;
              newY = origY + dy;
              break;
          }

          return {
            ...item,
            size: { width: Math.max(newWidth, 20), height: Math.max(newHeight, 20) },
            position: { x: newX, y: newY },
          };
        }),
      }));
    };

    const onPointerUp = () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  };

  // ---- Поднять элемент наверх ----
  const bringToFront = (elId: string) => {
    if (!slide) return;
    updateSlide((s: Slide) => {
      const el = s.elements.find((e: SlideElement) => e.id === elId);
      if (!el) return s;
      return { ...s, elements: [...s.elements.filter((e) => e.id !== elId), el] };
    });
  };

  // ---- Отрисовка ----
  return (
    <div className="workspace-panel">
      <div className="workspace">
        {slide ? (
          <div
            className="workspace-content"
            style={{
              backgroundColor: slide.background.type === 'color' ? slide.background.value : 'white',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {slide.elements.map((el: SlideElement) => {
              const isSelected = selElId === el.id;
              const isEditing = editingElId === el.id && el.type === 'text';

              if (el.type === 'text') {
                const textEl = el as TextElement;
                return (
                  <div
                    key={el.id}
                    className={`element ${isSelected ? 'selected' : ''}`}
                    onClick={() => setSelElId(el.id)}
                    onDoubleClick={() => setEditingElId(el.id)}
                    onPointerDown={(e) => startDrag(e, el)}
                    style={{
                      position: 'absolute',
                      left: el.position.x,
                      top: el.position.y,
                      width: el.size.width,
                      height: el.size.height,
                      fontFamily: textEl.font,
                      fontSize: textEl.fontSize,
                      color: textEl.color || '#1f2937',
                      backgroundColor: textEl.backgroundColor || 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                      cursor: preview ? 'default' : 'grab',
                      userSelect: 'none',
                    }}
                  >
                    {isEditing ? (
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
                          color: textEl.color || '#1f2937',
                          backgroundColor: textEl.backgroundColor || 'transparent',
                          border: 'none',
                          outline: 'none',
                          textAlign: 'center',
                          fontFamily: textEl.font,
                          fontSize: textEl.fontSize,
                        }}
                      />
                    ) : (
                      textEl.content
                    )}

                    {/* Ручки resize только при выделении */}
                    {isSelected && !preview && (
                      <>
                        {(['nw', 'ne', 'sw', 'se'] as Corner[]).map((corner) => (
                          <div
                            key={corner}
                            className={`resize-handle ${corner}`}
                            onPointerDown={(e) => startResize(e, el, corner)}
                          />
                        ))}
                      </>
                    )}
                  </div>
                );
              }

              if (el.type === 'image') {
                const imageEl = el as ImageElement;
                return (
                  <div
                    key={el.id}
                    className={`element ${isSelected ? 'selected' : ''}`}
                    onClick={() => setSelElId(el.id)}
                    onPointerDown={(e) => startDrag(e, el)}
                    style={{
                      position: 'absolute',
                      left: el.position.x,
                      top: el.position.y,
                      width: el.size.width,
                      height: el.size.height,
                      cursor: preview ? 'default' : 'grab',
                      userSelect: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      pointerEvents: 'auto',
                    }}
                  >
                    <img
                      src={imageEl.src}
                      alt="Изображение"
                      draggable={false}
                      style={{
                        width: imageEl.size.width === 0 ? 'auto' : '100%',
                        height: imageEl.size.height === 0 ? 'auto' : '100%',
                        objectFit: 'fill',
                        userSelect: 'none',
                      }}
                    />
                    {/* Ручки resize */}
                    {isSelected && !preview && (
                      <>
                        {(['nw', 'ne', 'sw', 'se'] as Corner[]).map((corner) => (
                          <div
                            key={corner}
                            className={`resize-handle ${corner}`}
                            onPointerDown={(e) => startResize(e, el, corner)}
                          />
                        ))}
                      </>
                    )}
                  </div>
                );
              }

              return null;
            })}
          </div>
        ) : (
          <p>Выберите слайд</p>
        )}
      </div>
    </div>
  );
}
