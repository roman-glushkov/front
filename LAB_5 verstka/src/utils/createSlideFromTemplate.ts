import { Slide, SlideElement } from '../store/types/presentation';

// Генератор случайного id
const generateId = (prefix: string) => `${prefix}_${Math.random().toString(36).substr(2, 9)}`;

export function createSlideFromTemplate(template: Slide): Slide {
  const newSlideId = generateId('slide');

  const newElements: SlideElement[] = template.elements.map((el) => ({
    ...el,
    id: generateId('el'), // ⚡ уникальный id для каждого элемента
  }));

  return {
    ...template,
    id: newSlideId,
    elements: newElements,
  };
}
