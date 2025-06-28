import React from 'react'

const Table = ({ formData }) => {
  return (
    <>
      {formData && formData.length > 0 &&
        formData.map((data, index) => (
          <tr key={index} className={`hover:bg-gray-50 ${
            data.type === 'income' ? 'bg-green-50' : 'bg-red-50'
          }`}>
            <td className="border border-gray-300 p-2">{data.category || 'N/A'}</td>
            <td className={`border border-gray-300 p-2 font-semibold ${
              data.type === 'income' ? 'text-green-600' : 'text-red-600'
            }`}>
              {data.type === 'income' ? '+' : '-'}₹{data.amount || data.expense || 'N/A'}
            </td>
            <td className="border border-gray-300 p-2">{data.title || 'N/A'}</td>
            <td className={`border border-gray-300 p-2 font-medium ${
              data.type === 'income' ? 'text-green-700' : 'text-red-700'
            }`}>
              {data.type === 'income' ? 'Income' : 'Expense'}
            </td>
            <td className="border border-gray-300 p-2">{data.date ? new Date(data.date).toLocaleDateString() : 'N/A'}</td>
          </tr>
        ))}
    </>
  );
}

export default Table