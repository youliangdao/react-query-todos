import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Tag } from '../types/types'

const fetchTags = async () => {
  const res = await axios.get<Tag[]>(`${process.env.REACT_APP_REST_URL}/tags/`)
  return res.data
}

export const useQueryTags = () => {
  return useQuery<Tag[], Error>({
    queryKey: ['tags'],
    queryFn: fetchTags,
    staleTime: 60000,
  })
}
