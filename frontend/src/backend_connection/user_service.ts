import { API_CONFIG, ROUTES } from "../../../shared/routes";

export interface UserInfo
{
   id: number;
   userName: string;
}

async function handleResponse(response: Response): Promise<Response>
{
   if (!response.ok)
   {
      let errorMessage = `HTTP error! status: ${response.status}`;

      try
      {
         const errorData = await response.json();
         if (errorData.error)
         {
            errorMessage = errorData.error;
         }
      }
      catch (e) // If we can't parse the error response, use the default message
      {}

      throw new Error(errorMessage);
   }

   return response;
}

const UserService = {

   async register(userName: string, password: string): Promise<UserInfo>
   {
      try
      {
         const response = await fetch(`${API_CONFIG.BASE_URL}${ROUTES.USERS_REGISTER_URL}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userName, password: password || null }),
         });

         await handleResponse(response);
         return await response.json();
      }
      catch (error)
      {
         console.error("Error registering:", error);
         throw error;
      }
   },

   async login(userName: string, password: string): Promise<UserInfo>
   {
      try
      {
         const response = await fetch(`${API_CONFIG.BASE_URL}${ROUTES.USERS_LOGIN_URL}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userName, password: password || null }),
         });

         await handleResponse(response);
         return await response.json();
      }
      catch (error)
      {
         console.error("Error logging in:", error);
         throw error;
      }
   },
};

export default UserService;
