import { startStressTest } from './stressTest.js';
import * as BABYLON from '@babylonjs/core';
import '@babylonjs/inspector';

const canvasWebGL = document.getElementById('renderCanvas');
const canvasWebGPU = document.getElementById('renderCanvasWebGPU');

const engineWebGL = new BABYLON.Engine(canvasWebGL, true);

let engineWebGPU;
if (BABYLON.Engine.IsWebGPUSupported) {
    engineWebGPU = new BABYLON.Engine(canvasWebGPU, true, { useWebGPU: true });
} else {
    engineWebGPU = new BABYLON.Engine(canvasWebGPU, true);
}

const createScene = function(engine) {
    const scene = new BABYLON.Scene(engine);
    scene.createDefaultCameraOrLight(true, false, true);

    const sphere = BABYLON.MeshBuilder.CreateSphere('mySphere', {
        segments: 32,
        diameter: 0.3,
        diameterY: .5,
    });

    const sphereMaterial = new BABYLON.StandardMaterial();
    sphere.material = sphereMaterial;
    sphereMaterial.emissiveColor = new BABYLON.Color3(0, 1, 0)

    return scene;
}

const sceneWebGL = createScene(engineWebGL);
const sceneWebGPU = createScene(engineWebGPU);

startStressTest(sceneWebGL, sceneWebGPU);

const fpsDisplayWebGL = document.getElementById('fpsWebGL');
const fpsDisplayWebGPU = document.getElementById('fpsWebGPU');

const statsDisplayWebGL = document.getElementById('statsWebGL');
const statsDisplayWebGPU = document.getElementById('statsWebGPU');

engineWebGL.runRenderLoop(function() {
  sceneWebGL.render();
  fpsDisplayWebGL.textContent = `FPS: ${engineWebGL.getFps().toFixed(2)}`;
  statsDisplayWebGL.innerHTML = `
      Draw Calls: ${sceneWebGL.getActiveMeshes().length}<br>
      Total Vertices: ${sceneWebGL.getTotalVertices()}<br>
      Total Materials: ${sceneWebGL.materials.length}
  `;
});

engineWebGPU.runRenderLoop(function() {
  sceneWebGPU.render();
  fpsDisplayWebGPU.textContent = `FPS: ${engineWebGPU.getFps().toFixed(2)}`;
  statsDisplayWebGPU.innerHTML = `
      Draw Calls: ${sceneWebGPU.getActiveMeshes().length}<br>
      Total Vertices: ${sceneWebGPU.getTotalVertices()}<br>
      Total Materials: ${sceneWebGPU.materials.length}
  `;
});

window.addEventListener('resize', function() {
    engineWebGL.resize();
    engineWebGPU.resize();
});
