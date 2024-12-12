'use client'
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeDScene = () => {
  const containerRef = useRef(null);
  let head, camera, renderer;

  useEffect(() => {
    const scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, 1, 0.1, 100);
    renderer = new THREE.WebGLRenderer({ alpha: true });
    
    renderer.setSize(100, 100);
    containerRef.current.appendChild(renderer.domElement);
  
    createHead(scene);
    createEyes(scene);
    createHat(scene);
    setupCamera();
  
    const isMobile = window.innerWidth < 768; // Verifica se é mobile
  
    const handleOrientation = (event) => {
      const beta = event.beta; // Tilt para cima/baixo
      const gamma = event.gamma; // Tilt para os lados
      head.rotation.x = (beta / 180) * Math.PI / 2; // Ajuste conforme necessário
      head.rotation.y = (gamma / 360) * Math.PI / 2; // Ajuste conforme necessário
    };
  
    if (isMobile) {
      window.addEventListener('deviceorientation', handleOrientation);
    } else {
      document.onmousemove = onMouseMove;
    }
  
    const animate = () => {
      requestAnimationFrame(animate);
      if (!isMobile) {
        const centerX = window.innerWidth;
        const centerY = window.innerHeight / 2;
        head.rotation.y = ((mouseX - centerX) / centerX) * Math.PI / 4;
        head.rotation.x = ((mouseY - centerY) / centerY) * Math.PI / 4;
      }
      renderer.render(scene, camera);
    };
  
    animate();
  
    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);
  

  const setupCamera = () => {
    camera.position.z = 2;
  };

  let mouseX = 50, mouseY = 50;

  const onMouseMove = (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
  };
  
  const createHead = (scene) => {
    const geometry = new THREE.SphereGeometry(0.6, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0x000000 });
    head = new THREE.Mesh(geometry, material);
    scene.add(head);
  };
  
  const createEyes = (scene) => {
    for (let i = -1; i <= 1; i += 2) {
      const eyeGeometry = new THREE.SphereGeometry(0.15, 32, 32);
      const eyeMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const eye = new THREE.Mesh(eyeGeometry, eyeMaterial);
      eye.position.set(i * 0.25, 0.2, 0.4);
      head.add(eye);
    }
  };
  const createHat = (scene) => {
    // Criar a base do chapéu (círculo)
    const baseGeometry = new THREE.CylinderGeometry(0.8, 0.8, 0.1, 32);
    const baseMaterial = new THREE.MeshBasicMaterial({ color: 0x393939 });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = 0.55; // Levanta a base um pouco acima da cabeça
    scene.add(base);
  
    // Criar a elevação do chapéu (cilindro)
    const crownGeometry = new THREE.CylinderGeometry(0.5, 0.7, 0.3, 32);
    const crownMaterial = new THREE.MeshBasicMaterial({ color: 0x393939 });
    const crown = new THREE.Mesh(crownGeometry, crownMaterial);
    crown.position.y = 0.85; // Levanta a coroa um pouco acima da base
    scene.add(crown);
  
    // Criar a faixa vermelha
    const bandGeometry = new THREE.CylinderGeometry(0.9, 0.0, 0.15, 8);
    const bandMaterial = new THREE.MeshBasicMaterial({ color: 0xff000f });
    const band = new THREE.Mesh(bandGeometry, bandMaterial);
    band.position.y = 0.55; // Posiciona a faixa ao redor da coroa
    scene.add(band);
  };
  
  return <div ref={containerRef} />;
};


export default ThreeDScene;
