import React, { useState } from 'react';
import { useAdminContext } from '../context/AdminContext';
import { Plus, Edit2, Trash2, X, Check } from 'lucide-react';

export default function Categories() {
    const { categories, addCategory, updateCategory, deleteCategory } = useAdminContext();
    const [isEditing, setIsEditing] = useState(false);
    const [currentCat, setCurrentCat] = useState({ id: null, name: '', description: '' });

    const handleEdit = (cat) => {
        setCurrentCat(cat);
        setIsEditing(true);
    };

    const handleDelete = (id) => {
        if (window.confirm("Delete this clothing category? It may affect existing products.")) {
            deleteCategory(id);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentCat.id) {
            updateCategory(currentCat.id, currentCat);
        } else {
            addCategory({ name: currentCat.name, description: currentCat.description });
        }
        setIsEditing(false);
        setCurrentCat({ id: null, name: '', description: '' });
    };

    return (
        <div className="fade-in">
            <div className="flex justify-between items-center" style={{ marginBottom: '20px' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '600' }}>Apparel Categories</h2>
                <button
                    className="btn btn-primary"
                    onClick={() => {
                        setCurrentCat({ id: null, name: '', description: '' });
                        setIsEditing(true);
                    }}
                >
                    <Plus size={18} style={{ marginRight: '8px' }} /> New Category
                </button>
            </div>

            {isEditing && (
                <div className="card fade-in" style={{ marginBottom: '30px', borderTop: '4px solid var(--color-primary)' }}>
                    <div className="flex justify-between items-center" style={{ marginBottom: '20px' }}>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: '600' }}>{currentCat.id ? 'Modify Category' : 'Create Category'}</h3>
                        <button onClick={() => setIsEditing(false)} style={{ padding: '5px', borderRadius: '50%', backgroundColor: 'var(--color-bg)' }}><X size={20} /></button>
                    </div>
                    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
                        <div className="form-group" style={{ gridColumn: 'span 2' }}>
                            <label className="form-label">Category Title</label>
                            <input type="text" className="form-input" required value={currentCat.name} onChange={e => setCurrentCat({ ...currentCat, name: e.target.value })} placeholder="e.g. Sherwani, Nehru Jacket" />
                        </div>
                        <div className="form-group" style={{ gridColumn: 'span 2' }}>
                            <label className="form-label">Classification Description</label>
                            <textarea className="form-input" required rows="3" value={currentCat.description} onChange={e => setCurrentCat({ ...currentCat, description: e.target.value })} placeholder="Brief context..."></textarea>
                        </div>
                        <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'flex-end', gap: '15px' }}>
                            <button type="button" className="btn btn-outline" onClick={() => setIsEditing(false)}>Cancel Edit</button>
                            <button type="submit" className="btn btn-primary"><Check size={18} style={{ marginRight: '8px' }} /> Save Registration</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th style={{ width: '70px' }}>ID Ref</th>
                            <th>Category Name</th>
                            <th>Classification Context</th>
                            <th style={{ textAlign: 'right' }}>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map(cat => (
                            <tr key={cat.id}>
                                <td style={{ color: 'var(--color-text-muted)', fontFamily: 'monospace' }}>#{cat.id}</td>
                                <td style={{ fontWeight: '600', color: 'var(--color-primary)' }}>{cat.name}</td>
                                <td style={{ color: 'var(--color-text)' }}>{cat.description}</td>
                                <td style={{ textAlign: 'right' }}>
                                    <button onClick={() => handleEdit(cat)} style={{ padding: '8px', color: 'var(--color-primary)' }} title="Modify"><Edit2 size={18} /></button>
                                    <button onClick={() => handleDelete(cat.id)} style={{ padding: '8px', color: 'var(--color-error)' }} title="Remove Category"><Trash2 size={18} /></button>
                                </td>
                            </tr>
                        ))}
                        {categories.length === 0 && <tr><td colSpan="4" style={{ textAlign: 'center', padding: '30px', color: 'var(--color-text-muted)' }}>No categories configured.</td></tr>}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
