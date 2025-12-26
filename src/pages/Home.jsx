import { useEffect, useState } from "react";
import { authWithTelegram, loadSavedAuth } from "../api/auth";
import { getCharacterByUser, createCharacter } from "../api/characters";
import OnboardingModal from "../components/OnboardingModal";
import MainCharacter from "../components/MainCharacter";

export default function Home() {
  const [user, setUser] = useState(null);
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [debugInfo, setDebugInfo] = useState(""); // <-- новое состояние для вывода initData

  useEffect(() => {
    async function init() {
      setLoading(true);
      setError("");

      let currentUser = loadSavedAuth();

      if (!currentUser) {
        const initData = window.Telegram?.WebApp?.initData || "";

        // сохраняем initData прямо в UI
        setDebugInfo(`initData: ${initData || "пусто"}`);

        if (!initData) {
          setError("Нет данных Telegram для авторизации");
          setLoading(false);
          return;
        }
        try {
          const { user } = await authWithTelegram(initData);
          currentUser = user;
        } catch (e) {
          console.error("Auth error:", e);
          setError("Ошибка авторизации через Telegram");
          setLoading(false);
          return;
        }
      }

      setUser(currentUser);

      try {
        const char = await getCharacterByUser(currentUser.id);
        setCharacter(char);
      } catch (e) {
        console.error("Character load error:", e);
        setError("Ошибка загрузки персонажа");
      } finally {
        setLoading(false);
      }
    }

    init();
  }, []);

  async function handleCreate({ gender, username }) {
    if (!user) return;
    const avatar_full = `/images/avatars/${gender}_full.png`;
    const avatar_card = `/images/avatars/${gender}_card.png`;

    try {
      const newChar = await createCharacter({
        user_id: user.id,
        gender,
        username,
        avatar_full,
        avatar_card,
      });
      setCharacter(newChar);
    } catch (e) {
      console.error(e);
      setError("Не удалось создать персонажа");
    }
  }

  if (loading) return <p>Загрузка...</p>;

  return (
    <div className="home">
      {error && <p style={{ color: "red" }}>{error}</p>}
      {debugInfo && <p style={{ fontSize: "12px", color: "gray" }}>{debugInfo}</p>} {/* <-- выводим initData */}
      {character ? (
        <>
          <div className={`background bg-${character.gender}`} />
          <MainCharacter character={character} />
        </>
      ) : (
        <OnboardingModal onCreate={handleCreate} />
      )}
    </div>
  );
}
