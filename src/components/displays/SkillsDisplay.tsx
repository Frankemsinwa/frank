import { motion } from 'motion/react';
import { Code, Smartphone, Server, Database, Wrench } from 'lucide-react';

const skillCategories = [
  {
    icon: Smartphone,
    title: 'Mobile Development',
    color: '#00d9ff',
    skills: [
      { name: 'React Native', level: 90 },
      { name: 'Expo', level: 90 },
      { name: 'TypeScript', level: 85 },
      { name: 'Mobile UI/UX', level: 80 },
    ],
  },
  {
    icon: Code,
    title: 'Web Development',
    color: '#00ff41',
    skills: [
      { name: 'Next.js', level: 90 },
      { name: 'React', level: 95 },
      { name: 'Tailwind CSS', level: 90 },
      { name: 'JavaScript/TypeScript', level: 90 },
    ],
  },
  {
    icon: Server,
    title: 'Backend Development',
    color: '#ff00ff',
    skills: [
      { name: 'Node.js', level: 85 },
      { name: 'Express', level: 85 },
      { name: 'RESTful APIs', level: 90 },
      { name: 'GraphQL', level: 75 },
    ],
  },
  {
    icon: Database,
    title: 'Database & ORM',
    color: '#ffff00',
    skills: [
      { name: 'PostgreSQL', level: 85 },
      { name: 'Prisma', level: 90 },
      { name: 'SQL', level: 80 },
      { name: 'Database Design', level: 85 },
    ],
  },
  {
    icon: Wrench,
    title: 'Tools & Others',
    color: '#ff6b35',
    skills: [
      { name: 'Git & GitHub', level: 90 },
      { name: 'Docker', level: 75 },
      { name: 'CI/CD', level: 70 },
      { name: 'AWS/Vercel', level: 75 },
    ],
  },
];

export function SkillsDisplay() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="my-2 sm:my-4"
    >
      <div className="border border-[#00ff41] rounded-lg p-4 sm:p-6 bg-[#0f0f0f]">
        <h2 className="text-lg sm:text-xl mb-4 sm:mb-6">💻 Technical Skills</h2>

        <div className="space-y-6">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="space-y-3"
            >
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <category.icon size={16} className="sm:w-[18px] sm:h-[18px]" style={{ color: category.color }} />
                <h3 className="text-sm sm:text-base" style={{ color: category.color }}>{category.title}</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3 ml-4 sm:ml-6">
                {category.skills.map((skill, skillIdx) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 + skillIdx * 0.05 }}
                    className="space-y-1"
                  >
                    <div className="flex justify-between text-xs">
                      <span>{skill.name}</span>
                      <span className="opacity-60">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 bg-[#1a1a1a] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: idx * 0.1 + skillIdx * 0.05 + 0.2 }}
                        className="h-full rounded-full"
                        style={{
                          background: `linear-gradient(90deg, ${category.color}, ${category.color}aa)`,
                          boxShadow: `0 0 10px ${category.color}66`,
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-6 pt-6 border-t border-[#00ff41] border-opacity-30"
        >
          <p className="text-xs opacity-70">
            🚀 Always learning and expanding my skill set. Currently exploring:
            AI/ML integration, Web3 technologies, and advanced system design
            patterns.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
