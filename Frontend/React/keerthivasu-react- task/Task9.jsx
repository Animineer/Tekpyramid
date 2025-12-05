// Task: Voting System with 3 Political Parties using useReducer , There are 3 parties Party A, Party B, Party C. Each button click adds 1 vote to that party. Show the current votes for all parties. Add a reset button to set all votes back to 0. Show which party is currently leading. Handle tie situations (e.g., if Party A and Party B both have the highest votes, show “It’s a tie between Party A and Party B”).

import React, { useEffect, useReducer, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';


function Task9() {
    
    const [val,dispatch]=useReducer(reducer,{tvk:0,dmk:0,bjp:0});
    function reducer(val,act){
        if(act==="reset"){
            return({tvk:0,dmk:0,bjp:0})
        }
            return {...val,[act]:val[act]+1}
    }
    let [leading,setLeading] =useState("NO ONE IS LEADING")
    useEffect(()=>{
        if(val.tvk==0 && val.dmk==0 && val.bjp==0) setLeading("NO ONE IS LEADING")
       else if (val.tvk>val.dmk && val.tvk>val.bjp)setLeading('TVK is leading')
    else if(val.dmk>val.tvk && val.dmk>val.bjp)setLeading('DMK is leading')
    else if(val.bjp>val.tvk && val.bjp>val.dmk)setLeading('BJP is leading')
    else if(val.bjp==val.dmk&&val.dmk==val.tvk) setLeading ('Its a tie between TVK, BJP and DMK')
    else if(val.tvk==val.dmk) setLeading('Its a tie between TVK and DMK') 
    else if(val.tvk==val.bjp) setLeading('Its a tie between TVK and BJP') 
    else setLeading('Its a tie between BJP and DMK')
        
    },[val.tvk,val.dmk,val.bjp]) 

  return (
    <div className='text-center'>
        <div className="d-flex gap-5 justify-content-center">
        <div>
            <h2>TVK Votes:{val.tvk}</h2>
            <button onClick={()=>dispatch('tvk')}>VOTE for TVK</button>
        </div>
        <div>
            <h2>DMK Votes:{val.dmk}</h2>
            <button onClick={()=>dispatch('dmk')}>VOTE for DMK</button>
        </div>
        <div>
            <h2>BJP Votes:{val.bjp}</h2>
            <button onClick={()=>dispatch('bjp')}>VOTE for BJP</button>
        </div>
        </div>
        <div><h3>{leading}</h3></div>
        <br />
        <div><button style={{width:'20%'}} onClick={()=>dispatch('reset')}>RESET</button></div>
    </div>
  )
}

export default Task9