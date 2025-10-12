import { Slide } from '../types/presentation';

export const slideTitle: Slide = {
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
      fontSize: 60,
      color: '#ffffffff',
    },
    {
      type: 'text',
      id: 'desc1',
      content: 'Подзаголовок слайда',
      position: { x: 144, y: 290 },
      size: { width: 660, height: 120 },
      font: 'Arial',
      fontSize: 24,
      color: '#ffffffff',
    },
  ],
};

export const slideTitleAndObject: Slide = {
  id: 'slide2',
  background: { type: 'color', value: '#ffffff' },
  elements: [
    {
      type: 'text',
      id: 'title1',
      content: 'Заголовок слайда',
      position: { x: 70, y: 40 },
      size: { width: 818, height: 100 },
      font: 'Arial',
      fontSize: 44,
      color: '#ffffffff',
    },
    {
      type: 'text',
      id: 'caption1',
      content: 'Текст слайда',
      position: { x: 70, y: 150 },
      size: { width: 818, height: 330 },
      font: 'Arial',
      fontSize: 28,
      color: '#ffffffff',
    },
  ],
};

export const slideSectionHeader: Slide = {
  id: 'slide3',
  background: { type: 'color', value: '#ffffff' },
  elements: [
    {
      type: 'text',
      id: 'title1',
      content: 'Заголовок слайда',
      position: { x: 75, y: 140 },
      size: { width: 808, height: 200 },
      font: 'Arial',
      fontSize: 44,
      color: '#ffffffff',
    },
    {
      type: 'text',
      id: 'caption1',
      content: 'Текст слайда',
      position: { x: 75, y: 345 },
      size: { width: 808, height: 130 },
      font: 'Arial',
      fontSize: 28,
      color: '#ffffffff',
    },
  ],
};

export const slideTwoObjects: Slide = {
  id: 'slide4',
  background: { type: 'color', value: '#ffffff' },
  elements: [
    {
      type: 'text',
      id: 'title1',
      content: 'Заголовок слайда',
      position: { x: 70, y: 40 },
      size: { width: 818, height: 100 },
      font: 'Arial',
      fontSize: 44,
      color: '#ffffffff',
    },
    {
      type: 'text',
      id: 'caption1',
      content: 'Текст слайда',
      position: { x: 70, y: 150 },
      size: { width: 404, height: 330 },
      font: 'Arial',
      fontSize: 28,
      color: '#ffffffff',
    },
    {
      type: 'text',
      id: 'caption2',
      content: 'Текст слайда',
      position: { x: 484, y: 150 },
      size: { width: 404, height: 330 },
      font: 'Arial',
      fontSize: 28,
      color: '#ffffffff',
    },
  ],
};

export const slideСomparison: Slide = {
  id: 'slide5',
  background: { type: 'color', value: '#ffffff' },
  elements: [
    {
      type: 'text',
      id: 'title1',
      content: 'Заголовок слайда',
      position: { x: 70, y: 40 },
      size: { width: 818, height: 100 },
      font: 'Arial',
      fontSize: 44,
      color: '#ffffffff',
    },
    {
      type: 'text',
      id: 'caption1',
      content: 'Текст слайда',
      position: { x: 70, y: 145 },
      size: { width: 404, height: 50 },
      font: 'Arial',
      fontSize: 24,
      color: '#ffffffff',
    },
    {
      type: 'text',
      id: 'caption2',
      content: 'Текст слайда',
      position: { x: 70, y: 200 },
      size: { width: 404, height: 280 },
      font: 'Arial',
      fontSize: 28,
      color: '#ffffffff',
    },
    {
      type: 'text',
      id: 'caption1',
      content: 'Текст слайда',
      position: { x: 484, y: 145 },
      size: { width: 404, height: 50 },
      font: 'Arial',
      fontSize: 24,
      color: '#ffffffff',
    },
    {
      type: 'text',
      id: 'caption2',
      content: 'Текст слайда',
      position: { x: 484, y: 200 },
      size: { width: 404, height: 280 },
      font: 'Arial',
      fontSize: 28,
      color: '#ffffffff',
    },
  ],
};

export const slideJustHeadline: Slide = {
  id: 'slide6',
  background: { type: 'color', value: '#ffffff' },
  elements: [
    {
      type: 'text',
      id: 'title1',
      content: 'Заголовок слайда',
      position: { x: 70, y: 40 },
      size: { width: 818, height: 100 },
      font: 'Arial',
      fontSize: 44,
      color: '#ffffffff',
    },
  ],
};

export const slideEmpty: Slide = {
  id: 'slide7',
  background: { type: 'color', value: '#ffffff' },
  elements: [],
};

export const slideObjectWithSignature: Slide = {
  id: 'slide8',
  background: { type: 'color', value: '#ffffff' },
  elements: [
    {
      type: 'text',
      id: 'title1',
      content: 'Заголовок слайда',
      position: { x: 70, y: 40 },
      size: { width: 354, height: 200 },
      font: 'Arial',
      fontSize: 32,
      color: '#ffffffff',
    },
    {
      type: 'text',
      id: 'caption2',
      content: 'Текст слайда',
      position: { x: 70, y: 200 },
      size: { width: 354, height: 280 },
      font: 'Arial',
      fontSize: 28,
      color: '#ffffffff',
    },
    {
      type: 'text',
      id: 'caption2',
      content: 'Текст слайда',
      position: { x: 454, y: 90 },
      size: { width: 434, height: 390 },
      font: 'Arial',
      fontSize: 28,
      color: '#ffffffff',
    },
  ],
};

export const slideDrawingWithCaption: Slide = {
  id: 'slide9',
  background: { type: 'color', value: '#ffffff' },
  elements: [
    {
      type: 'text',
      id: 'title1',
      content: 'Заголовок слайда',
      position: { x: 70, y: 40 },
      size: { width: 354, height: 200 },
      font: 'Arial',
      fontSize: 32,
      color: '#ffffffff',
    },
    {
      type: 'text',
      id: 'caption2',
      content: 'Текст слайда',
      position: { x: 70, y: 200 },
      size: { width: 354, height: 280 },
      font: 'Arial',
      fontSize: 28,
      color: '#ffffffff',
    },
    {
      type: 'text',
      id: 'caption2',
      content: 'Вставка рисунка',
      position: { x: 454, y: 90 },
      size: { width: 434, height: 390 },
      font: 'Arial',
      fontSize: 28,
      color: '#ffffffff',
    },
  ],
};
