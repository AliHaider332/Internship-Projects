import { Github, Linkedin, Mail, Heart, Code, Rocket } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 py-12 mt-16 shadow-2xl relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, rgba(255,255,255,0.3) 2%, transparent 40%)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">Ali Tools</h3>
            </div>
            <p className="text-blue-100 leading-relaxed max-w-md">
              Building intelligent AI-powered tools to simplify your workflow and boost productivity. 
              Empowering developers and creators worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h4 className="text-lg font-semibold text-white mb-4 flex items-center justify-center gap-2">
              <Code className="w-5 h-5" />
              Quick Links
            </h4>
            <div className="space-y-2">
              <a href="#tools" className="block text-blue-100 hover:text-white transition-colors duration-200 hover:translate-x-1 transform">
                AI Tools
              </a>
              <a href="#portfolio" className="block text-blue-100 hover:text-white transition-colors duration-200 hover:translate-x-1 transform">
                Portfolio Builder
              </a>
              <a href="#about" className="block text-blue-100 hover:text-white transition-colors duration-200 hover:translate-x-1 transform">
                About
              </a>
            </div>
          </div>

          {/* Connect Section */}
          <div className="text-center md:text-right">
            <h4 className="text-lg font-semibold text-white mb-4">Let's Connect</h4>
            <div className="flex justify-center md:justify-end gap-4 mb-4">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:shadow-lg group"
              >
                <Github className="w-6 h-6 text-white group-hover:text-blue-200 transition-colors" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:shadow-lg group"
              >
                <Linkedin className="w-6 h-6 text-white group-hover:text-blue-200 transition-colors" />
              </a>
              <a 
                href="mailto:ali@example.com"
                className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:shadow-lg group"
              >
                <Mail className="w-6 h-6 text-white group-hover:text-blue-200 transition-colors" />
              </a>
            </div>
            <p className="text-blue-100 text-sm">
              Got ideas? Let's build something amazing together!
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 my-6"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-blue-100">
            <span>© {new Date().getFullYear()} Ali Tools. Crafted with</span>
            <Heart className="w-4 h-4 text-red-400 fill-current animate-pulse" />
            <span>for the community</span>
          </div>
          
          <div className="flex items-center gap-6 text-sm text-blue-100">
            <a href="#privacy" className="hover:text-white transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="#terms" className="hover:text-white transition-colors duration-200">
              Terms of Service
            </a>
            <span className="flex items-center gap-1">
              <Code className="w-4 h-4" />
              Open Source
            </span>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute -top-4 -left-4 w-8 h-8 bg-white/10 rounded-full blur-sm"></div>
        <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-purple-400/20 rounded-full blur-sm"></div>
        <div className="absolute top-1/2 right-1/4 w-6 h-6 bg-blue-400/20 rounded-full blur-sm"></div>
      </div>
    </footer>
  );
}

export default Footer;