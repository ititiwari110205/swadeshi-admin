import React, { useState } from 'react';
import { useAdminContext } from '../context/AdminContext';
import { Plus, Edit2, Trash2, X, AlertCircle } from 'lucide-react';

export default function Products() {
    const { products, addProduct, updateProduct, deleteProduct, categories } = useAdminContext();
    const [isEditing, setIsEditing] = useState(false);
    const [currentProd, setCurrentProd] = useState({
        id: null, name: '', price: '', categoryId: '', image: '', description: '', features: '', featured: false, stock: ''
    });

    const handleEdit = (prod) => {
        setCurrentProd({
            ...prod,
            features: prod.features.join(', ')
        });
        setIsEditing(true);
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) deleteProduct(id);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const prodSubmit = {
            ...currentProd,
            price: Number(currentProd.price),
            categoryId: Number(currentProd.categoryId),
            stock: Number(currentProd.stock),
            features: currentProd.features.split(',').map(f => f.trim())
        };

        if (currentProd.id) {
            updateProduct(currentProd.id, prodSubmit);
        } else {
            addProduct(prodSubmit);
        }
        setIsEditing(false);
    };

    return (
        <div className="fade-in">
            <div className="flex justify-between items-center" style={{ marginBottom: '20px' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '600' }}>Product Inventory</h2>
                <button
                    className="btn btn-primary"
                    onClick={() => {
                        setCurrentProd({ id: null, name: '', price: '', categoryId: '', image: '', description: '', features: '', featured: false, stock: '' });
                        setIsEditing(true);
                    }}
                >
                    <Plus size={18} style={{ marginRight: '8px' }} /> Add New Product
                </button>
            </div>

            {isEditing && (
                <div className="card fade-in" style={{ marginBottom: '30px', borderTop: '4px solid var(--color-primary)' }}>
                    <div className="flex justify-between items-center" style={{ marginBottom: '20px' }}>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: '600' }}>{currentProd.id ? 'Edit Product Item' : 'Publish New Product'}</h3>
                        <button onClick={() => setIsEditing(false)} style={{ padding: '5px', backgroundColor: 'var(--color-bg)', borderRadius: '50%' }}><X size={20} /></button>
                    </div>
                    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">

                        <div className="form-group">
                            <label className="form-label">Product Name</label>
                            <input type="text" className="form-input" required value={currentProd.name} onChange={e => setCurrentProd({ ...currentProd, name: e.target.value })} />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Retail Price (₹)</label>
                            <input type="number" className="form-input" required value={currentProd.price} onChange={e => setCurrentProd({ ...currentProd, price: e.target.value })} />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Category Classification</label>
                            <select className="form-input" required value={currentProd.categoryId} onChange={e => setCurrentProd({ ...currentProd, categoryId: e.target.value })}>
                                <option value="">Select Category</option>
                                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Stock Quantity Available</label>
                            <input type="number" className="form-input" required value={currentProd.stock} onChange={e => setCurrentProd({ ...currentProd, stock: e.target.value })} />
                        </div>

                        <div className="form-group" style={{ gridColumn: 'span 2' }}>
                            <label className="form-label">Media Asset URL (Image)</label>
                            <input type="text" className="form-input" required value={currentProd.image} onChange={e => setCurrentProd({ ...currentProd, image: e.target.value })} />
                        </div>

                        <div className="form-group" style={{ gridColumn: 'span 2' }}>
                            <label className="form-label">Key Features</label>
                            <input type="text" className="form-input" required value={currentProd.features} onChange={e => setCurrentProd({ ...currentProd, features: e.target.value })} placeholder="Comma separated, e.g. Silk Blend, Dry Clean" />
                        </div>

                        <div className="form-group" style={{ gridColumn: 'span 2' }}>
                            <label className="form-label">Detailed Description</label>
                            <textarea className="form-input" required rows="3" value={currentProd.description} onChange={e => setCurrentProd({ ...currentProd, description: e.target.value })}></textarea>
                        </div>

                        <div className="form-group" style={{ gridColumn: 'span 2' }}>
                            <label className="flex items-center gap-2" style={{ cursor: 'pointer', display: 'inline-flex', padding: '10px', backgroundColor: 'var(--color-bg)', borderRadius: 'var(--radius-sm)' }}>
                                <input type="checkbox" checked={currentProd.featured} onChange={e => setCurrentProd({ ...currentProd, featured: e.target.checked })} style={{ width: '20px', height: '20px', accentColor: 'var(--color-primary)' }} />
                                <span style={{ fontWeight: '500' }}>Highlight this product on the main homepage</span>
                            </label>
                        </div>

                        <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'flex-end', gap: '15px', marginTop: '10px' }}>
                            <button type="button" className="btn btn-outline" onClick={() => setIsEditing(false)}>Cancel Edit</button>
                            <button type="submit" className="btn btn-primary">{currentProd.id ? 'Save Updates' : 'Add to Catalog'}</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th style={{ width: '80px' }}>Media</th>
                            <th>Product Details</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Inventory</th>
                            <th style={{ textAlign: 'right' }}>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(prod => (
                            <tr key={prod.id}>
                                <td>
                                    <img src={prod.image} alt={prod.name} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '6px', border: '1px solid var(--color-border)' }} />
                                </td>
                                <td>
                                    <p style={{ fontWeight: '600', marginBottom: '6px', color: 'var(--color-text)' }}>{prod.name}</p>
                                    {prod.featured && <span className="badge badge-primary">Featured Item</span>}
                                </td>
                                <td style={{ color: 'var(--color-text-muted)' }}>{categories.find(c => c.id === prod.categoryId)?.name}</td>
                                <td style={{ fontWeight: '600' }}>₹{prod.price.toLocaleString('en-IN')}</td>
                                <td>
                                    {prod.stock < 10 ? (
                                        <span className="badge badge-error" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                                            <AlertCircle size={14} /> {prod.stock} Left
                                        </span>
                                    ) : (
                                        <span className="badge badge-success">{prod.stock} in stock</span>
                                    )}
                                </td>
                                <td style={{ textAlign: 'right' }}>
                                    <button onClick={() => handleEdit(prod)} style={{ padding: '8px', color: 'var(--color-primary)' }} title="Modify"><Edit2 size={18} /></button>
                                    <button onClick={() => handleDelete(prod.id)} style={{ padding: '8px', color: 'var(--color-error)' }} title="Remove"><Trash2 size={18} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
