/**
 * Mobile Performance and Optimization System
 * Enhances performance and user experience on mobile devices
 */

window.MobileOptimization = {
    // Device and performance detection
    deviceInfo: {
        isMobile: false,
        isTablet: false,
        isLowEndDevice: false,
        screenSize: 'desktop',
        connectionType: 'unknown'
    },

    // Performance monitoring
    performanceMetrics: {
        pageLoadTime: 0,
        questionRenderTime: 0,
        avgInteractionTime: 0,
        memoryUsage: 0
    },

    // Optimization settings
    optimizations: {
        lazyLoadImages: true,
        reducedAnimations: false,
        simplifiedUI: false,
        prefetchQuestions: true,
        compressStorage: true
    },

    // Initialize mobile optimization
    init: function () {
        this.detectDevice();
        this.detectPerformance();
        this.applyOptimizations();
        this.setupResponsiveHandlers();
        this.setupPerformanceMonitoring();
        this.enhanceTouchExperience();
    },

    // Detect device capabilities
    detectDevice: function () {
        const userAgent = navigator.userAgent.toLowerCase();
        const screenWidth = window.screen.width;
        const screenHeight = window.screen.height;

        // Mobile detection
        this.deviceInfo.isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent) ||
            (screenWidth <= 768 && screenHeight <= 1024);

        // Tablet detection
        this.deviceInfo.isTablet = /ipad|android(?!.*mobile)|tablet/i.test(userAgent) ||
            (screenWidth >= 768 && screenWidth <= 1024);

        // Screen size categorization
        if (screenWidth <= 480) {
            this.deviceInfo.screenSize = 'small';
        } else if (screenWidth <= 768) {
            this.deviceInfo.screenSize = 'medium';
        } else if (screenWidth <= 1024) {
            this.deviceInfo.screenSize = 'large';
        } else {
            this.deviceInfo.screenSize = 'desktop';
        }

        // Low-end device detection (basic heuristics)
        this.deviceInfo.isLowEndDevice = navigator.hardwareConcurrency <= 2 ||
            navigator.deviceMemory <= 2 ||
            /android 4|android 5|ios 9|ios 10/i.test(userAgent);

        // Connection detection
        if (navigator.connection) {
            this.deviceInfo.connectionType = navigator.connection.effectiveType || 'unknown';
        }

        console.log('Device Detection:', this.deviceInfo);
    },

    // Detect performance capabilities
    detectPerformance: function () {
        // Measure page load time
        if (performance && performance.timing) {
            this.performanceMetrics.pageLoadTime =
                performance.timing.loadEventEnd - performance.timing.navigationStart;
        }

        // Memory usage (if available)
        if (performance && performance.memory) {
            this.performanceMetrics.memoryUsage = performance.memory.usedJSHeapSize;
        }
    },

    // Apply performance optimizations based on device
    applyOptimizations: function () {
        if (this.deviceInfo.isMobile || this.deviceInfo.isLowEndDevice) {
            // Enable mobile-specific optimizations
            this.optimizations.reducedAnimations = true;
            this.optimizations.simplifiedUI = true;

            // Add performance classes to body
            document.body.classList.add('mobile-optimized');

            if (this.deviceInfo.isLowEndDevice) {
                document.body.classList.add('low-end-device');
            }
        }

        if (this.deviceInfo.screenSize === 'small') {
            document.body.classList.add('small-screen');
        }

        // Apply reduced animations if needed
        if (this.optimizations.reducedAnimations) {
            this.enableReducedMotion();
        }

        // Optimize for slow connections
        if (this.deviceInfo.connectionType === 'slow-2g' || this.deviceInfo.connectionType === '2g') {
            this.enableSlowConnectionMode();
        }
    },

    // Setup responsive event handlers
    setupResponsiveHandlers: function () {
        // Viewport change handler
        window.addEventListener('resize', Utils.debounce(() => {
            this.handleViewportChange();
        }, 250));

        // Orientation change handler
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                this.handleOrientationChange();
            }, 100);
        });

        // Network change handler
        if (navigator.connection) {
            navigator.connection.addEventListener('change', () => {
                this.handleNetworkChange();
            });
        }
    },

    // Setup performance monitoring
    setupPerformanceMonitoring: function () {
        // Monitor question render time
        const originalDisplayQuestion = window.QuizUI && window.QuizUI.displayQuestion;
        if (originalDisplayQuestion) {
            window.QuizUI.displayQuestion = function (question) {
                const startTime = performance.now();
                const result = originalDisplayQuestion.call(this, question);
                const endTime = performance.now();

                MobileOptimization.performanceMetrics.questionRenderTime = endTime - startTime;

                if (MobileOptimization.performanceMetrics.questionRenderTime > 100) {
                    console.warn('Slow question render:', MobileOptimization.performanceMetrics.questionRenderTime + 'ms');
                }

                return result;
            };
        }

        // Monitor memory usage periodically
        if (performance.memory) {
            setInterval(() => {
                this.performanceMetrics.memoryUsage = performance.memory.usedJSHeapSize;

                // Warn if memory usage is high
                if (this.performanceMetrics.memoryUsage > 50 * 1024 * 1024) { // 50MB
                    console.warn('High memory usage detected');
                    this.performCleanup();
                }
            }, 30000);
        }
    },

    // Enhance touch experience
    enhanceTouchExperience: function () {
        if (!this.deviceInfo.isMobile) return;

        // Add touch-friendly classes
        document.body.classList.add('touch-device');

        // Improve touch targets
        this.improveTouchTargets();

        // Add swipe gestures for question navigation
        this.setupSwipeGestures();

        // Optimize scrolling
        this.optimizeScrolling();

        // Prevent zoom on input focus (iOS)
        this.preventInputZoom();
    },

    // Improve touch target sizes
    improveTouchTargets: function () {
        const style = document.createElement('style');
        style.textContent = `
            .touch-device .btn {
                min-height: 44px;
                min-width: 44px;
                padding: 12px 16px;
            }
            
            .touch-device .option-label {
                min-height: 48px;
                padding: 16px;
            }
            
            .touch-device input[type="radio"], 
            .touch-device input[type="checkbox"] {
                transform: scale(1.2);
            }
            
            .touch-device .close-setup,
            .touch-device .close-menu,
            .touch-device .close-guide,
            .touch-device .close-modal {
                min-height: 44px;
                min-width: 44px;
                padding: 8px;
            }
        `;
        document.head.appendChild(style);
    },

    // Setup swipe gestures for navigation
    setupSwipeGestures: function () {
        let startX = 0;
        let startY = 0;
        let endX = 0;
        let endY = 0;

        document.addEventListener('touchstart', (e) => {
            startX = e.changedTouches[0].screenX;
            startY = e.changedTouches[0].screenY;
        }, { passive: true });

        document.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].screenX;
            endY = e.changedTouches[0].screenY;

            const deltaX = endX - startX;
            const deltaY = endY - startY;

            // Only process horizontal swipes that are longer than vertical
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 100) {
                if (deltaX > 0) {
                    // Swipe right - previous question
                    this.handleSwipeRight();
                } else {
                    // Swipe left - next question
                    this.handleSwipeLeft();
                }
            }
        }, { passive: true });
    },

    // Handle swipe gestures
    handleSwipeRight: function () {
        const prevButton = document.getElementById('prev-question');
        if (prevButton && prevButton.style.display !== 'none' && !prevButton.disabled) {
            prevButton.click();
        }
    },

    handleSwipeLeft: function () {
        const nextButton = document.getElementById('next-question');
        if (nextButton && nextButton.style.display !== 'none' && !nextButton.disabled) {
            nextButton.click();
        }
    },

    // Optimize scrolling performance
    optimizeScrolling: function () {
        // Add smooth scrolling
        const style = document.createElement('style');
        style.textContent = `
            .touch-device {
                -webkit-overflow-scrolling: touch;
                scroll-behavior: smooth;
            }
            
            .touch-device * {
                -webkit-transform: translateZ(0);
                transform: translateZ(0);
            }
        `;
        document.head.appendChild(style);
    },

    // Prevent input zoom on iOS
    preventInputZoom: function () {
        if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
            const viewport = document.querySelector('meta[name=viewport]');
            if (viewport) {
                viewport.content = 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0';
            }
        }
    },

    // Enable reduced motion for performance
    enableReducedMotion: function () {
        const style = document.createElement('style');
        style.textContent = `
            .mobile-optimized *,
            .mobile-optimized *::before,
            .mobile-optimized *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        `;
        document.head.appendChild(style);
    },

    // Enable slow connection optimizations
    enableSlowConnectionMode: function () {
        document.body.classList.add('slow-connection');

        // Disable non-essential animations
        const style = document.createElement('style');
        style.textContent = `
            .slow-connection .progress-bar {
                transition: none;
            }
            
            .slow-connection .accuracy-fill {
                transition: none;
            }
            
            .slow-connection .rf-timer-fill {
                transition: none;
            }
        `;
        document.head.appendChild(style);
    },

    // Handle viewport changes
    handleViewportChange: function () {
        const newWidth = window.innerWidth;
        let newScreenSize = this.deviceInfo.screenSize;

        if (newWidth <= 480) {
            newScreenSize = 'small';
        } else if (newWidth <= 768) {
            newScreenSize = 'medium';
        } else if (newWidth <= 1024) {
            newScreenSize = 'large';
        } else {
            newScreenSize = 'desktop';
        }

        if (newScreenSize !== this.deviceInfo.screenSize) {
            this.deviceInfo.screenSize = newScreenSize;
            document.body.className = document.body.className.replace(/screen-\w+/g, '');
            document.body.classList.add(`screen-${newScreenSize}`);
        }
    },

    // Handle orientation changes
    handleOrientationChange: function () {
        // Recalculate layout after orientation change
        if (window.QuizUI && typeof window.QuizUI.updateLayout === 'function') {
            window.QuizUI.updateLayout();
        }

        // Scroll to top to avoid layout issues
        window.scrollTo(0, 0);
    },

    // Handle network changes
    handleNetworkChange: function () {
        const connection = navigator.connection;
        this.deviceInfo.connectionType = connection.effectiveType;

        if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
            if (!document.body.classList.contains('slow-connection')) {
                this.enableSlowConnectionMode();
            }
        } else {
            document.body.classList.remove('slow-connection');
        }
    },

    // Performance cleanup
    performCleanup: function () {
        // Clear old performance entries
        if (performance.clearResourceTimings) {
            performance.clearResourceTimings();
        }

        // Trigger garbage collection if available
        if (window.gc) {
            window.gc();
        }

        // Clear old cached data
        this.clearOldCaches();
    },

    // Clear old cached data
    clearOldCaches: function () {
        try {
            // Clear old statistics data (keep recent)
            const stats = QuizStorage.getStatistics();
            if (stats && Object.keys(stats).length > 100) {
                // Compress statistics
                QuizStorage.compressStatistics();
            }

            // Clear old rapid fire data
            const rfStats = Utils.storage.get('rapid_fire_stats', {});
            if (rfStats.recentScores && rfStats.recentScores.length > 20) {
                rfStats.recentScores = rfStats.recentScores.slice(0, 10);
                Utils.storage.set('rapid_fire_stats', rfStats);
            }

        } catch (error) {
            console.warn('Cache cleanup failed:', error);
        }
    },

    // Add mobile-specific UI enhancements
    addMobileUI: function () {
        if (!this.deviceInfo.isMobile) return;

        // Add mobile navigation helper
        const navHelper = document.createElement('div');
        navHelper.className = 'mobile-nav-helper';
        navHelper.innerHTML = `
            <div class="swipe-indicator">
                <span>← Swipe to navigate →</span>
            </div>
        `;

        const quizScreen = document.getElementById('quiz-screen');
        if (quizScreen) {
            quizScreen.appendChild(navHelper);

            // Auto-hide after 5 seconds
            setTimeout(() => {
                navHelper.style.opacity = '0';
                setTimeout(() => {
                    if (navHelper.parentNode) {
                        navHelper.parentNode.removeChild(navHelper);
                    }
                }, 1000);
            }, 5000);
        }
    },

    // Get performance report
    getPerformanceReport: function () {
        return {
            deviceInfo: this.deviceInfo,
            metrics: this.performanceMetrics,
            optimizations: this.optimizations,
            recommendations: this.getPerformanceRecommendations()
        };
    },

    // Get performance recommendations
    getPerformanceRecommendations: function () {
        const recommendations = [];

        if (this.performanceMetrics.questionRenderTime > 100) {
            recommendations.push('Consider reducing visual complexity for faster question rendering');
        }

        if (this.deviceInfo.isLowEndDevice) {
            recommendations.push('Low-end device detected: simplified UI enabled');
        }

        if (this.deviceInfo.connectionType === 'slow-2g' || this.deviceInfo.connectionType === '2g') {
            recommendations.push('Slow connection detected: animations reduced');
        }

        return recommendations;
    }
};

// Add mobile-specific CSS optimizations
const mobileCSS = `
/* Mobile Performance Optimizations */
.mobile-optimized {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeSpeed;
}

.mobile-optimized img {
    image-rendering: auto;
}

.low-end-device {
    will-change: auto !important;
}

.low-end-device * {
    will-change: auto !important;
    transform: none !important;
}

/* Mobile Navigation Helper */
.mobile-nav-helper {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: var(--bl);
    color: var(--bg);
    padding: 8px 16px;
    border-radius: 20px;
    font-size: 0.8rem;
    z-index: 999;
    transition: opacity 1s ease;
    pointer-events: none;
}

.swipe-indicator {
    display: flex;
    align-items: center;
    gap: 8px;
}

/* Touch-friendly improvements */
.touch-device .quiz-controls {
    padding: 20px 16px;
    gap: 16px;
}

.touch-device .control-center {
    gap: 16px;
}

/* Small screen optimizations */
.small-screen .app-container {
    padding: 10px;
}

.small-screen .question-container {
    padding: 16px;
}

.small-screen .guide-content,
.small-screen .rapid-fire-setup,
.small-screen .study-guide-menu {
    margin: 0;
    border-radius: 0;
    height: 100vh;
}

/* Reduced motion preferences */
@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}
`;

// Inject mobile CSS
const mobileStyleSheet = document.createElement('style');
mobileStyleSheet.textContent = mobileCSS;
document.head.appendChild(mobileStyleSheet);

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => MobileOptimization.init());
} else {
    MobileOptimization.init();
}