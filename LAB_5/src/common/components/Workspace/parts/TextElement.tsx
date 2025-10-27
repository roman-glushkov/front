import React, { useState } from 'react';
import { TextElement as TEl, SlideElement } from '../../../../store/types/presentation';
import ResizeHandle from './ResizeHandle';

interface Props {
  el: TEl;
  isSelected: boolean;
  isEditing: boolean;
  preview: boolean;
  setSelElId: (id: string) => void;
  startDrag: (e: React.PointerEvent, el: SlideElement) => void;
  startResize: (
    e: React.PointerEvent,
    el: SlideElement,
    corner: 'nw' | 'ne' | 'sw' | 'se' | 'n' | 's' | 'e' | 'w'
  ) => void;
  handleTextChange: (e: React.ChangeEvent<HTMLInputElement>, elId: string) => void;
  handleTextCommit: (e: React.FocusEvent<HTMLInputElement>, elId: string) => void;
  handleTextKeyDown: (e: React.KeyboardEvent<HTMLInputElement>, elId: string) => void;
}

export default function TextElementView({
  el,
  isSelected,
  preview,
  setSelElId,
  startDrag,
  startResize,
  handleTextChange,
  handleTextCommit,
  handleTextKeyDown,
}: Props) {
  const [editingElIdLocal, setEditingElIdLocal] = useState('');
  const isEditingNow = editingElIdLocal === el.id && el.type === 'text';

  return (
    <div
      className={`element ${isSelected ? 'selected' : ''}`}
      onClick={(e) => {
        e.stopPropagation();
        setSelElId(el.id);
      }}
      onDoubleClick={(e) => {
        e.stopPropagation();
        if (!preview) setEditingElIdLocal(el.id);
      }}
      onPointerDown={(e) => startDrag(e, el)}
      style={{
        position: 'absolute',
        left: el.position.x,
        top: el.position.y,
        width: el.size.width,
        height: el.size.height,
        fontFamily: el.font,
        fontSize: el.fontSize,
        color: el.color || '#1f2937',
        backgroundColor: el.backgroundColor || 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        cursor: preview ? 'default' : 'grab',
        userSelect: 'none',
      }}
    >
      {isEditingNow ? (
        <input
          autoFocus
          value={el.content}
          onChange={(e) => handleTextChange(e, el.id)}
          onKeyDown={(e) => handleTextKeyDown(e, el.id)}
          onBlur={(e) => {
            handleTextCommit(e, el.id);
            setEditingElIdLocal('');
          }}
          style={{
            width: '100%',
            height: '100%',
            color: el.color || '#1f2937',
            backgroundColor: el.backgroundColor || 'transparent',
            border: 'none',
            outline: 'none',
            textAlign: 'center',
            fontFamily: el.font,
            fontSize: el.fontSize,
          }}
        />
      ) : (
        el.content
      )}

      {isSelected && !preview && (
        <>
          {(['nw', 'ne', 'sw', 'se', 'n', 's', 'e', 'w'] as const).map((c) => (
            <ResizeHandle key={c} corner={c} onPointerDown={(e) => startResize(e, el, c)} />
          ))}
        </>
      )}
    </div>
  );
}
