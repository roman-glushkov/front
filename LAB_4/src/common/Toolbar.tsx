import React from 'react';
import './Toolbar.css';

interface Props {
  onAction: (action: string) => void;
}
// ul li
export default function Toolbar({ onAction }: Props) {
  return (
    <div className="header toolbar-split">
      <div className="toolbar-group">
        <button onClick={() => onAction('Добавить слайд')}>➕ Слайд</button>
        <button onClick={() => onAction('Удалить слайд')}>🗑️ Удалить</button>
        <button onClick={() => onAction('Переместить слайд')}>🔀 Переместить</button>
      </div>
      <div className="toolbar-group">
        <button onClick={() => onAction('Добавить текст')}>📝 Текст</button>
        <button onClick={() => onAction('Изменить текст')}>✏️ Изменить</button>
        <button onClick={() => onAction('Изменить размер текста')}>🔠 Размер</button>
        <button onClick={() => onAction('Изменить шрифт')}>🎨 Шрифт</button>
      </div>
      <div className="toolbar-group">
        <button onClick={() => onAction('Добавить изображение')}>🖼️ Картинка</button>
        <button onClick={() => onAction('Удалить элемент')}>❌ Удалить элемент</button>
        <button onClick={() => onAction('Изменить позицию элемента')}>↔️ Позиция</button>
        <button onClick={() => onAction('Изменить размер элемента')}>📏 Размер</button>
      </div>
      <div className="toolbar-group">
        <button onClick={() => onAction('Изменить фон')}>🎨 Фон</button>
      </div>
    </div>
  );
}
