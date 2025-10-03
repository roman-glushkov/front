import React from 'react';
import './Toolbar.css';

type Props = { onAction: (action: string) => void };

// Группы кнопок
const groups = [
  { title: 'Слайды', actions: ['Добавить слайд', 'Удалить слайд', 'Переместить слайд'] },
  {
    title: 'Текст',
    actions: ['Добавить текст', 'Изменить текст', 'Изменить размер текста', 'Изменить шрифт'],
  },
  {
    title: 'Элементы',
    actions: [
      'Добавить изображение',
      'Удалить элемент',
      'Изменить позицию элемента',
      'Изменить размер элемента',
    ],
  },
  { title: 'Оформление', actions: ['Изменить фон'] },
];

// Панель инструментов
export default function Toolbar({ onAction }: Props) {
  return (
    <div className="header toolbar-split">
      {groups.map((group) => (
        <div key={group.title} className="toolbar-group">
          {group.actions.map((action) => (
            <button key={action} onClick={() => onAction(action)}>
              {action}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
