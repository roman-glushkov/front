export type LogKey =
  | 'ADD_SLIDE'
  | 'DEL_SLIDE'
  | 'ADD_TEXT'
  | 'ADD_IMG'
  | 'DEL_EL'
  | 'TXT_COLOR'
  | 'TXT_BG'
  | 'TXT_FONT'
  | 'TXT_SIZE'
  | 'SEL_SLIDE'
  | 'SEL_EL'
  | 'SLIDE_BG'
  | 'EDIT_TEXT'
  | 'RENAME';

const logMessages: Record<LogKey, string> = {
  ADD_SLIDE: 'Добавлен новый слайд',
  DEL_SLIDE: 'Удалён слайд',
  ADD_TEXT: 'Добавлен текстовый элемент',
  ADD_IMG: 'Добавлено изображение',
  DEL_EL: 'Удалён элемент',
  TXT_COLOR: 'Изменён цвет текста',
  TXT_BG: 'Изменён фон текста',
  TXT_FONT: 'Изменён шрифт текста',
  TXT_SIZE: 'Изменён размер текста',
  SEL_SLIDE: 'Выбран слайд',
  SEL_EL: 'Выбран элемент на слайде',
  SLIDE_BG: 'Изменён фон слайда',
  EDIT_TEXT: 'Отредактирован текстовый элемент',
  RENAME: 'Изменено название презентации',
};

export function logAction(key: LogKey, details?: unknown) {
  const message = logMessages[key];
  const timestamp = new Date().toLocaleTimeString();

  if (!message) {
    console.warn(`[Logger] Неизвестный ключ действия: ${key}`);
    return;
  }

  console.log(`[${timestamp}] ${message}`, details ?? '');
}
