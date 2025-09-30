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
    const removedId = this.selSlideId;
    this.pres = fns.removeSlide(this.pres, this.selSlideId);
    this.selSlideId = this.pres.slides[0]?.id || '';
    this.selElId = '';
    console.log('Удален слайд:', removedId);
  }

  moveSlide() {
    if (this.pres.slides.length > 1 && this.selSlideId) {
      const idx = this.pres.slides.findIndex((s) => s.id === this.selSlideId);
      const newIdx = (idx + 1) % this.pres.slides.length;
      this.pres = fns.moveSlide(this.pres, this.selSlideId, newIdx);
      console.log('Перемещен слайд:', this.selSlideId);
    }
  }

  // --- Элементы ---
  addText() {
    if (this.currentSlide) {
      this.updateSlide((s) => fns.addText(s, tpl.createTextElement()));
      console.log('Добавлен текст');
    }
  }

  addImage() {
    if (this.currentSlide) {
      this.updateSlide((s) => fns.addImage(s, tpl.createImageElement()));
      console.log('Добавлено изображение');
    }
  }

  removeElement() {
    if (this.currentSlide && this.selElId) {
      const removed = this.selElId;
      this.updateSlide((s) => fns.removeElement(s, this.selElId));
      this.selElId = '';
      console.log('Удален элемент:', removed);
    }
  }

  changeText() {
    if (this.currentSlide && this.selElId) {
      this.updateSlide((s) => fns.changeText(s, this.selElId, tpl.newTextContent));
      console.log('Изменен текст элемента:', this.selElId);
    }
  }

  changeTextSize() {
    if (this.currentSlide && this.selElId) {
      this.updateSlide((s) => fns.changeTextSize(s, this.selElId, tpl.newFontSize));
      console.log('Изменен размер текста элемента:', this.selElId);
    }
  }

  changeTextFont() {
    if (this.currentSlide && this.selElId) {
      this.updateSlide((s) => fns.changeTextFont(s, this.selElId, tpl.newFont));
      console.log('Изменен шрифт текста элемента:', this.selElId);
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
      console.log('Фон изменен');
    }
  }

  // --- Название ---
  changeTitle(newTitle: string) {
    this.pres = fns.changeTitle(this.pres, newTitle);
    console.log('Новое название презентации:', newTitle);
  }

  // --- Выбор ---
  selectSlide(slideId: string, index: number) {
    this.selSlideId = slideId;
    this.selElId = '';
    console.log('ID слайда:', slideId, 'Порядковый номер:', index + 1);
  }

  selectElement(elementId: string, backgroundColor: string, slideId: string) {
    this.selElId = elementId;
    this.selSlideId = slideId;
    console.log('ID элемента:', elementId, 'Цвет фона:', backgroundColor);
  }

  // вспомогательный
  private updateSlide(updater: (s: Slide) => Slide) {
    if (!this.currentSlide) return;
    this.pres = {
      ...this.pres,
      slides: this.pres.slides.map((s) => (s.id === this.selSlideId ? updater(s) : s)),
    };
  }

  // Универсальный обработчик (удобно для тулбара)
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
      case 'Добавить изображение':
        this.addImage();
        break;
      case 'Удалить элемент':
        this.removeElement();
        break;
      case 'Изменить фон':
        this.changeBackground();
        break;
      case 'Изменить текст':
        this.changeText();
        break;
      case 'Изменить размер текста':
        this.changeTextSize();
        break;
      case 'Изменить шрифт':
        this.changeTextFont();
        break;
      case 'Изменить позицию элемента':
        this.changeElementPosition();
        break;
      case 'Изменить размер элемента':
        this.changeElementSize();
        break;
      default:
        console.warn('Неизвестное действие:', action);
    }
  }
}
