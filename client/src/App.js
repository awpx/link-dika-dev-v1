import React, { useState, useRef } from 'react'
import axios from 'axios'
import validator from 'validator'
import './App.css';

function App() {
  const [ realUrl, setRealUrl ] = useState('')
  const [ shortUrl, setShortUrl ] = useState('')
  const [ copySuccess, setCopySuccess ] = useState('')
  const textRef = useRef(null)

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

  const onCopy = (e) => {
    textRef.current.select();
    document.execCommand('copy');
    e.target.focus();
    setCopySuccess('COPIED!')

  }

  return (
    <div className="container">
      <div className='body-wrap'>
        <header>
          <h1><span>url.awp</span></h1>
            <small><h3>. . . shorten your loooooooooong URL</h3></small>
        </header>
        <main>
          <form onSubmit={onSubmit}>

            <fieldset>
              <input 
                type='text' 
                placeholder='Shorten your link . . .'
                onChange={(e) => setRealUrl(e.target.value)}   
              />
              <input type='submit' value='Shorten ' />
            </fieldset>

            <fieldset className={shortUrl !== '' ? 'display-result' : 'hide-result'}>
              <input type='text' ref={textRef} id='result' value={shortUrl} readOnly />
              <button id='copy' onClick={onCopy}>Copy URL</button>
            </fieldset>

            <fieldset className={copySuccess !== '' ? 'display-result' : 'hide-result'} >
              <input type='text' id='result' value={copySuccess} style={{backgroundColor: "#3D66DE"}} readOnly />
            </fieldset>

          </form>
        </main>
      </div>
    </div>
  );
}

export default App;
