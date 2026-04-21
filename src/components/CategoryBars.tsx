import { Text } from "@react-three/drei";
import useStore, { type Category } from "../state/store";

const BAR_RADIUS = 0.4;
const BAR_SPACING = 1.6;
const MAX_HEIGHT = 10;
const COLORS = [
  "#e6194b",
  "#3cb44b",
  "#ffe119",
  "#4363d8",
  "#f58231",
  "#911eb4",
  "#46f0f0",
  "#f032e6",
  "#bcf60c",
  "#fabebe",
];

const CategoryBars = () => {
  const categoryTotals = useStore((state) => state.categoryTotals);
  const entries = Object.entries(categoryTotals) as [Category, number][];

  if (entries.length === 0) return null;

  const totalWidth = (entries.length - 1) * BAR_SPACING;
  const startX = -totalWidth / 2;
  const maxAmount = Math.max(...entries.map(([, amount]) => amount));
  const scale = maxAmount > 0 ? MAX_HEIGHT / maxAmount : 0;

  return (
    <>
      {entries.map(([category, amount], index) => {
        const height = amount * scale;
        const x = startX + index * BAR_SPACING;
        return (
          <group key={category}>
            <mesh position={[x, height / 2, 0]} castShadow>
              <cylinderGeometry args={[BAR_RADIUS, BAR_RADIUS, height, 32]} />
              <meshStandardMaterial color={COLORS[index % COLORS.length]} />
            </mesh>
            <Text
              position={[x, 0.05, BAR_RADIUS + 0.8]}
              fontSize={0.35}
              color="#000000"
              anchorX="center"
              anchorY="bottom"
            >
              {category}
            </Text>
            <Text
              position={[x, height + 0.2, 0]}
              fontSize={0.35}
              color="#000000"
              anchorX="center"
              anchorY="bottom"
            >
              {`£${amount.toFixed(2)}`}
            </Text>
          </group>
        );
      })}
    </>
  );
};

export default CategoryBars;
