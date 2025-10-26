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
  const [pres, setPres] = useState(initialPresentation);
  const [selSlideId, setSelSlideId] = useState(pres.slides[0]?.id || '');
  const [selSlideIds, setSelSlideIds] = useState<string[]>([pres.slides[0]?.id || '']);
  const [selElId, setSelElId] = useState('');

  const slide = pres.slides.find((s) => s.id === selSlideId);

  // === Обновление текущего слайда ===
  const updateSlide = (updater: (s: Slide) => Slide) => {
    if (!slide) return;
    setPres((prev) => ({
      ...prev,
      slides: prev.slides.map((s) => (s.id === selSlideId ? updater(s) : s)),
    }));
  };

  // === Клик по слайду (с поддержкой Ctrl для мультивыбора) ===
  const handleSlideClick = (slideId: string, index: number, multi?: boolean) => {
    if (multi) {
      setSelSlideIds((prev) =>
        prev.includes(slideId) ? prev.filter((id) => id !== slideId) : [...prev, slideId]
      );
    } else {
      setSelSlideId(slideId);
      setSelSlideIds([slideId]);
      setSelElId(''); // сброс выбора элемента при смене слайда
    }

    console.log('Выбран слайд:', slideId, 'Номер:', index + 1);
  };

  // === Обработка действий ===
  const handleAction = (action: string) => {
    console.log('Совершено действие:', action);

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
      const baseSlide = slideMap[action];
      const newSlide: Slide = { ...baseSlide, id: `slide${Date.now()}` };
      setPres(func.addSlide(pres, newSlide));
      setSelSlideId(newSlide.id);
      setSelSlideIds([newSlide.id]);
      return;
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
      return;
    }

    switch (action) {
      case 'Удалить слайд': {
        if (!selSlideId) return;
        const updated = func.removeSlide(pres, selSlideId);
        setPres(updated);
        const nextSlide = updated.slides[0]?.id || '';
        setSelSlideId(nextSlide);
        setSelSlideIds(nextSlide ? [nextSlide] : []);
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

  // === Работа с заголовком ===
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setPres((prev) => ({ ...prev, title: newTitle }));
  };

  const handleTitleCommit = (e: React.FocusEvent<HTMLInputElement>) => {
    console.log('Новое название презентации:', e.target.value);
  };

  const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') e.currentTarget.blur();
  };

  // === Работа с текстом ===
  const handleTextKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') e.currentTarget.blur();
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>, elId: string) => {
    const newValue = e.target.value;
    updateSlide((s) => func.changeText(s, elId, newValue));
  };

  const handleTextCommit = (e: React.FocusEvent<HTMLInputElement>, elId: string) => {
    const newValue = e.target.value;
    updateSlide((s) => func.changeText(s, elId, newValue));
    console.log('Новое содержимое текста:', newValue);
  };

  const handleElementClick = (elementId: string) => {
    setSelElId(elementId);
    console.log('Выбран элемент:', elementId);
  };

  return {
    pres,
    selSlideId,
    selSlideIds,
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
    setSelSlideIds,
  };
}
