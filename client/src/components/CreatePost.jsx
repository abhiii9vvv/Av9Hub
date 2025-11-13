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
    <div className="bg-white mb-6" style={{ 
      padding: '1.5rem',
      borderRadius: '16px',
      boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
      border: '1px solid #f3f4f6'
    }}>
      <div className="flex gap-3 mb-4">
        <img 
          src={user?.avatar} 
          alt={user?.username} 
          className="rounded-full" 
          style={{ 
            width: '48px', 
            height: '48px', 
            objectFit: 'cover',
            border: '2px solid #e5e7eb',
            flexShrink: 0
          }} 
        />
        <div className="flex-1">
          <textarea
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              e.target.style.height = 'auto';
              e.target.style.height = e.target.scrollHeight + 'px';
            }}
            rows="1"
            style={{ 
              resize: 'none',
              border: '2px solid #f3f4f6',
              borderRadius: '12px',
              padding: '0.875rem 1rem',
              fontSize: '15px',
              transition: 'all 0.2s',
              minHeight: '48px',
              overflow: 'hidden'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#667eea';
              e.target.style.backgroundColor = '#fafbff';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#f3f4f6';
              e.target.style.backgroundColor = 'white';
            }}
          />
        </div>
      </div>

      {image && (
        <div className="mb-4" style={{ position: 'relative' }}>
          <img 
            src={image} 
            alt="Preview" 
            className="w-full" 
            style={{ 
              maxHeight: '400px', 
              objectFit: 'cover',
              borderRadius: '12px',
              border: '1px solid #e5e7eb'
            }} 
          />
          <button
            onClick={() => setImage('')}
            style={{
              position: 'absolute',
              top: '0.75rem',
              right: '0.75rem',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              color: 'white',
              padding: '0.5rem',
              borderRadius: '50%',
              width: '2rem',
              height: '2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.25rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              border: 'none',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(239, 68, 68, 0.9)'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'}
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
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg transition" 
            style={{ 
              backgroundColor: '#f9fafb',
              color: '#667eea',
              border: '1px solid #e5e7eb',
              fontWeight: '600',
              fontSize: '0.9rem'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#f3f4f6';
              e.target.style.transform = 'scale(1.02)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#f9fafb';
              e.target.style.transform = 'scale(1)';
            }}
          >
            <FaImage size={18} />
            <span>Photo</span>
          </button>
        </div>
        
        <button
          onClick={handleSubmit}
          disabled={loading || !content.trim()}
          style={{ 
            background: loading || !content.trim() ? '#d1d5db' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '0.75rem 2rem',
            borderRadius: '12px',
            fontWeight: '700',
            fontSize: '0.95rem',
            cursor: loading || !content.trim() ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s',
            boxShadow: loading || !content.trim() ? 'none' : '0 4px 12px rgba(102, 126, 234, 0.3)',
            border: 'none'
          }}
          onMouseEnter={(e) => !loading && content.trim() && (e.target.style.transform = 'translateY(-2px)', e.target.style.boxShadow = '0 6px 16px rgba(102, 126, 234, 0.4)')}
          onMouseLeave={(e) => (e.target.style.transform = 'translateY(0)', e.target.style.boxShadow = loading || !content.trim() ? 'none' : '0 4px 12px rgba(102, 126, 234, 0.3)')}
        >
          {loading ? 'Posting...' : 'Post'}
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
