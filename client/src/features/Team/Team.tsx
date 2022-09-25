import './Team.css'
import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const Team = () => {
    const GLTF = useRef<THREE.Group | undefined>();
    const stop = useRef<number>(0);
    const [ loading, setLoading ] = useState("loading")

    useEffect(()=>{
        const camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 1000 );
        const scene = new THREE.Scene();
        const renderer = new THREE.WebGLRenderer( );
        const control = new OrbitControls(camera, renderer.domElement);

        function init3D(){
            //camera
            camera.position.y = 0;
            camera.position.x = 3;
            camera.position.z = 3;
            control.target.set(0, 0, 3);
            
        
            //light
            const light = new THREE.HemisphereLight( 0x555555,  0x555555, 50 );
            light.position.set(0, 3, 0);
            light.lookAt(new THREE.Vector3(0, 3, 0));
            scene.add( light );
            
        
            //renderer
            renderer.setSize( window.innerWidth, window.innerHeight );
            renderer.setClearColor( 0x000000, 0.7);
            renderer.setPixelRatio(window.devicePixelRatio);
            document.querySelector(".team")!.appendChild( renderer.domElement );
            
            //control
            control.enabled = true;
            control.enableZoom = true;
            control.enableDamping = true;
            control.enablePan = false;
            control.dampingFactor = 0.2;
            control.minPolarAngle = Math.PI / 3;
            control.maxPolarAngle = Math.PI * 40 / 100;
        
            //3D model
            const loader = new GLTFLoader();
            loader.load("/v2.glb", function(gltf){
                GLTF.current = gltf.scene;
                scene.add( gltf.scene );
            },
            function ( xhr ) {
                if(xhr.loaded > 31839480){
                    
                    setLoading("loaded");
                }
                // console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        
            },);
            
        }
        
        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
        
            renderer.setSize(window.innerWidth, window.innerHeight);
        }
        function animation(time:number){
            renderer.render( scene, camera );
            control.update();
        
           
        
            if(stop.current === 1){
                return;
            }else{
                requestAnimationFrame(animation);
            }
        }

        init3D();
        window.addEventListener("resize", onWindowResize, false);
        requestAnimationFrame(animation);
        stop.current = 0;

        return ()=>{
            stop.current = 1;
            while(scene.children.length > 0){ 
                scene.remove(scene.children[0]); 
            }
        }
    }, []);

    

    return (
        <>
            <div className={loading}>
                Loading...
            </div>
            <div className='team'>
            </div>
        </>
    )
}

export default Team