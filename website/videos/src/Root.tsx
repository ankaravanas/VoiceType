import { Composition } from "remotion";
import { HeroVideo } from "./compositions/HeroVideo";
import { StatsVideo } from "./compositions/StatsVideo";
import { TestimonialVideo } from "./compositions/TestimonialVideo";
import { MultilingualVideo } from "./compositions/MultilingualVideo";
import { TypingVsDictationVideo } from "./compositions/TypingVsDictationVideo";
import { AudioUploadVideo } from "./compositions/AudioUploadVideo";
import { SpeedComparisonVideo } from "./compositions/SpeedComparisonVideo";
import { HowItWorksVideo } from "./compositions/HowItWorksVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Original Videos */}
      <Composition
        id="HeroVideo"
        component={HeroVideo}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          title: "Stop Typing.\nStart Speaking.\nGet More Done.",
        }}
      />
      <Composition
        id="StatsVideo"
        component={StatsVideo}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="TestimonialVideo"
        component={TestimonialVideo}
        durationInFrames={210}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Section Videos - High Priority */}
      <Composition
        id="MultilingualVideo"
        component={MultilingualVideo}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="TypingVsDictationVideo"
        component={TypingVsDictationVideo}
        durationInFrames={240}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="AudioUploadVideo"
        component={AudioUploadVideo}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Section Videos - Medium Priority */}
      <Composition
        id="SpeedComparisonVideo"
        component={SpeedComparisonVideo}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="HowItWorksVideo"
        component={HowItWorksVideo}
        durationInFrames={270}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
