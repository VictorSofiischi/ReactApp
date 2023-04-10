import React, { useState, useEffect } from 'react';
import BasicForm from './BasicFormComponent.tsx';
import Table from './exportTableComponent.tsx';
import RecordsInRange from './tableInRange.tsx'

interface FormValues {
  id: number;
  title: string;
  description?: string;
  email: string;
  range: number;
  valid: boolean;
}

const isValidEmail = (email: string) => {
  // Add email validation logic here
  return true;
};

const isValidRange = (range: number) => {
  return range > 0 && range < 100;
};

const App = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    id: 0,
    title: '',
    description: '',
    email: '',
    range: 0,
    valid: false,
  });
  const [records, setRecords] = useState<Array<FormValues>>([])

  useEffect(() => {
    const retrievedRecords = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key !== null) {
        const record = JSON.parse(localStorage.getItem(key) || '');
        if (
          isValidEmail(record.email) &&
          isValidRange(record.range) &&
          record.title !== '' &&
          record.email !== '' &&
          record.range !== 0
        ) {
          retrievedRecords.push(record);
        }
      }
    }
    setRecords(retrievedRecords);
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const id = Date.now();
    const newValues = { ...formValues, id };
    localStorage.setItem(id.toString(), JSON.stringify(newValues));
    setFormValues({
      id: 0,
      title: '',
      description: '',
      email: '',
      range: 0,
      valid: false,
    });
    setRecords([...records, newValues]);
  };

  const validRecords = records.filter((record) => record.valid);
  const filteredRecords = validRecords.filter((record) => record.range > 29 && record.range < 61);

  return (
    <div>
      <BasicForm formValues={formValues} handleChange={handleChange} handleSubmit={handleSubmit} />
      <Table records={filteredRecords} />
      <RecordsInRange minRange={29} maxRange={61}></RecordsInRange>
    </div>
  );
};

export default App;
