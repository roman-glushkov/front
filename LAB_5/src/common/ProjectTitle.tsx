import React from 'react';
import { Presentation } from '../store/types/presentation';
import './ProjectTitle.css';

interface Props {
  pres: Presentation;
  onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTitleCommit: (e: React.FocusEvent<HTMLInputElement>) => void;
  onTitleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  selSlideId: string;
}

export default function ProjectTitle({
  pres,
  onTitleChange,
  onTitleCommit,
  onTitleKeyDown,
  selSlideId,
}: Props) {
  return (
    <div className="presentation-info top">
      <h3>Презентация: {pres.title}</h3>
      <input
        value={pres.title}
        onChange={onTitleChange}
        onBlur={onTitleCommit}
        onKeyDown={onTitleKeyDown}
      />
      <p>
        Слайдов: {pres.slides.length} | Выбран: {selSlideId || 'нет'}
      </p>
    </div>
  );
}
