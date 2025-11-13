import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const MaintenanceBanner = () => {
  const { maintenanceMode } = useContext(AuthContext);

  if (!maintenanceMode) return null;

  return (
    <div style={{
      backgroundColor: '#fef3c7',
      borderBottom: '2px solid #f59e0b',
      padding: '0.75rem 1rem',
      textAlign: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        fontSize: '0.875rem',
        fontWeight: '500',
        color: '#92400e'
      }}>
        <span style={{ fontSize: '1.25rem' }}>⚠️</span>
        <span>
          MongoDB server is currently under maintenance. You're using offline mode - some features may be limited.
        </span>
      </div>
    </div>
  );
};

export default MaintenanceBanner;
