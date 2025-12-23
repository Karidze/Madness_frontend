import { useEffect, useState } from "react";
import { getCharacters } from "../api";
import CharacterListBar from "../components/CharacterListBar";

export default function Home() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    getCharacters().then(setCharacters).catch(console.error);
  }, []);

  return (
    <div className="home">
      <h1>Комната персонажа</h1>
      {/* Тут будет панель статов и главный персонаж */}
      <CharacterListBar characters={characters} />
    </div>
  );
}
