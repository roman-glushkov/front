import React, { useState } from 'react';
import { Presentation, Slide, TextElement } from './store/types/presentation';
import { Editor } from './store/editor';
import Toolbar from './common/Toolbar';
import SlideItem from './common/SlideItem';
import WorkspacePanel from './common/WorkspacePanel';
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

  const handleSlideClick = (slideId: string) => {
    setSelSlideId(slideId);
    setSelElId('');
  };

  const handleElementClick = (elId: string) => {
    setSelElId(elId);
  };

  const handleAction = (action: string) => {
    let newPres = pres;
    if (!slide && action !== 'Добавить слайд') return;

    switch (action) {
      case 'Добавить слайд':
        const newSlide = Editor.addSlide(pres).slides.slice(-1)[0];
        setPres(Editor.addSlide(pres, newSlide));
        setSelSlideId(newSlide.id);
        break;
      case 'Удалить слайд':
        if (!selSlideId) return;
        newPres = Editor.removeSlide(pres, selSlideId);
        setPres(newPres);
        setSelSlideId(newPres.slides[0]?.id || '');
        setSelElId('');
        break;
      case 'Переместить слайд':
        if (pres.slides.length > 1 && selSlideId) {
          const idx = pres.slides.findIndex((s) => s.id === selSlideId);
          const newIdx = (idx + 1) % pres.slides.length;
          setPres(Editor.moveSlide(pres, selSlideId, newIdx));
        }
        break;
      case 'Добавить текст':
        setPres(Editor.addText(slide!));
        break;
      case 'Добавить изображение':
        setPres(Editor.addImage(slide!));
        break;
      case 'Удалить элемент':
        if (selElId) setPres(Editor.removeElement(slide!, selElId));
        setSelElId('');
        break;
      case 'Изменить фон':
        setPres(Editor.changeBackground(slide!, { ...slide!.background }));
        break;
      default:
        break;
    }
  };

  return (
    <div className="container">
      <div className="presentation-info top">
        <h3>Презентация: {pres.title}</h3>
        <input
          value={pres.title}
          onChange={(e) => setPres(Editor.changeTitle(pres, e.target.value))}
        />
        <p>
          Слайдов: {pres.slides.length} | Выбран: {selSlideId || 'нет'}
        </p>
      </div>

      <Toolbar handleAction={handleAction} />

      <div className="main-content">
        <div className="slides-panel">
          {pres.slides.map((s, i) => (
            <SlideItem
              key={s.id}
              slide={s}
              index={i}
              selected={s.id === selSlideId}
              onClick={() => handleSlideClick(s.id)}
            />
          ))}
        </div>

        <WorkspacePanel slide={slide} selectedElId={selElId} onElementClick={handleElementClick} />
      </div>
    </div>
  );
}

export default App;
