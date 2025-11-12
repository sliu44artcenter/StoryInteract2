import gsap from 'gsap'
import * as THREE from 'three'

// Helper function to create houses
function createHouse(type, position) {
  const house = new THREE.Group()
  house.position.set(position.x, position.y, position.z)

  let wallMaterial, roofMaterial

  switch (type) {
    case 'stone':
      wallMaterial = new THREE.MeshStandardMaterial({
        color: '#7f8c8d',
        roughness: 0.9,
        metalness: 0.1
      })
      roofMaterial = new THREE.MeshStandardMaterial({
        color: '#34495e',
        roughness: 0.8
      })
      break

    case 'wood':
      wallMaterial = new THREE.MeshStandardMaterial({
        color: '#8b4513',
        roughness: 0.7,
        metalness: 0
      })
      roofMaterial = new THREE.MeshStandardMaterial({
        color: '#654321',
        roughness: 0.9
      })
      break

    case 'straw':
      wallMaterial = new THREE.MeshStandardMaterial({
        color: '#daa520',
        roughness: 1,
        metalness: 0,
        transparent: true,
        opacity: 0.9
      })
      roofMaterial = new THREE.MeshStandardMaterial({
        color: '#b8860b',
        roughness: 1
      })
      break
  }

  // Walls
  const walls = new THREE.Mesh(
    new THREE.BoxGeometry(2, 2, 2),
    wallMaterial
  )
  walls.castShadow = true
  walls.receiveShadow = true
  walls.position.y = 1
  house.add(walls)

  // Roof
  const roof = new THREE.Mesh(
    new THREE.ConeGeometry(1.6, 1.2, 4),
    roofMaterial
  )
  roof.castShadow = true
  roof.rotation.y = Math.PI / 4
  roof.position.y = 2.6
  house.add(roof)

  // Window (warm light)
  const window1 = new THREE.Mesh(
    new THREE.BoxGeometry(0.4, 0.4, 0.1),
    new THREE.MeshStandardMaterial({
      color: '#ffd700',
      emissive: '#ffa500',
      emissiveIntensity: 0.5
    })
  )
  window1.position.set(0.6, 1.2, 1.01)
  house.add(window1)

  const window2 = window1.clone()
  window2.position.set(-0.6, 1.2, 1.01)
  house.add(window2)

  // Store references for animations
  house.userData = {
    walls,
    roof,
    windows: [window1, window2],
    type
  }

  return house
}

// Generate houses in a pattern around the center
function generateHouses(type, count = 15) {
  const houses = []
  const radius = 8
  const rings = 3

  for (let ring = 0; ring < rings; ring++) {
    const housesInRing = Math.floor(count / rings)
    const ringRadius = radius + ring * 5

    for (let i = 0; i < housesInRing; i++) {
      const angle = (i / housesInRing) * Math.PI * 2
      const x = Math.cos(angle) * ringRadius
      const z = Math.sin(angle) * ringRadius
      const y = 0

      const house = createHouse(type, { x, y, z })
      house.scale.set(0, 0, 0) // Start invisible for animation
      houses.push(house)
    }
  }

  return houses
}

// STONE ENDING - Good Ending
export function playStoneEnding(refs) {
  const { scene, camera, lighting, environment, setHouses } = refs
  const timeline = gsap.timeline()

  // Generate stone houses
  const houses = generateHouses('stone', 15)
  houses.forEach(house => scene.add(house))
  setHouses(houses)

  // Phase 1: Houses appear (0-3s)
  timeline.to(houses.map(h => h.scale), {
    x: 1,
    y: 1,
    z: 1,
    duration: 0.5,
    stagger: 0.15,
    ease: 'back.out(1.7)'
  }, 0)

  // Phase 2: Sky darkens, blizzard begins (3-6s)
  timeline.to(scene.background, {
    r: 0.2,
    g: 0.25,
    b: 0.3,
    duration: 3,
    ease: 'power2.inOut'
  }, 3)

  if (lighting.ambient?.current) {
    timeline.to(lighting.ambient.current, {
      intensity: 0.2,
      duration: 3
    }, 3)
  }

  if (lighting.directional?.current) {
    timeline.to(lighting.directional.current, {
      intensity: 0.3,
      duration: 3
    }, 3)
  }

  // Phase 3: Storm intensifies, houses remain strong (6-9s)
  timeline.to(camera.position, {
    x: 15,
    y: 12,
    z: 15,
    duration: 4,
    ease: 'power1.inOut'
  }, 6)

  // Make windows glow brighter during storm
  houses.forEach(house => {
    const windows = house.userData.windows
    windows.forEach(window => {
      timeline.to(window.material, {
        emissiveIntensity: 1.5,
        duration: 2
      }, 6)
    })
  })

  // Phase 4: Golden light breaks through (9-12s)
  const goldenLight = new THREE.PointLight('#ffd700', 0, 50)
  goldenLight.position.set(0, 30, 0)
  scene.add(goldenLight)

  timeline.to(goldenLight, {
    intensity: 2,
    duration: 3,
    ease: 'power2.out'
  }, 9)

  timeline.to(scene.background, {
    r: 0.4,
    g: 0.45,
    b: 0.5,
    duration: 3
  }, 9)

  if (lighting.ambient?.current) {
    timeline.to(lighting.ambient.current, {
      intensity: 0.5,
      duration: 3
    }, 9)
  }

  // Phase 5: Final peaceful state (12-15s)
  timeline.to(camera.position, {
    x: 0,
    y: 20,
    z: 30,
    duration: 3,
    ease: 'power2.inOut'
  }, 12)

  return timeline
}

// WOOD ENDING - Fire Destruction
export function playWoodEnding(refs) {
  const { scene, camera, lighting, environment, setHouses } = refs
  const timeline = gsap.timeline()

  // Generate wooden houses
  const houses = generateHouses('wood', 15)
  houses.forEach(house => scene.add(house))
  setHouses(houses)

  // Phase 1: Houses appear (0-3s)
  timeline.to(houses.map(h => h.scale), {
    x: 1,
    y: 1,
    z: 1,
    duration: 0.5,
    stagger: 0.15,
    ease: 'back.out(1.7)'
  }, 0)

  // Phase 2: Night falls (3-5s)
  timeline.to(scene.background, {
    r: 0.05,
    g: 0.05,
    b: 0.1,
    duration: 2,
    ease: 'power2.inOut'
  }, 3)

  if (lighting.ambient?.current) {
    timeline.to(lighting.ambient.current, {
      intensity: 0.1,
      duration: 2
    }, 3)
  }

  if (lighting.directional?.current) {
    timeline.to(lighting.directional.current, {
      intensity: 0.1,
      duration: 2
    }, 3)
  }

  // Phase 3: Fire starts flickering (5-7s)
  houses.forEach((house, index) => {
    const windows = house.userData.windows
    windows.forEach(window => {
      timeline.to(window.material, {
        emissiveIntensity: 2,
        duration: 0.2,
        repeat: 5,
        yoyo: true
      }, 5 + index * 0.1)
    })
  })

  // Phase 4: Fire erupts (7-10s)
  const fireSources = houses.map(h => h.position)
  if (environment.current?.setFireSources) {
    environment.current.setFireSources(fireSources)
  }
  if (environment.current?.setSmokeSources) {
    environment.current.setSmokeSources(fireSources)
  }

  // Orange fire glow
  const fireLight = new THREE.PointLight('#ff4500', 0, 60)
  fireLight.position.set(0, 10, 0)
  scene.add(fireLight)

  timeline.to(fireLight, {
    intensity: 3,
    duration: 2,
    ease: 'power2.out'
  }, 7)

  timeline.to(scene.background, {
    r: 0.3,
    g: 0.05,
    b: 0.0,
    duration: 3
  }, 7)

  // Phase 5: Houses burn and char (10-14s)
  houses.forEach((house, index) => {
    const walls = house.userData.walls
    const roof = house.userData.roof

    timeline.to(walls.material.color, {
      r: 0.1,
      g: 0.05,
      b: 0.05,
      duration: 2
    }, 10 + index * 0.1)

    timeline.to(roof.material.color, {
      r: 0.05,
      g: 0.05,
      b: 0.05,
      duration: 2
    }, 10 + index * 0.1)

    // Houses collapse slightly
    timeline.to(house.rotation, {
      x: (Math.random() - 0.5) * 0.3,
      z: (Math.random() - 0.5) * 0.3,
      duration: 2
    }, 11 + index * 0.1)

    timeline.to(house.scale, {
      y: 0.7,
      duration: 2
    }, 11 + index * 0.1)
  })

  // Camera moves to show devastation
  timeline.to(camera.position, {
    x: 20,
    y: 15,
    z: 20,
    duration: 4,
    ease: 'power2.inOut'
  }, 10)

  return timeline
}

// STRAW ENDING - Wind Destruction
export function playStrawEnding(refs) {
  const { scene, camera, lighting, environment, setHouses } = refs
  const timeline = gsap.timeline()

  // Generate straw houses
  const houses = generateHouses('straw', 15)
  houses.forEach(house => scene.add(house))
  setHouses(houses)

  // Phase 1: Houses appear (0-3s)
  timeline.to(houses.map(h => h.scale), {
    x: 1,
    y: 1,
    z: 1,
    duration: 0.5,
    stagger: 0.15,
    ease: 'back.out(1.7)'
  }, 0)

  // Phase 2: Gentle snow begins (3-5s)
  timeline.to(camera.position, {
    x: 10,
    y: 10,
    z: 20,
    duration: 2
  }, 3)

  // Phase 3: Storm intensifies (5-8s)
  timeline.to(scene.background, {
    r: 0.7,
    g: 0.75,
    b: 0.8,
    duration: 3
  }, 5)

  if (lighting.ambient?.current) {
    timeline.to(lighting.ambient.current, {
      intensity: 0.8,
      duration: 3
    }, 5)
  }

  // Phase 4: Wind starts affecting houses (8-11s)
  houses.forEach((house, index) => {
    // Tilt and sway
    timeline.to(house.rotation, {
      x: Math.sin(index) * 0.4,
      z: Math.cos(index) * 0.4,
      duration: 1,
      ease: 'power2.inOut'
    }, 8 + index * 0.05)
  })

  // Phase 5: Houses collapse (11-15s)
  houses.forEach((house, index) => {
    const delay = 11 + index * 0.2

    // Dramatic tilt
    timeline.to(house.rotation, {
      x: (Math.random() - 0.5) * Math.PI * 0.5,
      z: (Math.random() - 0.5) * Math.PI * 0.5,
      duration: 0.8,
      ease: 'power2.in'
    }, delay)

    // Fall apart
    timeline.to(house.scale, {
      x: 0.3,
      y: 0.2,
      z: 0.3,
      duration: 1,
      ease: 'power3.in'
    }, delay + 0.5)

    timeline.to(house.position, {
      y: -0.5,
      duration: 1,
      ease: 'power2.in'
    }, delay + 0.5)

    // Fade out
    const materials = [
      house.userData.walls.material,
      house.userData.roof.material
    ]

    materials.forEach(mat => {
      timeline.to(mat, {
        opacity: 0.2,
        duration: 1
      }, delay + 0.8)
    })
  })

  // Create debris effect with scattered pieces
  const debrisGroup = new THREE.Group()
  houses.forEach((house, index) => {
    for (let i = 0; i < 5; i++) {
      const debris = new THREE.Mesh(
        new THREE.BoxGeometry(0.3, 0.1, 0.3),
        new THREE.MeshStandardMaterial({ color: '#b8860b' })
      )
      debris.position.copy(house.position)
      debris.position.x += (Math.random() - 0.5) * 3
      debris.position.z += (Math.random() - 0.5) * 3
      debris.scale.set(0, 0, 0)
      debrisGroup.add(debris)

      timeline.to(debris.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 0.3
      }, 11.5 + index * 0.2 + i * 0.05)
    }
  })
  scene.add(debrisGroup)

  // Phase 6: Blizzard peak, cold blue lighting (15-18s)
  timeline.to(scene.background, {
    r: 0.8,
    g: 0.85,
    b: 0.95,
    duration: 3
  }, 15)

  timeline.to(camera.position, {
    x: 0,
    y: 25,
    z: 35,
    duration: 3,
    ease: 'power2.out'
  }, 15)

  return timeline
}
