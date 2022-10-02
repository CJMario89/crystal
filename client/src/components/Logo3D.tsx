import React, { useEffect, useRef } from "react";
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

const Logo3D = () => {
    //GLTF
    const logo = useRef<THREE.Group | undefined>();

    //requestAnimationFrame
    const stop = useRef<number>(0);

    //Event Variable
    const scaleSize = useRef(0);
    const rotationAmount = useRef(0.001);
    const mousedown = useRef(false);


    useEffect(()=>{
        const parentDom = document.querySelector(".logo3D");
        const titleMain = document.querySelector(".tm");
        if(!parentDom){
            return;
        }
        const camera = new THREE.PerspectiveCamera( 60, parentDom.clientWidth / parentDom.clientHeight, 0.1, 100 );
        const scene = new THREE.Scene();
        const renderer = new THREE.WebGLRenderer( { alpha: true, antialias: true } );
        const control = new OrbitControls(camera, renderer.domElement);
        const navbar = document.querySelector(".navbarContainer");
        

        function init3D(){
            //camera
            camera.position.y = 12;
            camera.position.z = 10;
            control.target.set(0, 0, 0);
            
        
            //light
            const light = new THREE.HemisphereLight( 0xff6666,  0xff6666, 35 );
            light.position.set(0, 3, 0);
            light.lookAt(new THREE.Vector3(0, 3, 0));
            scene.add( light );
            
        
            //renderer
            if(parentDom){
                scaleSize.current = parentDom.clientWidth / 150;
                renderer.setClearColor( 0x000000, 0);
                renderer.setPixelRatio(window.devicePixelRatio);
                renderer.setSize( parentDom.clientWidth, parentDom.clientHeight );
                camera.aspect = parentDom.clientWidth / parentDom.clientHeight;
                camera.updateProjectionMatrix();
            }
            
            //control
            control.enabled = false;
            control.enableRotate = false;
            control.enableZoom = false;
            control.enableDamping = true;
            control.dampingFactor = 0.2;
            control.minPolarAngle = Math.PI / 3;
            control.maxPolarAngle = Math.PI / 3;
        
            //3D model
            const logoLoader = new GLTFLoader();
            logoLoader.load("/crystalLogo.glb", function(gltf){
                logo.current = gltf.scene;
                logo.current.position.set(0, 0, 0);
                logo.current.rotation.y = 0;
                logo.current.scale.set(scaleSize.current, scaleSize.current, scaleSize.current);
                logo.current.traverse((child)=>{
                    if((child as THREE.Mesh).material !== undefined){
                        // ((child as THREE.Mesh).material as THREE.MeshPhysicalMaterial).color = new THREE.Color(0xff0000)
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
                    texture.dispose();

                    //load navbar
                    parentDom?.appendChild( renderer.domElement );
                    navbar?.classList.add("navbarOnload");
                    parentDom?.classList.add("logo3DOnload");
                })
            });
        }


        
        function animation(time:number){
            renderer.render( scene, camera );
            control.update();
            onWindowResize();
        
            if(logo.current !== undefined){
                logo.current.rotation.y -= rotationAmount.current;
                logo.current.position.y = Math.sin(time / 2000) - 2;
            }

            if(stop.current === 1){
                return;
            }else{
                requestAnimationFrame(animation);
            }
        }

        init3D();
        requestAnimationFrame(animation);

        function onWindowResize() {
            if(parentDom){
                if(scaleSize.current !== parentDom.clientWidth / 150){
                    camera.aspect = parentDom.clientWidth / parentDom.clientHeight;
                    camera.updateProjectionMatrix();
                    renderer.setSize(parentDom.clientWidth, parentDom.clientHeight);
                    scaleSize.current = parentDom.clientWidth / 150;
                    logo.current?.scale.set(scaleSize.current, scaleSize.current, scaleSize.current);
                }   
            }
        }
     
        const clickAnimation = ()=>{
            if(mousedown.current){
                if(rotationAmount.current < 1){
                    rotationAmount.current += 0.0005;
                    requestAnimationFrame(clickAnimation);
                }else{
                    requestAnimationFrame(clickAnimation);
                }
            }else{
                if(rotationAmount.current > 0.001){
                    rotationAmount.current -= 0.02;
                    requestAnimationFrame(clickAnimation);
                }else{
                    rotationAmount.current = 0.001;
                }
            }
        }

        const onMouseEnter = ()=>{
            mousedown.current = true;
            requestAnimationFrame(clickAnimation);
        }

        const onMouseleave = ()=>{
            mousedown.current = false;
        }

            // parentDom.addEventListener("resize", , false);
            titleMain?.addEventListener("mouseenter", onMouseEnter)
            titleMain?.addEventListener("mouseleave", onMouseleave)

        stop.current = 0;

        return ()=>{
            navbar?.classList.remove("navbarOnload");
            stop.current = 1;
            while(scene.children.length > 0){ 
                scene.remove(scene.children[0]); 
            }
        }
    }, []);
  return (
    <></>
  )
}

export default Logo3D