import React, { createContext, useContext, useState, useEffect } from 'react';

const AdminContext = createContext();

const initialCategories = [
    { id: 1, name: "Kurta Pyjama", description: "Traditional Indian Kurta Pyjama for Men" },
    { id: 2, name: "Sherwani", description: "Royal Sherwanis for weddings and occasions" },
    { id: 3, name: "Nehru Jackets", description: "Classic Nehru Jackets to layer your ethnic wear" },
    { id: 4, name: "Dhoti Kurta", description: "Authentic Dhoti Kurta sets" }
];

const initialSliders = [
    { id: 1, title: "Royal Wedding Collection", subtitle: "Handcrafted Sherwanis for the Modern Groom", image: "https://image.pollinations.ai/prompt/Royal%20Indian%20Wedding%20Groom%20wearing%20Sherwani%20Palace%20background?width=1600&height=800&nologo=true", active: true },
    { id: 2, title: "Festive Elegance", subtitle: "Kurta Pyjamas that redefine tradition", image: "https://image.pollinations.ai/prompt/Group%20of%20Indian%20Men%20wearing%20Kurta%20Pyjama%20festive%20diwali%20background?width=1600&height=800&nologo=true", active: true }
];

const initialPayments = [
    { id: "PAY987654321", orderId: "ORD1700000001", amount: 15999, method: "Razorpay", date: new Date(Date.now() - 86400000).toISOString(), status: "Completed" },
    { id: "PAY987654322", orderId: "ORD1700000002", amount: 4998, method: "Razorpay", date: new Date(Date.now() - 172800000).toISOString(), status: "Completed" }
];

const initialProducts = [
    {
        id: 1, name: "Regal Maroon Zardozi Sherwani", price: 18500, categoryId: 2, stock: 8,
        image: "https://image.pollinations.ai/prompt/Luxurious%20Indian%20Groom%20Sherwani%20Maroon%20Zardozi%20embroidery?width=800&height=1000&nologo=true",
        description: "An incredibly luxurious raw silk sherwani designed for the modern groomsman.",
        features: ["100% Raw Silk Base", "Authentic Zardozi Craftsmanship"], featured: true
    },
    {
        id: 2, name: "Classic Ivory Cotton Silk Kurta Pyjama", price: 2899, categoryId: 1, stock: 35,
        image: "https://image.pollinations.ai/prompt/Indian%20Man%20wearing%20Ivory%20Cotton%20Silk%20Kurta%20Pyjama%20festive?width=800&height=1000&nologo=true",
        description: "An essential staple for every Indian man’s wardrobe. Lightweight ivory cream kurta.",
        features: ["Premium Cotton Silk Blend", "Comfortable Mandarin Collar"], featured: true
    },
    {
        id: 3, name: "Golden Brocade Woven Nehru Jacket", price: 3950, categoryId: 3, stock: 22,
        image: "https://image.pollinations.ai/prompt/Indian%20Man%20wearing%20Golden%20Brocade%20Nehru%20Jacket%20over%20Kurta?width=800&height=1000&nologo=true",
        description: "Elevate your basic kurta with this royal golden woven Nehru jacket.",
        features: ["Intricate Jacquard Brocade", "Smooth Satin Lining"], featured: true
    },
    {
        id: 4, name: "Haldi Special Mustard Dhoti Kurta", price: 5200, categoryId: 4, stock: 12,
        image: "https://image.pollinations.ai/prompt/Indian%20Groom%20wearing%20Mustard%20Yellow%20Dhoti%20Kurta%20Haldi%20ceremony?width=800&height=1000&nologo=true",
        description: "Perfectly curated for pre-wedding Haldi ceremonies. Mustard yellow cotton.",
        features: ["Breathable Pure Cotton", "Pre-stitched Ready Dhoti"], featured: false
    },
    {
        id: 5, name: "Midnight Blue Velvet Jodhpuri Suit", price: 22000, categoryId: 2, stock: 5,
        image: "https://image.pollinations.ai/prompt/Indian%20Man%20wearing%20Midnight%20Blue%20Velvet%20Jodhpuri%20Bandhgala%20Suit?width=800&height=1000&nologo=true",
        description: "Make a powerful statement at evening receptions with this Jodhpuri suit.",
        features: ["Imported Premium Velvet", "Tonal Handcrafted Motifs"], featured: true
    }
];

const initialOrders = [
    {
        id: "ORD1700000001",
        total: 15999,
        status: "Pending",
        date: new Date(Date.now() - 86400000).toISOString(),
        address: { fullName: "Rahul Sharma", mobile: "9876543210" },
        items: [{ name: "Regal Maroon Silk Sherwani", quantity: 1, price: 15999 }]
    },
    {
        id: "ORD1700000002",
        total: 4998,
        status: "Processing",
        date: new Date(Date.now() - 172800000).toISOString(),
        address: { fullName: "Amit Patel", mobile: "9123456780" },
        items: [{ name: "Classic Cream Kurta Pyjama", quantity: 2, price: 2499 }]
    }
];

const initialMessages = [
    {
        id: 1,
        name: "Vikram Singh",
        email: "vikram@example.com",
        phone: "9988776655",
        message: "Do you offer custom tailoring for sherwanis?",
        date: new Date(Date.now() - 3600000).toISOString()
    }
];

export const AdminProvider = ({ children }) => {
    const [adminUser, setAdminUser] = useState(null);

    // Try to load from local storage to persist between reloads
    const loadInitial = (key, defaultData) => {
        const saved = localStorage.getItem(key);
        return saved ? JSON.parse(saved) : defaultData;
    };

    const [products, setProducts] = useState(() => loadInitial('swadeshi_products_v2', initialProducts));
    const [categories, setCategories] = useState(() => loadInitial('swadeshi_categories_v2', initialCategories));
    const [orders, setOrders] = useState(() => loadInitial('swadeshi_orders_v2', initialOrders));
    const [messages, setMessages] = useState(() => loadInitial('swadeshi_messages_v2', initialMessages));
    const [sliders, setSliders] = useState(() => loadInitial('swadeshi_sliders_v2', initialSliders));
    const [payments, setPayments] = useState(() => loadInitial('swadeshi_payments_v2', initialPayments));

    // Sync to local storage
    useEffect(() => localStorage.setItem('swadeshi_products_v2', JSON.stringify(products)), [products]);
    useEffect(() => localStorage.setItem('swadeshi_categories_v2', JSON.stringify(categories)), [categories]);
    useEffect(() => localStorage.setItem('swadeshi_orders_v2', JSON.stringify(orders)), [orders]);
    useEffect(() => localStorage.setItem('swadeshi_messages_v2', JSON.stringify(messages)), [messages]);
    useEffect(() => localStorage.setItem('swadeshi_sliders_v2', JSON.stringify(sliders)), [sliders]);
    useEffect(() => localStorage.setItem('swadeshi_payments_v2', JSON.stringify(payments)), [payments]);

    // Auth
    useEffect(() => {
        const user = localStorage.getItem('adminUser');
        if (user) setAdminUser(JSON.parse(user));
    }, []);

    const login = (email, password) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (email === "admin@swadeshi.com" && password === "admin123") {
                    const u = { name: "SuperAdmin", email, role: "admin" };
                    setAdminUser(u);
                    localStorage.setItem('adminUser', JSON.stringify(u));
                    resolve(u);
                } else {
                    reject(new Error("Invalid admin credentials"));
                }
            }, 1000);
        });
    };

    const logout = () => {
        setAdminUser(null);
        localStorage.removeItem('adminUser');
    };

    // Actions
    const addCategory = (cat) => setCategories([...categories, { ...cat, id: Date.now() }]);
    const updateCategory = (id, cat) => setCategories(categories.map(c => c.id === id ? { ...c, ...cat } : c));
    const deleteCategory = (id) => setCategories(categories.filter(c => c.id !== id));

    const addProduct = (prod) => setProducts([...products, { ...prod, id: Date.now() }]);
    const updateProduct = (id, prod) => setProducts(products.map(p => p.id === id ? { ...p, ...prod } : p));
    const deleteProduct = (id) => setProducts(products.filter(p => p.id !== id));

    const updateOrderStatus = (orderId, status) => setOrders(orders.map(o => o.id === orderId ? { ...o, status } : o));

    const addSlider = (slider) => setSliders([...sliders, { ...slider, id: Date.now() }]);
    const deleteSlider = (id) => setSliders(sliders.filter(s => s.id !== id));

    return (
        <AdminContext.Provider value={{
            adminUser, login, logout,
            products, addProduct, updateProduct, deleteProduct,
            categories, addCategory, updateCategory, deleteCategory,
            orders, updateOrderStatus,
            messages,
            sliders, addSlider, deleteSlider,
            payments
        }}>
            {children}
        </AdminContext.Provider>
    );
};

export const useAdminContext = () => useContext(AdminContext);
