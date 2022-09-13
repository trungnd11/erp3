import React, { useEffect, useState, useRef, forwardRef} from 'react'
import { Input } from 'reactstrap'
import { searchEmployee } from '../../../api/form-templates-api';

function DepartmentField(props, ref) {
  const { name, defaultValue, disabled } = props;
  const [input, setInput] = useState('');
  const [value, setValue] = useState();
  const [data, setData] = useState([]);
  const timer = useRef();

  console.log(name, defaultValue, disabled);
  const handleChange = (e) => {
    // console.log(e.target.value);
    setInput(e.target.value);
  }

  useEffect(() => {
    timer.current = setTimeout(() => {
      // getData(input);
    }, 1000);

    return () => clearTimeout(timer.current);
  }, [input])

  const getData = (key) => {
    searchEmployee(key).then(response => {
      setData(response);
      console.log(response);
    })
  }

  return (
    <div>
      <Input ref={ref} onChange={handleChange}></Input>
      {data.map((item, index) => (
        <div key={index}>{ item.name}</div>
      ))
      }
    </div>
  )
}
export default forwardRef(DepartmentField);