import React from "react";
import TeamList from "./TeamList";

const Dropdown = ({
  teams,
  selectedTeam,
  onSelectTeam,
  onUpdateTeamName,
  isDropdownOpen,
  toggleDropdown,
}) => {
  return (
    <div className="relative">
      <div // Dropdown trigger
        className="teamMenu cursor-pointer text-black px-4 py-2 flex justify-between items-center bg-white rounded-md shadow-md"
        onClick={toggleDropdown}
      >
        <span>{teams.find((team) => team.id === selectedTeam)?.name || "Select Team"}</span>
        <span>{isDropdownOpen ? "▲" : "▼"}</span>
      </div>

      {isDropdownOpen && ( // Dropdown menu
        <div className="fixed inset-0 z-20 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-blue-400 rounded-lg shadow-xl w-11/12 max-w-md max-h-[80vh] overflow-y-auto">
            <div className="p-4">
              <h2 className="text-xl font-bold mb-4">Select Team</h2>
              <TeamList // Render TeamList component inside dropdown
                teams={teams}
                selectedTeam={selectedTeam}
                onSelectTeam={(teamId) => {
                  onSelectTeam(teamId);
                  toggleDropdown();
                }}
                onUpdateTeamName={onUpdateTeamName}
                isDropdown={true}
              />
            </div>
            <div className="border-t p-4">
              <button // Close dropdown button
                onClick={toggleDropdown}
                className="w-full bg-red-500 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;

