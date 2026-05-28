import { FrameLayer } from "./frame_layer";

// Represents a fully assembled card frame made of stacked PNG layers.
// All layers carry an explicit zIndex so they can be rendered in any DOM order.
// The card art is rendered separately in card_render.tsx at ART_Z_INDEX (= 5).
class Frame
{
   readonly layers: FrameLayer[];

   constructor(layers: FrameLayer[])
   {
      this.layers = layers;
   }
}

export { Frame };
