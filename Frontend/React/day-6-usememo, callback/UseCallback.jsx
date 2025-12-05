import React, { useCallback, useState } from 'react'
import Child from './Child';

const UseCallback = () => {
    const [count, setCount] = useState(0);
    const [text, setText] = useState('');

    //  this WITHOUT useCallback
    // const handleClick = () => {
    //   console.log("Child button clicked");
    //   setCount(prev => prev + 1);
    // };

    // this WITH useCallback
    const handleClick = useCallback(() => {
        console.log("Child button clicked");
        setCount(prev => prev + 1);
    }, []);

    console.log("Parent rendered");
    return (
        <div>
            <h2>Count: {count}</h2>
            <Child click={handleClick} />

            <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type something"
            />
        </div>
    )
}

export default UseCallback
