import React, { useState } from 'react'
import axios from 'axios'
import validator from 'validator'
import './App.css';

function App() {
  const [ realUrl, setRealUrl ] = useState('')
  const [ shortUrl, setShortUrl ] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()

    //validating url
    const validURL = validator.isURL(realUrl, {
      require_protocol: true
    });

    if (!validURL) {
        alert('Please ensure the url is correct and includes the http(s) protocol.');
    } else {
      //save to db
      try {
        const { data } = await axios.post('/url/api/v1/shorten', { realUrl })
  
        setShortUrl(data.url.shortUrl)
  
      } catch (error) {
        console.error(error)
      }
    }
  }

  return (
    <div className="App">
      <form onSubmit={onSubmit}>
        <fieldset>
          <input 
            type='text' 
            placeholder='Shorten your link . . .'
            onChange={(e) => setRealUrl(e.target.value)}   
          />
          <input type='submit' value='Shorten' />
        </fieldset>
        <fieldset>
          <span id='result'> {shortUrl} </span>
        </fieldset>
      </form>
    </div>
  );
}

export default App;
