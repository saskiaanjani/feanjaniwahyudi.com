import React from 'react';
import logoImage from '../asset/img/logo.2.png';
import '../assets/css/About.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const About = () => {
  return (
    <div>
      <Header />
    <div className="about-container">
      <div className="logo-container">
        <img 
          src={logoImage}
          alt="logo-img"
          className="logo"
        />
      </div>
      <div className="text-container">
        <p>
          <span className="highlight">anjaniwahyudi.com</span> hadir untuk menyajikan berita yang bukan hanya informatif, tetapi juga inspiratif. Kami percaya bahwa berita bukan sekadar laporan peristiwa, melainkan juga sarana untuk membangun kesadaran dan memberikan wawasan baru kepada pembaca.
        </p>
        <p>
          <span className="highlight">anjaniwahyudi.com</span> selalu berupaya untuk memberikan informasi yang relevan dan bermanfaat bagi pembaca. Kami tidak hanya melaporkan berita, tetapi juga memberikan analisis mendalam untuk membantu pembaca memahami isu-isu yang berkembang.
        </p>
        <p>
          <span className="highlight">anjaniwahyudi.com</span> adalah teman setia Anda dalam menjelajahi berita yang up-to-date dan berkualitas. Misi kami adalah menghadirkan informasi yang dapat diandalkan oleh masyarakat luas, dengan menjunjung tinggi prinsip independensi dan netralitas.
        </p>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default About;
