import React from 'react';
import { ImageElement as IEl, SlideElement } from '../../../../store/types/presentation';
import BaseElementView from './BaseElement';

type Corner = 'nw' | 'ne' | 'sw' | 'se' | 'n' | 's' | 'w' | 'e';

interface Props {
  el: IEl;
  isSelected: boolean;
  preview: boolean;
  setSelElIds: React.Dispatch<React.SetStateAction<string[]>>;
  startDrag: (e: React.PointerEvent, el: SlideElement) => void;
  startResize: (e: React.PointerEvent, el: SlideElement, corner: Corner) => void;
  onPointerDown?: (e: React.PointerEvent) => void;
}

export default function ImageElementView({
  el,
  isSelected,
  preview,
  startDrag,
  startResize,
  onPointerDown,
}: Props) {
  return (
    <BaseElementView
      el={el}
      isSelected={isSelected}
      preview={preview}
      onPointerDown={onPointerDown}
      startDrag={startDrag}
      startResize={startResize}
    >
      <img
        src={el.src}
        alt="Изображение"
        draggable={false}
        style={{
          width: el.size.width === 0 ? 'auto' : '100%',
          height: el.size.height === 0 ? 'auto' : '100%',
          objectFit: 'fill',
          userSelect: 'none',
        }}
      />
    </BaseElementView>
  );
}
