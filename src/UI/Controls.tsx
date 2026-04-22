import { useControls } from "leva";
import useStore from "../state/store";

const Controls = () => {
  const backgroundColor = useStore((state) => state.backgroundColor);
  const setBackgroundColor = useStore((state) => state.setBackgroundColor);
  const floorColor = useStore((state) => state.floorColor);
  const setFloorColor = useStore((state) => state.setFloorColor);

  useControls({
    background: {
      value: backgroundColor,
      onChange: (value: string) => setBackgroundColor(value),
    },
    floor: {
      value: floorColor,
      onChange: (value: string) => setFloorColor(value),
    },
  });

  return null;
};

export default Controls;
