import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import PostCard from '../components/PostCard';
import api from '../utils/api';
import { toast } from 'react-toastify';
import { FaEdit } from 'react-icons/fa';

const Profile = () => {
  const { username } = useParams();
  const { user: currentUser } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, [username]);

  const fetchProfile = async () => {
    try {
      const response = await api.get(`/users/${username}`);
      setProfile(response.data.user);
      setPosts(response.data.posts);
      setIsFollowing(response.data.user.followers?.some(f => f._id === currentUser?.id));
    } catch (error) {
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleFollow = async () => {
    try {
      await api.post(`/follows/${profile._id}`);
      setIsFollowing(!isFollowing);
      setProfile({
        ...profile,
        followers: isFollowing
          ? profile.followers.filter(f => f._id !== currentUser.id)
          : [...profile.followers, { _id: currentUser.id }]
      });
    } catch (error) {
      toast.error('Failed to follow/unfollow');
    }
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

  if (!profile) {
    return <div className="text-center p-6">User not found</div>;
  }

  const isOwnProfile = currentUser?.username === username;

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="bg-white rounded-lg shadow mb-4">
        {profile.coverPhoto && (
          <img src={profile.coverPhoto} alt="Cover" className="w-full rounded-t-lg" style={{ height: '200px', objectFit: 'cover' }} />
        )}
        
        <div className="p-6">
          <div className="flex items-start gap-4">
            <img 
              src={profile.avatar || `https://api.dicebear.com/7.x/thumbs/svg?seed=${profile.username}&backgroundColor=b6e3f4`} 
              alt={profile.username} 
              className="rounded-full" 
              onError={(e) => {
                e.target.src = `https://api.dicebear.com/7.x/thumbs/svg?seed=${profile.username}&backgroundColor=b6e3f4`;
              }}
              style={{ width: '6rem', height: '6rem', objectFit: 'cover', marginTop: '-3rem', border: '4px solid white' }} 
            />
            
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="font-bold" style={{ fontSize: '1.5rem' }}>{profile.fullName}</h1>
                  <p className="text-gray-600">@{profile.username}</p>
                </div>
                
                {isOwnProfile ? (
                  <Link to="/edit-profile" className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition" style={{ textDecoration: 'none', color: '#374151' }}>
                    <FaEdit />
                    Edit Profile
                  </Link>
                ) : (
                  <button
                    onClick={handleFollow}
                    className={`px-4 py-2 rounded-lg transition ${
                      isFollowing
                        ? 'bg-gray-500 text-white hover:bg-gray-600'
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                  >
                    {isFollowing ? 'Unfollow' : 'Follow'}
                  </button>
                )}
              </div>

              <p className="mt-4">{profile.bio || 'No bio yet'}</p>

              <div className="flex gap-4 mt-4">
                <div className="text-center">
                  <div className="font-bold">{posts.length}</div>
                  <div className="text-sm text-gray-600">Posts</div>
                </div>
                <div className="text-center">
                  <div className="font-bold">{profile.followers?.length || 0}</div>
                  <div className="text-sm text-gray-600">Followers</div>
                </div>
                <div className="text-center">
                  <div className="font-bold">{profile.following?.length || 0}</div>
                  <div className="text-sm text-gray-600">Following</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="font-bold mb-4" style={{ fontSize: '1.25rem' }}>Posts</h2>
        {posts.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-6 text-center text-gray-600">
            <p>No posts yet</p>
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
    </div>
  );
};

export default Profile;
