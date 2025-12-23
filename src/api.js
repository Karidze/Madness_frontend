import axios from "axios";

const API_URL = "https://madnessbackend-production.up.railway.app/api";

export async function getCharacters() {
  const res = await axios.get(`${API_URL}/characters/`);
  return res.data;
}

