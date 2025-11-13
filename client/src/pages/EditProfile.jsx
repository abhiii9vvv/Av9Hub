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
    <div className="max-w-2xl mx-auto px-4">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="font-bold mb-4" style={{ fontSize: '1.5rem' }}>Edit Profile</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="text-gray-700 mb-2" style={{ display: 'block' }}>Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="text-gray-700 mb-2" style={{ display: 'block' }}>Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows="4"
              placeholder="Tell us about yourself"
              style={{ resize: 'vertical' }}
            />
          </div>

          <div className="mb-4">
            <label className="text-gray-700 mb-2" style={{ display: 'block' }}>Avatar URL</label>
            <input
              type="text"
              name="avatar"
              value={formData.avatar}
              onChange={handleChange}
              placeholder="https://example.com/avatar.jpg"
            />
            {formData.avatar && (
              <img src={formData.avatar} alt="Avatar preview" className="mt-2 rounded-full" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
            )}
          </div>

          <div className="mb-4">
            <label className="text-gray-700 mb-2" style={{ display: 'block' }}>Cover Photo URL</label>
            <input
              type="text"
              name="coverPhoto"
              value={formData.coverPhoto}
              onChange={handleChange}
              placeholder="https://example.com/cover.jpg"
            />
            {formData.coverPhoto && (
              <img src={formData.coverPhoto} alt="Cover preview" className="mt-2 rounded-lg w-full" style={{ maxHeight: '200px', objectFit: 'cover' }} />
            )}
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
            
            <button
              type="button"
              onClick={() => navigate(`/profile/${user.username}`)}
              className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition"
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
