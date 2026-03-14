// Declares image file types as importable modules for TypeScript.
// Without this, importing image files (e.g. import logo from "./logo.png") would cause a TS error.
// Each module declaration tells TypeScript that the default export is a string (the asset URL produced by the bundler).

declare module "*.png"
{
   const value: string;
   export default value;
}

declare module "*.jpg"
{
   const value: string;
   export default value;
}

declare module "*.jpeg"
{
   const value: string;
   export default value;
}

declare module "*.gif"
{
   const value: string;
   export default value;
}

declare module "*.svg"
{
   const value: string;
   export default value;
}

declare module "*.webp"
{
   const value: string;
   export default value;
}
