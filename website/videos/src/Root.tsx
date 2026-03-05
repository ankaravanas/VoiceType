import { Composition } from "remotion";
import { HeroVideo } from "./compositions/HeroVideo";
import { StatsVideo } from "./compositions/StatsVideo";
import { TestimonialVideo } from "./compositions/TestimonialVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
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
    </>
  );
};
