import { Grid } from "@react-three/drei";

const Floor = () => {
  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[75, 75]} />
        <meshStandardMaterial color="#888888" />
      </mesh>
      <Grid
        args={[50, 50]}
        position={[0, 0.01, 0]}
        cellSize={1}
        cellThickness={1}
        cellColor="#6f6f6f"
        sectionSize={5}
        sectionThickness={1.5}
        sectionColor="#3f3f3f"
        infiniteGrid
        fadeDistance={50}
        fadeStrength={1}
      />
    </>
  );
};

export default Floor;
