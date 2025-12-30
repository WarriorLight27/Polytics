
import React from 'react';
import Card from '../ui/Card';
import type { Post } from '../../types';
import { PostType } from '../../types';

interface FeedCardProps {
  post: Post;
}

const FeedCard: React.FC<FeedCardProps> = ({ post }) => {
  const isProblem = post.type === PostType.Problem;
  const authorName = post.isAnonymous ? 'Anonymous' : post.author.name;
  
  return (
    <Card className={`border-l-4 ${isProblem ? 'border-red-500' : 'border-blue-500'}`}>
      <div className="flex items-start space-x-4">
        <img src={post.author.avatarUrl} alt={authorName} className="w-12 h-12 rounded-full" />
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold text-slate-800">{authorName}</p>
              <p className="text-sm text-slate-500">in <span className="font-medium">{post.group.name}</span> &middot; {post.timestamp}</p>
            </div>
             {isProblem && <span className="text-xs font-bold uppercase text-red-500 bg-red-100 px-2 py-1 rounded-full">Problem Report</span>}
          </div>
          <p className="mt-4 text-slate-700">{post.content}</p>
        </div>
      </div>
    </Card>
  );
};

export default FeedCard;
