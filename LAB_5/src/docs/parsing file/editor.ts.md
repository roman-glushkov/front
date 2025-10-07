# Разбор useEditor.tsx

Это пользовательский хук, который управляет всей логикой редактора презентаций. Он хранит состояние презентации, выбранного слайда и элемента, а также реализует функции для обработки действий пользователя: добавление и удаление слайдов и элементов, изменение текста, размера, позиции и других свойств.

Команды и конструкции

import React, { useState } from 'react' — импорт React и хука состояния useState.
import { Presentation, Slide } from './types/presentation' — импорт типов данных для презентации и слайда.
import _ as func from './functions/presentation' — импорт набора функций, работающих с объектами презентации.
import _ as temp from './templates/presentation' — импорт шаблонов (готовых данных и настроек для элементов и слайдов).

initialPresentation — объект начального состояния презентации.
title — название презентации.
slides — массив слайдов (пока пустой).
currentSlideId — id текущего слайда.
selectedSlideIds — список выбранных слайдов (для будущих функций, например, копирования или перемещения).

export function useEditor() — объявление пользовательского хука.

[pres, setPres] = useState(initialPresentation) — состояние всей презентации.
[selSlideId, setSelSlideId] = useState('') — id выбранного слайда.
[selElId, setSelElId] = useState('') — id выбранного элемента.

slide = pres.slides.find((s) => s.id === selSlideId) — поиск активного слайда по его id.

updateSlide = (updater: (s: Slide) => Slide) => { ... } — функция обновления текущего слайда через переданную функцию updater.
if (!slide) return — проверка: если слайд не выбран, ничего не делаем.
setPres((prev) => ({ ...prev, slides: prev.slides.map((s) => (s.id === selSlideId ? updater(s) : s)) })) — изменение состояния презентации, при этом заменяется только нужный слайд, остальные остаются без изменений.

handleAction = (action: string) => { ... } — основная функция обработки действий пользователя.
console.log('Совершенное действие:', action) — вывод информации о действии в консоль.
switch (action) — выбор действия по его названию.

case 'Добавить слайд' — создает новый слайд через temp.createSlide, добавляет его функцией func.addSlide, делает активным.
case 'Удалить слайд' — удаляет выбранный слайд функцией func.removeSlide, выбирает следующий доступный, очищает выбранный элемент.
case 'Добавить текст' — добавляет текстовый элемент через func.addText и шаблон temp.createTextElement.
case 'Добавить изображение' — добавляет изображение через func.addImage и шаблон temp.createImageElement.
case 'Удалить элемент' — удаляет выбранный элемент через func.removeElement.
case 'Изменить фон' — меняет фон текущего слайда через func.changeBackground и шаблон temp.backgroundTemplate.
case 'Переместить слайд' — перемещает выбранный слайд в массиве func.moveSlide.
case 'Изменить текст' — изменяет содержимое текста через func.changeText и шаблон temp.newTextContent.
case 'Изменить размер текста' — меняет размер шрифта func.changeTextSize.
case 'Изменить шрифт' — изменяет шрифт func.changeTextFont.
case 'Изменить позицию элемента' — меняет координаты элемента func.changeElementPosition.
case 'Изменить размер элемента' — меняет размеры func.changeElementSize.

handleTitleKeyDown = (e) => { ... } — обработчик клавиатуры при вводе заголовка.
e.key === 'Enter' — проверка, нажата ли клавиша Enter.
e.currentTarget.blur() — завершение редактирования (снятие фокуса).

handleTitleChange = (e) => { ... } — обновление названия презентации при вводе.
e.target.value — текущее значение поля.
setPres((prev) => ({ ...prev, title: newTitle })) — изменение только заголовка, без затрагивания других данных.

handleTitleCommit = (e) => { ... } — обработчик, срабатывающий при потере фокуса.
func.changeTitle(pres, newTitle) — обновляет заголовок через функцию из func.
console.log(...) — вывод нового названия в консоль.

handleSlideClick = (slideId, index) => { ... } — выбор слайда при клике.
setSelSlideId(slideId) — сохраняет id выбранного слайда.
setSelElId('') — сбрасывает выбранный элемент.
console.log('ID слайда:', slideId, 'Порядковый номер:', index + 1) — вывод информации о слайде.

handleElementClick = (elementId) => { ... } — обработчик клика по элементу.
setSelElId(elementId) — сохраняет id выбранного элемента.
console.log('ID элемента:', elementId) — выводит в консоль id элемента.

return { ... } — возвращает все состояния и обработчики, чтобы ими можно было управлять из других компонентов.
