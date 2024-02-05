import { useState } from 'react';
import './App.css';
import logo from './svg/logo.svg'
import sound from './svg/sound_max_fill.svg'
import copy from './svg/Copy.svg'
import transIcon from './svg/Sort_alfa.svg'
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";


const maxLength = 500

function App() {
  const[activeBtn,setActiveBtn] = useState('english')
  const [count,setCount] = useState(0)
  const [value,setValue] = useState("")
  const [showTooltip,setTooltip] = useState(false)

  const handleButton = (actBtn) => {
    setActiveBtn(actBtn)
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

  const handleSound1 = () => {
    let sound = window.speechSynthesis
    const text = new SpeechSynthesisUtterance(value)
    sound.speak(text)
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
            <button className={activeBtn==="detect"?"active":''} onClick={() => handleButton('detect')}>Detect language</button>
            <button className={activeBtn==="english"?"active":''} onClick={() => handleButton('english')}>English</button>
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
              <button className='translate'> <img src={transIcon} alt="A" />Translate</button>
            </div>
          </div>
          {/* <div className='card'>
            <div className='buttons'>
            <button>detect language</button>
            <button>English</button>
            <button>French</button>
            </div>
            <div>jknkj</div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default App;
