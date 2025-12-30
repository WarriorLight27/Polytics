
export interface User {
  id: string;
  name: string;
  avatarUrl: string;
  dob: string;
  religion: string;
  caste: string;
  city: string;
  state: string;
  school: string;
  college: string;
  hobbies: string[];
  interests: string[];
  sunSign: string;
}

export interface Group {
  id: string;
  name:string;
  description: string;
  memberCount: number;
  type: 'Location' | 'Interest' | 'Institution';
}

export enum PostType {
  Discussion = 'Discussion',
  Problem = 'Problem',
}

export interface Post {
  id: string;
  author: Pick<User, 'id' | 'name' | 'avatarUrl'>;
  group: Pick<Group, 'id' | 'name'>;
  content: string;
  timestamp: string;
  type: PostType;
  isAnonymous: boolean;
}

export type Problem = Post & {
  type: PostType.Problem;
};

export interface AnalysisResult {
    issue: string;
    summary: string;
    count: number;
}
