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
  const [showTemplates, setShowTemplates] = useState(false);

  const handleAddSlideClick = () => {
    setShowTemplates(!showTemplates);
  };

  const handleTemplateSelect = (template: string) => {
    onAction(template);
    setShowTemplates(false);
  };

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

  const templates = [
    { label: '🏆 Титульный слайд', key: 'Добавить Титульный слайд' },
    { label: '🧩 Заголовок и объект', key: 'Добавить Заголовок и объект' },
    { label: '🏞️ Заголовок раздела', key: 'Добавить Заголовок раздела' },
    { label: '💼 Два объекта', key: 'Добавить Два объекта' },
    { label: '⚖️ Сравнение', key: 'Добавить Сравнение' },
    { label: '📰 Только заголовок', key: 'Добавить Только заголовок' },
    { label: '📄 Пустой слайд', key: 'Добавить Пустой слайд' },
    { label: '🖋️ Объект с подписью', key: 'Добавить Объект с подписью' },
    { label: '🌈 Рисунок с подписью', key: 'Добавить Рисунок с подписью' },
  ];

  return (
    <div className="toolbar-container">
      <div className="toolbar-tabs">
        {titles.map(({ key, name }) => (
          <button
            key={key}
            className={`toolbar-tab ${activeGroup === key ? 'active' : ''}`}
            onClick={() => {
              setActiveGroup(key);
              setShowTemplates(false);
            }}
          >
            {name}
          </button>
        ))}
      </div>

      <div className="toolbar-group">
        {groups[activeGroup].map(({ label, action }) => (
          <div key={action} className="toolbar-button-wrapper">
            <button
              onClick={() =>
                action === 'Добавить слайд' ? handleAddSlideClick() : onAction(action)
              }
            >
              {label}
            </button>

            {action === 'Добавить слайд' && showTemplates && (
              <div className="template-popup">
                {templates.map((t) => (
                  <button
                    key={t.key}
                    className="template-btn"
                    onClick={() => handleTemplateSelect(t.key)}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
