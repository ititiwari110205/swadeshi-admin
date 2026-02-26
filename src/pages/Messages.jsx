import React from 'react';
import { useAdminContext } from '../context/AdminContext';
import { Mail, Phone, Calendar } from 'lucide-react';

export default function Messages() {
    const { messages } = useAdminContext();

    return (
        <div className="fade-in">
            <div className="flex justify-between items-center" style={{ marginBottom: '20px' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: '600', margin: 0 }} className="sm:text-2xl">User Communications</h2>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {messages.length === 0 ? (
                    <div className="card" style={{ textAlign: 'center', color: 'var(--color-text-muted)', padding: '50px 20px' }}>
                        No inquiries received from users. Inbox zero!
                    </div>
                ) : messages.map(msg => (
                    <div key={msg.id} className="card">
                        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-5 border-b border-border pb-4" style={{ marginBottom: '20px', borderBottom: '1px solid var(--color-border)', paddingBottom: '15px' }}>
                            <div>
                                <h3 style={{ fontSize: '1.1rem', marginBottom: '5px', color: 'var(--color-primary)', fontWeight: '600' }} className="sm:text-lg">{msg.name}</h3>
                                <div className="flex flex-col sm:flex-row gap-2 sm:gap-5 text-muted text-sm" style={{ display: 'flex', gap: '20px', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontWeight: '500' }}><Mail size={16} /> {msg.email}</span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontWeight: '500' }}><Phone size={16} /> {msg.phone}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-1.5 text-muted text-xs bg-bg p-1.5 sm:p-3 rounded-sm" style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--color-text-muted)', fontSize: '0.85rem', fontWeight: '500', backgroundColor: 'var(--color-bg)', padding: '6px 12px', borderRadius: 'var(--radius-sm)' }}>
                                <Calendar size={14} /> {new Date(msg.date).toLocaleString()}
                            </div>
                        </div>
                        <p style={{ lineHeight: 1.6, color: 'var(--color-text)', fontSize: '1.05rem', whiteSpace: 'pre-wrap' }}>{msg.message}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
