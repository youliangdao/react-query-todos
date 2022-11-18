import { useQueryClient } from '@tanstack/react-query'
import React, { FC, memo } from 'react'
import { useQueryTags } from '../hooks/useQueryTags'
import { Tag } from '../types/types'
import TagItemMemo from './TagItem'

const TagList: FC = () => {
  const { status, data } = useQueryTags()
  // const queryClient = useQueryClient()
  // const data = queryClient.getQueryData<Tag[]>(['tags'])
  console.log('rendered TagList')
  if (status === 'loading') return <div>{'Loading...'}</div>
  if (status === 'error') return <div>{'Error'}</div>
  return (
    <div>
      {data?.map((tag) => (
        <div key={tag.id}>
          <ul>
            <TagItemMemo tag={tag} />
          </ul>
        </div>
      ))}
    </div>
  )
}

const TagListMemo = memo(TagList)
export default TagListMemo
