import { ChevronDoubleRightIcon } from '@heroicons/react/24/solid'
import React, { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TaskList from './TaskList'

const MainTask: FC = () => {
  const navigate = useNavigate()
  const [text, setText] = useState('')
  console.log('rendered MainTask')

  return (
    <>
      <input
        className="mb-3 px-3 py-2 border border-gray-300"
        placeholder="dummy text ?"
        type="text"
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <p className="mb-10 text-xl font-bold">Tasks</p>
      <div className="grid grid-cols-2 gap-40">
        <TaskList />
      </div>
      <ChevronDoubleRightIcon
        onClick={() => navigate('/tags')}
        className="h-5 w-5 mt-2 text-blue-500 cursor-pointer"
      />
      <p>Tag page</p>
    </>
  )
}

export default MainTask