import { useRef, useEffect } from 'react';
import { Slide } from '../../../../store/types/presentation';
import useDrag from './useDrag';
import useResize from './useResize';

interface UseWorkspaceInteractionsParams {
  slide?: Slide;
  selElIds: string[];
  updateSlide: (updater: (s: Slide) => Slide) => void;
  preview?: boolean;
}

export default function useWorkspaceInteractions({
  slide,
  selElIds,
  updateSlide,
  preview,
}: UseWorkspaceInteractionsParams) {
  const selElIdsRef = useRef(selElIds);

  useEffect(() => {
    selElIdsRef.current = selElIds;
  }, [selElIds]);

  const startDrag = useDrag({
    preview,
    selElIdsRef,
    updateSlide,
    getElementById: (id) => slide?.elements.find((el) => el.id === id),
  });

  const startResize = useResize({ preview, updateSlide });

  return {
    startDrag,
    startResize,
  };
}
