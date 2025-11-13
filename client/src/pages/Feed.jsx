import { useState, useEffect } from 'react';
import CreatePost from '../components/CreatePost';
import PostCard from '../components/PostCard';
import api from '../utils/api';
import { toast } from 'react-toastify';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await api.get('/posts');
      setPosts(response.data);
    } catch (error) {
      toast.error('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const handlePostDeleted = async (postId) => {
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
    return <div className="text-center p-6">Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto px-4">
      <CreatePost onPostCreated={handlePostCreated} />
      
      {posts.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center text-gray-600">
          <p>No posts yet. Be the first to post something!</p>
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
