document.addEventListener('DOMContentLoaded', () => {

    // ================================
    // Main Elements
    // ================================

    const triggerOverlay = document.getElementById('triggerOverlay');
    const startButton = document.getElementById('startButton');
    const loadingBar = document.getElementById('loadingBar');
    const statusText = document.getElementById('statusText');

    const ambientLight = document.getElementById('ambientLight');

    const roseWrapper = document.getElementById('roseWrapper');
    const roseHead = document.getElementById('roseHead');
    const calyx = document.getElementById('calyx');
    const stem = document.getElementById('stem');

    const leafLeft = document.getElementById('leafLeft');
    const leafRight = document.getElementById('leafRight');

    const endText = document.getElementById('endText');
    const fallingPetalsEl = document.getElementById('fallingPetals');

    // ❤️ Special message
    const loveMessage = document.getElementById('loveMessage');


    // ================================
    // Rose Configuration
    // ================================

    const PETAL_LAYERS = [
        {
            count: 4,
            w: 24,
            h: 46,
            curl: 78,
            delayBase: 0,
            tz: 2,
            cls: 'petal-bud'
        },
        {
            count: 5,
            w: 34,
            h: 58,
            curl: 65,
            delayBase: 0.25,
            tz: 9,
            cls: 'petal-core'
        },
        {
            count: 6,
            w: 46,
            h: 72,
            curl: 48,
            delayBase: 0.55,
            tz: 18,
            cls: 'petal-inner'
        },
        {
            count: 7,
            w: 58,
            h: 88,
            curl: 22,
            delayBase: 0.90,
            tz: 30,
            cls: 'petal-mid-inner'
        },
        {
            count: 8,
            w: 72,
            h: 104,
            curl: -5,
            delayBase: 1.30,
            tz: 44,
            cls: 'petal-mid'
        },
        {
            count: 9,
            w: 86,
            h: 118,
            curl: -25,
            delayBase: 1.75,
            tz: 60,
            cls: 'petal-outer'
        },
        {
            count: 10,
            w: 98,
            h: 130,
            curl: -48,
            delayBase: 2.25,
            tz: 76,
            cls: 'petal-blush'
        }
    ];

    const SEPALS_COUNT = 5;

    const FALLING_PETAL_COLORS = [
        ['#9a001d', '#3d0008'],
        ['#850018', '#2b0005'],
        ['#ad0022', '#480008'],
        ['#bf0028', '#52000c']
    ];

    let fallingPetalInterval = null;


    // ================================
    // Helper
    // ================================

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }


    // ================================
    // Loading Screen
    // ================================

    function startCardLoader() {

        const duration = 2400;

        const steps = [
            {
                threshold: 20,
                text: 'Loading Love.css...'
            },
            {
                threshold: 50,
                text: 'Growing digital petals...'
            },
            {
                threshold: 80,
                text: 'Adding velvet textures...'
            },
            {
                threshold: 95,
                text: 'Optimizing 3D rendering...'
            },
            {
                threshold: 100,
                text: 'Ready to bloom!'
            }
        ];

        let startTimestamp = null;

        function animateLoader(timestamp) {

            if (!startTimestamp) {
                startTimestamp = timestamp;
            }

            const progress = Math.min(
                (timestamp - startTimestamp) / duration,
                1
            );

            const percent = Math.floor(progress * 100);

            loadingBar.style.width = `${percent}%`;

            const activeStep =
                steps.find(step => percent <= step.threshold)
                || steps[steps.length - 1];

            statusText.textContent = activeStep.text;

            if (progress < 1) {

                requestAnimationFrame(animateLoader);

            } else {

                startButton.removeAttribute('disabled');

            }
        }

        requestAnimationFrame(animateLoader);
    }


    // ================================
    // Create Sepals
    // ================================

    function createSepals() {

        for (let i = 0; i < SEPALS_COUNT; i++) {

            const sepal = document.createElement('div');

            sepal.className = 'sepal';

            const angle = (360 / SEPALS_COUNT) * i;

            sepal.style.setProperty(
                '--sepal-angle',
                `${angle}deg`
            );

            calyx.appendChild(sepal);
        }
    }


    // ================================
    // Create Rose Petals
    // ================================

    function createPetals() {

        PETAL_LAYERS.forEach(layer => {

            for (let i = 0; i < layer.count; i++) {

                const petal = document.createElement('div');

                petal.className =
                    `petal ${layer.cls}`;

                const angle =
                    (360 / layer.count) * i;

                const delay =
                    layer.delayBase + (i * 0.035);

                petal.style.width =
                    `${layer.w}px`;

                petal.style.height =
                    `${layer.h}px`;

                petal.style.setProperty(
                    '--petal-angle',
                    `${angle}deg`
                );

                petal.style.setProperty(
                    '--petal-curl',
                    `${layer.curl}deg`
                );

                petal.style.setProperty(
                    '--petal-delay',
                    `${delay}s`
                );

                petal.style.setProperty(
                    '--petal-z',
                    `${layer.tz}px`
                );

                roseHead.appendChild(petal);
            }
        });
    }


    // ================================
    // Grow Stem
    // ================================

    function growStem() {

        return new Promise(resolve => {

            stem.classList.add('grow');

            setTimeout(() => {

                leafLeft.classList.add('visible');

            }, 800);

            setTimeout(() => {

                leafRight.classList.add('visible');

            }, 1100);

            setTimeout(() => {

                resolve();

            }, 2200);
        });
    }


    // ================================
    // Bloom Rose
    // ================================

    function bloom() {

        calyx.classList.add('visible');

        ambientLight.classList.add('visible');

        roseHead.classList.add('blooming');
    }


    // ================================
    // Falling Petals
    // ================================

    function spawnFallingPetal() {

        const petal = document.createElement('div');

        petal.className = 'falling-petal';

        const colorSet =
            FALLING_PETAL_COLORS[
                Math.floor(
                    Math.random() *
                    FALLING_PETAL_COLORS.length
                )
            ];

        petal.style.setProperty(
            '--petal-color-1',
            colorSet[0]
        );

        petal.style.setProperty(
            '--petal-color-2',
            colorSet[1]
        );

        petal.style.left =
            `${Math.random() * 100}vw`;

        petal.style.top =
            `${-20 - Math.random() * 80}px`;

        const size =
            8 + Math.random() * 12;

        petal.style.width =
            `${size}px`;

        petal.style.height =
            `${size * 1.5}px`;

        const duration =
            5 + Math.random() * 5;

        petal.style.animationDuration =
            `${duration}s`;

        petal.style.animationDelay =
            `${Math.random() * 1.5}s`;

        fallingPetalsEl.appendChild(petal);

        setTimeout(() => {

            petal.remove();

        }, (duration + 2) * 1000);
    }


    function startFallingPetals() {

        if (fallingPetalInterval) {
            return;
        }

        fallingPetalInterval =
            setInterval(() => {

                spawnFallingPetal();

            }, 500);

        // Create a few immediately
        for (let i = 0; i < 5; i++) {

            setTimeout(() => {

                spawnFallingPetal();

            }, i * 250);
        }
    }


    // ================================
    // Main Rose Animation
    // ================================

    async function startAnimationSequence() {

        // Grow stem
        await growStem();

        // Small pause
        await delay(100);

        // Bloom
        bloom();


        // Start rotation
        setTimeout(() => {

            roseWrapper.classList.add('rotating');

        }, 2600);


        // Start falling petals
        setTimeout(() => {

            startFallingPetals();

        }, 3400);


        // Show ending text
        setTimeout(() => {

            endText.classList.add('visible');

        }, 4600);


        // ❤️ Show special message
        setTimeout(() => {

            if (loveMessage) {

                loveMessage.classList.add('visible');

            }

        }, 6500);
    }


    // ================================
    // Start Button
    // ================================

    startButton.addEventListener('click', () => {

        triggerOverlay.classList.add('fade-out');

        setTimeout(() => {

            startAnimationSequence();

        }, 800);
    });


    // ================================
    // Initialize Rose
    // ================================

    createSepals();

    createPetals();


    // ================================
    // Start Loader
    // ================================

    setTimeout(() => {

        startCardLoader();

    }, 400);

});
