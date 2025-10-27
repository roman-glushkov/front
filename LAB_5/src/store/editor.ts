import React, { useState } from 'react';
import { Presentation, Slide } from './types/presentation';
import * as func from './functions/presentation';
import * as temp from './templates/presentation';
import * as sld from './templates/slide';

export const initialPresentation: Presentation = {
  title: 'Новая презентация',
  slides: [sld.slideTitle],
  currentSlideId: 'slide1',
  selectedSlideIds: ['slide1'],
};

export function useEditor() {
  const [pres, setPres] = useState<Presentation>(initialPresentation);
  const [selSlideId, setSelSlideId] = useState<string>('');
  const [selElId, setSelElId] = useState<string>('');

  const slide: Slide | undefined = pres.slides.find((s) => s.id === selSlideId);

  const updateSlide = (updater: (s: Slide) => Slide): void => {
    if (!slide) return;
    setPres((prev: Presentation) => ({
      ...prev,
      slides: prev.slides.map((s) => (s.id === selSlideId ? updater(s) : s)),
    }));
  };

  const handleAction = (action: string): void => {
    console.log('Совершенное действие:', action);

    const slideMap: Record<string, Slide> = {
      'Добавить Титульный слайд': sld.slideTitle,
      'Добавить Заголовок и объект': sld.slideTitleAndObject,
      'Добавить Заголовок раздела': sld.slideSectionHeader,
      'Добавить Два объекта': sld.slideTwoObjects,
      'Добавить Сравнение': sld.slideComparison,
      'Добавить Только заголовок': sld.slideJustHeadline,
      'Добавить Пустой слайд': sld.slideEmpty,
      'Добавить Объект с подписью': sld.slideObjectWithSignature,
      'Добавить Рисунок с подписью': sld.slideDrawingWithCaption,
    };

    if (slideMap[action]) {
      const baseSlide: Slide = slideMap[action];
      const newSlide: Slide = { ...baseSlide, id: `slide${Date.now()}` };
      setPres(func.addSlide(pres, newSlide));
      setSelSlideId(newSlide.id);
    }

    if (action.startsWith('Изменить цвет текста:')) {
      const color = action.split(':')[1].trim();
      if (slide && selElId) updateSlide((s) => func.changeTextColor(s, selElId, color));
      return;
    }

    if (action.startsWith('Изменить фон текста:')) {
      const color = action.split(':')[1].trim();
      if (slide && selElId) updateSlide((s) => func.changeTextBackgroundColor(s, selElId, color));
      return;
    }

    if (action.startsWith('Изменить фон слайда:')) {
      const color = action.split(': ')[1];
      updateSlide((slide) => ({
        ...slide,
        background: { type: 'color', value: color },
      }));
    }

    switch (action) {
      case 'Удалить слайд': {
        if (!selSlideId) return;
        const updated: Presentation = func.removeSlide(pres, selSlideId);
        setPres(updated);
        setSelSlideId(updated.slides[0]?.id || '');
        setSelElId('');
        break;
      }
      case 'Добавить текст': {
        if (slide) updateSlide((s) => func.addText(s, temp.createTextElement()));
        break;
      }
      case 'Добавить изображение': {
        if (slide) updateSlide((s) => func.addImage(s, temp.createImageElement()));
        break;
      }
      case 'Удалить элемент': {
        if (slide && selElId) {
          updateSlide((s) => func.removeElement(s, selElId));
          setSelElId('');
        }
        break;
      }
      case 'Изменить размер текста': {
        if (slide && selElId) updateSlide((s) => func.changeTextSize(s, selElId, temp.newFontSize));
        break;
      }
      case 'Изменить шрифт': {
        if (slide && selElId) updateSlide((s) => func.changeTextFont(s, selElId, temp.newFont));
        break;
      }
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newTitle = e.target.value;
    setPres((prev) => ({ ...prev, title: newTitle }));
  };

  const handleTitleCommit = (e: React.FocusEvent<HTMLInputElement>): void => {
    const newTitle = e.target.value;
    console.log('Новое название презентации:', newTitle);
  };

  const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') e.currentTarget.blur();
  };

  const handleTextKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') e.currentTarget.blur();
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>, elId: string): void => {
    const newValue = e.target.value;
    updateSlide((s) => func.changeText(s, elId, newValue));
  };

  const handleTextCommit = (e: React.FocusEvent<HTMLInputElement>, elId: string): void => {
    const newValue = e.target.value;
    updateSlide((s) => func.changeText(s, elId, newValue));
    console.log('Новое содержимое текста:', newValue);
  };

  const handleSlideClick = (slideId: string, index: number): void => {
    setSelSlideId(slideId);
    setSelElId('');
    console.log('ID слайда:', slideId, 'Порядковый номер:', index + 1);
  };

  const handleElementClick = (elementId: string): void => {
    setSelElId(elementId);
    console.log('ID элемента:', elementId);
  };

  const reorderSlides = (newOrder: Slide[]): void => {
    setPres((prev) => ({
      ...prev,
      slides: newOrder,
    }));
  };

  return {
    pres,
    selSlideId,
    selElId,
    slide,
    handleAction,
    handleTextChange,
    handleTextCommit,
    handleTextKeyDown,
    handleSlideClick,
    handleElementClick,
    handleTitleKeyDown,
    handleTitleCommit,
    handleTitleChange,
    updateSlide,
    setSelElId,
    reorderSlides,
  };
}
