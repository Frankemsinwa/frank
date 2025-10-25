import { motion } from 'motion/react';
import { Mail, Linkedin, Github, Twitter, MapPin, Phone } from 'lucide-react';

const contactMethods = [
  {
    icon: Mail,
    label: 'Email',
    value: 'frank.emesinwa@example.com',
    action: 'mailto:frank.emesinwa@example.com',
    color: '#00d9ff',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: '/in/frank-emesinwa',
    action: 'https://linkedin.com/in/frank-emesinwa',
    color: '#0077b5',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: '@frankemesinwa',
    action: 'https://github.com/frankemesinwa',
    color: '#ffffff',
  },
  {
    icon: Twitter,
    label: 'Twitter',
    value: '@frankemesinwa',
    action: 'https://twitter.com/frankemesinwa',
    color: '#1da1f2',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+1 (555) 123-4567',
    action: 'tel:+15551234567',
    color: '#00ff41',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Available Worldwide (Remote)',
    action: null,
    color: '#ff00ff',
  },
];

export function ContactDisplay() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="my-2 sm:my-4"
    >
      <div className="border border-[#00ff41] rounded-lg p-4 sm:p-6 bg-[#0f0f0f]">
        <h2 className="text-lg sm:text-xl mb-4 sm:mb-6">📬 Get In Touch</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
          {contactMethods.map((method, idx) => (
            <motion.div
              key={method.label}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="group"
            >
              {method.action ? (
                <button
                  onClick={() => {
                    if (method.action.startsWith('http')) {
                      window.open(method.action, '_blank');
                    } else {
                      window.location.href = method.action;
                    }
                  }}
                  className="w-full border border-opacity-30 rounded-lg p-3 sm:p-4 hover:border-opacity-100 transition-all duration-300 text-left"
                  style={{
                    borderColor: method.color,
                    background: `linear-gradient(135deg, ${method.color}05, transparent)`,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="p-2 rounded-lg transition-transform group-hover:scale-110"
                      style={{
                        backgroundColor: `${method.color}22`,
                        color: method.color,
                      }}
                    >
                      <method.icon size={20} />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs opacity-60 mb-1">{method.label}</p>
                      <p className="text-sm" style={{ color: method.color }}>
                        {method.value}
                      </p>
                    </div>
                  </div>
                </button>
              ) : (
                <div
                  className="w-full border border-opacity-30 rounded-lg p-4"
                  style={{
                    borderColor: method.color,
                    background: `linear-gradient(135deg, ${method.color}05, transparent)`,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="p-2 rounded-lg"
                      style={{
                        backgroundColor: `${method.color}22`,
                        color: method.color,
                      }}
                    >
                      <method.icon size={20} />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs opacity-60 mb-1">{method.label}</p>
                      <p className="text-sm" style={{ color: method.color }}>
                        {method.value}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="border-t border-[#00ff41] border-opacity-30 pt-6"
        >
          <h3 className="text-sm mb-3 text-[#00d9ff]">💬 Quick Commands</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
            <button
              onClick={() => window.open('https://linkedin.com/in/frank-emesinwa', '_blank')}
              className="px-3 py-2 bg-[#1a1a1a] rounded hover:bg-[#00ff41] hover:text-[#0a0a0a] transition-colors"
            >
              $ linkedin
            </button>
            <button
              onClick={() => window.open('https://github.com/frankemesinwa', '_blank')}
              className="px-3 py-2 bg-[#1a1a1a] rounded hover:bg-[#00ff41] hover:text-[#0a0a0a] transition-colors"
            >
              $ github
            </button>
            <button
              onClick={() => (window.location.href = 'mailto:frank.emesinwa@example.com')}
              className="px-3 py-2 bg-[#1a1a1a] rounded hover:bg-[#00ff41] hover:text-[#0a0a0a] transition-colors"
            >
              $ email
            </button>
            <button
              className="px-3 py-2 bg-[#1a1a1a] rounded hover:bg-[#00ff41] hover:text-[#0a0a0a] transition-colors"
            >
              $ resume
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-6 text-center"
        >
          <p className="text-sm opacity-70">
            ✨ Open to freelance projects and full-time opportunities
          </p>
          <p className="text-xs opacity-50 mt-2">
            Response time: Usually within 24 hours
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
