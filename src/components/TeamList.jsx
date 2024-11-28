export default function TeamList({ teams, selectedTeam, onSelectTeam, onUpdateTeamName, onAddTeam }) {
  return (
    <div className="w-64 space-y-4">
      <div className="space-y-2">
        {teams.map((team) => (
          <div key={team.id} className="space-y-2">
            <input
              type="text"
              value={team.name}
              onChange={(e) => onUpdateTeamName(team.id, e.target.value)}
              className="w-full p-1 border border-gray-300 bg-white rounded text-sm"
            />
            <div
              onClick={() => onSelectTeam(team.id)}
              className={`p-2 border-2 border-gray-300 cursor-pointer bg-[#f0f0f0] 
                ${selectedTeam === team.id ? 'bg-blue-500 text-white' : ''}`}
            >
              {team.name}
            </div>
          </div>
        ))}
      </div>
      <button 
        onClick={onAddTeam}
        className="w-full p-2 border-2 border-gray-300 bg-white hover:bg-gray-50"
      >
        Add New Team
      </button>
    </div>
  )
}

