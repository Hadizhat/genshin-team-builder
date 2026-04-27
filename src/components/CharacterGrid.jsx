import CharacterCard from './CharacterCard'

function CharacterGrid({ characters, onSelect }) {
  return (
    <ul className="character-grid">
      {characters.map((char) => (
        <li key={char.id} className="character-grid__item">
          <CharacterCard character={char} onSelect={onSelect} />
        </li>
      ))}
    </ul>
  )
}

export default CharacterGrid
