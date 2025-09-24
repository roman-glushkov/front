// test-presentation.ts
import {
  Presentation,
  Slide,
  TextElement,
  ImageElement,
} from "./types of presentation";
import {
  changeTitle,
  addSlide,
  removeSlide,
  moveSlide,
  addText,
  addImage,
  removeElement,
  changeElementPosition,
  changeElementSize,
  changeText,
  changeTextSize,
  changeTextFont,
  changeBackground,
} from "./presentation functions";

//минимальные тестируемые данные

const minimalSlide: Slide = {
  id: "slide1",
  background: { type: "none" },
  elements: [],
};

const minimalPresentation: Presentation = {
  title: "Minimal Presentation",
  slides: [minimalSlide],
  currentSlideId: "slide1",
  selectedSlideIds: [],
};

//максимальные тестируемыеы данные
const maximalTextElement1: TextElement = {
  type: "text",
  id: "text1",
  content: "Hello World",
  position: { x: 10, y: 20 },
  size: { width: 100, height: 50 },
  font: "Arial",
  fontSize: 16,
  color: "#000000",
};

const maximalTextElement2: TextElement = {
  type: "text",
  id: "text2",
  content: "Second Text",
  position: { x: 30, y: 40 },
  size: { width: 150, height: 30 },
  font: "Times New Roman",
  fontSize: 14,
  color: "#FF0000",
};

const maximalImageElement1: ImageElement = {
  type: "image",
  id: "img1",
  src: "image1.png",
  position: { x: 50, y: 60 },
  size: { width: 200, height: 150 },
};

const maximalImageElement2: ImageElement = {
  type: "image",
  id: "img2",
  src: "image2.jpg",
  position: { x: 100, y: 80 },
  size: { width: 300, height: 200 },
};

const maximalSlide1: Slide = {
  id: "slide1",
  background: { type: "color", value: "#FFFFFF" },
  elements: [maximalTextElement1, maximalImageElement1],
};

const maximalSlide2: Slide = {
  id: "slide2",
  background: { type: "image", value: "background.jpg" },
  elements: [maximalTextElement2, maximalImageElement2],
};

const maximalSlide3: Slide = {
  id: "slide3",
  background: { type: "none" },
  elements: [maximalTextElement1, maximalImageElement2],
};

const maximalPresentation: Presentation = {
  title: "Maximal Presentation",
  slides: [maximalSlide1, maximalSlide2, maximalSlide3],
  currentSlideId: "slide1",
  selectedSlideIds: ["slide1", "slide2"],
};

//тест функций минимальными данными

console.log("TЕСТИРОВАНИЕ ФУНКЦИЙ ПРЕЗЕНТАЦИИ");
console.log("\nТЕСТИРОВАНИЕ С МИНИМАЛЬНЫМИ ДАННЫМИ");

//
const minimalAfterTitleChange = changeTitle(
  minimalPresentation,
  "New Minimal Title"
);
console.log("\nИзменение названия презентации");
console.log(`   До: "${minimalPresentation.title}"`);
console.log(`   После: "${minimalAfterTitleChange.title}"`);

//
const newMinimalSlide: Slide = {
  id: "slide2",
  background: { type: "none" },
  elements: [],
};
const minimalAfterAddSlide = addSlide(minimalPresentation, newMinimalSlide);
console.log("\nДобавление нового слайда");
console.log(`   До: ${minimalPresentation.slides.length} слайдов`);
console.log(`   После: ${minimalAfterAddSlide.slides.length} слайдов`);

//
const minimalAfterRemoveSlide = removeSlide(minimalPresentation, "slide1");
console.log("\nУдаление слайда");
console.log(`   До: ${minimalPresentation.slides.length} слайдов`);
console.log(`   После: ${minimalAfterRemoveSlide.slides.length} слайдов`);

//
const minimalAfterMoveSlide = moveSlide(minimalAfterAddSlide, "slide2", 0);
console.log("\nПеремещение слайда");
console.log(`   До: Первый слайд: ${minimalAfterAddSlide.slides[0].id}`);
console.log(`   После: Первый слайд: ${minimalAfterMoveSlide.slides[0].id}`);

//
const minimalTextElement: TextElement = {
  type: "text",
  id: "text1",
  content: "Minimal Text",
  position: { x: 0, y: 0 },
  size: { width: 50, height: 20 },
  font: "Arial",
  fontSize: 12,
  color: "#000000",
};
const minimalSlideWithText = addText(minimalSlide, minimalTextElement);
console.log("\nДобавление текста на слайд");
console.log(`   До: ${minimalSlide.elements.length} элементов`);
console.log(`   После: ${minimalSlideWithText.elements.length} элементов`);

//
const minimalImageElement: ImageElement = {
  type: "image",
  id: "img1",
  src: "minimal.png",
  position: { x: 10, y: 10 },
  size: { width: 100, height: 100 },
};
const minimalSlideWithImage = addImage(minimalSlide, minimalImageElement);
console.log("\nДобавление изображения на слайд");
console.log(`   До: ${minimalSlide.elements.length} элементов`);
console.log(`   После: ${minimalSlideWithImage.elements.length} элементов`);

//
const minimalSlideWithElements = addText(
  addImage(minimalSlide, minimalImageElement),
  minimalTextElement
);
const minimalAfterRemoveElement = removeElement(
  minimalSlideWithElements,
  "text1"
);
console.log("\nУдаление элемента со слайда");
console.log(`   До: ${minimalSlideWithElements.elements.length} элементов`);
console.log(`   После: ${minimalAfterRemoveElement.elements.length} элементов`);

//
const minimalAfterPositionChange = changeElementPosition(
  minimalSlideWithText,
  "text1",
  { x: 100, y: 100 }
);
const element = minimalAfterPositionChange.elements.find(
  (el) => el.id === "text1"
);
console.log("\nИзменение позиции элемента");
console.log(`   До: x: 0, y: 0`);
console.log(`   После: x: ${element?.position.x}, y: ${element?.position.y}`);

//
const minimalAfterSizeChange = changeElementSize(
  minimalSlideWithText,
  "text1",
  { width: 200, height: 100 }
);
const sizedElement = minimalAfterSizeChange.elements.find(
  (el) => el.id === "text1"
);
console.log("\nИзменение размера элемента");
console.log(`   До: width: 50, height: 20`);
console.log(
  `   После: width: ${sizedElement?.size.width}, height: ${sizedElement?.size.height}`
);

//
const minimalAfterTextChange = changeText(
  minimalSlideWithText,
  "text1",
  "Updated Minimal Text"
);
const textElement = minimalAfterTextChange.elements.find(
  (el) => el.id === "text1"
) as TextElement;
console.log("\nИзменение текста элемента");
console.log(`   До: "Minimal Text"`);
console.log(`   После: "${textElement?.content}"`);

//
const minimalAfterFontSizeChange = changeTextSize(
  minimalSlideWithText,
  "text1",
  24
);
const fontSizeElement = minimalAfterFontSizeChange.elements.find(
  (el) => el.id === "text1"
) as TextElement;
console.log("\nИзменение размера шрифта");
console.log(`   До: 12px`);
console.log(`   После: ${fontSizeElement?.fontSize}px`);

//
const minimalAfterFontChange = changeTextFont(
  minimalSlideWithText,
  "text1",
  "Verdana"
);
const fontElement = minimalAfterFontChange.elements.find(
  (el) => el.id === "text1"
) as TextElement;
console.log("\nИзменение шрифта текста");
console.log(`   До: "Arial"`);
console.log(`   После: "${fontElement?.font}"`);

//
const minimalAfterBackgroundChange = changeBackground(minimalSlide, {
  type: "color",
  value: "#FF0000",
});
console.log("\nИзменение фона слайда");
console.log(`   До: type: "none"`);
console.log(
  `   После: type: "${minimalAfterBackgroundChange.background.type}", value: ${
    minimalAfterBackgroundChange.background.type === "color"
      ? minimalAfterBackgroundChange.background.value
      : "N/A"
  }`
);

console.log("\nТЕСТИРОВАНИЕ С МАКСИМАЛЬНЫМИ ДАННЫМИ");

//
const maximalAfterTitleChange = changeTitle(
  maximalPresentation,
  "New Maximal Title"
);
console.log("\nИзменение названия презентации");
console.log(`   До: "${maximalPresentation.title}"`);
console.log(`   После: "${maximalAfterTitleChange.title}"`);

//
const newMaximalSlide: Slide = {
  id: "slide4",
  background: { type: "color", value: "#00FF00" },
  elements: [maximalTextElement1, maximalImageElement1],
};
const maximalAfterAddSlide = addSlide(maximalPresentation, newMaximalSlide);
console.log("\nДобавление нового слайда");
console.log(`   До: ${maximalPresentation.slides.length} слайдов`);
console.log(`   После: ${maximalAfterAddSlide.slides.length} слайдов`);

//
const maximalAfterRemoveSlide = removeSlide(maximalPresentation, "slide2");
console.log("\nУдаление слайда");
console.log(
  `   До: ${
    maximalPresentation.slides.length
  } слайдов (${maximalPresentation.slides.map((s) => s.id).join(", ")})`
);
console.log(
  `   После: ${
    maximalAfterRemoveSlide.slides.length
  } слайдов (${maximalAfterRemoveSlide.slides.map((s) => s.id).join(", ")})`
);

//
const maximalAfterMoveSlide = moveSlide(maximalPresentation, "slide3", 0);
console.log("\nПеремещение слайда");
console.log(
  `   До: Порядок: ${maximalPresentation.slides.map((s) => s.id).join(" → ")}`
);
console.log(
  `   После: Порядок: ${maximalAfterMoveSlide.slides
    .map((s) => s.id)
    .join(" → ")}`
);

//
const newTextElement: TextElement = {
  type: "text",
  id: "text3",
  content: "Additional Text",
  position: { x: 200, y: 200 },
  size: { width: 120, height: 40 },
  font: "Courier New",
  fontSize: 18,
  color: "#0000FF",
};
const maximalSlideWithText = addText(maximalSlide1, newTextElement);
console.log("\nДобавление текста на слайд");
console.log(`   До: ${maximalSlide1.elements.length} элементов`);
console.log(`   После: ${maximalSlideWithText.elements.length} элементов`);

//
const newImageElement: ImageElement = {
  type: "image",
  id: "img3",
  src: "additional.png",
  position: { x: 150, y: 150 },
  size: { width: 250, height: 180 },
};
const maximalSlideWithImage = addImage(maximalSlide1, newImageElement);
console.log("\nДобавление изображения на слайд");
console.log(`   До: ${maximalSlide1.elements.length} элементов`);
console.log(`   После: ${maximalSlideWithImage.elements.length} элементов`);

//
const maximalAfterRemoveElement = removeElement(maximalSlide1, "text1");
console.log("\nУдаление элемента со слайда");
console.log(
  `   До: ${maximalSlide1.elements.length} элементов (${maximalSlide1.elements
    .map((el) => el.id)
    .join(", ")})`
);
console.log(
  `   После: ${
    maximalAfterRemoveElement.elements.length
  } элементов (${maximalAfterRemoveElement.elements
    .map((el) => el.id)
    .join(", ")})`
);

//
const maximalAfterPositionChange = changeElementPosition(
  maximalSlide1,
  "img1",
  { x: 300, y: 200 }
);
const maximalElement = maximalAfterPositionChange.elements.find(
  (el) => el.id === "img1"
);
console.log("\nИзменение позиции элемента");
console.log(`   До: x: 50, y: 60`);
console.log(
  `   После: x: ${maximalElement?.position.x}, y: ${maximalElement?.position.y}`
);

//
const maximalAfterSizeChange = changeElementSize(maximalSlide1, "text1", {
  width: 300,
  height: 80,
});
const maximalSizedElement = maximalAfterSizeChange.elements.find(
  (el) => el.id === "text1"
);
console.log("\nИзменение размера элемента");
console.log(`   До: width: 100, height: 50`);
console.log(
  `   После: width: ${maximalSizedElement?.size.width}, height: ${maximalSizedElement?.size.height}`
);

//
const maximalAfterTextChange = changeText(
  maximalSlide1,
  "text1",
  "Updated Maximal Text"
);
const maximalTextElement = maximalAfterTextChange.elements.find(
  (el) => el.id === "text1"
) as TextElement;
console.log("\nИзменение текста элемента");
console.log(`   До: "Hello World"`);
console.log(`   После: "${maximalTextElement?.content}"`);

//
const maximalAfterFontSizeChange = changeTextSize(maximalSlide1, "text1", 32);
const maximalFontSizeElement = maximalAfterFontSizeChange.elements.find(
  (el) => el.id === "text1"
) as TextElement;
console.log("\nИзменение размера шрифта");
console.log(`   До: 16px`);
console.log(`   После: ${maximalFontSizeElement?.fontSize}px`);

//
const maximalAfterFontChange = changeTextFont(
  maximalSlide1,
  "text1",
  "Georgia"
);
const maximalFontElement = maximalAfterFontChange.elements.find(
  (el) => el.id === "text1"
) as TextElement;
console.log("\nИзменение шрифта текста");
console.log(`   До: "Arial"`);
console.log(`   После: "${maximalFontElement?.font}"`);

//
const maximalAfterBackgroundChange = changeBackground(maximalSlide1, {
  type: "image",
  value: "new-bg.jpg",
});
console.log("\nИзменение фона слайда");
console.log(`   До: type: "color", value: #FFFFFF`);
console.log(
  `   После: type: "${maximalAfterBackgroundChange.background.type}", value: "${
    maximalAfterBackgroundChange.background.type === "image"
      ? maximalAfterBackgroundChange.background.value
      : "N/A"
  }"`
);

console.log("\nВСЕ ТЕСТЫ УСПЕШНО ЗАВЕРШЕНЫ!");
