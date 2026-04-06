import { useState, useEffect, useRef, useCallback } from 'react'
import * as THREE from 'three'
import { Box } from '@chakra-ui/react'

function easeOutCirc(x) {
  return Math.sqrt(1 - Math.pow(x - 1, 2))
}

const VoxelGeo = () => {
  const refContainer = useRef()
  const refRenderer = useRef()
  const refScene = useRef()
  const refCamera = useRef()
  const refFrame = useRef(0)
  const refParticles = useRef()
  const refGeo = useRef()
  const refEdges = useRef()

  const handleWindowResize = useCallback(() => {
    const container = refContainer.current
    const renderer = refRenderer.current
    const camera = refCamera.current
    if (container && renderer && camera) {
      const w = container.clientWidth
      const h = container.clientHeight
      renderer.setSize(w, h)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
  }, [])

  useEffect(() => {
    const container = refContainer.current
    if (!container) return

    const w = container.clientWidth
    const h = container.clientHeight

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(w, h)
    container.appendChild(renderer.domElement)
    refRenderer.current = renderer

    // Scene
    const scene = new THREE.Scene()
    refScene.current = scene

    // Camera
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000)
    camera.position.set(0, 0, 5)
    refCamera.current = camera

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3)
    scene.add(ambientLight)

    const pointLight = new THREE.PointLight(0xff63c3, 1.5, 100)
    pointLight.position.set(5, 5, 5)
    scene.add(pointLight)

    const pointLight2 = new THREE.PointLight(0x3d7aed, 1.2, 100)
    pointLight2.position.set(-5, -3, 3)
    scene.add(pointLight2)

    // Main geometry - Icosahedron wireframe
    const icoGeo = new THREE.IcosahedronGeometry(1.2, 1)
    const edgesGeo = new THREE.EdgesGeometry(icoGeo)
    const edgesMat = new THREE.LineBasicMaterial({
      color: 0xff63c3,
      transparent: true,
      opacity: 0.6
    })
    const edges = new THREE.LineSegments(edgesGeo, edgesMat)
    scene.add(edges)
    refEdges.current = edges

    // Inner solid with glow
    const innerMat = new THREE.MeshPhongMaterial({
      color: 0x3d7aed,
      transparent: true,
      opacity: 0.08,
      wireframe: false
    })
    const innerMesh = new THREE.Mesh(icoGeo, innerMat)
    scene.add(innerMesh)
    refGeo.current = innerMesh

    // Floating particles
    const particlesCount = 120
    const particlesGeo = new THREE.BufferGeometry()
    const positions = new Float32Array(particlesCount * 3)
    for (let i = 0; i < particlesCount; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 1.8 + Math.random() * 1.5
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)
    }
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const particlesMat = new THREE.PointsMaterial({
      color: 0xff63c3,
      size: 0.02,
      transparent: true,
      opacity: 0.8
    })
    const particles = new THREE.Points(particlesGeo, particlesMat)
    scene.add(particles)
    refParticles.current = particles

    // Connecting lines between nearby particles
    const linePositions = []
    for (let i = 0; i < particlesCount; i++) {
      for (let j = i + 1; j < particlesCount; j++) {
        const dx = positions[i * 3] - positions[j * 3]
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1]
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2]
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)
        if (dist < 0.8) {
          linePositions.push(
            positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
            positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
          )
        }
      }
    }
    const linesGeo = new THREE.BufferGeometry()
    linesGeo.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(linePositions, 3)
    )
    const linesMat = new THREE.LineBasicMaterial({
      color: 0x3d7aed,
      transparent: true,
      opacity: 0.15
    })
    const lines = new THREE.LineSegments(linesGeo, linesMat)
    scene.add(lines)

    // Animation
    let animationId
    const animate = () => {
      animationId = requestAnimationFrame(animate)
      refFrame.current += 1
      const frame = refFrame.current

      // Initial reveal animation
      if (frame < 100) {
        const p = easeOutCirc(frame / 100)
        camera.position.x = 5 * Math.sin(p * Math.PI * 0.5) * 0.3
        camera.position.z = 5 * Math.cos(p * Math.PI * 0.5)
        camera.lookAt(0, 0, 0)
      }

      // Continuous rotation
      const t = frame * 0.003
      edges.rotation.x = t * 0.5
      edges.rotation.y = t * 0.7
      innerMesh.rotation.x = t * 0.5
      innerMesh.rotation.y = t * 0.7
      particles.rotation.y = t * 0.2
      lines.rotation.y = t * 0.2

      // Subtle breathing effect
      const scale = 1 + Math.sin(frame * 0.01) * 0.03
      edges.scale.set(scale, scale, scale)
      innerMesh.scale.set(scale, scale, scale)

      renderer.render(scene, camera)
    }
    animate()

    window.addEventListener('resize', handleWindowResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleWindowResize)
      renderer.domElement.remove()
      renderer.dispose()
    }
  }, [handleWindowResize])

  return (
    <Box
      ref={refContainer}
      m="auto"
      w={[280, 480, 640]}
      h={[280, 480, 640]}
      position="relative"
    >
      {/* Three.js canvas renders here */}
    </Box>
  )
}

export default VoxelGeo
