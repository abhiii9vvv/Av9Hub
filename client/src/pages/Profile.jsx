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
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1rem' }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
        marginBottom: '1.5rem',
        overflow: 'hidden'
      }}>
        {profile.coverPhoto ? (
          <img 
            src={profile.coverPhoto} 
            alt="Cover" 
            onError={(e) => {
              e.target.style.display = 'none';
            }}
            style={{ 
              width: '100%', 
              height: '250px', 
              objectFit: 'cover',
              display: 'block'
            }} 
          />
        ) : (
          <div style={{
            width: '100%',
            height: '250px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
          }} />
        )}
        
        <div style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
            <img 
              src={profile.avatar || `https://api.dicebear.com/7.x/thumbs/svg?seed=${profile.username}&backgroundColor=b6e3f4`} 
              alt={profile.username} 
              onError={(e) => {
                e.target.src = `https://api.dicebear.com/7.x/thumbs/svg?seed=${profile.username}&backgroundColor=b6e3f4`;
              }}
              style={{ 
                width: '120px', 
                height: '120px', 
                objectFit: 'cover', 
                borderRadius: '50%',
                marginTop: '-60px', 
                border: '5px solid white',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
              }} 
            />
            
            <div style={{ flex: 1, paddingTop: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                  <h1 style={{ fontSize: '1.75rem', fontWeight: '700', color: '#1f2937', marginBottom: '0.25rem' }}>{profile.fullName}</h1>
                  <p style={{ color: '#6b7280', fontSize: '1rem' }}>@{profile.username}</p>
                </div>
                
                {isOwnProfile ? (
                  <Link 
                    to="/edit-profile" 
                    style={{ 
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.625rem 1.25rem',
                      border: '2px solid #e5e7eb',
                      borderRadius: '12px',
                      textDecoration: 'none',
                      color: '#374151',
                      fontWeight: '600',
                      fontSize: '0.95rem',
                      backgroundColor: 'white',
                      transition: 'all 0.2s',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#f9fafb';
                      e.currentTarget.style.borderColor = '#667eea';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'white';
                      e.currentTarget.style.borderColor = '#e5e7eb';
                    }}
                  >
                    <FaEdit />
                    Edit Profile
                  </Link>
                ) : (
                  <button
                    onClick={handleFollow}
                    style={{
                      padding: '0.625rem 1.5rem',
                      borderRadius: '12px',
                      border: 'none',
                      fontWeight: '600',
                      fontSize: '0.95rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      background: isFollowing ? '#6b7280' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-1px)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    {isFollowing ? 'Unfollow' : 'Follow'}
                  </button>
                )}
              </div>

              <p style={{ 
                marginTop: '1rem',
                fontSize: '0.95rem',
                lineHeight: '1.6',
                color: '#374151'
              }}>{profile.bio || 'No bio yet'}</p>

              <div style={{ 
                display: 'flex', 
                gap: '2rem', 
                marginTop: '1.5rem',
                paddingTop: '1rem',
                borderTop: '1px solid #f3f4f6'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1f2937' }}>{posts.length}</div>
                  <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem' }}>Posts</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1f2937' }}>{profile.followers?.length || 0}</div>
                  <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem' }}>Followers</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1f2937' }}>{profile.following?.length || 0}</div>
                  <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem' }}>Following</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 style={{ 
          fontSize: '1.25rem',
          fontWeight: '700',
          marginBottom: '1rem',
          color: '#1f2937'
        }}>Posts</h2>
        {posts.length === 0 ? (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
            padding: '3rem',
            textAlign: 'center',
            color: '#6b7280'
          }}>
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
