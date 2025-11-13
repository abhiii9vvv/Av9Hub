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

  const handleLike = async () => {
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
    <div className="bg-white rounded-lg shadow mb-4 p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <img src={post.user?.avatar} alt={post.user?.username} className="h-12 rounded-full" style={{ width: '3rem', height: '3rem', objectFit: 'cover' }} />
          <div>
            <Link to={`/profile/${post.user?.username}`} className="font-bold" style={{ textDecoration: 'none', color: '#1f2937' }}>
              {post.user?.fullName}
            </Link>
            <p className="text-xs text-gray-600">@{post.user?.username}</p>
            <p className="text-xs text-gray-600">
              {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
            </p>
          </div>
        </div>
        
        {user?.id === post.user?._id && (
          <div className="flex gap-2">
            <button onClick={() => onDelete(post._id)} className="text-red-500 hover:bg-gray-100 p-2 rounded transition">
              <FaTrash />
            </button>
          </div>
        )}
      </div>

      <p className="mb-4" style={{ whiteSpace: 'pre-wrap' }}>{post.content}</p>

      {post.image && (
        <img src={post.image} alt="Post" className="w-full rounded-lg mb-4" style={{ maxHeight: '500px', objectFit: 'cover' }} />
      )}

      <div className="flex items-center gap-4 mb-4" style={{ borderTop: '1px solid #e5e7eb', paddingTop: '1rem' }}>
        <button onClick={handleLike} className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded transition" style={{ backgroundColor: 'transparent' }}>
          {isLiked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
          <span>{likesCount}</span>
        </button>
        
        <button onClick={() => setShowComments(!showComments)} className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded transition" style={{ backgroundColor: 'transparent' }}>
          <FaComment />
          <span>{comments.length}</span>
        </button>
      </div>

      {showComments && (
        <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '1rem' }}>
          <form onSubmit={handleComment} className="mb-4">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Write a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="flex-1"
              />
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                Post
              </button>
            </div>
          </form>

          <div className="gap-4" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {comments.map((c) => (
              <div key={c._id} className="flex gap-2">
                <img src={c.user?.avatar} alt={c.user?.username} className="h-10 rounded-full" style={{ width: '2.5rem', height: '2.5rem', objectFit: 'cover' }} />
                <div className="flex-1 bg-gray-100 rounded-lg p-2">
                  <div className="flex justify-between items-start">
                    <Link to={`/profile/${c.user?.username}`} className="font-bold text-sm" style={{ textDecoration: 'none', color: '#1f2937' }}>
                      {c.user?.fullName}
                    </Link>
                    {user?.id === c.user?._id && (
                      <button onClick={() => handleDeleteComment(c._id)} className="text-red-500 text-xs">
                        <FaTrash size={12} />
                      </button>
                    )}
                  </div>
                  <p className="text-sm">{c.content}</p>
                  <p className="text-xs text-gray-600 mt-1">
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
