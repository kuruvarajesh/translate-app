import { useState } from 'react';
import axios from 'axios';
import './App.css';
import logo from './svg/logo.svg'
import sound from './svg/sound_max_fill.svg'
import copy from './svg/Copy.svg'
import transIcon from './svg/Sort_alfa.svg'
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import languages from './country-languages.json'
import './App.css';

const maxLength = 500

function App() {
  const[activeBtn,setActiveBtn] = useState('english')
  const [count,setCount] = useState(0)
  const [value,setValue] = useState('Hello, how are you' )
  const [toValue,setToValue] = useState('')
  const [showTooltip,setTooltip] = useState(false)
  const [showTooltip2,setTooltip2] = useState(false)

  const [fromLan,setFromLan] = useState('en')
  const [toLan,setToLan] = useState('fr')


  

  const handleButton = (actBtn) => {
    // setActiveBtn(actBtn)
  }

  const handleInput = event=>{

    let newVal = event.target.value
    if(newVal.length<= maxLength){
      setCount(newVal.length)
      setValue(newVal)
    }
    
  }

  const handleCopy = async()=>{
    try {
      await navigator.clipboard.writeText(value);
      console.log('Text successfully copied to clipboard');
      setTooltip(true)
      setTimeout(()=>{
        setTooltip(false)
      },2000)
    } catch (err) {
      console.error('Unable to copy text to clipboard', err);
    }
  }

  const handleCopy2 = async()=>{
    try {
      await navigator.clipboard.writeText(toValue);
      console.log('Text successfully copied to clipboard');
      setTooltip2(true)
      setTimeout(()=>{
        setTooltip2(false)
      },2000)
    } catch (err) {
      console.error('Unable to copy text to clipboard', err);
    }
  }

  const handleSound1 = () => {
    let sound = window.speechSynthesis
    const text = new SpeechSynthesisUtterance(value)
    sound.speak(text)
  }

  const handleSoun2 = () => {
    let sound = window.speechSynthesis
    const text = new SpeechSynthesisUtterance(toValue)
    sound.speak(text)
  }

  const handleTranslate = async() =>{
    const apiUrl = `https://api.mymemory.translated.net/get?q=${value}&langpair=${fromLan}|${toLan}`
    const res = await fetch(apiUrl)
    const data = await res.json()
    console.log(data.responseData.translatedText)
    setToValue(data.responseData.translatedText)
 
  }

  const handleFromSelect = (event,name) => {
    const selectedLanguage = event.target.value
    const selectedLanguageKey = Object.keys(languages).find(key => languages[key] === selectedLanguage);
    console.log(selectedLanguageKey)
    if(name === 'from') setFromLan(selectedLanguageKey)
    else setToLan(selectedLanguageKey)
  }

  return (
    <div className="container">
      <div className='app'>
        <div className='logo'>
        <img src={logo} alt="translate.io" className='app-logo' />

        </div>
        <div className='main-card'>
          <div className='card'>
            <div className='buttons'>
            {/* <button className={activeBtn==="detect"?"active":''} onClick={() => handleButton('detect')}>Detect language</button> */}
            <button className={activeBtn==="english"?"active":''} onClick={() => handleButton('english')}>{languages[fromLan]}</button>
            <select 
              value={languages[fromLan]}
              id="fromLan"
              onChange={(event) => handleFromSelect(event,"from")}
              >
              {Object.keys(languages).map((key)=>(
                <option className='options' key={key} >{languages[key]}</option>
              ))}
            </select>
            </div>
            <hr/>
            <textarea placeholder='Enter Here!' onChange={handleInput} value={value}/>

            <p className='length'>{count}/{maxLength}</p>
            <div className='translate-card'>
              <div className='sound-card'>
                <button className='copy' onClick={handleSound1}>
                    <img src={sound} alt="audio" />
                </button>
                <button className='copy' onClick={handleCopy}>
                    <img src={copy} alt ="copy" />
                </button>
                {showTooltip && <div className="tooltip"> Copied! <IoCheckmarkDoneCircleOutline /></div>}
              </div>
              <button className='translate' onClick={handleTranslate}> <img src={transIcon} alt="A"  />Translate</button>
            </div>
          </div>
          <div className='card'>
            <div className='buttons'>
            <button className={"active"} >{languages[toLan]}</button>
            <select 
              value={languages[toLan]}
              id="toLan"
              onChange={(event) => handleFromSelect(event,'to')}
              >
              {Object.keys(languages).map((key)=>(
                <option className='options' key={key} >{languages[key]}</option>
              ))}
            </select>
            </div>
            <hr/>
            <textarea className='to-text-area' disabled placeholder='Translated Text will show Here!' value={toValue}/>
            <div className='translate-card'>
              <div className='sound-card'>
                <button className='copy' onClick={handleSoun2}>
                    <img src={sound} alt="audio" />
                </button>
                <button className='copy' onClick={handleCopy2}>
                    <img src={copy} alt ="copy" />
                </button>
                {showTooltip2 && <div className="tooltip"> Copied! <IoCheckmarkDoneCircleOutline /></div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
