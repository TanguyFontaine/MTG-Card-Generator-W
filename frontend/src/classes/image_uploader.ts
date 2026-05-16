function buildCloudinaryUploadUrl(): string
{
   const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
   if (!cloudName)
   {
      throw new Error("Undefined Cloudinary cloud name.");
   }
   return `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
}

function buildUploadFormData(base64FileContent: string, fileName: string): FormData
{
   const publicId = fileName.replace(/\.[^.]+$/, "").replace(/[^a-zA-Z0-9_-]/g, "_");

   const formData = new FormData();
   formData.append("file", base64FileContent);
   formData.append("upload_preset", process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);
   formData.append("public_id", publicId);

   return formData;
}

const ImageUploader = {

// Upload image to Cloudinary and return the URL.
   // Passing a public_id makes Cloudinary overwrite the existing asset with the same name
   // instead of creating a new one on every save.
   async uploadImage(base64FileContent: string, fileName: string): Promise<string>
   {
      const formData =  buildUploadFormData(base64FileContent, fileName);

      const cloudinaryResponse = await fetch(buildCloudinaryUploadUrl(), {
         method: "POST",
         body: formData,
      });

      if (!cloudinaryResponse.ok)
      {
         const errorData = await cloudinaryResponse.json().catch(() => ({}));
         throw new Error(errorData.error?.message || `Cloudinary upload failed: ${cloudinaryResponse.status}`);
      }

      const cloudinaryData = await cloudinaryResponse.json();
      if (!cloudinaryData.secure_url)
      {
         throw new Error("Cloudinary did not return a secure_url");
      }
      return cloudinaryData.secure_url;
   },

   async fetchImageContentFromUrl(url: string): Promise<string>
   {
      const response = await fetch(url);
      const blob = await response.blob();

      return new Promise((resolve, reject) => {
         const reader = new FileReader();
         reader.onloadend = () => resolve(reader.result as string);
         reader.onerror = reject;
         reader.readAsDataURL(blob); // Base64 encode the image data
      });
   },
};

export default ImageUploader;
