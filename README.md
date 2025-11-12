# Winter City - 3D Interactive Narrative

An immersive 3D visual storytelling experience built with React, Three.js, and GSAP. Experience a narrative told entirely through environmental changes, lighting, and motion - no text required.

## 🌐 View Live Demo

Once deployed, your site will be available at:
**https://sliu44artcenter.github.io/StoryInteract2/**

### Quick Deployment to GitHub Pages

This project includes automatic GitHub Pages deployment via GitHub Actions:

1. **Merge to main branch**: Create a pull request and merge your changes to the `main` branch
2. **Enable GitHub Pages**:
   - Go to your repository settings on GitHub
   - Navigate to **Settings → Pages**
   - Under "Build and deployment", select:
     - **Source**: GitHub Actions
3. **Automatic deployment**: The site will automatically build and deploy when you push to `main`

The GitHub Actions workflow (`.github/workflows/deploy.yml`) handles the build and deployment automatically.

## 🎭 Story

A scholar has become the top-ranking official (状元) and must decide how to build homes for citizens in a winter mountain city. The fate of the city depends on this crucial choice.

## 🎮 Three Paths, Three Fates

### 🪨 Stone House (Good Ending)
Build with stone - strong and enduring. Watch as a fierce blizzard descends, but the stone houses stand firm. Warm lights glow from windows as golden rays break through the storm clouds, symbolizing stability and hope.

**Visual Elements:** Blizzard, intact structures, golden divine light, warmth through adversity

### 🌲 Wood House (Bad Ending 1)
Build with wood - warm but flammable. Night falls peacefully, but flickering lights turn to flames. Watch the fire spread through the village, reducing wooden homes to charred ruins under a red-black sky.

**Visual Elements:** Fire particles, smoke, burning transformation, destruction through warmth

### 🌾 Straw House (Bad Ending 2)
Build with straw - simple but fragile. A gentle snowfall becomes a violent storm. Watch houses tilt, sway, and collapse into scattered debris as the blizzard intensifies.

**Visual Elements:** Intense snowstorm, wind forces, structural collapse, cold devastation

## 🎨 Features

- **Pure Visual Storytelling** - No text, UI, or dialogue. The story unfolds through color, light, and motion
- **Cinematic Camera** - Dynamic camera movements that enhance the emotional impact
- **Particle Systems** - Snow, fire, and smoke effects create atmospheric immersion
- **GSAP Animations** - Smooth, sequenced transformations that guide the narrative
- **Interactive 3D Environment** - Click glowing symbols to choose your path
- **WebGL Optimized** - Runs smoothly in modern browsers

## 🛠️ Technical Stack

- **React** - Component architecture
- **Three.js** - 3D rendering engine
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for R3F
- **GSAP** - Professional animation sequencing
- **Vite** - Fast build tool and dev server

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Deployment

Deployment to GitHub Pages is handled automatically by GitHub Actions when you merge to the `main` branch. No manual deployment commands needed!

If you need to deploy elsewhere, simply build the project:
```bash
npm run build
```

The production-ready files will be in the `dist/` folder.

## 📁 Project Structure

```
src/
├── App.jsx                    # Main application component
├── main.jsx                   # Application entry point
├── components/
│   ├── Scene.jsx              # Main 3D scene with terrain and lighting
│   ├── Scholar.jsx            # The central character figure
│   ├── ChoiceIcons.jsx        # Interactive glowing choice symbols
│   └── Environment.jsx        # Particle systems (snow, fire, smoke)
└── utils/
    └── animations.js          # GSAP timeline animations for all endings
```

## 🎯 Interaction Flow

1. **Opening Scene**: Snowy mountain environment with a scholar figure surrounded by three glowing choice symbols
2. **Make a Choice**: Click on one of the three symbols (stone, wood, or straw)
3. **Visual Transformation**: Watch as the scene evolves through a cinematic sequence
4. **Ending State**: Experience the final outcome of your choice

## 🎨 Visual Design Philosophy

The experience prioritizes **environmental storytelling** through:

- **Color Palettes**: Gold & gray (prosperity), red & black (destruction), blue & white (desolation)
- **Lighting Dynamics**: Brightness for hope, darkness for danger, warm for life, cold for loss
- **Motion Language**: Smooth for peace, violent for disaster, gentle for transition
- **Particle Behavior**: Snow for atmosphere, fire for destruction, debris for collapse

## 🖥️ Browser Compatibility

Works best in modern browsers with WebGL support:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📝 License

MIT License - feel free to use this project for learning or creative purposes.

## 🙏 Acknowledgments

Built as an exploration of visual storytelling in 3D web experiences, demonstrating how narrative can be conveyed purely through environmental design and animation.

---

**Experience the story. Make your choice. Witness the consequences.**
