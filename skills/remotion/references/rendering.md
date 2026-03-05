# Rendering and Deployment

## Table of Contents

- [CLI Rendering](#cli-rendering)
- [Node.js / Bun API](#nodejs--bun-api)
- [Remotion Player](#remotion-player)
- [AWS Lambda](#aws-lambda)
- [Google Cloud Run](#google-cloud-run)
- [GitHub Actions](#github-actions)

## CLI Rendering

### Render video

```bash
npx remotion render <composition-id> [output-path]
```

If no composition ID is given, a picker is shown. If no output path is given, defaults to `out/<composition-id>.mp4`.

### Common flags

| Flag | Description | Default |
|------|-------------|---------|
| `--codec` | `h264`, `h265`, `vp8`, `vp9`, `prores`, `gif`, `mp3`, `aac`, `wav`, `flac` | `h264` |
| `--image-format` | `jpeg` or `png` (png required for transparency) | `jpeg` |
| `--quality` | JPEG quality 0-100 | 80 |
| `--scale` | Resolution multiplier (2 = 2x resolution) | 1 |
| `--frames` | Render specific range: `0-59`, `30-` | all |
| `--concurrency` | Parallel browser tabs for rendering | auto |
| `--props` | JSON string or path to JSON file for input props | -- |
| `--env-file` | Path to .env file | -- |
| `--log` | Log level: `verbose`, `info`, `warn`, `error` | `info` |
| `--muted` | Disable audio output | false |
| `--enforce-audio-track` | Ensure audio track even if silent | false |
| `--crf` | Constant rate factor (quality for h264/h265, lower = better) | codec-dependent |
| `--pixel-format` | `yuv420p`, `yuv422p`, `yuv444p`, `yuva420p` | `yuv420p` |
| `--every-nth-frame` | For GIFs: render every Nth frame (3 = ~10fps from 30fps) | 1 |
| `--number-of-gif-loops` | For GIFs: loop count (null = infinite) | null |

### Render audio only

```bash
npx remotion render MyVideo out/audio.mp3 --codec=mp3
```

Codecs: `mp3`, `aac`, `wav`, `flac`.

### Render a still image

```bash
npx remotion still <composition-id> [output-path]
```

Flags: `--image-format`, `--quality`, `--scale`, `--frame` (which frame to render, default 0).

### Render image sequence

```bash
npx remotion render MyVideo --sequence --image-format=png
```

Outputs individual frames as images.

### Render with custom props

```bash
# Inline JSON
npx remotion render MyVideo --props='{"title":"Hello","color":"blue"}'

# From file
npx remotion render MyVideo --props=./props.json
```

### Render transparent video

Use ProRes 4444 or VP8/VP9 with alpha:

```bash
npx remotion render MyVideo out/overlay.mov --codec=prores --prores-profile=4444 --image-format=png
```

Or WebM with transparency:

```bash
npx remotion render MyVideo out/overlay.webm --codec=vp8 --image-format=png
```

## Node.js / Bun API

Install `@remotion/renderer` and `@remotion/bundler` for programmatic rendering.

### Bundle the project

```tsx
import {bundle} from '@remotion/bundler';

const bundleLocation = await bundle({
  entryPoint: require.resolve('./src/index.ts'),
  // Optional Webpack overrides:
  webpackOverride: (config) => config,
});
```

### List compositions

```tsx
import {getCompositions} from '@remotion/renderer';

const compositions = await getCompositions(bundleLocation, {
  inputProps: {title: 'Hello'},
});
```

### Select a specific composition

```tsx
import {selectComposition} from '@remotion/renderer';

const composition = await selectComposition({
  serveUrl: bundleLocation,
  id: 'MyVideo',
  inputProps: {title: 'Hello'},
});
```

### Render video

```tsx
import {renderMedia} from '@remotion/renderer';

await renderMedia({
  composition,
  serveUrl: bundleLocation,
  codec: 'h264',
  outputLocation: 'out/video.mp4',
  inputProps: {title: 'Hello'},
  // Optional callbacks:
  onProgress: ({progress}) => {
    console.log(`Rendering: ${Math.round(progress * 100)}%`);
  },
});
```

### Render still image

```tsx
import {renderStill} from '@remotion/renderer';

await renderStill({
  composition,
  serveUrl: bundleLocation,
  output: 'out/thumbnail.png',
  inputProps: {title: 'Hello'},
});
```

### Render frames individually

```tsx
import {renderFrames} from '@remotion/renderer';

const {assetsInfo} = await renderFrames({
  composition,
  serveUrl: bundleLocation,
  outputDir: 'out/frames',
  inputProps: {title: 'Hello'},
  imageFormat: 'png',
  onFrameUpdate: (frame) => console.log(`Rendered frame ${frame}`),
});
```

### Complete server-side rendering script

```tsx
import {bundle} from '@remotion/bundler';
import {renderMedia, selectComposition} from '@remotion/renderer';
import path from 'path';

const start = async () => {
  const bundleLocation = await bundle({
    entryPoint: path.resolve('./src/index.ts'),
  });

  const composition = await selectComposition({
    serveUrl: bundleLocation,
    id: 'MyVideo',
    inputProps: {title: 'Server Rendered'},
  });

  await renderMedia({
    composition,
    serveUrl: bundleLocation,
    codec: 'h264',
    outputLocation: 'out/video.mp4',
    inputProps: {title: 'Server Rendered'},
  });

  console.log('Render done!');
};

start();
```

## Remotion Player

Install `@remotion/player` to embed compositions in web apps.

### Player component

```tsx
import {Player} from '@remotion/player';
import {MyVideo} from './MyVideo';

const App = () => (
  <Player
    component={MyVideo}
    durationInFrames={150}
    fps={30}
    compositionWidth={1920}
    compositionHeight={1080}
    style={{width: 800}}
    controls
    inputProps={{title: 'Hello'}}
  />
);
```

**Key props:**
- `component` -- the React component to render
- `durationInFrames`, `fps`, `compositionWidth`, `compositionHeight` -- video metadata
- `controls` -- show playback controls
- `autoPlay` -- start playing immediately
- `loop` -- loop playback
- `clickToPlay` -- click the player to toggle play/pause
- `inputProps` -- props to pass to the component
- `style` -- CSS for the player container
- `numberOfSharedAudioTags` -- pre-mount audio elements (default 5)

### Thumbnail component

Render a single frame as a thumbnail:

```tsx
import {Thumbnail} from '@remotion/player';

<Thumbnail
  component={MyVideo}
  durationInFrames={150}
  fps={30}
  compositionWidth={1920}
  compositionHeight={1080}
  frameToDisplay={45}
  style={{width: 400}}
  inputProps={{title: 'Hello'}}
/>
```

### Controlling the player programmatically

```tsx
import {PlayerRef} from '@remotion/player';
import {useRef} from 'react';

const App = () => {
  const playerRef = useRef<PlayerRef>(null);

  return (
    <>
      <Player ref={playerRef} {...playerProps} />
      <button onClick={() => playerRef.current?.play()}>Play</button>
      <button onClick={() => playerRef.current?.pause()}>Pause</button>
      <button onClick={() => playerRef.current?.seekTo(0)}>Restart</button>
    </>
  );
};
```

## AWS Lambda

Install `@remotion/lambda` for serverless rendering on AWS.

### Setup

1. Create an AWS account and configure credentials
2. Deploy the Remotion Lambda function and S3 bucket:

```bash
npx remotion lambda policies role     # Create IAM role
npx remotion lambda sites create      # Deploy your video bundle to S3
npx remotion lambda functions deploy  # Deploy the Lambda function
```

### Render from CLI

```bash
npx remotion lambda render <site-url> <composition-id>
```

### Render from Node.js

```tsx
import {renderMediaOnLambda, getRenderProgress} from '@remotion/lambda/client';

const {renderId, bucketName} = await renderMediaOnLambda({
  region: 'us-east-1',
  functionName: 'remotion-render-...',
  serveUrl: 'https://your-bucket.s3.amazonaws.com/sites/...',
  composition: 'MyVideo',
  codec: 'h264',
  inputProps: {title: 'Hello'},
});

// Poll for progress
const progress = await getRenderProgress({
  renderId,
  bucketName,
  region: 'us-east-1',
  functionName: 'remotion-render-...',
});

console.log(progress.overallProgress); // 0 to 1
```

### Key Lambda considerations

- Maximum video duration depends on Lambda timeout (up to 15 minutes)
- Rendering is split across multiple Lambda invocations for parallelism
- Output is stored in S3
- Cost: pay per Lambda invocation + S3 storage

## Google Cloud Run

Install `@remotion/cloudrun` for rendering on Google Cloud.

### Setup

```bash
npx remotion cloudrun services deploy   # Deploy the Cloud Run service
npx remotion cloudrun sites create      # Deploy your video bundle to Cloud Storage
```

### Render

```bash
npx remotion cloudrun render <site-url> <composition-id>
```

### From Node.js

```tsx
import {renderMediaOnCloudrun} from '@remotion/cloudrun/client';

const result = await renderMediaOnCloudrun({
  region: 'us-east1',
  serviceName: 'remotion-render-...',
  serveUrl: 'https://storage.googleapis.com/...',
  composition: 'MyVideo',
  codec: 'h264',
  inputProps: {title: 'Hello'},
});
```

## GitHub Actions

Render videos in CI/CD. Add to your workflow:

```yaml
name: Render Video
on: [push]
jobs:
  render:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npx remotion render MyVideo out/video.mp4
      - uses: actions/upload-artifact@v4
        with:
          name: video
          path: out/video.mp4
```

For longer videos, increase the timeout and consider using Lambda instead for parallel rendering.
