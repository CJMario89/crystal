import React, {useEffect, useRef} from "react";
import * as THREE from 'three';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass'
import {UnrealBloomPass} from 'three/examples/jsm/postprocessing/TransparentBackgroundFixedUnrealBloomPass'
import {BloomPass} from 'three/examples/jsm/postprocessing/BloomPass'
import {ShaderPass} from 'three/examples/jsm/postprocessing/ShaderPass'
import {CopyShader} from 'three/examples/jsm/shaders/CopyShader'
import {FocusShader} from 'three/examples/jsm/shaders/FocusShader'
import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer'
import "./css/Three.css"
import { Mesh } from "three";



function Three(){
    //GLTF
    const logo = useRef<THREE.Points | undefined>();
    const points = useRef<THREE.Points[]>([]);
    const pointsPositionY = useRef<number[]>([]);
    const pointsPositionYFloat = useRef<number[]>([]);
    const pointsColor = useRef<THREE.ColorRepresentation[]>([]);

    //requestAnimationFrame
    const stop = useRef<number>(0);

    //Event Variable
    const pointer = useRef({x: 0, y: 0})
    const pointerCounter = useRef(0)
    const scaleSize = useRef(window.innerWidth / 1800);
    const rotationAmount = useRef(0.001);
    const mousedown = useRef(false);


    useEffect(()=>{
        const camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 1000 );
        const scene = new THREE.Scene();
        const renderer = new THREE.WebGLRenderer( { alpha: true, antialias: true } );
        const control = new OrbitControls(camera, renderer.domElement);

        

        function init3D(){
            //camera
            camera.position.y = 15;
            camera.position.z = 10;
            control.target.set(0, 0, 0);
            
        
            //light
            const light = new THREE.HemisphereLight( 0xff6666,  0xff6666, 35 );
            light.position.set(0, 3, 0);
            light.lookAt(new THREE.Vector3(0, 3, 0));
            scene.add( light );
            
        
            //renderer
            renderer.setSize( window.innerWidth, window.innerHeight );
            // renderer.setClearColor( 0x000000, 1);
            renderer.setClearColor( 0x000000, 0);
            renderer.setPixelRatio(window.devicePixelRatio);
            document.querySelector(".three")!.appendChild( renderer.domElement );
            
            //control
            control.enabled = false;
            control.enableRotate = true;
            control.enableZoom = false;
            control.enableDamping = true;
            control.dampingFactor = 0.2;
            control.minPolarAngle = Math.PI / 3;
            control.maxPolarAngle = Math.PI / 3;
        
            //3D model
            // const logoLoader = new GLTFLoader();
            // logoLoader.load("/crystalLogo.glb", function(gltf){
            //     logo.current = gltf.scene;
            //     logo.current.rotation.y = 0;
            //     logo.current.scale.set(scaleSize.current, scaleSize.current, scaleSize.current);
            //     logo.current.traverse((child)=>{
            //         if((child as THREE.Mesh).material !== undefined){
            //             // ((child as THREE.Mesh).material as THREE.MeshPhysicalMaterial).color = new THREE.Color(0xff0000)
            //         }
            //     });


            //     const pmremGenerator = new THREE.PMREMGenerator(renderer);
            //     pmremGenerator.compileEquirectangularShader();
            //     new THREE.TextureLoader().load("crystal-texture.svg", function(texture){
            //         var cubeMap = pmremGenerator.fromEquirectangular(texture);
            //         const newEnvMap = cubeMap.texture;
            
            //         gltf.scene.traverse(function(child){
            //             for(var i = 0; i < child.children.length; i++){
            //                 ((child.children[i] as THREE.Mesh).material as THREE.MeshStandardMaterial).envMap = newEnvMap;
            //                 ((child.children[i] as THREE.Mesh).material as THREE.MeshStandardMaterial).envMapIntensity = 1;
            //                 ((child.children[i] as THREE.Mesh).material as THREE.MeshStandardMaterial).opacity = 1;
            //                 ((child.children[i] as THREE.Mesh).material as THREE.MeshStandardMaterial).needsUpdate = true;
            //             }
            //         });
            
            //         // scene.add( gltf.scene );
            //         texture.dispose();
            //     }) 
            // });

            const crystalLoader = new GLTFLoader();
            crystalLoader.load('crystalsubd.glb', (gltf)=>{
                const positions = combineBuffer(gltf.scene, 'position');
                createMesh(positions, scene, 3, 0, -100, -50, 0x77aaff, 0.3);
            });
        }

        const addParticles = () => {
            // const curve = new THREE.CatmullRomCurve3( [
            //     new THREE.Vector3( -10, 0, 10 ),
            //     new THREE.Vector3( -5, 5, 5 ),
            //     new THREE.Vector3( 0, 0, 0 ),
            //     new THREE.Vector3( 5, -5, 5 ),
            //     new THREE.Vector3( 10, 0, 10 )
            // ] );
            
            // const points = curve.getPoints( 50 );
            // const geometry = new THREE.BufferGeometry().setFromPoints( points );
            
            // const material = new THREE.LineBasicMaterial( { color: 0xff0000 } );
            
            // const curveObject = new THREE.Line( geometry, material );
            //const positions = combineBuffer(curveObject, 'position');



            const planetLoader = new GLTFLoader();
            planetLoader.load('planet4.glb', (gltf)=>{
                const positions = combineBuffer(gltf.scene, 'position');
                createMesh(positions, scene, 3, -30, -40, -50, 0xffaa77, 0.2);//orange
                createMesh(positions, scene, 4, -45, -8, -50, 0x00ff9f, 0.2);//green
                createMesh(positions, scene, 3, 15, -15, -50, 0x00b8ff, 0.2);//lblue
                createMesh(positions, scene, 3.5, 35, -10, -50, 0x001eff, 0.2);//dblue
                createMesh(positions, scene, 3.5, -25, -15, -50, 0xbd00ff, 0.2);//dpurple
                createMesh(positions, scene, 5.5, 50, -45, -50, 0xd600ff, 0.2);//lpurple
                createMesh(positions, scene, 5.5, -65, -35, -50, 0xffff77, 0.2);//yellow
                createMesh(positions, scene, 2.5, 60, -20, -50, 0xff3333, 0.2);//red
            })

            // scene.add(curveObject)
        }

        function combineBuffer( model:THREE.Group, bufferName:string ) {
            let count = 0;
            model.traverse( function ( child ) {
                if ( (child as THREE.Mesh).isMesh ) {
                    const buffer = (child as THREE.Mesh).geometry.attributes[ bufferName ];
                    count += buffer.array.length;
                }
            } );
            const combined = new Float32Array( count );
            let offset = 0;
            model.traverse( function ( child ) {
                if ( (child as THREE.Mesh).isMesh ) {
                    const buffer = (child as THREE.Mesh).geometry.attributes[ bufferName ];
                    combined.set( buffer.array, offset );
                    offset += buffer.array.length;
                }
            } );
            return new THREE.BufferAttribute( combined, 3 );
        }
        function createMesh( positions:THREE.BufferAttribute, scene:THREE.Scene, scale:number, x:number, y:number, z:number, color:THREE.ColorRepresentation , pointSize:number) {
            const geometry = new THREE.BufferGeometry();
            geometry.setAttribute( 'position', positions.clone() );
            geometry.setAttribute( 'initialPosition', positions.clone() );
            (geometry.attributes.position as THREE.BufferAttribute).setUsage( THREE.DynamicDrawUsage );
            const clones = [
                [ 0, 0, 0 ]
            ];
            for ( let i = 0; i < clones.length; i ++ ) {
                const c = color;
                let mesh = new THREE.Points( geometry, new THREE.PointsMaterial( { size: pointSize, color: c } ) );
                mesh.scale.x = mesh.scale.y = mesh.scale.z = scale;
                mesh.position.x = x + clones[ i ][ 0 ];
                mesh.position.y = y + clones[ i ][ 1 ];
                mesh.position.z = z + clones[ i ][ 2 ];
                
                
                scene.add( mesh );
                if(pointSize === 0.2){
                    mesh.rotation.x = Math.abs(Math.abs(Math.random() - 0.5) - 0.25);
                    mesh.rotation.z = Math.abs(Math.abs(Math.random() - 0.5) - 0.25);
                    points.current.push(mesh);
                    pointsPositionY.current.push(y);
                    pointsPositionYFloat.current.push(Math.random() * 2.5);
                    pointsColor.current.push(color)
                }else if(pointSize === 0.3){
                    logo.current = mesh;
                }
            }
        }

        const scenePoints = new THREE.Scene();
        scenePoints.add(points.current[0]);
        const renderModel = new RenderPass( scenePoints, camera );
        const bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 2, 0.4, 0.85 );
        // const effectBloom = new BloomPass( 0.75 );
        // const effectCopy = new ShaderPass(CopyShader);
        // const effectFocus = new ShaderPass( FocusShader );

        // effectFocus.uniforms[ 'screenWidth' ].value = window.innerWidth * window.devicePixelRatio;
        // effectFocus.uniforms[ 'screenHeight' ].value = window.innerHeight * window.devicePixelRatio;


        const composer = new EffectComposer( renderer );

        // composer.addPass( effectBloom );
        // composer.addPass( effectFocus );
        composer.addPass( renderModel );
        composer.addPass( bloomPass );

        
        function animation(time:number){
            // renderer.autoClear = false;
            // renderer.clear();
            
            // camera.layers.set(1);
            // composer.render();
            
            // renderer.clearDepth();
            // camera.layers.set(0);
            renderer.render(scene, camera);
            control.update();
        
            if(logo.current !== undefined){
                logo.current.rotation.y -= rotationAmount.current;
                logo.current.position.y = Math.sin(time / 2000) - 50;
            }

            for(let i = 0; i < points.current.length; i++){
                points.current[i].rotation.y += rotationAmount.current;
                points.current[i].position.y = Math.sin(time / 2000 * pointsPositionYFloat.current[i]) + pointsPositionY.current[i];
            }


            
            if(stop.current === 1){
                return;
            }else{
                requestAnimationFrame(animation);
            }
        }

        init3D();
        requestAnimationFrame(animation);
        addParticles();

        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
        
            renderer.setSize(window.innerWidth, window.innerHeight);
            scaleSize.current = window.innerWidth / 1800;
            logo.current?.scale.set(scaleSize.current, scaleSize.current, scaleSize.current);
        }


        const triggerPointerMove = (event:PointerEvent)=>{
            pointerCounter.current++;
            const lastX = pointer.current.x;
            const lastY = pointer.current.y;
            requestAnimationFrame(()=>{onPointerMove(event, pointerCounter.current, lastX, lastY, 20)});
            console.log(pointerCounter.current)
        }

        const onPointerMove = ( event:PointerEvent, counter:number, lastX:number, lastY:number, accelerate: number) => {
            
            pointer.current.x = ( event.clientX / window.innerWidth ) * 2 - 1;
            pointer.current.y = (- ( event.clientY / window.innerHeight ) * 2 + 1) * 2;
            const segX = (pointer.current.x - control.target.x) / 30;
            const segY = (pointer.current.y - control.target.y) / 30;
            if(pointerCounter.current === counter){
                control.target.add(new THREE.Vector3(segX, segY, 0));
                requestAnimationFrame(()=>{onPointerMove(event, counter, lastX, lastY, accelerate - 1)});
            }
        }


        let counter = 0;
        const clickAnimation = ()=>{
            counter++;
            if(mousedown.current){
                if(rotationAmount.current < 1){
                    rotationAmount.current += 0.003;
                    requestAnimationFrame(clickAnimation);
                }else{
                    requestAnimationFrame(clickAnimation);
                }
            }else{
                if(rotationAmount.current > 0.001){
                    rotationAmount.current -= 0.01;
                    requestAnimationFrame(clickAnimation);
                }else{
                    rotationAmount.current = 0.001;
                    changeColor();
                }
            }
            if(counter % 10 === 0){
                changeColor();
            }
        }

        const changeColor = ()=>{
            if(mousedown.current){
                for(let i = 0; i < points.current.length; i++){
                    const rand = Math.floor(Math.random() * 8);
                    (points.current[i].material as THREE.PointsMaterial).color = new THREE.Color(pointsColor.current[rand]);
                    if(i === 0){
                        const rand = Math.floor(Math.random() * 8);
                        (logo.current?.material as THREE.PointsMaterial).color = new THREE.Color(pointsColor.current[rand]);
                    }
                }
            }else{
                if(rotationAmount.current <= 0.001){
                    for(let i = 0; i < points.current.length; i++){
                        (points.current[i].material as THREE.PointsMaterial).color = new THREE.Color(pointsColor.current[i]);
                        if(i === 0){
                            (logo.current?.material as THREE.PointsMaterial).color = new THREE.Color(0x77aaff);
                        }
                    }
                }
            }
        }

        const onMouseDown = ()=>{
            mousedown.current = true;
            requestAnimationFrame(clickAnimation);
        }

        const onMouseUp = ()=>{
            mousedown.current = false;
            console.log(mousedown.current)
        }

        window.addEventListener("resize", onWindowResize, false);
        window.addEventListener( 'pointermove', triggerPointerMove );
        window.addEventListener('mousedown', onMouseDown);
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