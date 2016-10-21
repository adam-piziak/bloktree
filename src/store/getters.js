import { createTaskTree } from '../lib/tasks/tools'

export const tasks = state => state.tasks.all
export const taskTrees = () => createTaskTree()
export const projects = state => state.projects.all
export const projectColors = state => state.projects.colors
