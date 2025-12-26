// src/components/OnboardingModal.jsx
import { useState } from "react";

export default function OnboardingModal({ onCreate }) {
  const [gender, setGender] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit() {
    setError("");
    if (!gender) {
      setError("Выберите пол персонажа");
      return;
    }
    if (username.trim().length < 3) {
      setError("Имя должно быть не короче 3 символов");
      return;
    }

    try {
      setSubmitting(true);
      await onCreate({ gender, username: username.trim() });
    } catch (e) {
      console.error(e);
      setError("Не удалось создать персонажа");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Что случилось? Где я?</h2>
        <p>Ты очнулся в незнакомой комнате. Давай создадим твоего персонажа.</p>

        <div className="form">
          <label>
            Имя персонажа:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Введите имя"
              maxLength={16}
            />
          </label>

          <div className="gender-options">
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={gender === "male"}
                onChange={(e) => setGender(e.target.value)}
              />
              Мужской
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={gender === "female"}
                onChange={(e) => setGender(e.target.value)}
              />
              Женский
            </label>
          </div>
        </div>

        {error && <p className="error">{error}</p>}

        <div className="actions">
          <button
            className="primary"
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? "Создаём..." : "Далее"}
          </button>
        </div>
      </div>
    </div>
  );
}
