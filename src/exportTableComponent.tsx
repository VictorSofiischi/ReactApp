import React, { useState, useEffect } from "react";

interface Record {
  id: number;
  title: string;
  description?: string;
  email: string;
  range: number;
  valid: boolean;
}

const Table = () => {
  const [records, setRecords] = useState<Record[]>([]);

  useEffect(() => {
    const keys = Object.keys(localStorage);
    const values = keys.map((key) => JSON.parse(localStorage.getItem(key) || ""));
    setRecords(values);
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Description</th>
          <th>Email</th>
          <th>Range</th>
          <th>Valid</th>
        </tr>
      </thead>
      <tbody>
        {records.map((record) => (
          <tr key={record.id}>
            <td>{record.id}</td>
            <td>{record.title}</td>
            <td>{record.description}</td>
            <td>{record.email}</td>
            <td>{record.range}</td>
            <td>{record.valid ? "Yes" : "No"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
