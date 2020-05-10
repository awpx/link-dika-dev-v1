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
    <div className="container">
      <div className='body-wrap'>
        <header>
          <h1><span>url.awp</span></h1>
          <small>. . . shorten your looooong url.</small>
        </header>
        <main>
          <form onSubmit={onSubmit}>

            <fieldset>
              <input 
                type='text' 
                placeholder='Shorten your link . . .'
                onChange={(e) => setRealUrl(e.target.value)}   
              />
              <input type='submit' value='Shorten' />
            </fieldset>

            <fieldset className={shortUrl !== '' ? 'display-result' : 'hide-result'}>
              <span id='result'> {shortUrl} </span>
            </fieldset>

          </form>
        </main>
      </div>
    </div>
  );
}

export default App;
