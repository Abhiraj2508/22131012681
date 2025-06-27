import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAllUrls, recordClick } from '../services/urlservice';
import { loggerMiddleware } from '../utils/loggerMiddleware';

const RedirectHandler = () => {
  const { shortcode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const urls = getAllUrls();
    const data = urls[shortcode];

    if (!data) {
      alert('Invalid short URL');
      return navigate('/');
    }

    if (new Date(data.expiresAt) < new Date()) {
      alert('Link expired');
      return navigate('/');
    }

    recordClick(shortcode);
    loggerMiddleware('Short link accessed', { shortcode });
    window.location.href = data.originalUrl;
  }, [shortcode, navigate]);

  return <div>Redirecting...</div>;
};

export default RedirectHandler;
