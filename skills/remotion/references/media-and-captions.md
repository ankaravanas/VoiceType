# Media and Captions

## Table of Contents

- [Video](#video)
- [Audio](#audio)
- [Audio Visualization](#audio-visualization)
- [Captions](#captions)
- [Speech-to-Text with Whisper](#speech-to-text-with-whisper)
- [Sound Effects](#sound-effects)
- [Google Fonts](#google-fonts)
- [Custom Fonts](#custom-fonts)
- [Lottie Animations](#lottie-animations)

## Video

### OffthreadVideo (recommended)

Renders video by extracting frames outside the browser. More reliable and memory-efficient:

```tsx
import {OffthreadVideo, staticFile} from 'remotion';

const MyVideo = () => (
  <OffthreadVideo src={staticFile('background.mp4')} />
);
```

**Props:**
- `src` -- URL or `staticFile()` path
- `volume?` -- 0 to 1 (default 1), or a function `(frame) => number`
- `muted?` -- disable audio
- `startFrom?` -- start playback at this frame
- `endAt?` -- stop playback at this frame
- `playbackRate?` -- speed multiplier (0.5 = half speed, 2 = double)
- `style?`, `className?` -- CSS styling
- `transparent?` -- for videos with alpha channel (VP8/VP9)
- `toneMapped?` -- disable tone mapping for HDR content (default true)

### Html5Video

Uses the browser's native `<video>` element. Use when you need browser-native features:

```tsx
import {Html5Video} from 'remotion';

<Html5Video src={staticFile('clip.mp4')} startFrom={30} />
```

Same props as `<OffthreadVideo>` plus DOM-specific attributes.

**When to use which:**
- `<OffthreadVideo>` -- default choice, more reliable during rendering
- `<Html5Video>` -- when you need specific browser video features

## Audio

```tsx
import {Html5Audio, staticFile} from 'remotion';

const MyVideo = () => (
  <>
    <Html5Audio src={staticFile('music.mp3')} volume={0.5} />
    <div>Visual content here</div>
  </>
);
```

**Props:** `src`, `volume?`, `muted?`, `startFrom?`, `endAt?`, `playbackRate?`

**Dynamic volume** (fade in/out):

```tsx
<Html5Audio
  src={staticFile('music.mp3')}
  volume={(frame) =>
    interpolate(frame, [0, 30, durationInFrames - 30, durationInFrames], [0, 1, 1, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  }
/>
```

## Audio Visualization

Install `@remotion/media-utils`:

```tsx
import {getAudioData, useAudioData, visualizeAudio} from '@remotion/media-utils';

const AudioViz = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const audioData = useAudioData(staticFile('music.mp3'));

  if (!audioData) return null;

  const visualization = visualizeAudio({
    fps,
    frame,
    audioData,
    numberOfSamples: 256, // power of 2, controls frequency resolution
  });

  // visualization is an array of amplitude values (0 to 1)
  return (
    <div style={{display: 'flex', alignItems: 'flex-end', height: 200}}>
      {visualization.map((amp, i) => (
        <div
          key={i}
          style={{
            width: 4,
            height: amp * 200,
            backgroundColor: 'blue',
            marginRight: 1,
          }}
        />
      ))}
    </div>
  );
};
```

**Functions:**
- `useAudioData(src)` -- hook that returns parsed audio data (uses delayRender internally)
- `getAudioData(src)` -- async function for non-component contexts
- `visualizeAudio({fps, frame, audioData, numberOfSamples})` -- returns amplitude array for the current frame
- `getAudioDurationInSeconds(src)` -- get audio file duration

## Captions

Install `@remotion/captions` for subtitle and caption support.

### Parse SRT files

```tsx
import {parseSrt} from '@remotion/captions';

const subtitles = parseSrt(srtContent);
// Returns array of { startMs, endMs, text }
```

### TikTok-style word-by-word captions

```tsx
import {Caption} from '@remotion/captions';

// After generating word-level timestamps (via Whisper or similar):
const captions = [
  {text: 'Hello', startMs: 0, endMs: 500, confidence: 1},
  {text: 'World', startMs: 500, endMs: 1000, confidence: 1},
];

const CaptionOverlay = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const currentTimeMs = (frame / fps) * 1000;

  // Find the currently active caption
  const activeCaption = captions.find(
    (c) => currentTimeMs >= c.startMs && currentTimeMs < c.endMs
  );

  return (
    <AbsoluteFill style={{justifyContent: 'flex-end', alignItems: 'center', padding: 40}}>
      {activeCaption && (
        <div style={{
          fontSize: 60,
          fontWeight: 'bold',
          color: 'white',
          textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
        }}>
          {activeCaption.text}
        </div>
      )}
    </AbsoluteFill>
  );
};
```

### Serialize captions back to SRT

```tsx
import {serializeSrt} from '@remotion/captions';

const srtString = serializeSrt(captions);
```

## Speech-to-Text with Whisper

### Local (whisper.cpp)

Install `@remotion/install-whisper-cpp`:

```tsx
import {installWhisperCpp, transcribe, downloadWhisperModel} from '@remotion/install-whisper-cpp';

// One-time setup (in a Node.js script, not in a component):
await installWhisperCpp({to: 'whisper.cpp', version: '1.5.5'});
await downloadWhisperModel({folder: 'whisper.cpp', model: 'medium'});

// Transcribe:
const result = await transcribe({
  whisperPath: 'whisper.cpp',
  inputPath: 'audio.wav',
  model: 'medium',
  tokenLevelTimestamps: true, // word-level timestamps
});
// result.transcription contains timestamped words
```

### OpenAI Whisper API

Install `@remotion/openai-whisper`:

```tsx
import {openAiWhisperApiToCaptions} from '@remotion/openai-whisper';

// After calling the OpenAI Whisper API with response_format: 'verbose_json' and timestamp_granularities: ['word']:
const captions = openAiWhisperApiToCaptions({transcription: openAiResponse});
```

## Sound Effects

Install `@remotion/sfx` for built-in sound effects:

```tsx
import {whoosh, whip, pageTurn, mouseClick, pop} from '@remotion/sfx';
import {Html5Audio} from 'remotion';

const MyScene = () => (
  <Html5Audio src={whoosh()} volume={0.5} />
);
```

Available effects: `whoosh`, `whip`, `pageTurn`, `mouseClick`, `pop`, and more.

## Google Fonts

Install `@remotion/google-fonts`:

```tsx
import {loadFont} from '@remotion/google-fonts/Inter';

const {fontFamily} = loadFont();

const MyComponent = () => (
  <div style={{fontFamily}}>Text in Inter font</div>
);
```

Load specific weights/styles:

```tsx
const {fontFamily} = loadFont('normal', {
  weights: ['400', '700'],
  subsets: ['latin'],
});
```

## Custom Fonts

Install `@remotion/fonts`:

```tsx
import {loadFont} from '@remotion/fonts';
import {staticFile} from 'remotion';

const {fontFamily} = loadFont({
  family: 'MyCustomFont',
  url: staticFile('fonts/MyFont.woff2'),
  weight: '400',
});
```

## Lottie Animations

Install `@remotion/lottie`:

```tsx
import {Lottie, useLottie} from '@remotion/lottie';
import {useEffect, useState} from 'react';
import {continueRender, delayRender, staticFile} from 'remotion';

const MyLottie = () => {
  const [handle] = useState(() => delayRender('Loading Lottie'));
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch(staticFile('animation.json'))
      .then((res) => res.json())
      .then((data) => {
        setAnimationData(data);
        continueRender(handle);
      });
  }, [handle]);

  if (!animationData) return null;

  return <Lottie animationData={animationData} />;
};
```

The `<Lottie>` component automatically syncs with Remotion's timeline.
