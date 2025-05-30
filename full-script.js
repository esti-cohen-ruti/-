// === full-script.js ===

// משתנים לשימוש פנימי
let lastAlertDate = null;
let emojiMap = {
    "חח": "😂",
    "לב": "❤️",
    "כועס": "😡",
    "חכם": "🧠",
    "שמח": "😄",
    "עוגה": "🎂",
    "חיבוק": "🤗",
    "תות": "🍓",
};

// הגדרות ברירת מחדל (במקום קובץ JSON)
const config = {
    title: "תזכורת חשובה 💡",
    message: "הגיע הזמן להתקדם! אל תשכח לשתות מים! 🥤",
    times: ["13:05", "13:10", "13:15"],
    overlayColor: "rgba(0, 0, 0, 0.6)",
    boxColor: "#ffffff",
    textColor: "#000000",
    autoCloseSeconds: 10
};

// תחליף טקסט של אימוג'ים בעת הקלדה
function setupEmojiReplacer() {
    document.body.addEventListener("input", e => {
        let target = e.target;
        if (target.tagName !== 'TEXTAREA' && target.tagName !== 'INPUT') return;
        for (let key in emojiMap) {
            if (target.value.includes(':' + key)) {
                target.value = target.value.replaceAll(':' + key, emojiMap[key]);
            }
        }
    });
}

// הצגת פופאפ עם טקסט
function showPopup(title, message, config) {
    if (document.getElementById("popup-yeshiva")) return;

    let overlay = document.createElement("div");
    overlay.id = "popup-yeshiva";
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100vw";
    overlay.style.height = "100vh";
    overlay.style.background = config.overlayColor || "rgba(0,0,0,0.7)";
    overlay.style.zIndex = "999999";
    overlay.style.display = "flex";
    overlay.style.justifyContent = "center";
    overlay.style.alignItems = "center";

    let box = document.createElement("div");
    box.style.background = config.boxColor || "white";
    box.style.color = config.textColor || "black";
    box.style.padding = "2em";
    box.style.borderRadius = "20px";
    box.style.textAlign = "center";
    box.style.maxWidth = "90vw";
    box.style.boxShadow = "0 0 30px black";

    let titleEl = document.createElement("h2");
    titleEl.textContent = title;
    box.appendChild(titleEl);

    let msgEl = document.createElement("p");
    msgEl.textContent = message;
    msgEl.style.fontSize = "1.2em";
    box.appendChild(msgEl);

    let closeBtn = document.createElement("button");
    closeBtn.textContent = "סגור";
    closeBtn.style.marginTop = "1em";
    closeBtn.onclick = () => overlay.remove();
    box.appendChild(closeBtn);

    overlay.appendChild(box);
    document.body.appendChild(overlay);

    // סגירה אוטומטית
    if (config.autoCloseSeconds) {
        setTimeout(() => overlay.remove(), config.autoCloseSeconds * 1000);
    }
}

// בדיקה אם צריך להראות פופאפ
function checkAlert(config) {
    let now = new Date();
    let currentTime = `${now.getHours()}:${now.getMinutes()}`;

    if (config.times.includes(currentTime)) {
        let today = now.toDateString() + currentTime;
        if (lastAlertDate !== today) {
            lastAlertDate = today;
            showPopup(config.title || "תזכורת", config.message || "זמן ללכת לישיבה!", config);
        }
    }
}

// התחלה
setInterval(() => checkAlert(config), 10000);
setupEmojiReplacer();
