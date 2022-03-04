type Point = {
  x: number;
  y: number;
};

type Name = {
  name: string;
};

type NamedPoint = Name | Point;
type P = keyof Point;
type K = keyof any;
type R<T> = { [S in keyof T]: T[S] };
let point: Readonly<Point> = { x: 1, y: 12 };
type A = { 121:'', 12: 12}

class obj {
  point: Point | undefined;
  p: P;
  k: K;
  r: R<Point>;
  constructor() {
    this.point = { x: 1, y: 2 };
    this.p = 'x';
    this.k = 1;
    this.r = { x: 12, y: 12 };
  }
  judge() {
    if (typeof this.point !== 'undefined') {
      console.log(this.point.x);
    }
    this.print(this.point as Point);
    console.log(this.point!.x);
  }
  print(val: Point) {
    console.log(val.x);
  }
}