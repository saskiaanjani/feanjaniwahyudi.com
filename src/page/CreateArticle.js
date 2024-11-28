import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import '../assets/css/CreateArticle.css';
import configUrl from '../ConfigUrl';
import SidebarDashboard from '../components/SidebarDashboard';


const CreateArticle = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [editorContent, setEditorContent] = useState('');
  const [tags, setTags] = useState('');
  const navigate = useNavigate();
  const [linkVideo, setLinkVidio] = useState('');
  const [showVideo, setShowVidio] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${configUrl.beBaseUrl}/api/categories`);
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditorChange = (content) => {
    setEditorContent(content);
  };

  const sanitizeHTML = (input) => {
    let sanitized = input.replace(/<script.*?>.*?<\/script>/gi, '');
    sanitized = sanitized.replace(/<p.*?>/gi, '');
    sanitized = sanitized.replace(/<\/p>/gi, '');
    sanitized = sanitized.replace(/<br\s*\/?>/gi, '');
    sanitized = sanitized.replace(/<[^>]*>/g, '');
    sanitized = sanitized.replace(/&nbsp;/gi, ' ');
    sanitized = sanitized.replace(/\s{2,}/g, ' ').trim();

    return sanitized;
  };

  const handleVideoLinkChange = (e) => {
    setLinkVidio(e.target.value);
    setShowVidio(null); 
  };

  const validateYouTubeLink = () => {
    const regex = /^(https?:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/;
    const isValidLink = regex.test(linkVideo);

    if (isValidLink) {
      const videoID = getYouTubeID(linkVideo);
      if (videoID) {
        setShowVidio(`https://www.youtube.com/embed/${videoID}`);
      } else {
        setShowVidio(null);
      }
    } else {
      setShowVidio(null);
    }
  };

  const getYouTubeID = (url) => {
    const regExp = /^.*(youtu\.be\/|v\/|\/u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    let sanitized = sanitizeHTML(editorContent);

    if (title.length > 255) {
      alert("Judul tidak boleh lebih dari 255 karakter.");
      return;
    }

    if (!title || !editorContent || !selectedCategory) {
      alert("Title, content, and category are required.");
      return;
    }

    try {
      const token = localStorage.getItem('authTokenSitusNews');

      if (!token) {
        navigate('/login');
        return;
      }

      let imageUrlToSave = null;

      if (image) {
        const formData = new FormData();
        formData.append('image', image);
        formData.append('title', title);

        const uploadResponse = await axios.post(`${configUrl.beBaseUrl}/api/upload-image`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });

        imageUrlToSave = uploadResponse.data.image_url;
      }

      const newArticle = {
        title,
        body: sanitized,
        tags,
        image_url: imageUrlToSave,
        category_id: selectedCategory,
        author_id: 1,
        linkVideo,
      };

      await axios.post(`${configUrl.beBaseUrl}/api/articles`, newArticle, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigate('/articles');
    } catch (error) {
      console.error('Error creating article:', error.response?.data || error.message);
    }
  };

  const handleCancel = () => {
    navigate('/articles');
  };

  return (
    <div>
    <div style={{display: 'flex'}}>
    <div style={{width: '20%'}} >
    <SidebarDashboard />
    </div>

    <div style={{ width: "100%", borderRadius: "6px" }}>
      <form onSubmit={handleSubmit} style={{ padding: "20px 2%" }}>
        <div style={{ textAlign: "center", padding: "20px 0" }}>
          <h1>Create Article</h1>
        </div>

        <div className='form-group'>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Tags:</label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Enter tags"
          />
        </div>

        <div>
        <label>Video YouTube</label>
        <input
          type="text"
          value={linkVideo}
          onChange={handleVideoLinkChange}
          placeholder="Masukkan link video YouTube"
          style={{ width: '300px', marginRight: '10px' }}
        />
        <button type="button" onClick={validateYouTubeLink}>
          Test Link
        </button>
      </div>
    
      {linkVideo && (
        <div style={{ marginTop: '20px' }}>
          <h4>Preview Video:</h4>
          <iframe
            width="560"
            height="315"
            src={showVideo}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="YouTube Video"
          ></iframe>
        </div>
      )}


        <div className="form-group">
          <label>Image / Photo:</label>
          <div className="file-upload-container">
            <label className="file-upload-box">
              <input
                type="file"
                name="image"
                id="image"
                onChange={handleFileChange}
                style={{ display: 'none' }}
                required
              />
              {!imagePreview && <span className="upload-icon">+</span>}
              {imagePreview && (
                <div className="wrapper-change-foto">
                  <span className="upload-change-foto">Change Photo?</span>
                  <div className="upload-icon"> + </div>
                </div>
              )}
            </label>
            {imagePreview && (
              <div className="preview-container">
                <img src={imagePreview} alt="Preview" className="preview-image" />
              </div>
            )}
          </div>
        </div>

        <div className="form-group">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <label>Full-Text Article:</label>
          </div>
          <Editor
            apiKey='260s93usk3f2obd5gpahb5ufpi8rw1nx71gybiynto1srqlt'
            value={editorContent}
            onEditorChange={handleEditorChange}
            init={{
              plugins: 'link image code',
              toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code',
            }}
          />
        </div>

        <div className="form-group">
          <label>Category:</label>
          <select
            name="category_id"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Select a category</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div style={{ margin: "50px", display: "flex", justifyContent: "center" }}>
          <button type="submit">Publish</button>
          <button
            style={{ marginLeft: "6px", backgroundColor: "#ff6d0082" }}
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
    </div>
    </div>
  );
};

export default CreateArticle;
