function CharacterCard({ character, onSelect }) {
  return (
    <article
      className="character-card"
      onClick={() => onSelect(character)}
    >
      <img
        className="character-card__icon"
        src={`https://genshin.jmp.blue/characters/${character.id}/icon`}
        alt={character.name}
        width={60}
        height={60}
        loading="lazy"
      />
      <h3 className="character-card__name">{character.name}</h3>
      <p className="character-card__vision">{character.vision}</p>
      <p className="character-card__rarity">{character.rarity}★</p>
    </article>
  )
}

export default CharacterCard

