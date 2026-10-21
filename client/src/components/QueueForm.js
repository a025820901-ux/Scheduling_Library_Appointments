import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";

const DB_URI = "http://localhost:4800/api/queue";
const days = ["ראשון", "שני", "שלישי", "רביעי", "חמישי"];

const QueueForm = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: "", type: "", day: "", hour: "" });
    const [error, setError] = useState("");
    const [saving, setSaving] = useState(false);

    const updateField = (field) => (event) => {
        setForm((currentForm) => ({ ...currentForm, [field]: event.target.value }));
        setError("");
    };

    const addQueue = async (event) => {
        event.preventDefault();
        const day = Number(form.day);
        const hour = Number(form.hour);

        if (!form.name.trim() || !form.type || !form.day || !form.hour) {
            setError("כדי לשמור את התור צריך למלא את כל הפרטים.");
            return;
        }
        if (!Number.isInteger(day) || day < 1 || day > 5) {
            setError("הספרייה פתוחה בימים ראשון עד חמישי.");
            return;
        }
        if (!Number.isInteger(hour) || hour < 8 || hour > 22) {
            setError("בחרו שעה בין 8:00 ל־22:00.");
            return;
        }

        setSaving(true);
        setError("");
        try {
            await axios.post(DB_URI, { ...form, name: form.name.trim(), day, hour });
            navigate("/");
        } catch (requestError) {
            setError(requestError.response?.data?.message || "לא הצלחנו לשמור את התור. נסו שוב.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <>
            <Header />
            <main className="form-shell">
                <div className="form-intro">
                    <p className="eyebrow"><span className="eyebrow-dot" />שומרים לכם מקום</p>
                    <h1>התור הבא שלכם<br />מתחיל כאן.</h1>
                    <p>עוד רגע קטן ויש לכם פינה שקטה בספרייה.</p>
                </div>

                <form className="booking-form" onSubmit={addQueue}>
                    <div className="form-field">
                        <label htmlFor="visitor-name">איך קוראים לכם?</label>
                        <input
                            id="visitor-name"
                            type="text"
                            autoComplete="name"
                            placeholder="השם שיופיע בתור"
                            value={form.name}
                            onChange={updateField("name")}
                            maxLength={80}
                            required
                        />
                    </div>

                    <div className="form-field">
                        <label htmlFor="visit-type">מה מביא אתכם אלינו?</label>
                        <select id="visit-type" value={form.type} onChange={updateField("type")} required>
                            <option value="" disabled>בחרו את סוג הביקור</option>
                            <option value="Borrow">השאלת ספר</option>
                            <option value="Read">קריאה או למידה</option>
                        </select>
                    </div>

                    <div className="form-two-columns">
                        <div className="form-field">
                            <label htmlFor="visit-day">באיזה יום?</label>
                            <select id="visit-day" value={form.day} onChange={updateField("day")} required>
                                <option value="" disabled>בחירת יום</option>
                                {days.map((day, index) => (
                                    <option key={day} value={index + 1}>יום {day}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-field">
                            <label htmlFor="visit-hour">באיזו שעה?</label>
                            <select id="visit-hour" value={form.hour} onChange={updateField("hour")} required>
                                <option value="" disabled>בחירת שעה</option>
                                {Array.from({ length: 15 }, (_, index) => index + 8).map((hour) => (
                                    <option key={hour} value={hour}>{String(hour).padStart(2, "0")}:00</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <p className="form-hint">הספרייה פתוחה בימים א׳–ה׳, בין 08:00 ל־22:00.</p>
                    {error && <p className="form-error" role="alert">{error}</p>}

                    <div className="form-actions">
                        <button className="button button-primary" type="submit" disabled={saving}>
                            {saving ? "שומרים לכם מקום…" : "מאשרים וקובעים תור"}
                            {!saving && <span aria-hidden="true">←</span>}
                        </button>
                        <Link className="button button-outline" to="/">חזרה לתורים</Link>
                    </div>
                </form>
            </main>
            <footer className="site-footer">בין הדפים · קצת שקט, הרבה סיפורים</footer>
        </>
    );
};

export default QueueForm;
