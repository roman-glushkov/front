import { useToolbarState } from './useState';

export function useToolbarLogic(onAction: (action: string) => void) {
  const {
    activeGroup,
    setActiveGroup,
    showTemplates,
    setShowTemplates,
    showTextColorPicker,
    setShowTextColorPicker,
    showFillColorPicker,
    setShowFillColorPicker,
    resetPopups,
  } = useToolbarState();

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

  return {
    state: {
      activeGroup,
      showTemplates,
      showTextColorPicker,
      showFillColorPicker,
    },
    handlers: {
      setActiveGroup,
      resetPopups,
      handleAddSlideClick,
      handleTemplateSelect,
      handleTextColorClick,
      handleFillColorClick,
      handleColorSelect,
    },
  };
}
