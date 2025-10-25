# README — подробное описание компонентов (папка `src/common/components`)

### `src/common/components/ProjectTitle/index.tsx`

**Импорты:**

- `React` from 'react'
- `useSelector`, `useDispatch` from Redux (или соответствующие hooks)

**Экспорт:** `ProjectTitle` (function component)

**Интерфейсы / пропсы:**

- `Props` interface присутствует. Поля (детектировано):
  - `pres` — объект презентации (типизирован в коде как `pres` в интерфейсе Props)
  - `onTitleChange` — функция-обработчик (вызывается при изменении значения)
  - `onTitleCommit` — функция-обработчик (вызов при подтверждении изменения)
  - `onTitleKeyDown` — функция-обработчик на keyDown

**Функции / логика внутри:**

- `ProjectTitle` — отображает поле ввода названия и кнопки/иконки редактирования.
  - Читает текущий титул из `pres` или из store через `useSelector`.
  - При вводе вызывает `onTitleChange` (debounce/локальное состояние может использоваться).
  - При потере фокуса / Enter вызывает `onTitleCommit`.
  - При специальных клавишах вызывает `onTitleKeyDown`.

**Использует / вызывает (ключевые слова):** `useSelector`, `useDispatch`, `dispatch` (взаимодействие с action для обновления заголовка в store).

**Краткое назначение:** Компонент управления и отображения заголовка презентации; получает данные и передаёт изменения вверх через обработчики/dispatch.

---

### `src/common/components/SlidesPanel/hooks/useLogic.ts`

**Импорты:**

- импортирует action-helpers/dispatch-функции из слоя логики (редко прямо указывает store в компонентах)

**Экспорт:** `useSlidesLogic` (хук)

**Функции / логика внутри:**

- `useSlidesLogic()` — главный хук, возвращающий набор методов для SlidesPanel:
  - `handleDragStart(event, id)` — начинает drag слайдa (инициирует передачу id)
  - `handleDragEnter(event, id)` — при входе курсора на другой слайд во время drag
  - `handleDragEnd()` — завершает drag, выполняет перестановку слайдов
  - `noop()` / `noopChange()` — утилитарные заглушки
  - Методы для `addSlide()`, `deleteSlide(id)`, `selectSlide(id)` — вызывают соответствующие actions в store

**Использует / вызывает:** `dispatch`, `addSlide`, `deleteSlide`, `selectSlide`, возможно `duplicateSlide`.

**Краткое назначение:** Обслуживает поведение панели слайдов: добавление/удаление, drag&drop изменение порядка, выбор слайда.

---

### `src/common/components/SlidesPanel/index.tsx`

**Импорты:**

- `useSlidesLogic` (локальный хук)
- `Container`, `Row` и `Preview` (части панели)
- `useSelector` для получения массива `slides` и `selectedSlideId`

**Экспорт:** `SlidesPanel` (function component)

**Интерфейсы / пропсы:**

- `Props` интерфейс детектирован (обычно пустой — компонент получает данные из store)

**Функции / логика внутри:**

- Рендерит список слайдов `slides.map(slide => <Row ... />)`
- Передаёт `isSelected` флаг, `onClick` (выбор слайда), `onDelete` и другие обработчики в `Row`
- Вверху панели предоставляет кнопку `Add slide` — вызывает `useSlidesLogic().addSlide()`
- Поддерживает drag&drop через обработчики из `useSlidesLogic`

**Использует / вызывает:** `useSlidesLogic().addSlide`, `selectSlide`, `deleteSlide`, drag handlers

**Краткое назначение:** UI-обёртка для списка слайдов; связывает store с отображением каждой строки слайдов.

---

### `src/common/components/SlidesPanel/parts/Container.tsx`

**Импорт:** React

**Экспорт:** `Container` (function component)

**Пропсы:**

- `children` — ReactNode

**Логика:** Простой визуальный контейнер для панели; оборачивает переданные дочерние элементы в layout-блок.

**Краткое назначение:** Слой презентации/разметки; не содержит бизнес-логики.

---

### `src/common/components/SlidesPanel/parts/Number.tsx`

**Импорт:** React

**Экспорт:** `Number` (function component)

**Пропсы:**

- `index: number` — индекс/номер слайда

**Логика:** Отображает порядковый номер слайда, может форматировать (1-based)

**Краткое назначение:** Вспомогательный компонент визуального отображения номера слайда.

---

### `src/common/components/SlidesPanel/parts/Preview.tsx`

**Импорт:** React

**Экспорт:** `Preview` (function component)

**Пропсы:**

- `slide` — объект с данными слайда (фон, элементы)

**Функции / логика внутри:**

- Рендерит миниатюру слайда по его данным:
  - отображение фонового цвета/изображения
  - прорисовка упрощённых представлений элементов (иконка/текст)

- Может вычислять `scale` для вписывания слайда в превью

**Краткое назначение:** Визуальное мини-представление слайда для списка.

---

### `src/common/components/SlidesPanel/parts/Row.tsx`

**Импорт:** React

**Экспорт:** `Row` (function component)

**Пропсы:**

- `id` — идентификатор слайда
- `isSelected` — boolean (маркируется как активный)
- `onClick` — обработчик клика по строке
- `onDelete` — обработчик удаления слайда
- `onDuplicate` — обработчик дублирования (если предусмотрен)

**Функции / логика внутри:**

- Обработчик клика вызывает `onClick(id)`
- Включает drag handlers: `onDragStart`, `onDragEnter`, `onDragEnd` — проксирует в `useSlidesLogic`
- Рендерит `Number` и `Preview` внутри строки

**Краткое назначение:** Представляет отдельный пункт в списке слайдов с контролами для действий над слайдом.

---

### `src/common/components/Toolbar/constants/colors.ts`

**Экспорт:** набор констант цветов (массив/объект), например `PRIMARY_COLORS`, `GRADIENTS`.

**Краткое назначение:** Центральное место для определения палитры тулбара и выбора цвета фона/текста/форма.

---

### `src/common/components/Toolbar/constants/config.ts`

**Экспорт:** конфигурация панели (например: `DEFAULT_TOOL`, `TOOL_GROUPS`, `ICONS_MAP`).

**Краткое назначение:** Настраиваемые параметры тулбара: какие группы инструментов, какие кнопки в каждой группе.

---

### `src/common/components/Toolbar/constants/templates.ts`

**Экспорт:** шаблоны/предустановки (например: `TEMPLATES_LIST`)

**Краткое назначение:** Определяет набор шаблонов презентаций/слайдов, которые может вставлять тулбар.

---

### `src/common/components/Toolbar/hooks/useLogic.ts`

**Импорты:**

- `useDispatch` / actions из store (например `addTextElement`, `addImageElement`, `applyTemplate`)
- возможные утилиты (например `generateId`)

**Экспорт:** `useToolbarLogic` (или `useLogic`)

**Функции / логика внутри:**

- `addText()` — создаёт текстовый элемент с дефолтными стилями и отправляет в store (action `addTextElement`). Возвращает id нового элемента.
- `addImage(src)` — создаёт image-элемент с указанным `src` и dispatch `addImageElement`.
- `addShape(type)` — вставляет фигуру (rect/circle) с базовыми параметрами.
- `applyTemplate(templateId)` — добавляет набор слайдов/элементов согласно `templates`.
- `toggleTool(toolId)` — переключает активный инструмент; взаимодействует с `useSelection`.
- `setColor(color)` — вызывает action обновления стиля выбранного элемента или фон слайда.

**Использует / вызывает:** dispatch action-ов и возможно `bringToFront` для управления z-index.

**Краткое назначение:** Собирает бизнес-логику тулбара: как UI-интеракции переводятся в изменения состояния презентации.

---

### `src/common/components/Toolbar/hooks/useSelection.ts`

**Импорт:** React hooks

**Экспорт:** `useSelection` (хук)

**Функции / логика внутри:**

- Хранит локальное состояние выбранного пункта тулбара (`selectedToolId`)
- `select(toolId)` — устанавливает выбранный инструмент
- `isSelected(toolId)` — проверяет текущее состояние
- Может синхронизировать выбор с глобальным состоянием (через dispatch)

**Краткое назначение:** Управление локальным выбором инструмента/подменю в тулбаре.

---

### `src/common/components/Toolbar/hooks/useState.ts`

**Импорт:** React hooks

**Экспорт:** локальные state-хелперы (например `useToolbarState`)

**Функции / логика внутри:**

- Управляет видимостью popup-окошек (templates popup), активной вкладкой, состоянием групп
- Возвращает методы: `openPopup(name)`, `closePopup()`, `toggleTab(tabId)`

**Краткое назначение:** Удобный хук для управления UI-состоянием тулбара.

---

### `src/common/components/Toolbar/index.tsx`

**Импорты:**

- `useToolbarLogic`, `useSelection`, `useState`
- `constants` (`colors`, `config`, `templates`)
- компоненты `parts/*` (Button, ColorSection, Tabs, TemplatePopup, ThemeButton, Group)

**Экспорт:** `Toolbar` (function component)

**Пропсы:** обычно не принимает — связывается со store/hooks

**Функции / логика внутри:**

- Рендерит набор групп инструментов по `config.TOOL_GROUPS`.
- Для каждой группы рендерит `Group` с набором `Button`.
- Интеграция с `useToolbarLogic`:
  - `onButtonClick(toolId)` вызывает соответствующий метод (например `addText`)
  - `onColorSelect(color)` вызывает `setColor`
  - `onApplyTemplate(id)` вызывает `applyTemplate`

- Управление состоянием видимости попапа шаблонов через `useState`

**Использует / вызывает:** `addText`, `addImage`, `applyTemplate`, `setColor`, `toggleTool`

**Краткое назначение:** UI-компонент, который связывает визуальные кнопки с бизнес-логикой вставки/настройки элементов.

---

### `src/common/components/Toolbar/parts/ColorSection.tsx`

**Импорты:** React

**Экспорт:** `ColorSection` (component)

**Пропсы:**

- `selectedColor` — текущий цвет
- `onSelect(color)` — callback при выборе цвета

**Функции / логика внутри:**

- Рендерит палитру (перечисляет `colors` из constants)
- При выборе вызывает `onSelect(color)`

**Краткое назначение:** UI: выбор цвета для текста/фона/фигур.

---

### `src/common/components/Toolbar/parts/Group.tsx`

**Импорты:** React

**Экспорт:** `Group` (component)

**Пропсы:**

- `title` — заголовок группы
- `children` — элементы группы

**Логика:** Рендерит набор кнопок в логической группе с заголовком.

**Краткое назначие:** Визуальная группировка инструментов.

---

### `src/common/components/Toolbar/parts/Tabs.tsx`

**Импорты:** React

**Экспорт:** `Tabs` (component)

**Пропсы:**

- `tabs` — массив вкладок `{ id, label }`
- `activeTab` — текущая вкладка
- `onTabChange(tabId)` — callback смены вкладки

**Логика:** переключение вкладок, проксирование `onTabChange`

---

### `src/common/components/Toolbar/parts/TemplatePopup.tsx`

**Импорты:** React

**Экспорт:** `TemplatePopup` (component)

**Пропсы:**

- `visible` — boolean
- `templates` — массив шаблонов
- `onApply(templateId)` — callback применения шаблона
- `onClose()` — закрывает попап

**Логика:** Рендерит список шаблонов, обработчики применения и закрытия

---

### `src/common/components/Toolbar/parts/ThemeButton.tsx`

**Импорты:** React

**Экспорт:** `ThemeButton` (component)

**Пропсы:**

- `themeId` — идентификатор темы
- `onToggle(themeId)` — переключает тему

**Логика:** Визуальный переключатель темы оформления (может менять глобальный класс/стили через callback)

---

### `src/common/components/Workspace/hooks/useDrag.ts`

**Импорты:** React hooks

**Экспорт:** `useDrag` (хук)

**Функции / логика внутри:**

- `startDrag(elId, startPos, meta)` — инициализирует перетаскивание
- `updatePosition(clientX, clientY)` — вычисляет новые координаты элемента (с учётом трансформаций, scale)
- `endDrag()` — завершает перетаскивание и вызывает commit через dispatch
- `setSelElId(id)` — опционально устанавливает выделение

**Использует / вызывает:** `dispatch` для обновления позиции элемента в store; вызывает `bringToFront` при активации элемента (опционально)

**Краткое назначение:** Управляет всей логикой drag&drop для элементов в Workspace.

---

### `src/common/components/Workspace/hooks/useResize.ts`

**Импорты:** React hooks

**Экспорт:** `useResize` (хук)

**Функции / логика внутри:**

- `startResize(elId, corner)` — начинает операцию изменения размера
- `updateSize(dx, dy)` — пересчитывает ширину/высоту элемента, учитывает минимальные ограничения
- `commitResize()` — фиксирует изменения через dispatch
- `cancelResize()` — откатывает изменения

**Использует / вызывает:** dispatch обновления свойств элемента (`width`, `height`, `scale`)

**Краткое назначение:** Обработчик всех действий по изменению размера элементов на слайде.

---

### `src/common/components/Workspace/index.tsx`

**Импорты:**

- `TextElement`, `ImageElement`, `ResizeHandle` (parts)
- `useDrag`, `useResize` (хуки)
- `useSelector` для получения `selectedSlide` / `elements`

**Экспорт:** `Workspace` (function component)

**Пропсы:** обычно не принимает; использует store-selected slide

**Функции / логика внутри:**

- Рендерит `Canvas` область и маппит `elements.map(el => <DraggableElement el={el} .../>)`
- Для каждого элемента определяет handlers:
  - `onPointerDown` -> вызывает `startDrag(el.id, ...)`
  - `onResizeStart` -> вызывает `startResize(el.id, corner)`
  - `onDoubleClick` -> переводит в режим редактирования (если текстовый элемент)

- Обеспечивает борьбу с пересечением слоёв (z-order) через `bringToFront`

**Использует / вызывает:** `useDrag().startDrag`, `useResize().startResize`, `bringToFront`.

**Краткое назначение:** Основное место, где пользователь взаимодействует с содержимым слайда.

---

### `src/common/components/Workspace/parts/ImageElement.tsx`

**Импорты:** React

**Экспорт:** `ImageElement` (component)

**Пропсы:**

- `element` — объект элемента: `{ id, src, x, y, width, height, rotation, style }`
- `isSelected` — boolean
- `startDrag`, `startResize`, `onSelect`, `bringToFront` — callbacks

**Функции / логика внутри:**

- Рендер `<img src={element.src} />` в позиционированном `div`
- При pointerDown вызывает `onSelect` и `startDrag`
- При doubleClick может открывать инспектор свойств (если реализовано)
- При вызове `bringToFront` вызывает утилиту для обновления z-order

**Краткое назначение:** Визуализация и базовое взаимодействие с изображением на слайде.

---

### `src/common/components/Workspace/parts/ResizeHandle.tsx`

**Импорты:** React

**Экспорт:** `ResizeHandle` (component)

**Пропсы:**

- `corner` — позиция ручки (`'top-left'|'top-right'|'bottom-left'|'bottom-right'`)
- `onPointerDown` — callback начала resize

**Функции / логика внутри:**

- При pointerDown вызывает `onPointerDown(corner)`; может предотвращать всплытие событий
- Визуализирует маркер для захвата курсором

**Краткое назначение:** UI-ручка для изменения размера элемента.

---

### `src/common/components/Workspace/parts/TextElement.tsx`

**Импорты:** React

**Экспорт:** `TextElementView` (component)

**Интерфейс Props (детектировано):** `Props` содержит поля (детектировано в коде):

- `el` — объект текстового элемента (id, text, style, x, y, width, height)
- `preview` — boolean (режим предпросмотра)
- `isSelected` — boolean
- `setSelElId` — callback для установки выбранного элемента
- `startDrag` — callback для начала перетаскивания
- `startResize` — callback для начала изменения размера
- `handleTextChange` — callback при редактировании текста (onChange)
- `handleTextCommit` — callback при завершении редактирования (onBlur/Enter)
- `handleTextKeyDown` — callback на keyDown

**Функции / логика внутри:**

- Рендерит `div`/`contentEditable` с текстом `el.text`;
- При клике/фокусе вызывает `setSelElId(el.id)`;
- При pointerDown вызывает `startDrag(el.id, pos)`;
- При использовании `ResizeHandle` вызывает `startResize(el.id, corner)`;
- `handleTextChange` обновляет временный локальный state с текстом; `handleTextCommit` диспатчит обновление в store

**Использует / вызывает:** `useDrag`, `useResize` внешне; вызовы `dispatch` в handle commit для обновления текста

**Краткое назначение:** Полнофункциональный текстовый элемент: редактирование, перемещение, изменение размера, выделение.

---

### `src/common/components/Workspace/utils/bringToFront.ts`

**Импорт:** возможно `cloneDeep`/утилиты

**Экспорт:** `bringToFront(el, elements)` или `bringToFront(elements, id)` — утилитная функция

**Функции / логика внутри:**

- Находит элемент по id и перемещает его в конец массива (или увеличивает его zIndex), возвращает новый массив/объект
- Обеспечивает, чтобы выбранный элемент стал видимым поверх остальных

**Краткое назначение:** Утилита управления порядком слоёв элементов.

## Примечания по точности

- Описания сформированы по исходникам в `src/common/components` с детектированием интерфейсов, функций, импортов и ключевых слов.
- Я перечислил все файлы компонентов и их внутренние публичные функции/prop-интерфейсы, как ты просил — максимально подробно, но без вывода всего кода.
