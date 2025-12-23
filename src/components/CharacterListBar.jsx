import CharacterCard from "./CharacterCard";

export default function CharacterListBar({ characters }) {
  return (
    <div className="character-list-bar">
      {characters.map((char) => (
        <CharacterCard key={char.id} character={char} />
      ))}
    </div>
  );
}
