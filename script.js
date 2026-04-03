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

// המצב הנוכחי של האתר - 'sashiko' או 'tattoo'
let currentMode = 'sashiko';

/*
  נתוני המוצרים - בפרויקט אמיתי זה יגיע משרת / API.
  כרגע זה אובייקט JavaScript שמכיל את כל המידע על כל מוצר.
  המפתח (key) הוא data-product-id של ה-article בHTML.
  
  images[] = מערך של נתיבי תמונות לגלריה.
  פעולה: כשלוחצים על מוצר, JS מחפש כאן את הנתונים לפי ה-id.
*/
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

// מעקב אחר תמונה נוכחית ב-modal
let modalImages = [];
let modalCurrentIndex = 0;


/* ============================================================
   2. עכבר מותאם + אנימציות לחיצה
   ============================================================ */

const cursor = document.getElementById('custom-cursor');

/*
  בכל תנועת עכבר - מזיזים את ה-div של העכבר.
  clientX/Y = מיקום העכבר יחסית לחלון (לא לעמוד).
  style.left/top = מיקום ה-div.
  
  הערה: השתמשנו ב-left/top ולא ב-transform translate
  כי transform כבר מוגדר ב-CSS ל-(-50%, -50%) לצורך מרכוז.
*/
document.addEventListener('mousemove', (e) => {
    if (cursor) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    }
});

/*
  אנימציה בלחיצה - שונה לפי מצב:
  - סאשיקו: פרח תפור (SVG של פרח)
  - קעקועים: טיפת דיו (SVG של טיפה)
  
  הלוגיקה:
  1. יוצרים div בנקודת הלחיצה
  2. מוסיפים לו SVG מתאים
  3. מוסיפים class 'click-animation' שמפעיל CSS animation
  4. אחרי 700ms (אורך האנימציה) - מסירים את ה-div מה-DOM
*/
document.addEventListener('click', (e) => {
    // לא מפעילים אנימציה בלחיצה על כפתורים/קישורים
    if (e.target.closest('button, a, .mode-switcher')) return;

    const el = document.createElement('div');
    el.className = 'click-animation';
    el.style.left = e.clientX + 'px';
    el.style.top = e.clientY + 'px';

    if (currentMode === 'sashiko') {
        // פרח תפור - SVG של פרח פשוט עם "תפרים"
        el.classList.add('sewn-flower');
        el.innerHTML = `
            <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <!-- עלי כותרת - קווים מהמרכז -->
                <line x1="25" y1="25" x2="25" y2="5"  stroke="#c9a96e" stroke-width="1.5" stroke-dasharray="2,2"/>
                <line x1="25" y1="25" x2="25" y2="45" stroke="#c9a96e" stroke-width="1.5" stroke-dasharray="2,2"/>
                <line x1="25" y1="25" x2="5"  y2="25" stroke="#c9a96e" stroke-width="1.5" stroke-dasharray="2,2"/>
                <line x1="25" y1="25" x2="45" y2="25" stroke="#c9a96e" stroke-width="1.5" stroke-dasharray="2,2"/>
                <line x1="25" y1="25" x2="10" y2="10" stroke="#c9a96e" stroke-width="1.5" stroke-dasharray="2,2"/>
                <line x1="25" y1="25" x2="40" y2="40" stroke="#c9a96e" stroke-width="1.5" stroke-dasharray="2,2"/>
                <line x1="25" y1="25" x2="40" y2="10" stroke="#c9a96e" stroke-width="1.5" stroke-dasharray="2,2"/>
                <line x1="25" y1="25" x2="10" y2="40" stroke="#c9a96e" stroke-width="1.5" stroke-dasharray="2,2"/>
                <!-- מרכז הפרח -->
                <circle cx="25" cy="25" r="4" fill="#c9a96e"/>
                <!-- עיגולים קטנים בקצות העלים -->
                <circle cx="25" cy="6"  r="3" stroke="#c9a96e" stroke-width="1.5" fill="none"/>
                <circle cx="25" cy="44" r="3" stroke="#c9a96e" stroke-width="1.5" fill="none"/>
                <circle cx="6"  cy="25" r="3" stroke="#c9a96e" stroke-width="1.5" fill="none"/>
                <circle cx="44" cy="25" r="3" stroke="#c9a96e" stroke-width="1.5" fill="none"/>
            </svg>`;
    } else {
        // טיפת דיו
        el.classList.add('ink-drop');
        el.innerHTML = `
            <svg viewBox="0 0 40 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <!-- גוף הטיפה -->
                <path d="M20 2 C20 2, 35 20, 35 32 C35 41.2 28.3 48 20 48 C11.7 48 5 41.2 5 32 C5 20 20 2 20 2Z" 
                      fill="#1a1208" fill-opacity="0.85"/>
                <!-- ברק קטן -->
                <ellipse cx="15" cy="22" rx="3" ry="5" fill="white" fill-opacity="0.25" transform="rotate(-20 15 22)"/>
            </svg>`;
    }

    document.body.appendChild(el);

    // מסירים את האלמנט אחרי שהאנימציה מסתיימת
    setTimeout(() => el.remove(), 700);
});


/* ============================================================
   3. Canvas - רקמה/סקיצה ברקע
   
   הלוגיקה:
   - Canvas HTML5 = "לוח ציור" דיגיטלי שאפשר לצייר עליו ב-JS
   - ctx = ה"עט" שמצייר על ה-canvas
   - בגלילה למטה: מציירים יותר קווים (מצטבר)
   - בגלילה למעלה: מוחקים קווים (מפחיתים progress)
   
   סאשיקו: דגם גיאומטרי של תפרים (קווים מקווקווים)
   קעקועים: סקיצת קווים אורגנית (עקומות Bezier)
   ============================================================ */

const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d'); // '2d' = ציור דו-ממדי

// progress = כמה מהרקמה/סקיצה הצטיירה (0 עד 1)
let scrollProgress = 0;
let lastScrollY = 0;
let animFrame = null;

function resizeCanvas() {
    // canvas חייב להיות בגודל החלון בדיוק
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

/*
  פונקציה שמציירת את דגם הסאשיקו.
  progress (0-1) קובע כמה מהדגם מצויר.
  
  סאשיקו קלאסי = דגם של משולשים / מתומנים חוזרים.
  כאן אנחנו מציירים גריד פשוט של קווים מקווקווים שמתאים לאסתטיקה.
*/
function drawSashikoPattern(progress) {
    const W = canvas.width;
    const H = canvas.height;
    
    ctx.clearRect(0, 0, W, H);
    
    if (progress <= 0) return;

    ctx.save();
    // setLineDash = מקווקו (תפרים)
    ctx.setLineDash([4, 8]);
    ctx.strokeStyle = 'rgba(201, 169, 110, 0.6)';
    ctx.lineWidth = 1.2;

    const spacing = 60;
    const cols = Math.ceil(W / spacing) + 1;
    const rows = Math.ceil(H / spacing) + 1;
    const totalLines = cols + rows;
    const visibleLines = Math.floor(totalLines * progress);

    let drawn = 0;

    // קווים אופקיים
    for (let r = 0; r < rows && drawn < visibleLines; r++, drawn++) {
        const y = r * spacing;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
    }

    // קווים אלכסוניים (אסתטיקה של סאשיקו)
    ctx.setLineDash([2, 12]);
    ctx.strokeStyle = 'rgba(201, 169, 110, 0.3)';
    for (let c = 0; c < cols && drawn < visibleLines; c++, drawn++) {
        const x = c * spacing;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x - H * 0.3, H); // אלכסון קל
        ctx.stroke();
    }

    // ריבועים קטנים בצמתים - מעניקים מראה של רקמת סאשיקו
    ctx.setLineDash([]);
    ctx.strokeStyle = 'rgba(201, 169, 110, 0.4)';
    const dotProgress = Math.max(0, progress * 2 - 1); // מתחיל להצטייר ב-50%
    const totalDots = Math.floor(cols * rows * dotProgress);

    for (let i = 0; i < totalDots && i < cols * rows; i++) {
        const c = i % cols;
        const r = Math.floor(i / cols);
        const cx = c * spacing;
        const cy = r * spacing;
        const size = 4;
        ctx.strokeRect(cx - size/2, cy - size/2, size, size);
    }

    ctx.restore();
}

/*
  פונקציה שמציירת "סקיצת קעקוע" ברקע.
  progress (0-1) קובע כמה קווים מצוירים.
  
  quadraticCurveTo = עקומת בזייה ריבועית - שני נקודות + נקודת שליטה.
  זה נותן קווים אורגניים ועדינים כמו סקיצה.
*/
function drawTattooSketch(progress) {
    const W = canvas.width;
    const H = canvas.height;

    ctx.clearRect(0, 0, W, H);

    if (progress <= 0) return;

    ctx.save();
    ctx.strokeStyle = 'rgba(26, 18, 8, 0.12)';
    ctx.lineWidth = 0.8;
    ctx.lineCap = 'round';

    // נקודות עגן לעקומות - ייתנו מראה אורגני
    // אלה נקודות קבועות (לא אקראיות) כדי שהדגם יהיה עקבי
    const anchors = [
        { x: W * 0.2, y: H * 0.1 },
        { x: W * 0.5, y: H * 0.2 },
        { x: W * 0.8, y: H * 0.05 },
        { x: W * 0.9, y: H * 0.4 },
        { x: W * 0.7, y: H * 0.6 },
        { x: W * 0.85, y: H * 0.85 },
        { x: W * 0.5, y: H * 0.95 },
        { x: W * 0.15, y: H * 0.8 },
        { x: W * 0.1, y: H * 0.5 },
        { x: W * 0.3, y: H * 0.35 },
        { x: W * 0.5, y: H * 0.55 },
        { x: W * 0.65, y: H * 0.3 },
    ];

    const totalCurves = anchors.length - 1;
    const visibleCurves = Math.floor(totalCurves * progress);

    for (let i = 0; i < visibleCurves; i++) {
        const a = anchors[i];
        const b = anchors[i + 1];
        // נקודת שליטה לעקומה - אמצע עם הטיה
        const cpX = (a.x + b.x) / 2 + (b.y - a.y) * 0.3;
        const cpY = (a.y + b.y) / 2 - (b.x - a.x) * 0.3;

        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.quadraticCurveTo(cpX, cpY, b.x, b.y);
        ctx.stroke();

        // עיגולים קטנים בנקודות - כמו "ידיות" של סקיצה
        ctx.beginPath();
        ctx.arc(a.x, a.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(26, 18, 8, 0.15)';
        ctx.fill();
    }

    // צייר פרחים/עלים פשוטים - Fine Line style
    const florals = Math.floor(5 * progress);
    for (let f = 0; f < florals; f++) {
        const a = anchors[f * 2 % anchors.length];
        drawFineLineFloral(a.x, a.y, 30 + f * 10);
    }

    ctx.restore();
}

// ציור פרח פשוט בסגנון Fine Line
function drawFineLineFloral(cx, cy, size) {
    ctx.save();
    ctx.strokeStyle = 'rgba(26, 18, 8, 0.1)';
    ctx.lineWidth = 0.6;

    const petals = 5;
    for (let p = 0; p < petals; p++) {
        const angle = (p / petals) * Math.PI * 2;
        const x = cx + Math.cos(angle) * size;
        const y = cy + Math.sin(angle) * size;
        
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        // עלה שמח עם bezier
        ctx.bezierCurveTo(
            cx + Math.cos(angle - 0.5) * size * 0.6,
            cy + Math.sin(angle - 0.5) * size * 0.6,
            cx + Math.cos(angle + 0.5) * size * 0.6,
            cy + Math.sin(angle + 0.5) * size * 0.6,
            x, y
        );
        ctx.stroke();
    }

    // מרכז הפרח
    ctx.beginPath();
    ctx.arc(cx, cy, size * 0.15, 0, Math.PI * 2);
    ctx.stroke();

    ctx.restore();
}

// מאזין לגלילה - מעדכן את progress ומצייר
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    
    // progress = 0 בראש, 1 בתחתית
    scrollProgress = maxScroll > 0 ? scrollY / maxScroll : 0;
    
    // ביטול frame קודם ותזמון חדש (אופטימיזציה לביצועים)
    if (animFrame) cancelAnimationFrame(animFrame);
    animFrame = requestAnimationFrame(() => {
        drawBackground(scrollProgress);
    });

    lastScrollY = scrollY;
});

// פונקציה מרכזית שמחליטה מה לצייר
function drawBackground(progress) {
    if (currentMode === 'sashiko') {
        drawSashikoPattern(progress);
    } else {
        drawTattooSketch(progress);
    }
}


/* ============================================================
   4. Honeycomb - מעבר בין מצבים
   
   הלוגיקה:
   - מחשבים כמה משושים צריך לכסות את המסך
   - יוצרים אותם ב-HTML דינמית
   - מפעילים אנימציית flip בהדרגה (staggered)
   - כל משושה מתהפך עם delay קצת שונה - אפקט גל
   - אחרי שכולם התהפכו - מחלחים את מצב הגוף ואז "מתהפכים חזרה" 
     (הצד האחורי שלהם כבר הוא הצבע החדש)
   ============================================================ */

const honeycombOverlay = document.getElementById('honeycomb-overlay');
const honeycombGrid = document.getElementById('honeycomb-grid');

// גודל כל משושה (ב-px)
const HEX_SIZE = 80;

function buildHoneycomb() {
    const W = window.innerWidth;
    const H = window.innerHeight;
    
    // חישוב כמה עמודות ושורות צריך
    // + 2 לשוליים
    const cols = Math.ceil(W / HEX_SIZE) + 2;
    const rows = Math.ceil(H / (HEX_SIZE * 0.866)) + 2; // 0.866 = sin(60°) - יחס גובה משושה
    
    honeycombGrid.innerHTML = '';
    
    // CSS Grid בגריד לפי מספר העמודות
    honeycombGrid.style.gridTemplateColumns = `repeat(${cols}, ${HEX_SIZE}px)`;
    honeycombGrid.style.gridTemplateRows = `repeat(${rows}, ${HEX_SIZE * 0.866}px)`;
    
    const totalHexes = cols * rows;

    for (let i = 0; i < totalHexes; i++) {
        const hex = document.createElement('div');
        hex.className = 'hexagon';
        
        const front = document.createElement('div');
        front.className = 'hex-face hex-front';
        
        const back = document.createElement('div');
        back.className = 'hex-face hex-back';
        
        hex.appendChild(front);
        hex.appendChild(back);

        // Offset לשורות אי-זוגיות = אפקט כוורת
        const row = Math.floor(i / cols);
        if (row % 2 === 1) {
            hex.style.marginRight = `-${HEX_SIZE / 2}px`;
        }

        // delay - גל מהמרכז החוצה
        const col = i % cols;
        const distFromCenter = Math.sqrt(
            Math.pow(col - cols / 2, 2) + 
            Math.pow(row - rows / 2, 2)
        );
        hex.style.transitionDelay = `${distFromCenter * 0.04}s`;

        honeycombGrid.appendChild(hex);
    }
}

/*
  הפעלת האנימציה.
  1. בונים את המשושים
  2. מציגים את ה-overlay
  3. מוסיפים class 'flipped' לכל המשושים (CSS מטפל באנימציה)
  4. אחרי שהאנימציה מסתיימת - callback
*/
function triggerHoneycomb(onComplete) {
    buildHoneycomb();
    
    honeycombOverlay.classList.add('active');

    // requestAnimationFrame = ממתין לframe הבא לפני שינוי ה-class
    // בלי זה, הדפדפן עלול "לדלג" על ה-transition
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            const hexagons = honeycombGrid.querySelectorAll('.hexagon');
            hexagons.forEach(h => h.classList.add('flipped'));
            
            // מחשבים את הזמן הכולל של האנימציה
            // = הdelay המקסימלי + זמן האנימציה עצמה
            const maxDelay = Math.max(
                ...Array.from(hexagons).map(h => 
                    parseFloat(h.style.transitionDelay) || 0
                )
            );
            
            setTimeout(() => {
                if (onComplete) onComplete();
                
                // אחרי הcallback - מסתירים את ה-overlay
                // ה-hex-back כבר מציג את הצבע החדש
                setTimeout(() => {
                    hexagons.forEach(h => h.classList.remove('flipped'));
                    honeycombOverlay.classList.remove('active');
                }, 300);
                
            }, (maxDelay + 0.6) * 1000);
        });
    });
}


/* ============================================================
   5. setMode() - הפונקציה הראשית למעבר מצב
   
   זאת הפונקציה שמופעלת בלחיצה על כפתורי הניווט.
   היא מנהלת את כל מה שקורה במעבר בין מצבים.
   ============================================================ */

function setMode(modeName) {
    // אם כבר במצב הזה - לא עושים כלום
    if (modeName === currentMode) return;
    
    // גלילה לראש העמוד (עם אנימציה חלקה)
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // מפעילים את אנימציית המשושים
    triggerHoneycomb(() => {
        // --- כל מה שכאן מתבצע בזמן שהמשושים מכסים את המסך ---
        
        currentMode = modeName;
        
        // שינוי ה-class על body - זה מה שמחליף את כל הצבעים (CSS Variables)
        document.body.className = modeName + '-mode';
        document.body.setAttribute('data-mode', modeName);
        
        // ניקוי ה-canvas ויצירת רקע חדש
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        scrollProgress = 0;
        
        // עדכון טקסטים בחנות
        updateShopIntro(modeName);
        
        // עדכון כפתורים פעילים
        document.getElementById('btn-sashiko').classList.toggle('active', modeName === 'sashiko');
        document.getElementById('btn-tattoo').classList.toggle('active', modeName === 'tattoo');
    });
}

// עדכון טקסט ההסבר בחנות לפי מצב
function updateShopIntro(mode) {
    const intro = document.querySelector('.shop-intro');
    if (intro) {
        intro.textContent = mode === 'sashiko'
            ? 'ערכות, בגדים ואביזרים ברוח הרקמה היפנית.'
            : 'הדפסים, סקיצות ואביזרים לאמנות הקעקוע.';
    }
}


/* ============================================================
   6. FAB - תפריט צף
   ============================================================ */

const fabMenu = document.getElementById('fab-menu');
const fabToggle = document.getElementById('fab-toggle');

// פתיחה/סגירה של התפריט
fabToggle.addEventListener('click', (e) => {
    e.stopPropagation(); // מונע ריפוף לחלק הבא
    fabMenu.classList.toggle('open');
});

// קישורים בתפריט - גלילה חלקה וסגירת התפריט
document.querySelectorAll('.fab-link').forEach(link => {
    link.addEventListener('click', () => {
        fabMenu.classList.remove('open');
    });
});

// סגירה בלחיצה בכל מקום אחר
document.addEventListener('click', (e) => {
    if (!fabMenu.contains(e.target)) {
        fabMenu.classList.remove('open');
    }
});


/* ============================================================
   7. Modal - דף מוצר
   
   הלוגיקה:
   - openProduct() מקבל את ה-article element
   - קורא את data-product-id
   - מחפש ב-PRODUCTS_DATA
   - ממלא את ה-modal בנתונים
   - מפעיל גלריית תמונות
   ============================================================ */

const productModal = document.getElementById('product-modal');

function openProduct(articleEl) {
    const productId = articleEl.getAttribute('data-product-id');
    const data = PRODUCTS_DATA[productId];
    
    if (!data) return;
    
    // מילוי ה-modal בנתוני המוצר
    document.getElementById('modal-title').textContent = data.title;
    document.getElementById('modal-desc').textContent = data.desc;
    document.getElementById('modal-price').textContent = data.price;
    
    // הגדרת קישור וואטסאפ
    const waLink = document.getElementById('modal-contact');
    const msg = encodeURIComponent(`שלום הדר! אני מעוניינת לשמוע עוד על "${data.title}"`);
    // החלפי את XXXXXXXXX במספר שלך!
    waLink.href = `https://wa.me/972XXXXXXXXX?text=${msg}`;
    
    // הגדרת גלריית תמונות
    modalImages = data.images || [];
    modalCurrentIndex = 0;
    updateModalImage(0);
    
    // יצירת תמונות ממוזערות
    const thumbsContainer = document.getElementById('modal-thumbnails');
    thumbsContainer.innerHTML = '';
    
    modalImages.forEach((src, idx) => {
        const thumb = document.createElement('img');
        thumb.src = src;
        thumb.alt = `תמונה ${idx + 1}`;
        thumb.className = idx === 0 ? 'active' : '';
        thumb.onclick = () => updateModalImage(idx);
        thumbsContainer.appendChild(thumb);
    });
    
    // הצגת הchoice ניווט רק אם יש יותר מתמונה אחת
    const prevBtn = document.querySelector('.gallery-nav.prev');
    const nextBtn = document.querySelector('.gallery-nav.next');
    const hasMultiple = modalImages.length > 1;
    prevBtn.style.display = hasMultiple ? 'flex' : 'none';
    nextBtn.style.display = hasMultiple ? 'flex' : 'none';
    
    // פתיחת ה-modal
    productModal.classList.add('open');
    document.body.style.overflow = 'hidden'; // מונע גלילה מאחורי ה-modal
}

function closeProduct() {
    productModal.classList.remove('open');
    document.body.style.overflow = ''; // מחזירים גלילה
}

// סגירה בלחיצה מחוץ ל-modal-content
function closeProductIfOutside(e) {
    if (e.target === productModal) {
        closeProduct();
    }
}

// החלפת תמונה ב-modal
function updateModalImage(index) {
    if (modalImages.length === 0) return;
    
    // וידוא שה-index בגבולות (עם wrap-around)
    modalCurrentIndex = ((index % modalImages.length) + modalImages.length) % modalImages.length;
    
    const mainImg = document.getElementById('modal-main-img');
    mainImg.src = modalImages[modalCurrentIndex];
    
    // עדכון ממוזערות
    document.querySelectorAll('.modal-thumbnails img').forEach((img, idx) => {
        img.classList.toggle('active', idx === modalCurrentIndex);
    });
}

// ניווט בין תמונות
function changeModalImage(direction) {
    updateModalImage(modalCurrentIndex + direction);
}

// סגירה עם Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && productModal.classList.contains('open')) {
        closeProduct();
    }
});


/* ============================================================
   8. Reveal - אנימציות גלילה
   
   IntersectionObserver = API מובנה בדפדפן שמזהה
   מתי אלמנט נכנס לתצוגה (ה-viewport).
   
   זה יותר יעיל מ-scroll event רגיל כי הדפדפן מנהל את זה
   בthread נפרד ולא מאט את הגלילה.
   
   כשאלמנט עם class 'reveal' נכנס לתצוגה -
   מוסיפים לו class 'visible' שמפעיל את transition ב-CSS.
   ============================================================ */

function initReveal() {
    // threshold: 0.1 = 10% מהאלמנט גלויים = מפעילים
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // unobserve = לא צריך לעקוב יותר, הוא כבר גלוי
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    // מוסיפים class reveal לאלמנטים שרוצים לאנימציה
    document.querySelectorAll('.course-card, .product, .gallery-item, .about-container')
        .forEach(el => {
            el.classList.add('reveal');
            observer.observe(el);
        });
}


/* ============================================================
   9. אתחול - DOMContentLoaded
   
   DOMContentLoaded = הדפדפן סיים לפרסר את ה-HTML.
   כל הקוד שצריך לרוץ פעם אחת כשהעמוד נטען - נכנס כאן.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    // resize canvas לגודל החלון
    resizeCanvas();
    window.addEventListener('resize', () => {
        resizeCanvas();
        drawBackground(scrollProgress); // ציור מחדש אחרי שינוי גודל
    });
    
    // אתחול reveal
    initReveal();
    
    // אתחול טקסט חנות
    updateShopIntro(currentMode);
    
    // ציור ראשוני (שקוף כי אין גלילה עדיין)
    drawBackground(0);
    
    // הגדרת כפתור פעיל
    document.getElementById('btn-sashiko').classList.add('active');
    
    console.log('✦ סטודיו הדר - האתר נטען בהצלחה ✦');
});
