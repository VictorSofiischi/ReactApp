import React from "react";

interface Props {
  minRange: number;
  maxRange: number;
}

interface FormValues {
  id: number;
  title: string;
  description?: string;
  email: string;
  range: number;
  valid: boolean;
}

const RecordsInRange: React.FC<Props> = ({ minRange, maxRange }) => {
  const records = Object.keys(localStorage).map((key) => JSON.parse(localStorage.getItem(key)!)) as FormValues[];

  const validRecords = records.filter((record) => record.valid);
  const filteredRecords = validRecords.filter((record) => record.range >= minRange && record.range <= maxRange && record.valid);

  return (
    <div>
      <h2>Records in Range {minRange} - {maxRange} and state are Valid:</h2>
      {filteredRecords.length === 0 ? (
        <p>No records found.</p>
      ) : (
        <ul>
          {filteredRecords.map((record) => (
            <li key={record.id}>
              <strong>{record.title}</strong> - {record.email} - Range: {record.range}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecordsInRange;
