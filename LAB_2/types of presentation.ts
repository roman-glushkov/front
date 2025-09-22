//ТИПЫ

//SlideCollection убрать, но селектрсайз закинуть в презентацию, переназвать элемент, на Slideelement и рассписать что находится в массиве

//презентация
export type Presentation = {
  title: string;
  slides: Slide[];
  currentSlideId: string;
  selectedSlideIds: string[]; //
};

//слайд
export type Slide = {
  id: string;
  background: Background;
  elements: SlideElement[]; //
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

export type SlideElement = TextElement | ImageElement; //

//текстовый элемент
export type TextElement = {
  type: "text";
  id: string;
  content: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  font: string;
  fontSize: number;
  color: string;
};

//изображение
export type ImageElement = {
  type: "image";
  id: string;
  src: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
};
