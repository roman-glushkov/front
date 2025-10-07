import React, { useState } from 'react';
import { Presentation } from './store/types/presentation';
import { Editor } from './store/editor';
import Toolbar from './common/Toolbar';
import SlidesPanel from './common/SlidesPanel';
import Workspace from './common/Workspace';
import './view/styles.css';

const initialPresentation: Presentation = {
  title: 'Новая презентация',
  slides: [],
  currentSlideId: '',
  selectedSlideIds: [],
};

function App() {
  const [editor] = useState(new Editor(initialPresentation));
  const [, forceUpdate] = useState({});
  const rerender = () => forceUpdate({});

  return (
    <div className="container">
      <div className="presentation-info top">
        <h3>Презентация: {editor.pres.title}</h3>
        <input
          value={editor.pres.title}
          onChange={(e) => {
            editor.changeTitle(e.target.value);
            rerender();
          }}
          placeholder="Название презентации"
        />
        <p>
          Слайдов: {editor.pres.slides.length} | Выбран: {editor.selSlideId || 'нет'}
        </p>
      </div>
      <Toolbar
        onAction={(action) => {
          editor.doAction(action);
          rerender();
        }}
      />
      <div className="main-content">
        <SlidesPanel editor={editor} onUpdate={rerender} />
        <Workspace editor={editor} onUpdate={rerender} />
        <div className="tools-panel">
          <h3>Доп. настройки</h3>
          <p>Здесь будет настройка цветовой гаммы или другое.</p>
        </div>
      </div>
    </div>
  );
}

export default App;
