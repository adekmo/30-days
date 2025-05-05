'use client'

import React, { useState } from 'react'

const Setting = () => {
    const [darkMode, setDarkMode] = useState(false)
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Pengaturan</h1>
      <div className="flex items-center space-x-2">
        <label className="text-gray-700">Mode Gelap</label>
        <input
          type="checkbox"
          checked={darkMode}
          onChange={() => setDarkMode(!darkMode)}
          className="w-5 h-5"
        />
      </div>
    </div>
  )
}

export default Setting