import React from 'react'

const Cards = ({ title, content }: { title: string; content: string }) => {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600">{content}</p>
    </div>
  )
}

export default Cards