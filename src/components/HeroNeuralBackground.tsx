import { useEffect, useRef } from 'react'

const MODEL_URL = '/models/high_poly_stylizezd_neuron_-_free_download.glb'

const neuronLayout = [
  {
    desktop: { position: [-3.55, 0.82, -0.16], scale: 0.56 },
    mobile: { position: [-1.36, 0.98, -0.2], scale: 0.36 },
    rotation: [-0.45, 0.76, -0.22],
    opacity: 0.96,
    drift: 0.2,
  },
  {
    desktop: { position: [3.38, 1.18, -0.18], scale: 0.44 },
    mobile: { position: [1.34, 1.1, -0.24], scale: 0.3 },
    rotation: [0.14, -1.05, 0.2],
    opacity: 0.86,
    drift: 1.7,
  },
  {
    desktop: { position: [2.95, -0.78, -0.24], scale: 0.48 },
    mobile: { position: [1.2, -0.88, -0.28], scale: 0.32 },
    rotation: [0.38, -0.44, 0.72],
    opacity: 0.82,
    drift: 3.2,
  },
  {
    desktop: { position: [-2.05, -1.56, -0.36], scale: 0.3 },
    mobile: { position: [-0.86, -1.22, -0.36], scale: 0.22 },
    rotation: [-0.16, 0.36, -0.84],
    opacity: 0.66,
    drift: 4.4,
  },
  {
    desktop: { position: [-2.55, 1.82, -0.62], scale: 0.22 },
    mobile: { position: [-0.92, 1.7, -0.58], scale: 0.16 },
    rotation: [0.6, 1.18, 0.12],
    opacity: 0.5,
    drift: 5.8,
  },
  {
    desktop: { position: [0.78, 1.82, -0.7], scale: 0.2 },
    mobile: { position: [0.38, 1.7, -0.62], scale: 0.14 },
    rotation: [0.18, -0.88, 0.44],
    opacity: 0.48,
    drift: 6.9,
  },
  {
    desktop: { position: [2.3, 1.8, -0.62], scale: 0.24 },
    mobile: { position: [0.94, 1.68, -0.58], scale: 0.16 },
    rotation: [-0.52, 0.32, -0.4],
    opacity: 0.52,
    drift: 8.1,
  },
  {
    desktop: { position: [-3.72, -1.0, -0.45], scale: 0.24 },
    mobile: { position: [-1.45, -0.58, -0.45], scale: 0.16 },
    rotation: [0.72, 0.18, 0.2],
    opacity: 0.42,
    drift: 9.4,
  },
  {
    desktop: { position: [3.74, -1.6, -0.46], scale: 0.28 },
    mobile: { position: [1.44, -1.28, -0.46], scale: 0.18 },
    rotation: [-0.32, -0.72, 0.58],
    opacity: 0.5,
    drift: 10.6,
  },
  {
    desktop: { position: [0.0, -1.72, -0.72], scale: 0.16 },
    mobile: { position: [0.08, -1.54, -0.62], scale: 0.12 },
    rotation: [0.48, 0.9, -0.16],
    opacity: 0.38,
    drift: 11.7,
  },
  {
    desktop: { position: [-0.72, 1.92, -0.78], scale: 0.14 },
    mobile: { position: [-0.36, 1.78, -0.7], scale: 0.1 },
    rotation: [-0.22, 0.54, 0.36],
    opacity: 0.32,
    drift: 12.9,
  },
  {
    desktop: { position: [1.35, -1.62, -0.78], scale: 0.14 },
    mobile: { position: [0.62, -1.48, -0.7], scale: 0.1 },
    rotation: [0.38, -0.64, -0.28],
    opacity: 0.34,
    drift: 14.2,
  },
  {
    desktop: { position: [-3.04, 1.86, -0.72], scale: 0.18 },
    mobile: { position: [-1.18, 1.72, -0.66], scale: 0.12 },
    rotation: [0.28, -1.12, 0.18],
    opacity: 0.38,
    drift: 15.4,
  },
  {
    desktop: { position: [3.06, 1.78, -0.74], scale: 0.17 },
    mobile: { position: [1.16, 1.62, -0.66], scale: 0.12 },
    rotation: [-0.62, 0.82, -0.22],
    opacity: 0.38,
    drift: 16.6,
  },
  {
    desktop: { position: [-3.62, 0.02, -0.64], scale: 0.22 },
    mobile: { position: [-1.38, 0.28, -0.58], scale: 0.14 },
    rotation: [0.12, 0.34, -0.5],
    opacity: 0.46,
    drift: 17.8,
  },
  {
    desktop: { position: [3.62, 0.18, -0.64], scale: 0.22 },
    mobile: { position: [1.38, 0.22, -0.58], scale: 0.14 },
    rotation: [0.5, -0.26, 0.36],
    opacity: 0.46,
    drift: 19,
  },
  {
    desktop: { position: [-1.32, -1.82, -0.78], scale: 0.13 },
    mobile: { position: [-0.48, -1.58, -0.68], scale: 0.09 },
    rotation: [-0.18, 1.26, 0.32],
    opacity: 0.32,
    drift: 20.2,
  },
  {
    desktop: { position: [2.08, -1.82, -0.78], scale: 0.14 },
    mobile: { position: [0.88, -1.58, -0.68], scale: 0.09 },
    rotation: [0.66, -0.18, -0.48],
    opacity: 0.34,
    drift: 21.4,
  },
]

export default function HeroNeuralBackground() {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let frameId = 0
    let isMounted = true
    let cleanup: (() => void) | null = null

    Promise.all([
      import('three'),
      import('three/examples/jsm/loaders/GLTFLoader'),
    ]).then(([THREE, { GLTFLoader }]) => {
      if (!isMounted) return

      type NeuronInstance = {
        group: import('three').Group
        basePosition: InstanceType<typeof THREE.Vector3>
        baseRotation: InstanceType<typeof THREE.Euler>
        scale: number
        opacity: number
        drift: number
      }

      const neurons: NeuronInstance[] = []

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100)
      camera.position.set(0, 0.1, 6.2)

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      })
      renderer.setClearAlpha(0)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8))
      container.appendChild(renderer.domElement)

      scene.add(new THREE.AmbientLight(0xffffff, 1.25))

      const keyLight = new THREE.DirectionalLight(0x78d8e8, 1.9)
      keyLight.position.set(3, 4, 5)
      scene.add(keyLight)

      const fillLight = new THREE.DirectionalLight(0x46a98c, 1.2)
      fillLight.position.set(-4, -1, 3)
      scene.add(fillLight)

      const tintMaterial = (material: import('three').Material, opacity: number) => {
        const cloned = material.clone()

        if ('color' in cloned && cloned.color instanceof THREE.Color) {
          cloned.color.lerp(new THREE.Color(0x74c7a7), 0.72)
        }

        if ('emissive' in cloned && cloned.emissive instanceof THREE.Color) {
          cloned.emissive.set(0xd8fff0)
        }

        if ('emissiveIntensity' in cloned) {
          cloned.emissiveIntensity = 0.18
        }

        cloned.transparent = true
        cloned.opacity = opacity
        cloned.depthWrite = false

        return cloned
      }

      const resize = () => {
        const { width, height } = container.getBoundingClientRect()
        renderer.setSize(width, height, false)
        camera.aspect = width / Math.max(height, 1)
        camera.updateProjectionMatrix()

        const isCompact = width < 760

        neurons.forEach((neuron, index) => {
          const layout = neuronLayout[index]
          const settings = isCompact ? layout.mobile : layout.desktop
          const [x, y, z] = settings.position

          neuron.scale = settings.scale
          neuron.basePosition.set(x, y, z)
          neuron.group.position.copy(neuron.basePosition)
          neuron.group.scale.setScalar(neuron.scale)
        })
      }

      new GLTFLoader().load(MODEL_URL, (gltf) => {
        if (!isMounted) return

        const source = gltf.scene
        const bounds = new THREE.Box3().setFromObject(source)
        const center = bounds.getCenter(new THREE.Vector3())
        const size = bounds.getSize(new THREE.Vector3())
        const maxAxis = Math.max(size.x, size.y, size.z) || 1

        source.position.sub(center)
        source.scale.setScalar(1 / maxAxis)
        source.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = false
            child.receiveShadow = false
          }
        })

        neuronLayout.forEach((layout) => {
          const model = source.clone(true)
          const group = new THREE.Group()
          group.add(model)
          const [rx, ry, rz] = layout.rotation
          group.rotation.set(rx, ry, rz)

          model.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              if (Array.isArray(child.material)) {
                child.material = child.material.map((item) => tintMaterial(item, layout.opacity))
              } else {
                child.material = tintMaterial(child.material, layout.opacity)
              }
            }
          })

          const instance = {
            group,
            basePosition: new THREE.Vector3(),
            baseRotation: group.rotation.clone(),
            scale: layout.desktop.scale,
            opacity: layout.opacity,
            drift: layout.drift,
          }

          neurons.push(instance)
          scene.add(group)
        })

        resize()
      })

      const animate = (time: number) => {
        frameId = window.requestAnimationFrame(animate)

        const t = time * 0.001

        neurons.forEach((neuron) => {
          neuron.group.rotation.y = neuron.baseRotation.y + Math.sin(t * 0.18 + neuron.drift) * 0.12
          neuron.group.rotation.x = neuron.baseRotation.x + Math.sin(t * 0.24 + neuron.drift) * 0.04
          neuron.group.position.x = neuron.basePosition.x + Math.sin(t * 0.16 + neuron.drift) * 0.04
          neuron.group.position.y = neuron.basePosition.y + Math.sin(t * 0.32 + neuron.drift) * 0.06
        })

        renderer.render(scene, camera)
      }

      resize()
      window.addEventListener('resize', resize)
      frameId = window.requestAnimationFrame(animate)

      cleanup = () => {
        window.removeEventListener('resize', resize)
        window.cancelAnimationFrame(frameId)
        renderer.dispose()
        renderer.domElement.remove()
      }
    })

    return () => {
      isMounted = false
      cleanup?.()
    }
  }, [])

  return (
    <div className="hero-neuron-background" aria-hidden="true">
      <div ref={containerRef} className="hero-neuron-canvas" />
    </div>
  )
}
