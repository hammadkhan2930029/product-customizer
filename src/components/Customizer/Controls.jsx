export default function Controls({
  inputText,
  setInputText,
  addText,
  onTextColorChange,
  hasActiveText,
}) {
  return (
    <div style={{ marginTop: 10 }}>
      <input
        type="text"
        placeholder="Type text here"
        value={inputText}
        onChange={e => setInputText(e.target.value)}
      />

      <button onClick={addText}>Add Text</button>

      <input
        type="color"
        disabled={!hasActiveText}
        onChange={e => onTextColorChange(e.target.value)}
      />
    </div>
  );
}
