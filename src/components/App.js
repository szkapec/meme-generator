import React, { useState, useEffect } from 'react';
import qs from 'qs';
function App() {
  const [toptext, setTopText] = useState('')
  const [bottomText, setBottomText] = useState('')
  const [templates, setTemplates] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [meme, setMeme] = useState(null)

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = {
      template_id: selectedId,
      text0: toptext,
      text1: bottomText,
      username: 'xzk03017',
      password: 'xzk03017@cndps.com'
    }
    fetch(`https://api.imgflip.com/caption_image?${qs.stringify(params)}`)
      .then(resp => resp.json()
      .then(json=> {
        setMeme(json.data.url)
      }))
      setTopText('')
      setBottomText('')
  }
  const handleClick = (imageId) => {
    setSelectedId(imageId)
  }
  console.log(templates)
  return (
    <div className="App">
        <form onSubmit={handleSubmit}>
          <div className="container">
           <div> Wpisz tekst na góre obrazka</div>
          <input type="text" name="top" className="top" value={toptext} onChange={handleChange}/>
          </div>

       <div  className="container">
            <div>tekst na dole obrazka</div>
          <input type="text" name="bottom" className="bottom" value={bottomText} onChange={handleChange}/>
       </div>
          <input className="button" type="submit" value="Wygeneruj"/>
        </form>
        <div className="meme">
          {meme ? <img src={meme}/>:null}
        </div>
        <div className="description">Wybierz obrazek który chcesz przerobić.</div>
        <div className="meme-container">
            {templates && templates.map(item => (
              <img src={item.url} id={item.id} alt="item" onClick={() => handleClick(item.id)}/>
            ))}
        </div>
    </div>
  );
}

export default App;
