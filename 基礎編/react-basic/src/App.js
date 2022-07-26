import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [id, setId] = useState('Sayaka17')
  const [name, setName] = useState('')
  const ids = ['Sayaka17', 'google', 'deatiger']
  const getRandomID =() => {
    const _id = ids[Math.floor(Math.random() * ids.length)]
    setId(_id)
  }

  // useEffect
  useEffect(() => {
    fetch(`https://api.github.com/users/${id}`)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      setName(data.name)
    })
    .catch(error => {
      console.error(error)
    })
  }, [id])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>
          日本一わかりやすいReact
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div>
          <p>{id}のGitHub上の名前は{name}です。</p>
          <button onClick={getRandomID}>IDを変更</button>
        </div>
      </header>
    </div>
  );
}

export default App;
