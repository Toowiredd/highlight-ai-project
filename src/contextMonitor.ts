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
  // Example: Detect TODO comments in code
  const todoRegex = /TODO: (.+)/g;
  const matches = context.match(todoRegex);
  if (matches) {
    matches.forEach((match) => {
      const taskDescription = match.replace('TODO: ', '');
      console.log('Detected task:', taskDescription);
      // Here you can integrate with Taskade API to create tasks
    });
  }

  // Example: Detect highlighted text
  if (context.highlightedText) {
    console.log('Detected highlighted text:', context.highlightedText);
    // Here you can integrate with Taskade API to create tasks
  }
}

// Start monitoring desktop context
monitorDesktopContext();
