import React, { useState } from 'react';
import '../assets/css/Footer.css';
import { AiFillMail, AiFillWechat, AiFillLinkedin } from 'react-icons/ai';
import wechatQR from '../assets/wechatqr.jpg';
import ImageModal from './ImageModal';

function Footer() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className='container-footer'>
        <div className='container-footer-names'>
          <h1>Alibi Zhomart</h1>
          <h2>Computer Science Student & Software Engineer</h2>
        </div>
        <div className='footer-contacts'>

          <div 
            className="footer-contact-item" 
            onClick={() => setShowModal(true)}
            style={{ cursor: 'pointer' }}
          >
            <AiFillWechat size={20} />
            <h4>周传正</h4>
          </div>


          <a href='https://www.linkedin.com/in/alibi-zhomart' className="footer-contact-item">
            <AiFillLinkedin size={20} />
            <h4>Alibi Zhomart</h4>
          </a>
          
          

          <a href='mailto:zhomart.alibi.kz@gmail.com' className="footer-contact-item">
            <AiFillMail size={20} />
            <h4>zhomart.alibi.kz@gmail.com</h4>
          </a>
        </div>
      </div>
      
      {showModal && (
        <ImageModal 
          image={wechatQR} 
          alt="WeChat QR Code" 
          onClose={() => setShowModal(false)} 
        />
      )}
    </>
  );
}

export default Footer;
