import React from 'react';
import { GroupKey } from '../hooks/useState';
import { GROUPS } from '../constants/config';
import TemplatePopup from './TemplatePopup';
import ColorSection from './ColorSection';

interface Props {
  activeGroup: GroupKey;
  showTemplates: boolean;
  showTextColorPicker: boolean;
  showFillColorPicker: boolean;
  handleAddSlideClick: () => void;
  handleTextColorClick: () => void;
  handleFillColorClick: () => void;
  handleTemplateSelect: (template: string) => void;
  handleColorSelect: (type: 'text' | 'fill', color: string) => void;
  onAction: (action: string) => void;
}

export default function ToolbarGroup({
  activeGroup,
  showTemplates,
  showTextColorPicker,
  showFillColorPicker,
  handleAddSlideClick,
  handleTextColorClick,
  handleFillColorClick,
  handleTemplateSelect,
  handleColorSelect,
  onAction,
}: Props) {
  return (
    <div className="toolbar-group">
      {GROUPS[activeGroup].map(({ label, action }) => (
        <div key={action} className="toolbar-button-wrapper">
          <button
            onClick={() => {
              if (action === 'Добавить слайд') handleAddSlideClick();
              else if (action === 'Изменить цвет текста') handleTextColorClick();
              else if (action === 'Изменить фон текста') handleFillColorClick();
              else onAction(action);
            }}
          >
            {label}
          </button>

          {action === 'Добавить слайд' && showTemplates && (
            <TemplatePopup onSelect={handleTemplateSelect} />
          )}

          {action === 'Изменить цвет текста' && showTextColorPicker && (
            <ColorSection type="text" onSelect={handleColorSelect} />
          )}

          {action === 'Изменить фон текста' && showFillColorPicker && (
            <ColorSection type="fill" onSelect={handleColorSelect} />
          )}
        </div>
      ))}
    </div>
  );
}
