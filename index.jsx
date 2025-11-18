import React, { useState, useEffect, useRef } from 'react';
import { Code, Brain, Database, TrendingUp, Mail, MapPin, BookOpen, Github, Linkedin, Twitter, Award, Briefcase, Sparkles } from 'lucide-react';

export default function Portfolio() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState('about');
  const [scrollY, setScrollY] = useState(0);
  const [particlesVisible, setParticlesVisible] = useState(true);
  const canvasRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 30 - 15,
        y: (e.clientY / window.innerHeight) * 30 - 15
      });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Particle system
  useEffect(() => {
    if (!particlesVisible) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 50;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.fillStyle = `rgba(167, 139, 250, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle, i) => {
        particle.update();
        particle.draw();

        // Connect particles
        particles.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.strokeStyle = `rgba(167, 139, 250, ${0.2 * (1 - distance / 100)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [particlesVisible]);

  const sections = [
    { id: 'about', label: 'About', icon: <Sparkles size={20} /> },
    { id: 'education', label: 'Education', icon: <BookOpen size={20} /> },
    { id: 'activities', label: 'Activities', icon: <Briefcase size={20} /> },
    { id: 'skills', label: 'Skills', icon: <Code size={20} /> },
    { id: 'achievements', label: 'Research', icon: <Award size={20} /> },
    { id: 'contact', label: 'Contact', icon: <Mail size={20} /> }
  ];

  const skills = [
    {
      title: 'Programming',
      icon: <Code size={36} />,
      items: ['Python', 'C', 'Java', 'JavaScript'],
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Machine Learning',
      icon: <Brain size={36} />,
      items: ['CatBoost', 'XGBoost', 'Bayesian Optimization', 'SHAP Analysis'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Data Science',
      icon: <Database size={36} />,
      items: ['Pandas', 'NumPy', 'Matplotlib', 'Seaborn'],
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Visualization',
      icon: <TrendingUp size={36} />,
      items: ['Bar Charts', 'Heatmaps', 'Distribution Plots', 'Data Cleaning'],
      color: 'from-orange-500 to-red-500'
    }
  ];

  const activities = [
    { text: 'Prepare comprehensive research presentations with clear visualizations', icon: <TrendingUp /> },
    { text: 'Write professional scripts and introductions for academic presentations', icon: <BookOpen /> },
    { text: 'Develop data analysis reports with figures and plots in Python', icon: <Code /> },
    { text: 'Work on ML research projects involving CatBoost and XGBoost', icon: <Brain /> },
    { text: 'Implement SHAP for model interpretability analysis', icon: <Award /> },
    { text: 'Create project posters with thoughtful design themes', icon: <Sparkles /> },
    { text: 'Collaborate with faculty on research documentation', icon: <Briefcase /> }
  ];

  const achievements = [
    { title: 'Research Projects', items: ['ML Model Development', 'Data Analysis & Visualization', 'Academic Presentations'] },
    { title: 'Technical Skills', items: ['Advanced Python Programming', 'Machine Learning Algorithms', 'Statistical Analysis'] },
    { title: 'Collaboration', items: ['Faculty Research Support', 'Team Projects', 'Knowledge Sharing'] }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Particle Canvas */}
      <canvas 
        ref={canvasRef} 
        className="fixed inset-0 pointer-events-none z-0"
        style={{ opacity: 0.6 }}
      />

      {/* Animated gradient orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-[500px] h-[500px] bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"
          style={{ 
            top: '10%', 
            left: '10%',
            transform: `translate(${mousePosition.x * 2}px, ${mousePosition.y * 2}px)`,
            animation: 'blob 7s infinite'
          }}
        />
        <div 
          className="absolute w-[500px] h-[500px] bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"
          style={{ 
            top: '50%', 
            right: '10%',
            transform: `translate(${-mousePosition.x * 2}px, ${mousePosition.y * 2}px)`,
            animationDelay: '2s'
          }}
        />
        <div 
          className="absolute w-[500px] h-[500px] bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"
          style={{ 
            bottom: '10%', 
            left: '50%',
            transform: `translate(${mousePosition.x * 2}px, ${-mousePosition.y * 2}px)`,
            animationDelay: '4s'
          }}
        />
      </div>

      {/* Floating Navigation */}
      <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 px-4">
        <div className="backdrop-blur-2xl bg-white/5 rounded-full border border-white/10 shadow-2xl px-4 py-3 animate-slide-down">
          <div className="flex gap-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-500 transform ${
                  activeSection === section.id
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-110'
                    : 'text-white/70 hover:text-white hover:bg-white/10 hover:scale-105'
                }`}
              >
                {section.icon}
                <span className="font-medium hidden md:inline">{section.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-24 relative z-10">
        {/* Hero Section with 3D effect */}
        <div className="text-center mb-20 animate-fade-in-up">
          <div 
            className="inline-block backdrop-blur-2xl bg-gradient-to-br from-white/10 to-white/5 rounded-[2rem] border border-white/20 shadow-2xl px-16 py-20 mb-8 relative overflow-hidden group"
            style={{
              transform: `perspective(1500px) rotateX(${mousePosition.y * 0.5}deg) rotateY(${mousePosition.x * 0.5}deg)`,
              transition: 'transform 0.1s ease-out'
            }}
          >
            {/* Animated border gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />
            
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
            
            <h1 className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 mb-4 tracking-tight animate-gradient">
              Fatehin Alam
            </h1>
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <p className="text-2xl text-purple-200 font-light">
                Computer Science Student
              </p>
            </div>
            <div className="flex items-center justify-center gap-6 text-lg text-purple-300">
              <span className="flex items-center gap-2">
                <Brain size={20} className="animate-pulse" />
                ML Researcher
              </span>
              <span className="flex items-center gap-2">
                <Database size={20} className="animate-pulse" />
                Data Enthusiast
              </span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            {[
              { icon: <Github />, label: 'GitHub' },
              { icon: <Linkedin />, label: 'LinkedIn' },
              { icon: <Twitter />, label: 'Twitter' }
            ].map((social, i) => (
              <button
                key={i}
                className="backdrop-blur-xl bg-white/10 hover:bg-white/20 rounded-full p-4 border border-white/20 shadow-lg transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 group"
              >
                <div className="text-purple-300 group-hover:text-white transition-colors">
                  {social.icon}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* About Section */}
        {activeSection === 'about' && (
          <div className="max-w-4xl mx-auto animate-fade-in-up">
            <div className="backdrop-blur-2xl bg-gradient-to-br from-white/10 to-white/5 rounded-3xl border border-white/20 shadow-2xl p-10 hover:shadow-purple-500/30 transition-all duration-500 transform hover:scale-[1.02] relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-8 flex items-center gap-4">
                <Sparkles className="text-purple-400 animate-pulse" />
                About Me
              </h2>
              <p className="text-xl text-purple-100 leading-relaxed relative z-10">
                Assalamualaikum! I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-semibold">Fatehin Alam</span>, a passionate Computer Science student with a strong interest in Machine Learning and Data Science. I focus on creating meaningful research presentations, developing data-driven solutions, and continuously expanding my technical expertise. My work involves advanced ML techniques, comprehensive data analysis, and clear communication of complex technical concepts.
              </p>
              
              <div className="grid grid-cols-3 gap-4 mt-8">
                {['Innovation', 'Precision', 'Excellence'].map((value, i) => (
                  <div key={i} className="backdrop-blur-xl bg-white/5 rounded-2xl p-4 text-center border border-white/10 hover:border-purple-500/50 transition-all duration-300 transform hover:scale-105">
                    <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                      {value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Education Section */}
        {activeSection === 'education' && (
          <div className="max-w-4xl mx-auto animate-fade-in-up">
            <div className="backdrop-blur-2xl bg-gradient-to-br from-white/10 to-white/5 rounded-3xl border border-white/20 shadow-2xl p-10 hover:shadow-blue-500/30 transition-all duration-500 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
              
              <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-8 flex items-center gap-4">
                <BookOpen className="text-blue-400 animate-bounce" />
                Education
              </h2>
              <div className="backdrop-blur-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl border border-white/10 p-8 relative z-10 transform hover:scale-[1.02] transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0 animate-pulse">
                    <BookOpen size={32} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-2">
                      Bachelor's Degree in Computer Science
                    </h3>
                    <p className="text-blue-200 text-xl mb-3 flex items-center gap-2">
                      <MapPin size={18} />
                      Currently Pursuing | Bangladesh
                    </p>
                    <p className="text-purple-100 text-lg">
                      Focused on Machine Learning, Data Science, and Software Development with emphasis on practical research applications and advanced analytical techniques.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Activities Section */}
        {activeSection === 'activities' && (
          <div className="max-w-5xl mx-auto animate-fade-in-up">
            <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 mb-10 text-center flex items-center justify-center gap-4">
              <Briefcase className="text-pink-400 animate-pulse" />
              Academic & Research Activities
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activities.map((activity, index) => (
                <div 
                  key={index}
                  className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/10 p-6 hover:border-purple-500/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 group cursor-pointer"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      {React.cloneElement(activity.icon, { size: 24, className: 'text-white' })}
                    </div>
                    <p className="text-purple-100 text-lg leading-relaxed">{activity.text}</p>
                  </div>
                  <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-4 transition-all duration-500" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills Section */}
        {activeSection === 'skills' && (
          <div className="max-w-6xl mx-auto animate-fade-in-up">
            <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-12 text-center flex items-center justify-center gap-4">
              <Code className="text-purple-400 animate-spin-slow" />
              Technical Skills
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="backdrop-blur-2xl bg-gradient-to-br from-white/10 to-white/5 rounded-3xl border border-white/20 shadow-2xl p-8 hover:shadow-purple-500/50 transition-all duration-500 transform hover:scale-110 hover:-translate-y-4 group relative overflow-hidden"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                  
                  <div className="relative z-10">
                    <div className="text-purple-300 mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:rotate-12">
                      {skill.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-6 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
                      {skill.title}
                    </h3>
                    <ul className="space-y-3">
                      {skill.items.map((item, i) => (
                        <li key={i} className="text-purple-100 flex items-center gap-3 group-hover:translate-x-2 transition-transform duration-300" style={{ transitionDelay: `${i * 50}ms` }}>
                          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 group-hover:scale-150 transition-transform duration-300" />
                          <span className="group-hover:text-white transition-colors duration-300">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Achievements/Research Section */}
        {activeSection === 'achievements' && (
          <div className="max-w-5xl mx-auto animate-fade-in-up">
            <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400 mb-12 text-center flex items-center justify-center gap-4">
              <Award className="text-yellow-400 animate-bounce" />
              Research & Achievements
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="backdrop-blur-2xl bg-gradient-to-br from-white/10 to-white/5 rounded-3xl border border-white/20 shadow-2xl p-8 hover:shadow-yellow-500/30 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300">
                    <Award size={32} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{achievement.title}</h3>
                  <ul className="space-y-2">
                    {achievement.items.map((item, i) => (
                      <li key={i} className="text-purple-100 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contact Section */}
        {activeSection === 'contact' && (
          <div className="max-w-4xl mx-auto animate-fade-in-up">
            <div className="backdrop-blur-2xl bg-gradient-to-br from-white/10 to-white/5 rounded-3xl border border-white/20 shadow-2xl p-10 hover:shadow-blue-500/30 transition-all duration-500 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-8 flex items-center gap-4 relative z-10">
                <Mail className="text-blue-400 animate-pulse" />
                Get In Touch
              </h2>
              <div className="backdrop-blur-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl border border-white/20 p-10 text-center relative z-10">
                <div className="space-y-6">
                  <div className="flex items-center justify-center gap-4 text-2xl text-white">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center animate-pulse">
                      <Mail size={24} />
                    </div>
                    <span className="font-semibold">Fatehin Alam</span>
                  </div>
                  <div className="flex items-center justify-center gap-4 text-xl text-purple-200">
                    <MapPin className="text-blue-400" size={24} />
                    <span>Bangladesh</span>
                  </div>
                  <div className="text-purple-100 text-lg mt-6 font-medium">
                    Computer Science & Machine Learning Specialist
                  </div>
                  <p className="text-purple-200 italic mt-6 text-lg">
                    Open to research collaborations and project opportunities
                  </p>
                  
                  <div className="flex justify-center gap-4 mt-8">
                    {['Email Me', 'Download CV', 'Schedule Call'].map((action, i) => (
                      <button
                        key={i}
                        className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-purple-500/50"
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { 
            transform: translate(0, 0) scale(1) rotate(0deg); 
          }
          25% { 
            transform: translate(30px, -50px) scale(1.1) rotate(90deg); 
          }
          50% { 
            transform: translate(-20px, 30px) scale(0.9) rotate(180deg); 
          }
          75% { 
            transform: translate(50px, 50px) scale(1.05) rotate(270deg); 
          }
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translate(-50%, -20px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .animate-blob {
          animation: blob 10s infinite ease-in-out;
        }

        .animate-shimmer {
          animation: shimmer 3s infinite;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .animate-slide-down {
          animation: slide-down 0.8s ease-out;
        }

        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
}
