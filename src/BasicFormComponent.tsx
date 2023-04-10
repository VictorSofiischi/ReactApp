import React, { useState } from "react";

interface FormValues {
  id: number;
  title: string;
  description?: string;
  email: string;
  range: number;
  valid: boolean;
}

const initialValues: FormValues = {
  id: 0,
  title: "",
  email: "",
  range: 0,
  valid: false,
};



const BasicForm = () => {
  const [formValues, setFormValues] = useState<FormValues>(initialValues);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const id = Date.now();
    const newValues = { ...formValues, id };
    localStorage.setItem(id.toString(), JSON.stringify(newValues));
    setFormValues(initialValues);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input type="text" name="title" value={formValues.title} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Description:
        <input type="text" name="description" value={formValues.description} onChange={handleChange} />
      </label>
      <br />
      <label>
        Email:
        <input type="email" name="email" value={formValues.email} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Range:
        <input
          type="number"
          name="range"
          value={formValues.range}
          onChange={handleChange}
          min={1}
          max={99}
          required
        />
      </label>
      <br />
      <label>
        Valid:
        <input type="checkbox" name="valid" checked={formValues.valid} onChange={handleChange} />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default BasicForm;
