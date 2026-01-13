/**
 * Audio system for Equation Flashcards
 * Handles Text-to-Speech with Web Speech API
 * CRITICAL MODULE for blind student accessibility
 */

const FlashcardAudio = {
    isSupported: false,
    synthesis: null,
    currentUtterance: null,
    voiceList: [],
    selectedVoice: null,
    isPlaying: false,

    // Pronunciation dictionary for physics symbols
    pronunciationMap: {
        // Greek letters (lowercase)
        'α': ' alpha ',
        'β': ' beta ',
        'γ': ' gamma ',
        'δ': ' delta ',
        'Δ': ' delta ',
        'ε': ' epsilon ',
        'ζ': ' zeta ',
        'η': ' eta ',
        'θ': ' theta ',
        'ι': ' iota ',
        'κ': ' kappa ',
        'λ': ' lambda ',
        'μ': ' mu ',
        'ν': ' nu ',
        'ξ': ' xi ',
        'π': ' pi ',
        'ρ': ' rho ',
        'σ': ' sigma ',
        'τ': ' tau ',
        'υ': ' upsilon ',
        'φ': ' phi ',
        'χ': ' chi ',
        'ψ': ' psi ',
        'ω': ' omega ',
        'Ω': ' omega ',

        // Subscripts
        '₀': ' naught ',
        '₁': ' sub one ',
        '₂': ' sub two ',
        '₃': ' sub three ',
        '₄': ' sub four ',
        '₅': ' sub five ',
        '₆': ' sub six ',
        '₇': ' sub seven ',
        '₈': ' sub eight ',
        '₉': ' sub nine ',
        'ᵢ': ' sub i ',
        'ₑ': ' sub e ',
        'ₙ': ' sub n ',

        // Superscripts
        '²': ' squared ',
        '³': ' cubed ',
        '⁴': ' to the fourth power ',
        '⁻¹': ' inverse ',
        '⁻²': ' inverse squared ',

        // Math operators
        '=': ' equals ',
        '≈': ' approximately equals ',
        '≠': ' not equal to ',
        '≤': ' less than or equal to ',
        '≥': ' greater than or equal to ',
        '<': ' less than ',
        '>': ' greater than ',
        '+': ' plus ',
        '−': ' minus ',
        '×': ' times ',
        '·': ' times ',
        '÷': ' divided by ',
        '/': ' divided by ',
        '√': ' square root of ',

        // Fractions
        '½': ' one half ',
        '⅓': ' one third ',
        '⅔': ' two thirds ',
        '¼': ' one quarter ',
        '¾': ' three quarters ',
        '⅛': ' one eighth ',

        // Special characters
        '°': ' degrees ',
        '∠': ' angle ',
        '∴': ' therefore ',
        '∝': ' proportional to ',
        '∞': ' infinity ',
        '→': ' approaches ',
        '↑': ' up ',
        '↓': ' down ',
        '∆': ' delta '
    },

    // Initialize audio system
    init: function() {
        console.log('🔊 Initializing Audio System...');

        if ('speechSynthesis' in window) {
            this.isSupported = true;
            this.synthesis = window.speechSynthesis;

            // Load voices
            this.loadVoices();

            // Handle voice list changes (async in some browsers)
            if (speechSynthesis.onvoiceschanged !== undefined) {
                speechSynthesis.onvoiceschanged = () => {
                    this.loadVoices();
                };
            }

            // Load saved settings
            this.loadSettings();

            console.log('✅ Web Speech API available');
            return true;
        } else {
            console.error('❌ Web Speech API not supported');
            this.showFallbackMessage();
            return false;
        }
    },

    // Load available voices
    loadVoices: function() {
        this.voiceList = this.synthesis.getVoices();
        console.log(`📢 Loaded ${this.voiceList.length} voices`);

        // Auto-select best voice if none selected
        if (!this.selectedVoice && this.voiceList.length > 0) {
            this.selectedVoice = this.selectBestVoice();
            console.log(`🎙️ Auto-selected voice: ${this.selectedVoice.name}`);
        }

        // Dispatch event for UI update
        document.dispatchEvent(new CustomEvent('voicesLoaded', {
            detail: { voices: this.voiceList }
        }));
    },

    // Select best available voice
    selectBestVoice: function() {
        const savedVoiceName = FlashcardStorage.getSetting('selectedVoice');

        // Try to find saved voice
        if (savedVoiceName) {
            const savedVoice = this.voiceList.find(v => v.name === savedVoiceName);
            if (savedVoice) return savedVoice;
        }

        // Priority order for voice selection
        const preferences = [
            // 1. High-quality English voices
            { lang: 'en-US', name: /natural|premium|enhanced|siri|samantha/i },
            // 2. Standard US English
            { lang: 'en-US' },
            // 3. Any English variant
            { lang: /en-/i },
            // 4. Default voice
            {}
        ];

        for (let pref of preferences) {
            const voice = this.voiceList.find(v => {
                if (pref.lang) {
                    if (typeof pref.lang === 'string' && !v.lang.startsWith(pref.lang)) {
                        return false;
                    }
                    if (pref.lang instanceof RegExp && !pref.lang.test(v.lang)) {
                        return false;
                    }
                }
                if (pref.name && !pref.name.test(v.name)) {
                    return false;
                }
                return true;
            });

            if (voice) return voice;
        }

        return this.voiceList[0]; // Fallback to first available
    },

    // Preprocess text for better pronunciation
    preprocessForSpeech: function(text, audioDescription = null) {
        // Use custom audio description if provided
        if (audioDescription && audioDescription.trim()) {
            return audioDescription;
        }

        let processed = text;

        // Apply pronunciation map
        for (let [symbol, pronunciation] of Object.entries(this.pronunciationMap)) {
            const regex = new RegExp(symbol.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
            processed = processed.replace(regex, pronunciation);
        }

        // Handle common variable patterns
        processed = processed
            .replace(/v₀/g, ' v-naught ')
            .replace(/v_0/g, ' v-naught ')
            .replace(/vf/g, ' v-final ')
            .replace(/vi/g, ' v-initial ')
            .replace(/v̄/g, ' v-bar ')
            .replace(/Fnet/g, ' F-net ')
            .replace(/Fc/g, ' F-centripetal ')
            .replace(/Ff/g, ' F-friction ')
            .replace(/Fg/g, ' F-gravity ')
            .replace(/FN/g, ' F-normal ')
            .replace(/KE/g, ' kinetic energy ')
            .replace(/PE/g, ' potential energy ')
            .replace(/PEs/g, ' potential energy spring ')
            .replace(/ET/g, ' total energy ')
            .replace(/Req/g, ' R-equivalent ');

        // Clean up multiple spaces
        processed = processed.replace(/\s+/g, ' ').trim();

        return processed;
    },

    // Main speak function
    speak: function(text, options = {}) {
        if (!this.isSupported) {
            Utils.announceToScreenReader(text, 'polite');
            return false;
        }

        // Cancel any ongoing speech
        this.stop();

        if (!text || text.trim() === '') {
            console.warn('⚠️ No text to speak');
            return false;
        }

        // Preprocess text
        const processedText = this.preprocessForSpeech(text, options.audioDescription);
        console.log(`🔊 Speaking: "${processedText.substring(0, 100)}${processedText.length > 100 ? '...' : ''}"`);

        // Create utterance
        this.currentUtterance = new SpeechSynthesisUtterance(processedText);

        // Configure utterance
        this.currentUtterance.voice = options.voice || this.selectedVoice || this.selectBestVoice();
        this.currentUtterance.rate = options.rate || FlashcardStorage.getSetting('speechRate', 1.0);
        this.currentUtterance.pitch = options.pitch || 1.0;
        this.currentUtterance.volume = options.volume || 1.0;

        // Event handlers
        this.currentUtterance.onstart = () => {
            this.isPlaying = true;
            Utils.announceToScreenReader('Audio playing', 'assertive');
            this.updateUI('playing');
            if (options.onStart) options.onStart();
        };

        this.currentUtterance.onend = () => {
            this.isPlaying = false;
            this.updateUI('stopped');
            if (options.onEnd) options.onEnd();
        };

        this.currentUtterance.onerror = (event) => {
            console.error('❌ Speech synthesis error:', event);
            this.isPlaying = false;
            Utils.announceToScreenReader('Audio error occurred', 'assertive');
            this.updateUI('error');
            if (options.onError) options.onError(event);
        };

        // Speak
        try {
            this.synthesis.speak(this.currentUtterance);
            return true;
        } catch (error) {
            Utils.handleError(error, 'speak', 'error');
            return false;
        }
    },

    // Stop speech
    stop: function() {
        if (this.synthesis && this.synthesis.speaking) {
            this.synthesis.cancel();
            this.isPlaying = false;
            this.updateUI('stopped');
        }
    },

    // Pause speech
    pause: function() {
        if (this.synthesis && this.synthesis.speaking && !this.synthesis.paused) {
            this.synthesis.pause();
            this.isPlaying = false;
            Utils.announceToScreenReader('Audio paused', 'polite');
            this.updateUI('paused');
        }
    },

    // Resume speech
    resume: function() {
        if (this.synthesis && this.synthesis.paused) {
            this.synthesis.resume();
            this.isPlaying = true;
            Utils.announceToScreenReader('Audio resumed', 'polite');
            this.updateUI('playing');
        }
    },

    // Toggle play/pause
    togglePlayPause: function() {
        if (this.isPlaying) {
            this.pause();
        } else if (this.synthesis && this.synthesis.paused) {
            this.resume();
        }
    },

    // Speak equation
    speakEquation: function(equation, side = 'front') {
        if (!equation) return false;

        let text;
        if (side === 'front') {
            // Front: Say the equation name (e.g., "Momentum")
            text = equation.name;
        } else {
            // Back: Say the equation pronunciation (e.g., "p equals m-v")
            // then read the variables
            text = equation.audioDescription + '. Variables: ' + equation.variables;
        }

        return this.speak(text, {
            onStart: () => {
                document.dispatchEvent(new CustomEvent('audioStarted', {
                    detail: { equation, side }
                }));
            },
            onEnd: () => {
                document.dispatchEvent(new CustomEvent('audioEnded', {
                    detail: { equation, side }
                }));
            }
        });
    },

    // Change speech rate
    setSpeechRate: function(rate) {
        if (rate >= 0.5 && rate <= 2.0) {
            FlashcardStorage.setSetting('speechRate', rate);
            console.log(`🔊 Speech rate set to ${rate}x`);
            Utils.announceToScreenReader(`Speech rate set to ${rate} times normal speed`, 'polite');
            return true;
        }
        return false;
    },

    // Change voice
    setVoice: function(voiceName) {
        const voice = this.voiceList.find(v => v.name === voiceName);
        if (voice) {
            this.selectedVoice = voice;
            FlashcardStorage.setSetting('selectedVoice', voiceName);
            console.log(`🎙️ Voice changed to: ${voiceName}`);
            Utils.announceToScreenReader(`Voice changed to ${voiceName}`, 'polite');
            return true;
        }
        return false;
    },

    // Get current settings
    getSettings: function() {
        return {
            autoRead: FlashcardStorage.getSetting('autoRead', true),
            speechRate: FlashcardStorage.getSetting('speechRate', 1.0),
            selectedVoice: this.selectedVoice ? this.selectedVoice.name : null
        };
    },

    // Load settings from storage
    loadSettings: function() {
        const voiceName = FlashcardStorage.getSetting('selectedVoice');
        if (voiceName) {
            this.setVoice(voiceName);
        }
    },

    // Update UI elements
    updateUI: function(state) {
        // Update play/pause button
        const playBtn = document.getElementById('play-audio-btn');
        if (playBtn) {
            const icon = playBtn.querySelector('.audio-icon');
            if (state === 'playing') {
                if (icon) icon.textContent = '⏸️';
                playBtn.setAttribute('aria-label', 'Pause audio');
            } else {
                if (icon) icon.textContent = '🔊';
                playBtn.setAttribute('aria-label', 'Play audio');
            }
        }

        // Dispatch UI update event
        document.dispatchEvent(new CustomEvent('audioStateChanged', {
            detail: { state, isPlaying: this.isPlaying }
        }));
    },

    // Show fallback message when TTS not available
    showFallbackMessage: function() {
        const message = `Text-to-speech is not available in your browser.
                        Please use a screen reader or try a different browser
                        (Chrome, Edge, or Safari recommended).`;

        console.warn('⚠️', message);

        // Show alert once
        const hasShownWarning = sessionStorage.getItem('tts-warning-shown');
        if (!hasShownWarning) {
            alert(message);
            sessionStorage.setItem('tts-warning-shown', 'true');
        }
    },

    // Test audio system
    test: function() {
        const testText = 'The equation v equals v-naught plus a-t represents velocity with constant acceleration.';
        console.log('🧪 Testing audio system...');
        return this.speak(testText, {
            onStart: () => console.log('✅ Audio test started'),
            onEnd: () => console.log('✅ Audio test completed'),
            onError: (e) => console.error('❌ Audio test failed:', e)
        });
    }
};

// Initialize on page load
if (typeof window !== 'undefined') {
    window.FlashcardAudio = FlashcardAudio;

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            FlashcardAudio.init();
        });
    } else {
        FlashcardAudio.init();
    }
}
