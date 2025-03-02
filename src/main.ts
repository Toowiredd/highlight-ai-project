import { HighlightAIRuntime } from 'highlight-ai';
import { setupOSIntegrations } from './osIntegrations';

// Initialize Highlight AI runtime
const highlightAI = new HighlightAIRuntime();

// Configure Highlight AI runtime
highlightAI.configure({
  apiKey: process.env.HIGHLIGHT_AI_API_KEY,
  permissions: {
    desktopContext: true,
    osNotifications: true,
  },
});

if (!process.env.HIGHLIGHT_AI_API_KEY) {
  console.error('HIGHLIGHT_AI_API_KEY environment variable is not set');
  process.exit(1);
}

// Set up OS-level integrations for context monitoring
setupOSIntegrations(highlightAI);

console.log('Highlight AI runtime configured and OS integrations set up.');
