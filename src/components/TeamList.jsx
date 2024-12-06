import { useState } from "react";

export default function TeamList({ teams, selectedTeam, onSelectTeam, onUpdateTeamName }) {
  const [editingTeamId, setEditingTeamId] = useState(null);
  const [newTeamName, setNewTeamName] = useState('');

  const handleDoubleClick = (teamId, currentName) => {
    setEditingTeamId(teamId);
    setNewTeamName(currentName);
  };

  const handleChange = (e) => {
    setNewTeamName(e.target.value);
    // Immediately update the team name live
    if (editingTeamId) {
      onUpdateTeamName(editingTeamId, e.target.value);
    }
  };

  const handleBlur = () => {
    setEditingTeamId(null); // Finish editing, revert to normal button
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleBlur(); // Save changes and exit edit mode when Enter is pressed
    }
  };

  return (
    <div className="w-64 space-y-4">
      <div className="space-y-2">
        {teams.map((team) => (
          <div key={team.id} className="space-y-2">
            <div
              onClick={() => onSelectTeam(team.id)} // Single-click to select
              onDoubleClick={() => handleDoubleClick(team.id, team.name)} // Double-click anywhere on the box to edit
              className={`p-2 border-2 border-gray-300 cursor-pointer bg-[#f0f0f0] 
                ${selectedTeam === team.id ? 'bg-poke_blue text-white' : ''}`}
            >
              {editingTeamId === team.id ? (
                <input
                  type="text"
                  value={newTeamName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onKeyDown={handleKeyDown} // Handle Enter key press
                  autoFocus
                  className="w-full p-1 border-2 border-gray-300 rounded text-black" // Make text black in input
                  style={{ boxSizing: 'border-box' }} // Ensure the input fits within the div
                />
              ) : (
                <span className="text-black">
                  {team.name}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
