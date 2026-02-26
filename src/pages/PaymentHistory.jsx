import React from 'react';
import { useAdminContext } from '../context/AdminContext';
import { CreditCard, IndianRupee, CheckCircle, Clock } from 'lucide-react';

export default function PaymentHistory() {
    const { payments } = useAdminContext();

    const totalRevenue = payments.reduce((acc, curr) => acc + (curr.status === 'Completed' ? curr.amount : 0), 0);

    return (
        <div className="fade-in">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6" style={{ marginBottom: '30px' }}>
                <div>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '5px', margin: 0 }} className="sm:text-3xl">Payment History</h2>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Monitor Razorpay transactions and settlements</p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" style={{ marginBottom: '30px' }}>
                <div className="card flex items-center gap-4">
                    <div style={{ backgroundColor: 'rgba(212, 175, 55, 0.15)', padding: '15px', borderRadius: '50%' }}>
                        <IndianRupee size={28} color="var(--color-secondary-dark)" />
                    </div>
                    <div>
                        <p className="form-label" style={{ marginBottom: '0', fontSize: '0.8rem', textTransform: 'uppercase' }}>Total Collections</p>
                        <h3 style={{ fontSize: '1.5rem', color: 'var(--color-primary-dark)' }}>₹{totalRevenue.toLocaleString('en-IN')}</h3>
                    </div>
                </div>
                <div className="card flex items-center gap-4">
                    <div style={{ backgroundColor: 'rgba(21, 128, 61, 0.1)', padding: '15px', borderRadius: '50%' }}>
                        <CheckCircle size={28} color="var(--color-success)" />
                    </div>
                    <div>
                        <p className="form-label" style={{ marginBottom: '0', fontSize: '0.8rem', textTransform: 'uppercase' }}>Successful Payments</p>
                        <h3 style={{ fontSize: '1.5rem', color: 'var(--color-primary-dark)' }}>{payments.filter(p => p.status === 'Completed').length}</h3>
                    </div>
                </div>
                <div className="card flex items-center gap-4">
                    <div style={{ backgroundColor: 'rgba(217, 119, 6, 0.1)', padding: '15px', borderRadius: '50%' }}>
                        <CreditCard size={28} color="var(--color-warning)" />
                    </div>
                    <div>
                        <p className="form-label" style={{ marginBottom: '0', fontSize: '0.8rem', textTransform: 'uppercase' }}>Total Transactions</p>
                        <h3 style={{ fontSize: '1.5rem', color: 'var(--color-primary-dark)' }}>{payments.length}</h3>
                    </div>
                </div>
            </div>

            <div className="admin-table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Transaction ID</th>
                            <th>Order Ref</th>
                            <th>Date & Time</th>
                            <th>Method</th>
                            <th>Amount</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.length === 0 ? (
                            <tr>
                                <td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: 'var(--color-text-light)' }}>
                                    <Clock size={32} style={{ margin: '0 auto 10px', display: 'block' }} />
                                    No payment records found
                                </td>
                            </tr>
                        ) : payments.map(payment => (
                            <tr key={payment.id}>
                                <td style={{ fontFamily: 'monospace', fontWeight: 'bold' }}>{payment.id}</td>
                                <td style={{ color: 'var(--color-primary)' }}>#{payment.orderId.replace('ORD', '')}</td>
                                <td>
                                    <div style={{ fontSize: '0.9rem' }}>{new Date(payment.date).toLocaleDateString()}</div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{new Date(payment.date).toLocaleTimeString()}</div>
                                </td>
                                <td>
                                    <span className="badge" style={{ backgroundColor: '#ebf4ff', color: '#2b6cb0', border: '1px solid #c3dafe' }}>
                                        {payment.method}
                                    </span>
                                </td>
                                <td style={{ fontWeight: '600', color: 'var(--color-text)' }}>₹{payment.amount.toLocaleString('en-IN')}</td>
                                <td>
                                    <span className={`badge ${payment.status === 'Completed' ? 'badge-success' : payment.status === 'Failed' ? 'badge-error' : 'badge-warning'}`}>
                                        {payment.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
