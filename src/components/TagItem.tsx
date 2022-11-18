import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid'
import React, { FC, memo } from 'react'
import { useAppDispatch } from '../app/hooks'
import { useMutateTag } from '../hooks/useMutateTag'
import { setEditedTag } from '../slices/todoSlice'
import { Tag } from '../types/types'

type Props = {
  tag: Tag
}

const TagItem: FC<Props> = ({ tag }) => {
  const dispatch = useAppDispatch()
  const { deleteTagMutation } = useMutateTag()
  console.log('rendered TagItem')
  if (deleteTagMutation.isLoading) {
    return <p>Deleting...</p>
  }
  return (
    <li className="my-3">
      <span className="font-bold">{tag.name}</span>
      <div className="flex float-right ml-20">
        <PencilIcon
          className="h-5 w-5 mx-1 text-blue-500 cursor-pointer"
          onClick={() => {
            dispatch(
              setEditedTag({
                ...tag,
              })
            )
          }}
        />
        <TrashIcon
          className="h-5 w-5 text-blue-500 cursor-pointer"
          onClick={() => {
            deleteTagMutation.mutate(tag.id)
          }}
        />
      </div>
    </li>
  )
}
const TagItemMemo = memo(TagItem)
export default TagItemMemo
