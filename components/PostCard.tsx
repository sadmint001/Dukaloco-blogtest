
import React from 'react';
import { Post, User } from '../types';
import { ICONS } from '../constants';

interface PostCardProps {
  post: Post;
  currentUser: User | null;
  onEdit: (post: Post) => void;
  onDelete: (id: number) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, currentUser, onEdit, onDelete }) => {
  const isOwner = currentUser?.id === post.userId;
  const isAdmin = currentUser?.role === 'admin';
  const canModify = isOwner || isAdmin;

  return (
    <div className="glass-card rounded-[32px] p-8 hover:bg-slate-800/60 transition-all duration-500 group relative border border-white/5 flex flex-col h-full">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-slate-800 rounded-2xl flex items-center justify-center text-slate-300 text-sm font-bold border border-white/5 shadow-xl group-hover:scale-110 transition-transform duration-500">
            {post.authorName?.charAt(0) || 'U'}
          </div>
          <div>
            <p className="text-sm font-bold text-slate-200 group-hover:text-indigo-400 transition-colors">{post.authorName || `User ${post.userId}`}</p>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">Author</p>
          </div>
        </div>
        
        {canModify && (
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <button
              onClick={() => onEdit(post)}
              className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-indigo-400 bg-slate-800/50 hover:bg-indigo-500/10 rounded-xl border border-white/5 transition-all"
            >
              {ICONS.Edit}
            </button>
            <button
              onClick={() => onDelete(post.id)}
              className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-red-400 bg-slate-800/50 hover:bg-red-500/10 rounded-xl border border-white/5 transition-all"
            >
              {ICONS.Delete}
            </button>
          </div>
        )}
      </div>

      <h3 className="text-xl font-bold text-white mb-3 leading-tight tracking-tight group-hover:translate-x-1 transition-transform duration-500">
        {post.title}
      </h3>
      <p className="text-slate-400 text-sm line-clamp-4 leading-relaxed flex-1">
        {post.body}
      </p>

      <div className="flex items-center justify-between pt-6 mt-6 border-t border-white/5">
        <div className="flex gap-3">
          <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full font-bold uppercase tracking-widest border border-emerald-500/20">
            Published
          </span>
          {isOwner && (
            <span className="text-[10px] bg-indigo-500/10 text-indigo-400 px-3 py-1 rounded-full font-bold uppercase tracking-widest border border-indigo-500/20">
              Own Post
            </span>
          )}
        </div>
        <button className="text-indigo-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all">
          Details {ICONS.Next}
        </button>
      </div>
    </div>
  );
};

export default PostCard;
