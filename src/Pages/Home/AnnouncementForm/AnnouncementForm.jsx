import React, { useState } from 'react';
import axios from 'axios';

const AnnouncementForm = () => {
    const [formData, setFormData] = useState({
        authorImage: '',
        authorName: '',
        title: '',
        description: ''
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/announcements', formData);
            alert('Announcement created!');
            setFormData({ authorImage: '', authorName: '', title: '', description: '' });
        } catch (err) {
            alert('Failed to create announcement.');
            console.log(err);
        }
    };

    return (
        <div className="max-w-xl mx-auto px-4 py-10">
            <h2 className="text-2xl font-bold mb-6">📢 Make Announcement</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input name="authorImage" placeholder="Author Image URL" value={formData.authorImage} onChange={handleChange} className="input input-bordered w-full" required />
                <input name="authorName" placeholder="Author Name" value={formData.authorName} onChange={handleChange} className="input input-bordered w-full" required />
                <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} className="input input-bordered w-full" required />
                <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="textarea textarea-bordered w-full" required />
                <button type="submit" className="btn btn-primary">Publish</button>
            </form>
        </div>
    );
};

export default AnnouncementForm;
