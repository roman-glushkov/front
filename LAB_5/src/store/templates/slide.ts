import { Slide } from '../types/presentation';

export const slideTitleAndText: Slide = {
  id: 'slide1',
  background: { type: 'color', value: '#ffffff' },
  elements: [
    {
      type: 'text',
      id: 'title1',
      content: 'Заголовок слайда',
      position: { x: 144, y: 100 },
      size: { width: 660, height: 180 },
      font: 'Arial',
      fontSize: 32,
      color: '#ffffffff',
    },
    {
      type: 'text',
      id: 'desc1',
      content: 'Описание слайда',
      position: { x: 144, y: 300 },
      size: { width: 660, height: 120 },
      font: 'Arial',
      fontSize: 18,
      color: '#ffffffff',
    },
  ],
};
