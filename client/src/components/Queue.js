import { useState } from "react";

const Queue = ({ queue, dayLabel, isNext, delete: deleteQueue, updateQueue }) => {
    const [editing, setEditing] = useState(false);
    const [updatedDay, setUpdatedDay] = useState(String(queue.day));
    const [updatedHour, setUpdatedHour] = useState(String(queue.hour));
    const typeLabel = queue.type === "Borrow" ? "השאלת ספר" : "קריאה ולמידה";

    const saveUpdate = () => {
        const day = Number(updatedDay);
        const hour = Number(updatedHour);
        if (!Number.isInteger(day) || day < 1 || day > 5) {
            window.alert("הספרייה פתוחה בימים ראשון עד חמישי");
            return;
        }
        if (!Number.isInteger(hour) || hour < 8 || hour > 22) {
            window.alert("בחרו שעה בין 8:00 ל־22:00");
            return;
        }
        updateQueue({ ...queue, day, hour });
        setEditing(false);
    };

    return (
        <article className={`queue-card${isNext ? " queue-card-next" : ""}`}>
            {isNext && <span className="next-appointment">הבא בתור <span aria-hidden="true">✦</span></span>}
            <div className="queue-card-top">
                <div className="queue-card-title">
                    <span className="queue-avatar" aria-hidden="true">
                        {queue.type === "Borrow" ? "📚" : "☕"}
                    </span>
                    <h3>{queue.name}</h3>
                </div>
                <span className="queue-type">{typeLabel}</span>
            </div>

            <div className="queue-details">
                <div className="queue-detail">
                    <span>מתי נפגשים?</span>
                    <strong>{dayLabel}</strong>
                </div>
                <div className="queue-detail">
                    <span>השעה שלכם</span>
                    <strong>{String(queue.hour).padStart(2, "0")}:00</strong>
                </div>
            </div>

            <div className="queue-card-actions">
                <button className="button button-outline button-small" onClick={() => setEditing(!editing)}>
                    <span aria-hidden="true">✎</span> {editing ? "סגירה" : "עדכון תור"}
                </button>
                <button className="button button-danger button-small" onClick={() => deleteQueue(queue._id)}>
                    <span aria-hidden="true">×</span> ביטול
                </button>
            </div>

            {editing && (
                <div className="edit-panel">
                    <div>
                        <label htmlFor={`day-${queue._id}`}>יום (1–5)</label>
                        <input
                            id={`day-${queue._id}`}
                            type="number"
                            min="1"
                            max="5"
                            step="1"
                            value={updatedDay}
                            onChange={(event) => setUpdatedDay(event.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor={`hour-${queue._id}`}>שעה (8–22)</label>
                        <input
                            id={`hour-${queue._id}`}
                            type="number"
                            min="8"
                            max="22"
                            step="1"
                            value={updatedHour}
                            onChange={(event) => setUpdatedHour(event.target.value)}
                        />
                    </div>
                    <button className="button button-primary button-small" onClick={saveUpdate}>שמירת שינוי</button>
                </div>
            )}
        </article>
    );
};

export default Queue;
