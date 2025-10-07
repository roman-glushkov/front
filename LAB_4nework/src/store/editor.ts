import { Presentation, Slide, TextElement, Position, Size, Background } from './types/presentation';
import * as temp from './templates/presentation';

export const Editor = {
  addSlide(pres: Presentation, slide?: Slide): Presentation {
    const newSlide = slide || temp.createSlide();
    return { ...pres, slides: [...pres.slides, newSlide] };
  },

  removeSlide(pres: Presentation, slideId: string): Presentation {
    const slides = pres.slides.filter((s) => s.id !== slideId);
    return { ...pres, slides };
  },

  moveSlide(pres: Presentation, slideId: string, newIndex: number): Presentation {
    const idx = pres.slides.findIndex((s) => s.id === slideId);
    if (idx === -1) return pres;
    const slides = [...pres.slides];
    const [removed] = slides.splice(idx, 1);
    slides.splice(newIndex, 0, removed);
    return { ...pres, slides };
  },

  addText(pres: Presentation, slideId: string, text?: TextElement): Presentation {
    return {
      ...pres,
      slides: pres.slides.map((s) =>
        s.id === slideId ? { ...s, elements: [...s.elements, text || temp.createTextElement()] } : s
      ),
    };
  },

  addImage(pres: Presentation, slideId: string): Presentation {
    return {
      ...pres,
      slides: pres.slides.map((s) =>
        s.id === slideId ? { ...s, elements: [...s.elements, temp.createImageElement()] } : s
      ),
    };
  },

  removeElement(pres: Presentation, slideId: string, elId: string): Presentation {
    return {
      ...pres,
      slides: pres.slides.map((s) =>
        s.id === slideId ? { ...s, elements: s.elements.filter((el) => el.id !== elId) } : s
      ),
    };
  },

  changeBackground(pres: Presentation, slideId: string, background: Background): Presentation {
    return {
      ...pres,
      slides: pres.slides.map((s) => (s.id === slideId ? { ...s, background } : s)),
    };
  },

  changeTitle(pres: Presentation, title: string): Presentation {
    return { ...pres, title };
  },
};
