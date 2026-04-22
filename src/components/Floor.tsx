import { Grid } from "@react-three/drei";
import useStore from "../state/store";

const Floor = () => {
  const floorColor = useStore((state) => state.floorColor);
  return (
    <>
      <Grid
        args={[10, 10]}
        position={[0, 0.01, 0]}
        cellSize={0.5}
        cellThickness={1}
        cellColor="#6f6f6f"
        sectionSize={5}
        sectionThickness={1.5}
        sectionColor="#9d4b4b"
        infiniteGrid
        fadeDistance={25}
        fadeStrength={1}
      />
    </>
  );
};

export default Floor;
