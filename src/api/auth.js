// src/api/auth.js
import api from "./client";

export async function authWithTelegram(initData) {
  const res = await api.post("/auth/telegram", { initData });
  const { token, user } = res.data;
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  // При желании сохрани токен, чтобы пережить перезагрузку:
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
  return { token, user };
}

export function loadSavedAuth() {
  const token = localStorage.getItem("token");
  const userJson = localStorage.getItem("user");
  if (token && userJson) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    return JSON.parse(userJson);
  }
  return null;
}
