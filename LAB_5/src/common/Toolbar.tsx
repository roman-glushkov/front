import React, { useState } from 'react';
import './Toolbar.css';

interface Props {
  onAction: (action: string) => void;
}

type GroupKey = 'slides' | 'text' | 'elements' | 'design';

interface GroupButton {
  label: string;
  action: string;
}

export default function Toolbar({ onAction }: Props) {
  const [activeGroup, setActiveGroup] = useState<GroupKey>('slides');

  const groups: Record<GroupKey, GroupButton[]> = {
    slides: [
      { label: '➕ Слайд', action: 'Добавить слайд' },
      { label: '🗑️ Удалить', action: 'Удалить слайд' },
      { label: '🔀 Переместить', action: 'Переместить слайд' },
    ],
    text: [
      { label: '📝 Текст', action: 'Добавить текст' },
      { label: '🔠 Размер', action: 'Изменить размер текста' },
      { label: '🎨 Шрифт', action: 'Изменить шрифт' },
    ],
    elements: [
      { label: '🖼️ Картинка', action: 'Добавить изображение' },
      { label: '❌ Удалить', action: 'Удалить элемент' },
      { label: '↔️ Позиция', action: 'Изменить позицию элемента' },
      { label: '📏 Размер', action: 'Изменить размер элемента' },
    ],
    design: [{ label: '🎨 Фон', action: 'Изменить фон' }],
  };

  const titles: { key: GroupKey; name: string }[] = [
    { key: 'slides', name: 'Слайды' },
    { key: 'text', name: 'Текст' },
    { key: 'elements', name: 'Элементы' },
    { key: 'design', name: 'Дизайн' },
  ];

  return (
    <div className="toolbar-container">
      <div className="toolbar-tabs">
        {titles.map(({ key, name }) => (
          <button
            key={key}
            className={`toolbar-tab ${activeGroup === key ? 'active' : ''}`}
            onClick={() => setActiveGroup(key)}
          >
            {name}
          </button>
        ))}
      </div>

      <div className="toolbar-group">
        {groups[activeGroup].map(({ label, action }) => (
          <button key={action} onClick={() => onAction(action)}>
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
