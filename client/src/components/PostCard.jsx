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
    <div className="bg-white mb-6" style={{ 
      padding: '1.5rem',
      borderRadius: '16px',
      boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
      border: '1px solid #f3f4f6',
      transition: 'all 0.3s ease'
    }}
    onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0px 8px 24px rgba(0, 0, 0, 0.12)'}
    onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0px 2px 8px rgba(0, 0, 0, 0.08)'}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <img 
            src={post.user?.avatar} 
            alt={post.user?.username} 
            className="rounded-full" 
            style={{ 
              width: '48px', 
              height: '48px', 
              objectFit: 'cover',
              border: '2px solid #e5e7eb',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.1)';
              e.target.style.borderColor = '#667eea';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.borderColor = '#e5e7eb';
            }}
          />
          <div>
            <Link 
              to={`/profile/${post.user?.username}`} 
              style={{ 
                textDecoration: 'none', 
                color: '#1f2937',
                fontSize: '1rem',
                fontWeight: '700',
                display: 'block',
                marginBottom: '0.125rem'
              }}
            >
              {post.user?.fullName}
            </Link>
            <p style={{ color: '#9ca3af', marginTop: '0.125rem', fontSize: '0.85rem', fontWeight: '400' }}>
              @{post.user?.username} • {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
            </p>
          </div>
        </div>
        
        {user?.id === post.user?._id && !isDefaultPost && (
          <div className="flex gap-2">
            <button 
              onClick={() => onDelete(post._id)} 
              style={{ 
                backgroundColor: 'transparent',
                color: '#ef4444',
                padding: '0.5rem',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#fee2e2';
                e.target.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.transform = 'scale(1)';
              }}
            >
              <FaTrash size={16} />
            </button>
          </div>
        )}
      </div>

      <p className="mb-4" style={{ 
        whiteSpace: 'pre-wrap',
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151'
      }}>{post.content}</p>

      {post.image && (
        <img 
          src={post.image} 
          alt="Post" 
          className="w-full mb-4" 
          style={{ 
            maxHeight: '500px', 
            objectFit: 'cover',
            borderRadius: '12px',
            border: '1px solid #e5e7eb',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.01)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        />
      )}

      <div className="flex items-center" style={{ 
        borderTop: '1px solid #f3f4f6', 
        borderBottom: '1px solid #f3f4f6',
        paddingTop: '0.75rem',
        paddingBottom: '0.75rem',
        marginBottom: '0.75rem',
        gap: '0.5rem'
      }}>
        <button 
          onClick={handleLike} 
          className="flex items-center gap-2 px-4 py-2 rounded-lg transition" 
          style={{ 
            backgroundColor: 'transparent',
            color: isLiked ? '#ef4444' : '#6b7280',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = isLiked ? '#fee2e2' : '#f3f4f6';
            e.target.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.transform = 'scale(1)';
          }}
        >
          {isLiked ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
          {likesCount > 0 && (
            <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>{likesCount}</span>
          )}
        </button>
        
        <button 
          onClick={() => setShowComments(!showComments)} 
          className="flex items-center gap-2 px-4 py-2 rounded-lg transition" 
          style={{ 
            backgroundColor: 'transparent',
            color: '#6b7280',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#f3f4f6';
            e.target.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.transform = 'scale(1)';
          }}
        >
          <FaComment size={20} />
          {comments.length > 0 && (
            <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>{comments.length}</span>
          )}
        </button>
      </div>

      {showComments && (
        <div style={{ paddingTop: '1rem' }}>
          <form onSubmit={handleComment} className="mb-4">
            <div className="flex gap-3">
              <img 
                src={user?.avatar} 
                alt={user?.username} 
                className="rounded-full" 
                style={{ 
                  width: '40px', 
                  height: '40px', 
                  objectFit: 'cover',
                  border: '2px solid #e5e7eb'
                }} 
              />
              <div className="flex-1">
                <textarea
                  placeholder="Write a comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full"
                  style={{
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    padding: '0.75rem 1rem',
                    fontSize: '14px',
                    backgroundColor: '#f9fafb',
                    resize: 'none',
                    minHeight: '80px',
                    fontFamily: 'inherit',
                    transition: 'all 0.2s'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#667eea';
                    e.target.style.backgroundColor = '#fff';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e5e7eb';
                    e.target.style.backgroundColor = '#f9fafb';
                  }}
                />
                <button 
                  type="submit" 
                  style={{
                    marginTop: '0.5rem',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    padding: '0.5rem 1.5rem',
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-1px)';
                    e.target.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  Comment
                </button>
              </div>
            </div>
          </form>

          <div className="gap-4" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {comments.map((c) => (
              <div key={c._id} className="flex gap-3 p-3" style={{
                backgroundColor: '#f9fafb',
                borderRadius: '12px',
                border: '1px solid #f3f4f6',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
              >
                <img 
                  src={c.user?.avatar} 
                  alt={c.user?.username} 
                  className="rounded-full" 
                  style={{ 
                    width: '40px', 
                    height: '40px', 
                    objectFit: 'cover',
                    border: '2px solid #e5e7eb'
                  }} 
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <Link 
                        to={`/profile/${c.user?.username}`} 
                        style={{ 
                          textDecoration: 'none', 
                          color: '#1f2937',
                          fontSize: '0.9rem',
                          fontWeight: '700'
                        }}
                      >
                        {c.user?.fullName}
                      </Link>
                      <span style={{ 
                        color: '#9ca3af', 
                        fontSize: '0.8rem', 
                        marginLeft: '0.5rem' 
                      }}>
                        @{c.user?.username}
                      </span>
                    </div>
                    {user?.id === c.user?._id && (
                      <button 
                        onClick={() => handleDeleteComment(c._id)} 
                        style={{ 
                          color: '#ef4444',
                          background: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          padding: '0.25rem',
                          borderRadius: '4px',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = '#fee2e2';
                          e.target.style.transform = 'scale(1.1)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = 'transparent';
                          e.target.style.transform = 'scale(1)';
                        }}
                      >
                        <FaTrash size={12} />
                      </button>
                    )}
                  </div>
                  <p style={{ 
                    fontSize: '0.9rem', 
                    marginTop: '0.5rem', 
                    color: '#374151',
                    lineHeight: '1.6'
                  }}>{c.content}</p>
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
