import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import configUrl from '../ConfigUrl';
import { Editor } from '@tinymce/tinymce-react'; 
import SidebarDashboard from '../components/SidebarDashboard';

const EditArticle = () => {
  const { id } = useParams();
  const [article, setArticle] = useState({
    title: '',
    tags: '',
    image_url: '',
    linkVideo: '',
    body: '',
    category_id: '',
    author_id: '',
  });
  const [categories, setCategories] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [newImagePreview, setnewImagePreview] = useState(null);
  const [tags, setTags] = useState('');
  const [editorContent, setEditorContent] = useState('');
  const navigate = useNavigate();
  const [linkVideo, setLinkVidio] = useState('');
  const [showVideo, setShowVidio] = useState(null);
  
  useEffect(() => {
    const fetchArticleAndCategories = async () => {
      try {
        const articleResponse = await axios.get(`${configUrl.beBaseUrl}/api/articles/${id}`);
        setArticle({
          title: articleResponse.data.title || '',
          image_url: articleResponse.data.image_url || '',
          category_id: articleResponse.data.category_id || '',
          body: articleResponse.data.body || '',
          tags: articleResponse.data.tags || '',
          linkVideo: articleResponse.data.linkVideo || '',
          author_id: articleResponse.data.author_id || '',
        });
        setEditorContent(articleResponse.data.body || '');
        setLinkVidio(articleResponse.data.linkVideo);
  
        if (articleResponse.data.image_url) {
          // console.log(articleResponse.data.image_url, 'articleResponse.data.image_url');
          setImagePreview(articleResponse.data.image_url);
        }
        
        const categoriesResponse = await axios.get(`${configUrl.beBaseUrl}/api/categories`);
        setCategories(categoriesResponse.data);
        setTags(articleResponse.data.tags || '');
        
  
      } catch (error) {
        console.error('Error fetching article or categories:', error);
      }
    };
  
    fetchArticleAndCategories();
  }, [id, imagePreview]); 
  

  let sanitizeHTML = (input) => {
    let sanitized = input.replace(/<script.*?>.*?<\/script>/gi, '');
    sanitized = sanitized.replace(/<p.*?>/gi, ''); 
    sanitized = sanitized.replace(/<\/p>/gi, '');  
    sanitized = sanitized.replace(/<br\s*\/?>/gi, ''); 
    sanitized = sanitized.replace(/<[^>]*>/g, ''); 
    sanitized = sanitized.replace(/&nbsp;/gi, ' ');
    sanitized = sanitized.replace(/\s{2,}/g, ' ').trim();
  
    return sanitized;
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'tags') {
      setTags(value);  
    }

    setArticle(prevArticle => ({
      ...prevArticle,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setnewImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditorChange = (content) => {
    setEditorContent(content); 
    setArticle((prevArticle) => ({ ...prevArticle, body: content }));  
  };  

  const handleVideoLinkChange = (e) => {
    const newLinkVideo = e.target.value;
    setLinkVidio(newLinkVideo);
    setArticle(prevArticle => ({
      ...prevArticle,
      linkVideo: newLinkVideo 
    }));
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
   
    if (!article.body && editorContent) {
      setArticle((prevArticle) => ({ ...prevArticle, body: editorContent }));
    }
    
    if (!article.title || !article.body || !article.category_id) {
      alert("Title, body, and category are required.");
      return;
    }
  
    try {
      const token = localStorage.getItem('authTokenSitusNews');
  
      if (!token) {
        alert("Please log in first");
        navigate('/login');
        return;
      }
      
      const sanitizedBody = sanitizeHTML(article.body);
      let imageUrlToSave = article.image_url;
  
      if (selectedFile) {
        const formData = new FormData();
        formData.append('image', selectedFile);
  
        const uploadResponse = await axios.post(`${configUrl.beBaseUrl}/api/upload-image`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          },
        });
  
        imageUrlToSave = uploadResponse.data.image_url; 
      }
  
      const updatedArticle = {
        title: article.title,
        body: sanitizedBody,
        tags: tags,
        image_url: imageUrlToSave,
        category_id: article.category_id,
        author_id: article.author_id,
        linkVideo: article.linkVideo || linkVideo
      };

      await axios.put(`${configUrl.beBaseUrl}/api/articles/${id}`, updatedArticle, {
        headers: {
          Authorization: `Bearer ${token}`,
           'Content-Type': 'application/json'
        },
      });
  
      alert("Article updated successfully!");
      navigate(`/articles`);
  
    } catch (error) {
      console.error('Error updating article:', error);
      alert("Failed to update article. Please try again.");
    }
  };
  
  const handleCancel = () => {
    navigate(`/dashboard`);
  };

  if (!article) {
    return <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
      <img src="https://www.anjaniwahyudi.com/imgloading.svg" style={{width: '200px', height: '140px'}} alt='imgloading'></img>
      </div>;
  }

  return (
    <div>
      <div style={{display: 'flex'}}>
        <div style={{width: '20%'}} >
          <SidebarDashboard />
        </div>

    <div style={{ width: "100%", padding: "20px", borderRadius: "6px", margin: "50px"}}>
      <form onSubmit={handleSubmit} style={{ padding: "20px 2%" }}>
        <h1 style={{ textAlign: 'center' }}>Edit Article</h1>
        <div className='form-group'>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={article.title}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="tags">Tags:</label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Masukkan tags artikel"
          />
        </div>

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
      />
      {!newImagePreview && !imagePreview && <span className="upload-icon">+</span>}
      {(!newImagePreview && imagePreview) && (
        <div className="wrapper-change-foto">
          <span className="upload-change-foto">Change Photo?</span>
          <div className="upload-icon"> + </div>
        </div>
      )}
      {newImagePreview && (
        <div className="wrapper-change-foto">
          <span className="upload-change-foto">Change Photo?</span>
          <div className="upload-icon"> + </div>
        </div>
      )}
    </label>
    {(imagePreview || newImagePreview) && (
      <div className="preview-container">
        <img src={newImagePreview || `${configUrl.beBaseUrl}${imagePreview}`} alt="Preview" className="preview-image" />
      </div>
    )}
  </div>
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
          <label>Full-Text Article:</label>
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
            value={article.category_id}
            onChange={handleChange}
          >
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        
        <div style={{ margin: "50px", display: "flex", justifyContent: "center" }}>
          <button type="submit">Update Article</button>
          <button style={{ marginLeft: "6px", backgroundColor: "#ff6d0082" }} onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
    </div>
    </div>
  );
};

export default EditArticle;
