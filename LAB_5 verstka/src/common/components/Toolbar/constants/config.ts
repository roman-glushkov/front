import { GroupKey } from '../hooks/useState';

export interface GroupButton {
  label: string;
  action: string;
}

export const GROUPS: Record<GroupKey, GroupButton[]> = {
  slides: [
    { label: '➕ Слайд', action: 'Добавить слайд' },
    { label: '🗑️ Удалить', action: 'Удалить слайд' },
  ],
  text: [
    { label: '📝 Текст', action: 'Добавить текст' },
    { label: '🔠 Размер', action: 'Изменить размер текста' },
    { label: '🎨 Шрифт', action: 'Изменить шрифт' },
  ],
  elements: [
    { label: '🖼️ Картинка', action: 'Добавить изображение' },
    { label: '❌ Удалить', action: 'Удалить элемент' },
  ],
  design: [
    { label: '🎨 Фон', action: 'Изменить фон слайда' },
    { label: '🖍️ Цвет текста', action: 'Изменить цвет текста' },
    { label: '🧱 Заливка фигуры', action: 'Изменить фон текста' },
  ],
};

export const TAB_TITLES: { key: GroupKey; name: string }[] = [
  { key: 'slides', name: 'Слайды' },
  { key: 'text', name: 'Текст' },
  { key: 'elements', name: 'Элементы' },
  { key: 'design', name: 'Дизайн' },
];
