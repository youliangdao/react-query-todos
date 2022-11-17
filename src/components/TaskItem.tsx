import React, { FC } from 'react'
import { useAppDispatch } from '../app/hooks'
import { useMutateTask } from '../hooks/useMutateTask'
import { Task } from '../types/types'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid'
import { setEditedTask } from '../slices/todoSlice'

type Props = {
  task: Task
}
const TaskItem: FC<Props> = ({ task }) => {
  const dispatch = useAppDispatch()
  const { deleteTaskMutation } = useMutateTask()
  console.log('rendered TaskItem')
  if (deleteTaskMutation.isLoading) {
    return <p>Deleting...</p>
  }

  return (
    <li className="my-3">
      <span className="font-bold">{task.title}</span>
      <span>
        {' : '}
        {task.tag_name}
      </span>

      <div className="flex float-right ml-20">
        <PencilIcon
          className="h-5 w-5 mx-1 text-blue-500 cursor-pointer"
          onClick={() => {
            dispatch(
              setEditedTask({
                ...task,
              })
            )
          }}
        />
        <TrashIcon
          className="h-5 w-5 text-blue-500 cursor-pointer"
          onClick={() => {
            deleteTaskMutation.mutate(task.id)
          }}
        />
      </div>
    </li>
  )
}

export default TaskItem
