// src/api.js
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "/api";

export const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

export async function getCharacters() {
  const res = await api.get("/characters/");
  return res.data;
}

export async function getUsers() {
  const res = await api.get("/users/");
  return res.data;
}

// создание персонажа
export async function createCharacter({ user_id, gender, username, avatar_full, avatar_card }) {
  const res = await api.post("/characters/", {
    user_id,
    gender,
    username,
    avatar_full,
    avatar_card,
  });
  return res.data;
}


export async function getCharacterByUser(userId) {
  try {
    const res = await api.get(`/characters/by_user/${userId}`);
    return res.data;
  } catch (err) {
    if (err.response && err.response.status === 404) {
      return null
    }
  }
}

export default api;
