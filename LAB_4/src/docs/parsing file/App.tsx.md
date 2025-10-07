# Разбор App.tsx

Это главный компонент приложения презентаций. Он отвечает за отображение интерфейса редактора — заголовка, панели инструментов, списка слайдов и рабочей области. Компонент получает все данные и обработчики из хука useEditor и передает их дочерним компонентам.

Команды и конструкции

import React from 'react' — импорт React для работы с JSX.
import { useEditor } from './store/editor' — импорт пользовательского хука, который управляет состоянием приложения (презентация, слайды, выбранные элементы и обработчики).
import ProjectTitle / Toolbar / SlidesPanel / Workspace — импорт компонентов интерфейса.
import './view/styles.css' — подключение CSS-стилей.

function App() — определение функционального компонента App.

const { pres, selSlideId, selElId, slide, handleAction, handleTitleChange, handleTitleCommit, handleTitleKeyDown, handleSlideClick, handleElementClick } = useEditor() — деструктуризация данных и функций, возвращаемых хуком useEditor:
pres — объект презентации (заголовок, список слайдов, элементы).
selSlideId — id выбранного слайда.
selElId — id выбранного элемента.
slide — текущий активный слайд.
handleAction — обработчик действий пользователя (например, добавление слайда или элемента).
handleTitleChange — обработчик изменения заголовка презентации.
handleTitleCommit — обработчик завершения ввода названия.
handleTitleKeyDown — обработчик нажатий клавиш при вводе названия.
handleSlideClick — обработчик клика по слайду.
handleElementClick — обработчик клика по элементу на слайде.

return (...) — возвращает JSX-разметку интерфейса приложения.

<div className="container"> — корневой контейнер приложения.  
<ProjectTitle /> — компонент заголовка презентации, получает пропсы: pres, onTitleChange, onTitleCommit, onTitleKeyDown, selSlideId.  
<Toolbar /> — панель инструментов, обрабатывает действия через onAction.  
<div className="main-content"> — основная область интерфейса.  
<SlidesPanel /> — панель со списком миниатюр слайдов, получает slides, selectedSlideId и onSlideClick.  
<Workspace /> — рабочая область, отображает выбранный слайд и его элементы, получает slide, selElId и onElementClick.

export default App — экспорт компонента по умолчанию, чтобы использовать его в других частях приложения.
