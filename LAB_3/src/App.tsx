import React, { useState } from 'react';
import { Presentation, Slide, TextElement } from './store/types/presentation';
import * as fns from './store/functions/presentation';
import * as tpl from './store/templates/presentation';
import './view/styles.css';

const initialPresentation: Presentation = {
  title: 'Новая презентация',
  slides: [],
  currentSlideId: '',
  selectedSlideIds: [],
};

const actions = [
  'Добавить слайд',
  'Удалить слайд',
  'Добавить текст',
  'Добавить изображение',
  'Удалить элемент',
  'Изменить фон',
  'Переместить слайд',
  'Изменить текст',
  'Изменить размер текста',
  'Изменить шрифт',
  'Изменить позицию элемента',
  'Изменить размер элемента',
];

function App() {
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
    switch (action) {
      case 'Добавить слайд': {
        const newSlide = tpl.createSlide();
        setPres(fns.addSlide(pres, newSlide));
        setSelSlideId(newSlide.id);
        break;
      }

      case 'Удалить слайд': {
        if (!selSlideId) return;
        const updated = fns.removeSlide(pres, selSlideId);
        setPres(updated);
        setSelSlideId(updated.slides[0]?.id || '');
        setSelElId('');
        break;
      }

      case 'Добавить текст': {
        if (slide) updateSlide((s) => fns.addText(s, tpl.createTextElement()));
        break;
      }

      case 'Добавить изображение': {
        if (slide) updateSlide((s) => fns.addImage(s, tpl.createImageElement()));
        break;
      }

      case 'Удалить элемент': {
        if (slide && selElId) {
          updateSlide((s) => fns.removeElement(s, selElId));
          setSelElId('');
        }
        break;
      }

      case 'Изменить фон': {
        if (slide) updateSlide((s) => fns.changeBackground(s, tpl.backgroundTemplate));
        break;
      }

      case 'Переместить слайд': {
        if (pres.slides.length > 1 && selSlideId) {
          const idx = pres.slides.findIndex((s) => s.id === selSlideId);
          const newIdx = (idx + 1) % pres.slides.length;
          setPres(fns.moveSlide(pres, selSlideId, newIdx));
        }
        break;
      }

      case 'Изменить текст': {
        if (slide && selElId) updateSlide((s) => fns.changeText(s, selElId, tpl.newTextContent));
        break;
      }

      case 'Изменить размер текста': {
        if (slide && selElId) updateSlide((s) => fns.changeTextSize(s, selElId, tpl.newFontSize));
        break;
      }

      case 'Изменить шрифт': {
        if (slide && selElId) updateSlide((s) => fns.changeTextFont(s, selElId, tpl.newFont));
        break;
      }

      case 'Изменить позицию элемента': {
        if (slide && selElId)
          updateSlide((s) => fns.changeElementPosition(s, selElId, tpl.newPosition));
        break;
      }

      case 'Изменить размер элемента': {
        if (slide && selElId) updateSlide((s) => fns.changeElementSize(s, selElId, tpl.newSize));
        break;
      }
    }
  };

  return (
    <div className="container">
      <h1>Presentation Maker</h1>

      <div className="section">
        <h3>Презентация: {pres.title}</h3>
        <input
          value={pres.title}
          onChange={(e) => setPres(fns.changeTitle(pres, e.target.value))}
          placeholder="Название презентации"
        />
        <p>
          Слайдов: {pres.slides.length} | Выбран: {selSlideId || 'нет'}
        </p>
      </div>

      <div className="section">
        <h4>Слайды:</h4>
        <div className="toolbar">
          {pres.slides.map((s, i) => (
            <div
              key={s.id}
              onClick={() => {
                setSelSlideId(s.id);
                setSelElId('');
              }}
              className={`slide ${selSlideId === s.id ? 'selected' : ''}`}
            >
              Слайд {i + 1}
            </div>
          ))}
        </div>
      </div>

      <div className="workspace">
        <h4>Рабочая область:</h4>
        {slide ? (
          <div
            style={{
              backgroundColor: slide.background.type === 'color' ? slide.background.value : 'white',
              padding: '20px',
              minHeight: '300px',
              position: 'relative',
            }}
          >
            {slide.elements.map((el) => {
              const textEl = el as TextElement;
              return (
                <div
                  key={el.id}
                  onClick={() => {
                    setSelElId(el.id);
                    setSelSlideId(slide.id);
                  }}
                  className={`element ${selElId === el.id ? 'selected' : ''}`}
                  style={{
                    left: el.position.x,
                    top: el.position.y,
                    width: el.size.width,
                    height: el.size.height,
                    backgroundColor: el.type === 'text' ? textEl.color : '#e0e0e0',
                    font: el.type === 'text' ? `${textEl.fontSize}px ${textEl.font}` : '16px Arial',
                  }}
                >
                  {el.type === 'text' ? textEl.content : '🖼️'}
                </div>
              );
            })}
          </div>
        ) : (
          <p>Выберите слайд</p>
        )}
      </div>

      <div className="section">
        <h4>Инструменты:</h4>
        <div className="toolbar">
          {actions.map((action) => (
            <button key={action} onClick={() => handleAction(action)}>
              {action}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
