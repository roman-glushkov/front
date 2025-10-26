import React, { useState } from 'react';
import { TextElement as TEl, SlideElement } from '../../../../store/types/presentation';
import BaseElementView from './BaseElement';

type Corner = 'nw' | 'ne' | 'sw' | 'se' | 'n' | 's' | 'w' | 'e';

interface Props {
  el: TEl;
  isSelected: boolean;
  isEditing: boolean;
  preview: boolean;
  setSelElIds: React.Dispatch<React.SetStateAction<string[]>>;
  startDrag: (e: React.PointerEvent, el: SlideElement) => void;
  startResize: (e: React.PointerEvent, el: SlideElement, corner: Corner) => void;
  handleTextChange: (e: React.ChangeEvent<HTMLInputElement>, elId: string) => void;
  handleTextCommit: (e: React.FocusEvent<HTMLInputElement>, elId: string) => void;
  handleTextKeyDown: (e: React.KeyboardEvent<HTMLInputElement>, elId: string) => void;
  onPointerDown?: (e: React.PointerEvent) => void;
}

export default function TextElementView({
  el,
  isSelected,
  preview,
  startDrag,
  startResize,
  handleTextChange,
  handleTextCommit,
  handleTextKeyDown,
  onPointerDown,
}: Props) {
  const [editingElIdLocal, setEditingElIdLocal] = useState('');
  const isEditingNow = editingElIdLocal === el.id && el.type === 'text';

  return (
    <BaseElementView
      el={el}
      isSelected={isSelected}
      preview={preview}
      onPointerDown={onPointerDown}
      startDrag={startDrag}
      startResize={startResize}
      style={{
        fontFamily: el.font,
        fontSize: el.fontSize,
        color: el.color || '#1f2937',
        backgroundColor: el.backgroundColor || 'transparent',
        textAlign: 'center',
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
    </BaseElementView>
  );
}
