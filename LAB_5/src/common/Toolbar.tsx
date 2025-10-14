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

const THEME_COLUMNS: string[][] = [
  ['#ffffff', '#f2f2f2', '#d9d9d9', '#bfbfbf', '#7f7f7f', '#595959'],
  ['#000000', '#262626', '#404040', '#595959', '#737373', '#999999'],
  ['#4472c4', '#5b9bd5', '#8eaadb', '#a8c3f0', '#b4c7e7', '#d0e0f0'],
  ['#ed7d31', '#f4b183', '#f7caac', '#fde9d9', '#fff2cc', '#ffe699'],
  ['#a5a5a5', '#bfbfbf', '#d9d9d9', '#e6e6e6', '#f2f2f2', '#fafafa'],
  ['#ffc000', '#ffd966', '#ffe699', '#fff2cc', '#fff8e1', '#fffdf0'],
  ['#5b9bd5', '#7da7d9', '#9dc3e6', '#b4c7e7', '#cfe2f3', '#deeaf6'],
  ['#70ad47', '#a9d18e', '#c6e0b4', '#e2efd9', '#ebf1de', '#f2f7ec'],
];

const STANDARD_COLORS: string[] = [
  '#c00000',
  '#ff0000',
  '#ffc000',
  '#ffff00',
  '#92d050',
  '#00b050',
  '#00b0f0',
  '#0070c0',
  '#002060',
  '#7030a0',
];

export default function Toolbar({ onAction }: Props) {
  const [activeGroup, setActiveGroup] = useState<GroupKey>('slides');
  const [showTemplates, setShowTemplates] = useState(false);
  const [showTextColorPicker, setShowTextColorPicker] = useState(false);
  const [showFillColorPicker, setShowFillColorPicker] = useState(false);

  const handleAddSlideClick = () => {
    setShowTemplates(!showTemplates);
    setShowTextColorPicker(false);
    setShowFillColorPicker(false);
  };

  const handleTemplateSelect = (template: string) => {
    onAction(template);
    setShowTemplates(false);
  };

  const handleTextColorClick = () => {
    setShowTextColorPicker(!showTextColorPicker);
    setShowTemplates(false);
    setShowFillColorPicker(false);
  };

  const handleFillColorClick = () => {
    setShowFillColorPicker(!showFillColorPicker);
    setShowTextColorPicker(false);
    setShowTemplates(false);
  };

  const handleColorSelect = (type: 'text' | 'fill', color: string) => {
    if (type === 'text') onAction(`Изменить цвет текста: ${color}`);
    else onAction(`Изменить фон текста: ${color}`);

    setShowTextColorPicker(false);
    setShowFillColorPicker(false);
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
    design: [
      { label: '🎨 Фон', action: 'Изменить фон' },
      { label: '🖍️ Цвет текста', action: 'Изменить цвет текста' },
      { label: '🧱 Заливка фигуры', action: 'Изменить фон текста' },
    ],
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
              setShowTextColorPicker(false);
              setShowFillColorPicker(false);
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

            {action === 'Изменить цвет текста' && showTextColorPicker && (
              <div className="color-picker-popup">
                <div className="color-section">
                  <div className="color-section-title">Цвета темы</div>
                  <div className="theme-colors">
                    {THEME_COLUMNS.map((column, ci) => (
                      <div key={ci} className="theme-column">
                        {column.map((color) => (
                          <button
                            key={color}
                            className="color-swatch"
                            style={{ backgroundColor: color }}
                            onClick={() => handleColorSelect('text', color)}
                            title={color}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="color-section">
                  <div className="color-section-title">Стандартные цвета</div>
                  <div className="standard-colors">
                    {STANDARD_COLORS.map((color) => (
                      <button
                        key={color}
                        className="color-swatch"
                        style={{ backgroundColor: color }}
                        onClick={() => handleColorSelect('text', color)}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
            {action === 'Изменить фон текста' && showFillColorPicker && (
              <div className="color-picker-popup">
                <div className="color-section">
                  <div className="color-section-title">Цвета темы</div>
                  <div className="theme-colors">
                    {THEME_COLUMNS.map((column, ci) => (
                      <div key={ci} className="theme-column">
                        {column.map((color) => (
                          <button
                            key={color}
                            className="color-swatch"
                            style={{ backgroundColor: color }}
                            onClick={() => handleColorSelect('fill', color)}
                            title={color}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="color-section">
                  <div className="color-section-title">Стандартные цвета</div>
                  <div className="standard-colors">
                    {STANDARD_COLORS.map((color) => (
                      <button
                        key={color}
                        className="color-swatch"
                        style={{ backgroundColor: color }}
                        onClick={() => handleColorSelect('fill', color)}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
