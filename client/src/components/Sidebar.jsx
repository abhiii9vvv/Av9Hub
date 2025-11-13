import { FaUserPlus, FaHashtag, FaTrophy } from 'react-icons/fa';

const Sidebar = () => {
  const suggestions = [
    { name: 'Hardik Pandya', username: 'hardikpandya', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Hardik&backgroundColor=3b82f6' },
    { name: 'Katrina Kaif', username: 'katrinakaif', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Katrina&backgroundColor=ec4899' },
    { name: 'Vicky Kaushal', username: 'vickykaushal', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Vicky&backgroundColor=f59e0b' },
  ];

  const trending = [
    { tag: 'IPL2025', posts: '45.2K' },
    { tag: 'Bollywood', posts: '32.8K' },
    { tag: 'TechIndia', posts: '28.5K' },
    { tag: 'IndianCricket', posts: '52.1K' },
  ];

  return (
    <div style={{ 
      position: 'sticky',
      top: '250px',
      height: 'calc(100vh - 266px)',
      overflowY: 'auto'
    }}>
      {/* Suggestions */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '1.25rem',
        marginBottom: '1rem',
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)'
      }}>
        <h3 style={{ 
          fontSize: '1.125rem', 
          fontWeight: '700',
          marginBottom: '1rem',
          color: '#1f2937'
        }}>
          Suggested For You
        </h3>
        {suggestions.map((user, index) => (
          <div key={index} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.75rem',
            borderRadius: '12px',
            marginBottom: '0.5rem',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <img 
              src={user.avatar} 
              alt={user.name}
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid #e5e7eb'
              }}
            />
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: '600', fontSize: '0.9rem', color: '#1f2937' }}>{user.name}</p>
              <p style={{ fontSize: '0.8rem', color: '#9ca3af' }}>@{user.username}</p>
            </div>
            <button style={{
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              fontSize: '0.85rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <FaUserPlus size={14} />
            </button>
          </div>
        ))}
      </div>

      {/* Trending */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '1.25rem',
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)'
      }}>
        <h3 style={{ 
          fontSize: '1.125rem', 
          fontWeight: '700',
          marginBottom: '1rem',
          color: '#1f2937',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <FaTrophy style={{ color: '#f59e0b' }} />
          Trending Now
        </h3>
        {trending.map((topic, index) => (
          <div key={index} style={{
            padding: '0.75rem',
            borderRadius: '12px',
            marginBottom: '0.5rem',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <FaHashtag style={{ color: '#667eea', fontSize: '0.9rem' }} />
              <p style={{ fontWeight: '600', fontSize: '0.95rem', color: '#1f2937' }}>{topic.tag}</p>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#9ca3af', marginLeft: '1.4rem' }}>{topic.posts} posts</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
