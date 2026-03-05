---
name: remotion
description: >
  Create videos programmatically using React and Remotion. Use when the user wants to
  build video compositions, animate React components as video frames, add audio/captions,
  render to MP4/WebM/GIF, or scaffold a Remotion project. Triggers on requests involving
  "remotion", "programmatic video", "react video", "video from code", or creating/rendering
  videos with React components.
---

# Remotion Video Creation

Remotion turns React components into real videos. A video is a function of time: your component receives a frame number and renders visuals for that frame.

## Quick Start

Scaffold a new project:

```bash
npx create-video@latest
```

Start the development Studio:

```bash
npm run dev
```

## Project Structure

```
my-video/
├── src/
│   ├── Root.tsx              # Register compositions here
│   ├── Composition.tsx       # Your video component
│   └── ...
├── public/                   # Static assets (images, fonts, audio)
├── remotion.config.ts        # Remotion configuration
└── package.json
```

## Core Concepts

### Composition

A `<Composition>` registers a video with its metadata. Define all compositions in `Root.tsx`:

```tsx
import {Composition} from 'remotion';
import {MyVideo} from './MyVideo';

export const RemotionRoot = () => {
  return (
    <Composition
      id="MyVideo"
      component={MyVideo}
      durationInFrames={150}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
```

Four required properties: `width`, `height`, `fps`, `durationInFrames`.

Use `<Still>` instead of `<Composition>` for single-frame image output (no fps/duration needed).

### Frames

Frames are 0-indexed. A 5-second video at 30fps has frames 0 through 149.

### useCurrentFrame()

Returns the current frame number. Inside a `<Sequence>`, returns the frame relative to that sequence's start.

```tsx
import {useCurrentFrame} from 'remotion';

const MyComponent = () => {
  const frame = useCurrentFrame();
  return <div>Frame: {frame}</div>;
};
```

### useVideoConfig()

Returns `{fps, durationInFrames, width, height}` for the current composition.

```tsx
import {useVideoConfig} from 'remotion';

const MyComponent = () => {
  const {fps, durationInFrames, width, height} = useVideoConfig();
  // ...
};
```

## Animation

### interpolate()

Maps a value from one range to another. The core animation primitive.

```tsx
import {useCurrentFrame, interpolate} from 'remotion';

const MyComponent = () => {
  const frame = useCurrentFrame();

  // Fade in over first 30 frames
  const opacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // Slide in from left
  const translateX = interpolate(frame, [0, 30], [-100, 0], {
    extrapolateRight: 'clamp',
  });

  return (
    <div style={{opacity, transform: `translateX(${translateX}px)`}}>
      Hello
    </div>
  );
};
```

**Options:**
- `extrapolateLeft` / `extrapolateRight`: `'extend'` (default), `'clamp'`, `'wrap'`, `'identity'`
- `easing`: An easing function from the `Easing` module

Use `'clamp'` almost always to prevent values exceeding your output range.

### spring()

Physics-based animation for natural-feeling motion.

```tsx
import {useCurrentFrame, useVideoConfig, spring} from 'remotion';

const MyComponent = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const scale = spring({
    frame,
    fps,
    config: {damping: 10, stiffness: 100, mass: 1},
  });

  return <div style={{transform: `scale(${scale})`}}>Pop in!</div>;
};
```

**Parameters:** `frame`, `fps`, `from?` (default 0), `to?` (default 1), `reverse?`, `delay?`, `durationInFrames?`

**Config:** `mass`, `damping`, `stiffness`, `overshootClamping`

### interpolateColors()

Transition between colors:

```tsx
import {interpolateColors, useCurrentFrame} from 'remotion';

const color = interpolateColors(frame, [0, 50], ['#ff0000', '#0000ff']);
```

For detailed animation APIs (Easing, transitions, motion blur, SVG paths), see `references/animation.md`.

## Layout Components

### AbsoluteFill

Full-size absolutely positioned container. The standard wrapper for video content:

```tsx
import {AbsoluteFill} from 'remotion';

const MyVideo = () => (
  <AbsoluteFill style={{backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'}}>
    <h1>Hello World</h1>
  </AbsoluteFill>
);
```

### Sequence

Time-shift content to appear at a specific frame:

```tsx
import {Sequence, AbsoluteFill} from 'remotion';

const MyVideo = () => (
  <AbsoluteFill>
    <Sequence from={0} durationInFrames={60}>
      <Title />
    </Sequence>
    <Sequence from={60} durationInFrames={90}>
      <Subtitle />
    </Sequence>
  </AbsoluteFill>
);
```

Components inside a `<Sequence>` receive frame numbers relative to the sequence start. Props: `from?`, `durationInFrames?`, `layout?` (`"absolute-fill"` | `"none"`), `name?`.

### Series

Sequential playback without manual frame math:

```tsx
import {Series} from 'remotion';

const MyVideo = () => (
  <Series>
    <Series.Sequence durationInFrames={60}>
      <Intro />
    </Series.Sequence>
    <Series.Sequence durationInFrames={90}>
      <MainContent />
    </Series.Sequence>
    <Series.Sequence durationInFrames={60}>
      <Outro />
    </Series.Sequence>
  </Series>
);
```

Use `offset` on `<Series.Sequence>` for overlaps (negative) or gaps (positive).

### Other Components

- `<Loop durationInFrames={30}>` -- repeat content
- `<Freeze frame={0}>` -- freeze at a specific frame
- `<Folder name="Group">` -- organize compositions in the Studio sidebar

## Async Data Loading

Use `delayRender()` / `continueRender()` to pause rendering while loading data:

```tsx
import {useCallback, useEffect, useState} from 'react';
import {continueRender, delayRender} from 'remotion';

const DataDrivenVideo = () => {
  const [data, setData] = useState(null);
  const [handle] = useState(() => delayRender('Loading API data'));

  useEffect(() => {
    fetch('https://api.example.com/data')
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        continueRender(handle);
      })
      .catch((err) => cancelRender(err));
  }, [handle]);

  if (!data) return null;
  return <div>{JSON.stringify(data)}</div>;
};
```

Must call `continueRender()` within 30 seconds or the render times out.

## Static Assets

Place files in `public/` and reference with `staticFile()`:

```tsx
import {Img, staticFile} from 'remotion';

const MyComponent = () => (
  <Img src={staticFile('logo.png')} />
);
```

Use `<Img>` instead of `<img>` -- it waits for the image to load before rendering the frame.

Similarly, use `<OffthreadVideo>` for video files and `<Html5Audio>` for audio. See `references/media-and-captions.md`.

## Input Props

Parameterize compositions with input props for dynamic/personalized videos:

```tsx
// In Root.tsx
<Composition
  id="MyVideo"
  component={MyVideo}
  durationInFrames={150}
  fps={30}
  width={1920}
  height={1080}
  defaultProps={{
    title: 'Hello World',
    color: '#ff0000',
  }}
/>

// In MyVideo.tsx
const MyVideo = ({title, color}: {title: string; color: string}) => (
  <AbsoluteFill style={{backgroundColor: color}}>
    <h1>{title}</h1>
  </AbsoluteFill>
);
```

Override at render time: `npx remotion render MyVideo --props='{"title":"Custom"}'`

## Rendering

Render to MP4:

```bash
npx remotion render MyVideo out/video.mp4
```

Common flags:
- `--codec=h264` (default), `h265`, `vp8`, `vp9`, `prores`
- `--image-format=jpeg` or `png`
- `--quality=80` (JPEG quality 0-100)
- `--scale=2` (resolution multiplier)
- `--frames=0-59` (render specific frame range)
- `--concurrency=4` (parallel rendering threads)

Render audio only:

```bash
npx remotion render MyVideo out/audio.mp3 --codec=mp3
```

Render a still image:

```bash
npx remotion still MyStill out/image.png
```

Render a GIF:

```bash
npx remotion render MyVideo out/animation.gif --codec=gif
```

For server-side rendering, Lambda/Cloud Run deployment, and the Node.js API, see `references/rendering.md`.

## Packages Reference

| Package | Purpose |
|---------|---------|
| `remotion` | Core: Composition, hooks, components |
| `@remotion/player` | Embed compositions in web apps |
| `@remotion/renderer` | Node.js/Bun rendering API |
| `@remotion/lambda` | Serverless rendering on AWS |
| `@remotion/cloudrun` | Rendering on Google Cloud Run |
| `@remotion/transitions` | Scene transitions (fade, slide, wipe, flip) |
| `@remotion/motion-blur` | Motion blur effects |
| `@remotion/three` | React Three Fiber integration for 3D |
| `@remotion/captions` | SRT parsing, TikTok-style captions |
| `@remotion/install-whisper-cpp` | Local speech-to-text via whisper.cpp |
| `@remotion/google-fonts` | Load Google Fonts |
| `@remotion/shapes` | Programmatic SVG shapes |
| `@remotion/paths` | SVG path manipulation and animation |
| `@remotion/noise` | 2D/3D/4D noise generation |
| `@remotion/media-utils` | Audio visualization and metadata |
| `@remotion/layout-utils` | Text measurement and fitting |
| `@remotion/lottie` | Lottie animation support |
| `@remotion/rive` | Rive animation support |
| `@remotion/skia` | React Native Skia graphics |

## Additional References

- **Advanced animation** (easing, transitions, motion blur, paths): `references/animation.md`
- **Media and captions** (audio, video, whisper, captions): `references/media-and-captions.md`
- **Rendering and deployment** (Node.js API, Lambda, Cloud Run): `references/rendering.md`
