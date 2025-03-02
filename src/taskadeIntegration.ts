import axios from 'axios';

const TASKADE_API_URL = 'https://api.taskade.com/v1';

if (!process.env.TASKADE_API_KEY) {
  console.error('TASKADE_API_KEY environment variable is not set');
  process.exit(1);
}

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
          Authorization: `Bearer ${process.env.TASKADE_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error creating task:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    }
    throw new Error('Failed to create task');
  }
}

// Function to manage tasks with context-aware tagging, priority, and project assignment
async function manageTask(context) {
  const projectId = process.env.TASKADE_PROJECT_ID;
  if (!projectId) {
    console.error('TASKADE_PROJECT_ID environment variable is not set');
    return;
  }

  const taskName = context.taskName || 'New Task';
  const taskDescription = context.taskDescription || 'No description provided';
  const tags = context.tags || [];
  const priority = context.priority || 'normal';

  try {
    const task = await createTask(projectId, taskName, taskDescription, tags, priority);
    console.log('Task created successfully:', task);
    return task;
  } catch (error) {
    console.error('Error managing task:', error.message);
    // Here you can implement retry logic or alternative actions
  }
}

export { createTask, manageTask };
