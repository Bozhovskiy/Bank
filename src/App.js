import React, { useState } from 'react';
import { differenceInDays } from 'date-fns';
import './App.css';
function UnknownParameterCalculator() {
  const [fv, setFv] = useState('');
  const [pv, setPv] = useState('');
  const [t, setT] = useState('');
  const [d, setD] = useState('');
  const [result, setResult] = useState('');
  const [n, setN] = useState('');
  const [denumerator,setDenumerator]=useState(365);
  const [i, setI] = useState('');
  const [r, setR] = useState('');
    const calculate = () => {
        if(selectedValue==='value1'){
            setDenumerator(365);
          setN(t/denumerator)
      }
      else if(selectedValue==='value2')
      {
          setDenumerator(360);
          setN((t/denumerator).toFixed(1))
      }
        else if(selectedValue==='value3')
        {
            setDenumerator(360);
            setN(t/denumerator)
        }
      if (selectedValueA==='value1') {
          setPv(fv * (1 - d/100 * n))
          setResult('pv: ' + pv);
      } else if (selectedValueA==='value2') {
          setFv(pv/(1 - d/100 * n))
      setResult('fv: '+ fv);
    } else if(selectedValueA==='value3'){
          setD(((fv-pv)/(n*fv))*100)
        setResult('d: '+ d +'%');
    }else if (selectedValueA==='value4') {
          setN(((fv-pv)/(d/100*fv))*denumerator);
      setResult('n: '+ n);
    }
      setI(d/(1-n*d));
      if(selectedValueA==='value5'){
          setFv((pv/(i-n*d))*(1+(r/100)*n));
          setResult('fv з врахуванням інфляції: '+ fv);
      }
  };
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [result2, setResult2] = useState('');const calculate2 = () => {
      setResult2(differenceInDays(new Date(endDate), new Date(startDate)));
  };
    const [selectedValue, setSelectedValue] = useState('value1');
    const [selectedValueA, setSelectedValueA] = useState('value1');
    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };
    const handleChangeA = (event) => {
        setSelectedValueA(event.target.value);
    };
  return (
      <div className='page'>
          <div>ПОШУК НЕВІДОМОГО ПАРАМЕТРА</div>
          <select value={selectedValueA} onChange={(e) => {handleChangeA(e);calculate();}}>
              <option value="value1">PV</option>
              <option value="value2">FV</option>
              <option value="value3">d</option>
              <option value="value4">n</option>
              <option value="value5">FV з врахуванням інфляції</option>
          </select>
      <div>
          {selectedValueA!=='value1'?
              <div>
        <label>
           PV:
           <input type="number" placeholder='Початкова сума' value={pv} onChange={(e) => {setPv(e.target.value);calculate();}} />
        </label>
              </div>:<>
          </>
      }
          {selectedValueA!=='value2'&&selectedValueA!=='value5'?<div>
        <label>
          FV:
          <input type="number" placeholder='Кінцева сума' value={fv} onChange={(e) => {setFv(e.target.value);calculate();}} />
              </label></div>:<>{selectedValueA==='value5'?<label>
              r:
              <input type="number" placeholder='Відсоток інфляції (%)' value={r} onChange={(e) => {setR(e.target.value);calculate();}} />
          </label>:<></>}</>}
          {selectedValueA!=='value3'?
              <div>
        <label>
           d:
           <input type="number" placeholder='Облікова ставка (%)' value={d} onChange={(e) => {setD(e.target.value);calculate();}} />
        </label></div>:<></>}
      <div>
          <select value={selectedValue} onChange={(e) => {handleChange(e);calculate();}}>
              <option value="value1">Точні відсотки</option>
              <option value="value2">Звичайні відсотки</option>
              <option value="value3">Комерційні відсотки</option>
          </select>
      </div>
    {selectedValueA!=='value4'?<>
          <label>t:
          <input type="number" placeholder='Термін (дні)' value={t} onChange={(e) => {setT(e.target.value);calculate();}} />
          </label>
              <div>
                  <label>
                      Start date:
                      <input type="date" value={startDate} onChange={(e) => {setStartDate(e.target.value);calculate();}} />
                  </label>
                  <label>
                      End date:
                      <input type="date" value={endDate} onChange={(e) => {setEndDate(e.target.value);calculate();}} />
                  </label>
                  <button onClick={calculate2}>Calculate</button>
                  <p>Кількість днів: {result2?result2:n} днів</p>
              </div>
          </> :<></>}
      </div>
          <button onClick={calculate}>Calculate</button>
              <p>Result: {result}</p>
          <div>Еквівалентна проста відсоткова ставка: {i}</div>
      </div>

  );
}

export default UnknownParameterCalculator;
