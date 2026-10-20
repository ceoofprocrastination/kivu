// Vercel Web Analytics initialization
// This file initializes Vercel Web Analytics for the Kivu journal app

(function() {
  'use strict';
  
  // Initialize Vercel Analytics using the inline script method
  window.va = window.va || function () { 
    (window.vaq = window.vaq || []).push(arguments); 
  };
  
  // Load the analytics script
  var script = document.createElement('script');
  script.defer = true;
  script.src = '/_vercel/insights/script.js';
  document.head.appendChild(script);
})();
