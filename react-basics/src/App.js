import React,{useState} from 'react'
import './App.css';
import Tweet from './tweet'

function App() {

  const [users,setUsers] = useState([
    { 
      name:'Gerosh George',
      message:'First time coding in React!',
      likes: 5
    },
    { 
      name:'Jasjeet',
      message:'Got placed in JP Morgan',
      likes:10
    },
    {
      name:'Dhruv',
      message:'Studying DSA on leetcode',
      likes:0
    },
    {
      name:'Shivansh',
      message:'Playing Marvel Avengers on PS4',
      likes:9
    }
  ])

  const [magic,setMagic] = useState(true)

  const changeTitle = () =>{
    
    setMagic(!magic)

    let titlediv= document.querySelector('h2, .title')
    if(magic===true){      
      titlediv.innerHTML="Ouu la la Magic!!"
    } else{
      titlediv.innerHTML="GTweets"
    }
    
  }


  return (    
    <div>
      <h2 className='title'>GTweets</h2>

      <div className='App'>

        {
          users.map((user,index)=>(
            <Tweet key={index} name={user.name} message={user.message} likes={user.likes} />
          ))
        } 

      </div>

      <div className='btn-area'>
        <button className='btn' onClick={changeTitle}>Magic</button>
        </div>      
    </div>
  );
}

export default App;
