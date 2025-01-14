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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useRef();

  const [xianWeather, setXianWeather] = useState({
    temp: '',
    icon: null,
    time: '',
    isAwake: false
  });

  const { 
    VITE_API_EMAIL_SERVICE: serviceKey,
    VITE_API_EMAIL_TEMPLATE: templateKey,
    VITE_API_EMAIL_KEY: emailKey,
    VITE_API_WEATHER_KEY: weatherKey
  } = import.meta.env;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isSubmitting) {
      toast.warning('Please wait before sending another message');
      return;
    }

    setIsSubmitting(true);

    try {
      await emailjs.sendForm(
        serviceKey, 
        templateKey, 
        form.current, 
        { publicKey: emailKey }
      );
      toast.success('Email sent successfully!');
      setEmail('');
      setMessage('');
      
      setTimeout(() => setIsSubmitting(false), 30000);
    } catch (error) {
      toast.error('Failed to send email');
      setIsSubmitting(false);
    }
  };

  const getWeatherIcon = (condition, isNight) => {
    const conditions = {
      'Sunny': isNight ? <IoPartlySunny size={50} /> : <IoSunny size={50} />,
      'Clear': isNight ? <IoPartlySunny size={50} /> : <IoSunny size={50} />,
      'Snow': <IoSnow size={50} />,
      'Cloud': <IoCloud size={50} />,
      'Rain': <IoRainy size={50} />,
      'Thunderstorm': <IoThunderstorm size={50} />,
    };

    return Object.entries(conditions).find(([key]) => 
      condition.includes(key))?.[1] || <IoPartlySunny size={50} />;
  };

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `https://api.weatherapi.com/v1/current.json?key=${weatherKey}&q=Xian`
        );
        
        const { current } = response.data;

        const updateXianTime = () => {
          const currentXianTime = new Date(new Date().toLocaleString("en-US", {timeZone: "Asia/Shanghai"}));
          const hour = currentXianTime.getHours();

          setXianWeather(prev => ({
            ...prev,
            time: currentXianTime.toLocaleTimeString('en-GB', { 
              hour12: false, 
              hour: '2-digit', 
              minute: '2-digit' 
            }),
            isAwake: hour >= 7 && hour < 22,
            icon: getWeatherIcon(current.condition.text, hour >= 18 || hour < 6)
          }));
        };

        setXianWeather({
          temp: `${current.temp_c}°C`,
          icon: null,
          time: '',
          isAwake: false
        });

        updateXianTime();
        const timeInterval = setInterval(updateXianTime, 60000);
        return () => clearInterval(timeInterval);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
    const weatherInterval = setInterval(fetchWeatherData, 300000);

    return () => clearInterval(weatherInterval);
  }, [weatherKey]);

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
          <button type='submit' disabled={isSubmitting}>
            {isSubmitting ? 'please wait...' : 'submit'}
          </button>
        </form>

        <div className='weather-container'>
          <div className='weather-container-inner'>
            <div className='weather-container-user'>
              <h3>Xi'an</h3>
              {xianWeather.icon}
              <h3>{xianWeather.time}</h3>
            </div>
          </div>
          <h4>
            {xianWeather.isAwake 
              ? "I am awake at this time, so I will try to respond as quickly as possible to your message!"
              : "I am asleep at this time. I'll respond to your message as soon as I wake up!"}
          </h4>
        </div>
      </div>
    </div>
  );
}

export default Contact;
