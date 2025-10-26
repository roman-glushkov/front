import React from 'react';
import { SlideElement } from '../../../../store/types/presentation';
import ResizeHandle from './ResizeHandle';

type Corner = 'nw' | 'ne' | 'sw' | 'se' | 'n' | 's' | 'w' | 'e';

interface BaseElementViewProps {
  el: SlideElement;
  isSelected: boolean;
  preview: boolean;
  onPointerDown?: (e: React.PointerEvent) => void;
  startDrag: (e: React.PointerEvent, el: SlideElement) => void;
  startResize: (e: React.PointerEvent, el: SlideElement, corner: Corner) => void;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export default function BaseElementView({
  el,
  isSelected,
  preview,
  onPointerDown,
  startDrag,
  startResize,
  style = {},
  children,
}: BaseElementViewProps) {
  const corners: Corner[] = ['nw', 'ne', 'sw', 'se', 'n', 's', 'w', 'e'];

  return (
    <div
      className={`element ${isSelected ? 'selected' : ''}`}
      onClick={(e) => e.stopPropagation()}
      onPointerDown={(e) => {
        e.stopPropagation();
        if (onPointerDown) onPointerDown(e);
        requestAnimationFrame(() => startDrag(e, el));
      }}
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
        ...style,
      }}
    >
      {children}

      {isSelected &&
        !preview &&
        corners.map((c) => (
          <ResizeHandle key={c} corner={c} onPointerDown={(e) => startResize(e, el, c)} />
        ))}
    </div>
  );
}
