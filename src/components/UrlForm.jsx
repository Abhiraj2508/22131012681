import React, { useState } from 'react';
import { TextField, Button, Card, CardContent } from '@mui/material';
import { isValidURL, isAlphanumeric } from '../utils/validators';
import { saveShortUrl } from '../services/urlservice';

const UrlForm = () => {
  const [inputs, setInputs] = useState([
    { url: '', validity: '', shortcode: '' },
  ]);
  const [results, setResults] = useState([]);

  const handleChange = (index, field, value) => {
    const newInputs = [...inputs];
    newInputs[index][field] = value;
    setInputs(newInputs);
  };

  const handleAdd = () => {
    if (inputs.length < 5) {
      setInputs([...inputs, { url: '', validity: '', shortcode: '' }]);
    }
  };

  const handleSubmit = () => {
    const newResults = [];
    for (let input of inputs) {
      if (!isValidURL(input.url)) {
        alert('Invalid URL');
        return;
      }
      if (input.shortcode && !isAlphanumeric(input.shortcode)) {
        alert('Shortcode must be alphanumeric');
        return;
      }
      try {
        const result = saveShortUrl(input.url, parseInt(input.validity) || 30, input.shortcode);
        newResults.push(result);
      } catch (e) {
        alert(e.message);
        return;
      }
    }
    setResults(newResults);
  };

  return (
    <div>
      {inputs.map((input, idx) => (
        <Card key={idx} style={{ marginBottom: '1rem' }}>
          <CardContent>
            <TextField
              fullWidth
              label="Original URL"
              value={input.url}
              onChange={(e) => handleChange(idx, 'url', e.target.value)}
              style={{ marginBottom: '1rem' }}
            />
            <TextField
              label="Validity (minutes)"
              type="number"
              value={input.validity}
              onChange={(e) => handleChange(idx, 'validity', e.target.value)}
              style={{ marginRight: '1rem' }}
            />
            <TextField
              label="Custom Shortcode"
              value={input.shortcode}
              onChange={(e) => handleChange(idx, 'shortcode', e.target.value)}
            />
          </CardContent>
        </Card>
      ))}
      <Button variant="contained" color="primary" onClick={handleAdd} disabled={inputs.length >= 5}>
        + Add URL
      </Button>
      <Button variant="contained" color="success" onClick={handleSubmit} style={{ marginLeft: '1rem' }}>
        Shorten URLs
      </Button>

      <div style={{ marginTop: '2rem' }}>
        {results.map((res, idx) => (
          <Card key={idx} style={{ marginBottom: '1rem' }}>
            <CardContent>
              <p>Original: {res.originalUrl}</p>
              <p>Short: <a href={`/${res.shortcode}`}>http://localhost:3000/{res.shortcode}</a></p>
              <p>Expires at: {res.expiresAt}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UrlForm;