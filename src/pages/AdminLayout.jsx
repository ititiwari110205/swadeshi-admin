import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAdminContext } from '../context/AdminContext';
import { LayoutDashboard, Tag, Package, ShoppingBag, MessageSquare, LogOut, Menu, User, Image, CreditCard, ChevronRight, Bell, Search, Scissors } from 'lucide-react';

export default function AdminLayout() {
    const { adminUser, logout } = useAdminContext();
    const navigate = useNavigate();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navLinks = [
        { name: 'Dashboard Overview', path: '/dashboard', icon: LayoutDashboard },
        { name: 'Storefront Sliders', path: '/slider', icon: Image },
        { name: 'Apparel Categories', path: '/categories', icon: Tag },
        { name: 'Product Inventory', path: '/products', icon: Package },
        { name: 'Order Fulfillment', path: '/orders', icon: ShoppingBag },
        { name: 'Transactions', path: '/payments', icon: CreditCard },
        { name: 'Client Inquiries', path: '/messages', icon: MessageSquare }
    ];

    const storeLink = "http://localhost:5173/";

    const currentRouteName = navLinks.find(link => location.pathname.startsWith(link.path))?.name || 'Administrative Portal';

    return (
        <div style={styles.layout}>
            {/* Sidebar - Desktop */}
            <aside style={styles.sidebar} className="admin-sidebar hidden md:flex">
                <div style={styles.logoContainer}>
                    <div className="flex items-center gap-3">
                        <Scissors size={28} color="var(--color-secondary)" />
                        <div>
                            <h2 style={styles.logo}>Swadeshi<span style={{ color: 'var(--color-secondary)' }}>Hub</span></h2>
                            <p style={styles.badge}>Atelier Admin</p>
                        </div>
                    </div>
                </div>

                <div style={{ padding: '0 20px', margin: '20px 0 10px 0' }}>
                    <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1.2px', color: 'rgba(255,255,255,0.4)', fontWeight: '600' }}>Management</p>
                </div>

                <nav style={styles.nav}>
                    {navLinks.map((link, idx) => {
                        const Icon = link.icon;
                        const isActive = location.pathname.startsWith(link.path);
                        return (
                            <Link
                                key={idx}
                                to={link.path}
                                className={`nav-link ${isActive ? 'active' : ''}`}
                                style={styles.navLink}
                            >
                                <Icon size={18} />
                                <span style={{ flex: 1 }}>{link.name}</span>
                                {isActive && <ChevronRight size={16} style={{ color: 'var(--color-secondary)' }} />}
                            </Link>
                        );
                    })}
                </nav>

                <div style={styles.sidebarFooter}>
                    <div style={styles.userProfile}>
                        <div style={styles.userAvatar}>
                            <User size={20} color="var(--color-primary-dark)" />
                        </div>
                        <div style={{ flex: 1, overflow: 'hidden' }}>
                            <p style={{ fontSize: '0.9rem', fontWeight: 'bold', color: 'white', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{adminUser?.name || 'Administrator'}</p>
                            <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)' }}>Head Administrator</p>
                        </div>
                    </div>
                    <a href={storeLink} target="_blank" rel="noopener noreferrer" style={{ ...styles.actionBtn, backgroundColor: 'rgba(197, 160, 89, 0.15)', color: 'var(--color-secondary-light)', border: '1px solid rgba(197, 160, 89, 0.3)', marginBottom: '10px' }}>
                        <ShoppingBag size={16} /> Open Storefront
                    </a>
                    <button onClick={handleLogout} style={{ ...styles.actionBtn, backgroundColor: 'rgba(255,255,255,0.05)', color: 'white' }}>
                        <LogOut size={16} /> End Session
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main style={styles.main}>
                {/* Topbar */}
                <header style={styles.topbar}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <button className="md:hidden" onClick={() => setIsMobileMenuOpen(true)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '5px' }}>
                            <Menu size={24} color="var(--color-primary-dark)" />
                        </button>
                        <div>
                            <h1 style={{ fontSize: '1.4rem', fontWeight: 'bold', color: 'var(--color-primary-dark)', fontFamily: 'Playfair Display, serif' }}>{currentRouteName}</h1>
                            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>Manage your premium ethnic wear collection</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
                        <div style={styles.searchBar} className="hidden md:flex">
                            <Search size={18} color="var(--color-text-muted)" />
                            <input type="text" placeholder="Search orders, products..." style={styles.searchInput} />
                        </div>
                        <div style={{ position: 'relative', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--color-bg)', border: '1px solid var(--color-border)' }} className="hover-lift">
                            <Bell size={18} color="var(--color-primary-dark)" />
                            <span style={{ position: 'absolute', top: '-2px', right: '-2px', backgroundColor: 'var(--color-error)', color: 'white', fontSize: '0.65rem', fontWeight: 'bold', width: '18px', height: '18px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>3</span>
                        </div>
                        <div className="flex items-center gap-2" style={{ padding: '8px 16px', backgroundColor: 'rgba(30, 96, 56, 0.05)', borderRadius: 'var(--radius-full)', border: '1px solid rgba(30, 96, 56, 0.1)' }}>
                            <span style={{ width: '8px', height: '8px', backgroundColor: 'var(--color-success)', borderRadius: '50%', display: 'inline-block', boxShadow: '0 0 8px rgba(30, 96, 56, 0.5)' }}></span>
                            <span style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--color-success)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>System Live</span>
                        </div>
                    </div>
                </header>

                <div className="top-accent-line"></div>

                {/* Content Area */}
                <div style={styles.content}>
                    <Outlet />
                </div>
            </main>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', zIndex: 100, display: 'flex' }}>
                    <aside style={{ ...styles.sidebar, width: '280px', animation: 'slideRight 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards' }} className="flex">
                        <div style={styles.logoContainer}>
                            <h2 style={styles.logo}>Swadeshi<span style={{ color: 'var(--color-secondary)' }}>Hub</span></h2>
                            <p style={styles.badge}>Atelier Admin</p>
                            <button onClick={() => setIsMobileMenuOpen(false)} style={{ color: 'white', position: 'absolute', top: '25px', right: '20px', background: 'none', border: 'none' }}>
                                <LogOut size={24} style={{ transform: 'rotate(180deg)' }} />
                            </button>
                        </div>
                        <div style={{ padding: '0 20px', margin: '20px 0 10px 0' }}>
                            <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1.2px', color: 'rgba(255,255,255,0.4)', fontWeight: '600' }}>Menu</p>
                        </div>
                        <nav style={styles.nav}>
                            {navLinks.map((link, idx) => {
                                const Icon = link.icon;
                                const isActive = location.pathname.startsWith(link.path);
                                return (
                                    <Link
                                        key={idx}
                                        to={link.path}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={`nav-link ${isActive ? 'active' : ''}`}
                                        style={styles.navLink}
                                    >
                                        <Icon size={18} />
                                        {link.name}
                                    </Link>
                                );
                            })}
                        </nav>
                        <div style={styles.sidebarFooter}>
                            <button onClick={handleLogout} style={{ ...styles.actionBtn, backgroundColor: 'rgba(255,255,255,0.1)', color: 'white' }}>
                                <LogOut size={16} /> End Session
                            </button>
                        </div>
                    </aside>
                    <div style={{ flex: 1 }} onClick={() => setIsMobileMenuOpen(false)}></div>
                </div>
            )}
        </div>
    );
}

const styles = {
    layout: {
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: 'var(--color-bg)'
    },
    sidebar: {
        width: '280px',
        backgroundColor: '#1E1A18', // Deep luxurious charcoal 
        backgroundImage: 'linear-gradient(180deg, #2A2421 0%, #1A1614 100%)',
        color: 'white',
        flexDirection: 'column',
        position: 'fixed',
        top: 0, bottom: 0, left: 0,
        zIndex: 50,
        borderRight: '1px solid rgba(197, 160, 89, 0.1)',
        boxShadow: '4px 0 24px rgba(0,0,0,0.2)'
    },
    logoContainer: {
        padding: '35px 25px 25px 25px',
        position: 'relative',
        background: 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, transparent 100%)'
    },
    logo: {
        fontFamily: 'Playfair Display, serif',
        fontSize: '1.8rem',
        margin: 0,
        lineHeight: 1,
        color: 'white'
    },
    badge: {
        display: 'inline-block',
        color: 'var(--color-secondary)',
        fontSize: '0.7rem',
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: '2px',
        marginTop: '6px'
    },
    nav: {
        padding: '0 15px',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        flex: 1,
        overflowY: 'auto'
    },
    navLink: {
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        padding: '14px 18px',
        borderRadius: 'var(--radius-sm)',
        color: 'rgba(255,255,255,0.6)',
        transition: 'all 0.3s ease',
        fontSize: '0.9rem',
        fontWeight: '500',
        letterSpacing: '0.3px',
        textDecoration: 'none'
    },
    sidebarFooter: {
        padding: '25px',
        background: 'rgba(0,0,0,0.2)',
        borderTop: '1px solid rgba(255,255,255,0.05)'
    },
    userProfile: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '20px',
        padding: '12px',
        backgroundColor: 'rgba(255,255,255,0.03)',
        borderRadius: 'var(--radius-sm)',
        border: '1px solid rgba(255,255,255,0.05)'
    },
    userAvatar: {
        width: '36px',
        height: '36px',
        backgroundColor: 'var(--color-secondary)',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    actionBtn: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        width: '100%',
        padding: '14px',
        border: 'none',
        borderRadius: 'var(--radius-sm)',
        transition: 'all 0.3s ease',
        fontSize: '0.85rem',
        fontWeight: '600',
        letterSpacing: '0.5px',
        textTransform: 'uppercase',
        textDecoration: 'none',
        cursor: 'pointer'
    },
    main: {
        flex: 1,
        marginLeft: '280px',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: 'var(--color-bg)'
    },
    topbar: {
        height: '90px',
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--color-border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 40px',
        position: 'sticky',
        top: 0,
        zIndex: 40,
        boxShadow: '0 4px 20px rgba(0,0,0,0.02)'
    },
    searchBar: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        backgroundColor: 'var(--color-bg)',
        border: '1px solid var(--color-border)',
        padding: '10px 16px',
        borderRadius: 'var(--radius-full)',
        width: '280px',
        transition: 'all 0.3s ease'
    },
    searchInput: {
        border: 'none',
        background: 'transparent',
        outline: 'none',
        width: '100%',
        fontSize: '0.9rem',
        color: 'var(--color-text)',
        fontFamily: 'inherit'
    },
    content: {
        padding: '40px',
        flex: 1,
        overflowY: 'auto'
    }
};

if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.innerHTML = `
    .admin-sidebar { display: flex !important; }
    @media (max-width: 1024px) {
      .admin-sidebar { display: none !important; }
      main { margin-left: 0 !important; }
      .md\\:hidden { display: block !important; }
    }
    @media (min-width: 1025px) {
      .md\\:hidden { display: none !important; }
    }
    @keyframes slideRight {
      from { transform: translateX(-100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    .nav-link:hover {
      background-color: rgba(255,255,255,0.05);
      color: white !important;
      transform: translateX(4px);
    }
    .nav-link.active {
      background: linear-gradient(90deg, rgba(197, 160, 89, 0.15) 0%, transparent 100%);
      color: var(--color-secondary-light) !important;
      border-left: 3px solid var(--color-secondary);
      font-weight: 600 !important;
    }
    .admin-sidebar button:hover, .admin-sidebar a:hover {
      filter: brightness(1.2);
    }
  `;
    document.head.appendChild(style);
}
