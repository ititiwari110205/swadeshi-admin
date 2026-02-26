import React, { useState } from 'react';
import { useAdminContext } from '../context/AdminContext';
import { Image as ImageIcon, Trash2, Plus, Upload } from 'lucide-react';

export default function SliderManagement() {
    const { sliders, addSlider, deleteSlider } = useAdminContext();
    const [isAdding, setIsAdding] = useState(false);
    const [newSlider, setNewSlider] = useState({ title: '', subtitle: '', image: '', active: true });

    const handleAdd = (e) => {
        e.preventDefault();
        if (!newSlider.title || !newSlider.image) return;
        addSlider(newSlider);
        setNewSlider({ title: '', subtitle: '', image: '', active: true });
        setIsAdding(false);
    };

    return (
        <div className="fade-in">
            <div className="flex justify-between items-center" style={{ marginBottom: '30px' }}>
                <div>
                    <h2 style={{ fontSize: '1.8rem', marginBottom: '5px' }}>Slider Management</h2>
                    <p style={{ color: 'var(--color-text-muted)' }}>Curate the homepage hero banner showcase</p>
                </div>
                <button className="btn btn-primary" onClick={() => setIsAdding(!isAdding)}>
                    {isAdding ? 'Cancel' : <><Plus size={18} style={{ marginRight: '8px' }} /> Add New Slide</>}
                </button>
            </div>

            {isAdding && (
                <div className="card fade-in" style={{ marginBottom: '30px', borderLeft: '4px solid var(--color-secondary)' }}>
                    <h3 style={{ marginBottom: '20px', fontSize: '1.2rem' }}>Create New Slide</h3>
                    <form onSubmit={handleAdd} className="grid grid-cols-2 gap-6">
                        <div className="form-group">
                            <label className="form-label">Slide Title</label>
                            <input
                                type="text"
                                className="form-input"
                                placeholder="E.g., Royal Wedding Collection"
                                value={newSlider.title}
                                onChange={(e) => setNewSlider({ ...newSlider, title: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Subtitle</label>
                            <input
                                type="text"
                                className="form-input"
                                placeholder="E.g., Discover the legacy"
                                value={newSlider.subtitle}
                                onChange={(e) => setNewSlider({ ...newSlider, subtitle: e.target.value })}
                            />
                        </div>
                        <div className="form-group" style={{ gridColumn: 'span 2' }}>
                            <label className="form-label">Image URL</label>
                            <div className="flex items-center gap-4">
                                <input
                                    type="url"
                                    className="form-input"
                                    placeholder="https://example.com/image.jpg"
                                    value={newSlider.image}
                                    onChange={(e) => setNewSlider({ ...newSlider, image: e.target.value })}
                                    required
                                />
                                <button type="button" className="btn btn-outline" style={{ whiteSpace: 'nowrap' }}>
                                    <Upload size={18} style={{ marginRight: '8px' }} /> Upload
                                </button>
                            </div>
                        </div>
                        <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'flex-end' }}>
                            <button type="submit" className="btn btn-primary">Save Slide</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-2 gap-6">
                {sliders.length === 0 ? (
                    <div className="card" style={{ gridColumn: 'span 2', textAlign: 'center', padding: '50px 20px' }}>
                        <ImageIcon size={48} color="var(--color-text-light)" style={{ margin: '0 auto 15px' }} />
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>No Slides Found</h3>
                        <p style={{ color: 'var(--color-text-muted)' }}>Add your first slide to showcase on the homepage.</p>
                    </div>
                ) : sliders.map(slider => (
                    <div key={slider.id} className="card" style={{ overflow: 'hidden', padding: 0, position: 'relative' }}>
                        <div style={{
                            height: '200px',
                            backgroundImage: `url(${slider.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}>
                            <div style={{
                                position: 'absolute',
                                top: 0, left: 0, right: 0, bottom: '80px',
                                background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-end',
                                padding: '20px',
                                color: 'white'
                            }}>
                                <h3 style={{ fontSize: '1.4rem', color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>{slider.title}</h3>
                                {slider.subtitle && <p style={{ color: 'var(--color-secondary)', fontSize: '0.9rem', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>{slider.subtitle}</p>}
                            </div>
                        </div>
                        <div className="flex justify-between items-center" style={{ padding: '20px' }}>
                            <span className="badge badge-success">Active Slide</span>
                            <button
                                onClick={() => deleteSlider(slider.id)}
                                className="btn btn-danger"
                                style={{ padding: '8px 12px' }}
                                title="Delete Slide"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
