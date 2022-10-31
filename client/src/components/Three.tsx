import React, {useEffect, useRef} from "react";
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import "./css/Three.css"
import { Color, TextureLoader } from "three";
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper';
import { RectAreaLightUniformsLib  } from 'three/examples/jsm/lights/RectAreaLightUniformsLib';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'



function Three(){
    //GLTF
    const logo = useRef<THREE.Group | undefined>();
    const clouds = useRef<THREE.Mesh[]>([]);

    //requestAnimationFrame
    const stop = useRef<number>(0);

    //Event Variable
    const pointer = useRef({x: 0, y: 0})
    const pointerCounter = useRef(0)
    const initWidth = useRef(window.innerWidth);
    const scaleSize = useRef(window.innerWidth / initWidth.current);
    const logoScaleSize = useRef(5);
    const rotationAmount = useRef(0.01);
    const mousedown = useRef(false);


    useEffect(()=>{
        const camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 1000 );
        const scene = new THREE.Scene();
        const renderer = new THREE.WebGLRenderer( { alpha: true, antialias: true } );
        const control = new OrbitControls(camera, renderer.domElement);

        

        function init3D(){
            //camera
            camera.position.y = 3;
            camera.position.z = 25;
            control.target.set(0, 10, 0);
            
        
            //light

            function createSpotlight (color:THREE.ColorRepresentation) {
                const newObj = new THREE.SpotLight( color, 2 );
                newObj.castShadow = true;
                newObj.angle = 0.5;
                newObj.penumbra = 0.2;
                newObj.decay = 1;
                newObj.distance = 50;
                return newObj;
            }

            const spotLight1 = createSpotlight(0x0000ff);
            spotLight1.position.set(-10, 30, 0)
            scene.add(spotLight1);
            const lightHelper1 = new THREE.SpotLightHelper( spotLight1 );
            scene.add(lightHelper1);
            const spotLight2 = createSpotlight(0xff00aa);
            spotLight2.position.set(10, 30, 0)
            scene.add(spotLight2);
            const lightHelper2 = new THREE.SpotLightHelper( spotLight2 );
            scene.add(lightHelper2);

        
            //renderer
            renderer.setSize( window.innerWidth, window.innerHeight );
            renderer.setClearColor( 0x000000, 1);
            // renderer.setClearColor( 0x000000, 0);
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.shadowMap.enabled = true;
            renderer.shadowMap.type = THREE.PCFSoftShadowMap;
            renderer.outputEncoding = THREE.sRGBEncoding;


            document.querySelector(".three")!.appendChild( renderer.domElement );
            
            // control
            control.enabled = false;
            control.enableRotate = true;
            control.enableZoom = false;
            control.enableDamping = true;
            control.dampingFactor = 0.2;
            // control.minPolarAngle = Math.PI / 3;
            // control.maxPolarAngle = Math.PI / 3;
        
          
            const crystalLoader = new GLTFLoader();
            crystalLoader.load("/crystalsubd.glb", function(gltf){
                gltf.scene.position.set(0, 5, 0);
                gltf.scene.rotation.y = 0;
                gltf.scene.scale.set(scaleSize.current, scaleSize.current, scaleSize.current);
                gltf.scene.castShadow = true;
                gltf.scene.receiveShadow = true;
                gltf.scene.traverse((child)=>{
                    if((child as THREE.Mesh).material !== undefined){
                        // ((child as THREE.Mesh).material as THREE.MeshPhysicalMaterial).color = new THREE.Color(0xff0000)
                        child.castShadow = true;
                        child.receiveShadow = true;
                        ((child as THREE.Mesh).material as THREE.MeshPhysicalMaterial).ior = 2;
                        ((child as THREE.Mesh).material as THREE.MeshPhysicalMaterial).transmission = 1;
                        ((child as THREE.Mesh).material as THREE.MeshPhysicalMaterial).thickness = 0;
                        ((child as THREE.Mesh).material as THREE.MeshPhysicalMaterial).emissive = new THREE.Color(0x003366);
                        ((child as THREE.Mesh).material as THREE.MeshPhysicalMaterial).emissiveIntensity = 1;
                        console.log(child)
                    }
                });


                const pmremGenerator = new THREE.PMREMGenerator(renderer);
                pmremGenerator.compileEquirectangularShader();
                new THREE.TextureLoader().load("/crystal-texture.svg", function(texture){
                    var cubeMap = pmremGenerator.fromEquirectangular(texture);
                    const newEnvMap = cubeMap.texture;
            
                    gltf.scene.traverse(function(child){
                        for(var i = 0; i < child.children.length; i++){
                            ((child.children[i] as THREE.Mesh).material as THREE.MeshStandardMaterial).envMap = newEnvMap;
                            ((child.children[i] as THREE.Mesh).material as THREE.MeshStandardMaterial).envMapIntensity = 1;
                            ((child.children[i] as THREE.Mesh).material as THREE.MeshStandardMaterial).opacity = 1;
                            ((child.children[i] as THREE.Mesh).material as THREE.MeshStandardMaterial).needsUpdate = true;
                        }
                    });
            
                    scene.add( gltf.scene );
                    logo.current = gltf.scene;
                    texture.dispose();
                })
                    scene.add( gltf.scene );

            });
        }

        function createComposer(){
            var renderScene = new RenderPass( scene, camera );
            //Bloom通道创建
            var bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 0.3, 0.4, 0.85 );
            bloomPass.renderToScreen = true;
            bloomPass.threshold = 0;
            bloomPass.strength = 1.5;
            bloomPass.radius = 0;

            const composer = new EffectComposer( renderer );
            composer.setSize( window.innerWidth, window.innerHeight );
            composer.addPass( renderScene );
            composer.addPass( bloomPass );

            return composer;
        }

        const addSmoke = ()=>{
            new TextureLoader().load('/clouds.png', (texture)=>{
                const geometry = new THREE.PlaneGeometry(400, 400);
                const material = new THREE.MeshLambertMaterial({
                    color: 0xaaaaaa,
                    map: texture,
                    transparent: true,
                    opacity: 0.2
                });

                for(let i = 0; i < 3; i++){
                    const mesh = new THREE.Mesh(geometry, material);
                    mesh.position.set((Math.random()-0.5) * 200, (Math.random()-0.5) * 10, Math.random() * -50);
                    mesh.rotation.z = Math.random();
                    // mesh.lookAt(new THREE.Vector3(0, 15, 10));
                    // mesh.position.set(0, 0, 0);
                    scene.add(mesh);
                    clouds.current.push(mesh);
                }
            });
        }

        const addFloor = ()=>{
            const geometry = new THREE.BoxGeometry(100, 0.1, 100);
            const material = new THREE.MeshStandardMaterial({
                color: 0x000000,
                roughness: 1,
                metalness: 0,
                // transparent: true,
                // opacity: 0.2
            });
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(0, 0, 0);
            mesh.receiveShadow = true;
            scene.add(mesh);
        }

        const addDisplayBox = ()=>{
            const geometry = new THREE.CylinderGeometry(5, 5, 1, 50, 10);
            const material = new THREE.MeshStandardMaterial({
                color: 0x000000,
                roughness: 1,
                metalness: 0,
                // transparent: true,
                // opacity: 0.2
            });
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(0, 0.5, 0);
            mesh.receiveShadow = true;
            scene.add(mesh);
        }

        

        const composer = createComposer(); 
        let clock = new THREE.Clock();
        let delta = 0;
        function animation(time:number){
            delta = clock.getDelta();
            composer.render(time);
            // renderer.render(scene, camera);
            control.update();
            onWindowResize();
        
            if(logo.current !== undefined){
                logo.current.rotation.y -= rotationAmount.current;
                // logo.current.position.y = Math.sin(time / 2000) - 50;
            }

            if(camera.position.z > 15){
                camera.position.z -= 0.01;
            }

            for(let i = 0; i < clouds.current.length; i++){
                clouds.current[i].rotation.z += 0.2 * delta;
                // points.current[i].position.y = Math.sin(time / 2000 * pointsPositionYFloat.current[i]) + pointsPositionY.current[i];
            }
            
            if(stop.current === 1){
                return;
            }else{
                requestAnimationFrame(animation);
            }
        }

        init3D();
        requestAnimationFrame(animation);
        // addSmoke();
        addFloor();
        addDisplayBox();

        function onWindowResize() {
            if(scaleSize.current !== window.innerWidth /initWidth.current){
                scaleSize.current = window.innerWidth / initWidth.current;
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
            
                renderer.setSize(window.innerWidth, window.innerHeight);
                logo.current?.scale.set(scaleSize.current * logoScaleSize.current, scaleSize.current * logoScaleSize.current, scaleSize.current * logoScaleSize.current);
            }
        }


        const triggerPointerMove = (event:PointerEvent)=>{
            pointerCounter.current++;
            const lastX = pointer.current.x;
            const lastY = pointer.current.y;
            requestAnimationFrame(()=>{onPointerMove(event, pointerCounter.current, lastX, lastY, 20)});
        }

        const onPointerMove = ( event:PointerEvent, counter:number, lastX:number, lastY:number, accelerate: number) => {
            
            pointer.current.x = (( event.clientX / window.innerWidth ) * 2 - 1) * 7;
            pointer.current.y = (- ( event.clientY / window.innerHeight ) * 2 + 1) * 5 + 6;
            const segX = (pointer.current.x - control.target.x) / 30;
            const segY = (pointer.current.y - control.target.y) / 30;
            if(pointerCounter.current === counter){
                control.target.add(new THREE.Vector3(segX, segY, 0));
                requestAnimationFrame(()=>{onPointerMove(event, counter, lastX, lastY, accelerate - 1)});
            }
        }
  

        const onMouseUp = ()=>{
            mousedown.current = false;
        }

        window.addEventListener( 'pointermove', triggerPointerMove );
        window.addEventListener('mouseup', onMouseUp);

        stop.current = 0;

        return ()=>{
            stop.current = 1;
            while(scene.children.length > 0){ 
                scene.remove(scene.children[0]); 
            }
        }
    }, []);
    
    return(
        <>
            <div className="three"></div>
            <div className="mask"></div>
        </>
    );
}

export default Three;