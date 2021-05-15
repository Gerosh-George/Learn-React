import {useState} from 'react'
import './App.css';


function Tweet({name,message,likes}){
    
    const [lcount,setLikes] = useState(likes)

    const incLike = ()=>{
        setLikes(lcount+1)
    }

    return(
        <div className='tweet'>
            <div>{name}</div>
            <div>{message}</div>
            <div>{lcount}</div>
            <button onClick={incLike}>Hit me</button>
        </div>
    )
}

export default Tweet