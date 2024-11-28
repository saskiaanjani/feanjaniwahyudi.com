import React, { useRef } from 'react';
import '../assets/css/Contact.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DOMPurify from 'dompurify'; 

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    const userName = form.current.user_name.value;
    const userEmail = form.current.user_email.value;
    const department = form.current.department.value;
    const subject = form.current.subject.value;
    const message = form.current.message.value;

    const sanitizedUserName = DOMPurify.sanitize(userName);
    const sanitizedUserEmail = DOMPurify.sanitize(userEmail);
    const sanitizedDepartment = DOMPurify.sanitize(department);
    const sanitizedSubject = DOMPurify.sanitize(subject);
    const sanitizedMessage = DOMPurify.sanitize(message);

    const mailtoLink = `mailto:anjani@anjaniwahyudi.com?subject=${encodeURIComponent(sanitizedSubject)}&body=${encodeURIComponent(`Nama: ${sanitizedUserName}\nEmail: ${sanitizedUserEmail}\nDepartemen: ${sanitizedDepartment}\nPesan: ${sanitizedMessage}`)}`;

    window.location.href = mailtoLink;

    alert('Pesan berhasil dikirim!');
  };

  return (
    <div>
      <Header />
      <div className="contact-container">
        <h1>Hubungi Kami</h1>
        <p>
          anjaniwahyudi.com adalah media online yang menyajikan berita terkini secara lengkap, akurat, dan tepercaya. Kirimkan pertanyaan atau kritik Anda melalui form berikut.
        </p>

        <form ref={form} onSubmit={sendEmail} className="contact-form">
          <label htmlFor="name">Nama</label>
          <input type="text" name="user_name" id="name" placeholder="Nama" required />

          <label htmlFor="email">Email</label>
          <input type="email" name="user_email" id="email" placeholder="Email" required />

          <label htmlFor="department">Berkaitan Dengan:</label>
          <select name="department" id="department" required>
            <option value="" disabled selected>Silakan Pilih</option>
            <option value="Berita">Berita</option>
            <option value="Iklan">Iklan</option>
          </select>

          <label htmlFor="subject">Judul Pesan</label>
          <input type="text" name="subject" id="subject" placeholder="Judul Pesan" required />

          <label htmlFor="message">Pesan</label>
          <textarea name="message" id="message" placeholder="Pesan" required></textarea>

          <button type="submit" className="submit-button">Kirim</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
