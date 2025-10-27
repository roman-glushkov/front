import React from 'react';
import Workspace from '../../Workspace';
import { Slide } from '../../../../store/types/presentation';

interface Props {
  slide: Slide;
  scale: number;
  noop: () => void;
  noopChange: () => void;
}

export function SlidePreview({ slide, scale, noop, noopChange }: Props) {
  return (
    <div className="slide-preview-wrapper">
      <div
        className="slide-preview"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          width: '960px',
          height: '540px',
          pointerEvents: 'none',
        }}
      >
        <Workspace
          slide={slide}
          selElId=""
          onElementClick={noop}
          setSelElId={noop}
          updateSlide={noopChange}
          handleTextChange={noopChange}
          handleTextCommit={noopChange}
          handleTextKeyDown={noopChange}
          preview
        />
      </div>
    </div>
  );
}
