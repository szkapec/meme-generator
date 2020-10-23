import React, { useState, useEffect } from 'react';
import qs from 'qs';
function App() {
  const [toptext, setTopText] = useState('')
  const [bottomText, setBottomText] = useState('')
  const [templates, setTemplates] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [url, setUrl] = useState(null);
  const [textUrlError, setTextUrlError] = useState(false)

  const [meme, setMeme] = useState(null)

  const [errorBottom, setErrorBottom] = useState(false)
  const [errorTop, setErrorTop] = useState(false)
  const [errorTextBottom, setErrorTextBottom] = useState(null)
  const [errorTextTop, setErrorTextTop] = useState(null)

  useEffect(() => {
    fetch('https://api.imgflip.com/get_memes')
      .then(res => res.json())
      .then(res => setTemplates(res.data.memes))
  }, []);



  const handleChange = (e) => {
    const fildName = e.target.name;
    const fieldValue = e.target.value;
    if(fildName === "top" ) {
      setTopText(fieldValue)
    } else {
      setBottomText(fieldValue)
    }
  }
  const reset = () => {
    setErrorTop(false)
    setErrorBottom(false)
    setErrorTextTop(null)
    setErrorTextBottom(null)
    setTextUrlError(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    reset();
    console.log(Boolean(!url))
    if(Boolean(!url) ) {
      setTextUrlError(true)
    }
    if(toptext.length<2 ) {
      setErrorTop(true)
      setErrorTextTop('Za mało textu')
    }
    if(bottomText.length<2) {
      setErrorBottom(true)
      setErrorTextBottom('Za mało textu')
    }

    if(toptext.length<2 || bottomText.length<2) {
      return;
    }
    const params = {
      template_id: selectedId,
      text0: toptext,
      text1: bottomText,
      username: 'xzk03017',
      password: 'xzk03017@cndps.com'
    }
    {url&&fetch(`https://api.imgflip.com/caption_image?${qs.stringify(params)}`)
    .then(resp => resp.json()
    .then(json=> {
      setMeme(json.data.url)
    }))}
    
      setTopText('')
      setBottomText('')
  }
  const handleClick = (imageId, url) => {
    setSelectedId(imageId)
    setUrl(url)
    setMeme(null)
  }
  return (
    <div className="App">
        <form onSubmit={handleSubmit}>
          <div className="container">
           <div className="text"> Wpisz tekst na góre obrazka</div>
          <input placeholder="wpisz tekst" type="text" name="top" className={errorTop&&"errorInputTop"} value={toptext} onChange={handleChange}/>
          {errorTextTop&&<div className="error">Za mało tekstu</div>}
          </div>

       <div  className="container">
            <div className="text">tekst na dole obrazka</div>
          <input placeholder="wpisz tekst" type="text" name="bottom" className={errorBottom&&"errorInputBottom"} value={bottomText} onChange={handleChange}/>
          {errorTextBottom&&<div className="error">Za mało tekstu</div>}
       </div>
          <input className="button" type="submit" value="Wygeneruj"/>
          {textUrlError&&<div className="error">Nie wybrano obrazka!</div>}
        </form>

        
        
        <div className="meme">
          <div>{meme ? <img className="meme-img" src={meme}/>:null}</div>
          <div className="url-rec">{url&&<img src={url} alt="click image"/>}</div>
        </div>
        <div className="description">Wybierz obrazek który chcesz przerobić.</div>
        <div className="meme-container">
            {templates && templates.map(item => (
              <img src={item.url} id={item.id} alt="item" onClick={() => handleClick(item.id, item.url, null)}/>
            ))}
        </div>
    </div>
  );
}

export default App;
