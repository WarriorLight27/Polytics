
import { User, Group, Post, PostType } from './types';

export const INDIAN_STATES: string[] = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya',
  'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim',
  'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
];

export const MOCK_USER: User = {
  id: 'u1',
  name: 'Arjun Sharma',
  avatarUrl: 'https://picsum.photos/seed/arjun/100/100',
  dob: '1995-08-15',
  religion: 'Hinduism',
  caste: 'Brahmin',
  city: 'Mumbai',
  state: 'Maharashtra',
  school: 'Delhi Public School, Mumbai',
  college: 'IIT Bombay',
  hobbies: ['Cricket', 'Reading', 'Trekking'],
  interests: ['Technology', 'Politics', 'Finance'],
  sunSign: 'Leo',
};

export const MOCK_GROUPS: Group[] = [
  { id: 'g1', name: 'Mumbai, Maharashtra', description: 'Community for residents of Mumbai.', memberCount: 12500, type: 'Location' },
  { id: 'g2', name: 'IIT Bombay Alumni', description: 'Connecting all alumni of IIT Bombay.', memberCount: 5000, type: 'Institution' },
  { id: 'g3', name: 'Indian Cricket Fans', description: 'A place for all cricket lovers in India.', memberCount: 89000, type: 'Interest' },
  { id: 'g4', name: 'Andheri West Society', description: 'Local updates for Andheri West.', memberCount: 350, type: 'Location' },
];

export const MOCK_POSTS: Post[] = [
  {
    id: 'p1',
    author: { id: 'u2', name: 'Priya Patel', avatarUrl: 'https://picsum.photos/seed/priya/100/100' },
    group: { id: 'g1', name: 'Mumbai, Maharashtra' },
    content: 'The traffic near the Western Express Highway is unbearable today. Any updates on the cause?',
    timestamp: '2 hours ago',
    type: PostType.Discussion,
    isAnonymous: false,
  },
  {
    id: 'p2',
    author: { id: 'u1', name: 'Arjun Sharma', avatarUrl: 'https://picsum.photos/seed/arjun/100/100' },
    group: { id: 'g4', name: 'Andheri West Society' },
    content: 'The road outside our society gate has a massive pothole. It\'s dangerous for two-wheelers especially at night. Can the authorities look into this?',
    timestamp: '5 hours ago',
    type: PostType.Problem,
    isAnonymous: false,
  },
  {
    id: 'p3',
    author: { id: 'u3', name: 'Rohan Verma', avatarUrl: 'https://picsum.photos/seed/rohan/100/100' },
    group: { id: 'g3', name: 'Indian Cricket Fans' },
    content: 'What a thrilling match yesterday! What are your predictions for the final?',
    timestamp: '1 day ago',
    type: PostType.Discussion,
    isAnonymous: false,
  },
  {
    id: 'p4',
    author: { id: 'u1', name: 'Anonymous', avatarUrl: 'https://picsum.photos/seed/anon/100/100' },
    group: { id: 'g4', name: 'Andheri West Society' },
    content: 'Garbage has not been collected for the past 3 days in our lane. The smell is becoming a huge issue.',
    timestamp: '1 day ago',
    type: PostType.Problem,
    isAnonymous: true,
  },
    {
    id: 'p5',
    author: { id: 'u5', name: 'Sunita Rao', avatarUrl: 'https://picsum.photos/seed/sunita/100/100' },
    group: { id: 'g4', name: 'Andheri West Society' },
    content: 'Street light on road number 5 is not working. It\'s very dark and feels unsafe after 8 PM.',
    timestamp: '2 days ago',
    type: PostType.Problem,
    isAnonymous: false,
  },
  {
    id: 'p6',
    author: { id: 'u6', name: 'Anonymous', avatarUrl: 'https://picsum.photos/seed/anon2/100/100' },
    group: { id: 'g4', name: 'Andheri West Society' },
    content: 'Constant water logging near the metro station entrance after even a small amount of rain. The drainage system needs to be checked.',
    timestamp: '3 days ago',
    type: PostType.Problem,
    isAnonymous: true,
  }
];
