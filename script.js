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
    shorts: {
        title: 'מכנס קצר רקום',
        desc: 'מכנס קצר מכותנה, ממוחדש ברקמה מסורתית עבודת יד',
        price: '150 ₪',
        images: ['images/shorts.jpeg', 'images/shorts-detail.jpeg'],
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
        images: ['images/print1.jpg'],
    },
    lino: {
        title: 'הדפס לינולאום בעבודת יד',
        desc: 'כל הדפס חיתוך ידני, דיו ידני, הדפסה ידנית. לא תמצאי שתי עבודות זהות. גודל A4.',
        price: '90 ₪',
        images: ['images/lino.jpg'],
    },
    shirt1: {
        title: 'חולצה רקומה',
        desc: 'חולצה ממוחדשת עם רקמה מסורתית של תפרי אורז בקצה השרוולים',
        price: '75 ₪',
        images: ['images/shirt1.jpeg', 'images/shirt1-detail.jpeg'],
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
        cursor.style.left    = e.clientX + 'px';
        cursor.style.top     = e.clientY + 'px';
        cursor.style.opacity = '1';
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
            <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="25" cy="25" r="8"  stroke="#1a1208" stroke-width="1.4" opacity="0.9"/>
                <circle cx="25" cy="25" r="16" stroke="#1a1208" stroke-width="1.0" opacity="0.55"/>
                <circle cx="25" cy="25" r="23" stroke="#1a1208" stroke-width="0.7" opacity="0.25"/>
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
    ctx.lineCap  = 'round';
    ctx.lineJoin = 'round';

    // צבע: שחור עדין על הרקע הבהיר של מצב קעקועים
    const INK = 'rgba(20, 14, 8, 0.82)';

    // ============================================================
    // הפרחים מוגדרים כ"פקודות עט" — רשימת צעדים מסודרים.
    // כל פקודה היא אחת מאלה:
    //   { t:'move', x, y }  — הרם עט, עבור לנקודה
    //   { t:'line', x, y }  — קו לנקודה הבאה
    //   { t:'arc',  x, y, r } — עיגול מלא
    //
    // progress קובע כמה פקודות מצטיירות.
    // הפקודה האחרונה מצטיירת חלקית (fraction) —
    // זה נותן תחושת מחט שזזה ברצף.
    // ============================================================

    // --- א. פרח עליון ---
    // paths מ-tattoo_elements_preview.svg, מצויירים כפקודות
    function makeFlowerTop(ox, oy, sc) {
        return [
            // עלה מרכזי
            { t:'move', x:ox,        y:oy-85*sc },
            { t:'line', x:ox+6*sc,   y:oy-65*sc },
            { t:'line', x:ox+8*sc,   y:oy-45*sc },
            { t:'line', x:ox,        y:oy-30*sc },
            { t:'line', x:ox-8*sc,   y:oy-45*sc },
            { t:'line', x:ox-6*sc,   y:oy-65*sc },
            { t:'line', x:ox,        y:oy-85*sc },
            // עלה שמאל-1
            { t:'move', x:ox-18*sc,  y:oy-80*sc },
            { t:'line', x:ox-8*sc,   y:oy-62*sc },
            { t:'line', x:ox-4*sc,   y:oy-44*sc },
            { t:'line', x:ox,        y:oy-30*sc },
            { t:'line', x:ox-12*sc,  y:oy-38*sc },
            { t:'line', x:ox-20*sc,  y:oy-54*sc },
            { t:'line', x:ox-18*sc,  y:oy-80*sc },
            // עלה ימין-1
            { t:'move', x:ox+18*sc,  y:oy-80*sc },
            { t:'line', x:ox+8*sc,   y:oy-62*sc },
            { t:'line', x:ox+4*sc,   y:oy-44*sc },
            { t:'line', x:ox,        y:oy-30*sc },
            { t:'line', x:ox+12*sc,  y:oy-38*sc },
            { t:'line', x:ox+20*sc,  y:oy-54*sc },
            { t:'line', x:ox+18*sc,  y:oy-80*sc },
            // עלה שמאל-2
            { t:'move', x:ox-34*sc,  y:oy-68*sc },
            { t:'line', x:ox-16*sc,  y:oy-55*sc },
            { t:'line', x:ox-6*sc,   y:oy-40*sc },
            { t:'line', x:ox,        y:oy-30*sc },
            { t:'line', x:ox-14*sc,  y:oy-32*sc },
            { t:'line', x:ox-28*sc,  y:oy-42*sc },
            { t:'line', x:ox-34*sc,  y:oy-68*sc },
            // עלה ימין-2
            { t:'move', x:ox+34*sc,  y:oy-68*sc },
            { t:'line', x:ox+16*sc,  y:oy-55*sc },
            { t:'line', x:ox+6*sc,   y:oy-40*sc },
            { t:'line', x:ox,        y:oy-30*sc },
            { t:'line', x:ox+14*sc,  y:oy-32*sc },
            { t:'line', x:ox+28*sc,  y:oy-42*sc },
            { t:'line', x:ox+34*sc,  y:oy-68*sc },
            // עלה שמאל-3
            { t:'move', x:ox-44*sc,  y:oy-50*sc },
            { t:'line', x:ox-24*sc,  y:oy-44*sc },
            { t:'line', x:ox-10*sc,  y:oy-34*sc },
            { t:'line', x:ox,        y:oy-30*sc },
            { t:'line', x:ox-12*sc,  y:oy-24*sc },
            { t:'line', x:ox-30*sc,  y:oy-28*sc },
            { t:'line', x:ox-44*sc,  y:oy-50*sc },
            // עלה ימין-3
            { t:'move', x:ox+44*sc,  y:oy-50*sc },
            { t:'line', x:ox+24*sc,  y:oy-44*sc },
            { t:'line', x:ox+10*sc,  y:oy-34*sc },
            { t:'line', x:ox,        y:oy-30*sc },
            { t:'line', x:ox+12*sc,  y:oy-24*sc },
            { t:'line', x:ox+30*sc,  y:oy-28*sc },
            { t:'line', x:ox+44*sc,  y:oy-50*sc },
            // עיגול מרכזי
            { t:'arc',  x:ox,        y:oy-30*sc,  r:7*sc  },
            { t:'arc',  x:ox,        y:oy-30*sc,  r:3*sc, fill:true },
            // גבעול
            { t:'move', x:ox,        y:oy-23*sc },
            { t:'line', x:ox+2*sc,   y:oy-12*sc },
            { t:'line', x:ox+2*sc,   y:oy      },
            { t:'line', x:ox,        y:oy+8*sc  },
            // עלי גבעול
            { t:'move', x:ox,        y:oy-10*sc },
            { t:'line', x:ox-10*sc,  y:oy-8*sc  },
            { t:'line', x:ox-16*sc,  y:oy-2*sc  },
            { t:'line', x:ox-14*sc,  y:oy+6*sc  },
            { t:'move', x:ox,        y:oy-10*sc },
            { t:'line', x:ox+10*sc,  y:oy-8*sc  },
            { t:'line', x:ox+16*sc,  y:oy-2*sc  },
            { t:'line', x:ox+14*sc,  y:oy+6*sc  },
        ];
    }

    // --- ב. כתר זר ---
    // paths מ-three_flowers_precise.svg
    function makeKeterZar(ox, oy, sc) {
        return [
            // גבעול מרכזי
            { t:'move', x:ox,        y:oy+60*sc },
            { t:'line', x:ox,        y:oy+20*sc },
            { t:'line', x:ox,        y:oy-30*sc },
            { t:'line', x:ox,        y:oy-80*sc },
            { t:'arc',  x:ox,        y:oy-80*sc,  r:5*sc  },
            // גבעול שמאל-1
            { t:'move', x:ox,        y:oy+60*sc },
            { t:'line', x:ox-8*sc,   y:oy+20*sc },
            { t:'line', x:ox-18*sc,  y:oy-20*sc },
            { t:'line', x:ox-24*sc,  y:oy-70*sc },
            { t:'arc',  x:ox-24*sc,  y:oy-70*sc,  r:4.5*sc},
            // גבעול ימין-1
            { t:'move', x:ox,        y:oy+60*sc },
            { t:'line', x:ox+8*sc,   y:oy+20*sc },
            { t:'line', x:ox+18*sc,  y:oy-20*sc },
            { t:'line', x:ox+24*sc,  y:oy-70*sc },
            { t:'arc',  x:ox+24*sc,  y:oy-70*sc,  r:4.5*sc},
            // גבעול שמאל-2
            { t:'move', x:ox,        y:oy+60*sc },
            { t:'line', x:ox-14*sc,  y:oy+24*sc },
            { t:'line', x:ox-30*sc,  y:oy-10*sc },
            { t:'line', x:ox-44*sc,  y:oy-56*sc },
            { t:'arc',  x:ox-44*sc,  y:oy-56*sc,  r:4*sc  },
            // גבעול ימין-2
            { t:'move', x:ox,        y:oy+60*sc },
            { t:'line', x:ox+14*sc,  y:oy+24*sc },
            { t:'line', x:ox+30*sc,  y:oy-10*sc },
            { t:'line', x:ox+44*sc,  y:oy-56*sc },
            { t:'arc',  x:ox+44*sc,  y:oy-56*sc,  r:4*sc  },
            // גבעול שמאל-3
            { t:'move', x:ox,        y:oy+60*sc },
            { t:'line', x:ox-18*sc,  y:oy+28*sc },
            { t:'line', x:ox-40*sc,  y:oy+4*sc  },
            { t:'line', x:ox-60*sc,  y:oy-30*sc },
            { t:'arc',  x:ox-60*sc,  y:oy-30*sc,  r:3.5*sc},
            // גבעול ימין-3
            { t:'move', x:ox,        y:oy+60*sc },
            { t:'line', x:ox+18*sc,  y:oy+28*sc },
            { t:'line', x:ox+40*sc,  y:oy+4*sc  },
            { t:'line', x:ox+60*sc,  y:oy-30*sc },
            { t:'arc',  x:ox+60*sc,  y:oy-30*sc,  r:3.5*sc},
            // גביע בסיס
            { t:'move', x:ox-22*sc,  y:oy+60*sc },
            { t:'line', x:ox-18*sc,  y:oy+72*sc },
            { t:'line', x:ox-10*sc,  y:oy+80*sc },
            { t:'line', x:ox,        y:oy+82*sc },
            { t:'line', x:ox+10*sc,  y:oy+80*sc },
            { t:'line', x:ox+18*sc,  y:oy+72*sc },
            { t:'line', x:ox+22*sc,  y:oy+60*sc },
            // קווי גביע פנימיים
            { t:'move', x:ox-22*sc,  y:oy+60*sc },
            { t:'line', x:ox-16*sc,  y:oy+66*sc },
            { t:'line', x:ox-8*sc,   y:oy+72*sc },
            { t:'line', x:ox,        y:oy+74*sc },
            { t:'move', x:ox+22*sc,  y:oy+60*sc },
            { t:'line', x:ox+16*sc,  y:oy+66*sc },
            { t:'line', x:ox+8*sc,   y:oy+72*sc },
            { t:'line', x:ox,        y:oy+74*sc },
            // שיניים
            { t:'move', x:ox-22*sc,  y:oy+60*sc },
            { t:'line', x:ox-26*sc,  y:oy+54*sc },
            { t:'line', x:ox-24*sc,  y:oy+48*sc },
            { t:'line', x:ox-18*sc,  y:oy+50*sc },
            { t:'move', x:ox+22*sc,  y:oy+60*sc },
            { t:'line', x:ox+26*sc,  y:oy+54*sc },
            { t:'line', x:ox+24*sc,  y:oy+48*sc },
            { t:'line', x:ox+18*sc,  y:oy+50*sc },
            { t:'move', x:ox,        y:oy+60*sc },
            { t:'line', x:ox,        y:oy+54*sc },
            { t:'line', x:ox+2*sc,   y:oy+50*sc },
            { t:'line', x:ox,        y:oy+48*sc },
        ];
    }

    // --- ג. לוטוס + סלסולים ---
    // paths מ-tattoo_elements_preview.svg
    function makeLotus(ox, oy, sc) {
        return [
            // עלה מרכזי
            { t:'move', x:ox,        y:oy-60*sc },
            { t:'line', x:ox+8*sc,   y:oy-44*sc },
            { t:'line', x:ox+10*sc,  y:oy-28*sc },
            { t:'line', x:ox,        y:oy-18*sc },
            { t:'line', x:ox-10*sc,  y:oy-28*sc },
            { t:'line', x:ox-8*sc,   y:oy-44*sc },
            { t:'line', x:ox,        y:oy-60*sc },
            // עלה שמאל
            { t:'move', x:ox-22*sc,  y:oy-52*sc },
            { t:'line', x:ox-10*sc,  y:oy-38*sc },
            { t:'line', x:ox-6*sc,   y:oy-24*sc },
            { t:'line', x:ox,        y:oy-18*sc },
            { t:'line', x:ox-10*sc,  y:oy-20*sc },
            { t:'line', x:ox-22*sc,  y:oy-30*sc },
            { t:'line', x:ox-22*sc,  y:oy-52*sc },
            // עלה ימין
            { t:'move', x:ox+22*sc,  y:oy-52*sc },
            { t:'line', x:ox+10*sc,  y:oy-38*sc },
            { t:'line', x:ox+6*sc,   y:oy-24*sc },
            { t:'line', x:ox,        y:oy-18*sc },
            { t:'line', x:ox+10*sc,  y:oy-20*sc },
            { t:'line', x:ox+22*sc,  y:oy-30*sc },
            { t:'line', x:ox+22*sc,  y:oy-52*sc },
            // עלה שמאל-2
            { t:'move', x:ox-36*sc,  y:oy-36*sc },
            { t:'line', x:ox-22*sc,  y:oy-28*sc },
            { t:'line', x:ox-10*sc,  y:oy-18*sc },
            { t:'line', x:ox-8*sc,   y:oy-14*sc },
            { t:'line', x:ox-24*sc,  y:oy-14*sc },
            { t:'line', x:ox-36*sc,  y:oy-36*sc },
            // עלה ימין-2
            { t:'move', x:ox+36*sc,  y:oy-36*sc },
            { t:'line', x:ox+22*sc,  y:oy-28*sc },
            { t:'line', x:ox+10*sc,  y:oy-18*sc },
            { t:'line', x:ox+8*sc,   y:oy-14*sc },
            { t:'line', x:ox+24*sc,  y:oy-14*sc },
            { t:'line', x:ox+36*sc,  y:oy-36*sc },
            // עיגול מרכזי
            { t:'arc',  x:ox,        y:oy-18*sc,  r:6*sc  },
            // גבעול
            { t:'move', x:ox,        y:oy-12*sc },
            { t:'line', x:ox,        y:oy+10*sc  },
            // עלי מים שמאל
            { t:'move', x:ox,        y:oy      },
            { t:'line', x:ox-12*sc,  y:oy+2*sc  },
            { t:'line', x:ox-20*sc,  y:oy+8*sc  },
            { t:'line', x:ox-18*sc,  y:oy+16*sc },
            // עלי מים ימין
            { t:'move', x:ox,        y:oy      },
            { t:'line', x:ox+12*sc,  y:oy+2*sc  },
            { t:'line', x:ox+20*sc,  y:oy+8*sc  },
            { t:'line', x:ox+18*sc,  y:oy+16*sc },
            // סלסול שמאל
            { t:'move', x:ox-18*sc,  y:oy+16*sc },
            { t:'line', x:ox-28*sc,  y:oy+20*sc },
            { t:'line', x:ox-38*sc,  y:oy+16*sc },
            { t:'line', x:ox-40*sc,  y:oy+8*sc  },
            { t:'line', x:ox-36*sc,  y:oy+2*sc  },  // { t:-6
            { t:'line', x:ox-28*sc,  y:oy+4*sc  },
            { t:'line', x:ox-20*sc,  y:oy+6*sc  },
            { t:'line', x:ox-22*sc,  y:oy+10*sc },
            // סלסול ימין
            { t:'move', x:ox+18*sc,  y:oy+16*sc },
            { t:'line', x:ox+28*sc,  y:oy+20*sc },
            { t:'line', x:ox+38*sc,  y:oy+16*sc },
            { t:'line', x:ox+40*sc,  y:oy+8*sc  },
            { t:'line', x:ox+36*sc,  y:oy+2*sc  },
            { t:'line', x:ox+28*sc,  y:oy+4*sc  },
            { t:'line', x:ox+20*sc,  y:oy+6*sc  },
            { t:'line', x:ox+22*sc,  y:oy+10*sc },
            // כפתור תחתון
            { t:'move', x:ox-8*sc,   y:oy+10*sc },
            { t:'line', x:ox-6*sc,   y:oy+18*sc },
            { t:'line', x:ox-4*sc,   y:oy+24*sc },
            { t:'line', x:ox,        y:oy+28*sc },
            { t:'line', x:ox+4*sc,   y:oy+24*sc },
            { t:'line', x:ox+6*sc,   y:oy+18*sc },
            { t:'line', x:ox+8*sc,   y:oy+10*sc },
            { t:'move', x:ox-12*sc,  y:oy+12*sc },
            { t:'line', x:ox-12*sc,  y:oy+22*sc },
            { t:'line', x:ox-8*sc,   y:oy+28*sc },
            { t:'line', x:ox,        y:oy+32*sc },
            { t:'line', x:ox+8*sc,   y:oy+28*sc },
            { t:'line', x:ox+12*sc,  y:oy+22*sc },
            { t:'line', x:ox+12*sc,  y:oy+12*sc },
            { t:'arc',  x:ox,        y:oy+28*sc,  r:4*sc  },
        ];
    }

    // ============================================================
    // מיקום הפרחים על המסך — 6 מיקומים:
    // פרח עליון: פינות עליונות (שמאל וימין)
    // כתר זר: שוליים צדדיים (שמאל וימין, אמצע)
    // לוטוס: פינות תחתונות (שמאל וימין)
    // ============================================================
    const sc = Math.min(W, H) * 0.0014; // scale לפי גודל המסך

    const elements = [
        // פרח עליון — פינה שמאל עליון
        { strokes: makeFlowerTop(W*0.08, H*0.16, sc) },
        // פרח עליון — פינה ימין עליון
        { strokes: makeFlowerTop(W*0.92, H*0.16, sc) },
        // כתר זר — שמאל אמצע
        { strokes: makeKeterZar( W*0.06, H*0.52, sc) },
        // כתר זר — ימין אמצע
        { strokes: makeKeterZar( W*0.94, H*0.52, sc) },
        // לוטוס — פינה שמאל תחתון
        { strokes: makeLotus(    W*0.08, H*0.82, sc) },
        // לוטוס — פינה ימין תחתון
        { strokes: makeLotus(    W*0.92, H*0.82, sc) },
    ];

    // ============================================================
    // ציור תפר-אחר-תפר
    // כל אלמנט מתחיל להצטייר בנקודת זמן שונה (stagger)
    // כך כולם מצטיירים בו-זמנית אבל לא מסונכרנים בדיוק
    // ============================================================
    const embProgress = Math.max(0, (progress - 0.1) / 0.9);

    elements.forEach((el, idx) => {
        // כל אלמנט מתחיל בין 0 ל-20% אחרי הקודם
        const startOffset = (idx / elements.length) * 0.2;
        const localP = Math.max(0, Math.min(1,
            (embProgress - startOffset) / (1 - startOffset)
        ));
        if (localP <= 0) return;

        const strokes   = el.strokes;
        const totalCmds = strokes.length;
        const visibleF  = localP * totalCmds;
        const visibleI  = Math.floor(visibleF);
        const subP      = visibleF - visibleI;

        ctx.strokeStyle = INK;
        ctx.fillStyle   = INK;

        for (let i = 0; i <= Math.min(visibleI, totalCmds - 1); i++) {
            const cmd    = strokes[i];
            const isLast = (i === visibleI);
            const frac   = isLast ? subP : 1;

            if (cmd.t === 'move') {
                ctx.beginPath();
                ctx.moveTo(cmd.x, cmd.y);

            } else if (cmd.t === 'line') {
                const prev = strokes[i - 1];
                const tx   = prev.x + (cmd.x - prev.x) * frac;
                const ty   = prev.y + (cmd.y - prev.y) * frac;
                ctx.lineWidth = 1.5;
                ctx.lineTo(tx, ty);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(tx, ty);

            } else if (cmd.t === 'arc') {
                if (!isLast || frac > 0.5) {
                    ctx.beginPath();
                    ctx.arc(cmd.x, cmd.y, cmd.r, 0, Math.PI * 2);
                    if (cmd.fill) {
                        ctx.fill();
                    } else {
                        ctx.lineWidth = 1.3;
                        ctx.stroke();
                    }
                }
            }
        }
    });

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
   4. Fade — מעבר בין מצבים
   ============================================================ */

const fadeOverlay = document.getElementById('fade-overlay');
let hAnimating = false;

/*
  המעבר עובד בשלושה שלבים:
  1. fade out — האתר הנוכחי נעלם (0.5s)
  2. החלפת המצב — body class מתחלף בזמן שהמסך שחור
  3. fade in — האתר החדש מופיע (0.5s)
  
  הצבע שמכסה = צבע הרקע של המצב החדש,
  כך שה-fade נראה כמו כניסה טבעית לעולם אחר.
*/
function triggerFade(onMidpoint) {
    if (hAnimating) return;
    hAnimating = true;

    // מציגים ומדהירים
    fadeOverlay.style.visibility = 'visible';
    fadeOverlay.style.opacity    = '0';
    fadeOverlay.style.pointerEvents = 'all';

    // ממתינים frame אחד כדי שה-transition יפעל
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            fadeOverlay.style.opacity = '1';

            // אחרי ה-fade out — מחליפים מצב
            setTimeout(() => {
                if (onMidpoint) onMidpoint();

                // fade in
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        fadeOverlay.style.opacity = '0';

                        setTimeout(() => {
                            fadeOverlay.style.visibility = 'hidden';
                            fadeOverlay.style.pointerEvents = 'none';
                            hAnimating = false;
                        }, 600);
                    });
                });
            }, 600);
        });
    });
}
/* ============================================================
   5. setMode()
   ============================================================ */
function setMode(modeName) {
    if (modeName === currentMode || hAnimating) return;

    const targetMode = modeName;

    triggerFade(() => {
        currentMode = targetMode;
        document.body.className = targetMode + '-mode';
        document.body.setAttribute('data-mode', targetMode);
        localStorage.setItem('studioMode', targetMode);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        scrollProgress = 0;
        window.scrollTo({ top: 0, behavior: 'instant' });
        updateShopIntro(targetMode);
        document.getElementById('btn-sashiko').classList.toggle('active', targetMode === 'sashiko');
        document.getElementById('btn-tattoo').classList.toggle('active',  targetMode === 'tattoo');
    });
}
function updateShopIntro(mode) {
    const intro = document.querySelector('.shop-intro');
    if (intro) {
        intro.textContent = mode === 'sashiko'
            ? 'ערכות, בגדים ואביזרים ברוח הרקמה היפנית.'
            : 'הדפסים, סקיצות ואביזרים לאמנות הקעקוע.';
    }
    // עדכון החנות — תיעדוף + הגבלת 3 פריטים
    updateShop(mode);
}
/*
  updateShop — מסדרת את המוצרים לפי מצב.
  
  הלוגיקה:
  1. כל המוצרים מוצגים תמיד (לא מסתירים כלום).
  2. מוצרים רלוונטיים למצב הנוכחי = "ראשוניים".
  3. מוצרים משותפים = "משניים".
  4. מוצרים של המצב השני = "שלישיים".
  5. ממיינים את הגריד לפי הסדר הזה.
  6. מציגים רק 3 ראשונים — השאר מוסתרים.
  
  order = מספר סדר ב-CSS Grid (order property).
  גבוה יותר = מופיע אחר כך.
*/
function updateShop(mode) {
    const grid     = document.getElementById('products-grid');
    if (!grid) return;

    const products = Array.from(grid.querySelectorAll('.product'));

    // --- שלב 1: קובעים סדר לפי מצב ---
    products.forEach(p => {
        const cat = p.getAttribute('data-category');

        let order;
        if (cat === mode) {
            order = 1;  // ראשוני — קשור למצב הנוכחי
        } else if (cat === 'shared') {
            order = 2;  // משותף — מופיע שני
        } else {
            order = 3;  // של המצב השני — מופיע אחרון
        }

        p.style.order = order;
    });
    products.forEach(p => p.style.display = 'flex');

    
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
    document.getElementById('modal-contact').href = `https://wa.me/972545800032?text=${msg}`;

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

 // שחזור המצב השמור — אם המשתמש היה בקעקועים, חוזרים לשם
const savedMode = localStorage.getItem('studioMode') || 'sashiko';
if (savedMode !== 'sashiko') {
    currentMode = savedMode;
    document.body.className = savedMode + '-mode';
    document.body.setAttribute('data-mode', savedMode);
}

initReveal();
updateShopIntro(currentMode);
drawBackground(0);

document.getElementById('btn-sashiko').classList.toggle('active', currentMode === 'sashiko');
document.getElementById('btn-tattoo').classList.toggle('active',  currentMode === 'tattoo');

    console.log('✦ סטודיו הדר - האתר נטען בהצלחה ✦');
});