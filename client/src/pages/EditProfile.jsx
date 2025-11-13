import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';
import { toast } from 'react-toastify';

const EditProfile = () => {
  const { user, loadUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    bio: '',
    avatar: '',
    coverPhoto: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || '',
        bio: user.bio || '',
        avatar: user.avatar || '',
        coverPhoto: user.coverPhoto || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.put('/users/profile', formData);
      await loadUser();
      toast.success('Profile updated successfully!');
      navigate(`/profile/${user.username}`);
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '0 1rem' }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
        padding: '2rem'
      }}>
        <h2 style={{ 
          fontSize: '1.75rem',
          fontWeight: '700',
          marginBottom: '2rem',
          color: '#1f2937'
        }}>Edit Profile</h2>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ 
              display: 'block',
              color: '#374151',
              fontSize: '0.95rem',
              fontWeight: '600',
              marginBottom: '0.5rem'
            }}>Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                border: '2px solid #e5e7eb',
                borderRadius: '12px',
                fontSize: '1rem',
                transition: 'all 0.2s',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ 
              display: 'block',
              color: '#374151',
              fontSize: '0.95rem',
              fontWeight: '600',
              marginBottom: '0.5rem'
            }}>Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows="4"
              placeholder="Tell us about yourself"
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                border: '2px solid #e5e7eb',
                borderRadius: '12px',
                fontSize: '1rem',
                transition: 'all 0.2s',
                resize: 'vertical',
                fontFamily: 'inherit',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ 
              display: 'block',
              color: '#374151',
              fontSize: '0.95rem',
              fontWeight: '600',
              marginBottom: '0.5rem'
            }}>Avatar URL</label>
            <input
              type="text"
              name="avatar"
              value={formData.avatar}
              onChange={handleChange}
              placeholder="https://i.ibb.co/xxxxxxx/avatar.jpg"
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                border: '2px solid #e5e7eb',
                borderRadius: '12px',
                fontSize: '1rem',
                transition: 'all 0.2s',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
            {formData.avatar && (
              <img 
                src={formData.avatar} 
                alt="Avatar preview" 
                onError={(e) => {
                  e.target.src = `https://api.dicebear.com/7.x/thumbs/svg?seed=${user?.username}&backgroundColor=b6e3f4`;
                }}
                style={{ 
                  marginTop: '1rem',
                  width: '120px',
                  height: '120px',
                  objectFit: 'cover',
                  borderRadius: '50%',
                  border: '3px solid #e5e7eb'
                }} 
              />
            )}
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{ 
              display: 'block',
              color: '#374151',
              fontSize: '0.95rem',
              fontWeight: '600',
              marginBottom: '0.5rem'
            }}>Cover Photo URL</label>
            <input
              type="text"
              name="coverPhoto"
              value={formData.coverPhoto}
              onChange={handleChange}
              placeholder="https://i.ibb.co/xxxxxxx/cover.jpg"
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                border: '2px solid #e5e7eb',
                borderRadius: '12px',
                fontSize: '1rem',
                transition: 'all 0.2s',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
            {formData.coverPhoto && (
              <img 
                src={formData.coverPhoto} 
                alt="Cover preview" 
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
                style={{ 
                  marginTop: '1rem',
                  width: '100%',
                  maxHeight: '250px',
                  objectFit: 'cover',
                  borderRadius: '12px',
                  border: '2px solid #e5e7eb'
                }} 
              />
            )}
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              type="submit"
              disabled={loading}
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                padding: '0.75rem 2rem',
                borderRadius: '12px',
                fontSize: '1rem',
                fontWeight: '600',
                border: 'none',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                opacity: loading ? 0.7 : 1
              }}
              onMouseEnter={(e) => !loading && (e.target.style.transform = 'translateY(-2px)')}
              onMouseLeave={(e) => !loading && (e.target.style.transform = 'translateY(0)')}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
            
            <button
              type="button"
              onClick={() => navigate(`/profile/${user.username}`)}
              style={{
                backgroundColor: '#6b7280',
                color: 'white',
                padding: '0.75rem 2rem',
                borderRadius: '12px',
                fontSize: '1rem',
                fontWeight: '600',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#4b5563';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#6b7280';
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
