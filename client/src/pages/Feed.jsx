import { useState, useEffect } from 'react';
import CreatePost from '../components/CreatePost';
import PostCard from '../components/PostCard';
import Sidebar from '../components/Sidebar';
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
    <div style={{ 
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '1.5rem'
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) 300px',
        gap: '1.5rem',
        alignItems: 'start'
      }}>
        {/* Main Feed */}
        <div style={{ maxWidth: '600px', margin: '0 auto', width: '100%' }} className="fade-in">
        <CreatePost onPostCreated={handlePostCreated} />
        
        {posts.map((post, index) => (
          <div key={post._id} style={{ animationDelay: `${index * 0.05}s` }} className="fade-in">
            <PostCard
              post={post}
              onDelete={handlePostDeleted}
            />
          </div>
        ))}
        </div>
        
        {/* Right Sidebar */}
        <Sidebar />
      </div>
    </div>
  );
};

export default Feed;
