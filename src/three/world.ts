import { ACESFilmicToneMapping, SRGBColorSpace } from 'three/src/constants.js';
import { Scene } from 'three/src/scenes/Scene.js';
import { FogExp2 } from 'three/src/scenes/FogExp2.js';
import { PerspectiveCamera } from 'three/src/cameras/PerspectiveCamera.js';
import { Vector3 } from 'three/src/math/Vector3.js';
import { BufferAttribute, Float32BufferAttribute } from 'three/src/core/BufferAttribute.js';
import { BufferGeometry } from 'three/src/core/BufferGeometry.js';
import { Object3D } from 'three/src/core/Object3D.js';
import { Group } from 'three/src/objects/Group.js';
import { Mesh } from 'three/src/objects/Mesh.js';
import { LineSegments } from 'three/src/objects/LineSegments.js';
import { Points } from 'three/src/objects/Points.js';
import { BoxGeometry } from 'three/src/geometries/BoxGeometry.js';
import { CircleGeometry } from 'three/src/geometries/CircleGeometry.js';
import { CylinderGeometry } from 'three/src/geometries/CylinderGeometry.js';
import { DodecahedronGeometry } from 'three/src/geometries/DodecahedronGeometry.js';
import { EdgesGeometry } from 'three/src/geometries/EdgesGeometry.js';
import { IcosahedronGeometry } from 'three/src/geometries/IcosahedronGeometry.js';
import { OctahedronGeometry } from 'three/src/geometries/OctahedronGeometry.js';
import { TorusGeometry } from 'three/src/geometries/TorusGeometry.js';
import { LineBasicMaterial } from 'three/src/materials/LineBasicMaterial.js';
import { MeshBasicMaterial } from 'three/src/materials/MeshBasicMaterial.js';
import { MeshStandardMaterial } from 'three/src/materials/MeshStandardMaterial.js';
import { PointsMaterial } from 'three/src/materials/PointsMaterial.js';
import { DirectionalLight } from 'three/src/lights/DirectionalLight.js';
import { HemisphereLight } from 'three/src/lights/HemisphereLight.js';
import { PointLight } from 'three/src/lights/PointLight.js';
import { GridHelper } from 'three/src/helpers/GridHelper.js';
import type { Material, MeshStandardMaterialParameters } from 'three';

export interface WorldOptions {
  reducedMotion: boolean;
  lowPower: boolean;
}

/**
 * A bespoke low-poly "systems island": a wireframe terrain plate, architectural
 * monoliths, floating data shards, and a slow survey-camera orbit. Deliberately
 * built from primitives so it stays small, sharp, and easy to tune.
 */
export async function createWorld(container: HTMLElement, options: WorldOptions): Promise<() => void> {
  const { reducedMotion, lowPower } = options;
  const { WebGLRenderer } = await import('three/src/renderers/WebGLRenderer.js');

  const canvas = document.createElement('canvas');
  canvas.className = 'h-full w-full';
  canvas.setAttribute('aria-hidden', 'true');

  const contextAttributes: WebGLContextAttributes = {
    alpha: true,
    antialias: !lowPower,
    powerPreference: 'high-performance',
    preserveDrawingBuffer: false,
  };

  const context =
    canvas.getContext('webgl2', contextAttributes) ?? canvas.getContext('webgl', contextAttributes);

  if (!context) throw new Error('WebGL unavailable');

  const renderer = new WebGLRenderer({
    canvas,
    context: context as WebGLRenderingContext,
    alpha: true,
    antialias: !lowPower,
    powerPreference: 'high-performance',
  });
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, lowPower ? 1 : 1.6));
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  container.appendChild(canvas);

  const scene = new Scene();
  scene.fog = new FogExp2(0x090d18, 0.024);

  const camera = new PerspectiveCamera(42, 1, 0.1, 160);
  const cameraTarget = new Vector3(0, 1.1, 0);

  const world = new Group();
  scene.add(world);

  const animated: Array<{ object: Object3D; baseY: number; phase: number; speed: number; rotate?: number }> = [];
  const disposables: Array<BufferGeometry | Material> = [];

  const material = (
    color: number,
    opts: Partial<MeshStandardMaterialParameters> = {},
  ): MeshStandardMaterial => {
    const created = new MeshStandardMaterial({
      color,
      roughness: 0.86,
      metalness: 0.18,
      flatShading: true,
      ...opts,
    });
    disposables.push(created);
    return created;
  };

  const lineMaterial = (color: number, opacity = 0.45): LineBasicMaterial => {
    const created = new LineBasicMaterial({ color, transparent: true, opacity });
    disposables.push(created);
    return created;
  };

  const addEdges = (geometry: BufferGeometry, color: number, opacity = 0.55): LineSegments => {
    const edges = new EdgesGeometry(geometry);
    const lines = new LineSegments(edges, lineMaterial(color, opacity));
    disposables.push(edges);
    return lines;
  };

  // ---------------------------------------------------------------------
  // Lighting
  // ---------------------------------------------------------------------
  scene.add(new HemisphereLight(0x72f1b8, 0x090d18, 0.55));

  const key = new DirectionalLight(0xf4b860, 1.15);
  key.position.set(-8, 11, 6);
  scene.add(key);

  const mintPoint = new PointLight(0x72f1b8, 14, 18, 2);
  mintPoint.position.set(0, 2.2, 0);
  scene.add(mintPoint);

  const violetPoint = new PointLight(0xb9a0ff, 9, 22, 2);
  violetPoint.position.set(5, 3.5, -6);
  scene.add(violetPoint);

  // ---------------------------------------------------------------------
  // Island plate + wireframe survey rings
  // ---------------------------------------------------------------------
  const islandGeometry = new CylinderGeometry(6.4, 4.1, 1.35, 7, 1);
  const island = new Mesh(islandGeometry, material(0x152238, { roughness: 0.95, metalness: 0.05 }));
  island.position.y = -1.15;
  world.add(island);
  disposables.push(islandGeometry);
  const islandEdges = addEdges(islandGeometry, 0x72f1b8, 0.25);
  islandEdges.position.copy(island.position);
  world.add(islandEdges);

  const ringPositions: number[] = [];
  for (let ring = 0; ring < 5; ring += 1) {
    const radius = 1.15 + ring * 1.25;
    const segments = 36;
    for (let i = 0; i < segments; i += 1) {
      const a = (i / segments) * Math.PI * 2;
      const b = ((i + 1) / segments) * Math.PI * 2;
      ringPositions.push(
        Math.cos(a) * radius,
        0.18,
        Math.sin(a) * radius,
        Math.cos(b) * radius,
        0.18,
        Math.sin(b) * radius,
      );
    }
  }
  for (let i = 0; i < 14; i += 1) {
    const angle = (i / 14) * Math.PI * 2;
    ringPositions.push(
      Math.cos(angle) * 1.1,
      0.18,
      Math.sin(angle) * 1.1,
      Math.cos(angle) * 5.9,
      0.18,
      Math.sin(angle) * 5.9,
    );
  }
  const ringGeometry = new BufferGeometry();
  ringGeometry.setAttribute('position', new Float32BufferAttribute(ringPositions, 3));
  const rings = new LineSegments(ringGeometry, lineMaterial(0x72f1b8, 0.22));
  world.add(rings);
  disposables.push(ringGeometry);

  // Under-island low-poly shards.
  for (let i = 0; i < 9; i += 1) {
    const radius = 1.3 + Math.random() * 3.2;
    const angle = Math.random() * Math.PI * 2;
    const size = 0.35 + Math.random() * 0.85;
    const geometry = new DodecahedronGeometry(size, 0);
    const shard = new Mesh(geometry, material(i % 3 === 0 ? 0x21314f : 0x111a2b));
    shard.position.set(
      Math.cos(angle) * radius,
      -2.1 - Math.random() * 2.6,
      Math.sin(angle) * radius,
    );
    shard.rotation.set(Math.random(), Math.random(), Math.random());
    shard.scale.y = 1.7 + Math.random();
    world.add(shard);
    disposables.push(geometry);
  }

  // ---------------------------------------------------------------------
  // Central monolith + orbital rings
  // ---------------------------------------------------------------------
  const monolithGeometry = new BoxGeometry(0.86, 3.8, 0.86);
  const monolith = new Mesh(monolithGeometry, material(0x1b2a45, { metalness: 0.42 }));
  monolith.position.set(0, 1.35, 0);
  world.add(monolith);
  disposables.push(monolithGeometry);
  const monolithEdges = addEdges(monolithGeometry, 0x72f1b8, 0.7);
  monolithEdges.position.copy(monolith.position);
  world.add(monolithEdges);

  const coreGeometry = new OctahedronGeometry(0.5, 0);
  const coreMaterial = new MeshStandardMaterial({
    color: 0x72f1b8,
    emissive: 0x3cb98a,
    emissiveIntensity: 1.6,
    roughness: 0.25,
    metalness: 0.1,
    flatShading: true,
  });
  const core = new Mesh(coreGeometry, coreMaterial);
  core.position.set(0, 3.5, 0);
  world.add(core);
  disposables.push(coreGeometry, coreMaterial);

  const orbitGroup = new Group();
  orbitGroup.position.set(0, 2.15, 0);
  const orbitGeometry = new TorusGeometry(1.45, 0.012, 4, 52);
  const orbitMaterial = new MeshBasicMaterial({
    color: 0x72f1b8,
    transparent: true,
    opacity: 0.6,
    depthWrite: false,
  });
  const orbitMaterialB = new MeshBasicMaterial({
    color: 0xf4b860,
    transparent: true,
    opacity: 0.48,
    depthWrite: false,
  });
  const orbitA = new Mesh(orbitGeometry, orbitMaterial);
  orbitA.rotation.x = Math.PI / 2.35;
  orbitGroup.add(orbitA);
  const orbitB = new Mesh(orbitGeometry, orbitMaterialB);
  orbitB.rotation.x = Math.PI / 1.75;
  orbitB.rotation.y = Math.PI / 3;
  orbitGroup.add(orbitB);
  world.add(orbitGroup);
  disposables.push(orbitGeometry, orbitMaterial, orbitMaterialB);

  // ---------------------------------------------------------------------
  // Architectural towers
  // ---------------------------------------------------------------------
  interface Tower {
    x: number;
    z: number;
    height: number;
    width: number;
    accent: number;
    tint: number;
  }

  const towers: Tower[] = [
    { x: -2.9, z: 1.05, height: 2.65, width: 0.48, accent: 0xb9a0ff, tint: 0x1a2742 },
    { x: 2.7, z: 1.6, height: 1.85, width: 0.58, accent: 0xf4b860, tint: 0x1d2a44 },
    { x: 1.75, z: -2.55, height: 3.25, width: 0.42, accent: 0x72f1b8, tint: 0x18253d },
    { x: -1.5, z: -2.9, height: 1.25, width: 0.68, accent: 0x72f1b8, tint: 0x152137 },
    { x: 3.65, z: -0.65, height: 1.55, width: 0.36, accent: 0xb9a0ff, tint: 0x1a2742 },
  ];

  for (const tower of towers) {
    const geometry = new BoxGeometry(tower.width, tower.height, tower.width);
    const mesh = new Mesh(geometry, material(tower.tint, { metalness: 0.32 }));
    mesh.position.set(tower.x, tower.height / 2, tower.z);
    world.add(mesh);
    disposables.push(geometry);

    const edges = addEdges(geometry, tower.accent, 0.62);
    edges.position.copy(mesh.position);
    world.add(edges);

    const beaconGeometry = new OctahedronGeometry(tower.width * 0.42, 0);
    const beaconMaterial = new MeshStandardMaterial({
      color: tower.accent,
      emissive: tower.accent,
      emissiveIntensity: 1.4,
      flatShading: true,
      roughness: 0.4,
    });
    const beacon = new Mesh(beaconGeometry, beaconMaterial);
    beacon.position.set(tower.x, tower.height + tower.width * 0.7, tower.z);
    world.add(beacon);
    disposables.push(beaconGeometry, beaconMaterial);
    animated.push({
      object: beacon,
      baseY: beacon.position.y,
      phase: Math.random() * Math.PI * 2,
      speed: 0.7 + Math.random() * 0.5,
      rotate: 0.45,
    });

    const mastGeometry = new CylinderGeometry(0.014, 0.014, tower.height + 0.7, 4);
    const mast = new Mesh(mastGeometry, material(0x35496b, { metalness: 0.8 }));
    mast.position.set(tower.x, tower.height + 0.35, tower.z);
    world.add(mast);
    disposables.push(mastGeometry);
  }

  // A low arch/gateway on the west side.
  const archGroup = new Group();
  archGroup.position.set(-4.2, 0.1, -1.9);
  const legGeometry = new BoxGeometry(0.22, 2.1, 0.22);
  const legMaterial = material(0x20314f, { metalness: 0.35 });
  const leftLeg = new Mesh(legGeometry, legMaterial);
  leftLeg.position.set(-0.7, 1.05, 0);
  const rightLeg = new Mesh(legGeometry, legMaterial);
  rightLeg.position.set(0.7, 1.05, 0);
  archGroup.add(leftLeg, rightLeg);
  const lintelGeometry = new BoxGeometry(1.7, 0.18, 0.24);
  const lintel = new Mesh(lintelGeometry, legMaterial);
  lintel.position.set(0, 2.12, 0);
  archGroup.add(lintel);
  const leftEdge = addEdges(legGeometry, 0xf4b860, 0.4);
  leftEdge.position.set(-0.7, 1.05, 0);
  const rightEdge = addEdges(legGeometry, 0xf4b860, 0.4);
  rightEdge.position.set(0.7, 1.05, 0);
  const lintelEdge = addEdges(lintelGeometry, 0xf4b860, 0.4);
  lintelEdge.position.set(0, 2.12, 0);
  archGroup.add(leftEdge, rightEdge, lintelEdge);
  world.add(archGroup);
  disposables.push(legGeometry, lintelGeometry);

  // ---------------------------------------------------------------------
  // Floating shards
  // ---------------------------------------------------------------------
  const shardCount = lowPower ? 6 : 12;
  for (let i = 0; i < shardCount; i += 1) {
    const geometry =
      i % 2 === 0
        ? new IcosahedronGeometry(0.18 + Math.random() * 0.3, 0)
        : new BoxGeometry(0.28 + Math.random() * 0.3, 0.18 + Math.random() * 0.2, 0.28 + Math.random() * 0.3);
    const accent = i % 3 === 0 ? 0xf4b860 : i % 3 === 1 ? 0x72f1b8 : 0xb9a0ff;
    const mesh = new Mesh(geometry, material(0x1a2742, { metalness: 0.3 }));
    mesh.position.set(
      (Math.random() - 0.5) * 10.5,
      1.1 + Math.random() * 4.4,
      (Math.random() - 0.5) * 10.5,
    );
    mesh.rotation.set(Math.random(), Math.random(), Math.random());
    world.add(mesh);
    const edges = addEdges(geometry, accent, 0.62);
    edges.position.copy(mesh.position);
    edges.rotation.copy(mesh.rotation);
    world.add(edges);
    disposables.push(geometry);
    animated.push({
      object: mesh,
      baseY: mesh.position.y,
      phase: Math.random() * Math.PI * 2,
      speed: 0.35 + Math.random() * 0.45,
      rotate: 0.1 + Math.random() * 0.18,
    });
    animated.push({
      object: edges,
      baseY: mesh.position.y,
      phase: Math.random() * 7,
      speed: 0.0001,
    });
  }

  // ---------------------------------------------------------------------
  // Particle field + distant stars
  // ---------------------------------------------------------------------
  const makePoints = (count: number, radius: number, color: number, size: number, opacity: number) => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const angle = Math.random() * Math.PI * 2;
      const r = radius * (0.25 + Math.random() * 0.75);
      positions[i * 3] = Math.cos(angle) * r;
      positions[i * 3 + 1] = (Math.random() - 0.25) * 12;
      positions[i * 3 + 2] = Math.sin(angle) * r;
    }
    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new BufferAttribute(positions, 3));
    const pointsMaterial = new PointsMaterial({
      color,
      size,
      transparent: true,
      opacity,
      sizeAttenuation: true,
      depthWrite: false,
    });
    const points = new Points(geometry, pointsMaterial);
    scene.add(points);
    disposables.push(geometry, pointsMaterial);
    return points;
  };

  const dust = makePoints(lowPower ? 120 : 260, 16, 0x72f1b8, 0.055, 0.65);
  const stars = makePoints(lowPower ? 120 : 300, 46, 0xb9a0ff, 0.085, 0.5);
  stars.position.y = 4;

  // Distant amber moon.
  const moonGeometry = new CircleGeometry(2.2, 48);
  const moonMaterial = new MeshBasicMaterial({ color: 0xf4b860, transparent: true, opacity: 0.12 });
  const moon = new Mesh(moonGeometry, moonMaterial);
  moon.position.set(-10, 8.5, -30);
  scene.add(moon);
  disposables.push(moonGeometry, moonMaterial);

  // ---------------------------------------------------------------------
  // Ground survey grid
  // ---------------------------------------------------------------------
  const grid = new GridHelper(90, 45, 0x72f1b8, 0x1c2b45);
  grid.position.y = -6.6;
  const gridMaterials = Array.isArray(grid.material) ? grid.material : [grid.material];
  gridMaterials.forEach((entry) => {
    entry.transparent = true;
    entry.opacity = 0.18;
    entry.depthWrite = false;
    disposables.push(entry);
  });
  scene.add(grid);

  // ---------------------------------------------------------------------
  // Camera + interaction
  // ---------------------------------------------------------------------
  const pointer = { x: 0, y: 0 };
  const pointerTarget = { x: 0, y: 0 };

  const onPointerMove = (event: PointerEvent) => {
    if (event.pointerType !== 'mouse') return;
    const rect = container.getBoundingClientRect();
    pointerTarget.x = Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width - 0.5) * 2));
    pointerTarget.y = Math.max(-1, Math.min(1, ((event.clientY - rect.top) / rect.height - 0.5) * 2));
  };
  window.addEventListener('pointermove', onPointerMove, { passive: true });

  const resize = () => {
    const width = container.clientWidth || 1;
    const height = container.clientHeight || 1;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };
  resize();
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(container);

  let visible = true;
  const intersectionObserver = new IntersectionObserver(
    (entries) => {
      visible = entries.some((entry) => entry.isIntersecting);
    },
    { threshold: 0.02 },
  );
  intersectionObserver.observe(container);

  let elapsed = reducedMotion ? 2.4 : 0;
  let lastFrame = performance.now();
  let frame = 0;
  let hidden = false;
  const onVisibility = () => {
    hidden = document.hidden;
    if (!hidden) lastFrame = performance.now();
  };
  document.addEventListener('visibilitychange', onVisibility);

  const render = () => {
    if (!reducedMotion) {
      const now = performance.now();
      elapsed += Math.min((now - lastFrame) / 1000, 0.25);
      lastFrame = now;
    }
    pointer.x += (pointerTarget.x - pointer.x) * 0.045;
    pointer.y += (pointerTarget.y - pointer.y) * 0.045;

    const orbitRadius = 13.4;
    const angle = 0.72 + elapsed * 0.038;
    camera.position.x = Math.sin(angle) * orbitRadius + pointer.x * 0.65;
    camera.position.z = Math.cos(angle) * orbitRadius + pointer.y * 0.25;
    camera.position.y = 6.9 + Math.sin(elapsed * 0.16) * 0.28 - pointer.y * 0.35;
    camera.lookAt(cameraTarget);

    if (!reducedMotion) {
      world.rotation.y = Math.sin(elapsed * 0.05) * 0.08;
      core.rotation.y = elapsed * 0.6;
      core.rotation.x = Math.sin(elapsed * 0.4) * 0.25;
      core.position.y = 3.5 + Math.sin(elapsed * 1.2) * 0.06;
      orbitGroup.rotation.y = elapsed * 0.12;
      orbitGroup.rotation.z = Math.sin(elapsed * 0.18) * 0.08;
      dust.rotation.y = elapsed * 0.012;
      stars.rotation.y = elapsed * -0.006;

      for (const item of animated) {
        item.object.position.y = item.baseY + Math.sin(elapsed * item.speed + item.phase) * 0.14;
        if (item.rotate) item.object.rotation.y += item.rotate * 0.003;
      }
    }

    renderer.render(scene, camera);
  };

  const animate = () => {
    frame = requestAnimationFrame(animate);
    if (hidden || !visible) return;
    render();
  };

  if (reducedMotion) {
    render();
  } else {
    animate();
  }

  return () => {
    cancelAnimationFrame(frame);
    resizeObserver.disconnect();
    intersectionObserver.disconnect();
    document.removeEventListener('visibilitychange', onVisibility);
    window.removeEventListener('pointermove', onPointerMove);
    scene.traverse((object) => {
      if (
        object instanceof Mesh ||
        object instanceof LineSegments ||
        object instanceof Points
      ) {
        object.geometry?.dispose?.();
      }
    });
    disposables.forEach((item) => item.dispose());
    renderer.dispose();
    renderer.forceContextLoss();
    canvas.remove();
  };
}
