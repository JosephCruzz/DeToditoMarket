import React from 'react';
import './Notifications.css';

const Notifications = () => {
  const notifications = [
    {
      id: 1,
      type: 'urgent',
      title: 'NOTIFICACION URGENTE',
      description: 'Detalles de la notificacion'
    },
    {
      id: 2,
      type: 'medium',
      title: 'NOTIFICACION MEDIA PRIORIDAD',
      description: 'Detalles de la notificacion'
    }
  ];

  return (
    <div className="notifications">
      <h3 className="section-title">Notificaciones</h3>
      <div className="notifications-list">
        {notifications.map((notification) => (
          <div key={notification.id} className={`notification-item ${notification.type}`}>
            <div className="notification-icon">
              {notification.type === 'urgent' ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L1 21h22L12 2zm0 3.5L19.5 19h-15L12 5.5zM11 10v4h2v-4h-2zm0 6v2h2v-2h-2z"/>
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
                </svg>
              )}
            </div>
            <div className="notification-content">
              <h4 className="notification-title">{notification.title}</h4>
              <p className="notification-description">{notification.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
