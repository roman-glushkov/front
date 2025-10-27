import React, { useState } from 'react';
import { useEditor } from './store/editor';
import ProjectTitle from './common/components/ProjectTitle';
import Toolbar from './common/components/Toolbar';
import SlidesPanel from './common/components/SlidesPanel';
import Workspace from './common/components/Workspace';
import './common/view/styles.css';

function App() {
  const {
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
    reorderSlides,
  } = useEditor();

  const [selectedSlideId, setSelectedSlideId] = useState(selSlideId || '');
  const [selectedSlideIds, setSelectedSlideIds] = useState<string[]>([]);

  const onSlideClick = (id: string, index: number, multi?: boolean) => {
    if (multi) {
      setSelectedSlideIds((prev) =>
        prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
      );
    } else {
      setSelectedSlideId(id);
      setSelectedSlideIds([id]);
    }
    handleSlideClick(id, index);
  };

  return (
    <div className="container">
      <ProjectTitle
        pres={pres}
        onTitleChange={handleTitleChange}
        onTitleCommit={handleTitleCommit}
        onTitleKeyDown={handleTitleKeyDown}
        selSlideId={selectedSlideId}
      />

      <Toolbar onAction={handleAction} />

      <div className="main-content">
        <SlidesPanel
          slides={pres.slides}
          selectedSlideId={selectedSlideId}
          selectedSlideIds={selectedSlideIds}
          setSelectedSlideId={setSelectedSlideId}
          setSelectedSlideIds={setSelectedSlideIds}
          onSlideClick={onSlideClick}
          onSlidesReorder={reorderSlides}
        />

        <Workspace
          slide={slide}
          selElId={selElId}
          onElementClick={handleElementClick}
          setSelElId={setSelElId}
          updateSlide={updateSlide}
          handleTextChange={handleTextChange}
          handleTextCommit={handleTextCommit}
          handleTextKeyDown={handleTextKeyDown}
        />
      </div>
    </div>
  );
}

export default App;
