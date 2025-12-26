// src/components/MainCharacter.jsx
export default function MainCharacter({ character }) {
  return (
    <div className="main-character">
      <img
        src={character.avatar_full}
        alt={character.username}
        className="main-avatar"
      />
      <div className="info">
        <h2>{character.username}</h2>
        <p>Уровень {character.level ?? 1}</p>
      </div>
    </div>
  );
}
