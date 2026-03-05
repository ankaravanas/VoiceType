# Plan: Section Videos for VoiceType Landing Page

**Created**: 2026-03-05
**Status**: Implemented
**Goal**: Create animated Remotion videos/infographics to embed within website sections, enhancing visual storytelling and demonstrating key features.

---

## Context

The current website has 13 sections but limited visual demonstrations of the product. The existing Remotion infrastructure supports 3 videos (Hero, Stats, Testimonial) but none are embedded in the actual page.

**Opportunity**: Create targeted section videos that visually demonstrate key differentiators:
- Speed advantage
- Multilingual support
- Audio file upload (unique feature)
- Typing vs dictation comparison

---

## Video Opportunities by Section

| Section | Current State | Video Opportunity | Priority |
|---------|--------------|-------------------|----------|
| **Features** | Static 3-column grid | Animated feature demos | High |
| **Stats/Comparison** | Static chart | Animated speed comparison | High |
| **How It Works** | Static 3 steps | Animated process flow | Medium |
| **Mission/Values** | Static cards | Could use subtle animations | Low |

---

## Proposed Videos

### 1. MultilingualVideo (Priority: High)
**Purpose**: Demonstrate automatic language detection and multilingual transcription
**Duration**: 6 seconds (180 frames)
**Placement**: Features section - "Multilingual Support" card or standalone

**Visual Concept**:
- Animated waveform in center representing speech
- Text bubbles appearing in sequence showing same phrase in multiple languages:
  - English: "Hello, how are you?"
  - Spanish: "Hola, ¿cómo estás?"
  - Greek: "Γεια σου, τι κάνεις;"
  - French: "Bonjour, comment ça va?"
  - German: "Hallo, wie geht es dir?"
- Language flags or labels fade in with each translation
- Smooth spring animations between language switches

**Technical Notes**:
- Use staggered Sequence components
- Spring physics for text entrance
- Waveform animation similar to HeroVideo

---

### 2. TypingVsDictationVideo (Priority: High)
**Purpose**: Visual proof that dictation is 3x faster than typing
**Duration**: 8 seconds (240 frames)
**Placement**: Stats/Comparison section or Hero section

**Visual Concept**:
- Split screen: Left = "Typing" | Right = "VoiceType"
- Both start simultaneously
- Left side: Cursor typing text slowly, character by character
- Right side: Waveform animates, then full paragraph appears instantly
- Progress bars below each showing completion
- Left reaches ~33% when right hits 100%
- Final callout: "3x Faster" with accent color

**Technical Notes**:
- Use interpolate for typing animation (reveal characters over time)
- Waveform component reused from HeroVideo
- Split-screen layout with clear visual distinction

---

### 3. AudioUploadVideo (Priority: High)
**Purpose**: Showcase unique audio file upload feature (no competitor has this)
**Duration**: 6 seconds (180 frames)
**Placement**: Features section - "Audio File Upload" card

**Visual Concept**:
- Audio file icon drops into upload zone
- File types cycle: .mp3, .wav, .m4a, podcast icon
- Processing animation (waveform visualization)
- Clean transcript appears below
- Tagline: "Voice memos → Clean text"

**Technical Notes**:
- Drag-and-drop animation with spring physics
- Particle/pulse effect during processing
- Text reveal animation for transcript

---

### 4. SpeedComparisonVideo (Priority: Medium)
**Purpose**: Animated version of the speed comparison chart
**Duration**: 5 seconds (150 frames)
**Placement**: Stats section - replace or enhance static chart

**Visual Concept**:
- Three horizontal bars representing:
  - VoiceType (lemon accent)
  - Wispr Flow (muted color)
  - Apple Dictation (muted color)
- Bars animate from 0% to final width
- VoiceType bar clearly longest/fastest
- Numbers count up as bars grow
- Labels appear with spring animation

**Technical Notes**:
- Use AnimatedCounter from StatsVideo
- Interpolate bar widths
- Staggered entrance animations

---

### 5. HowItWorksVideo (Priority: Medium)
**Purpose**: Animated version of the 3-step process
**Duration**: 9 seconds (270 frames, 3 seconds per step)
**Placement**: How It Works section

**Visual Concept**:
- Step 1 (0-90 frames): App icon appears, cursor clicks, activation animation
- Step 2 (90-180 frames): Waveform animates, speech visualization
- Step 3 (180-270 frames): Text materializes, clean and formatted
- Progress indicator connecting all 3 steps
- Step numbers (01, 02, 03) with labels

**Technical Notes**:
- Use Sequence for each step
- Consistent with existing waveform animation
- Connecting line draws between steps

---

## Implementation Plan

### Phase 1: Infrastructure Setup
- [ ] Create shared animation utilities (reusable springs, easing)
- [ ] Create shared visual components (Waveform, AnimatedCounter, etc.)
- [ ] Add build scripts for new videos

### Phase 2: High-Priority Videos
- [ ] Create MultilingualVideo composition
- [ ] Create TypingVsDictationVideo composition
- [ ] Create AudioUploadVideo composition
- [ ] Test all videos in Remotion Studio

### Phase 3: Medium-Priority Videos
- [ ] Create SpeedComparisonVideo composition
- [ ] Create HowItWorksVideo composition

### Phase 4: Website Integration
- [ ] Render videos to MP4/WebM files
- [ ] Add video elements to website sections
- [ ] Implement lazy loading for performance
- [ ] Add fallback images for slow connections

### Phase 5: Polish
- [ ] Ensure color/font consistency with design system
- [ ] Optimize video file sizes
- [ ] Test on mobile devices
- [ ] Add autoplay with muted attribute

---

## Technical Specifications

**Resolution**: 1920x1080 (or 1280x720 for smaller section embeds)
**Frame Rate**: 30fps
**Format**: MP4 (H.264) with WebM fallback
**Output Directory**: `website/videos/out/`

**Design System Colors**:
```
Background:   #F4F9F8
Dark Green:   #0E2E28
Accent Lemon: #CDFA8A
Muted:        #6E7C87
Border:       #E5E9EB
```

---

## File Structure After Implementation

```
website/videos/src/compositions/
├── HeroVideo.tsx           # Existing
├── StatsVideo.tsx          # Existing
├── TestimonialVideo.tsx    # Existing
├── MultilingualVideo.tsx   # NEW
├── TypingVsDictationVideo.tsx  # NEW
├── AudioUploadVideo.tsx    # NEW
├── SpeedComparisonVideo.tsx    # NEW
├── HowItWorksVideo.tsx     # NEW
└── shared/
    ├── Waveform.tsx        # Extracted from HeroVideo
    ├── AnimatedCounter.tsx # Extracted from StatsVideo
    └── animations.ts       # Shared spring configs
```

---

## Success Criteria

1. All videos render without errors
2. Videos match website design system exactly
3. File sizes under 2MB each for fast loading
4. Videos enhance understanding of features
5. Mobile-friendly integration (lazy load, fallbacks)

---

## Open Questions

- [ ] Should videos autoplay on scroll or require user interaction?
- [ ] Preferred aspect ratio for section embeds (16:9 or custom)?
- [ ] Should we create GIF versions as lightweight alternatives?

---

## Next Steps

1. Review and approve this plan
2. Begin Phase 1: Extract shared components
3. Create MultilingualVideo first (high impact, demonstrates key differentiator)
