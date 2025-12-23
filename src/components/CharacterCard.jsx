export default function CharacterCard({ character }) {
  return (
    <div className="character-card">
      <h4>{character.username || "Без имени"}</h4>
      <p>Lvl {character.level}</p>
    </div>
  );
}
