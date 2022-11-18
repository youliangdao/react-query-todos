import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Task } from '../types/types'

const fetchTasks = async () => {
  const res = await axios.get<Task[]>(
    `${process.env.REACT_APP_REST_URL}/tasks/`
  )
  return res.data
}

export const useQueryTasks = () => {
  return useQuery<Task[], Error>({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
    staleTime: 0,
    refetchOnWindowFocus: true,
    // refetchInterval: 5000,
  })
}
