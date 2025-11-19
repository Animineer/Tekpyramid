import React, { useMemo, useState } from 'react'

const UseMemo = () => {
    const [count, setCount] = useState(0);
    const [text, setText] = useState('');

    const expensiveValue = useMemo(() => {
        console.log("Calculating...");
        return count * 2;
    }, [count]);

    console.log('usememo component re-renders')
    
    return (
        <div>
            <h2>Value: {expensiveValue}</h2>
            <button onClick={() => setCount(count + 1)}>+</button>

            <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type something"
            />
        </div>
    )
}

export default UseMemo
