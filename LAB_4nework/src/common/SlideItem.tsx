import React from 'react';
import './SlideItem.css';

interface SlideItemProps {
  index: number;
  id: string;
  selected: boolean;
  onClick: (id: string, index: number) => void;
}

const SlideItem: React.FC<SlideItemProps> = ({ index, id, selected, onClick }) => {
  return (
    <div
      className={`simple-slide ${selected ? 'selected' : ''}`}
      onClick={() => onClick(id, index)}
    >
      Слайд {index + 1}
    </div>
  );
};

export default SlideItem;
