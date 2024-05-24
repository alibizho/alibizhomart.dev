import React, { useState, useEffect, useRef } from 'react';
import '../assets/css/Contacts.css';
import { IoSnow, IoSunny, IoCloud, IoRainy, IoThunderstorm, IoPartlySunny } from 'react-icons/io5';
import emailjs from '@emailjs/browser';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Contact() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [xianTemp, setXianTemp] = useState('');
  const [xianIcon, setXianIcon] = useState('');
  const [xianTime, setXianTime] = useState('');
  const xianDateTimeRef = useRef(null);
  const form = useRef();
  const [isAwake, setIsAwake] = useState(false);
  const serviceKey = import.meta.env.VITE_API_EMAIL_SERVICE;
  const templateKey = import.meta.env.VITE_API_EMAIL_TEMPLATE
  const emailKey = import.meta.env.VITE_API_EMAIL_KEY
  const weatherKey = import.meta.env.VITE_API_WEATHER_KEY

  const handleSubmit = (e) => {
    e.preventDefault();
    
    emailjs
      .sendForm(serviceKey, templateKey, form.current, {
        publicKey: emailKey,
      })
      .then(
        () => {
          toast.success('Email sent successfully!');
        },
        (error) => {
          toast.error(`Failed to send email`);
        }
      );
  };

  const getWeatherIcon = (condition) => {
    if (condition.includes('Sunny') || condition.includes('Clear')) return <IoSunny size={50} />;
    if (condition.includes('Snow')) return <IoSnow size={50} />;
    if (condition.includes('Cloud')) return <IoCloud size={50} />;
    if (condition.includes('Rain')) return <IoRainy size={50} />;
    if (condition.includes('Thunderstorm')) return <IoThunderstorm size={50} />;
    return <IoPartlySunny size={50} />;
  };

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const xianResponse = await axios.get(
          `https://api.weatherapi.com/v1/current.json?key=${weatherKey}&q=Xian`
        );
        const xianWeather = xianResponse.data;
        setXianTemp(`${xianWeather.current.temp_c}°C`);
        setXianIcon(getWeatherIcon(xianWeather.current.condition.text));
        xianDateTimeRef.current = new Date(xianWeather.location.localtime);

        const hour = xianDateTimeRef.current.getHours();
        setIsAwake(hour >= 7 && hour < 23);
      } catch (error) {
        console.error('Error fetching weather data', error);
      }
    };

    fetchWeatherData();

    const updateTimes = () => {
      const now = new Date();

      if (xianDateTimeRef.current) {
        const xianTimeElapsed = now.getTime() - xianDateTimeRef.current.getTime();
        const updatedXianTime = new Date(xianDateTimeRef.current.getTime() + xianTimeElapsed);
        setXianTime(updatedXianTime.toLocaleTimeString('en-GB', { hour12: false, hour: '2-digit', minute: '2-digit' }));
      }
    };

    const interval = setInterval(updateTimes, 1000);
    updateTimes(); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='container-contacts'>
      <ToastContainer />
      <h2>☎️ reach out</h2>
      <div className='container-contacts-in'>
        <form ref={form} onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor='email'>your email</label>
            <input
              type='email'
              name='user_email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor='message'>message</label>
            <textarea
              name='message'
              id='message'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>
          <button type='submit'>submit</button>
        </form>
        <div className='weather-container'>
          <div className='weather-container-inner'>
            <div className='weather-container-user'>
              <h3>Xi'an</h3>
              {xianIcon}
              <h3>{xianTime}</h3>
            </div>
          </div>
          {isAwake ? (
            <h4>I am awake at this time, so I will try to respond as quickly as possible to your message!</h4>
          ) : (
            <h4>I am asleep at this time. I'll respond to your message as soon as I wake up!</h4>
          )}
        </div>
      </div>
    </div>
  );
}

export default Contact;
