/* ============================================================
   SCRIPT.JS - אתר הסטודיו של הדר

   הארגון:
   1. משתנים גלובליים ונתוני מוצרים
   2. עכבר מותאם + אנימציות לחיצה
   3. Canvas - רקמה/סקיצה ברקע
   4. Honeycomb - מעבר בין מצבים
   5. setMode() - הפונקציה הראשית למעבר מצב
   6. FAB - תפריט צף
   7. Modal - דף מוצר
   8. Reveal - אנימציות גלילה
   9. אתחול - DOMContentLoaded
   ============================================================ */


/* ============================================================
   1. משתנים גלובליים ונתוני מוצרים
   ============================================================ */

let currentMode = 'sashiko';

const PRODUCTS_DATA = {
    kit: {
        title: 'ערכת DIY סאשיקו',
        desc: 'כל מה שצריך כדי להתחיל: בד אינדיגו מסורתי, חוט לבן, מחט סאשיקו, מסגרת עגולה וחוברת מדריך מצולמת בעברית. מתנה מושלמת.',
        price: '150 ₪',
        images: ['images/kit.jpg', 'images/kit-detail.jpg', 'images/kit-open.jpg'],
    },
    bag: {
        title: 'תיק יד רקום',
        desc: 'כל תיק הוא עבודת יד מקורית וייחודית. בד קנבס טבעי עם רקמת סאשיקו ידנית בחוט לבן. אין שני תיקים זהים.',
        price: '220 ₪',
        images: ['images/bag.jpg', 'images/bag-detail.jpg'],
    },
    belt: {
        title: 'חגורה ברקמה מסורתית',
        desc: 'חגורה רחבה ברקמת סאשיקו על בד קנבס טבעי. דגם קוגורי-סאשי בצבע אינדיגו. מידה אחת, מתאימה לכל.',
        price: '280 ₪',
        images: ['images/belt.jpg'],
    },
    print1: {
        title: 'הדפס Fine Line — סדרה מוגבלת',
        desc: 'מוּדפס דיגיטלית על נייר ארש 300 גרם. חתום ונוּמר. מהדורה של 50 עותקים בלבד. מגיע ממוסגר.',
        price: '120 ₪',
        images: ['images/print1.jpg', 'images/print1-detail.jpg'],
    },
    lino: {
        title: 'הדפס לינולאום בעבודת יד',
        desc: 'כל הדפס חיתוך ידני, דיו ידני, הדפסה ידנית. לא תמצאי שתי עבודות זהות. גודל A4.',
        price: '90 ₪',
        images: ['images/lino.jpg'],
    },
    notebook: {
        title: 'מחברת סקיצות מעוצבת',
        desc: 'כריכה קשה, 200 עמודים של נייר DOT GRID. עיצוב משולב — חצי צד בהשראת סאשיקו, חצי בהשראת Fine Line.',
        price: '65 ₪',
        images: ['images/notebook.jpg'],
    },
};

let modalImages = [];
let modalCurrentIndex = 0;


/* ============================================================
   2. עכבר מותאם + אנימציות לחיצה
   ============================================================ */

const cursor = document.getElementById('custom-cursor');

document.addEventListener('mousemove', (e) => {
    if (cursor) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    }
});

document.addEventListener('click', (e) => {
    if (e.target.closest('button, a, .mode-switcher')) return;

    const el = document.createElement('div');
    el.className = 'click-animation';
    el.style.left = e.clientX + 'px';
    el.style.top = e.clientY + 'px';

    if (currentMode === 'sashiko') {
        el.classList.add('sewn-flower');
        el.innerHTML = `
            <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="25" y1="25" x2="25" y2="5"  stroke="#c9a96e" stroke-width="1.5" stroke-dasharray="2,2"/>
                <line x1="25" y1="25" x2="25" y2="45" stroke="#c9a96e" stroke-width="1.5" stroke-dasharray="2,2"/>
                <line x1="25" y1="25" x2="5"  y2="25" stroke="#c9a96e" stroke-width="1.5" stroke-dasharray="2,2"/>
                <line x1="25" y1="25" x2="45" y2="25" stroke="#c9a96e" stroke-width="1.5" stroke-dasharray="2,2"/>
                <line x1="25" y1="25" x2="10" y2="10" stroke="#c9a96e" stroke-width="1.5" stroke-dasharray="2,2"/>
                <line x1="25" y1="25" x2="40" y2="40" stroke="#c9a96e" stroke-width="1.5" stroke-dasharray="2,2"/>
                <line x1="25" y1="25" x2="40" y2="10" stroke="#c9a96e" stroke-width="1.5" stroke-dasharray="2,2"/>
                <line x1="25" y1="25" x2="10" y2="40" stroke="#c9a96e" stroke-width="1.5" stroke-dasharray="2,2"/>
                <circle cx="25" cy="25" r="4" fill="#c9a96e"/>
                <circle cx="25" cy="6"  r="3" stroke="#c9a96e" stroke-width="1.5" fill="none"/>
                <circle cx="25" cy="44" r="3" stroke="#c9a96e" stroke-width="1.5" fill="none"/>
                <circle cx="6"  cy="25" r="3" stroke="#c9a96e" stroke-width="1.5" fill="none"/>
                <circle cx="44" cy="25" r="3" stroke="#c9a96e" stroke-width="1.5" fill="none"/>
            </svg>`;
    } else {
        el.classList.add('ink-drop');
        el.innerHTML = `
            <svg viewBox="0 0 40 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 2 C20 2, 35 20, 35 32 C35 41.2 28.3 48 20 48 C11.7 48 5 41.2 5 32 C5 20 20 2 20 2Z"
                      fill="#1a1208" fill-opacity="0.85"/>
                <ellipse cx="15" cy="22" rx="3" ry="5" fill="white" fill-opacity="0.25" transform="rotate(-20 15 22)"/>
            </svg>`;
    }

    document.body.appendChild(el);
    setTimeout(() => el.remove(), 700);
});


/* ============================================================
   3. Canvas - רקמה/סקיצה ברקע

   הלוגיקה של drawSashikoPattern:

   א. בונים רשימת נקודות (centers[]) — רק בשוליים המסך,
      לא על אזור התוכן המרכזי.

   ב. ממיינים אותן לפי deterministicHash —
      פונקציה שנותנת לכל נקודה מספר שנראה אקראי
      אבל תמיד זהה לאותה נקודה (לא Math.random).
      תוצאה: תפרים מצטיירים בו-זמנית על כל הדף.

   ג. סופרים תפרים גלובלית (strokeBudget).
      כל יחידה מורכבת מ-12 תפרים.
      אם התקציב נגמר באמצע יחידה — מציירים חלק ממנה.
      תחושה: מחט שזזה ברצף אחד על כל הבד.
   ============================================================ */

const canvas = document.getElementById('bg-canvas');
const ctx    = canvas.getContext('2d');

let scrollProgress = 0;
let lastScrollY    = 0;
let animFrame      = null;

function resizeCanvas() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
}

function drawSashikoPattern(progress) {
    const W = canvas.width;
    const H = canvas.height;

    ctx.clearRect(0, 0, W, H);
    if (progress <= 0) return;

    ctx.save();

    const THREAD = 'rgba(215, 200, 160, 0.9)';
    const GRID   = 'rgba(180, 160, 120, 0.2)';

    ctx.lineCap  = 'round';
    ctx.lineJoin = 'round';

    const unit   = 58;
    const armLen = unit * 0.34;
    const petalR = unit * 0.17;

    // --- 8 אזורים עגולים, מוגדרים באחוזים מגודל המסך ---
    // כל אזור = { cx, cy } מרכז באחוזים, r רדיוס באחוזים
    // האזורים עגולים = אין קצוות מלבניים קשים, הדגם "נגמר" בצורה אורגנית
    const zones = [
        { cx: 0.06, cy: 0.10, r: 0.16 },  // פינה שמאל עליון
        { cx: 0.94, cy: 0.08, r: 0.14 },  // פינה ימין עליון
        { cx: 0.04, cy: 0.52, r: 0.10 },  // שמאל אמצע
        { cx: 0.96, cy: 0.48, r: 0.10 },  // ימין אמצע
        { cx: 0.08, cy: 0.90, r: 0.15 },  // פינה שמאל תחתון
        { cx: 0.92, cy: 0.92, r: 0.14 },  // פינה ימין תחתון
        { cx: 0.48, cy: 0.04, r: 0.08 },  // מרכז עליון — קטן
        { cx: 0.50, cy: 0.96, r: 0.08 },  // מרכז תחתון — קטן
    ];

    // ממירים אחוזים לפיקסלים בפועל
    // r מחושב מהממד הקטן כדי שיהיה עקבי במסכים שאינם ריבועיים
    const zonesPx = zones.map(z => ({
        cx: z.cx * W,
        cy: z.cy * H,
        r:  z.r  * Math.min(W, H),
    }));

    // בודק אם נקודה נמצאת בתוך לפחות אזור אחד (מרחק אוקלידי < רדיוס)
    function isInZone(x, y) {
        return zonesPx.some(z => {
            const dx = x - z.cx;
            const dy = y - z.cy;
            return Math.sqrt(dx * dx + dy * dy) < z.r;
        });
    }

    // --- בניית רשימת נקודות ---
    const cols = Math.ceil(W / unit) + 2;
    const rows = Math.ceil(H / unit) + 2;
    const centers = [];

    for (let r = -1; r < rows; r++) {
        for (let c = -1; c < cols; c++) {
            const x = c * unit;
            const y = r * unit;
            if (isInZone(x, y)) centers.push({ x, y, type: 'main' });

            const mx = x + unit * 0.5;
            const my = y + unit * 0.5;
            if (isInZone(mx, my)) centers.push({ x: mx, y: my, type: 'mini' });
        }
    }

    // --- ערבוב דטרמיניסטי ---
    // נותן לכל נקודה מספר קבוע שנראה אקראי — לפיזור אחיד בכל הדף
    function deterministicHash(x, y) {
        let h = Math.imul(Math.round(x) ^ 0xdeadbeef, 2654435761);
        h = Math.imul(h ^ Math.round(y), 2246822519);
        return (h >>> 0) / 0xffffffff;
    }

    centers.sort((a, b) => deterministicHash(a.x, a.y) - deterministicHash(b.x, b.y));

    // --- שלב 1: קווי רשת (סימוני גיר לפני התפירה) ---
    ctx.strokeStyle = GRID;
    ctx.lineWidth   = 0.5;
    ctx.setLineDash([1, unit * 0.4]);

    const gridProgress = Math.min(1, progress * 2.5);
    const visibleGrid  = Math.floor(centers.length * gridProgress);

    centers.slice(0, visibleGrid).forEach(pt => {
        if (pt.type !== 'main') return;
        const s = 3;
        ctx.beginPath();
        ctx.moveTo(pt.x - s, pt.y); ctx.lineTo(pt.x + s, pt.y);
        ctx.moveTo(pt.x, pt.y - s); ctx.lineTo(pt.x, pt.y + s);
        ctx.stroke();
    });

    ctx.setLineDash([]);

    // --- שלב 2: תפר אחר תפר ---
    // main = 5 תפרים: עיגול + 4 עלים
    // mini = 2 תפרים: קו אופקי + קו אנכי
    const STROKES_MAIN = 5;
    const STROKES_MINI = 2;

    const totalStrokes = centers.reduce((sum, pt) =>
        sum + (pt.type === 'main' ? STROKES_MAIN : STROKES_MINI), 0);

    const embProgress    = Math.max(0, (progress - 0.15) / 0.85);
    const visibleStrokes = Math.floor(totalStrokes * embProgress);

    let strokeBudget = visibleStrokes;

    centers.forEach(pt => {
        if (strokeBudget <= 0) return;
        if (pt.type === 'main') {
            drawHanaUnit(pt.x, pt.y, armLen, petalR, THREAD, 2.2, strokeBudget);
            strokeBudget -= STROKES_MAIN;
        } else {
            drawMiniCross(pt.x, pt.y, armLen * 0.4, THREAD, 1.6, strokeBudget);
            strokeBudget -= STROKES_MINI;
        }
    });

    ctx.restore();

    // --- פונקציות ציור ---

    function drawHanaUnit(cx, cy, arm, pR, color, lw, budget) {
        ctx.strokeStyle = color;
        ctx.lineCap = 'round';
        let b = budget;

        // עיגול מרכזי
        if (b <= 0) return;
        ctx.lineWidth = lw;
        ctx.beginPath();
        ctx.arc(cx, cy, pR, 0, Math.PI * 2);
        ctx.stroke();
        b--;

        // 4 עלים עדשתיים — צורה לקוחה ישירות מה-SVG הרפרנס:
        // "M0,-11 C4,-18 10,-22 0,-26 C-10,-22 -4,-18 0,-11"
        // כל עלה = שתי קשתות bezier שיוצרות עדשה סגורה
        const r     = pR;
        const lh    = arm * 1.1;   // גובה העלה
        const lw2   = arm * 0.38;  // רוחב הכיפוף

        // סדר הציור: מעלה → ימין → מטה → שמאל (כמו תנועת מחט)
        const leaves = [
            // מעלה: M(0,-r) C(lw2,-(r+lh*0.55)) (lw2,-(r+lh*0.9)) (0,-(r+lh))
            [0,-r,  lw2,-(r+lh*0.55),  lw2,-(r+lh*0.9),  0,-(r+lh),
                   -lw2,-(r+lh*0.9), -lw2,-(r+lh*0.55),  0,-r],
            // ימין
            [r,0,  r+lh*0.55,lw2,  r+lh*0.9,lw2,  r+lh,0,
                   r+lh*0.9,-lw2,  r+lh*0.55,-lw2,  r,0],
            // מטה
            [0,r,  lw2,r+lh*0.55,  lw2,r+lh*0.9,  0,r+lh,
                  -lw2,r+lh*0.9, -lw2,r+lh*0.55,  0,r],
            // שמאל
            [-r,0, -(r+lh*0.55),lw2, -(r+lh*0.9),lw2, -(r+lh),0,
                   -(r+lh*0.9),-lw2, -(r+lh*0.55),-lw2, -r,0],
        ];

        ctx.lineWidth = lw * 0.9;
        for (const l of leaves) {
            if (b <= 0) return;
            ctx.beginPath();
            // moveTo נקודת ההתחלה (על קצה העיגול)
            ctx.moveTo(cx + l[0], cy + l[1]);
            // צד ימני של העלה
            ctx.bezierCurveTo(
                cx + l[2], cy + l[3],
                cx + l[4], cy + l[5],
                cx + l[6], cy + l[7]
            );
            // צד שמאלי (חזרה)
            ctx.bezierCurveTo(
                cx + l[8],  cy + l[9],
                cx + l[10], cy + l[11],
                cx + l[12], cy + l[13]
            );
            ctx.stroke();
            b--;
        }
    }

    function drawMiniCross(cx, cy, arm, color, lw, budget) {
        ctx.strokeStyle = color;
        ctx.lineWidth   = lw;
        if (budget >= 1) {
            ctx.beginPath();
            ctx.moveTo(cx - arm, cy); ctx.lineTo(cx + arm, cy);
            ctx.stroke();
        }
        if (budget >= 2) {
            ctx.beginPath();
            ctx.moveTo(cx, cy - arm); ctx.lineTo(cx, cy + arm);
            ctx.stroke();
        }
    }
} 

function drawTattooSketch(progress) {
    const W = canvas.width;
    const H = canvas.height;

    ctx.clearRect(0, 0, W, H);
    if (progress <= 0) return;

    ctx.save();
    ctx.strokeStyle = 'rgba(26, 18, 8, 0.12)';
    ctx.lineWidth   = 0.8;
    ctx.lineCap     = 'round';

    const anchors = [
        { x: W * 0.2,  y: H * 0.1  },
        { x: W * 0.5,  y: H * 0.2  },
        { x: W * 0.8,  y: H * 0.05 },
        { x: W * 0.9,  y: H * 0.4  },
        { x: W * 0.7,  y: H * 0.6  },
        { x: W * 0.85, y: H * 0.85 },
        { x: W * 0.5,  y: H * 0.95 },
        { x: W * 0.15, y: H * 0.8  },
        { x: W * 0.1,  y: H * 0.5  },
        { x: W * 0.3,  y: H * 0.35 },
        { x: W * 0.5,  y: H * 0.55 },
        { x: W * 0.65, y: H * 0.3  },
    ];

    const visibleCurves = Math.floor((anchors.length - 1) * progress);
    for (let i = 0; i < visibleCurves; i++) {
        const a   = anchors[i];
        const b   = anchors[i + 1];
        const cpX = (a.x + b.x) / 2 + (b.y - a.y) * 0.3;
        const cpY = (a.y + b.y) / 2 - (b.x - a.x) * 0.3;

        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.quadraticCurveTo(cpX, cpY, b.x, b.y);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(a.x, a.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(26, 18, 8, 0.15)';
        ctx.fill();
    }

    const florals = Math.floor(5 * progress);
    for (let f = 0; f < florals; f++) {
        drawFineLineFloral(
            anchors[f * 2 % anchors.length].x,
            anchors[f * 2 % anchors.length].y,
            30 + f * 10
        );
    }

    ctx.restore();
}

function drawFineLineFloral(cx, cy, size) {
    ctx.save();
    ctx.strokeStyle = 'rgba(26, 18, 8, 0.1)';
    ctx.lineWidth   = 0.6;

    for (let p = 0; p < 5; p++) {
        const angle = (p / 5) * Math.PI * 2;
        const x = cx + Math.cos(angle) * size;
        const y = cy + Math.sin(angle) * size;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.bezierCurveTo(
            cx + Math.cos(angle - 0.5) * size * 0.6,
            cy + Math.sin(angle - 0.5) * size * 0.6,
            cx + Math.cos(angle + 0.5) * size * 0.6,
            cy + Math.sin(angle + 0.5) * size * 0.6,
            x, y
        );
        ctx.stroke();
    }

    ctx.beginPath();
    ctx.arc(cx, cy, size * 0.15, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
}

window.addEventListener('scroll', () => {
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    scrollProgress  = maxScroll > 0 ? window.scrollY / maxScroll : 0;

    if (animFrame) cancelAnimationFrame(animFrame);
    animFrame = requestAnimationFrame(() => drawBackground(scrollProgress));

    lastScrollY = window.scrollY;
});

function drawBackground(progress) {
    if (currentMode === 'sashiko') {
        drawSashikoPattern(progress);
    } else {
        drawTattooSketch(progress);
    }
}


/* ============================================================
   4. Honeycomb - מעבר בין מצבים
   ============================================================ */

const honeycombOverlay = document.getElementById('honeycomb-overlay');
const honeycombGrid    = document.getElementById('honeycomb-grid');
const HEX_SIZE         = 80;

function buildHoneycomb() {
    const W    = window.innerWidth;
    const H    = window.innerHeight;
    const cols = Math.ceil(W / HEX_SIZE) + 2;
    const rows = Math.ceil(H / (HEX_SIZE * 0.866)) + 2;

    honeycombOverlay.classList.remove('active');
    honeycombGrid.innerHTML = '';

    honeycombGrid.style.gridTemplateColumns = `repeat(${cols}, ${HEX_SIZE}px)`;
    honeycombGrid.style.gridTemplateRows    = `repeat(${rows}, ${HEX_SIZE * 0.866}px)`;

    for (let i = 0; i < cols * rows; i++) {
        const hex   = document.createElement('div');
        hex.className = 'hexagon';
        hex.appendChild(Object.assign(document.createElement('div'), { className: 'hex-face hex-front' }));
        hex.appendChild(Object.assign(document.createElement('div'), { className: 'hex-face hex-back'  }));

        const row = Math.floor(i / cols);
        const col = i % cols;

        if (row % 2 === 1) hex.style.marginRight = `-${HEX_SIZE / 2}px`;

        const dist = Math.sqrt(Math.pow(col - cols / 2, 2) + Math.pow(row - rows / 2, 2));
        hex.style.transitionDelay = `${dist * 0.025}s`;

        honeycombGrid.appendChild(hex);
    }
}

function triggerHoneycomb(onComplete) {
    buildHoneycomb();
    honeycombOverlay.classList.add('active');

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            const hexagons = honeycombGrid.querySelectorAll('.hexagon');
            hexagons.forEach(h => h.classList.add('flipped'));

            const maxDelay = Math.max(
                ...Array.from(hexagons).map(h => parseFloat(h.style.transitionDelay) || 0)
            );

            setTimeout(() => {
                if (onComplete) onComplete();
                setTimeout(() => {
                    hexagons.forEach(h => h.classList.remove('flipped'));
                    honeycombOverlay.classList.remove('active');
                }, 300);
            }, (maxDelay + 0.6) * 1000);
        });
    });
}


/* ============================================================
   5. setMode()
   ============================================================ */

function setMode(modeName) {
    if (modeName === currentMode) return;

    window.scrollTo({ top: 0, behavior: 'smooth' });

    triggerHoneycomb(() => {
        currentMode = modeName;
        document.body.className = modeName + '-mode';
        document.body.setAttribute('data-mode', modeName);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        scrollProgress = 0;
        updateShopIntro(modeName);
        document.getElementById('btn-sashiko').classList.toggle('active', modeName === 'sashiko');
        document.getElementById('btn-tattoo').classList.toggle('active',  modeName === 'tattoo');
    });
}

function updateShopIntro(mode) {
    const intro = document.querySelector('.shop-intro');
    if (intro) {
        intro.textContent = mode === 'sashiko'
            ? 'ערכות, בגדים ואביזרים ברוח הרקמה היפנית.'
            : 'הדפסים, סקיצות ואביזרים לאמנות הקעקוע.';
    }
}


/* ============================================================
   6. FAB
   ============================================================ */

const fabMenu   = document.getElementById('fab-menu');
const fabToggle = document.getElementById('fab-toggle');

fabToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    fabMenu.classList.toggle('open');
});

document.querySelectorAll('.fab-link').forEach(link => {
    link.addEventListener('click', () => fabMenu.classList.remove('open'));
});

document.addEventListener('click', (e) => {
    if (!fabMenu.contains(e.target)) fabMenu.classList.remove('open');
});


/* ============================================================
   7. Modal
   ============================================================ */

const productModal = document.getElementById('product-modal');

function openProduct(articleEl) {
    const data = PRODUCTS_DATA[articleEl.getAttribute('data-product-id')];
    if (!data) return;

    document.getElementById('modal-title').textContent = data.title;
    document.getElementById('modal-desc').textContent  = data.desc;
    document.getElementById('modal-price').textContent = data.price;

    const msg = encodeURIComponent(`שלום הדר! אני מעוניינת לשמוע עוד על "${data.title}"`);
    document.getElementById('modal-contact').href = `https://wa.me/972XXXXXXXXX?text=${msg}`;

    modalImages       = data.images || [];
    modalCurrentIndex = 0;
    updateModalImage(0);

    const thumbsContainer = document.getElementById('modal-thumbnails');
    thumbsContainer.innerHTML = '';
    modalImages.forEach((src, idx) => {
        const thumb    = document.createElement('img');
        thumb.src      = src;
        thumb.alt      = `תמונה ${idx + 1}`;
        thumb.className = idx === 0 ? 'active' : '';
        thumb.onclick  = () => updateModalImage(idx);
        thumbsContainer.appendChild(thumb);
    });

    const hasMultiple = modalImages.length > 1;
    document.querySelector('.gallery-nav.prev').style.display = hasMultiple ? 'flex' : 'none';
    document.querySelector('.gallery-nav.next').style.display = hasMultiple ? 'flex' : 'none';

    productModal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeProduct() {
    productModal.classList.remove('open');
    document.body.style.overflow = '';
}

function closeProductIfOutside(e) {
    if (e.target === productModal) closeProduct();
}

function updateModalImage(index) {
    if (!modalImages.length) return;
    modalCurrentIndex = ((index % modalImages.length) + modalImages.length) % modalImages.length;
    document.getElementById('modal-main-img').src = modalImages[modalCurrentIndex];
    document.querySelectorAll('.modal-thumbnails img').forEach((img, idx) => {
        img.classList.toggle('active', idx === modalCurrentIndex);
    });
}

function changeModalImage(direction) {
    updateModalImage(modalCurrentIndex + direction);
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && productModal.classList.contains('open')) closeProduct();
});


/* ============================================================
   8. Reveal
   ============================================================ */

function initReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.course-card, .product, .gallery-item, .about-container')
        .forEach(el => { el.classList.add('reveal'); observer.observe(el); });
}


/* ============================================================
   9. אתחול
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    resizeCanvas();
    window.addEventListener('resize', () => { resizeCanvas(); drawBackground(scrollProgress); });

    initReveal();
    updateShopIntro(currentMode);
    drawBackground(0);
    document.getElementById('btn-sashiko').classList.add('active');

    console.log('✦ סטודיו הדר - האתר נטען בהצלחה ✦');
});