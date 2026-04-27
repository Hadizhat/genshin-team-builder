const REACTIONS = [
  { name: 'Vaporize', elements: ['Pyro', 'Hydro'] },
  { name: 'Melt', elements: ['Pyro', 'Cryo'] },
  { name: 'Freeze', elements: ['Hydro', 'Cryo'] },
  { name: 'Overloaded', elements: ['Pyro', 'Electro'] },
  { name: 'Superconduct', elements: ['Cryo', 'Electro'] },
  { name: 'Electro-Charged', elements: ['Hydro', 'Electro'] },
  { name: 'Burning', elements: ['Pyro', 'Dendro'] },
  { name: 'Bloom', elements: ['Hydro', 'Dendro'] },
  { name: 'Quicken', elements: ['Electro', 'Dendro'] },
  { name: 'Swirl', elements: ['Anemo', 'Pyro'] },
  { name: 'Crystallize', elements: ['Geo', 'Pyro'] },
]

function getRating(score) {
  if (score >= 8) return { label: 'Legendary', tier: 's', stars: 5 }
  if (score >= 6) return { label: 'Strong', tier: 'a', stars: 4 }
  if (score >= 4) return { label: 'Good', tier: 'b', stars: 3 }
  if (score >= 2) return { label: 'Average', tier: 'c', stars: 2 }
  return { label: 'Meh...', tier: 'd', stars: 1 }
}

function TeamAnalysis({ team }) {
  const visions = team.map((char) => char.vision)

  const availableReactions = REACTIONS.filter((reaction) =>
    reaction.elements.every((el) => visions.includes(el))
  )

  const score = availableReactions.length * 2
  const rating = getRating(score)

  const allSameElement = new Set(visions).size === 1
  const hasAnemo = visions.includes('Anemo')
  const allSameNation = new Set(team.map((c) => c.nation)).size === 1

  return (
    <section className="team-analysis">
      <h2 className="team-analysis__title">Reasults</h2>

      <h3 className="team-analysis__subtitle">Elements</h3>
      <p className="team-analysis__elements">{visions.join(' · ')}</p>

      <h3 className="team-analysis__subtitle">Reactions</h3>
      {availableReactions.length > 0 ? (
        <ul className="team-analysis__reactions">
          {availableReactions.map((r) => (
            <li key={r.name} className="team-analysis__reaction">
              {r.name}
            </li>
          ))}
        </ul>
      ) : (
        <p className="team-analysis__empty">No reactions</p>
      )}

      <h3 className="team-analysis__subtitle">Rate:</h3>
      <p className="team-analysis__verdict">
        {rating.label} · {'★'.repeat(rating.stars)}
      </p>
    </section>
  )
}

export default TeamAnalysis

