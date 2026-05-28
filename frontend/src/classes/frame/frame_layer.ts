// Represents a single PNG layer of a card frame,
// with its position (top-left corner, in pixels) within the 2923x4000 canvas.
class FrameLayer
{
   readonly imagePath: string;
   readonly top: number;
   readonly left: number;
   readonly width: number;
   readonly height: number;
   readonly zIndex: number;

   constructor(imagePath: string, top: number, left: number, width: number, height: number, zIndex: number)
   {
      this.imagePath = imagePath;
      this.top = top;
      this.left = left;
      this.width = width;
      this.height = height;
      this.zIndex = zIndex;
   }
}

export { FrameLayer };
