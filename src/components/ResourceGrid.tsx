import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BookOpen, Briefcase, Laptop, ShoppingBag, Lightbulb, MapPin, ExternalLink, Tag } from 'lucide-react';
import { ResourceCategory } from '../types';

const INITIAL_RESOURCES = [
  {
    title: 'Sultan Qaboos University Portal',
    desc: 'Access information about programs, admissions, and student life at Oman’s premier university.',
    category: 'education',
    location: 'Muscat',
    link: 'https://www.squ.edu.om',
    tags: ['University', 'Undergrad', 'Research']
  },
  {
    title: 'IT Project Management Masterclass',
    desc: 'Specialized training for IT leaders in the Gulf region focusing on agile and waterfall methodologies.',
    category: 'it_skills',
    location: 'Remote / Muscat',
    link: '#',
    tags: ['IT', 'Management', 'Certification']
  },
  {
    title: 'Senior Software Engineer - FinTech',
    desc: 'Leading financial institution in Muscat is looking for experienced React & Node.js developers.',
    category: 'jobs',
    location: 'Muscat',
    link: '#',
    tags: ['Engineering', 'Software', 'Full-time']
  },
  {
    title: 'Oman Cloud Solutions',
    desc: 'Enterprise-grade cloud hosting and digital transformation services for local businesses.',
    category: 'solutions',
    location: 'Sohar',
    link: '#',
    tags: ['Cloud', 'Business', 'Infrastructure']
  },
  {
    title: 'EdTech Platform License',
    desc: 'Comprehensive learning management system for schools and private tutoring centers in Oman.',
    category: 'products',
    location: 'Oman-wide',
    link: '#',
    tags: ['Product', 'Learning', 'SAAS']
  }
];

export const ResourceGrid = () => {
  const [activeTab, setActiveTab] = useState<ResourceCategory | 'all'>('all');

  const filteredResources = activeTab === 'all' 
    ? INITIAL_RESOURCES 
    : INITIAL_RESOURCES.filter(r => r.category === activeTab);

  const tabs: { id: ResourceCategory | 'all'; label: string; icon: any }[] = [
    { id: 'all', label: 'All Resources', icon: Lightbulb },
    { id: 'education', label: 'Education', icon: BookOpen },
    { id: 'it_skills', label: 'IT Skills', icon: Laptop },
    { id: 'jobs', label: 'Jobs', icon: Briefcase },
    { id: 'products', label: 'Products', icon: ShoppingBag },
  ];

  return (
    <section id="resources" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
          <div className="max-w-xl text-left">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Functional Hub</h2>
            <p className="text-gray-600">Discover essential resources, skills, and opportunities curated for Oman's professional and educational growth.</p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                  activeTab === tab.id 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' 
                    : 'bg-white text-gray-600 border border-gray-100 hover:border-blue-200 hover:text-blue-600'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredResources.map((resource, i) => (
            <motion.div
              layout
              key={resource.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all group"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="px-3 py-1 bg-gray-50 rounded-lg text-[10px] font-bold uppercase tracking-widest text-gray-400 border border-gray-100">
                  {resource.category.replace('_', ' ')}
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-gray-400">
                  <MapPin className="w-3 h-3 text-blue-400" />
                  {resource.location}
                </div>
              </div>

              <h3 className="text-xl font-extrabold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors leading-tight">
                {resource.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                {resource.desc}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {resource.tags.map(tag => (
                  <span key={tag} className="flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-full">
                    <Tag className="w-2.5 h-2.5" />
                    {tag}
                  </span>
                ))}
              </div>

              <a
                href={resource.link}
                target={resource.link === '#' ? '_self' : '_blank'}
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 group/link"
              >
                Learn More
                <ExternalLink className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
