// src/store/editor.ts
import { Presentation, Slide } from './types/presentation';
import * as fns from './functions/presentation';
import * as tpl from './templates/presentation';

export class Editor {
  pres: Presentation;
  selSlideId: string = '';
  selElId: string = '';

  constructor(initial: Presentation) {
    this.pres = initial;
  }

  get currentSlide(): Slide | undefined {
    return this.pres.slides.find((s) => s.id === this.selSlideId);
  }

  // --- Слайды ---
  addSlide() {
    const newSlide = tpl.createSlide();
    this.pres = fns.addSlide(this.pres, newSlide);
    this.selSlideId = newSlide.id;
    console.log('Добавлен слайд:', newSlide.id);
  }

  removeSlide() {
    if (!this.selSlideId) return;
    this.pres = fns.removeSlide(this.pres, this.selSlideId);
    this.selSlideId = this.pres.slides[0]?.id || '';
    this.selElId = '';
    console.log('Слайд удалён, новый выбран:', this.selSlideId);
  }

  moveSlide() {
    if (this.pres.slides.length > 1 && this.selSlideId) {
      const idx = this.pres.slides.findIndex((s) => s.id === this.selSlideId);
      const newIdx = (idx + 1) % this.pres.slides.length;
      this.pres = fns.moveSlide(this.pres, this.selSlideId, newIdx);
      console.log('Перемещён слайд:', this.selSlideId, 'в индекс', newIdx);
    }
  }

  // --- Элементы ---
  addText() {
    if (this.currentSlide) {
      this.updateSlide((s) => fns.addText(s, tpl.createTextElement()));
      console.log('Добавлен текст в слайд:', this.selSlideId);
    }
  }

  addImage() {
    if (this.currentSlide) {
      this.updateSlide((s) => fns.addImage(s, tpl.createImageElement()));
      console.log('Добавлено изображение в слайд:', this.selSlideId);
    }
  }

  removeElement() {
    if (this.currentSlide && this.selElId) {
      this.updateSlide((s) => fns.removeElement(s, this.selElId));
      console.log('Удалён элемент:', this.selElId);
      this.selElId = '';
    }
  }

  // Теперь changeText принимает текст и (опционально) id элемента
  changeText(newText: string, elementId?: string) {
    const targetId = elementId ?? this.selElId;
    if (!targetId || !this.currentSlide) return;
    this.updateSlide((s) => fns.changeText(s, targetId, newText));
    console.log('Изменён текст элемента:', targetId, '→', newText);
  }

  changeTextSize() {
    if (this.currentSlide && this.selElId) {
      this.updateSlide((s) => fns.changeTextSize(s, this.selElId, tpl.newFontSize));
      console.log('Изменён размер текста элемента:', this.selElId);
    }
  }

  changeTextFont() {
    if (this.currentSlide && this.selElId) {
      this.updateSlide((s) => fns.changeTextFont(s, this.selElId, tpl.newFont));
      console.log('Изменён шрифт текста элемента:', this.selElId);
    }
  }

  changeElementPosition() {
    if (this.currentSlide && this.selElId) {
      this.updateSlide((s) => fns.changeElementPosition(s, this.selElId, tpl.newPosition));
      console.log('Изменена позиция элемента:', this.selElId);
    }
  }

  changeElementSize() {
    if (this.currentSlide && this.selElId) {
      this.updateSlide((s) => fns.changeElementSize(s, this.selElId, tpl.newSize));
      console.log('Изменен размер элемента:', this.selElId);
    }
  }

  // --- Фон ---
  changeBackground() {
    if (this.currentSlide) {
      this.updateSlide((s) => fns.changeBackground(s, tpl.backgroundTemplate));
      console.log('Фон изменён на слайде:', this.selSlideId);
    }
  }

  // --- Название ---
  changeTitle(newTitle: string) {
    this.pres = fns.changeTitle(this.pres, newTitle);
    console.log('Изменено название презентации:', newTitle);
  }

  // --- Служебные методы ---
  selectSlide(slideId: string, index: number) {
    this.selSlideId = slideId;
    this.selElId = '';
    console.log('Выбран слайд:', slideId, '№', index + 1);
  }

  selectElement(elementId: string, backgroundColor: string, slideId: string) {
    this.selElId = elementId;
    this.selSlideId = slideId;
    console.log('Выбран элемент:', elementId, 'на слайде:', slideId, 'bg:', backgroundColor);
  }

  private updateSlide(updater: (s: Slide) => Slide) {
    if (!this.selSlideId) return;
    this.pres = {
      ...this.pres,
      slides: this.pres.slides.map((s) => (s.id === this.selSlideId ? updater(s) : s)),
    };
  }

  // Универсальный обработчик действий (используется Toolbar)
  doAction(action: string) {
    switch (action) {
      case 'Добавить слайд':
        this.addSlide();
        break;
      case 'Удалить слайд':
        this.removeSlide();
        break;
      case 'Переместить слайд':
        this.moveSlide();
        break;
      case 'Добавить текст':
        this.addText();
        break;
      case 'Изменить текст':
        // старый путь — оставляем как заглушку: обычно используется inline-редактирование
        if (this.selElId) console.log('Запрошено изменение текста (кнопка) для', this.selElId);
        break;
      case 'Изменить размер текста':
        this.changeTextSize();
        break;
      case 'Изменить шрифт':
        this.changeTextFont();
        break;
      case 'Добавить изображение':
        this.addImage();
        break;
      case 'Удалить элемент':
        this.removeElement();
        break;
      case 'Изменить позицию элемента':
        this.changeElementPosition();
        break;
      case 'Изменить размер элемента':
        this.changeElementSize();
        break;
      case 'Изменить фон':
        this.changeBackground();
        break;
    }
  }
}
