import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useAppDispatch } from '../app/hooks'
import { resetEditedTag } from '../slices/todoSlice'
import { Tag } from '../types/types'

const postTag = async (tag: Omit<Tag, 'id'>) => {
  return await axios.post<Tag>(`${process.env.REACT_APP_REST_URL}/tags/`, tag)
}
const updateTask = async (tag: Tag) => {
  return await axios.patch<Tag>(
    `${process.env.REACT_APP_REST_URL}/tags/${tag.id}/`,
    tag
  )
}
const deleteTask = async (id: number) => {
  return await axios.delete<Tag>(
    `${process.env.REACT_APP_REST_URL}/tags/${id}/`
  )
}

export const useMutateTag = () => {
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()

  const createTagMutation = useMutation({
    mutationFn: postTag,
    onSuccess: (res) => {
      const previousTags = queryClient.getQueryData<Tag[]>(['tags'])
      if (previousTags) {
        queryClient.setQueryData<Tag[]>(['tags'], [...previousTags, res.data])
      }
      dispatch(resetEditedTag())
    },
  })

  const updateTagMutation = useMutation({
    mutationFn: updateTask,
    onSuccess: (res, variables) => {
      const previousTags = queryClient.getQueryData<Tag[]>(['tags'])
      if (previousTags) {
        queryClient.setQueryData<Tag[]>(
          ['tags'],
          previousTags.map((previousTag) =>
            previousTag.id === variables.id ? res.data : previousTag
          )
        )
      }
      dispatch(resetEditedTag())
    },
  })

  const deleteTagMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: (res, variables) => {
      const previousTags = queryClient.getQueryData<Tag[]>(['tags'])
      if (previousTags) {
        queryClient.setQueryData<Tag[]>(
          ['tags'],
          previousTags.filter((previousTag) => variables !== previousTag.id)
        )
      }
      dispatch(resetEditedTag())
    },
  })

  return {
    createTagMutation,
    updateTagMutation,
    deleteTagMutation,
  }
}
