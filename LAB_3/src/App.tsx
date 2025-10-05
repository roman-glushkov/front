import React, { useState } from 'react';
import { Presentation, Slide, TextElement } from './store/types/presentation';
import * as func from './store/functions/presentation';
import * as temp from './store/templates/presentation';
import './view/styles.css';

const initialPresentation: Presentation = {
  title: 'Новая презентация',
  slides: [],
  currentSlideId: '',
  selectedSlideIds: [],
};

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
      case 'Изменить текст': {
        if (slide && selElId) updateSlide((s) => func.changeText(s, selElId, temp.newTextContent));
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

  const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.currentTarget.blur();
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setPres((prev) => ({ ...prev, title: newTitle }));
  };

  const handleTitleCommit = (e: React.FocusEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setPres(func.changeTitle(pres, newTitle));
    console.log('Новое название презентации:', newTitle);
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

  return (
    <div className="container">
      <div className="presentation-info top">
        <h3>Презентация: {pres.title}</h3>
        <input
          value={pres.title}
          onChange={handleTitleChange}
          onBlur={handleTitleCommit}
          onKeyDown={handleTitleKeyDown}
        />
        <p>
          Слайдов: {pres.slides.length} | Выбран: {selSlideId || 'нет'}
        </p>
      </div>

      <div className="header toolbar-split">
        <div className="toolbar-group">
          <button onClick={() => handleAction('Добавить слайд')}>➕ Слайд</button>
          <button onClick={() => handleAction('Удалить слайд')}>🗑️ Удалить</button>
          <button onClick={() => handleAction('Переместить слайд')}>🔀 Переместить</button>
        </div>
        <div className="toolbar-group">
          <button onClick={() => handleAction('Добавить текст')}>📝 Текст</button>
          <button onClick={() => handleAction('Изменить текст')}>✏️ Изменить</button>
          <button onClick={() => handleAction('Изменить размер текста')}>🔠 Размер</button>
          <button onClick={() => handleAction('Изменить шрифт')}>🎨 Шрифт</button>
        </div>
        <div className="toolbar-group">
          <button onClick={() => handleAction('Добавить изображение')}>🖼️ Картинка</button>
          <button onClick={() => handleAction('Удалить элемент')}>❌ Удалить элемент</button>
          <button onClick={() => handleAction('Изменить позицию элемента')}>↔️ Позиция</button>
          <button onClick={() => handleAction('Изменить размер элемента')}>📏 Размер</button>
        </div>
        <div className="toolbar-group">
          <button onClick={() => handleAction('Изменить фон')}>🎨 Фон</button>
        </div>
      </div>

      <div className="main-content">
        <div className="slides-panel">
          <h3>Слайды</h3>
          <div className="slides-container">
            {pres.slides.map((s, i) => (
              <div
                key={s.id}
                onClick={() => handleSlideClick(s.id, i)}
                className={`simple-slide ${selSlideId === s.id ? 'selected' : ''}`}
              >
                Слайд {i + 1}
              </div>
            ))}
          </div>
        </div>

        <div className="workspace-panel">
          <h3>Рабочая область</h3>
          <div className="workspace">
            {slide ? (
              <div
                className="workspace-content"
                style={{
                  backgroundColor:
                    slide.background.type === 'color' ? slide.background.value : 'white',
                }}
              >
                {slide.elements.map((el) => {
                  const textEl = el as TextElement;
                  const backgroundColor = el.type === 'text' ? textEl.color : '#e0e0e0';
                  return (
                    <div
                      key={el.id}
                      onClick={() => handleElementClick(el.id)}
                      className={`element ${selElId === el.id ? 'selected' : ''}`}
                      style={{
                        left: el.position.x,
                        top: el.position.y,
                        width: el.size.width,
                        height: el.size.height,
                        backgroundColor,
                        font:
                          el.type === 'text' ? `${textEl.fontSize}px ${textEl.font}` : '16px Arial',
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
        </div>
      </div>
    </div>
  );
}

export default App;
