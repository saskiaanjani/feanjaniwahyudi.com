import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import '../assets/css/ShareButton.css';

const ShareButtons = ({ articleUrl, articleTitle }) => {
  const shareText = encodeURIComponent(`Baca artikel menarik: "${articleTitle}" di situs kami!`);
  const encodedUrl = encodeURIComponent(articleUrl);

  const socialMediaLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${shareText}&url=${encodedUrl}`,
    whatsapp: `https://api.whatsapp.com/send?text=${shareText} - ${encodedUrl}`,
  };

  return (
    <div className="social-share-buttons">
      <a href={socialMediaLinks.twitter} target="_blank" rel="noopener noreferrer" className="social-icon twitter">
        <FontAwesomeIcon icon={faTwitter} />
      </a>
      <a href={socialMediaLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="social-icon whatsapp">
        <FontAwesomeIcon icon={faWhatsapp} />
      </a>
    </div>
  );
};

export default ShareButtons;
