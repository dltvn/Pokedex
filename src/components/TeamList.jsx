import React, { useState } from "react";

export default function TeamList({ teams, selectedTeam, onSelectTeam, onUpdateTeamName }) {
  const [editingTeamId, setEditingTeamId] = useState(null);
  const [newTeamName, setNewTeamName] = useState('');

  const handleDoubleClick = (teamId, currentName) => {
    setEditingTeamId(teamId);
    setNewTeamName(currentName);
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    setNewTeamName(newValue);

    if (editingTeamId && newValue.trim() !== '') {
      onUpdateTeamName(editingTeamId, newValue);
    }
  };

  const handleBlur = () => {
    setEditingTeamId(null);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleBlur();
    }
  };

  return (
    <div className="w-64 space-y-4">
      <div className="space-y-2">
        {teams.map((team) => (
          <div key={team.id} className="space-y-2">
            <div
              onClick={() => onSelectTeam(team.id)}
              onDoubleClick={() => handleDoubleClick(team.id, team.name)}
              className={`p-2 border-2 border-gray-300 cursor-pointer bg-[#f0f0f0] ${selectedTeam === team.id ? 'bg-poke_blue text-white' : ''}`}
              style={{ minHeight: '40px', display: 'flex', alignItems: 'center' }}
            >
              {editingTeamId === team.id ? (
                <div className="w-full" style={{ minHeight: '24px' }}>
                  <input
                    type="text"
                    maxLength={15}
                    placeholder={newTeamName.trim() === '' ? 'Name the team' : ''}
                    value={newTeamName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    autoFocus
                    className="w-full text-black rounded"
                    style={{
                      boxSizing: 'border-box',
                      minHeight: '24px',
                      height: '100%',
                      padding: '2px 4px',
                      border: '1px solid #ccc',
                    }}
                  />
                </div>
              ) : (
                <span className="text-black">{team.name}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
