import { Github, Linkedin, Mail, Heart, ExternalLink } from 'lucide-react';

function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: Github,
      href: 'https://github.com/AliHaider332',
      label: 'GitHub',
    },
    {
      icon: Linkedin,
      href: 'https://linkedin.com/in/alihaider332',
      label: 'LinkedIn',
    },
    {
      icon: Mail,
      href: 'mailto:bhaialihaider332@gmail.com',
      label: 'Email',
    },
    {
      icon: ExternalLink,
      href: 'https://internship-projects-1gqx.vercel.app/',
      label: 'Portfolio',
    },
  ];

  return (
    <footer className="bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-800 text-white py-16 mt-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-white rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-300 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center space-y-10">
          {/* Brand Section */}
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-orange-300 hover:from-orange-300 hover:to-yellow-300 transition-all duration-500">
              Ali Haider
            </h2>
            <p className="text-white/80 text-lg font-light">
              Full Stack Developer & UI/UX Enthusiast
            </p>
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-5 py-3 rounded-xl hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-white/10 border border-white/10 hover:border-white/20 group"
              >
                <Icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                <span className="font-medium">{label}</span>
              </a>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center max-w-2xl">
            <p className="text-white/80 text-lg mb-4">
              Let's build something amazing together!
            </p>
            <a
              href="mailto:bhaialihaider332@gmail.com"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-400 to-pink-500 hover:from-orange-500 hover:to-pink-600 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25"
            >
              <Mail className="w-5 h-5" />
              Get In Touch
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
