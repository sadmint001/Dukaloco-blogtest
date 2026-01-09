
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiService } from '../services/api.service';
import { Post, User } from '../types';

export const usePosts = (users: User[]) => {
  const queryClient = useQueryClient();

  const postsQuery = useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: async () => {
      const postsData = await apiService.fetchPosts();
      return postsData.map(p => ({
        ...p,
        authorName: users.find(u => u.id === p.userId)?.name || `Contributor ${p.userId}`
      }));
    },
    enabled: !!users.length,
  });

  const createMutation = useMutation({
    mutationFn: apiService.createPost,
    onSuccess: (newPost, variables, context: any) => {
      // Logic for optimistic UI or cache update handled in App
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number, data: Partial<Post> }) => apiService.updatePost(id, data),
  });

  const deleteMutation = useMutation({
    mutationFn: apiService.deletePost,
  });

  return {
    posts: postsQuery.data || [],
    isLoading: postsQuery.isLoading,
    createPost: createMutation,
    updatePost: updateMutation,
    deletePost: deleteMutation,
  };
};
