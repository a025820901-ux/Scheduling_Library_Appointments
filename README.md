<div dir="rtl">

<h1 align="center">📚 מערכת לתיאום תורים לספרייה</h1>

<p align="center">
  <b>Scheduling Library Appointments</b><br>
  קביעת תורים לשירותי הספרייה בכמה לחיצות, וניהול נוח של התורים עבור הצוות.
</p>

<p align="center">
  <img alt="HTML5" src="https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white">
  <img alt="CSS3" src="https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white">
  <img alt="JavaScript" src="https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black">
  <img alt="Docker Compose" src="https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker&logoColor=white">
  <img alt="Port 3000" src="https://img.shields.io/badge/Port-3000-blueviolet">
</p>

<p align="center">
  <a href="#-תכונות-עיקריות">תכונות</a> •
  <a href="#️-טכנולוגיות">טכנולוגיות</a> •
  <a href="#-התחלה-מהירה">התחלה מהירה</a> •
  <a href="#-איך-משתמשים">שימוש</a> •
  <a href="#-תרומה-לפרויקט">תרומה</a>
</p>

---

## 📖 על הפרויקט

המערכת מאפשרת לקהל המבקרים בספרייה להזמין תור מראש לשירות הרצוי, ולצוות הספרייה לראות בצורה מסודרת מי מגיע ומתי. התוצאה: פחות המתנה, פחות בלבול, וניצול טוב יותר של זמן הצוות.

## ✨ תכונות עיקריות

- 🗓️ **הזמנת תור מהירה** – בחירת תאריך, שעה וסוג שירות בממשק פשוט וברור.
- 🚫 **מניעת כפילויות** – מנגנון שמונע הזמנה של אותו מועד פעמיים.
- 📱 **עיצוב רספונסיבי** – חוויית שימוש נוחה במחשב, בטאבלט ובנייד.
- 👀 **תצוגת צוות** – צפייה בתורים שנקבעו, לפי יום ושעה.

## 🛠️ טכנולוגיות

| תחום | טכנולוגיה |
|------|------------|
| צד לקוח | HTML5, CSS3 (Flexbox, CSS Grid), JavaScript (ES6+) |
| צד שרת | תיקיית `server/` |
| הרצה | Docker Compose |
| ניהול גרסאות | Git ו-GitHub |

## 🗂️ מבנה הפרויקט

```text
Scheduling_Library_Appointments/
├── client/        # ממשק המשתמש
├── server/        # צד השרת
├── compose.yaml   # הגדרת השירותים להרצה עם Docker Compose
└── README.md
```

## 🚀 התחלה מהירה

### דרישות מוקדמות

- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/) עם Docker Compose

### התקנה והרצה

```bash
# 1. שכפול הפרויקט
git clone https://github.com/a025820901-ux/Scheduling_Library_Appointments.git

# 2. כניסה לתיקיית הפרויקט
cd Scheduling_Library_Appointments

# 3. הרצת כל השירותים
docker compose up --build
```

לאחר שההרצה מסתיימת, האתר זמין בכתובת:

<p align="center">
  <a href="http://localhost:3000"><img alt="פתיחת האתר" src="https://img.shields.io/badge/🌐_פתיחת_האתר-localhost:3000-2ea44f?style=for-the-badge"></a>
</p>

> 💡 האתר רץ על פורט **3000**. אם הפורט תפוס במחשב שלכם, אפשר לשנות אותו בקובץ `compose.yaml`.

לעצירה: `Ctrl + C`, ואז `docker compose down`.

## 🧭 איך משתמשים

**מבקרי הספרייה**
1. בוחרים תאריך פנוי.
2. בוחרים שעה וסוג שירות.
3. מאשרים את התור.

**צוות הספרייה**
1. נכנסים לתצוגת התורים.
2. רואים את כל התורים לפי יום ושעה, ומתארגנים בהתאם.

## 🤝 תרומה לפרויקט

הצעות לשיפור יתקבלו בברכה:

1. עושים Fork לפרויקט.
2. פותחים ענף חדש: `git checkout -b feature/my-feature`
3. מבצעים Commit לשינויים: `git commit -m "Add my feature"`
4. דוחפים את הענף: `git push origin feature/my-feature`
5. פותחים Pull Request.

</div>
