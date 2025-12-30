
import React from 'react';
import type { User } from '../../types';
import Button from '../ui/Button';

interface HeaderProps {
  user: User;
  onLogout: () => void;
  title: string;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout, title }) => {
  return (
    <header className="bg-white shadow-sm p-4 flex justify-between items-center z-10">
      <h1 className="text-xl md:text-2xl font-bold text-slate-800">{title}</h1>
      <div className="flex items-center space-x-4">
        <div className="text-right hidden sm:block">
          <p className="font-semibold text-slate-700">{user.name}</p>
          <p className="text-sm text-slate-500">{user.city}, {user.state}</p>
        </div>
        <img src={user.avatarUrl} alt={user.name} className="w-10 h-10 rounded-full" />
        <Button onClick={onLogout} variant="secondary" className="text-sm">Logout</Button>
      </div>
    </header>
  );
};

export default Header;
