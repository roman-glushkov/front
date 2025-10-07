import { Slide, TextElement, ImageElement, Background } from '../types/presentation';

// Шаблоны для создания новых элементов
export const slideTemplate: Slide = {
  id: '',
  background: { type: 'color', value: '#FFFFFF' },
  elements: [],
};

export const textElementTemplate: TextElement = {
  type: 'text',
  id: '',
  content: 'Новый текст',
  position: { x: 50, y: 50 },
  size: { width: 200, height: 30 },
  font: 'Arial',
  fontSize: 16,
  color: '#ffffffff',
};

export const imageElementTemplate: ImageElement = {
  type: 'image',
  id: '',
  src: 'image.jpg',
  position: { x: 100, y: 100 },
  size: { width: 200, height: 150 },
};

export const backgroundTemplate: Background = {
  type: 'color',
  value: '#0026ffff',
};

// Позиции и размеры для изменений
export const newPosition = { x: 200, y: 200 };
export const newSize = { width: 200, height: 100 };
export const newTextContent = 'Измененный текст';
export const newFontSize = 20;
export const newFont = 'Verdana';

// Вспомогательные функции для создания элементов с уникальными ID
export const createSlide = (): Slide => ({
  ...slideTemplate,
  id: `slide${Date.now()}`,
});

export const createTextElement = (): TextElement => ({
  ...textElementTemplate,
  id: `text${Date.now()}`,
});

export const createImageElement = (): ImageElement => ({
  ...imageElementTemplate,
  id: `img${Date.now()}`,
});
