import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaHome, FaUser, FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <nav className="bg-white shadow mb-4" style={{ position: 'sticky', top: 0, zIndex: 100, borderBottom: '1px solid #e5e7eb' }}>
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center" style={{ height: '64px' }}>
          <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', textDecoration: 'none' }}>
            Av9Hub
          </Link>
          
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded transition" style={{ textDecoration: 'none', color: '#374151' }}>
              <FaHome size={20} />
              <span>Feed</span>
            </Link>
            
            <Link to={`/profile/${user.username}`} className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded transition" style={{ textDecoration: 'none', color: '#374151' }}>
              <FaUser size={18} />
              <span>Profile</span>
            </Link>
            
            <button onClick={handleLogout} className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded transition" style={{ backgroundColor: 'transparent', color: '#374151' }}>
              <FaSignOutAlt size={18} />
              <span>Logout</span>
            </button>
            
            <img src={user.avatar} alt={user.username} className="h-10 rounded-full" style={{ width: '2.5rem', height: '2.5rem', objectFit: 'cover' }} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
