// presentation functions.ts
//ФУНКЦИИ

import {
  Presentation,
  Slide,
  TextElement,
  ImageElement,
  Background,
} from "./types of presentation";

// Изменить название презентации
export function changeTitle(
  presentation: Presentation,
  newTitle: string
): Presentation {
  return { ...presentation, title: newTitle };
}

// Добавить новый слайд
export function addSlide(
  presentation: Presentation,
  newSlide: Slide
): Presentation {
  return { ...presentation, slides: [...presentation.slides, newSlide] };
}

// Удалить слайд
export function removeSlide(
  presentation: Presentation,
  slideId: string
): Presentation {
  return {
    ...presentation,
    slides: presentation.slides.filter((slide) => slide.id !== slideId),
  };
}

// Переместить слайд
export function moveSlide(
  presentation: Presentation,
  slideId: string,
  newIndex: number
): Presentation {
  const slides = [...presentation.slides];
  const slideIndex = slides.findIndex((slide) => slide.id === slideId);
  if (slideIndex === -1) return presentation;

  const [movedSlide] = slides.splice(slideIndex, 1);
  slides.splice(newIndex, 0, movedSlide);
  return { ...presentation, slides };
}

// Добавить текст на слайд
export function addText(slide: Slide, textElement: TextElement): Slide {
  return { ...slide, elements: [...slide.elements, textElement] };
}

// Добавить картинку на слайд
export function addImage(slide: Slide, imageElement: ImageElement): Slide {
  return { ...slide, elements: [...slide.elements, imageElement] };
}

// Удалить элемент со слайда
export function removeElement(slide: Slide, elementId: string): Slide {
  return {
    ...slide,
    elements: slide.elements.filter((element) => element.id !== elementId),
  };
}

// Изменить позицию элемента
export function changeElementPosition(
  slide: Slide,
  elementId: string,
  newPosition: { x: number; y: number }
): Slide {
  const newElements = slide.elements.map((element) => {
    if (element.id === elementId) {
      return { ...element, position: newPosition };
    }
    return element;
  });
  return { ...slide, elements: newElements };
}

// Изменить размер элемента
export function changeElementSize(
  slide: Slide,
  elementId: string,
  newSize: { width: number; height: number }
): Slide {
  const newElements = slide.elements.map((element) => {
    if (element.id === elementId) {
      return { ...element, size: newSize };
    }
    return element;
  });
  return { ...slide, elements: newElements };
}

// Изменить текст
export function changeText(
  slide: Slide,
  elementId: string,
  newContent: string
): Slide {
  const newElements = slide.elements.map((element) => {
    if (element.type === "text" && element.id === elementId) {
      return { ...element, content: newContent };
    }
    return element;
  });
  return { ...slide, elements: newElements };
}

// Изменить размер текста
export function changeTextSize(
  slide: Slide,
  elementId: string,
  newSize: number
): Slide {
  const newElements = slide.elements.map((element) => {
    if (element.type === "text" && element.id === elementId) {
      return { ...element, fontSize: newSize };
    }
    return element;
  });
  return { ...slide, elements: newElements };
}

// Изменить шрифт текста
export function changeTextFont(
  slide: Slide,
  elementId: string,
  newFont: string
): Slide {
  const newElements = slide.elements.map((element) => {
    if (element.type === "text" && element.id === elementId) {
      return { ...element, font: newFont };
    }
    return element;
  });
  return { ...slide, elements: newElements };
}

// Изменить фон слайда
export function changeBackground(
  slide: Slide,
  newBackground: Background
): Slide {
  return { ...slide, background: newBackground };
}
