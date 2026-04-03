const DEFAULT_API_URL = "http://localhost:3001";

export const API_CONFIG = {
   BASE_URL: process.env.REACT_APP_API_URL || DEFAULT_API_URL,
};

export const ROUTES = {
   CARDS_TABLE_URL: "/cards",
   CARD_BY_ID_URL: (id: number | string): string => `/cards/${id}`,
};
