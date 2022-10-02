import React, {useEffect, useRef} from "react";
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import "./css/Three.css"
import { TextureLoader } from "three";



function Three(){
    //GLTF
    const logo = useRef<THREE.Points | undefined>();
    const clouds = useRef<THREE.Mesh[]>([]);
    const points = useRef<THREE.Points[]>([]);
    const pointsPositionY = useRef<number[]>([]);
    const pointsPositionYFloat = useRef<number[]>([]);
    const pointsColor = useRef<THREE.ColorRepresentation[]>([]);

    //requestAnimationFrame
    const stop = useRef<number>(0);

    //Event Variable
    const pointer = useRef({x: 0, y: 0})
    const pointerCounter = useRef(0)
    const initWidth = useRef(window.innerWidth);
    const scaleSize = useRef(window.innerWidth / initWidth.current);
    const logoScaleSize = useRef(5);
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
            const light = new THREE.HemisphereLight( 0xff6666,  0xff6666, 3 );
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
        
          
            const crystalLoader = new GLTFLoader();
            crystalLoader.load('crystalsubd.glb', (gltf)=>{
                const positions = combineBuffer(gltf.scene, 'position');
                createMesh(positions, scene, logoScaleSize.current, 0, -100, -50, 0xccddff, 0.3);
            });
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

        const addParticles = () => {
            const planetLoader = new GLTFLoader();
            planetLoader.load('planet4.glb', (gltf)=>{
                const positions = combineBuffer(gltf.scene, 'position');
                createMesh(positions, scene, 3, -30, -40, -50, 0xffaa77, 0.2);//orange
                createMesh(positions, scene, 4, -45, -8, -50, 0xaaffcc, 0.2);//green
                createMesh(positions, scene, 3, 15, -15, -50, 0x099ccff, 0.2);//lblue
                createMesh(positions, scene, 3.5, 35, -10, -50, 0x88aaff, 0.2);//dblue
                createMesh(positions, scene, 3.5, -25, -15, -50, 0xffccff, 0.2);//dpink
                createMesh(positions, scene, 5.5, 50, -45, -50, 0xffffdd, 0.2);//lyellow
                createMesh(positions, scene, 5.5, -65, -35, -50, 0xffffaa, 0.2);//yellow
                createMesh(positions, scene, 2.5, 60, -20, -50, 0xffddff, 0.2);//lpink
            })
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


        let clock = new THREE.Clock();
        let delta = 0;
        function animation(time:number){
            delta = clock.getDelta();
            renderer.render(scene, camera);
            control.update();
            onWindowResize();
        
            if(logo.current !== undefined){
                logo.current.rotation.y -= rotationAmount.current;
                logo.current.position.y = Math.sin(time / 2000) - 50;
            }

            for(let i = 0; i < points.current.length; i++){
                points.current[i].rotation.y += rotationAmount.current;
                points.current[i].position.y = Math.sin(time / 2000 * pointsPositionYFloat.current[i]) + pointsPositionY.current[i];
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
        addParticles();
        addSmoke();

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
            
            pointer.current.x = (( event.clientX / window.innerWidth ) * 2 - 1) * 3;
            pointer.current.y = (- ( event.clientY / window.innerHeight ) * 2 + 1) * 5;
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
                            (logo.current?.material as THREE.PointsMaterial).color = new THREE.Color(0xccddff);
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
        }

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