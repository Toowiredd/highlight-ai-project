import { HighlightAIRuntime } from 'highlight-ai';
import { setupOSIntegrations } from './osIntegrations';

// Initialize Highlight AI runtime
const highlightAI = new HighlightAIRuntime();

// Configure Highlight AI runtime
highlightAI.configure({
  apiKey: 'YOUR_HIGHLIGHT_AI_API_KEY',
  permissions: {
    desktopContext: true,
    osNotifications: true,
  },
});

// Set up OS-level integrations for context monitoring
setupOSIntegrations(highlightAI);

console.log('Highlight AI runtime configured and OS integrations set up.');
