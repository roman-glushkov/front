import React from 'react';
import {
  Slide,
  SlideElement,
  TextElement,
  ImageElement,
} from '../../../../store/types/presentation';
import TextElementView from './TextElement';
import ImageElementView from './ImageElement';

type Corner = 'nw' | 'ne' | 'sw' | 'se' | 'n' | 's' | 'w' | 'e';

interface Props {
  slide: Slide;
  selElIds: string[];
  setSelElIds: React.Dispatch<React.SetStateAction<string[]>>;
  startDrag: (e: React.PointerEvent, el: SlideElement) => void;
  startResize: (e: React.PointerEvent, el: SlideElement, corner: Corner) => void;
  handleTextChange: (e: React.ChangeEvent<HTMLInputElement>, elId: string) => void;
  handleTextCommit: (e: React.FocusEvent<HTMLInputElement>, elId: string) => void;
  handleTextKeyDown: (e: React.KeyboardEvent<HTMLInputElement>, elId: string) => void;
  preview?: boolean;
}

export default function SlideElementsRenderer({
  slide,
  selElIds,
  setSelElIds,
  startDrag,
  startResize,
  handleTextChange,
  handleTextCommit,
  handleTextKeyDown,
  preview,
}: Props) {
  const handleSelect = (e: React.PointerEvent, elId: string) => {
    e.stopPropagation();
    const multi = e.ctrlKey || e.metaKey;

    setSelElIds((prev) => {
      if (multi) {
        if (prev.includes(elId)) return prev.filter((id) => id !== elId);
        return [...prev, elId];
      } else {
        if (prev.includes(elId)) return prev;
        return [elId];
      }
    });
  };

  return (
    <>
      {slide.elements.map((el: SlideElement) => {
        const isSelected = selElIds.includes(el.id);

        if (el.type === 'text') {
          return (
            <TextElementView
              key={el.id}
              el={el as TextElement}
              isSelected={isSelected}
              isEditing={false}
              preview={!!preview}
              setSelElIds={setSelElIds}
              startDrag={startDrag}
              startResize={startResize}
              handleTextChange={handleTextChange}
              handleTextCommit={handleTextCommit}
              handleTextKeyDown={handleTextKeyDown}
              onPointerDown={(e) => handleSelect(e, el.id)}
            />
          );
        }

        if (el.type === 'image') {
          return (
            <ImageElementView
              key={el.id}
              el={el as ImageElement}
              isSelected={isSelected}
              preview={!!preview}
              setSelElIds={setSelElIds}
              startDrag={startDrag}
              startResize={startResize}
              onPointerDown={(e) => handleSelect(e, el.id)}
            />
          );
        }

        return null;
      })}
    </>
  );
}
