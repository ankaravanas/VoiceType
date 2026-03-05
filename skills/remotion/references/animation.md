# Advanced Animation

## Table of Contents

- [Easing Functions](#easing-functions)
- [Transitions](#transitions)
- [Motion Blur](#motion-blur)
- [SVG Path Animation](#svg-path-animation)
- [SVG Shapes](#svg-shapes)
- [Noise](#noise)
- [Animation Utils](#animation-utils)

## Easing Functions

Import from `remotion`:

```tsx
import {Easing, interpolate} from 'remotion';

const opacity = interpolate(frame, [0, 30], [0, 1], {
  easing: Easing.bezier(0.25, 0.1, 0.25, 1),
});
```

**Built-in easings:**
- `Easing.linear` -- constant rate
- `Easing.ease` -- gentle ease-in-out (CSS default)
- `Easing.in(fn)`, `Easing.out(fn)`, `Easing.inOut(fn)` -- directional wrappers
- `Easing.bezier(x1, y1, x2, y2)` -- cubic bezier curve
- `Easing.circle` -- circular curve
- `Easing.back(s?)` -- slight overshoot
- `Easing.elastic(bounciness?)` -- springy oscillation
- `Easing.bounce` -- bouncing ball effect
- `Easing.sin`, `Easing.quad`, `Easing.cubic`, `Easing.exp`, `Easing.poly(n)` -- polynomial curves

Common combinations:

```tsx
Easing.inOut(Easing.ease)     // Smooth in-out
Easing.out(Easing.cubic)      // Decelerate cubically
Easing.in(Easing.back(1.5))   // Overshoot entry
```

## Transitions

Install `@remotion/transitions` for scene-to-scene transitions.

### TransitionSeries

The core component. Replace `<Series>` when you need transitions between scenes:

```tsx
import {TransitionSeries, linearTiming} from '@remotion/transitions';
import {fade} from '@remotion/transitions/fade';

const MyVideo = () => (
  <TransitionSeries>
    <TransitionSeries.Sequence durationInFrames={60}>
      <SceneA />
    </TransitionSeries.Sequence>
    <TransitionSeries.Transition
      presentation={fade()}
      timing={linearTiming({durationInFrames: 30})}
    />
    <TransitionSeries.Sequence durationInFrames={60}>
      <SceneB />
    </TransitionSeries.Sequence>
  </TransitionSeries>
);
```

### Available Presentations

Import from `@remotion/transitions/<name>`:

| Presentation | Import | Description |
|-------------|--------|-------------|
| `fade()` | `@remotion/transitions/fade` | Cross-fade between scenes |
| `slide()` | `@remotion/transitions/slide` | Slide in from a direction |
| `wipe()` | `@remotion/transitions/wipe` | Wipe across the screen |
| `flip()` | `@remotion/transitions/flip` | 3D flip |
| `clockWipe()` | `@remotion/transitions/clock-wipe` | Clock-hand wipe |
| `none()` | `@remotion/transitions/none` | No visual transition (timing only) |

Directional presentations accept a `direction` option:

```tsx
import {slide} from '@remotion/transitions/slide';

slide({direction: 'from-left'})   // 'from-left', 'from-right', 'from-top', 'from-bottom'
```

### Timing

Two timing modes:

```tsx
import {linearTiming, springTiming} from '@remotion/transitions';

// Linear: fixed duration
linearTiming({durationInFrames: 30, easing: Easing.inOut(Easing.ease)})

// Spring: physics-based
springTiming({config: {damping: 10, stiffness: 100}})
```

## Motion Blur

Install `@remotion/motion-blur` for motion blur effects:

```tsx
import {Trail} from '@remotion/motion-blur';

const MyVideo = () => (
  <Trail layers={8} lagInFrames={0.5}>
    <MovingObject />
  </Trail>
);
```

- `<Trail>` -- afterimage/ghost trail effect
  - `layers`: number of ghost copies (more = smoother, heavier)
  - `lagInFrames`: how far back each layer trails
- `<CameraMotionBlur>` -- simulate camera shutter blur
  - `samples`: number of sub-frame samples
  - `shutterAngle`: 0-360, higher = more blur (180 is standard film)

## SVG Path Animation

Install `@remotion/paths` for SVG path manipulation:

```tsx
import {
  getLength,
  getPointAtLength,
  getSubpaths,
  interpolatePath,
  evolvePath,
} from '@remotion/paths';
```

**Key functions:**

- `getLength(path)` -- total length of an SVG path
- `getPointAtLength(path, length)` -- `{x, y}` coordinates at a given distance
- `getTangentAtLength(path, length)` -- angle of the path at a point
- `interpolatePath(progress, path1, path2)` -- morph between two paths (0 to 1)
- `evolvePath(progress, path)` -- animate drawing a path (0 = hidden, 1 = fully drawn)
- `getSubpaths(path)` -- split a multi-segment path into individual segments
- `scalePath(path, scaleX, scaleY)` -- resize a path
- `translatePath(path, x, y)` -- move a path
- `reversePath(path)` -- reverse drawing direction

**Draw-on animation example:**

```tsx
import {evolvePath} from '@remotion/paths';
import {useCurrentFrame} from 'remotion';

const DrawPath = () => {
  const frame = useCurrentFrame();
  const progress = Math.min(frame / 60, 1);
  const {strokeDasharray, strokeDashoffset} = evolvePath(progress, 'M 0 0 L 100 100');

  return (
    <svg viewBox="0 0 100 100">
      <path
        d="M 0 0 L 100 100"
        stroke="black"
        strokeWidth={2}
        fill="none"
        strokeDasharray={strokeDasharray}
        strokeDashoffset={strokeDashoffset}
      />
    </svg>
  );
};
```

## SVG Shapes

Install `@remotion/shapes` for programmatic SVG shapes:

```tsx
import {Circle, Rect, Triangle, Star, Polygon, Heart, Pie} from '@remotion/shapes';

// As React components
<Circle radius={50} fill="blue" />
<Star innerRadius={30} outerRadius={60} points={5} fill="gold" />
<Triangle length={100} direction="up" fill="green" />
<Heart width={100} fill="red" />

// Or get raw SVG path strings
import {makeCircle, makeStar, makeTriangle, makeHeart} from '@remotion/shapes';

const {path, width, height} = makeCircle({radius: 50});
```

Available shapes: `Circle`, `Rect`, `Triangle`, `Star`, `Polygon`, `Ellipse`, `Heart`, `Pie`.

Each has a `make*()` function returning `{path, width, height, transformOrigin, instructions}`.

## Noise

Install `@remotion/noise` for procedural noise:

```tsx
import {noise2D, noise3D, noise4D} from '@remotion/noise';

// noise2D(seed, x, y) => number between -1 and 1
const value = noise2D('my-seed', frame * 0.01, 0);

// noise3D(seed, x, y, z) -- add frame as z for animated noise
const animated = noise3D('seed', x * 0.01, y * 0.01, frame * 0.02);
```

Use for organic movement, particle effects, procedural textures, and terrain-like visuals.

## Animation Utils

Install `@remotion/animation-utils`:

```tsx
import {makeTransform, rotate, scale, translate} from '@remotion/animation-utils';

// Compose CSS transforms cleanly
const transform = makeTransform([
  translate(100, 50),
  rotate(45),
  scale(1.5),
]);

return <div style={{transform}}>Transformed</div>;
```

**Style interpolation:**

```tsx
import {interpolateStyles} from '@remotion/animation-utils';

const style = interpolateStyles(
  progress,
  [0, 1],
  [{opacity: 0, transform: 'scale(0.5)'}, {opacity: 1, transform: 'scale(1)'}]
);
```
