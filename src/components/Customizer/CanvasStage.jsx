import { Stage, Layer, Image, Rect, Text } from 'react-konva';
import useImage from 'use-image';

export default function CanvasStage({
  config,
  color,
  texts,
  stageRef,
  setActiveTextId,
}) {
  if (!config) return null;

  const [shirtImage] = useImage(config.baseImage);

  return (
    <Stage width={config.width} height={config.height} ref={stageRef}>
      {/* Shirt image */}
      <Layer>
        {shirtImage && (
          <Image
            image={shirtImage}
            width={config.width}
            height={config.height}
          />
        )}
      </Layer>

      {/* Shirt color */}
      <Layer>
        <Rect
          width={config.width}
          height={config.height}
          fill={color}
          globalCompositeOperation="multiply"
        />
      </Layer>

      {/* Texts */}
      <Layer>
        {texts.map(t => (
          <Text
            key={t.id}
            {...t}
            draggable
            onClick={() => setActiveTextId(t.id)}
            onTap={() => setActiveTextId(t.id)}
          />
        ))}
      </Layer>
    </Stage>
  );
}
