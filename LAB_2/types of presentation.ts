//презентация
export type Presentation = {
  title: string;
  slides: Slide[];
  currentSlideId: string;
  selectedSlideIds: string[];
};

//слайд
export type Slide = {
  id: string;
  background: Background;
  elements: SlideElement[];
};

//выделение
export type Selection = {
  slideId: string;
  elementIds: string[];
};

//фон слайда
export type Background =
  | { type: "color"; value: string }
  | { type: "image"; value: string }
  | { type: "none" };

export type SlideElement = TextElement | ImageElement;

// Позиция элемента
export type Position = {
  x: number;
  y: number;
};

// Размер элемента
export type Size = {
  width: number;
  height: number;
};

type BaseElement = {
  id: string;
  position: Position;
  size: Size;
};

//текстовый элемент
export type TextElement = BaseElement & {
  type: "text";
  content: string;
  font: string;
  fontSize: number;
  color: string;
};

//изображение
export type ImageElement = BaseElement & {
  type: "image";
  src: string;
};
