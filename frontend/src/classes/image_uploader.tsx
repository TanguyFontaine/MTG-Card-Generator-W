function base64DataToFile(dataUrl: string, fileName: string): File
{
   // Split the Data URL into metadata and base64 content
   const dataUrlParts = dataUrl.split(",");

   const mimeTypeMatch = dataUrlParts[0].match(/:(.*?);/);
   const mimeType = mimeTypeMatch ? mimeTypeMatch[1] : "";

   // Decode base64 content to binary string
   const base64String = dataUrlParts[1];
   const binaryString = atob(base64String);

   // Convert binary string to Uint8Array
   const byteArrayLength = binaryString.length;
   const byteArray = new Uint8Array(byteArrayLength);
   for (let i = 0; i < byteArrayLength; i++)
   {
      byteArray[i] = binaryString.charCodeAt(i);
   }

   // Create a File object with the correct MIME type
   return new File([byteArray], fileName, { type: mimeType });
}

function buildCloudinaryUploadUrl(): string
{
   const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
   if (!cloudName)
   {
      throw new Error("Undefined Cloudinary cloud name.");
   }
   return `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
}

const ImageUploader = {

// Upload image to Cloudinary and return the URL
   async uploadImage(fileName: string, base64FileContent: string): Promise<string>
   {
      const file = base64DataToFile(base64FileContent, fileName);

      const formData = new FormData();

      formData.append("file", file);
      formData.append("upload_preset", process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);

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
