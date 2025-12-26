// src/api/characters.js
import api from "./client";

export async function getCharacterByUser(userId) {
  try {
    const res = await api.get(`/characters/by_user/${userId}`);
    return res.data;
  } catch (err) {
    if (err.response && err.response.status === 404) return null;
    throw err;
  }
}

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
