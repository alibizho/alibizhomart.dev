import React, { useContext, useState, useEffect, useRef } from 'react';
import '../assets/css/Contacts.css';
import { IoSnow, IoSunny, IoCloud, IoRainy, IoThunderstorm, IoPartlySunny } from 'react-icons/io5';
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { WeatherContext } from '../Components/WeatherContext';

const getWeatherIcon = cond => {
  if (/Sunny|Clear/.test(cond)) return <IoSunny size={50} />;
  if (/Snow/.test(cond)) return <IoSnow size={50} />;
  if (/Cloud/.test(cond)) return <IoCloud size={50} />;
  if (/Rain/.test(cond)) return <IoRainy size={50} />;
  if (/Thunderstorm/.test(cond)) return <IoThunderstorm size={50} />;
  return <IoPartlySunny size={50} />;
};

export default function Contact() {
  const weather = useContext(WeatherContext);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const formRef = useRef();
  const [time, setTime] = useState('');

  useEffect(() => {
    if (!weather) return;
    const local = new Date(weather.localtime.replace(' ', 'T'));
    const update = () => {
      const now = new Date();
      const diff = now - local;
      setTime(new Date(local.getTime() + diff)
        .toLocaleTimeString('en-GB', { hour12: false, hour: '2-digit', minute: '2-digit' })
      );
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [weather]);

  const handleSubmit = e => {
    e.preventDefault();
    emailjs.sendForm(
      import.meta.env.VITE_API_EMAIL_SERVICE,
      import.meta.env.VITE_API_EMAIL_TEMPLATE,
      formRef.current,
      import.meta.env.VITE_API_EMAIL_KEY
    )
    .then(() => toast.success('Email sent!'))
    .catch(() => toast.error('Send failed'));
  };

  if (!weather) return <div className='container-contacts'><p>Loading weather...</p></div>;

  const isAwake = (() => {
    const hr = Number(time.split(':')[0]);
    return hr >= 7 && hr < 23;
  })();

  return (
    <div className='container-contacts'>
      <ToastContainer />
      <h2>☎️ reach out</h2>
      <div className='container-contacts-in'>
        <form ref={formRef} onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor='email'>your email</label>
            <input type='email' name='user_email' id='email' value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className='form-group'>
            <label htmlFor='message'>message</label>
            <textarea name='message' id='message' value={message} onChange={e => setMessage(e.target.value)} required />
          </div>
          <button type='submit'>submit</button>
        </form>
        <div className='weather-container'>
          <div className='weather-container-user'>
            <h3>Xi'an</h3>
            {getWeatherIcon(weather.condition)}
            <h3>{time}</h3>
          </div>
          <h4>{isAwake ? 'I am awake at this time, so I will try to respond as quickly as possible to your message!' : " am asleep at this time. I'll respond to your message as soon as I wake up!"}</h4>
        </div>
      </div>
    </div>
  );
}