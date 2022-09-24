import React, {useEffect, useRef} from "react";
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import "./css/three.css"



function Three(){
    const camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 1000 );
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer( { alpha: true } );
    const control = new OrbitControls(camera, renderer.domElement);
    const GLTF = useRef<THREE.Group | undefined>();
    const stop = useRef<number>(0);

    function init3D(){
        //camera
        camera.position.y = 10;
        camera.position.z = 10;
        control.target.set(0, 0, 0);
        
    
        //light
        const light = new THREE.HemisphereLight( 0xff6666,  0xff6666, 35 );
        light.position.set(0, 3, 0);
        light.lookAt(new THREE.Vector3(0, 3, 0));
        scene.add( light );
        
    
        //renderer
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.setClearColor( 0x000000, 0);
        renderer.setPixelRatio(window.devicePixelRatio);
        document.querySelector(".three")!.appendChild( renderer.domElement );
        
        //control
        control.enabled = true;
        control.enableZoom = false;
        control.enableDamping = true;
        control.dampingFactor = 0.2;
        control.minPolarAngle = Math.PI / 3;
        control.maxPolarAngle = Math.PI / 3;
    
        //3D model
        const loader = new GLTFLoader();
        loader.load("/crypstalLogo.glb", function(gltf){
            GLTF.current = gltf.scene;
            GLTF.current.rotation.y = 0;
            const pmremGenerator = new THREE.PMREMGenerator(renderer);
            pmremGenerator.compileEquirectangularShader();
        
            new THREE.TextureLoader().load("crypstal-texture.svg", function(texture){
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
            }) 
        });
        
    }
    
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    
    function animation(time:number){
        renderer.render( scene, camera );
        control.update();
    
        if(GLTF.current !== undefined){
            GLTF.current.rotation.y -= 0.008;
            GLTF.current.position.y = Math.sin(time / 2000) - 2;
        }
    
        if(stop.current === 1){
            return;
        }else{
            requestAnimationFrame(animation);
        }
    }

    useEffect(()=>{
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
    
    return(
        <>
            <div className="three"></div>
            <div className="mask"></div>
        </>
    );
}

export default Three;