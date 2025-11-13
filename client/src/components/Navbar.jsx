import { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaHome, FaUser, FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={{ 
      backgroundColor: 'white',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      borderBottom: '1px solid #e5e7eb',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.04)'
    }}>
      <div style={{ 
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1rem'
      }}>
        <div className="flex justify-between items-center" style={{ height: '64px' }}>
          <Link to="/" style={{ 
            fontSize: '1.5rem', 
            fontWeight: 'bold', 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
            WebkitBackgroundClip: 'text', 
            WebkitTextFillColor: 'transparent', 
            textDecoration: 'none',
            letterSpacing: '-0.5px'
          }}>
            Av9Hub
          </Link>
          
          <div className="flex items-center" style={{ gap: '0.5rem' }}>
            <Link 
              to="/" 
              style={{ 
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.625rem 1rem',
                borderRadius: '0.75rem',
                textDecoration: 'none',
                color: isActive('/') ? '#667eea' : '#6b7280',
                backgroundColor: isActive('/') ? '#f3f4f6' : 'transparent',
                fontWeight: isActive('/') ? '600' : '500',
                transition: 'all 0.2s',
                position: 'relative'
              }}
              onMouseEnter={(e) => !isActive('/') && (e.currentTarget.style.backgroundColor = '#f9fafb')}
              onMouseLeave={(e) => !isActive('/') && (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <FaHome size={20} />
              <span>Feed</span>
              {isActive('/') && (
                <div style={{
                  position: 'absolute',
                  bottom: '-1px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '60%',
                  height: '3px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '2px 2px 0 0'
                }} />
              )}
            </Link>
            
            <Link 
              to={`/profile/${user.username}`} 
              style={{ 
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.625rem 1rem',
                borderRadius: '0.75rem',
                textDecoration: 'none',
                color: location.pathname.includes('/profile') ? '#667eea' : '#6b7280',
                backgroundColor: location.pathname.includes('/profile') ? '#f3f4f6' : 'transparent',
                fontWeight: location.pathname.includes('/profile') ? '600' : '500',
                transition: 'all 0.2s',
                position: 'relative'
              }}
              onMouseEnter={(e) => !location.pathname.includes('/profile') && (e.currentTarget.style.backgroundColor = '#f9fafb')}
              onMouseLeave={(e) => !location.pathname.includes('/profile') && (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <FaUser size={18} />
              <span>Profile</span>
              {location.pathname.includes('/profile') && (
                <div style={{
                  position: 'absolute',
                  bottom: '-1px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '60%',
                  height: '3px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '2px 2px 0 0'
                }} />
              )}
            </Link>
            
            <button 
              onClick={handleLogout} 
              style={{ 
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.625rem 1rem',
                borderRadius: '0.75rem',
                backgroundColor: 'transparent',
                color: '#6b7280',
                fontWeight: '500',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#fee2e2';
                e.currentTarget.style.color = '#ef4444';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#6b7280';
              }}
            >
              <FaSignOutAlt size={18} />
              <span>Logout</span>
            </button>
            
            <img 
              src={user.avatar} 
              alt={user.username} 
              style={{ 
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid #e5e7eb',
                marginLeft: '0.5rem',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.borderColor = '#667eea';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.borderColor = '#e5e7eb';
              }}
              onClick={() => navigate(`/profile/${user.username}`)}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
