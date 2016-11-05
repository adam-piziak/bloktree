import { createTaskTree, getTasksByProject } from '../lib/tasks/'

export const tasks = state => state.tasks.all
export const taskTrees = () => createTaskTree()
export const tasksByProject = () => getTasksByProject()
export const projects = state => state.projects.all
export const projectColors = state => state.projects.colors
