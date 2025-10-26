export type Presentation = {
  title: string;
  slides: Slide[];
  currentSlideId: string;
  selectedSlideIds: string[];
};

export type Corner = 'nw' | 'ne' | 'sw' | 'se' | 'n' | 's' | 'w' | 'e';

export type Slide = {
  id: string;
  background: Background;
  elements: SlideElement[];
};

export type Selection = {
  slideId: string;
  elementIds: string[];
};

export type Background =
  | { type: 'color'; value: string }
  | { type: 'image'; value: string }
  | { type: 'none' };

export type SlideElement = TextElement | ImageElement;

export type Position = {
  x: number;
  y: number;
};

export type Size = {
  width: number;
  height: number;
};

type BaseElement = {
  id: string;
  position: Position;
  size: Size;
};

export type TextElement = BaseElement & {
  type: 'text';
  content: string;
  font: string;
  fontSize: number;
  color: string;
  backgroundColor?: string;
};

export type ImageElement = BaseElement & {
  type: 'image';
  src: string;
};
