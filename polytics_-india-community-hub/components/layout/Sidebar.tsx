
import React from 'react';
import type { Group } from '../../types';

interface SidebarProps {
  groups: Group[];
  onSelectGroup: (groupId: string) => void;
  onSelectHome: () => void;
  onSelectProblems: () => void;
  activeGroupId: string | null;
  activeView: 'home' | 'group' | 'problems';
}

const HomeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const AlertTriangleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>;
const UsersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;


const Sidebar: React.FC<SidebarProps> = ({ groups, onSelectGroup, onSelectHome, onSelectProblems, activeGroupId, activeView }) => {
  const baseClasses = "flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-700 hover:bg-orange-100 hover:text-orange-600 transition-colors duration-200 cursor-pointer";
  const activeClasses = "bg-orange-500 text-white hover:bg-orange-500 hover:text-white font-semibold";

  return (
    <aside className="w-64 bg-white flex-shrink-0 p-4 border-r border-slate-200 flex flex-col">
      <div className="text-2xl font-bold text-slate-800 mb-8">
        <span className="text-orange-500">Polytics</span>
      </div>
      <nav className="flex flex-col space-y-2">
        <div onClick={onSelectHome} className={`${baseClasses} ${activeView === 'home' ? activeClasses : ''}`}>
          <HomeIcon />
          <span>Home Feed</span>
        </div>
        <div onClick={onSelectProblems} className={`${baseClasses} ${activeView === 'problems' ? activeClasses : ''}`}>
          <AlertTriangleIcon />
          <span>Problem Hub</span>
        </div>
      </nav>
      <div className="mt-8">
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider px-4 mb-2">My Groups</h3>
        <div className="flex flex-col space-y-2">
          {groups.map(group => (
            <div 
              key={group.id} 
              onClick={() => onSelectGroup(group.id)}
              className={`${baseClasses} ${activeView === 'group' && activeGroupId === group.id ? activeClasses : ''}`}
            >
                <UsersIcon />
                <span>{group.name}</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
