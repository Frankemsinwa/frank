import { motion } from 'motion/react';
import { Briefcase, Calendar } from 'lucide-react';

const experiences = [
  {
    title: 'Senior Full-Stack Developer',
    company: 'Tech Innovations Inc.',
    period: '2022 - Present',
    location: 'Remote',
    description:
      'Leading development of mobile and web applications. Architecting scalable backend systems and mentoring junior developers.',
    achievements: [
      'Built and launched 3 production mobile apps with 50k+ downloads',
      'Reduced API response times by 60% through optimization',
      'Implemented CI/CD pipeline reducing deployment time by 75%',
    ],
    tech: ['React Native', 'Next.js', 'Node.js', 'PostgreSQL'],
  },
  {
    title: 'Full-Stack Developer',
    company: 'Digital Solutions Co.',
    period: '2020 - 2022',
    location: 'Hybrid',
    description:
      'Developed and maintained multiple client projects. Specialized in building responsive web applications and REST APIs.',
    achievements: [
      'Delivered 15+ client projects on time and within budget',
      'Improved application performance by 40% through code optimization',
      'Mentored 5 junior developers and conducted code reviews',
    ],
    tech: ['React', 'Express', 'MongoDB', 'Docker'],
  },
  {
    title: 'Junior Developer',
    company: 'StartUp Labs',
    period: '2019 - 2020',
    location: 'On-site',
    description:
      'Started my professional journey building web applications and learning industry best practices.',
    achievements: [
      'Contributed to 10+ features in the main product',
      'Improved test coverage from 40% to 80%',
      'Participated in agile development and sprint planning',
    ],
    tech: ['JavaScript', 'React', 'Node.js', 'MySQL'],
  },
];

export function ExperienceDisplay() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="my-2 sm:my-4"
    >
      <div className="border border-[#00ff41] rounded-lg p-4 sm:p-6 bg-[#0f0f0f]">
        <h2 className="text-lg sm:text-xl mb-4 sm:mb-6">💼 Work Experience</h2>

        <div className="space-y-6">
          {experiences.map((exp, idx) => (
            <motion.div
              key={`${exp.company}-${exp.period}`}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: idx * 0.15 }}
              className="relative pl-4 sm:pl-6 border-l-2 border-[#00ff41] border-opacity-30"
            >
              {/* Timeline dot */}
              <div className="absolute -left-[7px] sm:-left-[9px] top-0 w-3 h-3 sm:w-4 sm:h-4 bg-[#00ff41] rounded-full border-2 sm:border-4 border-[#0a0a0a]" />

              <div className="mb-3">
                <div className="flex items-start justify-between flex-wrap gap-2 mb-2">
                  <div>
                    <h3 className="text-[#00d9ff] flex items-center gap-2">
                      <Briefcase size={16} />
                      {exp.title}
                    </h3>
                    <p className="text-sm opacity-80">{exp.company}</p>
                  </div>
                  <div className="text-xs opacity-60 flex items-center gap-1">
                    <Calendar size={12} />
                    {exp.period} • {exp.location}
                  </div>
                </div>

                <p className="text-sm mb-3 opacity-80">{exp.description}</p>

                <div className="space-y-1 mb-3">
                  <p className="text-xs opacity-70">Key Achievements:</p>
                  {exp.achievements.map((achievement, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.15 + i * 0.1 }}
                      className="text-xs opacity-70 ml-4"
                    >
                      • {achievement}
                    </motion.p>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  {exp.tech.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2 py-0.5 rounded bg-[#1a1a1a] opacity-60"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 pt-6 border-t border-[#00ff41] border-opacity-30"
        >
          <p className="text-xs opacity-70">
            📈 Total Experience: 5+ years in software development
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
