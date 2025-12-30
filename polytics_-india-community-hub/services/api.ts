
import { MOCK_USER, MOCK_GROUPS, MOCK_POSTS } from '../constants';
import type { User, Group, Post, Problem } from '../types';
import { PostType } from '../types';

const simulateDelay = <T,>(data: T, delay: number = 500): Promise<T> => {
  return new Promise(resolve => setTimeout(() => resolve(data), delay));
};

export const getMockUser = (): Promise<User> => {
  return simulateDelay(MOCK_USER);
};

export const getMockGroups = (): Promise<Group[]> => {
  return simulateDelay(MOCK_GROUPS);
};

export const getMockPosts = (groupId?: string): Promise<Post[]> => {
  const posts = groupId ? MOCK_POSTS.filter(p => p.group.id === groupId) : MOCK_POSTS;
  return simulateDelay(posts);
};

export const getMockProblems = (areaGroupId: string): Promise<Problem[]> => {
    const problems = MOCK_POSTS.filter(p => p.group.id === areaGroupId && p.type === PostType.Problem) as Problem[];
    return simulateDelay(problems);
};
