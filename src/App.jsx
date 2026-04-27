import { useState, useEffect } from 'react'
import characters from './data/characters'
import CharacterGrid from './components/CharacterGrid'
import TeamSlot from './components/TeamSlot'
import TeamAnalysis from './components/TeamAnalysis'

function App() {
  const [team, setTeam] = useState(Array(4).fill(null))
  const [activeSlot, setActiveSlot] = useState(0)
  const [elementFilter, setElementFilter] = useState('all')
  const [starFilter, setStarFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [showAnalysis, setShowAnalysis] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('team')
    if (saved) setTeam(JSON.parse(saved))
  }, [])

  useEffect(() => {
    localStorage.setItem('team', JSON.stringify(team))
  }, [team])

  const isTeamFull = team.every((slot) => slot !== null)

  const filteredCharacters = characters
    .filter((char) => elementFilter === 'all' || char.vision === elementFilter)
    .filter((char) => starFilter === 'all' || char.rarity === Number(starFilter))
    .filter((char) => char.name.toLowerCase().includes(search.toLowerCase()))

  function handleSelectCharacter(character) {
    console.log('выбран:', character.name)
    const newTeam = [...team]
    newTeam[activeSlot] = character
    setTeam(newTeam)
    const nextSlot = newTeam.findIndex((slot) => slot === null)
    if (nextSlot !== -1) setActiveSlot(nextSlot)
  }

  function handleRemoveCharacter(index) {
    const newTeam = [...team]
    newTeam[index] = null
    setTeam(newTeam)
    setActiveSlot(index)
    setShowAnalysis(false)
  }

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">Genshin Team Builder</h1>
    
      </header>

      <section className="team-builder">
        
        <ul className="team-builder__slots">
          {team.map((character, index) => (
            <li key={index} className="team-builder__slot">
              <TeamSlot
                character={character}
                isActive={index === activeSlot}
                onSlotClick={() => setActiveSlot(index)}
                onRemove={() => handleRemoveCharacter(index)}
              />
            </li>
          ))}
        </ul>

        <button
          className="team-builder__analyze"
          disabled={!isTeamFull}
          onClick={() => setShowAnalysis(true)}
        >
          {isTeamFull ? 'Analyze your Team' : 'Choose 4 Characters'}
        </button>

        {showAnalysis && <TeamAnalysis team={team} />}
      </section>

      <section className="character-picker">

        <input
          className="character-picker__search"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="character-picker__filters">
          <div className="character-picker__filter-group">
            {['all', 'Pyro', 'Hydro', 'Cryo', 'Electro', 'Anemo', 'Geo', 'Dendro'].map((el) => (
              <button
                key={el}
                className="character-picker__filter-btn"
                onClick={() => setElementFilter(el)}
              >
                {el === 'all' ? 'all' : el}
              </button>
            ))}
          </div>

          <div className="character-picker__filter-group">
            <button
              className="character-picker__filter-btn"
              onClick={() => setStarFilter('all')}
            >
              All stars
            </button>
            <button
              className="character-picker__filter-btn"
              onClick={() => setStarFilter('5')}
            >
              ★★★★★
            </button>
            <button
              className="character-picker__filter-btn"
              onClick={() => setStarFilter('4')}
            >
              ★★★★
            </button>
          </div>
        </div>

        <CharacterGrid
          characters={filteredCharacters}
          onSelect={handleSelectCharacter}
        />
      </section>
    </div>
  )
}

export default App