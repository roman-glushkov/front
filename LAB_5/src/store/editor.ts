import React, { useState } from 'react';
import { Presentation, Slide } from './types/presentation';
import * as func from './functions/presentation';
import * as temp from './templates/presentation';
import { slideTitleAndText } from './templates/slide';

export const initialPresentation: Presentation = {
  title: 'Новая презентация',
  slides: [slideTitleAndText],
  currentSlideId: 'slide1',
  selectedSlideIds: ['slide1'],
};

export function useEditor() {
  const [pres, setPres] = useState(initialPresentation);
  const [selSlideId, setSelSlideId] = useState('');
  const [selElId, setSelElId] = useState('');

  const slide = pres.slides.find((s) => s.id === selSlideId);

  const updateSlide = (updater: (s: Slide) => Slide) => {
    if (!slide) return;
    setPres((prev) => ({
      ...prev,
      slides: prev.slides.map((s) => (s.id === selSlideId ? updater(s) : s)),
    }));
  };

  const handleAction = (action: string) => {
    console.log('Совершенное действие:', action);

    switch (action) {
      case 'Добавить слайд': {
        const newSlide = temp.createSlide();
        setPres(func.addSlide(pres, newSlide));
        setSelSlideId(newSlide.id);
        break;
      }
      case 'Удалить слайд': {
        if (!selSlideId) return;
        const updated = func.removeSlide(pres, selSlideId);
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
      case 'Изменить фон': {
        if (slide) updateSlide((s) => func.changeBackground(s, temp.backgroundTemplate));
        break;
      }
      case 'Переместить слайд': {
        if (pres.slides.length > 1 && selSlideId) {
          const idx = pres.slides.findIndex((s) => s.id === selSlideId);
          const newIdx = (idx + 1) % pres.slides.length;
          setPres(func.moveSlide(pres, selSlideId, newIdx));
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
      case 'Изменить позицию элемента': {
        if (slide && selElId)
          updateSlide((s) => func.changeElementPosition(s, selElId, temp.newPosition));
        break;
      }
      case 'Изменить размер элемента': {
        if (slide && selElId) updateSlide((s) => func.changeElementSize(s, selElId, temp.newSize));
        break;
      }
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setPres((prev) => ({ ...prev, title: newTitle }));
  };

  const handleTitleCommit = (e: React.FocusEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    console.log('Новое название презентации:', newTitle);
  };

  const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') e.currentTarget.blur();
  };

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

  const handleSlideClick = (slideId: string, index: number) => {
    setSelSlideId(slideId);
    setSelElId('');
    console.log('ID слайда:', slideId, 'Порядковый номер:', index + 1);
  };

  const handleElementClick = (elementId: string) => {
    setSelElId(elementId);
    console.log('ID элемента:', elementId);
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
  };
}
