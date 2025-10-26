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
    handleAction,
    handleTextChange,
    handleTextCommit,
    handleTextKeyDown,
    handleTitleKeyDown,
    handleTitleCommit,
    handleTitleChange,
    handleElementClick,
    updateSlide,
  } = useEditor();

  // текущий слайд и мультивыбор
  const [selSlideId, setSelSlideId] = useState<string>(pres.slides[0]?.id || '');
  const [selSlideIds, setSelSlideIds] = useState<string[]>([selSlideId]);

  const [selElIds, setSelElIds] = useState<string[]>([]);

  // клик по слайду
  const handleSlideClick = (slideId: string, index: number, multi?: boolean) => {
    if (multi) {
      setSelSlideIds((prev) =>
        prev.includes(slideId) ? prev.filter((id) => id !== slideId) : [...prev, slideId]
      );
      setSelSlideId(slideId);
    } else {
      setSelSlideId(slideId);
      setSelSlideIds([slideId]);
    }
  };

  // drag-n-drop (упрощенный)
  const handleSlidesReorder = (newOrder: typeof pres.slides) => {
    pres.slides = newOrder;
  };

  const currentSlide = pres.slides.find((s) => s.id === selSlideId);

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
          selectedSlideIds={selSlideIds}
          setSelectedSlideId={setSelSlideId}
          setSelectedSlideIds={setSelSlideIds}
          onSlideClick={handleSlideClick}
          onSlidesReorder={handleSlidesReorder}
        />

        <Workspace
          slide={currentSlide}
          selElIds={selElIds}
          setSelElIds={setSelElIds}
          updateSlide={updateSlide}
          handleTextChange={handleTextChange}
          handleTextCommit={handleTextCommit}
          handleTextKeyDown={handleTextKeyDown}
          handleElementClick={handleElementClick}
          preview={false}
        />
      </div>
    </div>
  );
}

export default App;
