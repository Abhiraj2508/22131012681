import React from 'react';
import { Card, CardContent } from '@mui/material';
import { getAllUrls } from '../services/urlservice';

const UrlStats = () => {
  const urls = getAllUrls();

  return (
    <div>
      {Object.entries(urls).map(([shortcode, data], idx) => (
        <Card key={idx} style={{ marginBottom: '1rem' }}>
          <CardContent>
            <p><strong>Short URL:</strong> http://localhost:3000/{shortcode}</p>
            <p><strong>Original:</strong> {data.originalUrl}</p>
            <p><strong>Created:</strong> {data.createdAt}</p>
            <p><strong>Expires:</strong> {data.expiresAt}</p>
            <p><strong>Click Count:</strong> {data.clicks.length}</p>
            <ul>
              {data.clicks.map((click, i) => (
                <li key={i}>{click.timestamp} | {click.source} | {click.location}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default UrlStats;
