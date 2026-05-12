/* ===========================
   STALKER — Found PDA
   Interactive terminal experience
   =========================== */

(function () {
    'use strict';

    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ---- DOM refs ----
    var boot = document.getElementById('boot');
    var pda = document.getElementById('pda');
    var pdaScreen = document.getElementById('pda-screen');

    // Status bar
    var pdaDate = document.getElementById('pda-date');
    var batteryLevel = document.getElementById('battery-level');
    var batteryPct = document.getElementById('battery-pct');
    var signalBars = document.querySelectorAll('.signal-bar');

    // Footer
    var pdaBolts = document.getElementById('pda-bolts');
    var pdaGroup = document.getElementById('pda-group');
    var pdaRad = document.getElementById('pda-rad');

    // Notes
    var noteBolts = document.getElementById('note-bolts');
    var noteBowls = {
        filin: document.getElementById('note-bowl-filin'),
        leshch: document.getElementById('note-bowl-leshch'),
        grom: document.getElementById('note-bowl-grom')
    };

    // Flicker
    var pdaFlicker = document.getElementById('pda-flicker');

    // Tabs & panels
    var tabs = document.querySelectorAll('.pda__tab');
    var panels = document.querySelectorAll('.pda__panel');
    var pdaHeader = document.querySelector('.pda__header');

    // Journal entries
    var entries = document.querySelectorAll('.entry');
    var dividers = document.querySelectorAll('.entry__divider');
    var pdaDeath = document.getElementById('pda-death');
    var bookReveal = document.getElementById('book-reveal');

    // Contacts
    var contacts = {
        filin: document.getElementById('contact-filin'),
        leshch: document.getElementById('contact-leshch'),
        grom: document.getElementById('contact-grom')
    };

    // Map (0:Кордон, 1:Свалка, 2:Т.Долина, 3:Агропром, 4:Бар, 5:Янтарь, 6:Арм.Склады, 7:Рыжий лес)
    var mapPoints = [
        document.getElementById('map-p0'),
        document.getElementById('map-p1'),
        document.getElementById('map-p2'),
        document.getElementById('map-p3'),
        document.getElementById('map-p4'),
        document.getElementById('map-p5'),
        document.getElementById('map-p6'),
        document.getElementById('map-p7')
    ];
    var mapMarker = document.getElementById('map-marker');

    // ---- State ----
    var currentProgress = 0;
    var targetProgress = 0;
    var activeTab = 'journal';
    var ticking = false;
    var smoothing = false;
    var lastGlitchTime = 0;
    var booted = false;

    // ---- Date labels by progress ----
    var dateLabels = [
        { p: 0,    label: 'АПР 2006' },
        { p: 0.10, label: 'ЛЕТО 2006' },
        { p: 0.15, label: 'ОСН 2006' },
        { p: 0.22, label: '2008' },
        { p: 0.33, label: '2009' },
        { p: 0.44, label: '2010' },
        { p: 0.60, label: '2010' },
        { p: 0.80, label: '███' },
        { p: 0.98, label: '---' }
    ];

    // ---- Map positions by progress (main route only, stops at Бар) ----
    var mapStops = [
        { p: 0,    cx: 200, cy: 535, point: 0 },  // КОРДОН
        { p: 0.20, cx: 185, cy: 430, point: 1 },  // СВАЛКА
        { p: 0.45, cx: 140, cy: 340, point: 3 },  // АГРОПРОМ
        { p: 0.75, cx: 225, cy: 250, point: 4 }   // БАР — данные обрываются
    ];
    // Side branches (Т.Долина=2, Янтарь=5) and northern points (6,7) are static

    // ---- Utility ----
    function lerp(a, b, t) {
        return a + (b - a) * Math.max(0, Math.min(1, t));
    }

    function clamp01(v) {
        return Math.max(0, Math.min(1, v));
    }

    // ---- Boot sequence ----
    function runBoot() {
        var lines = boot.querySelectorAll('.boot__line');
        var lastLine = lines[lines.length - 1];
        var bootButtons = document.getElementById('boot-buttons');

        if (reducedMotion) {
            lines.forEach(function (l) { l.classList.add('visible'); });
            lastLine.addEventListener('click', enterPDA);
            if (bootButtons) {
                bootButtons.classList.add('ready');
                bootButtons.addEventListener('click', enterPDA);
            }
            return;
        }

        lines.forEach(function (line) {
            var delay = parseInt(line.getAttribute('data-delay'), 10) || 0;
            setTimeout(function () {
                line.classList.add('visible');
            }, delay);
        });

        // Enable buttons area after last line appears
        var lastDelay = parseInt(lastLine.getAttribute('data-delay'), 10) || 3500;
        setTimeout(function () {
            if (bootButtons) {
                bootButtons.classList.add('ready');
                bootButtons.addEventListener('click', enterPDA);
            }
        }, lastDelay);

        lastLine.addEventListener('click', enterPDA);

        // Also allow Enter key
        document.addEventListener('keydown', function onKey(e) {
            if (e.key === 'Enter' && !booted) {
                enterPDA();
                document.removeEventListener('keydown', onKey);
            }
        });
    }

    function enterPDA() {
        if (booted) return;
        booted = true;

        boot.classList.add('hidden');
        pda.classList.add('active');

        setTimeout(function () {
            boot.style.display = 'none';
        }, 800);

        // Initialize after PDA visible
        setTimeout(function () {
            setupObservers();
            onScroll();
        }, 100);
    }

    // ---- Tab switching ----
    function setupTabs() {
        tabs.forEach(function (tab) {
            tab.addEventListener('click', function () {
                var target = tab.getAttribute('data-tab');

                tabs.forEach(function (t) {
                    t.classList.remove('pda__tab--active');
                    t.setAttribute('aria-selected', 'false');
                });
                tab.classList.add('pda__tab--active');
                tab.setAttribute('aria-selected', 'true');

                panels.forEach(function (p) {
                    p.classList.remove('pda__panel--active');
                });
                var panel = document.querySelector('[data-panel="' + target + '"]');
                if (panel) panel.classList.add('pda__panel--active');

                activeTab = target;

                // Reset progress and scroll on tab switch
                currentProgress = 0;
                targetProgress = 0;
                smoothing = false;

                window.scrollTo(0, 0);

                updatePDA(0);

                // Trigger flicker on tab switch
                triggerFlicker();
            });
        });
    }

    // ---- Contact expand ----
    function setupContacts() {
        var contactEls = document.querySelectorAll('.contact');
        contactEls.forEach(function (el) {
            el.addEventListener('click', function () {
                var wasExpanded = el.classList.contains('expanded');
                contactEls.forEach(function (c) { c.classList.remove('expanded'); });
                if (!wasExpanded) el.classList.add('expanded');
            });
        });
    }

    // ---- Scroll progress ----
    function getScrollProgress() {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        var docHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (docHeight <= 0) return 0;
        return clamp01(scrollTop / docHeight);
    }

    // ---- Update everything based on progress ----
    function updatePDA(progress) {
        updateStatusBar(progress);
        updateFooter(progress);
        updateDegradation(progress);
        updateContacts(progress);
        updateMap(progress);
        updateNotes(progress);
        maybeGlitch(progress);
    }

    function updateStatusBar(progress) {
        // Date
        var label = dateLabels[0].label;
        for (var i = dateLabels.length - 1; i >= 0; i--) {
            if (progress >= dateLabels[i].p) {
                label = dateLabels[i].label;
                break;
            }
        }
        pdaDate.textContent = label;

        // Battery: 87% → 3%
        var battery = Math.round(lerp(87, 3, progress));
        batteryPct.textContent = battery + '%';
        batteryLevel.style.width = battery + '%';

        batteryLevel.classList.remove('low', 'critical');
        batteryPct.classList.remove('critical');

        if (battery <= 10) {
            batteryLevel.classList.add('critical');
            batteryPct.classList.add('critical');
        } else if (battery <= 30) {
            batteryLevel.classList.add('low');
        }

        // Signal: 4 bars → 0 bars
        var activeBars = Math.round(lerp(4, 0, progress));
        signalBars.forEach(function (bar, idx) {
            bar.classList.remove('active', 'lost');
            if (idx < activeBars) {
                bar.classList.add('active');
            } else {
                bar.classList.add('lost');
            }
        });
    }

    function updateFooter(progress) {
        // Bolts: 60 → 0
        var bolts = Math.max(0, Math.round(lerp(60, 0, progress)));
        pdaBolts.textContent = bolts;
        if (bolts <= 5) pdaBolts.classList.add('critical');
        else pdaBolts.classList.remove('critical');

        // Group
        pdaGroup.textContent = '4/4';

        // Radiation: 12 → 1200
        var rad = Math.round(lerp(12, 1200, progress * progress));
        pdaRad.textContent = rad + ' мкР/ч';
        if (rad > 400) pdaRad.classList.add('critical');
        else pdaRad.classList.remove('critical');
    }

    function updateDegradation(progress) {
        var root = document.documentElement;

        // Noise: 0 → 0.12
        var noise = progress < 0.3 ? 0 : (progress - 0.3) * 0.17;
        root.style.setProperty('--noise-opacity', clamp01(noise).toFixed(3));

        // Scanlines: 0 → 0.25
        var scanlines = progress < 0.2 ? 0 : (progress - 0.2) * 0.31;
        root.style.setProperty('--scanline-opacity', clamp01(scanlines).toFixed(3));

        // Cracks: appear after progress 0.50
        var cracks = progress < 0.50 ? 0 : (progress - 0.50) * 2;
        root.style.setProperty('--crack-opacity', clamp01(cracks).toFixed(3));

        // Screen hue shift: 0 → 30deg (green → amber → reddish)
        var hue = progress < 0.40 ? 0 : (progress - 0.40) * 50;
        root.style.setProperty('--screen-hue', Math.min(hue, 30) + 'deg');

        // Desaturation in late stages
        var sat = progress < 0.70 ? 1 : lerp(1, 0.6, (progress - 0.70) / 0.30);
        root.style.setProperty('--screen-saturate', sat.toFixed(2));

        // Brightness drop in final stages
        var bright = progress < 0.85 ? 1 : lerp(1, 0.7, (progress - 0.85) / 0.15);
        root.style.setProperty('--screen-brightness', bright.toFixed(2));
    }

    function updateContacts(progress) {
        // All contacts stay online — no spoilers
        setContactStatus(contacts.filin, 'online', 'В СЕТИ');
        setContactStatus(contacts.leshch, 'online', 'В СЕТИ');
        setContactStatus(contacts.grom, 'online', 'В СЕТИ');
    }

    function setContactStatus(el, status, text) {
        if (!el) return;
        el.classList.remove('contact--online', 'contact--offline', 'contact--dead');
        el.classList.add('contact--' + status);
        var statusEl = el.querySelector('.contact__status');
        if (statusEl) statusEl.textContent = text;
    }

    function updateMap(progress) {
        if (!mapMarker) return;

        // Find current segment on main route
        var cx = mapStops[0].cx;
        var cy = mapStops[0].cy;
        var activeStopIdx = 0;

        for (var i = 0; i < mapStops.length - 1; i++) {
            if (progress >= mapStops[i].p && progress <= mapStops[i + 1].p) {
                var t = (progress - mapStops[i].p) / (mapStops[i + 1].p - mapStops[i].p);
                cx = lerp(mapStops[i].cx, mapStops[i + 1].cx, t);
                cy = lerp(mapStops[i].cy, mapStops[i + 1].cy, t);
                activeStopIdx = i;
                break;
            } else if (progress > mapStops[mapStops.length - 1].p) {
                cx = mapStops[mapStops.length - 1].cx;
                cy = mapStops[mapStops.length - 1].cy;
                activeStopIdx = mapStops.length - 1;
            }
        }

        mapMarker.setAttribute('cx', cx.toFixed(1));
        mapMarker.setAttribute('cy', cy.toFixed(1));

        // Only highlight main route points (from mapStops), skip side branches
        var activePointId = mapStops[activeStopIdx].point;
        var passedPoints = [];
        for (var j = 0; j < activeStopIdx; j++) {
            passedPoints.push(mapStops[j].point);
        }

        mapPoints.forEach(function (pt, idx) {
            if (!pt) return;
            pt.classList.remove('active', 'passed');
            if (idx === activePointId) {
                pt.classList.add('active');
            } else if (passedPoints.indexOf(idx) !== -1) {
                pt.classList.add('passed');
            }
        });
    }

    function updateNotes(progress) {
        // Update bolt count in notes (60 → 30, not to zero — no spoilers)
        var bolts = Math.max(30, Math.round(lerp(60, 30, progress)));
        if (noteBolts) noteBolts.textContent = bolts;

        // Bowls stay filled — no spoilers
    }

    // ---- Glitch effect ----
    function maybeGlitch(progress) {
        if (reducedMotion || progress < 0.40) return;

        var now = Date.now();
        if (now - lastGlitchTime < 3000) return;

        var chance = (progress - 0.40) * 0.08;
        if (Math.random() > chance) return;

        lastGlitchTime = now;

        // Pick a random visible entry
        var visibleEntries = document.querySelectorAll('.entry.revealed .entry__body');
        if (visibleEntries.length === 0) return;

        var target = visibleEntries[Math.floor(Math.random() * visibleEntries.length)];
        target.classList.add('glitch-active');

        setTimeout(function () {
            target.classList.remove('glitch-active');
        }, 300 + Math.random() * 500);
    }

    function triggerFlicker() {
        if (reducedMotion) return;
        pdaFlicker.classList.add('active');
        setTimeout(function () {
            pdaFlicker.classList.remove('active');
        }, 400);
    }

    // ---- IntersectionObserver for entries ----
    function setupObservers() {
        if (reducedMotion) {
            entries.forEach(function (el) { el.classList.add('revealed'); });
            dividers.forEach(function (el) { el.classList.add('revealed'); });
            if (pdaDeath) pdaDeath.classList.add('revealed');
            if (bookReveal) bookReveal.classList.add('revealed');
            return;
        }

        var entryObserver = new IntersectionObserver(function (items) {
            items.forEach(function (item) {
                if (item.isIntersecting) {
                    item.target.classList.add('revealed');

                    // Trigger flicker on loss entries
                    if (item.target.classList.contains('entry--loss')) {
                        triggerFlicker();
                    }

                    entryObserver.unobserve(item.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -40px 0px'
        });

        entries.forEach(function (el) { entryObserver.observe(el); });
        dividers.forEach(function (el) { entryObserver.observe(el); });

        // PDA death observer
        if (pdaDeath) {
            var deathObserver = new IntersectionObserver(function (items) {
                items.forEach(function (item) {
                    if (item.isIntersecting) {
                        item.target.classList.add('revealed');
                        deathObserver.unobserve(item.target);

                        // Trigger heavy flicker
                        triggerFlicker();
                        setTimeout(triggerFlicker, 500);
                        setTimeout(triggerFlicker, 1000);

                        // Reveal book after death
                        setTimeout(function () {
                            if (bookReveal) bookReveal.classList.add('revealed');
                        }, 2000);
                    }
                });
            }, { threshold: 0.3 });

            deathObserver.observe(pdaDeath);
        }
    }

    // ---- Check if an element or its ancestors have their own scrollable overflow ----
    function hasScrollableAncestor(el) {
        while (el && el !== document.body) {
            var style = window.getComputedStyle(el);
            var overflowY = style.overflowY;
            if ((overflowY === 'auto' || overflowY === 'scroll') && el.scrollHeight > el.clientHeight) {
                return true;
            }
            el = el.parentElement;
        }
        return false;
    }

    // ---- Check if page has room to scroll in a given direction ----
    function canNativeScroll(deltaY) {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        var docHeight = document.documentElement.scrollHeight - window.innerHeight;

        // Less than 10px of scroll room = effectively no content scroll
        if (docHeight <= 10) return false;

        // Scrolling down but already at bottom
        if (deltaY > 0 && scrollTop >= docHeight - 5) return false;

        // Scrolling up but already at top
        if (deltaY < 0 && scrollTop <= 5) return false;

        return true;
    }

    // ---- Scroll handler (journal tab — page scroll drives progress) ----
    function onScroll() {
        if (!booted) return;
        if (ticking) return;
        ticking = true;

        requestAnimationFrame(function () {
            if (activeTab === 'journal') {
                // Journal: page scroll → progress
                currentProgress = getScrollProgress();
                targetProgress = currentProgress;
            }
            updatePDA(currentProgress);
            ticking = false;
        });
    }

    // ---- Wheel handler (non-journal tabs — drives animation when scroll exhausted) ----
    function onWheel(e) {
        if (!booted || activeTab === 'journal') return;

        // Don't intercept scroll on the header
        if (pdaHeader && pdaHeader.contains(e.target)) return;

        // Don't intercept scroll inside elements with their own overflow (e.g. expanded contacts)
        if (hasScrollableAncestor(e.target)) return;

        // If the tab content has native scroll room in this direction, let it scroll
        if (canNativeScroll(e.deltaY)) return;

        // Content exhausted (or none) — capture wheel and drive animation
        e.preventDefault();

        var delta = e.deltaY;
        if (e.deltaMode === 1) delta *= 40;
        if (e.deltaMode === 2) delta *= 800;

        targetProgress = clamp01(targetProgress + delta * 0.0008);

        if (!smoothing) startSmoothing();
    }

    // ---- Touch handlers (mobile — same logic as wheel) ----
    var touchStartY = 0;

    function onTouchStart(e) {
        if (!booted || activeTab === 'journal') return;
        touchStartY = e.touches[0].clientY;
    }

    function onTouchMove(e) {
        if (!booted || activeTab === 'journal') return;

        // Don't intercept touches on the header (tabs, statusbar)
        if (pdaHeader && pdaHeader.contains(e.target)) return;

        // Don't intercept scroll inside elements with their own overflow
        if (hasScrollableAncestor(e.target)) return;

        var dy = touchStartY - e.touches[0].clientY;
        touchStartY = e.touches[0].clientY;

        // If native scroll has room, let it work
        if (canNativeScroll(dy)) return;

        // Otherwise drive animation
        e.preventDefault();
        targetProgress = clamp01(targetProgress + dy * 0.002);
        if (!smoothing) startSmoothing();
    }

    // ---- Smooth interpolation loop ----
    function startSmoothing() {
        smoothing = true;
        requestAnimationFrame(smoothTick);
    }

    function smoothTick() {
        var diff = targetProgress - currentProgress;

        if (Math.abs(diff) < 0.001) {
            currentProgress = targetProgress;
            updatePDA(currentProgress);
            smoothing = false;
            return;
        }

        // Smooth lerp — ~12% per frame ≈ pleasant easing
        currentProgress += diff * 0.12;
        updatePDA(currentProgress);
        requestAnimationFrame(smoothTick);
    }

    // ---- Init ----
    function init() {
        setupTabs();
        setupContacts();
        runBoot();

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('wheel', onWheel, { passive: false });
        window.addEventListener('touchstart', onTouchStart, { passive: true });
        window.addEventListener('touchmove', onTouchMove, { passive: false });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
