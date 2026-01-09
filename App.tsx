
import React, { useMemo } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from './store/authStore';
import { useUIStore } from './store/uiStore';
import Layout from './components/layout/Layout';
import PostCard from './components/features/posts/PostCard';
import PostModal from './components/features/posts/PostModal';
import InsightsHub from './components/features/dashboard/InsightsHub';
import Logo from './components/ui/Logo';
import LoadingSpinner from './components/ui/LoadingSpinner';
import { usePosts } from './hooks/usePosts';
import { apiService } from './services/api.service';
import { PlusCircle } from 'lucide-react';
import { Post, User } from './types/index';

const MainApp: React.FC = () => {
  const queryClient = useQueryClient();
  
  const { user, isAuthenticated, login } = useAuthStore();
  const { 
    activeTab, 
    isModalOpen, 
    editingPost, 
    openModal, 
    closeModal 
  } = useUIStore();

  const { data: users = [] } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: apiService.fetchUsers,
  });

  const { 
    posts, 
    isLoading: postsLoading, 
    createPost, 
    updatePost, 
    deletePost 
  } = usePosts(users);

  const statsData = useMemo(() => {
    if (!posts.length || !users.length) return [];
    const counts: Record<number, number> = {};
    posts.forEach(p => {
      counts[p.userId] = (counts[p.userId] || 0) + 1;
    });
    
    return Object.entries(counts)
      .map(([userId, count]) => ({
        name: users.find(u => u.id === parseInt(userId))?.name.split(' ')[0] || `U${userId}`,
        count
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);
  }, [posts, users]);

  const handlePostSubmit = (data: Partial<Post>) => {
    if (editingPost) {
      updatePost.mutate({ id: editingPost.id, data }, {
        onSuccess: () => {
          queryClient.setQueryData(['posts'], (old: Post[] | undefined) => 
            (old || []).map(p => p.id === editingPost.id ? { ...p, ...data } : p)
          );
          closeModal();
        }
      });
    } else {
      createPost.mutate(data, {
        onSuccess: (newPost) => {
          const enrichedPost = {
            ...newPost,
            id: Math.max(...posts.map(p => p.id), 0) + 1,
            userId: user?.id || 1,
            authorName: user?.name || 'Session User'
          };
          queryClient.setQueryData(['posts'], (old: Post[] | undefined) => [enrichedPost, ...(old || [])]);
          closeModal();
        }
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 md:p-6 relative overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-indigo-600/10 rounded-full blur-[100px] animate-float"></div>
        <div className="max-w-[440px] w-full glass-card p-8 md:p-12 rounded-[40px] md:rounded-[48px] text-center shadow-2xl relative z-10 border border-white/10">
          <Logo className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-8 md:mb-10 drop-shadow-[0_15px_30px_rgba(168,218,220,0.3)] animate-float" />
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2 md:mb-3 tracking-tight">Dukaloco</h1>
          <p className="text-slate-400 mb-8 md:mb-10 text-xs md:text-sm font-medium">Authentication required for workspace access.</p>
          <div className="space-y-4">
            <button onClick={() => login('admin')} className="w-full bg-white text-slate-950 px-6 py-4 rounded-[20px] font-bold text-sm md:text-base transition-all hover:bg-indigo-50 active:scale-95 shadow-lg">Administrator Login</button>
            <button onClick={() => login('user')} className="w-full bg-slate-800 hover:bg-slate-700 text-white px-6 py-4 rounded-[20px] font-bold text-sm md:text-base transition-all active:scale-95 border border-white/5">Standard Member Access</button>
          </div>
          <p className="mt-8 md:mt-12 text-[10px] text-slate-500 font-bold uppercase tracking-[0.4em]">Secure Access Only</p>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6 mb-8 md:mb-12">
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tighter mb-1 md:mb-2">
            {activeTab === 'dashboard' ? 'Insight Hub' : 'Content Stream'}
          </h2>
          <div className="flex items-center gap-2">
             <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-emerald-500 animate-pulse"></div>
             <p className="text-slate-500 text-[10px] md:text-xs font-bold uppercase tracking-widest">System Optimal</p>
          </div>
        </div>
        {activeTab === 'posts' && (
          <button
            onClick={() => openModal()}
            className="flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 md:px-8 py-3.5 md:py-4 rounded-2xl font-bold text-sm md:text-base hover:shadow-[0_10px_30px_rgba(79,70,229,0.4)] transition-all transform hover:-translate-y-1 active:scale-95"
          >
            <PlusCircle className="w-5 h-5" />
            New Article
          </button>
        )}
      </div>

      {postsLoading ? (
        <LoadingSpinner />
      ) : activeTab === 'dashboard' ? (
        <InsightsHub postCount={posts.length} userCount={users.length} chartData={statsData} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
          {posts.map(post => (
            <PostCard
              key={post.id}
              post={post}
              currentUser={user}
              onEdit={(p) => openModal(p)}
              onDelete={(id) => deletePost.mutate(id, {
                onSuccess: () => queryClient.setQueryData(['posts'], (old: Post[] | undefined) => (old || []).filter(p => p.id !== id))
              })}
            />
          ))}
        </div>
      )}

      <PostModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handlePostSubmit}
        initialData={editingPost}
        isLoading={createPost.isPending || updatePost.isPending}
      />
    </Layout>
  );
};

const App: React.FC = () => (
  <MainApp />
);

export default App;
