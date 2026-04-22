import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { Color } from "three";
import useStore from "../state/store";

const DaySky = () => {
  const backgroundColor = useStore((state) => state.backgroundColor);
  const scene = useThree((state) => state.scene);

  useEffect(() => {
    scene.background = new Color(backgroundColor);
  }, [backgroundColor, scene]);

  return null;
};

export default DaySky;
