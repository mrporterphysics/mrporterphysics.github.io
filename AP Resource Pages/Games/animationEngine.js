// Animation Engine for Physics Motion Scenarios
class AnimationEngine {
    constructor() {
        this.animations = new Map();
        this.isRunning = false;
    }

    createAnimation(canvas, scenario, options = {}) {
        const ctx = canvas.getContext('2d');
        const animationId = 'anim_' + Date.now();
        
        const animation = {
            id: animationId,
            canvas: canvas,
            ctx: ctx,
            scenario: scenario,
            startTime: null,
            duration: options.duration || 4000, // 4 seconds default
            isPlaying: false,
            isPaused: false,
            currentTime: 0,
            loop: options.loop !== false, // Default to looping
            speed: options.speed || 1,
            objects: [],
            onComplete: options.onComplete || null
        };

        this.setupCanvasForAnimation(canvas, ctx);
        this.initializeScenario(animation, scenario);
        this.animations.set(animationId, animation);
        
        return animationId;
    }

    setupCanvasForAnimation(canvas, ctx) {
        // Set up high-DPI rendering
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        
        ctx.scale(dpr, dpr);
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
    }

    initializeScenario(animation, scenario) {
        const width = animation.canvas.getBoundingClientRect().width;
        const height = animation.canvas.getBoundingClientRect().height;
        
        switch (scenario.type) {
            case 'constant-velocity':
                this.setupConstantVelocity(animation, scenario, width, height);
                break;
            case 'constant-acceleration':
                this.setupConstantAcceleration(animation, scenario, width, height);
                break;
            case 'pendulum':
                this.setupPendulum(animation, scenario, width, height);
                break;
            case 'spring-oscillation':
                this.setupSpringOscillation(animation, scenario, width, height);
                break;
        }
    }

    setupConstantVelocity(animation, scenario, width, height) {
        const car = {
            type: 'car',
            x: 50,
            y: height / 2,
            initialX: 50,
            vx: scenario.velocity || 10, // m/s
            width: 40,
            height: 20,
            color: getComputedStyle(document.documentElement).getPropertyValue('--success-color') || '#879A39'
        };
        
        animation.objects.push(car);
        animation.pixelsPerMeter = (width - 100) / 15; // 15 meters across screen
    }

    setupConstantAcceleration(animation, scenario, width, height) {
        const car = {
            type: 'car',
            x: 50,
            y: height / 2,
            initialX: 50,
            vx: scenario.initialVelocity || 0,
            initialVx: scenario.initialVelocity || 0,
            ax: scenario.acceleration || 2, // m/s²
            width: 40,
            height: 20,
            color: getComputedStyle(document.documentElement).getPropertyValue('--accent-color') || '#8B7EC8'
        };
        
        animation.objects.push(car);
        animation.pixelsPerMeter = (width - 100) / 15;
    }

    setupPendulum(animation, scenario, width, height) {
        const pendulum = {
            type: 'pendulum',
            centerX: width / 2,
            centerY: 50,
            length: 100,
            angle: scenario.initialAngle || Math.PI / 4, // 45 degrees
            initialAngle: scenario.initialAngle || Math.PI / 4,
            angularVelocity: 0,
            bobRadius: 12,
            color: getComputedStyle(document.documentElement).getPropertyValue('--warning-color') || '#DA702C'
        };
        
        animation.objects.push(pendulum);
        animation.gravity = 9.8;
    }

    playAnimation(animationId) {
        const animation = this.animations.get(animationId);
        if (!animation) return;

        animation.isPlaying = true;
        animation.isPaused = false;
        animation.startTime = performance.now();
        
        if (!this.isRunning) {
            this.isRunning = true;
            this.animationLoop();
        }
    }

    pauseAnimation(animationId) {
        const animation = this.animations.get(animationId);
        if (animation) {
            animation.isPaused = true;
        }
    }

    stopAnimation(animationId) {
        const animation = this.animations.get(animationId);
        if (animation) {
            animation.isPlaying = false;
            animation.currentTime = 0;
            this.resetAnimation(animation);
        }
    }

    resetAnimation(animation) {
        // Reset all objects to initial positions
        animation.objects.forEach(obj => {
            if (obj.type === 'car') {
                obj.x = obj.initialX;
                obj.y = obj.initialY || obj.y;
                obj.vx = obj.initialVx || obj.vx;
                obj.vy = obj.initialVy || 0;
            } else if (obj.type === 'pendulum') {
                obj.angle = obj.initialAngle;
                obj.angularVelocity = 0;
            }
            
            if (obj.trail) {
                obj.trail = [];
            }
        });
    }

    animationLoop() {
        const currentTime = performance.now();
        let hasActiveAnimations = false;

        this.animations.forEach(animation => {
            if (animation.isPlaying && !animation.isPaused) {
                hasActiveAnimations = true;
                const elapsed = (currentTime - animation.startTime) * animation.speed;
                const progress = Math.min(elapsed / animation.duration, 1);
                
                this.updateAnimation(animation, elapsed / 1000); // Convert to seconds
                this.renderAnimation(animation);
                
                if (progress >= 1) {
                    if (animation.loop) {
                        animation.startTime = currentTime;
                        this.resetAnimation(animation);
                    } else {
                        animation.isPlaying = false;
                        if (animation.onComplete) {
                            animation.onComplete();
                        }
                    }
                }
            }
        });

        if (hasActiveAnimations) {
            requestAnimationFrame(() => this.animationLoop());
        } else {
            this.isRunning = false;
        }
    }

    updateAnimation(animation, deltaTime) {
        const dt = Math.min(deltaTime / 60, 1/30); // Limit timestep for stability
        
        animation.objects.forEach(obj => {
            switch (obj.type) {
                case 'car':
                    this.updateCar(obj, dt, animation);
                    break;
                case 'pendulum':
                    this.updatePendulum(obj, dt, animation);
                    break;
            }
        });
    }

    updateCar(car, dt, animation) {
        // Update velocity if accelerating
        if (car.ax !== undefined) {
            car.vx += car.ax * dt;
        }
        
        // Update position
        car.x += car.vx * animation.pixelsPerMeter * dt;
        
        // Reset if off screen
        if (car.x > animation.canvas.getBoundingClientRect().width + car.width) {
            car.x = car.initialX;
            car.vx = car.initialVx || car.vx;
        }
    }

    updatePendulum(pendulum, dt, animation) {
        const gravity = animation.gravity || 9.8;
        const angularAcceleration = -(gravity / pendulum.length) * Math.sin(pendulum.angle);
        
        pendulum.angularVelocity += angularAcceleration * dt;
        pendulum.angle += pendulum.angularVelocity * dt;
        
        // Add damping
        pendulum.angularVelocity *= 0.999;
    }

    renderAnimation(animation) {
        const ctx = animation.ctx;
        const width = animation.canvas.getBoundingClientRect().width;
        const height = animation.canvas.getBoundingClientRect().height;
        
        // Clear canvas
        ctx.clearRect(0, 0, width, height);
        
        // Draw background/environment
        this.drawEnvironment(ctx, animation, width, height);
        
        // Draw objects
        animation.objects.forEach(obj => {
            switch (obj.type) {
                case 'car':
                    this.drawCar(ctx, obj);
                    break;
                case 'pendulum':
                    this.drawPendulum(ctx, obj);
                    break;
            }
        });
        
        // Draw info overlay
        this.drawInfoOverlay(ctx, animation, width, height);
    }

    drawEnvironment(ctx, animation, width, height) {
        
        // Draw reference grid
        ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--border-color') || '#DAD4BA';
        ctx.lineWidth = 1;
        ctx.setLineDash([2, 2]);
        
        for (let x = 50; x < width; x += 50) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
        }
        
        for (let y = 50; y < height; y += 50) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }
        
        ctx.setLineDash([]);
    }

    drawCar(ctx, car) {
        ctx.fillStyle = car.color;
        
        // Car body
        ctx.fillRect(car.x, car.y - car.height/2, car.width, car.height);
        
        // Wheels
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text-primary') || '#333';
        ctx.beginPath();
        ctx.arc(car.x + 8, car.y + car.height/2 - 2, 4, 0, 2 * Math.PI);
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(car.x + car.width - 8, car.y + car.height/2 - 2, 4, 0, 2 * Math.PI);
        ctx.fill();
        
        // Velocity vector arrow
        if (car.vx !== 0) {
            ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--warning-color') || '#DA702C';
            ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--warning-color') || '#DA702C';
            ctx.lineWidth = 3;
            
            const direction = car.vx > 0 ? 1 : -1;
            const speed = Math.abs(car.vx);
            const vectorLength = Math.min(speed * 8, 60); // Scale vector length with velocity, max 60px
            
            const startX = car.x + car.width/2;
            const startY = car.y - car.height - 10;
            const endX = startX + vectorLength * direction;
            const endY = startY;
            
            // Draw vector line
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.stroke();
            
            // Draw arrowhead
            ctx.beginPath();
            ctx.moveTo(endX, endY);
            ctx.lineTo(endX - 8 * direction, endY - 5);
            ctx.lineTo(endX - 8 * direction, endY + 5);
            ctx.closePath();
            ctx.fill();
            
            // Draw velocity label
            ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text-primary') || '#333';
            ctx.font = '12px sans-serif';
            ctx.textAlign = 'center';
            const velocityText = `${speed.toFixed(1)} m/s`;
            ctx.fillText(velocityText, startX + (vectorLength * direction) / 2, startY - 8);
        }
    }

    drawPendulum(ctx, pendulum) {
        const bobX = pendulum.centerX + pendulum.length * Math.sin(pendulum.angle);
        const bobY = pendulum.centerY + pendulum.length * Math.cos(pendulum.angle);
        
        // Draw string
        ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--text-primary') || '#333';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(pendulum.centerX, pendulum.centerY);
        ctx.lineTo(bobX, bobY);
        ctx.stroke();
        
        // Draw pivot
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text-primary') || '#333';
        ctx.beginPath();
        ctx.arc(pendulum.centerX, pendulum.centerY, 5, 0, 2 * Math.PI);
        ctx.fill();
        
        // Draw bob
        ctx.fillStyle = pendulum.color;
        ctx.beginPath();
        ctx.arc(bobX, bobY, pendulum.bobRadius, 0, 2 * Math.PI);
        ctx.fill();
        
        // Add highlight
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.beginPath();
        ctx.arc(bobX - pendulum.bobRadius/3, bobY - pendulum.bobRadius/3, pendulum.bobRadius/3, 0, 2 * Math.PI);
        ctx.fill();
    }

    drawInfoOverlay(ctx, animation, width, height) {
        // Draw time indicator
        const elapsed = animation.currentTime || 0;
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text-primary') || '#333';
        ctx.font = 'bold 14px "Fira Code", monospace';
        ctx.fillText(`t = ${elapsed.toFixed(1)}s`, 10, 25);
    }

    // Control methods
    createControls(containerId, animationId) {
        const container = document.getElementById(containerId);
        const controls = document.createElement('div');
        controls.className = 'animation-controls';
        controls.innerHTML = `
            <button type="button" class="btn btn-primary" onclick="animationEngine.playAnimation('${animationId}')">▶ Play</button>
            <button type="button" class="btn btn-secondary" onclick="animationEngine.pauseAnimation('${animationId}')">⏸ Pause</button>
            <button type="button" class="btn btn-tertiary" onclick="animationEngine.stopAnimation('${animationId}')">⏹ Reset</button>
        `;
        container.appendChild(controls);
        
        return controls;
    }

    // Clean up
    destroyAnimation(animationId) {
        const animation = this.animations.get(animationId);
        if (animation) {
            animation.isPlaying = false;
            this.animations.delete(animationId);
        }
    }
}

// Global animation engine instance
window.animationEngine = new AnimationEngine();