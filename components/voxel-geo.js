import { useState, useEffect, useRef, useCallback } from 'react'
import * as THREE from 'three'
import { loadGLTFModel } from '../lib/model'
import { GeoSpinner, GeoContainer } from './voxel-geo-loader'

const VoxelCat = () => {
  const refContainer = useRef()
  const [loading, setLoading] = useState(true)
  const refRenderer = useRef()

  const handleWindowResize = useCallback(() => {
    const container = refContainer.current
    const renderer = refRenderer.current
    if (container && renderer) {
      const w = container.clientWidth
      const h = container.clientHeight
      renderer.setSize(w, h)
    }
  }, [])

  useEffect(() => {
    const container = refContainer.current
    if (!container) return

    const scW = container.clientWidth
    const scH = container.clientHeight

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(scW, scH)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    container.appendChild(renderer.domElement)
    refRenderer.current = renderer

    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(30, scW / scH, 0.1, 1000)
    camera.position.set(0, 8, 14)
    camera.lookAt(0, 9, 0)

    scene.add(new THREE.AmbientLight(0xffffff, 1.5))
    const dirLight = new THREE.DirectionalLight(0xffffff, 2)
    dirLight.position.set(5, 8, 5)
    scene.add(dirLight)
    const rimLight = new THREE.DirectionalLight(0xff63c3, 0.8)
    rimLight.position.set(-5, 3, -5)
    scene.add(rimLight)

    let catObj = null
    let mixer = null
    const clock = new THREE.Clock()

    loadGLTFModel(scene, '/tuxedo_cat_animated_2.0/scene.gltf', {
      receiveShadow: false,
      castShadow: false
    }).then(obj => {
      catObj = obj

      // Scale bigger
      const box = new THREE.Box3().setFromObject(obj)
      const size = box.getSize(new THREE.Vector3())
      const maxDim = Math.max(size.x, size.y, size.z)
      obj.scale.setScalar(12.0 / maxDim)

      // Center and ground
      const newBox = new THREE.Box3().setFromObject(obj)
      const center = newBox.getCenter(new THREE.Vector3())
      obj.position.x -= center.x
      obj.position.z -= center.z
      obj.position.y -= newBox.min.y

      // Hide broken eye meshes (Blender bone constraints lost in GLTF export)
      obj.traverse(child => {
        if (child.isMesh && child.material && (
          child.material.name === 'Pupil' ||
          child.material.name === 'EyeColor' ||
          child.material.name === 'EyeHighlight'
        )) {
          child.visible = false
        }
      })

      // Play animation
      if (obj.animations && obj.animations.length > 0) {
        mixer = new THREE.AnimationMixer(obj)
        const src =
          obj.animations.find(c => c.name === 'IdleTailSwoosh') ||
          obj.animations.find(c => c.name === 'IdleNorm') ||
          obj.animations[0]
        if (src) mixer.clipAction(src).play()
      }

      setLoading(false)
    }).catch(err => {
      console.error('Failed to load cat:', err)
      setLoading(false)
    })

    let animationId
    const animate = () => {
      animationId = requestAnimationFrame(animate)
      if (catObj) catObj.rotation.y += 0.018
      if (mixer) mixer.update(clock.getDelta())
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
    <GeoContainer ref={refContainer}>
      {loading && <GeoSpinner />}
    </GeoContainer>
  )
}

export default VoxelCat
