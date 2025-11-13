import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { FaImage } from 'react-icons/fa';
import api from '../utils/api';
import { toast } from 'react-toastify';

const CreatePost = ({ onPostCreated }) => {
  const { user } = useContext(AuthContext);
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) {
      toast.error('Please write something');
      return;
    }

    setLoading(true);
    try {
      const response = await api.post('/posts', { content, image });
      setContent('');
      setImage('');
      onPostCreated(response.data);
      toast.success('Post created successfully!');
    } catch (error) {
      toast.error('Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow mb-4 p-4">
      <div className="flex gap-2 mb-4">
        <img src={user?.avatar} alt={user?.username} className="h-12 rounded-full" style={{ width: '3rem', height: '3rem', objectFit: 'cover' }} />
        <div className="flex-1">
          <textarea
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="3"
            style={{ resize: 'vertical' }}
          />
        </div>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Image URL (optional)"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </div>

      {image && (
        <div className="mb-4">
          <img src={image} alt="Preview" className="w-full rounded-lg" style={{ maxHeight: '300px', objectFit: 'cover' }} />
        </div>
      )}

      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <button type="button" className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded transition" style={{ backgroundColor: 'transparent' }}>
            <FaImage className="text-blue-500" />
            <span className="text-sm">Photo</span>
          </button>
        </div>
        
        <button
          onClick={handleSubmit}
          disabled={loading || !content.trim()}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          {loading ? 'Posting...' : 'Post'}
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
