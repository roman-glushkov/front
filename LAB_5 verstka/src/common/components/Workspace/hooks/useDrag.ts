import React, { useRef } from 'react';
import type { Slide, SlideElement } from '../../../../store/types/presentation';

type UpdateSlideFn = (updater: (s: Slide) => Slide) => void;

interface Args {
  preview?: boolean;
  selElIdsRef: React.RefObject<string[]>;
  updateSlide: UpdateSlideFn;
  getElementById: (id: string) => SlideElement | undefined;
}

export default function useDrag({ preview, selElIdsRef, updateSlide, getElementById }: Args) {
  const dragStateRef = useRef<{
    startX: number;
    startY: number;
    origPositions: Record<string, { x: number; y: number }>;
    raf?: number;
  } | null>(null);

  const startDrag = (e: React.PointerEvent, el: SlideElement) => {
    if (preview) return;
    e.stopPropagation();

    // ✅ ВСЕГДА берём все выделенные элементы, если они есть
    const selectedIds =
      selElIdsRef.current && selElIdsRef.current.length > 0 ? selElIdsRef.current : [el.id];

    const origPositions: Record<string, { x: number; y: number }> = {};
    selectedIds.forEach((id) => {
      const element = getElementById(id);
      if (element) {
        origPositions[id] = { x: element.position.x, y: element.position.y };
      }
    });

    dragStateRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      origPositions,
    };

    const onPointerMove = (ev: PointerEvent) => {
      const ds = dragStateRef.current;
      if (!ds) return;

      const dx = ev.clientX - ds.startX;
      const dy = ev.clientY - ds.startY;

      if (ds.raf) cancelAnimationFrame(ds.raf);
      ds.raf = requestAnimationFrame(() => {
        updateSlide((s: Slide) => ({
          ...s,
          elements: s.elements.map((item) => {
            if (ds.origPositions[item.id]) {
              return {
                ...item,
                position: {
                  x: ds.origPositions[item.id].x + dx,
                  y: ds.origPositions[item.id].y + dy,
                },
              };
            }
            return item;
          }),
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

  return startDrag;
}
