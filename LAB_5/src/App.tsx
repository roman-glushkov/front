import React from 'react';
import { useEditor } from './store/editor';
import ProjectTitle from './common/ProjectTitle';
import Toolbar from './common/Toolbar';
import SlidesPanel from './common/SlidesPanel';
import Workspace from './common/Workspace';
import './view/styles.css';

function App() {
  const {
    pres,
    selSlideId,
    selElId,
    slide,
    handleAction,
    handleTitleChange,
    handleTitleCommit,
    handleTitleKeyDown,
    handleSlideClick,
    handleElementClick,
  } = useEditor();

  return (
    <div className="container">
      <ProjectTitle
        pres={pres}
        onTitleChange={handleTitleChange}
        onTitleCommit={handleTitleCommit}
        onTitleKeyDown={handleTitleKeyDown}
        selSlideId={selSlideId}
      />

      <Toolbar onAction={handleAction} />

      <div className="main-content">
        <SlidesPanel
          slides={pres.slides}
          selectedSlideId={selSlideId}
          onSlideClick={handleSlideClick}
        />

        <Workspace slide={slide} selElId={selElId} onElementClick={handleElementClick} />
      </div>
    </div>
  );
}

export default App;
