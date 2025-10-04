import { useState, useEffect } from 'react';

export function ExampleComponent() {
  const [count, setCount] = useState(0);

  if (count % 2 === 0) {
    useEffect(() => {
      console.log('Count is even');
    }, []);
  }
  const unusedVar = 'I am unused';

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
