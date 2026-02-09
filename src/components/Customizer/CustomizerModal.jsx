import { useRef, useState } from 'react';
import CanvasStage from './CanvasStage';
import Controls from './Controls';
import { PRODUCT_CONFIG } from './ProductConfig';

export default function CustomizerModal({ onSave }) {
  const config = PRODUCT_CONFIG.tshirt;
  const stageRef = useRef(null);

  const [color, setColor] = useState('#66000000');

  const [inputText, setInputText] = useState('');
  const [texts, setTexts] = useState([]);
  const [activeTextId, setActiveTextId] = useState(null);

  const addText = () => {
    if (!inputText.trim()) return;

    const newText = {
      id: Date.now(),
      text: inputText,
      x: 120,
      y: 200,
      fontSize: 26,
      fill: '#60fe0b',
    };

    setTexts(prev => [...prev, newText]);
    setActiveTextId(newText.id);
    setInputText('');
  };

  const updateTextColor = color => {
    setTexts(texts.map(t =>
      t.id === activeTextId ? { ...t, fill: color } : t
    ));
  };

  const saveDesign = () => {
    const image = stageRef.current.toDataURL({ pixelRatio: 3 });
    onSave(image);
  };

  return (
    <>
      <CanvasStage
        config={config}
        color={color}
        texts={texts}
        stageRef={stageRef}
        setActiveTextId={setActiveTextId}
      />

      <Controls
        inputText={inputText}
        setInputText={setInputText}
        addText={addText}
        onTextColorChange={updateTextColor}
        hasActiveText={!!activeTextId}
      />

      <button onClick={saveDesign}>Next</button>
    </>
  );
}
