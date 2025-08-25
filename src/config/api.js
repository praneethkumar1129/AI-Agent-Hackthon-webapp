// API Configuration for Internal Docs Q&A Agent

export const API_CONFIG = {
  // Replace with your actual API Gateway endpoint after deployment
  baseURL: 'https://your-api-id.execute-api.us-east-1.amazonaws.com/prod',
  endpoints: {
    query: '/query'
  },
  timeout: 30000 // 30 seconds timeout for AI responses
};

// API service functions
export const apiService = {
  async sendQuery(query, sessionId = null) {
    try {
      const response = await fetch(`${API_CONFIG.baseURL}${API_CONFIG.endpoints.query}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: query,
          sessionId: sessionId || `session-${Date.now()}`
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }
};

// Mock API service for development/demo
export const mockApiService = {
  async sendQuery(query) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('leave') || lowerQuery.includes('vacation')) {
      return {
        response: "Based on our HR policies:\n\n• Annual Paid Leave: 18 days\n• Sick Leave: 12 days (no carry forward)\n• Casual Leave: 7 days (approval required)\n• Maternity Leave: 26 weeks\n• Paternity Leave: 10 days\n\nWould you like more details about any specific leave type?",
        sessionId: `session-${Date.now()}`,
        timestamp: new Date().toISOString()
      };
    }
    
    if (lowerQuery.includes('working hours') || lowerQuery.includes('attendance')) {
      return {
        response: "Our attendance policy includes:\n\n• Working hours: 9:30 AM – 6:30 PM\n• Lunch break: 1 hour\n• Tea breaks: 2 breaks of 15 minutes each\n• Grace time: 15 minutes allowed (max 3 times/month)\n• Half-day marked if late > 2 hours",
        sessionId: `session-${Date.now()}`,
        timestamp: new Date().toISOString()
      };
    }
    
    if (lowerQuery.includes('brand') || lowerQuery.includes('logo') || lowerQuery.includes('colors')) {
      return {
        response: "Our brand guidelines specify:\n\n• Logo: Only official PNG/SVG formats allowed\n• Primary colors: #0052cc (Blue), #36B37E (Green)\n• Fonts: Montserrat for headings, Roboto for body text\n• Important: Do not alter brand assets\n\nNeed help with specific brand materials?",
        sessionId: `session-${Date.now()}`,
        timestamp: new Date().toISOString()
      };
    }
    
    if (lowerQuery.includes('password') || lowerQuery.includes('security') || lowerQuery.includes('2fa')) {
      return {
        response: "IT Security requirements:\n\n• Strong passwords (minimum 12 characters)\n• Two-Factor Authentication (2FA) required for critical systems\n• Company-approved antivirus and firewall mandatory\n• Data encryption required for laptops and mobile devices\n\nNeed help setting up 2FA?",
        sessionId: `session-${Date.now()}`,
        timestamp: new Date().toISOString()
      };
    }
    
    if (lowerQuery.includes('remote') || lowerQuery.includes('vpn') || lowerQuery.includes('work from home')) {
      return {
        response: "Remote access policy:\n\n• Access only via secure VPN\n• Avoid public Wi-Fi unless VPN is active\n• Log off after work hours\n• Access logs monitored by IT security\n\nContact IT for VPN setup assistance.",
        sessionId: `session-${Date.now()}`,
        timestamp: new Date().toISOString()
      };
    }
    
    return {
      response: "I'm sorry, I couldn't find specific information about your query in our current knowledge base. Please contact:\n\n📞 Company Helpline: 8500\n📧 Email: company.ac.in.com\n\nOur support team will be happy to assist you further!",
      sessionId: `session-${Date.now()}`,
      timestamp: new Date().toISOString()
    };
  }
};

// Use mock service for demo (since AWS backend is not deployed yet)
export const currentApiService = mockApiService;