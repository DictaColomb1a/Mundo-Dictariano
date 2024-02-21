import * as three from 'three';

let color;

const elipse = new three.RingGeometry(1, 1.002, 100);
const materialring = new three.MeshBasicMaterial({
  color: new three.Color(0xffffff),
});

let scales = [
  { x: 0.8, y: 0.4 },
  { x: 1, y: 0.6 },
  { x: 1.2, y: 0.8 },
  { x: 1.4, y: 1 },
  { x: 1.6, y: 1.2 },
];

export function createRings(): three.Mesh[] {
  let rings: three.Mesh[] = [];

  for (let i = 0; i < 4; i++) {
    let ring: three.Mesh = new three.Mesh(elipse, materialring);
    ring.rotation.x = -1.555;
    ring.scale.set(scales[i].x, scales[i].y, 0);
    rings.push(ring);
  }

  return rings;
}
