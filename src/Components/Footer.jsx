import React from 'react';
import '../assets/css/Footer.css';
import { AiFillMail, AiFillWechat, AiFillInstagram } from 'react-icons/ai';
import wechatQR from '../assets/wechatqr.jpg'; 

function Footer() {
  return (
    <div className='container-footer'>
      <div className='container-footer-names'>
        <h1>Alibi Zhomart</h1>
        <h2>Computer Science Student & Software Engineer</h2>
      </div>
      <div className='footer-contacts'>
        <a href='https://www.instagram.com/zhomartalibi/' className="footer-contact-item">
          <AiFillInstagram size={20} />
          <h4>zhomartalibi</h4>
        </a>
        <a href={wechatQR} download="WeChatQR.jpg" className="footer-contact-item">
          <AiFillWechat size={20} />
          <h4>周传正</h4>
        </a>
        <a href='mailto:zhomart.alibi.kz@gmail.com' className="footer-contact-item">
          <AiFillMail size={20} />
          <h4>zhomart.alibi.kz@gmail.com</h4>
        </a>
      </div>
    </div>
  );
}

export default Footer;
