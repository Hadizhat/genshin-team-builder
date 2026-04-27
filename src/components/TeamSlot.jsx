function TeamSlot({ character, isActive, onSlotClick, onRemove }) {
  const slotClass = `team-slot ${isActive ? 'team-slot--active' : ''}`

  if (character) {

    return (
    <article className={`${slotClass} team-slot--filled`} onClick={onSlotClick}>

    <button className="team-slot__remove" onClick={(e) => 
    { e.stopPropagation()
    onRemove()}}>
          X
    </button>
    <img
          className="team-slot__icon"
          src={`https://genshin.jmp.blue/characters/${character.id}/icon`}
          alt={character.name}
          width={60}
          height={60}
          loading="lazy"
    />
    <h3 className="team-slot__name">{character.name}</h3>
    <p className="team-slot__vision">{character.vision}</p>
    </article>
    )
  }

  return (

    <div className={`${slotClass} team-slot--empty`} onClick={onSlotClick}>
    <p className="team-slot__plus">+</p>
    </div>

  )
}

export default TeamSlot