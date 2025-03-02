import { HighlightAIRuntime } from 'highlight-ai';
import { manageTask } from '../taskadeIntegration';

// Initialize Highlight AI runtime
const highlightAI = new HighlightAIRuntime();

// Function to display notification
function displayNotification(taskDescription) {
  const notification = new Notification('New Task Detected', {
    body: taskDescription,
  });

  notification.onclick = () => {
    console.log('Notification clicked');
    // Here you can add logic to open the task in the UI
  };
}

// Function to handle context change
function handleContextChange(context) {
  const todoRegex = /TODO: (.+)/g;
  const matches = context.match(todoRegex);
  if (matches) {
    matches.forEach((match) => {
      const taskDescription = match.replace('TODO: ', '');
      console.log('Detected task:', taskDescription);
      displayNotification(taskDescription);
      manageTask({ taskName: 'TODO Task', taskDescription });
    });
  }

  if (context.highlightedText) {
    console.log('Detected highlighted text:', context.highlightedText);
    displayNotification(context.highlightedText);
    manageTask({ taskName: 'Highlighted Text', taskDescription: context.highlightedText });
  }
}

// Start monitoring desktop context
highlightAI.on('contextChange', handleContextChange);

// Request notification permission
if (Notification.permission !== 'granted') {
  Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      console.log('Notification permission granted');
    }
  });
}
