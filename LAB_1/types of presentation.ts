//ТИПЫ

//презентация
type Presentation = {
  title: string;
  slides: Slide[];
  currentSlideId: string;
};

//слайд
type Slide = {
  id: string;
  background: Background;
  elements: Element[];
};

//колекция сллайдов
type SlideCollection = {
  slides: Slide[];
  selectedSlideIds: string[];
};

//выделение
type Selection = {
  slideId: string;
  elementIds: string[];
};

//фон слайда
type Background =
  | { type: "color"; value: string }
  | { type: "image"; value: string }
  | { type: "none" };

//текст
type TextElement = {
  type: "text";
  id: string;
  content: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  font: string;
  fontSize: number;
  color: string;
};

//фото
type ImageElement = {
  type: "image";
  id: string;
  src: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
};
