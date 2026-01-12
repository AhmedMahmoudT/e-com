export type ShapeType =
  | "Cube"
  | "Tetrahedron"
  | "Cylinder"
  | "Sphere"
  | "Torus"
  | "Pyramid"
  | "Artifact";

export type ProductShape = {
  id: number;
  shape: ShapeType;
  args:
    | [number, number, number, number]
    | [number, number, number]
    | [number, number];
  big: boolean;
  animating: boolean;
  price: number;
  color: string;
  modelPath?: string;
  name: string;
  scale?: number;
  description?: string;
};

export const INITIAL_SHAPES: ProductShape[] = [
  {
    id: 0,
    shape: "Cube",
    name: "Cube",
    args: [3, 3, 3],
    big: false,
    color: "#008BDE",
    animating: false,
    price: 25,
  },
  {
    id: 1,
    shape: "Tetrahedron",
    name: "Tetrahedron",
    args: [3, 0],
    big: false,
    color: "#DE0088",
    animating: false,
    price: 30,
  },
  {
    id: 2,
    shape: "Cylinder",
    name: "Cylinder",
    args: [1.5, 1.5, 3, 32],
    big: false,
    color: "#00DE88",
    animating: false,
    price: 17.5,
  },
  {
    id: 3,
    shape: "Sphere",
    name: "Sphere",
    args: [2.5, 12, 12],
    big: false,
    color: "#ffac1c",
    animating: false,
    price: 40,
  },
  {
    id: 4,
    shape: "Torus",
    name: "Torus",
    args: [2, 1, 32, 32],
    big: false,
    color: "#280cc7",
    animating: false,
    price: 45,
  },
  {
    id: 5,
    shape: "Pyramid",
    name: "Pyramid",
    args: [3, 3, 4, 3],
    big: false,
    color: "#c70a23",
    animating: false,
    price: 30,
  },
];

export const ARTIFACTS: ProductShape[] = [
  {
    id: 101,
    shape: "Artifact",
    name: "Rubik's Cube",
    args: [0, 0, 0],
    big: false,
    color: "#FFD700",
    animating: false,
    price: 150,
    modelPath:
      "https://tah10l6m9o.ufs.sh/f/xlDS7bZeuGNrpQaaFvR2iZoQkVJLzmr4HBwbOjlaYA5WE9Us",
    description:
      "A mathematical masterpiece of topological complexity. This high-fidelity digital sculpture captures the tactile intrigue of the original 1974 puzzle, rendered with flawless geometric precision for the modern vault.",
    scale: 15,
  },
  {
    id: 102,
    shape: "Artifact",
    name: "Vintage BoomBox",
    args: [0, 0, 0],
    big: false,
    color: "#8B4513",
    animating: false,
    price: 200,
    modelPath:
      "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BoomBox/glTF-Binary/BoomBox.glb",
    description:
      "A resonant echo of the 1980's urban soundscape. This meticulously preserved digital artifact features industrial-grade detailing and an evocative silhouette that recalls the golden age of portable high-fidelity audio.",
    scale: 150, // BoomBox is notoriously small in GLTF samples
  },
  {
    id: 103,
    shape: "Artifact",
    name: "Low-Poly Duck",
    args: [0, 0, 0],
    big: false,
    color: "#C0C0C0",
    animating: false,
    price: 100,
    modelPath:
      "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Duck/glTF-Binary/Duck.glb",
    description:
      "An elegant study in geometric minimalism. This procedural aquatic sculpture distills the organic essence of nature into a series of stark, rhythmic planes, challenging the boundary between the natural world and digital abstraction.",
    scale: 1.75,
  },
];
