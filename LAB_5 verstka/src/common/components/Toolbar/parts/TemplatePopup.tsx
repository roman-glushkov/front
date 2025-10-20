import React from 'react';
import { TEMPLATES } from '../constants/templates';

interface Props {
  onSelect: (templateKey: string) => void;
}

export default function TemplatePopup({ onSelect }: Props) {
  return (
    <div className="template-popup">
      {TEMPLATES.map((t) => (
        <button key={t.key} className="template-btn" onClick={() => onSelect(t.key)}>
          {t.label}
        </button>
      ))}
    </div>
  );
}
