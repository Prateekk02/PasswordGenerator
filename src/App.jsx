import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'



function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [character, setCharacter] = useState(false);
  const [password, setPassword] = useState("");

  // Password Generator Method.
  const passwordGenerator = useCallback(() => {
    let generatedPass = "";
    let charPool = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";  
    // Append numbers if the 'number' state is true
    if (number) {
      charPool += "0123456789";
    }  
    // Append special characters if the 'character' state is true
    if (character) {
      charPool += "@!#$%^&*(){}";
    }        
    // Generate the password
    // we don't use str[charIndex] because of two issue
      // 1. old browser might not support str[charIndex]
      // 2. if for example str.length = 5 and str[10] is asked then it will return undefined but charAt() will return ''.
    for (let i = 0; i < length; i++) {
      const charIndex = Math.floor(Math.random() * charPool.length);
      generatedPass += charPool.charAt(charIndex);
    }  
    setPassword(generatedPass);
  }, [length, number, character, setPassword]);
  
  useEffect(() => {
    passwordGenerator() 
  }, [length, character, number, passwordGenerator]);


  const passwordRef = useRef(null);
  // Copy Paste to clipboard logic.
  const copyToClipboard = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password).then(() => {
      alert("Password has been copied to clipboard!");

    }).catch((error) => {
      console.error("Failed to copy password: ", error);
    });
  }, [password]);
   
  
  
  return (
    <>
      <div className="bg-black min-h-screen flex items-center justify-center rounded-full">
        <div className="w-11/12 max-w-4xl shadow-2xl rounded-lg p-8 my-16 bg-teal-900 text-white">
          <h1 className="text-4xl font-bold mb-4 text-gray-200 text-center">Password Generator</h1>
            <div className="flex shadow rounded-lg overflow-hidden mt-6">
              <input 
                type="text" 
                value={password} 
                className="outline-none w-full py-3 px-4 text-black font-bold" 
                placeholder="Password" 
                readOnly 
                ref={passwordRef}
              />
              <button 
              className='outline-none bg-blue-900 text-white px-3 py-0.5 shrink-0 
             transition-transform transform hover:bg-blue-500 hover:scale-105 
             active:scale-95 active:bg-blue-700'
              onClick={copyToClipboard}
              >Copy</button>
            </div>
            <div className="flex text-sm gap-x-2 pt-5">
              <div className="flex items-center gap-x-1">
                <input 
                  type="range" 
                  min = {6}
                  max = {100}
                  value = {length}
                  className="cursor-pointer " 
                  onChange={(e) => {setLength(e.target.value)}}
                  />
                  <label className='text-gray-200 font-bold' >Length: {length} </label>
              </div>
              <div className="flex items-center gap-x-2">
              <input 
                type="checkbox"
                className="cursor-pointer h-5 w-5 border-2 border-gray-200 rounded-lg checked:bg-gray-200 checked:border-transparent" 
                defaultChecked={number} 
                id='numberInput'
                onChange={() => setNumber((prev) => !prev)}
              />
              <label className='text-gray-200 font-bold'>Include Numbers</label>
            </div>
              <div className="flex items-center gap-x-2">
                <input 
                  type="checkbox"
                  className='cursor-pointer h-5 w-5 border-2 border-gray-200 rounded-lg checked:bg-blue-950 checked:border-transparent'
                  defaultChecked={character}
                  id = 'characterInput'
                  onChange={() => {
                    setCharacter((prev) => !prev)
                  }}
                />
                <label className='text-gray-200 font-bold'>Include Characters</label>

              </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default App
