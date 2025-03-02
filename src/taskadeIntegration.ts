import axios from 'axios';

const TASKADE_API_URL = 'https://api.taskade.com/v1';
const TASKADE_API_KEY = 'YOUR_TASKADE_API_KEY';

// Function to create a task in Taskade
async function createTask(projectId, taskName, taskDescription, tags, priority) {
  try {
    const response = await axios.post(
      `${TASKADE_API_URL}/projects/${projectId}/tasks`,
      {
        name: taskName,
        description: taskDescription,
        tags: tags,
        priority: priority,
      },
      {
        headers: {
          Authorization: `Bearer ${TASKADE_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
}

// Function to manage tasks with context-aware tagging, priority, and project assignment
async function manageTask(context) {
  const projectId = 'YOUR_PROJECT_ID';
  const taskName = context.taskName || 'New Task';
  const taskDescription = context.taskDescription || 'No description provided';
  const tags = context.tags || [];
  const priority = context.priority || 'normal';

  try {
    const task = await createTask(projectId, taskName, taskDescription, tags, priority);
    console.log('Task created successfully:', task);
  } catch (error) {
    console.error('Error managing task:', error);
  }
}

export { createTask, manageTask };
