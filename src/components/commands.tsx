import { AboutDisplay } from './displays/AboutDisplay';
import { SkillsDisplay } from './displays/SkillsDisplay';
import { ProjectsDisplay } from './displays/ProjectsDisplay';
import { ContactDisplay } from './displays/ContactDisplay';
import { ExperienceDisplay } from './displays/ExperienceDisplay';
import { QuoteDisplay } from './displays/QuoteDisplay';

export interface Command {
  name: string;
  description: string;
  usage?: string;
  execute: (args: string[]) => string | JSX.Element;
}

export const commands: Record<string, Command> = {
  help: {
    name: 'help',
    description: 'Display available commands',
    execute: () => {
      const commandList = Object.values(commands).map((cmd) => {
        const usage = cmd.usage ? ` ${cmd.usage}` : '';
        return `  ${cmd.name.padEnd(15)} - ${cmd.description}`;
      });

      return `
Available Commands:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${commandList.join('\n')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💡 Tip: Use Tab for auto-completion, ↑/↓ for history
`;
    },
  },

  about: {
    name: 'about',
    description: 'Learn more about Frank',
    execute: () => <AboutDisplay />,
  },

  skills: {
    name: 'skills',
    description: 'View technical skills and expertise',
    execute: () => <SkillsDisplay />,
  },

  projects: {
    name: 'projects',
    description: 'Browse portfolio projects',
    execute: () => <ProjectsDisplay />,
  },

  experience: {
    name: 'experience',
    description: 'View work experience and career history',
    execute: () => <ExperienceDisplay />,
  },

  contact: {
    name: 'contact',
    description: 'Get in touch with Frank',
    execute: () => <ContactDisplay />,
  },

  whoami: {
    name: 'whoami',
    description: 'Display current user info',
    execute: () => 'frank@portfolio - Full-Stack Developer | React • Next.js • Node.js • PostgreSQL',
  },

  date: {
    name: 'date',
    description: 'Display current date and time',
    execute: () => new Date().toString(),
  },

  clear: {
    name: 'clear',
    description: 'Clear the terminal screen',
    execute: () => '',
  },

  echo: {
    name: 'echo',
    description: 'Display a line of text',
    usage: '<message>',
    execute: (args) => args.join(' ') || '',
  },

  linkedin: {
    name: 'linkedin',
    description: 'Open LinkedIn profile',
    execute: () => {
      window.open('https://linkedin.com/in/frank-emesinwa', '_blank');
      return '🔗 Opening LinkedIn profile...';
    },
  },

  github: {
    name: 'github',
    description: 'Open GitHub profile',
    execute: () => {
      window.open('https://github.com/frankemesinwa', '_blank');
      return '🔗 Opening GitHub profile...';
    },
  },

  email: {
    name: 'email',
    description: 'Send an email',
    execute: () => {
      window.location.href = 'mailto:frank.emesinwa@example.com';
      return '📧 Opening email client...';
    },
  },

  resume: {
    name: 'resume',
    description: 'Download resume/CV',
    execute: () => {
      return '📄 Resume download would be initiated here. Add your resume link!';
    },
  },

  quote: {
    name: 'quote',
    description: 'Request a project quote',
    execute: () => <QuoteDisplay />,
  },

  matrix: {
    name: 'matrix',
    description: 'Enter the Matrix... 🟢',
    execute: () => '⚡ Wake up, Neo... The Matrix has you... 🟢',
  },

  snake: {
    name: 'snake',
    description: 'Play Snake game in the terminal 🐍',
    execute: () => '🎮 Launching Snake game...',
  },

  hack: {
    name: 'hack',
    description: 'Activate hacker typer mode 💻',
    execute: () => '⌨️ Entering hacker mode...',
  },

  konami: {
    name: 'konami',
    description: 'Try the Konami code... 🎮',
    execute: () => '⬆️⬆️⬇️⬇️⬅️➡️⬅️➡️🅱️🅰️',
  },

  ascii: {
    name: 'ascii',
    description: 'Display ASCII art',
    execute: () => `
    ___________                 __    
    \\_   _____/___________    ____ |  | __
     |    __) \\_  __ \\__  \\  /    \\|  |/ /
     |     \\   |  | \\// __ \\|   |  \\    < 
     \\___  /   |__|  (____  /___|  /__|_ \\
         \\/               \\/     \\/     \\/
    
    🚀 Full-Stack Developer
    💻 Building the future, one line at a time
    `,
  },

  fireworks: {
    name: 'fireworks',
    description: 'Celebrate with fireworks! 🎆',
    execute: () => '🎆✨🎇 BOOM! 🎇✨🎆',
  },
};
