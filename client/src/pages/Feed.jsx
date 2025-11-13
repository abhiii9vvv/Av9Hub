import { useState, useEffect } from 'react';
import CreatePost from '../components/CreatePost';
import PostCard from '../components/PostCard';
import api from '../utils/api';
import { toast } from 'react-toastify';
import { defaultPosts } from '../utils/defaultPosts';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await api.get('/posts');
      // Combine default posts with real posts
      const allPosts = [...response.data, ...defaultPosts].sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      );
      setPosts(allPosts);
    } catch (error) {
      // If API fails, show default posts
      setPosts(defaultPosts);
      toast.info('Showing sample posts');
    } finally {
      setLoading(false);
    }
  };

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const handlePostDeleted = async (postId) => {
    // Check if it's a default post
    if (postId.startsWith('default-')) {
      toast.error('Cannot delete sample posts');
      return;
    }
    
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await api.delete(`/posts/${postId}`);
        setPosts(posts.filter(p => p._id !== postId));
        toast.success('Post deleted');
      } catch (error) {
        toast.error('Failed to delete post');
      }
    }
  };

  if (loading) {
    return (
      <div className="text-center p-6">
        <div style={{
          width: '3rem',
          height: '3rem',
          border: '4px solid #f3f4f6',
          borderTop: '4px solid #667eea',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          margin: '0 auto'
        }} />
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4" style={{ paddingBottom: '2rem' }}>
      <CreatePost onPostCreated={handlePostCreated} />
      
      {posts.length === 0 ? (
        <div className="bg-white rounded-lg p-6 text-center" style={{
          border: '2px dashed #e5e7eb',
          color: '#9ca3af'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📝</div>
          <p style={{ fontSize: '1.125rem', fontWeight: '500', marginBottom: '0.5rem' }}>No posts yet</p>
          <p style={{ fontSize: '0.875rem' }}>Be the first to share something!</p>
        </div>
      ) : (
        posts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            onDelete={handlePostDeleted}
          />
        ))
      )}
    </div>
  );
};

export default Feed;
