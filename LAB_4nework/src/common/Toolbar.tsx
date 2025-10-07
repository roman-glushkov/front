import React from 'react';
import './Toolbar.css';

interface ToolbarProps {
  handleAction: (action: string) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ handleAction }) => {
  return (
    <div className="header toolbar-split">
      <div className="toolbar-group">
        <button onClick={() => handleAction('Добавить слайд')}>➕ Слайд</button>
        <button onClick={() => handleAction('Удалить слайд')}>🗑️ Удалить</button>
        <button onClick={() => handleAction('Переместить слайд')}>🔀 Переместить</button>
      </div>
      <div className="toolbar-group">
        <button onClick={() => handleAction('Добавить текст')}>📝 Текст</button>
        <button onClick={() => handleAction('Изменить текст')}>✏️ Изменить</button>
        <button onClick={() => handleAction('Изменить размер текста')}>🔠 Размер</button>
        <button onClick={() => handleAction('Изменить шрифт')}>🎨 Шрифт</button>
      </div>
      <div className="toolbar-group">
        <button onClick={() => handleAction('Добавить изображение')}>🖼️ Картинка</button>
        <button onClick={() => handleAction('Удалить элемент')}>❌ Удалить элемент</button>
        <button onClick={() => handleAction('Изменить позицию элемента')}>↔️ Позиция</button>
        <button onClick={() => handleAction('Изменить размер элемента')}>📏 Размер</button>
      </div>
      <div className="toolbar-group">
        <button onClick={() => handleAction('Изменить фон')}>🎨 Фон</button>
      </div>
    </div>
  );
};

export default Toolbar;
