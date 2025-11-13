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
    <div className="bg-white rounded-lg mb-4" style={{ 
      padding: '1.5rem',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb'
    }}>
      <div className="flex gap-3 mb-4">
        <img 
          src={user?.avatar} 
          alt={user?.username} 
          className="rounded-full" 
          style={{ 
            width: '3rem', 
            height: '3rem', 
            objectFit: 'cover',
            border: '2px solid #e5e7eb'
          }} 
        />
        <div className="flex-1">
          <textarea
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="3"
            style={{ 
              resize: 'vertical',
              border: '2px solid #e5e7eb',
              borderRadius: '0.75rem',
              padding: '0.75rem 1rem',
              fontSize: '0.95rem',
              transition: 'all 0.2s'
            }}
            onFocus={(e) => e.target.style.borderColor = '#667eea'}
            onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
          />
        </div>
      </div>

      {image && (
        <div className="mb-4" style={{ position: 'relative' }}>
          <img 
            src={image} 
            alt="Preview" 
            className="w-full rounded-lg" 
            style={{ 
              maxHeight: '300px', 
              objectFit: 'cover',
              border: '2px solid #e5e7eb'
            }} 
          />
          <button
            onClick={() => setImage('')}
            style={{
              position: 'absolute',
              top: '0.5rem',
              right: '0.5rem',
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              color: 'white',
              padding: '0.5rem',
              borderRadius: '50%',
              width: '2rem',
              height: '2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            ×
          </button>
        </div>
      )}

      <div className="flex justify-between items-center" style={{ 
        borderTop: '1px solid #f3f4f6',
        paddingTop: '1rem',
        marginTop: '0.5rem'
      }}>
        <div className="flex gap-2">
          <button 
            type="button" 
            onClick={() => {
              const url = prompt('Enter image URL:');
              if (url) setImage(url);
            }}
            className="flex items-center gap-2 px-3 py-2 rounded-lg transition" 
            style={{ 
              backgroundColor: 'transparent',
              color: '#667eea',
              border: '1px solid #e5e7eb'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#f9fafb'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            <FaImage />
            <span className="text-sm">Photo</span>
          </button>
        </div>
        
        <button
          onClick={handleSubmit}
          disabled={loading || !content.trim()}
          style={{ 
            background: loading || !content.trim() ? '#d1d5db' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '0.625rem 1.5rem',
            borderRadius: '0.5rem',
            fontWeight: '600',
            fontSize: '0.875rem',
            cursor: loading || !content.trim() ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s',
            boxShadow: loading || !content.trim() ? 'none' : '0 2px 4px rgba(102, 126, 234, 0.3)'
          }}
          onMouseEnter={(e) => !loading && content.trim() && (e.target.style.transform = 'translateY(-1px)')}
          onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
        >
          {loading ? 'Posting...' : 'Post'}
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
