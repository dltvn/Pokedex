import React, { useState } from "react";

export default function TeamList({ teams, selectedTeam, onSelectTeam, onUpdateTeamName, isDropdown }) {
  const [editingTeamId, setEditingTeamId] = useState(null); // ID of the team being edited
  const [newTeamName, setNewTeamName] = useState(''); // New name for the team being edited

  const handleEditClick = (teamId, currentName, event) => { // Start editing a team name
    event.stopPropagation();
    setEditingTeamId(teamId);
    setNewTeamName(currentName);
  };

  const handleChange = (e) => { // Handle changes to the team name input
    setNewTeamName(e.target.value);
  };

  const handleSave = (teamId, event) => { // Save the new team name
    event.stopPropagation();
    if (newTeamName.trim() !== '') {
      onUpdateTeamName(teamId, newTeamName);
    }
    setEditingTeamId(null);
  };

  const handleKeyDown = (e, teamId) => { // Handle Enter key press to save team name
    if (e.key === "Enter") {
      handleSave(teamId, e);
    }
  };

  return (
    <div className={`w-full ${isDropdown ? '' : 'md:w-64'} space-y-2`}>
      {teams.map((team) => (
        <div
          key={team.id}
          onClick={() => onSelectTeam(team.id)}
          className={`p-2 border-2 rounded border-gray25 cursor-pointer ${
            selectedTeam === team.id ? 'bg-poke_blue text-white' : ''
          } flex items-center justify-between`}
        >
          <div className="flex-grow flex items-center">
            {editingTeamId === team.id ? ( // Render input field when editing
              <input
                type="text"
                maxLength={15}
                value={newTeamName}
                onChange={handleChange}
                onKeyDown={(e) => handleKeyDown(e, team.id)}
                autoFocus
                className="w-full text-black rounded p-1"
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <span className={selectedTeam === team.id ? 'text-white' : 'text-black'}>
                {team.name}
              </span>
            )}
          </div>
          <div className="flex items-center">
            {editingTeamId === team.id ? ( // Render save button when editing
              <button
                onClick={(e) => handleSave(team.id, e)}
                className="ml-2 p-1 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
                aria-label="Save team name"
              >
                ✓
              </button>
            ) : ( // Render edit button when not editing
              <button
                onClick={(e) => handleEditClick(team.id, team.name, e)}
                className="ml-2 p-1 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
                aria-label="Edit team name"
              >
                ✎
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

