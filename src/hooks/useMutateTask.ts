import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useAppDispatch } from '../app/hooks'
import { resetEditedTask } from '../slices/todoSlice'
import { EditTask, Task } from '../types/types'

const postTask = async (task: Omit<EditTask, 'id'>) => {
  const res = await axios.post<Task>(
    `${process.env.REACT_APP_REST_URL}/tasks`,
    task
  )
  return res
}
const updateTask = async (task: EditTask) => {
  const res = await axios.patch<Task>(
    `${process.env.REACT_APP_REST_URL}/tasks/${task.id}`,
    task
  )
  return res
}
const deleteTask = async (id: number) => {
  const res = await axios.delete<Task>(
    `${process.env.REACT_APP_REST_URL}/tasks/${id}`
  )
}

export const useMutateTask = () => {
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()

  const createTaskMutation = useMutation({
    mutationFn: postTask,
    onSuccess: (res) => {
      const previousTodos = queryClient.getQueryData<Task[]>(['tasks'])
      if (previousTodos) {
        queryClient.setQueryData<Task[]>(
          ['tasks'],
          [...previousTodos, res.data]
        )
      }
      dispatch(resetEditedTask())
    },
  })

  const updateTaskMutation = useMutation({
    mutationFn: updateTask,
    onSuccess: (res, variables) => {
      const previousTodos = queryClient.getQueryData<Task[]>(['tasks'])
      if (previousTodos) {
        queryClient.setQueryData<Task[]>(
          ['tasks'],
          previousTodos.map((previousTodo) =>
            previousTodo.id === variables.id ? res.data : previousTodo
          )
        )
      }
      dispatch(resetEditedTask())
    },
  })

  const deleteTaskMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: (res, variables) => {
      const previousTodos = queryClient.getQueryData<Task[]>(['tasks'])
      if (previousTodos) {
        queryClient.setQueryData<Task[]>(
          ['tasks'],
          previousTodos.filter((previousTodo) => variables !== previousTodo.id)
        )
      }
      dispatch(resetEditedTask())
    },
  })

  return {
    createTaskMutation,
    updateTaskMutation,
    deleteTaskMutation,
  }
}
