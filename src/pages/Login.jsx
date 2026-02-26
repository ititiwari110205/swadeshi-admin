import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminContext } from '../context/AdminContext';
import { Lock, Mail } from 'lucide-react';

export default function Login() {
    const { login } = useAdminContext();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center" style={{ minHeight: '100vh', backgroundColor: 'var(--color-primary-dark)' }}>
            <div className="card fade-in" style={{ width: '100%', maxWidth: '400px', padding: '40px' }}>
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', color: 'var(--color-primary)', marginBottom: '5px' }}>Swadeshi<span style={{ color: 'var(--color-secondary)' }}>Hub</span></h1>
                    <p style={{ color: 'var(--color-text-muted)' }}>Admin Portal Login</p>
                </div>

                {error && <div style={{ padding: '10px', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--color-error)', borderRadius: 'var(--radius-sm)', marginBottom: '20px', textAlign: 'center', fontSize: '0.9rem' }}>{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group" style={{ position: 'relative' }}>
                        <label className="form-label">Email Address</label>
                        <div style={{ position: 'relative' }}>
                            <Mail size={18} color="var(--color-text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                            <input type="email" required className="form-input" style={{ paddingLeft: '40px' }} value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@swadeshi.com" />
                        </div>
                    </div>
                    <div className="form-group" style={{ position: 'relative', marginBottom: '30px' }}>
                        <label className="form-label">Password</label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={18} color="var(--color-text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                            <input type="password" required className="form-input" style={{ paddingLeft: '40px' }} value={password} onChange={e => setPassword(e.target.value)} placeholder="admin123" />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px', fontSize: '1rem' }} disabled={loading}>
                        {loading ? 'Authenticating...' : 'Login Securely'}
                    </button>
                </form>

                <div style={{ marginTop: '20px', fontSize: '0.85rem', color: 'var(--color-text-muted)', textAlign: 'center' }}>
                    <p>Demo Credentials: admin@swadeshi.com / admin123</p>
                </div>
            </div>
        </div>
    );
}
