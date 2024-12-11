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
      {/* Dropdown Trigger */}
      <div
        className="teamMenu cursor-pointer text-black px-4 py-2 flex justify-between items-center"
        onClick={toggleDropdown}
      >
        <span>{teams.find((team) => team.id === selectedTeam)?.name || "Select Team"}</span>
        <span>{isDropdownOpen ? "▲" : "▼"}</span>
      </div>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="flex justify-center absolute left-0 w-full shadow-lg z-20 h-[calc(100vh-50px)] bg-poke_blue bg-opacity-20 backdrop-blur-md">
          <div className="mt-5">
          <TeamList
            teams={teams}
            selectedTeam={selectedTeam}
            onSelectTeam={(teamId) => {
              onSelectTeam(teamId); // Update the selected team
              toggleDropdown(); // Close the dropdown
            }}
            onUpdateTeamName={onUpdateTeamName} // Pass any additional props required for updates
          />
        </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
