import { FrameLayer } from "./frame_layer";

// Represents a fully assembled card frame made of stacked PNG layers.
// The card art image (dynamic user content) is rendered between the two layer groups:
//   layersBeforeArt → card art → layersAfterArt
class Frame
{
   readonly layersBeforeArt: FrameLayer[];
   readonly layersAfterArt: FrameLayer[];

   constructor(layersBeforeArt: FrameLayer[], layersAfterArt: FrameLayer[])
   {
      this.layersBeforeArt = layersBeforeArt;
      this.layersAfterArt = layersAfterArt;
   }
}

export { Frame };
