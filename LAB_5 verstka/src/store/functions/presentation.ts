import {
  Presentation,
  Slide,
  TextElement,
  ImageElement,
  Background,
  Size,
} from '../types/presentation';

export function changeTitle(presentation: Presentation, newTitle: string): Presentation {
  return { ...presentation, title: newTitle };
}

export function addSlide(presentation: Presentation, newSlide: Slide): Presentation {
  return {
    ...presentation,
    slides: [...presentation.slides, newSlide],
    currentSlideId: newSlide.id, // автоматически переключаем на новый слайд
  };
}

export function removeSlide(presentation: Presentation, slideId: string): Presentation {
  return {
    ...presentation,
    slides: presentation.slides.filter((slide) => slide.id !== slideId),
  };
}

export function addText(slide: Slide, textElement: TextElement): Slide {
  return { ...slide, elements: [...slide.elements, { ...textElement }] };
}

export function addImage(slide: Slide, imageElement: ImageElement): Slide {
  return { ...slide, elements: [...slide.elements, { ...imageElement }] };
}

export function removeElement(slide: Slide, elementId: string): Slide {
  return {
    ...slide,
    elements: slide.elements.filter((element) => element.id !== elementId),
  };
}

export function changeElementSize(slide: Slide, elementId: string, newSize: Size): Slide {
  const newElements = slide.elements.map((element) => {
    if (element.id === elementId) {
      return { ...element, size: { ...newSize } };
    }
    return element;
  });
  return { ...slide, elements: newElements };
}

export function changeText(slide: Slide, elementId: string, newContent: string): Slide {
  const newElements = slide.elements.map((element) => {
    if (element.type === 'text' && element.id === elementId) {
      return { ...element, content: newContent };
    }
    return element;
  });
  return { ...slide, elements: newElements };
}

export function changeTextSize(slide: Slide, elementId: string, newSize: number): Slide {
  const newElements = slide.elements.map((element) => {
    if (element.type === 'text' && element.id === elementId) {
      return { ...element, fontSize: newSize };
    }
    return element;
  });
  return { ...slide, elements: newElements };
}

export function changeTextFont(slide: Slide, elementId: string, newFont: string): Slide {
  const newElements = slide.elements.map((element) => {
    if (element.type === 'text' && element.id === elementId) {
      return { ...element, font: newFont };
    }
    return element;
  });
  return { ...slide, elements: newElements };
}

export function changeBackground(slide: Slide, newBackground: Background): Slide {
  return { ...slide, background: { ...newBackground } };
}

export function changeTextColor(slide: Slide, elementId: string, color: string): Slide {
  return {
    ...slide,
    elements: slide.elements.map((el) =>
      el.type === 'text' && el.id === elementId ? { ...el, color } : el
    ),
  };
}

export function changeTextBackgroundColor(
  slide: Slide,
  elementId: string,
  backgroundColor: string
): Slide {
  return {
    ...slide,
    elements: slide.elements.map((el) =>
      el.type === 'text' && el.id === elementId ? { ...el, backgroundColor } : el
    ),
  };
}
