import React, { useState, useEffect } from 'react';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sosAlerts, setSosAlerts] = useState([
    { 
      id: 1, 
      name: "Tourist A", 
      lat: 27.1767, 
      lng: 93.75, 
      time: "10:45 AM",
      status: "pending",
      location: "Tawang, Arunachal Pradesh",
      severity: "high"
    },
    { 
      id: 2, 
      name: "Tourist B", 
      lat: 26.2006, 
      lng: 92.9376, 
      time: "11:10 AM",
      status: "pending",
      location: "Guwahati, Assam",
      severity: "medium"
    },
    { 
      id: 3, 
      name: "Tourist C", 
      lat: 25.5788, 
      lng: 91.8933, 
      time: "11:30 AM",
      status: "accepted",
      location: "Shillong, Meghalaya",
      severity: "low"
    }
  ]);

  const [currentTime, setCurrentTime] = useState(new Date());
  const [showAlertForm, setShowAlertForm] = useState(false);
  const [newAlert, setNewAlert] = useState({
    name: '',
    location: '',
    severity: 'medium',
    description: ''
  });

  const [heatmapData] = useState([
    { region: 'Tawang', incidents: 15, x: 20, y: 30 },
    { region: 'Guwahati', incidents: 8, x: 60, y: 50 },
    { region: 'Shillong', incidents: 12, x: 45, y: 70 },
    { region: 'Itanagar', incidents: 6, x: 35, y: 25 },
    { region: 'Kohima', incidents: 9, x: 70, y: 60 },
    { region: 'Imphal', incidents: 11, x: 80, y: 65 },
    { region: 'Aizawl', incidents: 4, x: 55, y: 85 },
    { region: 'Agartala', incidents: 7, x: 85, y: 75 }
  ]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAccept = (id) => {
    setSosAlerts(prev => prev.map(alert => 
      alert.id === id ? { ...alert, status: 'accepted' } : alert
    ));
  };

  const handleResolve = (id) => {
    setSosAlerts(prev => prev.map(alert => 
      alert.id === id ? { ...alert, status: 'resolved' } : alert
    ));
  };

  const handleSendAlert = () => {
    if (newAlert.name && newAlert.location) {
      const alert = {
        id: sosAlerts.length + 1,
        name: newAlert.name,
        location: newAlert.location,
        lat: 26.0 + Math.random() * 2,
        lng: 92.0 + Math.random() * 3,
        time: currentTime.toLocaleTimeString(),
        status: 'pending',
        severity: newAlert.severity
      };
      setSosAlerts(prev => [alert, ...prev]);
      setNewAlert({ name: '', location: '', severity: 'medium', description: '' });
      setShowAlertForm(false);
    }
  };

  const pendingAlerts = sosAlerts.filter(alert => alert.status === 'pending');
  const activeAlerts = sosAlerts.filter(alert => alert.status === 'accepted');
  const resolvedAlerts = sosAlerts.filter(alert => alert.status === 'resolved');

  const getHeatmapColor = (incidents) => {
    if (incidents >= 12) return '#dc2626';
    if (incidents >= 8) return '#f59e0b';
    return '#10b981';
  };

  const getHeatmapSize = (incidents) => {
    return Math.max(20, incidents * 2) + 'px';
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f9fafb',
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
      fontSize: '1.05rem', // slightly larger
      letterSpacing: '0.01em'
    }}>
      {/* Header */}
      <header style={{
        backgroundColor: '#1d4ed8',
        color: 'white',
        padding: '1rem 1.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
          <span style={{fontSize: '1.5rem'}}>🚨</span>
          <h1 style={{fontSize: '1.25rem', fontWeight: 'bold', margin: 0}}>
            Tourist Safety Command Center
          </h1>
        </div>
        <div style={{display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.875rem'}}>
          <span>🕒</span>
          <span>{currentTime.toLocaleTimeString()}</span>
        </div>
      </header>

      <div style={{display: 'flex'}}>
        {/* Sidebar */}
        <aside style={{
          width: '16rem',
          backgroundColor: 'white',
          minHeight: 'calc(100vh - 80px)',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          borderRight: '1px solid #e5e7eb',
          position: 'sticky',
          top: 0,
          zIndex: 10
        }}>
          <div style={{padding: '1.5rem'}}>
            <nav style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
              <button 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 1rem',
                  borderRadius: '0.5rem',
                  border: 'none',
                  background: activeTab === 'dashboard' ? '#dbeafe' : 'transparent',
                  color: activeTab === 'dashboard' ? '#1d4ed8' : '#6b7280',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: '500',
                  width: '100%',
                  textAlign: 'left',
                  transition: 'background 0.2s, color 0.2s',
                  outline: 'none',
                }}
                onMouseOver={e => e.currentTarget.style.background = '#f1f5f9'}
                onMouseOut={e => e.currentTarget.style.background = activeTab === 'dashboard' ? '#dbeafe' : 'transparent'}
                onFocus={e => e.currentTarget.style.boxShadow = '0 0 0 2px #2563eb44'}
                onBlur={e => e.currentTarget.style.boxShadow = 'none'}
                onClick={() => setActiveTab('dashboard')}
              >
                <span>📊</span>
                <span>Dashboard</span>
              </button>
              <button 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 1rem',
                  borderRadius: '0.5rem',
                  border: 'none',
                  background: activeTab === 'sos' ? '#dbeafe' : 'transparent',
                  color: activeTab === 'sos' ? '#1d4ed8' : '#6b7280',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: '500',
                  width: '100%',
                  textAlign: 'left',
                  transition: 'background 0.2s, color 0.2s',
                  outline: 'none',
                }}
                onMouseOver={e => e.currentTarget.style.background = '#f1f5f9'}
                onMouseOut={e => e.currentTarget.style.background = activeTab === 'sos' ? '#dbeafe' : 'transparent'}
                onFocus={e => e.currentTarget.style.boxShadow = '0 0 0 2px #2563eb44'}
                onBlur={e => e.currentTarget.style.boxShadow = 'none'}
                onClick={() => setActiveTab('sos')}
              >
                <span>🚨</span>
                <span>SOS Alerts</span>
              </button>
              <button 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 1rem',
                  borderRadius: '0.5rem',
                  border: 'none',
                  background: activeTab === 'tourists' ? '#dbeafe' : 'transparent',
                  color: activeTab === 'tourists' ? '#1d4ed8' : '#6b7280',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: '500',
                  width: '100%',
                  textAlign: 'left',
                  transition: 'background 0.2s, color 0.2s',
                  outline: 'none',
                }}
                onMouseOver={e => e.currentTarget.style.background = '#f1f5f9'}
                onMouseOut={e => e.currentTarget.style.background = activeTab === 'tourists' ? '#dbeafe' : 'transparent'}
                onFocus={e => e.currentTarget.style.boxShadow = '0 0 0 2px #2563eb44'}
                onBlur={e => e.currentTarget.style.boxShadow = 'none'}
                onClick={() => setActiveTab('tourists')}
              >
                <span>👥</span>
                <span>Active Tourists</span>
              </button>
            </nav>
          </div>
          
          {/* Statistics */}
          <div style={{padding: '1.5rem', borderTop: '1px solid #e5e7eb'}}>
            <h3 style={{fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem'}}>
              Statistics
            </h3>
            <div style={{display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem'}}>
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <span style={{color: '#6b7280'}}>Pending</span>
                <span style={{fontWeight: '600', color: '#dc2626'}}>{pendingAlerts.length}</span>
              </div>
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <span style={{color: '#6b7280'}}>Active</span>
                <span style={{fontWeight: '600', color: '#f59e0b'}}>{activeAlerts.length}</span>
              </div>
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <span style={{color: '#6b7280'}}>Resolved</span>
                <span style={{fontWeight: '600', color: '#10b981'}}>{resolvedAlerts.length}</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main style={{flex: 1, padding: '1.5rem'}}>
          {activeTab === 'dashboard' && (
            <div>
              {/* Quick Stats */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '1.5rem',
                marginBottom: '2rem'
              }}>
                <div style={{
                  padding: '1.5rem',
                  borderRadius: '0.75rem',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                  background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
                  border: '1px solid #fca5a5',
                  transition: 'box-shadow 0.2s, transform 0.2s'
                }}>
                  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem'}}>
                    <span style={{fontSize: '2rem'}}>🚨</span>
                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '9999px',
                      color: '#dc2626',
                      backgroundColor: '#fecaca'
                    }}>
                      +{Math.floor(Math.random() * 3 + 1)} today
                    </span>
                  </div>
                  <div style={{fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.25rem', color: '#dc2626'}}>
                    {pendingAlerts.length}
                  </div>
                  <div style={{color: '#6b7280', fontSize: '0.875rem', marginBottom: '0.5rem'}}>
                    Critical Alerts
                  </div>
                  <div style={{fontSize: '0.75rem', marginTop: '0.5rem', color: '#7f1d1d'}}>
                    Immediate Response Required
                  </div>
                </div>
                
                <div style={{
                  padding: '1.5rem',
                  borderRadius: '0.75rem',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                  background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
                  border: '1px solid #fcd34d',
                  transition: 'box-shadow 0.2s, transform 0.2s'
                }}>
                  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem'}}>
                    <span style={{fontSize: '2rem'}}>⚡</span>
                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '9999px',
                      color: '#d97706',
                      backgroundColor: '#fed7aa'
                    }}>
                      Active
                    </span>
                  </div>
                  <div style={{fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.25rem', color: '#f59e0b'}}>
                    {activeAlerts.length}
                  </div>
                  <div style={{color: '#6b7280', fontSize: '0.875rem', marginBottom: '0.5rem'}}>
                    In Progress
                  </div>
                  <div style={{fontSize: '0.75rem', marginTop: '0.5rem', color: '#92400e'}}>
                    Response Teams Deployed
                  </div>
                </div>
                
                <div style={{
                  padding: '1.5rem',
                  borderRadius: '0.75rem',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                  background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
                  border: '1px solid #86efac',
                  transition: 'box-shadow 0.2s, transform 0.2s'
                }}>
                  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem'}}>
                    <span style={{fontSize: '2rem'}}>✅</span>
                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '9999px',
                      color: '#059669',
                      backgroundColor: '#bbf7d0'
                    }}>
                      +{Math.floor(Math.random() * 5 + 3)} today
                    </span>
                  </div>
                  <div style={{fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.25rem', color: '#10b981'}}>
                    {resolvedAlerts.length}
                  </div>
                  <div style={{color: '#6b7280', fontSize: '0.875rem', marginBottom: '0.5rem'}}>
                    Resolved
                  </div>
                  <div style={{fontSize: '0.75rem', marginTop: '0.5rem', color: '#166534'}}>
                    Avg. Response: 18 mins
                  </div>
                </div>
              </div>

              {/* Main Dashboard Content */}
              <div style={{display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem'}}>
                {/* Heatmap */}
                <div style={{
                  backgroundColor: 'white',
                  borderRadius: '0.75rem',
                  padding: '1.5rem',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                  background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1.5rem'
                  }}>
                    <div>
                      <h2 style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '1.25rem',
                        fontWeight: 'bold',
                        margin: '0 0 0.25rem 0'
                      }}>
                        <span>🗺️</span>
                        Northeast India Safety Heatmap
                      </h2>
                      <p style={{fontSize: '0.875rem', color: '#64748b', margin: 0}}>
                        Real-time incident monitoring • Last updated: {currentTime.toLocaleTimeString()}
                      </p>
                    </div>
                    <button 
                      style={{
                        background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
                        color: 'white',
                        border: 'none',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '0.5rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        boxShadow: '0 4px 12px rgba(220, 38, 38, 0.4)'
                      }}
                      onClick={() => setShowAlertForm(true)}
                    >
                      <span>🚨</span>
                      Emergency Alert
                    </button>
                  </div>
                  
                  <div style={{
                    position: 'relative',
                    background: 'linear-gradient(135deg, #e0f2fe 0%, #e8f5e8 100%)',
                    borderRadius: '0.5rem',
                    height: '400px',
                    border: '1px solid #e5e7eb'
                  }}>
                    {heatmapData.map((point, index) => (
                      <div key={index}>
                        <div
                          style={{
                            position: 'absolute',
                            borderRadius: '50%',
                            cursor: 'pointer',
                            transform: 'translate(-50%, -50%)',
                            left: `${point.x}%`,
                            top: `${point.y}%`,
                            width: getHeatmapSize(point.incidents),
                            height: getHeatmapSize(point.incidents),
                            backgroundColor: getHeatmapColor(point.incidents),
                            opacity: 0.8,
                            boxShadow: `0 0 ${point.incidents * 2}px ${getHeatmapColor(point.incidents)}`
                          }}
                          title={`${point.region}: ${point.incidents} incidents`}
                        />
                        <div 
                          style={{
                            position: 'absolute',
                            fontSize: '0.75rem',
                            fontWeight: '600',
                            color: '#374151',
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            padding: '0.25rem 0.5rem',
                            borderRadius: '0.25rem',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                            whiteSpace: 'nowrap',
                            left: `${point.x}%`,
                            top: `${point.y + 5}%`,
                            transform: 'translateX(-50%)'
                          }}
                        >
                          {point.region}
                        </div>
                      </div>
                    ))}
                    
                    <div style={{
                      position: 'absolute',
                      bottom: '15px',
                      left: '15px',
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      padding: '1rem',
                      borderRadius: '0.5rem',
                      fontSize: '0.75rem',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                    }}>
                      <div style={{fontWeight: '600', marginBottom: '0.5rem', color: '#374151'}}>
                        Threat Level
                      </div>
                      <div style={{display: 'flex', flexDirection: 'column', gap: '0.25rem'}}>
                        <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                          <div style={{width: '12px', height: '12px', backgroundColor: '#dc2626', borderRadius: '50%'}} />
                          <span>Critical (12+ incidents)</span>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                          <div style={{width: '12px', height: '12px', backgroundColor: '#f59e0b', borderRadius: '50%'}} />
                          <span>Moderate (8-11 incidents)</span>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                          <div style={{width: '12px', height: '12px', backgroundColor: '#10b981', borderRadius: '50%'}} />
                          <span>Low (&lt;8 incidents)</span>
                        </div>
                      </div>
                    </div>

                    <div style={{
                      position: 'absolute',
                      top: '15px',
                      right: '15px',
                      backgroundColor: 'rgba(34, 197, 94, 0.1)',
                      border: '1px solid #22c55e',
                      color: '#166534',
                      padding: '0.5rem 0.75rem',
                      borderRadius: '9999px',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <div style={{width: '8px', height: '8px', backgroundColor: '#22c55e', borderRadius: '50%'}} />
                      Live Data
                    </div>
                  </div>
                </div>

                {/* Activity Feed */}
                <div style={{
                  backgroundColor: 'white',
                  borderRadius: '0.75rem',
                  padding: '1.5rem',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1.5rem'
                  }}>
                    <h3 style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '1.125rem',
                      fontWeight: 'bold',
                      margin: 0
                    }}>
                      <span>📊</span>
                      Live Activity Feed
                    </h3>
                    <span style={{fontSize: '0.75rem', color: '#10b981', fontWeight: '600'}}>● Live</span>
                  </div>
                  
                  <div style={{fontSize: '0.875rem', maxHeight: '300px', overflowY: 'auto'}}>
                    {sosAlerts.slice(0, 6).map((alert) => (
                      <div key={alert.id} style={{
                        padding: '0.75rem',
                        borderBottom: '1px solid #e5e7eb',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderRadius: '0.375rem',
                        marginBottom: '0.25rem'
                      }}>
                        <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
                          <div style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            backgroundColor: alert.status === 'pending' ? '#fef2f2' : 
                                           alert.status === 'accepted' ? '#fffbeb' : '#f0fdf4',
                            border: `2px solid ${alert.status === 'pending' ? '#fca5a5' : 
                                                 alert.status === 'accepted' ? '#fcd34d' : '#86efac'}`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.875rem'
                          }}>
                            {alert.status === 'pending' ? '🚨' : alert.status === 'accepted' ? '⚡' : '✅'}
                          </div>
                          <div>
                            <div style={{fontWeight: '600', color: '#111827'}}>{alert.name}</div>
                            <div style={{color: '#6b7280', fontSize: '0.75rem'}}>{alert.location}</div>
                            <div style={{color: '#9ca3af', fontSize: '0.625rem', marginTop: '0.125rem'}}>{alert.time}</div>
                          </div>
                        </div>
                        <div style={{
                          padding: '0.25rem 0.5rem',
                          borderRadius: '9999px',
                          fontSize: '0.625rem',
                          fontWeight: '600',
                          backgroundColor: alert.status === 'pending' ? '#fee2e2' : 
                                         alert.status === 'accepted' ? '#fef3c7' : '#dcfce7',
                          color: alert.status === 'pending' ? '#991b1b' : 
                                 alert.status === 'accepted' ? '#92400e' : '#166534',
                          textTransform: 'uppercase'
                        }}>
                          {alert.status}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'sos' && (
            <div style={{display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem'}}>
              <div>
                <div style={{
                  backgroundColor: 'white',
                  borderRadius: '0.75rem',
                  padding: '1.5rem',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1.5rem'
                  }}>
                    <h2 style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '1.25rem',
                      fontWeight: 'bold',
                      margin: 0
                    }}>
                      <span>🚨</span>
                      SOS Alerts
                    </h2>
                  </div>
                  
                  <div>
                    {sosAlerts.map((alert) => (
                      <div key={alert.id} style={{
                        padding: '1rem',
                        borderRadius: '0.5rem',
                        border: '2px solid',
                        marginBottom: '1rem',
                        backgroundColor: alert.status === 'pending' ? '#fef2f2' : 
                                       alert.status === 'accepted' ? '#fffbeb' : '#f0fdf4',
                        borderColor: alert.status === 'pending' ? '#fca5a5' : 
                                    alert.status === 'accepted' ? '#fcd34d' : '#86efac',
                        color: alert.status === 'pending' ? '#991b1b' : 
                               alert.status === 'accepted' ? '#92400e' : '#166534',
                        transition: 'box-shadow 0.2s, transform 0.2s'
                      }}>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          marginBottom: '0.75rem'
                        }}>
                          <div>
                            <h4 style={{fontSize: '1.125rem', fontWeight: '600', margin: 0}}>
                              {alert.name}
                            </h4>
                            <p style={{fontSize: '0.875rem', opacity: 0.75, margin: '0.25rem 0 0 0'}}>
                              {alert.location}
                            </p>
                          </div>
                          <span style={{
                            fontSize: '0.75rem',
                            fontWeight: '500',
                            padding: '0.25rem 0.5rem',
                            borderRadius: '9999px',
                            backgroundColor: 'rgba(255, 255, 255, 0.5)'
                          }}>
                            {alert.status.toUpperCase()}
                          </span>
                        </div>
                        
                        <div style={{display: 'flex', gap: '1rem', fontSize: '0.875rem', marginBottom: '0.75rem'}}>
                          <div style={{display: 'flex', alignItems: 'center', gap: '0.25rem'}}>
                            <span>🕒</span>
                            <span>{alert.time}</span>
                          </div>
                          <div style={{display: 'flex', alignItems: 'center', gap: '0.25rem'}}>
                            <span>📍</span>
                            <span>{alert.lat.toFixed(4)}, {alert.lng.toFixed(4)}</span>
                          </div>
                        </div>
                        
                        {alert.status === 'pending' && (
                          <div style={{display: 'flex', gap: '0.5rem'}}>
                            <button 
                              onClick={() => handleAccept(alert.id)}
                              style={{
                                flex: 1,
                                padding: '0.5rem 0.75rem',
                                backgroundColor: '#10b981',
                                color: 'white',
                                border: 'none',
                                borderRadius: '0.5rem',
                                fontSize: '0.875rem',
                                fontWeight: '500',
                                cursor: 'pointer'
                              }}
                            >
                              Accept
                            </button>
                            <button 
                              onClick={() => handleResolve(alert.id)}
                              style={{
                                flex: 1,
                                padding: '0.5rem 0.75rem',
                                backgroundColor: '#ef4444',
                                color: 'white',
                                border: 'none',
                                borderRadius: '0.5rem',
                                fontSize: '0.875rem',
                                fontWeight: '500',
                                cursor: 'pointer'
                              }}
                            >
                              Resolve
                            </button>
                          </div>
                        )}
                        
                        {alert.status === 'accepted' && (
                          <button 
                            onClick={() => handleResolve(alert.id)}
                            style={{
                              width: '100%',
                              padding: '0.5rem 0.75rem',
                              backgroundColor: '#3b82f6',
                              color: 'white',
                              border: 'none',
                              borderRadius: '0.5rem',
                              fontSize: '0.875rem',
                              fontWeight: '500',
                              cursor: 'pointer'
                            }}
                          >
                            Mark Resolved
                          </button>
                        )}
                        
                        {alert.status === 'resolved' && (
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            color: '#059669'
                          }}>
                            <span>✅</span>
                            <span style={{fontSize: '0.875rem', fontWeight: '500'}}>Resolved</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <div style={{
                  backgroundColor: 'white',
                  borderRadius: '0.75rem',
                  padding: '1.5rem',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1.5rem'
                  }}>
                    <h2 style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '1.25rem',
                      fontWeight: 'bold',
                      margin: 0
                    }}>
                      <span>🗺️</span>
                      Live Map View
                    </h2>
                  </div>
                  
                  <div style={{
                    position: 'relative',
                    background: 'linear-gradient(135deg, #dcfce7 0%, #dbeafe 100%)',
                    borderRadius: '0.5rem',
                    height: '384px',
                    border: '2px solid #e5e7eb',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundColor: 'rgba(229, 231, 235, 0.5)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <div style={{textAlign: 'center'}}>
                        <div style={{fontSize: '4rem', marginBottom: '1rem'}}>📍</div>
                        <p style={{
                          color: '#4b5563',
                          fontSize: '1.125rem',
                          fontWeight: '500',
                          margin: '0 0 0.5rem 0'
                        }}>
                          Interactive Map View
                        </p>
                        <p style={{color: '#6b7280', fontSize: '0.875rem', margin: 0}}>
                          Northeast India Tourist Safety Network
                        </p>
                      </div>
                    </div>
                    
                    {sosAlerts.map((alert, index) => (
                      <div 
                        key={alert.id} 
                        style={{
                          position: 'absolute',
                          width: '16px',
                          height: '16px',
                          borderRadius: '50%',
                          border: '2px solid white',
                          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                          backgroundColor: alert.status === 'pending' ? '#ef4444' : 
                                         alert.status === 'accepted' ? '#eab308' : '#10b981',
                          left: `${20 + index * 25}%`,
                          top: `${30 + index * 15}%`
                        }}
                        title={`${alert.name} - ${alert.location}`}
                      />
                    ))}
                  </div>
                  
                  <div style={{
                    marginTop: '1rem',
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '1.5rem',
                    fontSize: '0.875rem'
                  }}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                      <div style={{width: '12px', height: '12px', backgroundColor: '#ef4444', borderRadius: '50%'}}></div>
                      <span>Pending</span>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                      <div style={{width: '12px', height: '12px', backgroundColor: '#eab308', borderRadius: '50%'}}></div>
                      <span>Active</span>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                      <div style={{width: '12px', height: '12px', backgroundColor: '#10b981', borderRadius: '50%'}}></div>
                      <span>Resolved</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tourists' && (
            <div style={{
              backgroundColor: 'white',
              borderRadius: '0.75rem',
              padding: '1.5rem',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
            }}>
              <h2 style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '1.25rem',
                fontWeight: 'bold',
                marginBottom: '1rem'
              }}>
                <span>👥</span>
                Active Tourists
              </h2>
              <p style={{color: '#6b7280'}}>Coming soon - Tourist tracking and management</p>
            </div>
          )}
        </main>
      </div>

      {/* Alert Form Modal */}
      {showAlertForm && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(2px)', // <-- add this line
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '0.75rem',
            width: '90%',
            maxWidth: '500px'
          }}>
            <h3 style={{fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem'}}>
              🚨 Send Emergency Alert
            </h3>
            
            <div style={{marginBottom: '1rem'}}>
              <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '500'}}>
                Tourist Name *
              </label>
              <input
                type="text"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  boxSizing: 'border-box'
                }}
                value={newAlert.name}
                onChange={(e) => setNewAlert({...newAlert, name: e.target.value})}
                placeholder="Enter tourist name"
              />
            </div>

            <div style={{marginBottom: '1rem'}}>
              <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '500'}}>
                Location *
              </label>
              <input
                type="text"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  boxSizing: 'border-box'
                }}
                value={newAlert.location}
                onChange={(e) => setNewAlert({...newAlert, location: e.target.value})}
                placeholder="Enter location"
              />
            </div>

            <div style={{marginBottom: '1rem'}}>
              <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '500'}}>
                Severity
              </label>
              <select
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  boxSizing: 'border-box'
                }}
                value={newAlert.severity}
                onChange={(e) => setNewAlert({...newAlert, severity: e.target.value})}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div style={{marginBottom: '1rem'}}>
              <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '500'}}>
                Description
              </label>
              <textarea
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  minHeight: '100px',
                  resize: 'vertical',
                  boxSizing: 'border-box'
                }}
                value={newAlert.description}
                onChange={(e) => setNewAlert({...newAlert, description: e.target.value})}
                placeholder="Optional description of the emergency"
              />
            </div>

            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'flex-end',
              marginTop: '1.5rem'
            }}>
              <button
                style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.5rem',
                  border: 'none',
                  fontWeight: '500',
                  cursor: 'pointer',
                  backgroundColor: '#e5e7eb',
                  color: '#374151'
                }}
                onClick={() => setShowAlertForm(false)}
              >
                Cancel
              </button>
              <button
                style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.5rem',
                  border: 'none',
                  fontWeight: '500',
                  cursor: 'pointer',
                  backgroundColor: '#3b82f6',
                  color: 'white'
                }}
                onClick={handleSendAlert}
              >
                Send Alert
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}