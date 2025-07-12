import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-16 fade-in">
        <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-yellow-200 to-pink-200 bg-clip-text text-transparent">
          Swap Skills, Grow Together
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
          Connect with people who have the skills you want to learn, and share your expertise in return. 
          Build meaningful relationships while expanding your knowledge.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/browse" 
            className="btn-primary text-lg px-8 py-4 text-center"
          >
            Start Browsing Skills
          </Link>
          <Link 
            to="/signup" 
            className="btn-secondary text-lg px-8 py-4 text-center"
          >
            Join Our Community
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="glass card-hover p-8 rounded-2xl text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">Connect with Experts</h3>
          <p className="text-white/80 leading-relaxed">
            Find people who excel in the skills you want to learn. From programming to cooking, 
            there's always someone ready to share their knowledge.
          </p>
        </div>

        <div className="glass card-hover p-8 rounded-2xl text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">Learn & Teach</h3>
          <p className="text-white/80 leading-relaxed">
            Share your expertise while learning new skills. It's a win-win exchange that benefits 
            everyone involved in the community.
          </p>
        </div>

        <div className="glass card-hover p-8 rounded-2xl text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">Build Relationships</h3>
          <p className="text-white/80 leading-relaxed">
            Form meaningful connections with people who share your interests. 
            Learning together creates lasting friendships and professional networks.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="glass rounded-2xl p-8 mb-16">
        <h2 className="text-3xl font-bold text-white text-center mb-8">Our Community in Numbers</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-yellow-300 mb-2">500+</div>
            <div className="text-white/80">Active Users</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-300 mb-2">1000+</div>
            <div className="text-white/80">Skills Shared</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-300 mb-2">250+</div>
            <div className="text-white/80">Successful Swaps</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-pink-300 mb-2">4.8★</div>
            <div className="text-white/80">Average Rating</div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center glass rounded-2xl p-12">
        <h2 className="text-4xl font-bold text-white mb-6">Ready to Start Your Learning Journey?</h2>
        <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
          Join thousands of learners who are already swapping skills and growing together. 
          Your next skill partner is waiting for you!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/signup" 
            className="btn-primary text-lg px-8 py-4"
          >
            Get Started Today
          </Link>
          <Link 
            to="/browse" 
            className="btn-secondary text-lg px-8 py-4"
          >
            Explore Skills
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
