import React from 'react';
import { useAdminContext } from '../context/AdminContext';
import { Package, ShoppingBag, IndianRupee, MessageSquare, TrendingUp, AlertCircle, ShoppingCart, Tag, ArrowUpRight } from 'lucide-react';

export default function Dashboard() {
    const { products, orders, categories, messages } = useAdminContext();

    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const pendingOrders = orders.filter(o => o.status === 'Pending').length;
    const lowStockProducts = products.filter(p => p.stock < 10);

    const recentOrders = [...orders].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

    return (
        <div className="fade-in">
            {/* KPI Cards */}
            <div className="grid grid-cols-4 gap-6" style={{ marginBottom: '40px' }}>
                <div className="card hover-lift" style={{ ...styles.kpiCard, borderTop: '4px solid var(--color-primary)' }}>
                    <div className="flex justify-between items-center" style={{ marginBottom: '15px' }}>
                        <div style={{ ...styles.iconBox, backgroundColor: 'rgba(92, 21, 21, 0.08)' }}>
                            <IndianRupee size={22} color="var(--color-primary)" />
                        </div>
                        <span className="badge badge-success" style={{ padding: '4px 8px', fontSize: '0.65rem' }}>+12.5%</span>
                    </div>
                    <p style={styles.cardTitle}>Gross Revenue</p>
                    <h3 style={styles.cardValue}>₹{totalRevenue.toLocaleString('en-IN')}</h3>
                    <div style={styles.cardFooter}>
                        <TrendingUp size={14} color="var(--color-text-muted)" /> <span style={{ color: 'var(--color-text-muted)' }}>Compared to last week</span>
                    </div>
                </div>

                <div className="card hover-lift" style={{ ...styles.kpiCard, borderTop: '4px solid var(--color-secondary)' }}>
                    <div className="flex justify-between items-center" style={{ marginBottom: '15px' }}>
                        <div style={{ ...styles.iconBox, backgroundColor: 'rgba(197, 160, 89, 0.15)' }}>
                            <ShoppingBag size={22} color="var(--color-secondary-dark)" />
                        </div>
                    </div>
                    <p style={styles.cardTitle}>Sales Volume</p>
                    <h3 style={styles.cardValue}>{orders.length}</h3>
                    <div style={styles.cardFooter}>
                        <span style={{ color: 'var(--color-warning)', fontWeight: '600' }}>{pendingOrders}</span> awaiting fulfillment
                    </div>
                </div>

                <div className="card hover-lift" style={{ ...styles.kpiCard, borderTop: '4px solid #1c1917' }}>
                    <div className="flex justify-between items-center" style={{ marginBottom: '15px' }}>
                        <div style={{ ...styles.iconBox, backgroundColor: 'rgba(28, 25, 23, 0.08)' }}>
                            <Package size={22} color="#1c1917" />
                        </div>
                    </div>
                    <p style={styles.cardTitle}>Active Inventory</p>
                    <h3 style={styles.cardValue}>{products.length}</h3>
                    <div style={styles.cardFooter}>
                        Across {categories.length} defined collections
                    </div>
                </div>

                <div className="card hover-lift" style={{ ...styles.kpiCard, borderTop: '4px solid var(--color-success)' }}>
                    <div className="flex justify-between items-center" style={{ marginBottom: '15px' }}>
                        <div style={{ ...styles.iconBox, backgroundColor: 'rgba(30, 96, 56, 0.08)' }}>
                            <MessageSquare size={22} color="var(--color-success)" />
                        </div>
                    </div>
                    <p style={styles.cardTitle}>Client Inquiries</p>
                    <h3 style={styles.cardValue}>{messages.length}</h3>
                    <div style={styles.cardFooter}>
                        Unread customer support threads
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-8">
                {/* Recent Orders Table */}
                <div className="card" style={{ gridColumn: 'span 2', padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                    <div className="flex justify-between items-center" style={{ padding: '24px 32px', borderBottom: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)' }}>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: '600', mragin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <ShoppingCart size={20} color="var(--color-primary)" /> Latest Transactions
                        </h3>
                        <button className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '0.75rem' }}>View All</button>
                    </div>
                    <div className="admin-table-container" style={{ border: 'none', borderRadius: 0, boxShadow: 'none' }}>
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Order Info</th>
                                    <th>Date</th>
                                    <th>Total Value</th>
                                    <th>Fulfillment Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentOrders.length === 0 ? (
                                    <tr><td colSpan="5" style={{ textAlign: 'center', padding: '40px' }}>No orders found in the database.</td></tr>
                                ) : recentOrders.map(order => (
                                    <tr key={order.id}>
                                        <td>
                                            <p style={{ fontWeight: '600', color: 'var(--color-text)', marginBottom: '4px' }}>{order.address.fullName}</p>
                                            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{order.id}</p>
                                        </td>
                                        <td style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>{new Date(order.date).toLocaleDateString()}</td>
                                        <td style={{ fontWeight: 'bold' }}>₹{order.total.toLocaleString('en-IN')}</td>
                                        <td>
                                            <span className={`badge ${order.status === 'Pending' ? 'badge-error' : order.status === 'Delivered' ? 'badge-success' : 'badge-warning'}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td>
                                            <button style={{ color: 'var(--color-secondary-dark)', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', fontWeight: '600' }}>
                                                Details <ArrowUpRight size={14} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Right Column Alerts */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>

                    {/* Inventory Alert Card */}
                    <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
                        <div className="flex justify-between items-center" style={{ padding: '20px 24px', backgroundColor: 'rgba(155, 34, 34, 0.05)', borderBottom: '1px solid rgba(155, 34, 34, 0.1)' }}>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: '600', margin: 0, display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--color-error)' }}>
                                <AlertCircle size={20} /> Low Inventory
                            </h3>
                            <span className="badge badge-error">{lowStockProducts.length} Items</span>
                        </div>
                        <div style={{ padding: '10px 24px', maxHeight: '300px', overflowY: 'auto' }}>
                            {lowStockProducts.length === 0 ? (
                                <p style={{ color: 'var(--color-text-muted)', textAlign: 'center', padding: '30px 0' }}>All stock levels are optimal.</p>
                            ) : lowStockProducts.map(product => (
                                <div key={product.id} className="flex items-center gap-4 hover-lift" style={{ padding: '15px 0', borderBottom: '1px solid var(--color-border)' }}>
                                    <div style={{ width: '50px', height: '60px', borderRadius: '4px', overflow: 'hidden', flexShrink: 0 }}>
                                        <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <p style={{ fontWeight: '600', fontSize: '0.9rem', marginBottom: '4px', lineHeight: 1.2, color: 'var(--color-primary-dark)' }}>{product.name}</p>
                                        <p style={{ color: 'var(--color-error)', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Stock: {product.stock} units</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Stats Block */}
                    <div className="card" style={{ padding: '24px' }}>
                        <div className="flex justify-between items-center" style={{ marginBottom: '20px' }}>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: '600', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Tag size={20} color="var(--color-secondary-dark)" /> Bestseller Snapshot
                            </h3>
                        </div>
                        <div style={{ backgroundColor: 'var(--color-bg)', padding: '20px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}>
                            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '5px' }}>Top Performing Category</p>
                            <h4 style={{ fontSize: '1.2rem', color: 'var(--color-primary-dark)', marginBottom: '15px' }}>Men's Sherwanis</h4>

                            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '5px' }}>Top Selling Product</p>
                            <h4 style={{ fontSize: '1.1rem', color: 'var(--color-text)', marginBottom: '5px' }}>Classic Ivory Cotton Silk Kurta</h4>
                            <p style={{ fontSize: '0.9rem', color: 'var(--color-success)', fontWeight: 'bold' }}>35 Sales this month</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

const styles = {
    kpiCard: {
        display: 'flex',
        flexDirection: 'column',
        padding: '24px',
        backgroundColor: 'var(--color-surface)',
        position: 'relative',
        overflow: 'hidden'
    },
    iconBox: {
        width: '42px',
        height: '42px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    cardTitle: {
        color: 'var(--color-text-muted)',
        fontSize: '0.8rem',
        fontWeight: '600',
        marginBottom: '4px',
        textTransform: 'uppercase',
        letterSpacing: '1px'
    },
    cardValue: {
        fontSize: '2.4rem',
        fontWeight: '700',
        color: 'var(--color-text)',
        fontFamily: 'Outfit, sans-serif',
        marginBottom: '10px'
    },
    cardFooter: {
        marginTop: 'auto',
        fontSize: '0.85rem',
        color: 'var(--color-text-muted)',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        paddingTop: '15px',
        borderTop: '1px solid var(--color-border)'
    }
};
