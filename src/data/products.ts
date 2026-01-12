export type ShapeType =
  | "Cube"
  | "Tetrahedron"
  | "Cylinder"
  | "Sphere"
  | "Torus"
  | "Pyramid";

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
};

export const INITIAL_SHAPES: ProductShape[] = [
  {
    id: 0,
    shape: "Cube",
    args: [3, 3, 3],
    big: false,
    color: "#008BDE",
    animating: false,
    price: 2500,
  },
  {
    id: 1,
    shape: "Tetrahedron",
    args: [3, 0],
    big: false,
    color: "#DE0088",
    animating: false,
    price: 3000,
  },
  {
    id: 2,
    shape: "Cylinder",
    args: [1.5, 1.5, 3, 32],
    big: false,
    color: "#00DE88",
    animating: false,
    price: 1750,
  },
  {
    id: 3,
    shape: "Sphere",
    args: [2.5, 12, 12],
    big: false,
    color: "#ffac1c",
    animating: false,
    price: 4000,
  },
  {
    id: 4,
    shape: "Torus",
    args: [2, 1, 32, 32],
    big: false,
    color: "#280cc7",
    animating: false,
    price: 4500,
  },
  {
    id: 5,
    shape: "Pyramid",
    args: [3, 3, 4, 3],
    big: false,
    color: "#c70a23",
    animating: false,
    price: 3000,
  },
];
