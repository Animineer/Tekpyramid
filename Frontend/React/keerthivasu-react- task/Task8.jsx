import React, { useEffect, useState } from 'react'

function Task8() {
    const [sec, setSec] = useState(new Date());
    
    useEffect(() => {
        let time=setInterval(() => {
            setSec(new Date());
            
        }, 1000);
        return  ()=> clearInterval(time);
    }, [])

    return (
        <div>
            <div>
              {sec.toLocaleTimeString()}
            </div>
        </div>
    )
}

export default Task8