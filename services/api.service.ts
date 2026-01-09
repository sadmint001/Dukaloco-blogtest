
import { Post, User } from '../types';
import { API_BASE_URL } from '../constants';

export const apiService = {
  fetchPosts: async (): Promise<Post[]> => {
    const response = await fetch(`${API_BASE_URL}/posts`);
    if (!response.ok) throw new Error('Failed to fetch posts');
    return response.json();
  },

  fetchUsers: async (): Promise<User[]> => {
    const response = await fetch(`${API_BASE_URL}/users`);
    if (!response.ok) throw new Error('Failed to fetch users');
    return response.json();
  },

  createPost: async (post: Partial<Post>): Promise<Post> => {
    const response = await fetch(`${API_BASE_URL}/posts`, {
      method: 'POST',
      body: JSON.stringify(post),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    });
    if (!response.ok) throw new Error('Failed to create post');
    return response.json();
  },

  updatePost: async (id: number, post: Partial<Post>): Promise<Post> => {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(post),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    });
    if (!response.ok) throw new Error('Failed to update post');
    return response.json();
  },

  deletePost: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete post');
  }
};
