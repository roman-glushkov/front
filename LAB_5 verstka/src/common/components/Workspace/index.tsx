import React from 'react';
import { Slide } from '../../../store/types/presentation';
import './styles.css';

import useWorkspaceInteractions from './hooks/useInteractions';
import SlideElementsRenderer from './parts/SlideElementsRenderer';

interface Props {
  slide?: Slide;
  selElIds: string[];
  setSelElIds: React.Dispatch<React.SetStateAction<string[]>>;
  updateSlide: (updater: (s: Slide) => Slide) => void;
  handleTextChange: (e: React.ChangeEvent<HTMLInputElement>, elId: string) => void;
  handleTextCommit: (e: React.FocusEvent<HTMLInputElement>, elId: string) => void;
  handleTextKeyDown: (e: React.KeyboardEvent<HTMLInputElement>, elId: string) => void;
  preview?: boolean;
}

export default function Workspace({
  slide,
  selElIds,
  setSelElIds,
  updateSlide,
  handleTextChange,
  handleTextCommit,
  handleTextKeyDown,
  preview,
}: Props) {
  const { startDrag, startResize } = useWorkspaceInteractions({
    slide,
    selElIds,
    updateSlide,
    preview,
  });

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
            onClick={() => {
              if (!preview) setSelElIds([]);
            }}
          >
            <SlideElementsRenderer
              slide={slide}
              selElIds={selElIds}
              setSelElIds={setSelElIds}
              startDrag={startDrag}
              startResize={startResize}
              handleTextChange={handleTextChange}
              handleTextCommit={handleTextCommit}
              handleTextKeyDown={handleTextKeyDown}
              preview={preview}
            />
          </div>
        ) : (
          <p>Выберите слайд</p>
        )}
      </div>
    </div>
  );
}
