export const API_CONFIG = {
   BASE_URL: "http://localhost:3001",
};

export const ROUTES = {
   CARDS_TABLE_URL: "/cards",
   CARD_BY_ID_URL: (id: number | string): string => `/cards/${id}`,
};
