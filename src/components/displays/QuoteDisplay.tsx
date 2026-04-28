import { motion } from 'motion/react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';

export function QuoteDisplay() {
  const [formData, setFormData] = useState({ subject: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Message sent successfully!');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="my-2 sm:my-4"
    >
      <div className="border border-[#00ff41] rounded-lg p-4 sm:p-6 bg-[#0f0f0f]">
        <h2 className="text-lg sm:text-xl mb-4 sm:mb-6">📝 Request a Quote</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="subject" className="text-sm">Subject</Label>
            <Input
              id="subject"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="bg-[#1a1a1a] border-[#00ff41] border-opacity-30"
              required
            />
          </div>
          <div>
            <Label htmlFor="email" className="text-sm">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-[#1a1a1a] border-[#00ff41] border-opacity-30"
              required
            />
          </div>
          <div>
            <Label htmlFor="message" className="text-sm">Message</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="bg-[#1a1a1a] border-[#00ff41] border-opacity-30"
              required
            />
          </div>
          <Button type="submit" className="w-full bg-[#00ff41] text-[#0a0a0a] hover:bg-[#00cc33]">
            Send Message
          </Button>
        </form>
      </div>
    </motion.div>
  );
}
