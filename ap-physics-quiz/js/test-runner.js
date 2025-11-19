/**
 * Automated Test Runner for AP Physics Quiz
 * Simulates user interaction to verify all questions and reward system.
 */

const TestRunner = {
    results: { passed: 0, failed: 0, errors: [] },
    isRunning: false,
    delay: 100, // ms between actions
    achievementsUnlocked: [],

    async start() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.results = { passed: 0, failed: 0, errors: [] };
        this.achievementsUnlocked = [];
        console.log('🚀 Starting Automated Test Agent...');

        // Reset quiz to start fresh
        if (QuizUI.elements.controls.resetBtn) {
            QuizUI.elements.controls.resetBtn.click();
            await this.wait(500);
        }

        // Ensure we are in a mode that loads all questions?
        // Default mode usually loads all.

        const totalQuestions = QuizData.questions.length;
        console.log(`📋 Testing ${totalQuestions} questions...`);

        // Monitor for achievements
        this.setupAchievementMonitor();

        for (let i = 0; i < totalQuestions; i++) {
            // Progress update every 10 questions
            if (i % 10 === 0) console.log(`Processing question ${i + 1}/${totalQuestions}...`);

            await this.testCurrentQuestion(i);

            // Move to next
            if (i < totalQuestions - 1) {
                const nextBtn = document.getElementById('next-question');
                if (nextBtn && !nextBtn.disabled && nextBtn.style.display !== 'none') {
                    nextBtn.click();
                    await this.wait(this.delay);
                } else {
                    console.error('❌ Next button not available!');
                    this.results.errors.push(`Q${i + 1}: Next button stuck`);
                    break;
                }
            }
        }

        this.report();
        this.isRunning = false;
    },

    async testCurrentQuestion(index) {
        const q = QuizData.currentQuestion;
        if (!q) {
            console.error(`❌ No question at index ${index}`);
            this.results.errors.push(`Index ${index}: No question loaded`);
            return;
        }

        // Determine correct answer
        const correctAnswer = q.answer;

        // Fill input
        try {
            this.fillAnswer(q.type, correctAnswer, q);

            // Submit
            const submitBtn = document.getElementById('submit-answer');
            if (submitBtn) {
                submitBtn.click();
            } else {
                console.error('Submit button not found');
            }

            await this.wait(this.delay);

            // Check feedback
            const feedback = document.getElementById('feedback');
            // Check for 'correct' class or text content
            const isCorrect = feedback && (feedback.classList.contains('correct') || feedback.textContent.includes('Correct'));

            if (isCorrect) {
                this.results.passed++;
            } else {
                this.results.failed++;
                console.error(`❌ Q${index + 1} (ID: ${q.id}) Failed. Type: ${q.type}. Expected: ${correctAnswer}`);
                this.results.errors.push(`Q${q.id}: Failed`);
            }

            // Check for achievements (modal might pop up)
            await this.checkAchievements();

        } catch (e) {
            console.error(`❌ Error on Q${index + 1}:`, e);
            this.results.errors.push(`Q${q.id}: Exception - ${e.message}`);
        }
    },

    fillAnswer(type, answer, question) {
        if (type === 'mc') {
            // answer is 'A', 'B', etc.
            const radio = document.querySelector(`input[name="mc-answer"][value="${answer}"]`);
            if (radio) {
                radio.click();
            } else {
                console.warn(`Radio ${answer} not found for Q${question.id}`);
                // Try to find by text if value doesn't match (fallback)
                // But app uses A,B,C values.
            }
        } else if (type === 'tf') {
            // answer is 'true' or 'false' (string or boolean)
            const val = String(answer).toLowerCase();
            const radio = document.querySelector(`input[name="tf-answer"][value="${val}"]`);
            if (radio) radio.click();
        } else if (type === 'fill') {
            const input = document.getElementById('fill-answer');
            if (input) {
                // For fill, answer might be a list of accepted answers in CSV?
                // QuizData.processQuestion parses alternateAnswers.
                // But q.answer is the primary answer.
                input.value = answer;
                input.dispatchEvent(new Event('input'));
            }
        } else if (type === 'matching') {
            const input = document.getElementById('matching-answer');
            if (input) {
                input.value = answer; // Matching UI might be complex, but assuming simple input for now based on getUserAnswer
                input.dispatchEvent(new Event('input'));
            }
        }
    },

    setupAchievementMonitor() {
        // Listen for achievement events if they exist
        document.addEventListener('achievementUnlocked', (e) => {
            console.log('🏆 Achievement Event:', e.detail);
            this.achievementsUnlocked.push(e.detail);
        });
    },

    async checkAchievements() {
        // Check if modal is open
        const modal = document.getElementById('achievement-modal');
        if (modal && (modal.style.display === 'block' || modal.classList.contains('active') || modal.classList.contains('show'))) {
            console.log('🏆 Achievement Modal Detected!');
            // Close it to continue
            const closeBtn = modal.querySelector('.close-modal') || modal.querySelector('button');
            if (closeBtn) {
                closeBtn.click();
                await this.wait(200); // Wait for close animation
            }
        }
    },

    wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    report() {
        console.log('🏁 Test Complete');
        console.log(`✅ Passed: ${this.results.passed}`);
        console.log(`❌ Failed: ${this.results.failed}`);
        console.log(`🏆 Achievements Unlocked: ${this.achievementsUnlocked.length}`);
        if (this.results.errors.length > 0) {
            console.log('Errors:', this.results.errors);
        }

        const reportDiv = document.createElement('div');
        reportDiv.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:white;padding:20px;border:2px solid black;z-index:10000;max-height:80vh;overflow:auto;';
        reportDiv.innerHTML = `
            <h2>Test Complete</h2>
            <p>✅ Passed: ${this.results.passed}</p>
            <p>❌ Failed: ${this.results.failed}</p>
            <p>🏆 Achievements: ${this.achievementsUnlocked.length}</p>
            <h3>Errors (${this.results.errors.length}):</h3>
            <ul>${this.results.errors.map(e => `<li>${e}</li>`).join('')}</ul>
            <button onclick="this.parentElement.remove()">Close</button>
        `;
        document.body.appendChild(reportDiv);
    }
};

window.TestRunner = TestRunner;
