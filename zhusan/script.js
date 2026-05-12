/* ===========================
   ZHUSAN — Steppe / Radio Signal
   Scroll-driven experience
   =========================== */

(function () {
    'use strict';

    // ---- Palette definitions ----
    const palettes = {
        dawn:  { skyTop: [26, 21, 32],  skyBottom: [45, 31, 42],  horizon: [212, 165, 116], text: [232, 221, 208], muted: [168, 152, 128], glow: [0, 0, 0],     wormwood: [74, 90, 58],  wormwoodGlow: [0, 0, 0],      stars: 0,   smoke: 0,   shimmer: 0 },
        day:   { skyTop: [143, 168, 184], skyBottom: [176, 190, 180], horizon: [196, 181, 154], text: [60, 55, 48],   muted: [120, 110, 95],  glow: [0, 0, 0],     wormwood: [90, 120, 60], wormwoodGlow: [0, 0, 0],      stars: 0,   smoke: 0,   shimmer: 0.3 },
        dusk:  { skyTop: [45, 31, 26],   skyBottom: [80, 45, 25],   horizon: [196, 90, 26],   text: [232, 200, 170], muted: [180, 140, 100], glow: [0, 0, 0],     wormwood: [80, 80, 40],  wormwoodGlow: [0, 0, 0],      stars: 0,   smoke: 0.6, shimmer: 0 },
        night: { skyTop: [10, 10, 10],   skyBottom: [13, 26, 13],   horizon: [20, 30, 15],    text: [160, 180, 140], muted: [100, 130, 80],  glow: [42, 74, 26],  wormwood: [50, 80, 35],  wormwoodGlow: [60, 120, 30],  stars: 1,   smoke: 0,   shimmer: 0 }
    };

    // Scroll zone boundaries (6 sections: dawn, day, world, dusk, night, end)
    const zones = [
        { start: 0,    end: 0.12, from: 'dawn',  to: 'day'   },
        { start: 0.12, end: 0.35, from: 'day',   to: 'day'   },
        { start: 0.35, end: 0.55, from: 'day',   to: 'dusk'  },
        { start: 0.55, end: 0.70, from: 'dusk',  to: 'dusk'  },
        { start: 0.70, end: 0.85, from: 'dusk',  to: 'night' },
        { start: 0.85, end: 1.00, from: 'night', to: 'night' }
    ];

    // ---- Character dialogues ----
    var characterDialogues = {
        artem: [
            'Полынь пахнет как бабушкин шкаф. Горько. Знакомо.',
            'Двести километров. Бензин на сто. Математика простая.',
            'Мотоцикл тянет. Пока тянет.',
            'Ночью степь гудит. Или это в голове.',
            'Записка на карте: \u00abне сворачивать\u00bb. Чьим почерком?',
            'Воды хватит до утра. Потом \u2014 посмотрим.',
            'Не один. Это хуже или лучше?'
        ],
        asem: [
            'Не трогай. Оно кусается.',
            'Тут стреляют на звук. Запомни.',
            'Жусан растёт только там, где мёртвая земля.',
            'Патроны считай. Я считаю.',
            'Курчатов \u2014 не город. Это ловушка.',
            'Тихо. Ветер поменялся.',
            'Иди за мной. Молча.'
        ],
        erzhanov: [
            'Приказы не обсуждаются. Особенно мои.',
            'Шестнадцать человек. Было сорок.',
            'Полигон молчит три дня. Это плохой знак.',
            'Частоту менять каждые шесть часов. Без исключений.',
            'Три пальца. Три причины не задавать вопросов.',
            'Периметр держим. Вопрос \u2014 от чего.'
        ]
    };
    var characterIndices = { artem: 0, asem: 0, erzhanov: 0 };

    // ---- Radio tuner stations ----
    var radioStations = [
        { center: 91.4, range: 0.4, faction: '\u0412\u043e\u0435\u043d\u043d\u0430\u044f \u0431\u0430\u0437\u0430',
          messages: [
              '\u0411\u0430\u0437\u0430 \u2014 \u043f\u0430\u0442\u0440\u0443\u043b\u044e. \u041f\u0435\u0440\u0438\u043c\u0435\u0442\u0440 \u0447\u0438\u0441\u0442. \u0428\u0442\u043e\u043b\u044c\u043d\u0438 \u043c\u043e\u043b\u0447\u0430\u0442.',
              '\u041f\u043e\u0432\u0442\u043e\u0440\u044f\u044e: \u043f\u0440\u0438\u043a\u0430\u0437 17-\u0411, \u043d\u0435 \u043f\u043e\u043a\u0438\u0434\u0430\u0442\u044c \u043f\u043e\u0437\u0438\u0446\u0438\u0438.',
              '\u0420\u0430\u0446\u0438\u044f 3 \u043d\u0435 \u0432\u044b\u0445\u043e\u0434\u0438\u0442 \u043d\u0430 \u0441\u0432\u044f\u0437\u044c. \u0422\u0440\u0435\u0442\u0438\u0439 \u0447\u0430\u0441.',
              '\u041a\u0430\u0440\u0430\u0432\u0430\u043d \u0441 \u0432\u043e\u0441\u0442\u043e\u043a\u0430. \u0414\u0432\u0430 \u0447\u0435\u043b\u043e\u0432\u0435\u043a\u0430. \u041c\u043e\u0442\u043e\u0446\u0438\u043a\u043b.'
          ]},
        { center: 95.5, range: 0.3, faction: '\u0414\u043e\u0440\u043e\u0436\u043d\u0438\u043a\u0438',
          messages: [
              '\u0411\u0440\u0430\u0442\u0430\u043d, \u0443 \u043a\u043e\u0433\u043e \u0431\u0435\u043d\u0437\u0438\u043d? \u041c\u0435\u043d\u044f\u044e \u043d\u0430 \u0442\u0443\u0448\u0451\u043d\u043a\u0443.',
              '\u0422\u0440\u0430\u043a\u0442 \u043f\u0435\u0440\u0435\u043a\u0440\u044b\u0442 \u0443 \u0421\u0435\u043c\u0435\u044f. \u041e\u0431\u044a\u0435\u0437\u0434 \u0447\u0435\u0440\u0435\u0437 \u0441\u0442\u0435\u043f\u044c.',
              '\u0412\u0438\u0434\u0435\u043b \u043a\u0430\u0440\u0430\u0432\u0430\u043d \u0443 \u041a\u0443\u0440\u0447\u0430\u0442\u043e\u0432\u0430. \u0421\u0435\u0440\u044c\u0451\u0437\u043d\u044b\u0435 \u0440\u0435\u0431\u044f\u0442\u0430.',
              '\u041d\u0435 \u0435\u0437\u0434\u0438 \u043d\u043e\u0447\u044c\u044e. \u041f\u0440\u043e\u0441\u0442\u043e \u043d\u0435 \u0435\u0437\u0434\u0438.'
          ]},
        { center: 100.6, range: 0.2, faction: '\u041a\u0443\u043b\u044c\u0442 \u0427\u0438\u0441\u0442\u044b\u0445',
          messages: [
              '\u0416\u0443\u0441\u0430\u043d \u2014 \u043d\u0435 \u0442\u0440\u0430\u0432\u0430. \u0416\u0443\u0441\u0430\u043d \u2014 \u043f\u0430\u043c\u044f\u0442\u044c \u0437\u0435\u043c\u043b\u0438.',
              '\u041f\u043e\u043b\u0438\u0433\u043e\u043d \u0434\u044b\u0448\u0438\u0442. \u0421\u043b\u0443\u0448\u0430\u0439 \u043f\u043e\u0447\u0432\u0443.',
              '\u041e\u043d\u0438 \u0443\u0448\u043b\u0438 \u0432 \u0448\u0442\u043e\u043b\u044c\u043d\u0438. \u0414\u043e\u0431\u0440\u043e\u0432\u043e\u043b\u044c\u043d\u043e.',
              '\u041e\u0447\u0438\u0449\u0435\u043d\u0438\u0435 \u0431\u043b\u0438\u0437\u043a\u043e. \u0421\u0442\u0435\u043f\u044c \u0437\u043d\u0430\u0435\u0442.'
          ]},
        { center: 105.2, range: 0.2, faction: '???',
          messages: [
              '50\u00b043\u2032N 78\u00b038\u2032E ... ... ...',
              '[\u0449\u0435\u043b\u0447\u043a\u0438] ... [\u0442\u0438\u0448\u0438\u043d\u0430] ... [\u0449\u0435\u043b\u0447\u043a\u0438]',
              '... \u0437\u043e\u043d\u0430 ... \u0430\u043a\u0442\u0438\u0432\u043d\u0430 ... \u043d\u0435 \u0432\u0445\u043e\u0434\u0438\u0442\u044c ...',
              '17. 4. 12. 0. 0. 0.'
          ]}
    ];

    // ---- Utility functions ----
    function lerp(a, b, t) {
        return a + (b - a) * t;
    }

    function lerpColor(c1, c2, t) {
        return [
            Math.round(lerp(c1[0], c2[0], t)),
            Math.round(lerp(c1[1], c2[1], t)),
            Math.round(lerp(c1[2], c2[2], t))
        ];
    }

    function rgbStr(c) {
        return 'rgb(' + c[0] + ', ' + c[1] + ', ' + c[2] + ')';
    }

    function clamp01(v) {
        return Math.max(0, Math.min(1, v));
    }

    // ---- State ----
    var ticking = false;
    var isTabVisible = true;
    var wormwoodElements = [];
    var mouseX = 0;
    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var lastGlitchTime = 0;
    var terminusTriggered = false;
    var tunerFreq = 88.0;
    var tunerDragging = false;
    var standingOnesData = [];

    // ---- DOM refs ----
    var root = document.documentElement;
    var wormwoodField = document.getElementById('wormwood-field');
    var radioIndicator = document.getElementById('radio-indicator');
    var radioMessages = document.querySelectorAll('[data-radio]');
    var revealElements = document.querySelectorAll('[data-reveal]');
    var typewriterElements = document.querySelectorAll('[data-typewriter]');

    // New DOM refs
    var hud = document.getElementById('hud');
    var hudDay = document.getElementById('hud-day');
    var hudAmmo = document.getElementById('hud-ammo');
    var hudFuel = document.getElementById('hud-fuel');
    var hudFuelPct = document.getElementById('hud-fuel-pct');
    var hudTemp = document.getElementById('hud-temp');
    var disturbance = document.getElementById('disturbance');
    var vignette = document.getElementById('vignette');
    var routeMarker = document.getElementById('route-marker');
    var routePoints = document.querySelectorAll('.route-point');

    // ---- Color interpolation engine ----
    function getScrollProgress() {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        var docHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (docHeight <= 0) return 0;
        return clamp01(scrollTop / docHeight);
    }

    function interpolatePalette(progress) {
        var zone = zones[zones.length - 1];
        for (var i = 0; i < zones.length; i++) {
            if (progress >= zones[i].start && progress <= zones[i].end) {
                zone = zones[i];
                break;
            }
        }

        var zoneProgress = clamp01((progress - zone.start) / (zone.end - zone.start));
        var from = palettes[zone.from];
        var to = palettes[zone.to];

        return {
            skyTop:       lerpColor(from.skyTop, to.skyTop, zoneProgress),
            skyBottom:    lerpColor(from.skyBottom, to.skyBottom, zoneProgress),
            horizon:      lerpColor(from.horizon, to.horizon, zoneProgress),
            text:         lerpColor(from.text, to.text, zoneProgress),
            muted:        lerpColor(from.muted, to.muted, zoneProgress),
            glow:         lerpColor(from.glow, to.glow, zoneProgress),
            wormwood:     lerpColor(from.wormwood, to.wormwood, zoneProgress),
            wormwoodGlow: lerpColor(from.wormwoodGlow, to.wormwoodGlow, zoneProgress),
            stars:        lerp(from.stars, to.stars, zoneProgress),
            smoke:        lerp(from.smoke, to.smoke, zoneProgress),
            shimmer:      lerp(from.shimmer, to.shimmer, zoneProgress)
        };
    }

    function applyPalette(p) {
        root.style.setProperty('--sky-top', rgbStr(p.skyTop));
        root.style.setProperty('--sky-bottom', rgbStr(p.skyBottom));
        root.style.setProperty('--horizon-color', rgbStr(p.horizon));
        root.style.setProperty('--text-color', rgbStr(p.text));
        root.style.setProperty('--text-muted', rgbStr(p.muted));
        root.style.setProperty('--glow-color', rgbStr(p.glow));
        root.style.setProperty('--wormwood-color', rgbStr(p.wormwood));
        root.style.setProperty('--wormwood-glow', rgbStr(p.wormwoodGlow));
        root.style.setProperty('--stars-opacity', p.stars.toFixed(2));
        root.style.setProperty('--smoke-opacity', p.smoke.toFixed(2));
        root.style.setProperty('--shimmer-opacity', p.shimmer.toFixed(2));
    }

    // ---- Wormwood generation ----
    function generateWormwood() {
        var isMobile = window.innerWidth <= 480;
        var count = isMobile ? 30 : 55;
        var fragment = document.createDocumentFragment();

        while (wormwoodField.firstChild) {
            wormwoodField.removeChild(wormwoodField.firstChild);
        }
        wormwoodElements = [];

        var animations = ['sway', 'sway-alt', 'sway-slow'];

        for (var i = 0; i < count; i++) {
            var el = document.createElement('div');
            el.className = 'wormwood';

            var height = 25 + Math.random() * 50;
            var width = height * (0.3 + Math.random() * 0.15);
            var left = Math.random() * 100;
            var animDuration = 3 + Math.random() * 4;
            var animDelay = Math.random() * -5;
            var animName = animations[Math.floor(Math.random() * animations.length)];

            el.style.height = height + 'px';
            el.style.width = width + 'px';
            el.style.left = left + '%';
            el.style.animationName = animName;
            el.style.animationDuration = animDuration + 's';
            el.style.animationDelay = animDelay + 's';
            el.style.animationTimingFunction = 'ease-in-out';
            el.style.animationIterationCount = 'infinite';
            el.style.opacity = (0.4 + Math.random() * 0.5).toString();

            fragment.appendChild(el);
            wormwoodElements.push({ el: el, baseLeft: left });
        }

        wormwoodField.appendChild(fragment);
    }

    // ---- Wormwood mouse interaction (desktop only) ----
    function updateWormwoodMouse() {
        if (reducedMotion || window.innerWidth <= 768) return;

        var fieldRect = wormwoodField.getBoundingClientRect();
        var relX = (mouseX - fieldRect.left) / fieldRect.width;

        for (var i = 0; i < wormwoodElements.length; i++) {
            var w = wormwoodElements[i];
            var dist = Math.abs(w.baseLeft / 100 - relX);
            if (dist < 0.15) {
                var push = (1 - dist / 0.15) * 3;
                var dir = (w.baseLeft / 100 < relX) ? -1 : 1;
                w.el.style.marginLeft = (push * dir) + 'px';
            } else {
                w.el.style.marginLeft = '0';
            }
        }
    }

    // ---- Typewriter effect ----
    function typewriter(el) {
        var text = el.getAttribute('data-typewriter');
        if (!text || el.dataset.typed === 'true') return;
        el.dataset.typed = 'true';

        var textSpan = el.parentElement.querySelector('.radio-text');
        if (!textSpan) return;

        var index = 0;
        textSpan.textContent = '';

        radioIndicator.classList.add('active');

        function typeChar() {
            if (!isTabVisible) {
                requestAnimationFrame(function () { setTimeout(typeChar, 50); });
                return;
            }

            if (index < text.length) {
                textSpan.textContent += text.charAt(index);
                index++;
                setTimeout(typeChar, 50 + Math.random() * 30);
            } else {
                setTimeout(function () {
                    el.dataset.done = 'true';
                    var anyActive = false;
                    typewriterElements.forEach(function (tw) {
                        if (tw.dataset.typed === 'true' && tw.dataset.done !== 'true') {
                            anyActive = true;
                        }
                    });
                    if (!anyActive) {
                        radioIndicator.classList.remove('active');
                    }
                }, 2000);
            }
        }

        typeChar();
    }

    // ---- Mini-typewriter for tooltips ----
    function tooltipTypewriter(textEl, text, cursorEl) {
        if (reducedMotion) {
            textEl.textContent = text;
            return;
        }
        textEl.textContent = '';
        if (cursorEl) cursorEl.style.display = '';
        var idx = 0;
        function next() {
            if (idx < text.length) {
                textEl.textContent += text.charAt(idx);
                idx++;
                setTimeout(next, 35 + Math.random() * 25);
            } else {
                if (cursorEl) {
                    setTimeout(function () { cursorEl.style.display = 'none'; }, 1500);
                }
            }
        }
        next();
    }

    // ===========================
    // NEW: HUD update
    // ===========================
    function updateHUD(progress) {
        if (progress > 0.02) {
            hud.classList.add('active');
        } else {
            hud.classList.remove('active');
            return;
        }

        // Day: 0 -> 36
        var day = Math.round(progress * 36);
        hudDay.textContent = day;

        // Ammo: 24 -> 0, quadratic easing (faster drain toward end)
        var ammoT = progress * progress;
        var ammo = Math.round(24 * (1 - ammoT));
        if (ammo < 0) ammo = 0;
        hudAmmo.textContent = ammo;
        if (ammo <= 5) {
            hudAmmo.classList.add('critical');
        } else {
            hudAmmo.classList.remove('critical');
        }

        // Fuel: 100% -> 0%
        var fuel = Math.round(100 * (1 - progress));
        if (fuel < 0) fuel = 0;
        hudFuel.style.width = fuel + '%';
        hudFuelPct.textContent = fuel + '%';
        if (fuel <= 15) {
            hudFuel.classList.add('critical');
            hudFuelPct.classList.add('critical');
        } else {
            hudFuel.classList.remove('critical');
            hudFuelPct.classList.remove('critical');
        }

        // Temperature: +35 (dawn) -> +8 (night), nonlinear (smoothstep)
        var tempT = progress * progress * (3 - 2 * progress);
        var temp = Math.round(lerp(35, 8, tempT));
        hudTemp.textContent = '+' + temp + '\u00b0C';
    }

    // ===========================
    // NEW: Disturbance overlay
    // ===========================
    function updateDisturbance(progress) {
        if (reducedMotion) return;

        var grainOpacity;
        if (progress < 0.12) {
            grainOpacity = lerp(0, 0.08, progress / 0.12);
        } else if (progress < 0.55) {
            grainOpacity = lerp(0.08, 0.2, (progress - 0.12) / 0.43);
        } else {
            grainOpacity = lerp(0.2, 0.4, (progress - 0.55) / 0.45);
        }
        disturbance.style.opacity = grainOpacity.toFixed(3);

        if (progress > 0.55) {
            disturbance.classList.add('scanlines-on');
        } else {
            disturbance.classList.remove('scanlines-on');
        }
    }

    // ===========================
    // NEW: Vignette
    // ===========================
    function updateVignette(progress) {
        var vignetteOpacity = progress * 0.4;
        vignette.style.opacity = vignetteOpacity.toFixed(3);
    }

    // ===========================
    // NEW: Route map
    // ===========================
    function updateRouteMap(progress) {
        if (!routeMarker) return;

        var stops = [
            { p: 0,    cx: 50 },
            { p: 0.30, cx: 150 },
            { p: 0.55, cx: 250 },
            { p: 0.85, cx: 350 }
        ];

        var cx = 50;
        for (var i = 0; i < stops.length - 1; i++) {
            if (progress >= stops[i].p && progress <= stops[i + 1].p) {
                var t = (progress - stops[i].p) / (stops[i + 1].p - stops[i].p);
                cx = lerp(stops[i].cx, stops[i + 1].cx, t);
                break;
            } else if (progress > stops[stops.length - 1].p) {
                cx = 350;
            }
        }

        routeMarker.setAttribute('cx', cx.toFixed(1));

        var activeIdx = 0;
        for (var j = stops.length - 1; j >= 0; j--) {
            if (progress >= stops[j].p) {
                activeIdx = j;
                break;
            }
        }

        routePoints.forEach(function (pt, idx) {
            pt.classList.remove('active', 'passed');
            if (idx === activeIdx) {
                pt.classList.add('active');
            } else if (idx < activeIdx) {
                pt.classList.add('passed');
            }
        });
    }

    // ===========================
    // NEW: Glitch text effect
    // ===========================
    function maybeGlitchText(progress) {
        if (reducedMotion || progress < 0.5) return;

        var now = Date.now();
        if (now - lastGlitchTime < 5000) return;

        var chance = (progress - 0.5) * 0.04;
        if (Math.random() > chance) return;

        lastGlitchTime = now;

        var targets = document.querySelectorAll('.fragment.revealed, .radio-text');
        if (targets.length === 0) return;

        var target = targets[Math.floor(Math.random() * targets.length)];
        target.classList.add('glitch-active');

        setTimeout(function () {
            target.classList.remove('glitch-active');
        }, 800 + Math.random() * 1200);
    }

    // ===========================
    // NEW: Character interactions
    // ===========================
    function setupCharacterInteractions() {
        var characters = document.querySelectorAll('[data-character]');
        var isMobile = window.innerWidth <= 768;

        characters.forEach(function (el) {
            var name = el.getAttribute('data-character');
            var tooltip = el.querySelector('.character-tooltip');
            var textEl = tooltip ? tooltip.querySelector('.tooltip-text') : null;
            var cursorEl = tooltip ? tooltip.querySelector('.tooltip-cursor') : null;

            function showDialogue() {
                if (!characterDialogues[name]) return;
                var dialogues = characterDialogues[name];
                var idx = characterIndices[name];
                var text = dialogues[idx];
                characterIndices[name] = (idx + 1) % dialogues.length;

                if (textEl) {
                    tooltipTypewriter(textEl, text, cursorEl);
                }
                el.classList.add('tooltip-active');
            }

            function hideDialogue() {
                el.classList.remove('tooltip-active');
            }

            if (isMobile) {
                el.addEventListener('click', function (e) {
                    e.stopPropagation();
                    showDialogue();
                });

                document.addEventListener('click', function () {
                    hideDialogue();
                });
            } else {
                el.addEventListener('mouseenter', showDialogue);
                el.addEventListener('mouseleave', hideDialogue);
                el.addEventListener('click', function (e) {
                    e.stopPropagation();
                    showDialogue();
                });
            }

            el.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    showDialogue();
                }
                if (e.key === 'Escape') {
                    hideDialogue();
                }
            });

            el.addEventListener('blur', hideDialogue);
        });
    }

    // ===========================
    // NEW: Radio tuner
    // ===========================
    function setupRadioTuner() {
        var track = document.getElementById('tuner-track');
        var knob = document.getElementById('tuner-knob');
        var freqDisplay = document.getElementById('tuner-freq');
        var signalBars = document.querySelectorAll('.tuner__bar');
        var outputEl = document.getElementById('tuner-output');

        if (!track || !knob) return;

        function freqToPercent(freq) {
            return ((freq - 88) / 20) * 100;
        }

        function percentToFreq(pct) {
            return 88 + (pct / 100) * 20;
        }

        function renderTunerOutput(station, signal) {
            // Clear existing content safely
            while (outputEl.firstChild) {
                outputEl.removeChild(outputEl.firstChild);
            }

            if (station && signal > 0.2) {
                var factionSpan = document.createElement('span');
                factionSpan.style.opacity = '0.5';
                factionSpan.style.fontSize = '0.65rem';
                factionSpan.style.letterSpacing = '0.1em';
                factionSpan.textContent = station.faction;

                var br = document.createElement('br');

                var msgIdx = Math.floor(Math.abs(tunerFreq - station.center) * 10) % station.messages.length;
                var msgText = document.createTextNode(station.messages[msgIdx]);

                outputEl.appendChild(factionSpan);
                outputEl.appendChild(br);
                outputEl.appendChild(msgText);
            } else {
                var staticSpan = document.createElement('span');
                staticSpan.className = 'tuner__static';
                staticSpan.textContent = '~ ~ ~';
                outputEl.appendChild(staticSpan);
            }
        }

        function updateTunerDisplay() {
            var pct = freqToPercent(tunerFreq);
            knob.style.left = pct + '%';
            freqDisplay.textContent = tunerFreq.toFixed(1);
            knob.setAttribute('aria-valuenow', tunerFreq.toFixed(1));

            var bestStation = null;
            var bestSignal = 0;

            for (var i = 0; i < radioStations.length; i++) {
                var s = radioStations[i];
                var dist = Math.abs(tunerFreq - s.center);
                if (dist <= s.range) {
                    var signal = 1 - (dist / s.range);
                    if (signal > bestSignal) {
                        bestSignal = signal;
                        bestStation = s;
                    }
                }
            }

            var barsOn = Math.round(bestSignal * 4);
            signalBars.forEach(function (bar, idx) {
                if (idx < barsOn) {
                    bar.classList.add('on');
                } else {
                    bar.classList.remove('on');
                }
            });

            renderTunerOutput(bestStation, bestSignal);
        }

        function setFreqFromPosition(clientX) {
            var rect = track.getBoundingClientRect();
            var pct = clamp01((clientX - rect.left) / rect.width) * 100;
            tunerFreq = Math.round(percentToFreq(pct) * 5) / 5;
            if (tunerFreq < 88) tunerFreq = 88;
            if (tunerFreq > 108) tunerFreq = 108;
            updateTunerDisplay();
        }

        knob.addEventListener('mousedown', function (e) {
            e.preventDefault();
            tunerDragging = true;
        });

        document.addEventListener('mousemove', function (e) {
            if (tunerDragging) {
                setFreqFromPosition(e.clientX);
            }
        });

        document.addEventListener('mouseup', function () {
            tunerDragging = false;
        });

        knob.addEventListener('touchstart', function (e) {
            e.preventDefault();
            tunerDragging = true;
        }, { passive: false });

        document.addEventListener('touchmove', function (e) {
            if (tunerDragging && e.touches.length > 0) {
                setFreqFromPosition(e.touches[0].clientX);
            }
        }, { passive: true });

        document.addEventListener('touchend', function () {
            tunerDragging = false;
        });

        track.addEventListener('click', function (e) {
            if (e.target === knob) return;
            setFreqFromPosition(e.clientX);
        });

        knob.addEventListener('keydown', function (e) {
            if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
                e.preventDefault();
                tunerFreq = Math.min(108, tunerFreq + 0.2);
                tunerFreq = Math.round(tunerFreq * 5) / 5;
                updateTunerDisplay();
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
                e.preventDefault();
                tunerFreq = Math.max(88, tunerFreq - 0.2);
                tunerFreq = Math.round(tunerFreq * 5) / 5;
                updateTunerDisplay();
            }
        });

        updateTunerDisplay();
    }

    // ===========================
    // NEW: Terminus animation
    // ===========================
    function setupTerminus() {
        var terminus = document.getElementById('terminus');
        var bookEmerge = document.getElementById('book-emerge');
        if (!terminus) return;

        var lines = terminus.querySelectorAll('.terminus__line');

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting && !terminusTriggered) {
                    terminusTriggered = true;
                    observer.unobserve(entry.target);

                    if (reducedMotion) {
                        lines.forEach(function (line) { line.classList.add('revealed'); });
                        if (bookEmerge) bookEmerge.classList.add('revealed');
                        return;
                    }

                    lines.forEach(function (line) {
                        var delay = parseInt(line.getAttribute('data-delay'), 10) || 0;
                        setTimeout(function () {
                            line.classList.add('revealed');
                        }, delay);
                    });

                    if (bookEmerge) {
                        setTimeout(function () {
                            bookEmerge.classList.add('revealed');
                        }, 5500);
                    }
                }
            });
        }, { threshold: 0.3 });

        observer.observe(terminus);
    }

    // ---- IntersectionObserver for reveals ----
    function setupObservers() {
        if (reducedMotion) {
            revealElements.forEach(function (el) { el.classList.add('revealed'); });
            setupTerminus();
            return;
        }

        var revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(function (el) { revealObserver.observe(el); });

        var typeObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var tw = entry.target.querySelector('[data-typewriter]');
                    if (tw) typewriter(tw);
                    typeObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.3
        });

        radioMessages.forEach(function (msg) { typeObserver.observe(msg); });

        setupTerminus();
    }

    // ---- Scroll handler ----
    function onScroll() {
        if (ticking) return;
        ticking = true;

        requestAnimationFrame(function () {
            var progress = getScrollProgress();
            var palette = interpolatePalette(progress);
            applyPalette(palette);
            updateHUD(progress);
            updateDisturbance(progress);
            updateVignette(progress);
            updateRouteMap(progress);
            maybeGlitchText(progress);
            updateStandingOnes(progress);
            ticking = false;
        });
    }

    // ---- Resize handler ----
    var resizeTimer;
    function onResize() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            generateWormwood();
            generateStandingOnes();
        }, 250);
    }

    // ---- Tab visibility ----
    function onVisibilityChange() {
        isTabVisible = !document.hidden;
    }

    // ---- Mouse tracking ----
    function onMouseMove(e) {
        mouseX = e.clientX;
        if (!reducedMotion) {
            requestAnimationFrame(updateWormwoodMouse);
        }
    }

    // ===========================
    // Standing ones (horizon figures)
    // ===========================
    function generateStandingOnes() {
        var container = document.getElementById('standing-ones');
        if (!container) return;

        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
        standingOnesData = [];

        var isMobile = window.innerWidth <= 768;
        var count = isMobile ? 18 : 35;
        var closeCount = isMobile ? 5 : 10;
        var fragment = document.createDocumentFragment();

        for (var i = 0; i < count; i++) {
            var el = document.createElement('div');
            var isClose = i >= count - closeCount;

            var width = isClose ? (12 + Math.random() * 8) : (8 + Math.random() * 10);
            var height = isClose ? (100 + Math.random() * 60) : (80 + Math.random() * 70);
            var left = 5 + Math.random() * 90;
            var tilt = (Math.random() - 0.5) * 12;
            // First figures from the very start (0.01), progressively more towards night; close ones late
            var t = i / count;
            var threshold = isClose ? (0.45 + Math.random() * 0.2) : (0.01 + t * 0.45 + Math.random() * 0.06);
            // Strong opacity: close ones up to 0.6, far ones up to 0.4
            var maxOpacity = isClose ? (0.3 + Math.random() * 0.3) : (0.15 + Math.random() * 0.25);
            var animDuration = 6 + Math.random() * 8;
            var animName = Math.random() > 0.5 ? 'standing-sway' : 'standing-sway-alt';

            el.className = 'standing-one' + (isClose ? ' standing-one--close' : '');
            el.style.left = left + '%';
            el.style.width = width + 'px';
            el.style.height = height + 'px';
            el.style.setProperty('--so-tilt', tilt + 'deg');

            if (!reducedMotion) {
                el.style.animationName = animName;
                el.style.animationDuration = animDuration + 's';
                el.style.animationTimingFunction = 'ease-in-out';
                el.style.animationIterationCount = 'infinite';
                el.style.animationDelay = (Math.random() * -10) + 's';
            }

            fragment.appendChild(el);
            standingOnesData.push({
                el: el,
                threshold: threshold,
                maxOpacity: maxOpacity
            });
        }

        container.appendChild(fragment);
    }

    function updateStandingOnes(progress) {
        for (var i = 0; i < standingOnesData.length; i++) {
            var s = standingOnesData[i];
            var fadeStart = s.threshold;
            var fadeEnd = fadeStart + 0.15;
            var fadeT = clamp01((progress - fadeStart) / (fadeEnd - fadeStart));
            var targetOpacity = fadeT * s.maxOpacity;
            s.el.style.opacity = targetOpacity.toFixed(3);
        }
    }

    // ---- Init ----
    function init() {
        generateWormwood();
        generateStandingOnes();

        var initialProgress = getScrollProgress();
        var initialPalette = interpolatePalette(initialProgress);
        applyPalette(initialPalette);

        updateHUD(initialProgress);
        updateDisturbance(initialProgress);
        updateVignette(initialProgress);
        updateRouteMap(initialProgress);
        updateStandingOnes(initialProgress);

        setupObservers();
        setupCharacterInteractions();
        setupRadioTuner();

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onResize, { passive: true });
        document.addEventListener('visibilitychange', onVisibilityChange);

        if (!reducedMotion && window.innerWidth > 768) {
            document.addEventListener('mousemove', onMouseMove, { passive: true });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
