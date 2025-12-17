import React, { useState } from 'react'
import { URL } from './constants';


function App() {
  const [question,setQuestion] = useState('');
  const askQuestion = async () => {
  if (!question.trim()) return

  const payload = {
    contents: [
      {
        parts: [{ text: question }]
      }
    ]
  }

  const response = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  })

  const data = await response.json()
  console.log(data)

  console.log(
    data.candidates[0].content.parts[0].text
  )
}

  return (
    <div className="grid grid-cols-5 h-screen bg-zinc-900 text-white">

      {/* Sidebar */}
      <div className="col-span-1 bg-zinc-800 p-4">
        <h2 className="text-xl font-semibold mb-4">Menu</h2>
        <ul className="space-y-3 text-zinc-300">
          <li className="hover:text-white cursor-pointer">Home</li>
          <li className="hover:text-white cursor-pointer">Chat</li>
          <li className="hover:text-white cursor-pointer">Settings</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="col-span-4 flex flex-col justify-between p-6">

        {/* Chat Area */}
        <div className="flex-1 bg-zinc-100 rounded-xl p-4 mb-4 text-black overflow-y-auto">
          <p className="text-zinc-500 text-center mt-10">
            Ask something to start conversation...
          </p>
        </div>

        {/* Input Box */}
        <div className="flex items-center bg-zinc-800 rounded-2xl border border-zinc-700 p-2 w-3/4 mx-auto">
          <input
            value={question}
            onChange={(event)=>setQuestion(event.target.value)}
            type="text"
            placeholder="Ask me anything..."
            className="flex-1 bg-transparent px-4 py-3 outline-none text-white placeholder-zinc-400"
          />
          <button 
          onClick={()=>askQuestion()}
          style={{ cursor: 'pointer' }}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-xl text-white font-medium">
            Ask
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
