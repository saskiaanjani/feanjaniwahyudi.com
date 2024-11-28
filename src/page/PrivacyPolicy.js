import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PrivacyPolicy = () => {
  return (
    <div>
      <Header />
    <div className="privacy-policy-container" style={styles.container}>
      <h1 style={styles.heading}>Kebijakan Privasi</h1>
      <p>
        Selamat datang di halaman Kebijakan Privasi kami. Di sini kami akan menjelaskan bagaimana kami mengumpulkan,
        menggunakan, dan melindungi informasi pribadi Anda saat menggunakan situs berita kami.
      </p>

      <h2 style={styles.subHeading}>1. Informasi yang Kami Kumpulkan</h2>
      <p>
        Kami mengumpulkan informasi yang Anda berikan secara langsung, seperti ketika Anda berlangganan newsletter,
        memberikan komentar pada artikel, atau menghubungi kami melalui situs web. Kami juga mengumpulkan beberapa
        data secara otomatis, seperti alamat IP, jenis browser, dan jenis perangkat untuk keperluan analisis.
      </p>

      <h2 style={styles.subHeading}>2. Bagaimana Kami Menggunakan Informasi Anda</h2>
      <p>
        Informasi yang kami kumpulkan digunakan untuk meningkatkan pengalaman pengguna, mempersonalisasi konten,
        mengirim newsletter (jika berlangganan), dan untuk keperluan keamanan.
      </p>

      <h2 style={styles.subHeading}>3. Cookies</h2>
      <p>
        Kami menggunakan cookies untuk melacak aktivitas pengguna di situs web kami guna meningkatkan pengalaman secara keseluruhan.
        Anda dapat menonaktifkan cookies melalui pengaturan browser jika Anda mau.
      </p>

      <h2 style={styles.subHeading}>4. Berbagi Informasi Anda</h2>
      <p>
        Kami tidak membagikan informasi pribadi Anda kepada pihak ketiga kecuali untuk mematuhi hukum, melindungi hak-hak kami,
        atau memenuhi kewajiban hukum lainnya.
      </p>

      <h2 style={styles.subHeading}>5. Keamanan</h2>
      <p>
        Kami menerapkan langkah-langkah keamanan yang wajar untuk melindungi informasi Anda. Namun, tidak ada metode transmisi
        melalui internet atau penyimpanan elektronik yang sepenuhnya aman, sehingga kami tidak dapat menjamin keamanan secara mutlak.
      </p>

      <h2 style={styles.subHeading}>6. Hak Anda atas Data</h2>
      <p>
        Anda memiliki hak untuk meminta akses ke informasi pribadi yang kami miliki tentang Anda, dan Anda dapat meminta kami
        untuk memperbaiki atau menghapus informasi tersebut.
      </p>

      <h2 style={styles.subHeading}>7. Perubahan terhadap Kebijakan Privasi ini</h2>
      <p>
        Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Setiap perubahan akan diposting di halaman ini, dan
        kami mendorong Anda untuk meninjaunya secara berkala.
      </p>

      <h2 style={styles.subHeading}>8. Hubungi Kami</h2>
      <p>
        Jika Anda memiliki pertanyaan atau kekhawatiran mengenai Kebijakan Privasi ini, silakan hubungi kami di:
        <Link to="/contact"> anjaniwahyudi.com</Link>.
      </p>
    </div>
    <Footer />
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: 'auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    lineHeight: '1.6',
    textAlign: 'justify',
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '20px',
    textAlign: 'center',
  },
  subHeading: {
    fontSize: '1.5rem',
    marginTop: '20px',
    marginBottom: '10px',
  },
};

export default PrivacyPolicy;
