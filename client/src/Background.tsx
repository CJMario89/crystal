import React, {useState} from "react";
import * as THREE from 'three';
import { GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {RectAreaLightHelper} from "three/examples/jsm/helpers/RectAreaLightHelper.js";
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader';
import { cloneUniformsGroups } from 'three';


const camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 1000 );
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer( { alpha: true } );
const control = new OrbitControls(camera, renderer.domElement);
var GLTF: THREE.Group;

function init3D(){
    //camera
    camera.position.y = 10;
    camera.position.z = 30;

    //light
    const light = new THREE.HemisphereLight( 0x0000ff, 0x000000, 100 );
    light.position.set(0, 5, 0);
    light.lookAt(new THREE.Vector3(0, 0, 0));
    scene.add( light );
    

    //renderer
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setClearColor( 0x000000, 0);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild( renderer.domElement );
    
    //control
    control.enabled = true;
    

    //3D model
    const loader = new GLTFLoader();
    loader.load("/crypstalLogo.glb", function(gltf){
        GLTF = gltf.scene;
        const pmremGenerator = new THREE.PMREMGenerator(renderer);
        pmremGenerator.compileEquirectangularShader();
    
        // new EXRLoader().load("/adams_place_bridge_2k.exr", function(texture){
        //     var cubeMap = pmremGenerator.fromEquirectangular(texture);
        //     var newEnvMap = cubeMap.texture;
        new THREE.TextureLoader().load("crypstal-texture.jpg", function(texture){
            var cubeMap = pmremGenerator.fromEquirectangular(texture);
            const newEnvMap = cubeMap.texture;
    
            gltf.scene.traverse(function(child){
                for(var i = 0; i < child.children.length; i++){
                    ((child.children[i] as THREE.Mesh).material as THREE.MeshStandardMaterial).envMap = newEnvMap;
                    ((child.children[i] as THREE.Mesh).material as THREE.MeshStandardMaterial).envMapIntensity = 3;
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

function animation(){
    renderer.render( scene, camera );
    control.update();
    requestAnimationFrame(animation);

    if(GLTF != undefined){
        GLTF.rotation.y += 0.002;
    }
}

init3D();
window.addEventListener("resize", onWindowResize, false);
animation();

function Background(){

    return(
        <></>
    );
}

export default Background;