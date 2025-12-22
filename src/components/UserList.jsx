import { useEffect, useState } from "react";
import api from "../api";

export default function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await api.get("/users");
        setUsers(res.data);
      } catch (err) {
        console.error("Ошибка загрузки пользователей:", err);
      }
    }
    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Список пользователей</h2>
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.username} (telegram_id: {u.telegram_id})
          </li>
        ))}
      </ul>
    </div>
  );
}
