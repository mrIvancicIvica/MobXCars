import React, {useState} from 'react';
import {useCarsStore} from '../context/CarsContext'

const SimpleList = () => {
  const [note, setNote] = useState('');
  console.log(note);
  const notesStore = useCarsStore();
  return (
    <div>
      <input
        value={note}
        onChange={(e) => setNote(e.target.value)}
        type='text'
      />
      <button onClick={() => notesStore.addCarMake(note)}>Add Note</button>
    </div>
  );
};

export default SimpleList;
