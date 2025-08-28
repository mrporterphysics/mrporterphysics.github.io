/**
 * Fallback Data System
 * Provides sample questions when CSV loading fails (e.g., when opening index.html directly)
 */

const FallbackData = {
    // Sample questions for offline/fallback mode
    sampleQuestions: [
        {
            id: "sample1",
            type: "tf",
            question: "True or False: Displacement indicates the total distance an object travels.",
            answer: "false",
            topic: "kinematics",
            explanation: "Displacement only indicates how far an object ends up from its initial position, regardless of the path taken.",
            difficulty: 2
        },
        {
            id: "sample2",
            type: "tf",
            question: "True or False: Average velocity is displacement divided by the time interval over which that displacement occurred.",
            answer: "true",
            topic: "kinematics",
            explanation: "Average velocity is defined as the total displacement divided by the time interval.",
            difficulty: 1
        },
        {
            id: "sample3",
            type: "mc",
            question: "What is Newton's First Law of Motion?",
            answer: "A",
            topic: "forces",
            explanation: "Newton's First Law states that an object at rest stays at rest and an object in motion stays in motion unless acted upon by an external force.",
            optionA: "An object at rest stays at rest unless acted upon by an external force",
            optionB: "Force equals mass times acceleration",
            optionC: "For every action there is an equal and opposite reaction",
            optionD: "The gravitational force is proportional to mass",
            difficulty: 1
        },
        {
            id: "sample4",
            type: "mc",
            question: "Which of the following best describes kinetic energy?",
            answer: "B",
            topic: "energy",
            explanation: "Kinetic energy is the energy possessed by an object due to its motion, calculated as KE = ½mv².",
            optionA: "Energy stored in a compressed spring",
            optionB: "Energy of motion",
            optionC: "Energy due to position in a gravitational field",
            optionD: "Energy released in chemical reactions",
            difficulty: 2
        },
        {
            id: "sample5",
            type: "fill",
            question: "The formula for acceleration is a = _______ divided by time.",
            answer: "change in velocity",
            topic: "kinematics",
            explanation: "Acceleration is defined as the change in velocity (Δv) divided by the time interval (Δt).",
            alternateAnswers: "velocity change,delta v,change of velocity,Δv",
            difficulty: 2
        },
        {
            id: "sample6",
            type: "mc",
            question: "What happens to the gravitational force between two objects when the distance between them doubles?",
            answer: "C",
            topic: "gravitation",
            explanation: "According to Newton's law of universal gravitation, force is inversely proportional to the square of the distance. When distance doubles, force becomes 1/4 of the original.",
            optionA: "It doubles",
            optionB: "It is halved",
            optionC: "It becomes one-fourth",
            optionD: "It remains the same",
            difficulty: 3
        },
        {
            id: "sample7",
            type: "tf",
            question: "True or False: In simple harmonic motion, the acceleration is maximum when the displacement is maximum.",
            answer: "true",
            topic: "shm",
            explanation: "In SHM, acceleration is proportional to displacement and opposite in direction, so maximum displacement corresponds to maximum acceleration.",
            difficulty: 2
        },
        {
            id: "sample8",
            type: "mc",
            question: "Which quantity is conserved in a perfectly elastic collision?",
            answer: "D",
            topic: "momentum",
            explanation: "In perfectly elastic collisions, both momentum and kinetic energy are conserved.",
            optionA: "Only momentum",
            optionB: "Only kinetic energy", 
            optionC: "Only potential energy",
            optionD: "Both momentum and kinetic energy",
            difficulty: 3
        },
        {
            id: "sample9",
            type: "fill",
            question: "Power is defined as the rate of doing _______.",
            answer: "work",
            topic: "energy",
            explanation: "Power is the rate at which work is done or energy is transferred, measured in watts.",
            difficulty: 1
        },
        {
            id: "sample10",
            type: "mc",
            question: "What is the SI unit for frequency?",
            answer: "A",
            topic: "waves",
            explanation: "Frequency is measured in Hertz (Hz), which represents cycles per second.",
            optionA: "Hertz (Hz)",
            optionB: "Meters per second (m/s)",
            optionC: "Joules (J)",
            optionD: "Newtons (N)",
            difficulty: 1
        }
    ],

    // Check if we should use fallback data
    shouldUseFallback: function() {
        // Check if we're running from file:// protocol
        return window.location.protocol === 'file:';
    },

    // Get fallback questions in the format expected by QuizData
    getFallbackQuestions: function() {
        return this.sampleQuestions.map(q => ({
            ...q,
            optionE: q.optionE || '', // Ensure all expected fields exist
            alternateAnswers: q.alternateAnswers || ''
        }));
    },

    // Display fallback mode notification
    showFallbackNotification: function() {
        const notification = document.createElement('div');
        notification.className = 'fallback-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <div class="notification-icon">⚠️</div>
                <div class="notification-text">
                    <strong>Demo Mode</strong><br>
                    Using sample questions. For full question set, open via web server.
                </div>
                <button class="close-notification" onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
        `;

        document.body.appendChild(notification);

        // Auto-hide after 8 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.classList.add('fade-out');
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 500);
            }
        }, 8000);
    }
};

// Add CSS for fallback notification
const fallbackCSS = `
.fallback-notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--yellow);
    color: var(--bg-primary);
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 10000;
    max-width: 300px;
    animation: slideInNotification 0.3s ease;
}

.fallback-notification.fade-out {
    animation: fadeOutNotification 0.5s ease forwards;
}

.notification-content {
    display: flex;
    align-items: flex-start;
    padding: 16px;
    gap: 12px;
}

.notification-icon {
    font-size: 1.2rem;
    flex-shrink: 0;
}

.notification-text {
    flex: 1;
    font-size: 0.85rem;
    line-height: 1.4;
}

.notification-text strong {
    font-weight: 600;
}

.close-notification {
    background: none;
    border: none;
    color: inherit;
    font-size: 1.2rem;
    cursor: pointer;
    padding: 0;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    transition: background 0.2s;
    flex-shrink: 0;
}

.close-notification:hover {
    background: rgba(0,0,0,0.1);
}

@keyframes slideInNotification {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes fadeOutNotification {
    to {
        transform: translateX(100%);
        opacity: 0;
    }
}

@media (max-width: 768px) {
    .fallback-notification {
        top: 10px;
        right: 10px;
        left: 10px;
        max-width: none;
    }
}
`;

// Inject CSS
const fallbackStyleSheet = document.createElement('style');
fallbackStyleSheet.textContent = fallbackCSS;
document.head.appendChild(fallbackStyleSheet);