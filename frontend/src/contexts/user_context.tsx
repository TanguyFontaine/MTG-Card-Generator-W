import { createContext, useContext, useState, useEffect, useCallback } from "react";

import type { UserInfo } from "../backend_connection/user_service";

/***************************************************************/

const LOCAL_STORAGE_KEY = "cardGeneratorUser";

// ─── Local Storage ───────────────────────────────────────────
// Browser's built-in key-value store that persists across page refreshes and browser restarts

function loadUserFromStorage(): UserInfo | null
{
   const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
   if (!stored)
   {
      return null;
   }

   try
   {
      return JSON.parse(stored) as UserInfo;
   }
   catch
   {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      return null;
   }
}

function saveUserToStorage(user: UserInfo): void
{
   localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user));
}

function removeUserFromStorage(): void
{
   localStorage.removeItem(LOCAL_STORAGE_KEY);
}

// ─── Context ─────────────────────────────────────────────────

interface UserContextValue
{
   user: UserInfo | null;
   login: (user: UserInfo) => void;
   logout: () => void;
   isLoggedIn: boolean;
}

const UserContext = createContext<UserContextValue | null>(null);

// ─── Provider ────────────────────────────────────────────────

interface UserStateProviderProps
{
   children: React.ReactNode;
}

export function UserStateProvider({ children }: UserStateProviderProps)
{
   const [user, setUser] = useState<UserInfo | null>(loadUserFromStorage);

   useEffect(() =>
   {
      if (user)
      {
         saveUserToStorage(user);
      }
      else
      {
         removeUserFromStorage();
      }
   }, [user]);

   const login = useCallback((userInfo: UserInfo) =>
   {
      setUser(userInfo);
   }, []);

   const logout = useCallback(() =>
   {
      setUser(null);
   }, []);

   const contextValue: UserContextValue = {
      user,
      login,
      logout,
      isLoggedIn: user !== null,
   };

   return (
      <UserContext.Provider value={contextValue}>
         {children}
      </UserContext.Provider>
   );
}

// ─── Hook ────────────────────────────────────────────────────

export function useUserContext(): UserContextValue
{
   const context = useContext(UserContext);
   if (!context)
   {
      throw new Error("useUserContext must be used within a UserStateProvider");
   }
   return context;
}
