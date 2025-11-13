import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { FaHeart, FaRegHeart, FaComment, FaTrash, FaEdit } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';
import { toast } from 'react-toastify';

const PostCard = ({ post, onUpdate, onDelete }) => {
  const { user } = useContext(AuthContext);
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState('');
  const [isLiked, setIsLiked] = useState(post.likes?.includes(user?.id));
  const [likesCount, setLikesCount] = useState(post.likes?.length || 0);
  const [comments, setComments] = useState(post.comments || []);
  
  // Check if this is a default/sample post
  const isDefaultPost = post._id.startsWith('default-');

  const handleLike = async () => {
    if (isDefaultPost) {
      // For demo posts, just toggle locally
      setIsLiked(!isLiked);
      setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
      return;
    }
    
    try {
      await api.post(`/likes/${post._id}`);
      setIsLiked(!isLiked);
      setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
    } catch (error) {
      toast.error('Failed to like post');
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    if (isDefaultPost) {
      toast.info('Comments disabled for sample posts');
      return;
    }

    try {
      const response = await api.post('/comments', {
        postId: post._id,
        content: comment
      });
      setComments([...comments, response.data]);
      setComment('');
      toast.success('Comment added');
    } catch (error) {
      toast.error('Failed to add comment');
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await api.delete(`/comments/${commentId}`);
      setComments(comments.filter(c => c._id !== commentId));
      toast.success('Comment deleted');
    } catch (error) {
      toast.error('Failed to delete comment');
    }
  };

  return (
    <div className="bg-white rounded-lg mb-4" style={{ 
      padding: '1.5rem',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb',
      transition: 'all 0.2s'
    }}
    onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)'}
    onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)'}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <img 
            src={post.user?.avatar} 
            alt={post.user?.username} 
            className="rounded-full" 
            style={{ 
              width: '3rem', 
              height: '3rem', 
              objectFit: 'cover',
              border: '2px solid #e5e7eb'
            }} 
          />
          <div>
            <Link 
              to={`/profile/${post.user?.username}`} 
              className="font-bold" 
              style={{ 
                textDecoration: 'none', 
                color: '#1f2937',
                fontSize: '0.95rem'
              }}
            >
              {post.user?.fullName}
            </Link>
            <p className="text-xs" style={{ color: '#6b7280', marginTop: '0.125rem' }}>
              @{post.user?.username} • {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
            </p>
          </div>
        </div>
        
        {user?.id === post.user?._id && !isDefaultPost && (
          <div className="flex gap-2">
            <button 
              onClick={() => onDelete(post._id)} 
              className="text-red-500 p-2 rounded-lg transition" 
              style={{ backgroundColor: 'transparent' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#fee2e2'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              <FaTrash size={14} />
            </button>
          </div>
        )}
      </div>

      <p className="mb-4" style={{ 
        whiteSpace: 'pre-wrap',
        fontSize: '0.95rem',
        lineHeight: '1.6',
        color: '#374151'
      }}>{post.content}</p>

      {post.image && (
        <img 
          src={post.image} 
          alt="Post" 
          className="w-full rounded-lg mb-4" 
          style={{ 
            maxHeight: '500px', 
            objectFit: 'cover',
            border: '1px solid #e5e7eb'
          }} 
        />
      )}

      <div className="flex items-center gap-2" style={{ 
        borderTop: '1px solid #f3f4f6', 
        borderBottom: '1px solid #f3f4f6',
        paddingTop: '0.75rem',
        paddingBottom: '0.75rem',
        marginBottom: '0.75rem'
      }}>
        <button 
          onClick={handleLike} 
          className="flex items-center gap-2 px-3 py-2 rounded-lg transition" 
          style={{ 
            backgroundColor: 'transparent',
            color: isLiked ? '#ef4444' : '#6b7280'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#f9fafb'}
          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
        >
          {isLiked ? <FaHeart size={18} /> : <FaRegHeart size={18} />}
          <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>{likesCount}</span>
        </button>
        
        <button 
          onClick={() => setShowComments(!showComments)} 
          className="flex items-center gap-2 px-3 py-2 rounded-lg transition" 
          style={{ 
            backgroundColor: 'transparent',
            color: '#6b7280'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#f9fafb'}
          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
        >
          <FaComment size={18} />
          <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>{comments.length}</span>
        </button>
      </div>

      {showComments && (
        <div style={{ paddingTop: '0.5rem' }}>
          <form onSubmit={handleComment} className="mb-4">
            <div className="flex gap-2">
              <img 
                src={user?.avatar} 
                alt={user?.username} 
                className="rounded-full" 
                style={{ 
                  width: '2rem', 
                  height: '2rem', 
                  objectFit: 'cover',
                  marginTop: '0.25rem'
                }} 
              />
              <input
                type="text"
                placeholder="Write a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="flex-1"
                style={{
                  border: '2px solid #e5e7eb',
                  borderRadius: '1.5rem',
                  padding: '0.5rem 1rem',
                  fontSize: '0.875rem'
                }}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              />
              <button 
                type="submit" 
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  padding: '0.5rem 1.25rem',
                  borderRadius: '1.5rem',
                  fontSize: '0.875rem',
                  fontWeight: '600'
                }}
              >
                Post
              </button>
            </div>
          </form>

          <div className="gap-4" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {comments.map((c) => (
              <div key={c._id} className="flex gap-2">
                <img 
                  src={c.user?.avatar} 
                  alt={c.user?.username} 
                  className="rounded-full" 
                  style={{ 
                    width: '2rem', 
                    height: '2rem', 
                    objectFit: 'cover',
                    marginTop: '0.25rem'
                  }} 
                />
                <div 
                  className="flex-1 rounded-lg" 
                  style={{ 
                    backgroundColor: '#f9fafb',
                    padding: '0.75rem',
                    border: '1px solid #f3f4f6'
                  }}
                >
                  <div className="flex justify-between items-start">
                    <Link 
                      to={`/profile/${c.user?.username}`} 
                      className="font-bold" 
                      style={{ 
                        textDecoration: 'none', 
                        color: '#1f2937',
                        fontSize: '0.875rem'
                      }}
                    >
                      {c.user?.fullName}
                    </Link>
                    {user?.id === c.user?._id && (
                      <button 
                        onClick={() => handleDeleteComment(c._id)} 
                        className="text-red-500"
                        style={{ padding: '0.25rem' }}
                      >
                        <FaTrash size={12} />
                      </button>
                    )}
                  </div>
                  <p style={{ fontSize: '0.875rem', marginTop: '0.25rem', color: '#374151' }}>{c.content}</p>
                  <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '0.5rem' }}>
                    {formatDistanceToNow(new Date(c.createdAt), { addSuffix: true })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;
