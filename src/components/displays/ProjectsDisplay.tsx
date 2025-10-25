import { motion } from 'motion/react';
import { ExternalLink, Github, Smartphone, Globe, Zap } from 'lucide-react';

const projects = [
  {
    title: 'TaskFlow Mobile',
    type: 'Mobile App',
    icon: Smartphone,
    description:
      'A full-featured task management mobile app built with React Native and Expo. Includes offline support, push notifications, and real-time collaboration.',
    tech: ['React Native', 'Expo', 'TypeScript', 'Firebase'],
    color: '#00d9ff',
    status: 'Live',
  },
  {
    title: 'E-Commerce Platform',
    type: 'Web App',
    icon: Globe,
    description:
      'Modern e-commerce solution with Next.js 14, featuring server-side rendering, optimistic UI updates, and seamless checkout experience.',
    tech: ['Next.js', 'React', 'PostgreSQL', 'Stripe'],
    color: '#00ff41',
    status: 'Live',
  },
  {
    title: 'Real-Time Analytics API',
    type: 'Backend',
    icon: Zap,
    description:
      'High-performance RESTful API for processing and analyzing real-time data. Handles 10k+ requests per minute with sub-100ms response times.',
    tech: ['Node.js', 'Express', 'Prisma', 'PostgreSQL'],
    color: '#ff00ff',
    status: 'Production',
  },
  {
    title: 'Social Connect',
    type: 'Full-Stack',
    icon: Smartphone,
    description:
      'Social networking platform with mobile and web apps. Features include real-time messaging, media sharing, and activity feeds.',
    tech: ['React Native', 'Next.js', 'Node.js', 'WebSocket'],
    color: '#ffff00',
    status: 'In Development',
  },
];

export function ProjectsDisplay() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="my-2 sm:my-4"
    >
      <div className="border border-[#00ff41] rounded-lg p-4 sm:p-6 bg-[#0f0f0f]">
        <h2 className="text-lg sm:text-xl mb-4 sm:mb-6">🚀 Featured Projects</h2>

        <div className="space-y-4">
          {projects.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="border border-opacity-30 rounded-lg p-3 sm:p-4 hover:border-opacity-100 transition-all duration-300 group"
              style={{
                borderColor: project.color,
                background: `linear-gradient(135deg, ${project.color}05, transparent)`,
              }}
            >
              <div className="flex items-start justify-between mb-2 sm:mb-3 flex-wrap gap-2">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div
                    className="p-1.5 sm:p-2 rounded-lg"
                    style={{
                      backgroundColor: `${project.color}22`,
                      color: project.color,
                    }}
                  >
                    <project.icon size={18} className="sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h3 className="flex items-center gap-2 text-sm sm:text-base flex-wrap">
                      {project.title}
                      <span
                        className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded"
                        style={{
                          backgroundColor: `${project.color}22`,
                          color: project.color,
                        }}
                      >
                        {project.status}
                      </span>
                    </h3>
                    <p className="text-xs opacity-60">{project.type}</p>
                  </div>
                </div>

                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    className="p-1.5 rounded hover:bg-[#00ff41] hover:text-[#0a0a0a] transition-colors"
                    title="View Live"
                  >
                    <ExternalLink size={14} />
                  </button>
                  <button
                    className="p-1.5 rounded hover:bg-[#00ff41] hover:text-[#0a0a0a] transition-colors"
                    title="View Code"
                  >
                    <Github size={14} />
                  </button>
                </div>
              </div>

              <p className="text-sm mb-3 opacity-80">{project.description}</p>

              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2 py-1 rounded bg-[#1a1a1a] opacity-70"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 pt-6 border-t border-[#00ff41] border-opacity-30 text-center"
        >
          <p className="text-sm opacity-70">
            💡 View more projects on{' '}
            <button
              onClick={() => window.open('https://github.com/frankemesinwa', '_blank')}
              className="text-[#00d9ff] hover:underline"
            >
              GitHub
            </button>
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
