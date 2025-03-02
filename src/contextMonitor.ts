import { HighlightAIRuntime } from 'highlight-ai';

// Initialize Highlight AI runtime
const highlightAI = new HighlightAIRuntime();

// Function to monitor desktop context
function monitorDesktopContext() {
  highlightAI.on('contextChange', (context) => {
    console.log('Context changed:', context);
    detectPotentialTasks(context);
  });
}

// Function to detect potential tasks from context
function detectPotentialTasks(context) {
  const tasks = [];

  // Detect TODO comments in code
  const todoRegex = /TODO: (.+)/g;
  let match;
  while ((match = todoRegex.exec(context)) !== null) {
    tasks.push({
      type: 'TODO',
      description: match[1]
    });
  }

  // Detect highlighted text
  if (context.highlightedText) {
    tasks.push({
      type: 'Highlighted',
      description: context.highlightedText
    });
  }

  // Log and return detected tasks
  if (tasks.length > 0) {
    console.log('Detected tasks:', tasks);
    // Here you can integrate with Taskade API to create tasks
  }

  return tasks;
}

// Start monitoring desktop context
monitorDesktopContext();
