
import React, { useState, useEffect, useCallback } from 'react';
import type { User, Group, Post } from '../../types';
import Header from '../layout/Header';
import Sidebar from '../layout/Sidebar';
import FeedCard from './FeedCard';
import ProblemAnalysis from '../problems/ProblemAnalysis';
import Spinner from '../ui/Spinner';
import { getMockGroups, getMockPosts } from '../../services/api';

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

type View = 'home' | 'group' | 'problems';

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [view, setView] = useState<View>('home');
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const [groups, setGroups] = useState<Group[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    const [userGroups, feedPosts] = await Promise.all([
        getMockGroups(),
        getMockPosts()
    ]);
    setGroups(userGroups);
    setPosts(feedPosts);
    setLoading(false);
  }, []);
  
  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const handleSelectGroup = async (groupId: string) => {
    setLoading(true);
    setSelectedGroupId(groupId);
    setView('group');
    const groupPosts = await getMockPosts(groupId);
    setPosts(groupPosts);
    setLoading(false);
  };

  const handleSelectHome = async () => {
    setLoading(true);
    setSelectedGroupId(null);
    setView('home');
    const allPosts = await getMockPosts();
    setPosts(allPosts);
    setLoading(false);
  };
  
  const handleSelectProblems = () => {
    setView('problems');
  };

  const renderContent = () => {
    if (loading) {
      return <div className="flex justify-center items-center h-full"><Spinner /></div>;
    }

    if (view === 'problems') {
        // Find the user's primary location group to analyze problems for.
        const locationGroup = groups.find(g => g.name.includes(user.city) && g.type === 'Location');
        return locationGroup ? <ProblemAnalysis areaGroup={locationGroup} /> : <p>No location-based problem group found.</p>;
    }
    
    return (
        <div className="space-y-4">
            {posts.map(post => <FeedCard key={post.id} post={post} />)}
        </div>
    );
  };
  
  const getHeaderTitle = () => {
    if(view === 'home') return 'Home Feed';
    if(view === 'problems') return 'Community Problem Analysis';
    if(view === 'group' && selectedGroupId) {
        return groups.find(g => g.id === selectedGroupId)?.name || 'Group Feed';
    }
    return 'Feed';
  }

  return (
    <div className="flex h-screen bg-slate-100">
      <Sidebar 
        groups={groups} 
        onSelectGroup={handleSelectGroup}
        onSelectHome={handleSelectHome}
        onSelectProblems={handleSelectProblems}
        activeGroupId={selectedGroupId}
        activeView={view}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={user} onLogout={onLogout} title={getHeaderTitle()} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-100 p-4 md:p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
