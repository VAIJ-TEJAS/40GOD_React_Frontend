/**
 * Analytics and Performance Monitoring Helpers
 * Provides comprehensive analytics tracking, performance monitoring, and user behavior analysis
 */

export interface AnalyticsEvent {
  eventName: string;
  category: string;
  action: string;
  label?: string;
  value?: number;
  timestamp: number;
  userId?: string;
  sessionId: string;
  properties?: Record<string, any>;
}

export interface PerformanceMetric {
  name: string;
  value: number;
  unit: string;
  timestamp: number;
  url: string;
  userAgent: string;
}

export interface UserSession {
  sessionId: string;
  startTime: number;
  endTime?: number;
  pageViews: number;
  events: AnalyticsEvent[];
  referrer?: string;
  deviceType: string;
  browser: string;
  os: string;
}

export interface PageView {
  path: string;
  title: string;
  timestamp: number;
  duration?: number;
  referrer?: string;
}

/**
 * Generate unique session ID
 */
export const generateSessionId = (): string => {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Get or create session ID from storage
 */
export const getOrCreateSessionId = (): string => {
  const stored = sessionStorage.getItem('analytics_session_id');
  if (stored) {
    return stored;
  }
  const newSessionId = generateSessionId();
  sessionStorage.setItem('analytics_session_id', newSessionId);
  return newSessionId;
};

/**
 * Track page view
 */
export const trackPageView = (
  path: string,
  title: string,
  referrer?: string
): PageView => {
  const pageView: PageView = {
    path,
    title,
    timestamp: Date.now(),
    referrer: referrer || document.referrer,
  };

  // Store in session storage
  const pageViews = getStoredPageViews();
  pageViews.push(pageView);
  if (pageViews.length > 50) {
    pageViews.shift(); // Keep only last 50 page views
  }
  sessionStorage.setItem('analytics_page_views', JSON.stringify(pageViews));

  return pageView;
};

/**
 * Get stored page views
 */
export const getStoredPageViews = (): PageView[] => {
  try {
    const stored = sessionStorage.getItem('analytics_page_views');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

/**
 * Track custom event
 */
export const trackEvent = (
  eventName: string,
  category: string,
  action: string,
  options?: {
    label?: string;
    value?: number;
    properties?: Record<string, any>;
  }
): AnalyticsEvent => {
  const sessionId = getOrCreateSessionId();
  const userId = localStorage.getItem('user_id') || undefined;

  const event: AnalyticsEvent = {
    eventName,
    category,
    action,
    label: options?.label,
    value: options?.value,
    timestamp: Date.now(),
    userId,
    sessionId,
    properties: options?.properties,
  };

  // Store event
  const events = getStoredEvents();
  events.push(event);
  if (events.length > 100) {
    events.shift(); // Keep only last 100 events
  }
  sessionStorage.setItem('analytics_events', JSON.stringify(events));

  return event;
};

/**
 * Get stored events
 */
export const getStoredEvents = (): AnalyticsEvent[] => {
  try {
    const stored = sessionStorage.getItem('analytics_events');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

/**
 * Track performance metric
 */
export const trackPerformanceMetric = (
  name: string,
  value: number,
  unit: string = 'ms'
): PerformanceMetric => {
  const metric: PerformanceMetric = {
    name,
    value,
    unit,
    timestamp: Date.now(),
    url: window.location.href,
    userAgent: navigator.userAgent,
  };

  // Store metric
  const metrics = getStoredPerformanceMetrics();
  metrics.push(metric);
  if (metrics.length > 200) {
    metrics.shift(); // Keep only last 200 metrics
  }
  sessionStorage.setItem('analytics_performance', JSON.stringify(metrics));

  return metric;
};

/**
 * Get stored performance metrics
 */
export const getStoredPerformanceMetrics = (): PerformanceMetric[] => {
  try {
    const stored = sessionStorage.getItem('analytics_performance');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

/**
 * Measure function execution time
 */
export const measureExecutionTime = async <T>(
  fn: () => T | Promise<T>,
  metricName: string
): Promise<T> => {
  const startTime = performance.now();
  try {
    const result = await fn();
    const endTime = performance.now();
    const duration = endTime - startTime;
    trackPerformanceMetric(metricName, duration, 'ms');
    return result;
  } catch (error) {
    const endTime = performance.now();
    const duration = endTime - startTime;
    trackPerformanceMetric(`${metricName}_error`, duration, 'ms');
    throw error;
  }
};

/**
 * Get device type from user agent
 */
export const getDeviceType = (): string => {
  const ua = navigator.userAgent.toLowerCase();
  if (/tablet|ipad|playbook|silk/i.test(ua)) {
    return 'tablet';
  }
  if (/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(ua)) {
    return 'mobile';
  }
  return 'desktop';
};

/**
 * Get browser name from user agent
 */
export const getBrowser = (): string => {
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes('firefox')) return 'Firefox';
  if (ua.includes('chrome') && !ua.includes('edg')) return 'Chrome';
  if (ua.includes('safari') && !ua.includes('chrome')) return 'Safari';
  if (ua.includes('edg')) return 'Edge';
  if (ua.includes('opera') || ua.includes('opr')) return 'Opera';
  return 'Unknown';
};

/**
 * Get operating system from user agent
 */
export const getOperatingSystem = (): string => {
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes('windows')) return 'Windows';
  if (ua.includes('mac')) return 'macOS';
  if (ua.includes('linux')) return 'Linux';
  if (ua.includes('android')) return 'Android';
  if (ua.includes('ios') || ua.includes('iphone') || ua.includes('ipad')) return 'iOS';
  return 'Unknown';
};

/**
 * Create user session
 */
export const createUserSession = (referrer?: string): UserSession => {
  const sessionId = getOrCreateSessionId();
  return {
    sessionId,
    startTime: Date.now(),
    pageViews: 0,
    events: [],
    referrer: referrer || document.referrer,
    deviceType: getDeviceType(),
    browser: getBrowser(),
    os: getOperatingSystem(),
  };
};

/**
 * Get current session
 */
export const getCurrentSession = (): UserSession | null => {
  try {
    const stored = sessionStorage.getItem('analytics_session');
    if (stored) {
      return JSON.parse(stored);
    }
    return null;
  } catch {
    return null;
  }
};

/**
 * Update session
 */
export const updateSession = (updates: Partial<UserSession>): UserSession | null => {
  const current = getCurrentSession();
  if (!current) return null;

  const updated: UserSession = {
    ...current,
    ...updates,
  };

  sessionStorage.setItem('analytics_session', JSON.stringify(updated));
  return updated;
};

/**
 * End session
 */
export const endSession = (): UserSession | null => {
  const current = getCurrentSession();
  if (!current) return null;

  const ended: UserSession = {
    ...current,
    endTime: Date.now(),
  };

  // Store in localStorage for historical data
  const historicalSessions = getHistoricalSessions();
  historicalSessions.push(ended);
  if (historicalSessions.length > 100) {
    historicalSessions.shift();
  }
  localStorage.setItem('analytics_historical_sessions', JSON.stringify(historicalSessions));

  sessionStorage.removeItem('analytics_session');
  return ended;
};

/**
 * Get historical sessions
 */
export const getHistoricalSessions = (): UserSession[] => {
  try {
    const stored = localStorage.getItem('analytics_historical_sessions');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

/**
 * Calculate session duration
 */
export const calculateSessionDuration = (session: UserSession): number | null => {
  if (!session.endTime) return null;
  return session.endTime - session.startTime;
};

/**
 * Get average session duration
 */
export const getAverageSessionDuration = (): number => {
  const sessions = getHistoricalSessions();
  if (sessions.length === 0) return 0;

  const durations = sessions
    .map(calculateSessionDuration)
    .filter((d): d is number => d !== null);

  if (durations.length === 0) return 0;

  const sum = durations.reduce((acc, d) => acc + d, 0);
  return sum / durations.length;
};

/**
 * Get events by category
 */
export const getEventsByCategory = (category: string): AnalyticsEvent[] => {
  const events = getStoredEvents();
  return events.filter((e) => e.category === category);
};

/**
 * Get events by action
 */
export const getEventsByAction = (action: string): AnalyticsEvent[] => {
  const events = getStoredEvents();
  return events.filter((e) => e.action === action);
};

/**
 * Get event count by category
 */
export const getEventCountByCategory = (): Record<string, number> => {
  const events = getStoredEvents();
  return events.reduce((acc, event) => {
    acc[event.category] = (acc[event.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
};

/**
 * Get total event value by category
 */
export const getTotalEventValueByCategory = (): Record<string, number> => {
  const events = getStoredEvents();
  return events.reduce((acc, event) => {
    if (event.value !== undefined) {
      acc[event.category] = (acc[event.category] || 0) + event.value;
    }
    return acc;
  }, {} as Record<string, number>);
};

/**
 * Get page view statistics
 */
export const getPageViewStatistics = (): {
  totalViews: number;
  uniquePages: number;
  averageViewsPerPage: number;
  mostViewedPage: string | null;
} => {
  const pageViews = getStoredPageViews();
  const uniquePages = new Set(pageViews.map((pv) => pv.path));
  const pageCounts = pageViews.reduce((acc, pv) => {
    acc[pv.path] = (acc[pv.path] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const mostViewedPage = Object.keys(pageCounts).reduce((a, b) =>
    pageCounts[a] > pageCounts[b] ? a : b,
    Object.keys(pageCounts)[0] || ''
  );

  return {
    totalViews: pageViews.length,
    uniquePages: uniquePages.size,
    averageViewsPerPage: uniquePages.size > 0 ? pageViews.length / uniquePages.size : 0,
    mostViewedPage: mostViewedPage || null,
  };
};

/**
 * Get performance statistics
 */
export const getPerformanceStatistics = (): {
  averageLoadTime: number;
  minLoadTime: number;
  maxLoadTime: number;
  p95LoadTime: number;
  p99LoadTime: number;
} => {
  const metrics = getStoredPerformanceMetrics();
  const loadTimes = metrics
    .filter((m) => m.name.includes('load') || m.name.includes('render'))
    .map((m) => m.value)
    .sort((a, b) => a - b);

  if (loadTimes.length === 0) {
    return {
      averageLoadTime: 0,
      minLoadTime: 0,
      maxLoadTime: 0,
      p95LoadTime: 0,
      p99LoadTime: 0,
    };
  }

  const sum = loadTimes.reduce((acc, val) => acc + val, 0);
  const avg = sum / loadTimes.length;
  const p95Index = Math.floor(loadTimes.length * 0.95);
  const p99Index = Math.floor(loadTimes.length * 0.99);

  return {
    averageLoadTime: avg,
    minLoadTime: loadTimes[0],
    maxLoadTime: loadTimes[loadTimes.length - 1],
    p95LoadTime: loadTimes[p95Index] || 0,
    p99LoadTime: loadTimes[p99Index] || 0,
  };
};

/**
 * Track conversion
 */
export const trackConversion = (
  conversionType: string,
  value?: number,
  properties?: Record<string, any>
): AnalyticsEvent => {
  return trackEvent(
    'conversion',
    'conversion',
    conversionType,
    {
      value,
      properties: {
        ...properties,
        conversionType,
      },
    }
  );
};

/**
 * Track error
 */
export const trackError = (
  errorMessage: string,
  errorStack?: string,
  errorContext?: Record<string, any>
): AnalyticsEvent => {
  return trackEvent(
    'error',
    'error',
    'error_occurred',
    {
      label: errorMessage,
      properties: {
        errorMessage,
        errorStack,
        ...errorContext,
      },
    }
  );
};

/**
 * Track user engagement
 */
export const trackEngagement = (
  engagementType: string,
  duration: number,
  properties?: Record<string, any>
): AnalyticsEvent => {
  return trackEvent(
    'engagement',
    'user_engagement',
    engagementType,
    {
      value: duration,
      properties,
    }
  );
};

/**
 * Clear all analytics data
 */
export const clearAnalyticsData = (): void => {
  sessionStorage.removeItem('analytics_session_id');
  sessionStorage.removeItem('analytics_page_views');
  sessionStorage.removeItem('analytics_events');
  sessionStorage.removeItem('analytics_performance');
  sessionStorage.removeItem('analytics_session');
  localStorage.removeItem('analytics_historical_sessions');
};

/**
 * Export analytics data as JSON
 */
export const exportAnalyticsData = (): string => {
  const data = {
    session: getCurrentSession(),
    pageViews: getStoredPageViews(),
    events: getStoredEvents(),
    performanceMetrics: getStoredPerformanceMetrics(),
    historicalSessions: getHistoricalSessions(),
    statistics: {
      pageViews: getPageViewStatistics(),
      performance: getPerformanceStatistics(),
      events: {
        byCategory: getEventCountByCategory(),
        totalValueByCategory: getTotalEventValueByCategory(),
      },
    },
  };

  return JSON.stringify(data, null, 2);
};

/**
 * Track scroll depth
 */
export const trackScrollDepth = (): void => {
  let maxScroll = 0;
  const thresholds = [25, 50, 75, 90, 100];
  const tracked = new Set<number>();

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = Math.round((scrollTop / scrollHeight) * 100);

    if (scrollPercent > maxScroll) {
      maxScroll = scrollPercent;

      thresholds.forEach((threshold) => {
        if (scrollPercent >= threshold && !tracked.has(threshold)) {
          tracked.add(threshold);
          trackEvent('scroll', 'engagement', 'scroll_depth', {
            label: `${threshold}%`,
            value: threshold,
          });
        }
      });
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
};

/**
 * Track time on page
 */
export const trackTimeOnPage = (): (() => void) => {
  const startTime = Date.now();
  const pagePath = window.location.pathname;

  return () => {
    const duration = Date.now() - startTime;
    trackEngagement('time_on_page', duration, {
      page: pagePath,
    });
  };
};

/**
 * Get user behavior insights
 */
export const getUserBehaviorInsights = (): {
  totalSessions: number;
  averageSessionDuration: number;
  totalPageViews: number;
  totalEvents: number;
  topCategories: Array<{ category: string; count: number }>;
  deviceBreakdown: Record<string, number>;
} => {
  const sessions = getHistoricalSessions();
  const pageViews = getStoredPageViews();
  const events = getStoredEvents();
  const eventCounts = getEventCountByCategory();

  const deviceBreakdown = sessions.reduce((acc, session) => {
    acc[session.deviceType] = (acc[session.deviceType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topCategories = Object.entries(eventCounts)
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return {
    totalSessions: sessions.length,
    averageSessionDuration: getAverageSessionDuration(),
    totalPageViews: pageViews.length,
    totalEvents: events.length,
    topCategories,
    deviceBreakdown,
  };
};

