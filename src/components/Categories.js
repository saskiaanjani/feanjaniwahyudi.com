import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import configUrl from '../ConfigUrl';
import SidebarDashboard from './SidebarDashboard';
import '../assets/css/CreateArticle.css';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newCategory, setNewCategory] = useState('');
    const [editingCategoryId, setEditingCategoryId] = useState(null); 
    const [editingCategoryName, setEditingCategoryName] = useState(''); 
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${configUrl.beBaseUrl}/api/categories`);
                setCategories(response.data);
            } catch (error) {
                console.error('Error mengambil kategori:', error.response?.data || error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    if (loading) {
        return <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
           <img src="https://www.anjaniwahyudi.com/imgloading.svg" style={{width: '200px', height: '140px'}} alt='imgloading'></img>
            </div>;
    }

    const handleAddCategory = async (e) => {
        e.preventDefault();
        if (!newCategory) {
            alert("Nama kategori diperlukan.");
            return;
        }

        try {
            const token = localStorage.getItem('authTokenSitusNews');

            if (!token) {
                navigate('/login');
                return;
            }

            const response = await axios.post(`${configUrl.beBaseUrl}/api/categories`, { name: newCategory }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setCategories([response.data, ...categories]);
            setNewCategory('');
        } catch (error) {
            console.error('Error menambahkan kategori:', error.response?.data || error.message);
        }
    };

    const handleDeleteCategory = async (categoryId) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus kategori ini?')) {
            try {
                const token = localStorage.getItem('authTokenSitusNews');

                if (!token) {
                    navigate('/login');
                    return;
                }

                await axios.delete(`${configUrl.beBaseUrl}/api/categories/${categoryId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setCategories((prevCategories) => prevCategories.filter(category => category.id !== categoryId));
            } catch (error) {
                console.error('Error menghapus kategori:', error.response?.data || error.message);
            }
        }
    };

    const handleEditCategory = (category) => {
        setEditingCategoryId(category.id); 
        setEditingCategoryName(category.name); 
    };

    const handleUpdateCategory = async (e) => {
        e.preventDefault();
        if (!editingCategoryName) {
            alert("Nama kategori diperlukan.");
            return;
        }

        try {
            const token = localStorage.getItem('authTokenSitusNews');

            if (!token) {
                navigate('/login');
                return;
            }

            const response = await axios.put(`${configUrl.beBaseUrl}/api/categories/${editingCategoryId}`, { name: editingCategoryName }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setCategories((prevCategories) => prevCategories.map(category => {
                if (category.id === editingCategoryId) {
                    return response.data; 
                }
                return category; 
            }));

            setEditingCategoryId(null); 
            setEditingCategoryName(''); 
        } catch (error) {
            console.error('Error memperbarui kategori:', error.response?.data || error.message);
        }
    };

    const styles = {
        table: {
            width: '100%',
            borderCollapse: 'collapse',
            marginTop: '30px',
        },
        th: {
            border: '1px solid #ddd',
            padding: '8px',
            backgroundColor: '#f2f2f2',
        },
        td: {
            border: '1px solid #ddd',
            padding: '8px',
            textAlign: 'center',
        },
        button: {
            padding: '5px 10px',
            margin: '5px',
            cursor: 'pointer',
        },
        container: {
            flex: 1,
            padding: '10px',
            marginLeft: '300px', 
            width: '75%', 
            marginTop: '80px', 
            marginRight: '50px',
        }
    };

    return (
        <div style={{ display: 'flex', width: '100vw' }}>
            <SidebarDashboard />
            <div style={styles.container}>
                <div className="add-category">
                    <input
                        type="text"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        placeholder="Masukkan nama kategori baru"
                        style={{marginBottom:'0'}}
                    />
                    <button onClick={handleAddCategory} style={{padding:'10.5px'}}>Tambah</button>
                </div>

                {editingCategoryId && (
                    <div className="edit-category">
                        <input
                            type="text"
                            value={editingCategoryName}
                            onChange={(e) => setEditingCategoryName(e.target.value)}
                            placeholder="Ubah nama kategori"
                        />
                        <button onClick={handleUpdateCategory}>Perbarui</button>
                    </div>
                )}

                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>No</th>
                            <th style={styles.th}>Nama Kategori</th>
                            <th style={styles.th}>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category, index) => (
                            <tr key={category.id}>
                                <td style={styles.td}>{index + 1}</td>
                                <td style={styles.td}>{category.name}</td>
                                <td style={styles.td}>
                                    <button
                                        style={{ ...styles.button, backgroundColor: 'green', color: 'white' }}
                                        onClick={() => handleEditCategory(category)}
                                    >
                                        Ubah
                                    </button>
                                    <button
                                        style={{ ...styles.button, backgroundColor: 'red', color: 'white' }}
                                        onClick={() => handleDeleteCategory(category.id)}
                                    >
                                        Hapus
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Categories;
