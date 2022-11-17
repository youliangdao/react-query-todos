export type Task = {
  id: number
  title: string
  created_at: string
  updated_at: string
  tag: number
  tag_name: string
}
export type EditTask = {
  id: number
  title: string
  tag: number
}
export type Tag = {
  id: number
  name: string
}
