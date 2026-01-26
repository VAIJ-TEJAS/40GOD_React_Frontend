import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import {
  generateSessionId,
  getOrCreateSessionId,
  trackPageView,
  getStoredPageViews,
  trackEvent,
  getStoredEvents,
  trackPerformanceMetric,
  getStoredPerformanceMetrics,
  measureExecutionTime,
  getDeviceType,
  getBrowser,
  getOperatingSystem,
  createUserSession,
  getCurrentSession,
  updateSession,
  endSession,
  getHistoricalSessions,
  calculateSessionDuration,
  getAverageSessionDuration,
  getEventsByCategory,
  getEventsByAction,
  getEventCountByCategory,
  getTotalEventValueByCategory,
  getPageViewStatistics,
  getPerformanceStatistics,
  trackConversion,
  trackError,
  trackEngagement,
  clearAnalyticsData,
  exportAnalyticsData,
  getUserBehaviorInsights,
} from '../analyticsHelpers';

// Mock sessionStorage and localStorage
const mockSessionStorage = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

const mockLocalStorage = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

// Mock window objects
Object.defineProperty(window, 'sessionStorage', {
  value: mockSessionStorage,
  writable: true,
});

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
  writable: true,
});

Object.defineProperty(window, 'location', {
  value: { href: 'http://localhost:3000/test', pathname: '/test' },
  writable: true,
});

Object.defineProperty(document, 'referrer', {
  value: 'http://localhost:3000/previous',
  writable: true,
});

Object.defineProperty(navigator, 'userAgent', {
  value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
  writable: true,
});

Object.defineProperty(window, 'performance', {
  value: {
    now: () => Date.now(),
  },
  writable: true,
});

describe('analyticsHelpers', () => {
  beforeEach(() => {
    mockSessionStorage.clear();
    mockLocalStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    mockSessionStorage.clear();
    mockLocalStorage.clear();
  });

  describe('generateSessionId', () => {
    it('should generate unique session IDs', () => {
      const id1 = generateSessionId();
      const id2 = generateSessionId();
      expect(id1).toBeDefined();
      expect(id2).toBeDefined();
      expect(id1).not.toBe(id2);
      expect(id1).toMatch(/^session_\d+_[a-z0-9]+$/);
    });
  });

  describe('getOrCreateSessionId', () => {
    it('should create new session ID if none exists', () => {
      const id = getOrCreateSessionId();
      expect(id).toBeDefined();
      expect(mockSessionStorage.getItem('analytics_session_id')).toBe(id);
    });

    it('should return existing session ID if present', () => {
      const existingId = 'session_123_abc';
      mockSessionStorage.setItem('analytics_session_id', existingId);
      const id = getOrCreateSessionId();
      expect(id).toBe(existingId);
    });
  });

  describe('trackPageView', () => {
    it('should track page view correctly', () => {
      const pageView = trackPageView('/test', 'Test Page');
      expect(pageView.path).toBe('/test');
      expect(pageView.title).toBe('Test Page');
      expect(pageView.timestamp).toBeDefined();
    });

    it('should store page views in session storage', () => {
      trackPageView('/page1', 'Page 1');
      trackPageView('/page2', 'Page 2');
      const stored = getStoredPageViews();
      expect(stored).toHaveLength(2);
      expect(stored[0].path).toBe('/page1');
      expect(stored[1].path).toBe('/page2');
    });

    it('should limit stored page views to 50', () => {
      for (let i = 0; i < 55; i++) {
        trackPageView(`/page${i}`, `Page ${i}`);
      }
      const stored = getStoredPageViews();
      expect(stored.length).toBeLessThanOrEqual(50);
    });
  });

  describe('trackEvent', () => {
    it('should track event correctly', () => {
      const event = trackEvent('test_event', 'test_category', 'test_action');
      expect(event.eventName).toBe('test_event');
      expect(event.category).toBe('test_category');
      expect(event.action).toBe('test_action');
      expect(event.timestamp).toBeDefined();
      expect(event.sessionId).toBeDefined();
    });

    it('should track event with optional parameters', () => {
      const event = trackEvent('test', 'cat', 'act', {
        label: 'test_label',
        value: 100,
        properties: { key: 'value' },
      });
      expect(event.label).toBe('test_label');
      expect(event.value).toBe(100);
      expect(event.properties).toEqual({ key: 'value' });
    });

    it('should store events in session storage', () => {
      trackEvent('e1', 'c1', 'a1');
      trackEvent('e2', 'c2', 'a2');
      const stored = getStoredEvents();
      expect(stored).toHaveLength(2);
    });

    it('should limit stored events to 100', () => {
      for (let i = 0; i < 105; i++) {
        trackEvent(`event${i}`, 'category', 'action');
      }
      const stored = getStoredEvents();
      expect(stored.length).toBeLessThanOrEqual(100);
    });
  });

  describe('trackPerformanceMetric', () => {
    it('should track performance metric', () => {
      const metric = trackPerformanceMetric('load_time', 150, 'ms');
      expect(metric.name).toBe('load_time');
      expect(metric.value).toBe(150);
      expect(metric.unit).toBe('ms');
    });

    it('should store performance metrics', () => {
      trackPerformanceMetric('metric1', 100);
      trackPerformanceMetric('metric2', 200);
      const stored = getStoredPerformanceMetrics();
      expect(stored).toHaveLength(2);
    });
  });

  describe('measureExecutionTime', () => {
    it('should measure synchronous function execution time', async () => {
      const fn = () => {
        return 'result';
      };
      const result = await measureExecutionTime(fn, 'test_function');
      expect(result).toBe('result');
      
      const metrics = getStoredPerformanceMetrics();
      const testMetric = metrics.find(m => m.name === 'test_function');
      expect(testMetric).toBeDefined();
      expect(testMetric?.value).toBeGreaterThanOrEqual(0);
    });

    it('should measure asynchronous function execution time', async () => {
      const fn = async () => {
        await new Promise(resolve => setTimeout(resolve, 10));
        return 'async_result';
      };
      const result = await measureExecutionTime(fn, 'async_test');
      expect(result).toBe('async_result');
    });

    it('should track error metrics on function failure', async () => {
      const fn = () => {
        throw new Error('Test error');
      };
      
      await expect(measureExecutionTime(fn, 'error_test')).rejects.toThrow();
      
      const metrics = getStoredPerformanceMetrics();
      const errorMetric = metrics.find(m => m.name === 'error_test_error');
      expect(errorMetric).toBeDefined();
    });
  });

  describe('getDeviceType', () => {
    it('should detect desktop', () => {
      Object.defineProperty(navigator, 'userAgent', {
        value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        writable: true,
        configurable: true,
      });
      expect(getDeviceType()).toBe('desktop');
    });

    it('should detect mobile', () => {
      Object.defineProperty(navigator, 'userAgent', {
        value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)',
        writable: true,
        configurable: true,
      });
      expect(getDeviceType()).toBe('mobile');
    });

    it('should detect tablet', () => {
      Object.defineProperty(navigator, 'userAgent', {
        value: 'Mozilla/5.0 (iPad; CPU OS 14_0 like Mac OS X)',
        writable: true,
        configurable: true,
      });
      expect(getDeviceType()).toBe('tablet');
    });
  });

  describe('getBrowser', () => {
    it('should detect Chrome', () => {
      Object.defineProperty(navigator, 'userAgent', {
        value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124',
        writable: true,
        configurable: true,
      });
      expect(getBrowser()).toBe('Chrome');
    });

    it('should detect Firefox', () => {
      Object.defineProperty(navigator, 'userAgent', {
        value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0',
        writable: true,
        configurable: true,
      });
      expect(getBrowser()).toBe('Firefox');
    });

    it('should detect Safari', () => {
      Object.defineProperty(navigator, 'userAgent', {
        value: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15',
        writable: true,
        configurable: true,
      });
      expect(getBrowser()).toBe('Safari');
    });
  });

  describe('getOperatingSystem', () => {
    it('should detect Windows', () => {
      Object.defineProperty(navigator, 'userAgent', {
        value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        writable: true,
        configurable: true,
      });
      expect(getOperatingSystem()).toBe('Windows');
    });

    it('should detect macOS', () => {
      Object.defineProperty(navigator, 'userAgent', {
        value: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
        writable: true,
        configurable: true,
      });
      expect(getOperatingSystem()).toBe('macOS');
    });

    it('should detect Android', () => {
      Object.defineProperty(navigator, 'userAgent', {
        value: 'Mozilla/5.0 (Linux; Android 11)',
        writable: true,
        configurable: true,
      });
      expect(getOperatingSystem()).toBe('Android');
    });
  });

  describe('createUserSession', () => {
    it('should create user session', () => {
      const session = createUserSession();
      expect(session.sessionId).toBeDefined();
      expect(session.startTime).toBeDefined();
      expect(session.pageViews).toBe(0);
      expect(session.events).toEqual([]);
      expect(session.deviceType).toBeDefined();
      expect(session.browser).toBeDefined();
      expect(session.os).toBeDefined();
    });
  });

  describe('getCurrentSession', () => {
    it('should return null if no session exists', () => {
      expect(getCurrentSession()).toBeNull();
    });

    it('should return current session if exists', () => {
      const session = createUserSession();
      mockSessionStorage.setItem('analytics_session', JSON.stringify(session));
      const retrieved = getCurrentSession();
      expect(retrieved).not.toBeNull();
      expect(retrieved?.sessionId).toBe(session.sessionId);
    });
  });

  describe('updateSession', () => {
    it('should update session', () => {
      const session = createUserSession();
      mockSessionStorage.setItem('analytics_session', JSON.stringify(session));
      const updated = updateSession({ pageViews: 5 });
      expect(updated?.pageViews).toBe(5);
    });

    it('should return null if no session exists', () => {
      expect(updateSession({ pageViews: 5 })).toBeNull();
    });
  });

  describe('endSession', () => {
    it('should end session and store in history', () => {
      const session = createUserSession();
      mockSessionStorage.setItem('analytics_session', JSON.stringify(session));
      const ended = endSession();
      expect(ended?.endTime).toBeDefined();
      expect(getCurrentSession()).toBeNull();
      
      const historical = getHistoricalSessions();
      expect(historical.length).toBeGreaterThan(0);
    });
  });

  describe('calculateSessionDuration', () => {
    it('should calculate session duration', () => {
      const session: any = {
        startTime: 1000,
        endTime: 5000,
      };
      expect(calculateSessionDuration(session)).toBe(4000);
    });

    it('should return null if session not ended', () => {
      const session: any = {
        startTime: 1000,
      };
      expect(calculateSessionDuration(session)).toBeNull();
    });
  });

  describe('getAverageSessionDuration', () => {
    it('should return 0 for no sessions', () => {
      expect(getAverageSessionDuration()).toBe(0);
    });

    it('should calculate average session duration', () => {
      const sessions = [
        { startTime: 1000, endTime: 3000, pageViews: 0, events: [], deviceType: 'desktop', browser: 'Chrome', os: 'Windows', sessionId: '1' },
        { startTime: 2000, endTime: 6000, pageViews: 0, events: [], deviceType: 'desktop', browser: 'Chrome', os: 'Windows', sessionId: '2' },
      ];
      mockLocalStorage.setItem('analytics_historical_sessions', JSON.stringify(sessions));
      const avg = getAverageSessionDuration();
      expect(avg).toBe(3000); // (2000 + 4000) / 2
    });
  });

  describe('getEventsByCategory', () => {
    it('should filter events by category', () => {
      trackEvent('e1', 'cat1', 'a1');
      trackEvent('e2', 'cat2', 'a2');
      trackEvent('e3', 'cat1', 'a3');
      const events = getEventsByCategory('cat1');
      expect(events).toHaveLength(2);
      expect(events.every(e => e.category === 'cat1')).toBe(true);
    });
  });

  describe('getEventsByAction', () => {
    it('should filter events by action', () => {
      trackEvent('e1', 'c1', 'action1');
      trackEvent('e2', 'c2', 'action2');
      trackEvent('e3', 'c3', 'action1');
      const events = getEventsByAction('action1');
      expect(events).toHaveLength(2);
    });
  });

  describe('getEventCountByCategory', () => {
    it('should count events by category', () => {
      trackEvent('e1', 'cat1', 'a1');
      trackEvent('e2', 'cat1', 'a2');
      trackEvent('e3', 'cat2', 'a3');
      const counts = getEventCountByCategory();
      expect(counts['cat1']).toBe(2);
      expect(counts['cat2']).toBe(1);
    });
  });

  describe('getTotalEventValueByCategory', () => {
    it('should sum event values by category', () => {
      trackEvent('e1', 'cat1', 'a1', { value: 10 });
      trackEvent('e2', 'cat1', 'a2', { value: 20 });
      trackEvent('e3', 'cat2', 'a3', { value: 30 });
      const totals = getTotalEventValueByCategory();
      expect(totals['cat1']).toBe(30);
      expect(totals['cat2']).toBe(30);
    });
  });

  describe('getPageViewStatistics', () => {
    it('should calculate page view statistics', () => {
      trackPageView('/page1', 'Page 1');
      trackPageView('/page2', 'Page 2');
      trackPageView('/page1', 'Page 1');
      const stats = getPageViewStatistics();
      expect(stats.totalViews).toBe(3);
      expect(stats.uniquePages).toBe(2);
      expect(stats.mostViewedPage).toBe('/page1');
    });
  });

  describe('getPerformanceStatistics', () => {
    it('should calculate performance statistics', () => {
      trackPerformanceMetric('page_load', 100);
      trackPerformanceMetric('page_load', 200);
      trackPerformanceMetric('page_load', 300);
      const stats = getPerformanceStatistics();
      expect(stats.averageLoadTime).toBeGreaterThan(0);
    });
  });

  describe('trackConversion', () => {
    it('should track conversion event', () => {
      const event = trackConversion('purchase', 100, { productId: '123' });
      expect(event.eventName).toBe('conversion');
      expect(event.category).toBe('conversion');
      expect(event.action).toBe('purchase');
      expect(event.value).toBe(100);
    });
  });

  describe('trackError', () => {
    it('should track error event', () => {
      const event = trackError('Test error', 'Error stack', { context: 'test' });
      expect(event.eventName).toBe('error');
      expect(event.category).toBe('error');
      expect(event.label).toBe('Test error');
    });
  });

  describe('trackEngagement', () => {
    it('should track engagement event', () => {
      const event = trackEngagement('video_watch', 5000, { videoId: '123' });
      expect(event.eventName).toBe('engagement');
      expect(event.category).toBe('user_engagement');
      expect(event.value).toBe(5000);
    });
  });

  describe('clearAnalyticsData', () => {
    it('should clear all analytics data', () => {
      trackPageView('/test', 'Test');
      trackEvent('test', 'cat', 'act');
      clearAnalyticsData();
      expect(getStoredPageViews()).toHaveLength(0);
      expect(getStoredEvents()).toHaveLength(0);
    });
  });

  describe('exportAnalyticsData', () => {
    it('should export analytics data as JSON', () => {
      trackPageView('/test', 'Test');
      trackEvent('test', 'cat', 'act');
      const exported = exportAnalyticsData();
      expect(() => JSON.parse(exported)).not.toThrow();
      const data = JSON.parse(exported);
      expect(data.pageViews).toBeDefined();
      expect(data.events).toBeDefined();
    });
  });

  describe('getUserBehaviorInsights', () => {
    it('should provide user behavior insights', () => {
      const session = createUserSession();
      mockLocalStorage.setItem('analytics_historical_sessions', JSON.stringify([session]));
      trackPageView('/test', 'Test');
      trackEvent('test', 'category1', 'action1');
      trackEvent('test2', 'category2', 'action2');
      
      const insights = getUserBehaviorInsights();
      expect(insights.totalSessions).toBeGreaterThanOrEqual(0);
      expect(insights.totalPageViews).toBeGreaterThanOrEqual(0);
      expect(insights.totalEvents).toBeGreaterThanOrEqual(0);
      expect(insights.topCategories).toBeDefined();
      expect(insights.deviceBreakdown).toBeDefined();
    });
  });
});

