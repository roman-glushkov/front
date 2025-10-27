import React from 'react';
import { Slide, SlideElement } from '../../../../store/types/presentation';

interface Args {
  preview?: boolean;
  updateSlide: (updater: (s: Slide) => Slide) => void;
}

export default function useResize({ preview, updateSlide }: Args) {
  const startResize = (
    e: React.PointerEvent,
    el: SlideElement,
    corner: 'nw' | 'ne' | 'sw' | 'se'
  ) => {
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

  return startResize;
}
