import { Slide, TextElement, ImageElement, Background } from '../types/presentation';

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
  color: '#000000ff',
};

import placeholder from '../../assets/react.jpg';

export const imageElementTemplate: ImageElement = {
  type: 'image',
  id: '',
  src: placeholder,
  position: { x: 100, y: 100 },
  size: { width: 0, height: 0 },
};

export const backgroundTemplate: Background = {
  type: 'color',
  value: '#0026ffff',
};

export const newPosition = { x: 200, y: 200 };
export const newSize = { width: 200, height: 100 };
export const newFontSize = 20;
export const newFont = 'Verdana';

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
