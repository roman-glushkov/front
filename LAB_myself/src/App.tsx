// src/App.tsx
import React, { useRef, useState } from 'react';
import { Editor } from './store/editor';
import Toolbar from './common/Toolbar';
import SlidesPanel from './common/SlidesPanel';
import Workspace from './common/Workspace';
import './view/styles.css';
import { Presentation } from './store/types/presentation';

const initialPresentation: Presentation = {
  title: 'Новая презентация',
  slides: [],
  currentSlideId: '',
  selectedSlideIds: [],
};

function App() {
  const editorRef = useRef<Editor>(new Editor(initialPresentation));
  const [, setVersion] = useState(0);
  const refresh = () => setVersion((v) => v + 1);

  // actions
  const handleAction = (action: string) => {
    editorRef.current.doAction(action);
    refresh();
  };

  const handleSelectSlide = (id: string, index: number) => {
    editorRef.current.selectSlide(id, index);
    refresh();
  };

  const handleSelectElement = (elId: string, bg: string, slideId: string) => {
    editorRef.current.selectElement(elId, bg, slideId);
    refresh();
  };

  const handleSaveText = (elId: string, newText: string) => {
    // сохраняем конкретный элемент (не "на каждый символ")
    editorRef.current.changeText(newText, elId);
    refresh();
  };

  const handleTitleCommit = (title: string) => {
    editorRef.current.changeTitle(title);
    refresh();
  };

  return (
    <div className="container">
      {/* Заголовок / информация */}
      <div className="presentation-info top">
        <h3>Презентация: {editorRef.current.pres.title}</h3>
        <input
          defaultValue={editorRef.current.pres.title}
          placeholder="Название презентации"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              const val = (e.target as HTMLInputElement).value;
              handleTitleCommit(val);
              (e.target as HTMLInputElement).blur();
            }
          }}
          onBlur={(e) => {
            const val = (e.target as HTMLInputElement).value;
            handleTitleCommit(val);
          }}
        />
        <p>
          Слайдов: {editorRef.current.pres.slides.length} | Выбран:{' '}
          {editorRef.current.selSlideId || 'нет'}
        </p>
      </div>

      {/* Toolbar */}
      <Toolbar onAction={handleAction} />

      {/* main */}
      <div className="main-content">
        <SlidesPanel
          slides={editorRef.current.pres.slides}
          selectedId={editorRef.current.selSlideId}
          onSelect={(id, idx) => handleSelectSlide(id, idx)}
        />

        <Workspace
          slide={editorRef.current.currentSlide}
          selectedElId={editorRef.current.selElId}
          onSelectElement={(elId, bg, slideId) => handleSelectElement(elId, bg, slideId)}
          onSaveText={(elId, newText) => handleSaveText(elId, newText)}
        />

        <div className="tools-panel">
          <h3>Доп. настройки</h3>
          <p>Здесь можно будет добавить больше контролов.</p>
        </div>
      </div>
    </div>
  );
}

export default App;
