import * as BABYLON from '@babylonjs/core';
import '@babylonjs/inspector';

const canvas = document.getElementById('renderCanvas');

const engine = new BABYLON.Engine(canvas);

const createScene = function() {
  const scene = new BABYLON.Scene(engine);

  scene.createDefaultCameraOrLight(true, false, true);
  scene.createDefaultCameraOrLight();

  // const camera = new BABYLON.UniversalCamera('camera', new BABYLON.Vector3(0, 5, -10), scene);
  const camera = new BABYLON.ArcRotateCamera('camera', 0, 0, 10, new BABYLON.Vector3(0, 0, 0), scene)
  camera.attachControl(true);
  // camera.inputs.addMouseWheel();
  // camera.setTarget(BABYLON.Vector3.Zero());

  camera.setPosition(new BABYLON.Vector3(0, 0, -20));

  camera.lowerBetaLimit = Math.PI / 4;
  camera.upperBetaLimit = Math.PI / 2;

  camera.lowerRadiusLimit = 20;
  camera.upperRadiusLimit = 50;

  // const box = new BABYLON.MeshBuilder.CreateBox('myBox', {
  //   size: 0.1,
  //   width: 2,
  //   height: 0.05,
  //   depth: 0.5,
  //   faceColors: [
  //     new BABYLON.Color4(1, 0, 0, 1),
  //     BABYLON.Color3.Green(),
  //   ],
  // });
  
  const sphere = new BABYLON.MeshBuilder.CreateSphere('mySphere', {
    segments: 12,
    diameter: 0.3,
  });

  const sphereMaterial = new BABYLON.StandardMaterial();
  sphere.material = sphereMaterial;

  sphereMaterial.diffuseColor = new BABYLON.Color3(0, 1, 0)
  sphereMaterial.specularColor = new BABYLON.Color3(1, 0, 0)

  // const ground = new BABYLON.MeshBuilder.CreateGround('', {
  //   height: 10,
  //   width: 10,
  //   subdivisions: 30,
  //   subdivisionX: 10
  // })

  // ground.material = new BABYLON.StandardMaterial();
  // ground.material.wireframe = true; 
  
  // const groundFromHM = new BABYLON.MeshBuilder.CreateGroundFromHeightMap('', '/heightmap.png', {
  //   height: 10,
  //   width: 10,
  //   subdivisions: 60,
  //   maxHeight: 2
  // });

  // groundFromHM.material = new BABYLON.StandardMaterial();
  // groundFromHM.material.wireframe = true; 

  return scene;
}

const scene = createScene();

engine.runRenderLoop(function() {
  scene.render()
});

window.addEventListener('resize', function() {
  engine.resize();
})

// scene.debugLayer.show();
