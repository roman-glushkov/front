import React, { useState } from 'react';
import { Presentation, Slide, TextElement } from './store/types/presentation';
import * as fns from './store/functions/presentation';
import * as tpl from './store/templates/presentation';
import './view/styles.css';

//начальное состояние презентации
const initialPresentation: Presentation = {
  title: 'Новая презентация',
  slides: [],
  currentSlideId: '',
  selectedSlideIds: [],
};

//массив кнопок интерфейса
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
  const [pres, setPres] = useState(initialPresentation); //состояние всей презентации
  const [selSlideId, setSelSlideId] = useState(''); //ID выбранного слайда
  const [selElId, setSelElId] = useState(''); //ID выбранного элемента

  const slide = pres.slides.find((s) => s.id === selSlideId);

  //функция для обновления слайда
  const updateSlide = (updater: (s: Slide) => Slide) => {
    if (!slide) return;
    setPres((prev) => ({
      ...prev,
      slides: prev.slides.map((s) => (s.id === selSlideId ? updater(s) : s)),
    }));
  };

  const handleAction = (action: string) => {
    // Вывод в консоль названия действия
    console.log('Совершенное действие:', action);

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

  // Обработчик изменения названия презентации
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setPres(fns.changeTitle(pres, newTitle));
    // Вывод в консоль нового названия
    console.log('Новое название презентации:', newTitle);
  };

  // Обработчик клика по слайду
  const handleSlideClick = (slideId: string, index: number) => {
    setSelSlideId(slideId);
    setSelElId('');
    // Вывод в консоль id слайда и его порядкового номера
    console.log('ID слайда:', slideId, 'Порядковый номер:', index + 1);
  };

  // Обработчик клика по элементу
  const handleElementClick = (elementId: string, backgroundColor: string, slideId: string) => {
    setSelElId(elementId);
    setSelSlideId(slideId);
    // Вывод в консоль id элемента и его цвета фона
    console.log('ID элемента:', elementId, 'Цвет фона:', backgroundColor);
  };

  return (
    <div className="container">
      {/* информации о презентации*/}
      <h1>Presentation Maker</h1>
      <div className="section">
        <h3>Презентация: {pres.title}</h3>
        <input
          value={pres.title}
          onChange={handleTitleChange} // Используем отдельный обработчик
          placeholder="Название презентации"
        />
        <p>
          Слайдов: {pres.slides.length} | Выбран: {selSlideId || 'нет'}
        </p>
      </div>

      {/*панель слайдов*/}
      <div className="section">
        <h4>Слайды:</h4>
        <div className="toolbar">
          {pres.slides.map((s, i) => (
            <div
              key={s.id}
              onClick={() => handleSlideClick(s.id, i)}
              // подсвечиваем выбранный слайд
              className={`slide ${selSlideId === s.id ? 'selected' : ''}`}
            >
              Слайд {i + 1}
            </div>
          ))}
        </div>
      </div>

      {/* рабочая область */}
      <div className="workspace">
        <h4>Рабочая область:</h4>
        {slide ? (
          <div
            style={{
              // устанавливаем фон слайда
              backgroundColor: slide.background.type === 'color' ? slide.background.value : 'white',
              padding: '20px',
              minHeight: '300px',
              position: 'relative',
            }}
          >
            {' '}
            {/*отображение элементов на слайде*/}
            {slide.elements.map((el) => {
              const textEl = el as TextElement;
              const backgroundColor = el.type === 'text' ? textEl.color : '#e0e0e0';

              return (
                <div
                  key={el.id}
                  onClick={() => handleElementClick(el.id, backgroundColor, slide.id)}
                  // подсветка элемента
                  className={`element ${selElId === el.id ? 'selected' : ''}`}
                  style={{
                    left: el.position.x,
                    top: el.position.y,
                    width: el.size.width,
                    height: el.size.height,
                    backgroundColor: backgroundColor,
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

      {/*панель инструментов*/}
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
