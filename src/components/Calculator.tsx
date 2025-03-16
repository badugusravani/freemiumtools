import React, { useState } from 'react';

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [shouldResetDisplay, setShouldResetDisplay] = useState(false);

  const handleNumber = (num: string) => {
    if (shouldResetDisplay) {
      setDisplay(num);
      setShouldResetDisplay(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleOperator = (operator: string) => {
    setShouldResetDisplay(true);
    setEquation(display + ' ' + operator + ' ');
  };

  const handleEqual = () => {
    try {
      const result = eval(equation + display);
      setDisplay(String(result));
      setEquation('');
    } catch (error) {
      setDisplay('Error');
    }
    setShouldResetDisplay(true);
  };

  const handleClear = () => {
    setDisplay('0');
    setEquation('');
    setShouldResetDisplay(false);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
      <div className="mb-4">
        <div className="text-gray-500 text-sm h-6">{equation}</div>
        <div className="text-3xl font-semibold text-right">{display}</div>
      </div>
      
      <div className="grid grid-cols-4 gap-2">
        <button
          onClick={handleClear}
          className="col-span-2 p-4 text-white bg-red-500 rounded hover:bg-red-600"
        >
          Clear
        </button>
        <button
          onClick={() => handleOperator('/')}
          className="p-4 bg-gray-200 rounded hover:bg-gray-300"
        >
          ÷
        </button>
        <button
          onClick={() => handleOperator('*')}
          className="p-4 bg-gray-200 rounded hover:bg-gray-300"
        >
          ×
        </button>
        
        {[7, 8, 9].map((num) => (
          <button
            key={num}
            onClick={() => handleNumber(String(num))}
            className="p-4 bg-gray-100 rounded hover:bg-gray-200"
          >
            {num}
          </button>
        ))}
        <button
          onClick={() => handleOperator('-')}
          className="p-4 bg-gray-200 rounded hover:bg-gray-300"
        >
          -
        </button>
        
        {[4, 5, 6].map((num) => (
          <button
            key={num}
            onClick={() => handleNumber(String(num))}
            className="p-4 bg-gray-100 rounded hover:bg-gray-200"
          >
            {num}
          </button>
        ))}
        <button
          onClick={() => handleOperator('+')}
          className="p-4 bg-gray-200 rounded hover:bg-gray-300"
        >
          +
        </button>
        
        {[1, 2, 3].map((num) => (
          <button
            key={num}
            onClick={() => handleNumber(String(num))}
            className="p-4 bg-gray-100 rounded hover:bg-gray-200"
          >
            {num}
          </button>
        ))}
        <button
          onClick={handleEqual}
          className="row-span-2 p-4 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          =
        </button>
        
        <button
          onClick={() => handleNumber('0')}
          className="col-span-2 p-4 bg-gray-100 rounded hover:bg-gray-200"
        >
          0
        </button>
        <button
          onClick={() => handleNumber('.')}
          className="p-4 bg-gray-100 rounded hover:bg-gray-200"
        >
          .
        </button>
      </div>
    </div>
  );
};

export default Calculator; 