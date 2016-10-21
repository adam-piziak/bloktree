import store from '../../store'

// Returns root level tasks
const getRoot = () => {                         // Get root level tasks
  const tasks = store.getters.tasks
  let root = []
  for (let i in tasks) {
    if (tasks[i].parent === 0) {
      root.push(tasks[i])
    }
  }
  return root
}

// Returns children of specified task
const getChildren = id => {
  let tasks = store.getters.tasks               // Get all tasks
  let children = []
  for (let i in tasks) {
    const isChild = tasks[i].parent === id      // Checks if task is child of parent
    const hasChildren = tasks[i].hasChildren    // Checks if task has children
    if (isChild && !hasChildren) {              // If task has NO children, add to variable children
      const child = {
        id: tasks[i].id,
        name: tasks[i].name
      }
      children.push(child)
    } else if (isChild && hasChildren) {        // If task has children, gets it children first
      const child = {
        id: tasks[i].id,
        name: tasks[i].name,
        children: getChildren(tasks[i].id)
      }
      children.push(child)
    }
  }
  return children
}

// Create json task tree from flat array of json tasks
export const createTaskTree = () => {
  let root = getRoot()
  let taskTree = []
  for (let i in root) {
    if (!root[i].hasChildren) {
      let task = {
        id: root[i].id,
        name: root[i].name,
        project: root[i].project
      }
      taskTree.push(task)
    } else if (root[i].hasChildren) {
      let task = {
        id: root[i].id,
        name: root[i].name,
        project: root[i].project,
        children: getChildren(root[i].id)
      }
      taskTree.push(task)
    }
  }
  return taskTree
}
