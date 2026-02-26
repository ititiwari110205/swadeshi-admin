import React from 'react';
import { useAdminContext } from '../context/AdminContext';
import { RotateCcw } from 'lucide-react';

export default function Orders() {
    const { orders, updateOrderStatus } = useAdminContext();

    const handleStatusChange = (orderId, newStatus) => {
        updateOrderStatus(orderId, newStatus);
    };

    return (
        <div className="fade-in">
            <div className="flex justify-between items-center" style={{ marginBottom: '20px' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '600' }}>Apparel Order Fulfillment</h2>
            </div>

            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Order Identity</th>
                            <th>Dispatch Details</th>
                            <th>Net Amount</th>
                            <th>Line Items</th>
                            <th>Current Status</th>
                            <th style={{ textAlign: 'right' }}>Action / Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length === 0 ? (
                            <tr><td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: 'var(--color-text-muted)' }}>No active orders found in the system.</td></tr>
                        ) : orders.map(order => (
                            <tr key={order.id}>
                                <td>
                                    <p style={{ fontWeight: '600', marginBottom: '4px', color: 'var(--color-primary)' }}>{order.id}</p>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>{new Date(order.date).toLocaleString()}</p>
                                </td>
                                <td>
                                    <p style={{ fontWeight: '600', marginBottom: '4px' }}>{order.address.fullName}</p>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '5px' }}>✆ +91 {order.address.mobile}</p>
                                </td>
                                <td style={{ fontWeight: '700', fontSize: '1.1rem', color: 'var(--color-text)' }}>₹{order.total.toLocaleString('en-IN')}</td>
                                <td>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>{order.items.length} apparel set(s)</p>
                                </td>
                                <td>
                                    <span className={`badge ${order.status === 'Pending' ? 'badge-error' : order.status === 'Processing' ? 'badge-warning' : 'badge-success'}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td style={{ textAlign: 'right' }}>
                                    <select
                                        className="form-input"
                                        value={order.status}
                                        onChange={e => handleStatusChange(order.id, e.target.value)}
                                        style={{ padding: '8px 12px', fontSize: '0.9rem', width: 'auto', display: 'inline-block', backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)' }}
                                    >
                                        <option value="Pending">Awaiting Review</option>
                                        <option value="Processing">Processing</option>
                                        <option value="Shipped">Dispatched</option>
                                        <option value="Delivered">Delivered (Closed)</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div style={{ marginTop: '20px', padding: '15px', backgroundColor: 'rgba(212, 175, 55, 0.1)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-secondary)' }}>
                <p style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--color-text-muted)', margin: 0, fontWeight: '500' }}>
                    <RotateCcw size={18} color="var(--color-secondary)" /> Note: Cancellation is hard-disabled after the order review is confirmed. Proceed with caution.
                </p>
            </div>
        </div>
    );
}
