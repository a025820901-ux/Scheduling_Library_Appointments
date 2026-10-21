import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Queue from "./Queue";

const DB_URI = "http://localhost:4800/api/queue";
const days = ["", "יום ראשון", "יום שני", "יום שלישי", "יום רביעי", "יום חמישי"];

const QueueList = () => {
    const navigate = useNavigate();
    const [queues, setQueues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [typeFilter, setTypeFilter] = useState("all");

    const fetchQueues = useCallback(async () => {
        setLoading(true);
        setError("");
        try {
            const response = await axios.get(DB_URI);
            setQueues(response.data);
        } catch {
            setError("לא הצלחנו לטעון את התורים כרגע. כדאי לבדוק שהשרת פועל ולנסות שוב.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchQueues();
    }, [fetchQueues]);

    const deleteQueue = async (id) => {
        try {
            await axios.delete(`${DB_URI}/${id}`);
            setQueues((currentQueues) => currentQueues.filter((queue) => queue._id !== id));
            setError("");
        } catch {
            setError("לא הצלחנו לבטל את התור. נסו שוב בעוד רגע.");
        }
    };

    const updateQueue = async (queue) => {
        try {
            const response = await axios.put(`${DB_URI}/${queue._id}`, queue);
            setQueues((currentQueues) =>
                currentQueues.map((item) => item._id === queue._id ? response.data : item)
            );
            setError("");
        } catch {
            setError("לא הצלחנו לעדכן את התור. בדקו את היום והשעה ונסו שוב.");
        }
    };

    const visibleQueues = queues
        .filter((queue) => {
            const matchesName = queue.name.toLocaleLowerCase("he").includes(searchTerm.trim().toLocaleLowerCase("he"));
            const matchesType = typeFilter === "all" || queue.type === typeFilter;
            return matchesName && matchesType;
        })
        .sort((first, second) => first.day - second.day || first.hour - second.hour);

    return (
        <>
            <Header />
            <main className="page-shell">
                <section className="hero">
                    <div className="hero-copy">
                        <p className="eyebrow"><span className="eyebrow-dot" />הפינה השקטה שלך בעיר</p>
                        <h1>יש מקום<br />לסיפור שלך.</h1>
                        <p className="hero-description">
                            בין מדפי הספרים, באור הרך ובשקט הנכון — מחכה לכם הפינה הבאה שלכם.
                        </p>
                        <button className="button button-primary" onClick={() => navigate("/Add")}>
                            <span aria-hidden="true">＋</span> קובעים תור לספרייה
                        </button>
                    </div>
                    <div className="hero-art" aria-hidden="true">
                        <span className="hero-art-orbit hero-art-orbit-one" />
                        <span className="hero-art-orbit hero-art-orbit-two" />
                        <div className="book-stack">
                            <span className="book book-back"><i /></span>
                            <span className="book book-middle"><i /></span>
                            <span className="book book-front"><i /></span>
                            <span className="book-pages" />
                        </div>
                        <span className="hero-art-star hero-art-star-one">✦</span>
                        <span className="hero-art-star hero-art-star-two">✧</span>
                        <div className="hero-art-note">
                            <span>✦</span>
                            <strong>מקום קטן<br />לרגע גדול</strong>
                        </div>
                    </div>
                </section>

                <section className="feature-row" aria-label="מידע על הספרייה">
                    <article className="feature-card">
                        <span className="feature-icon feature-icon-sun" aria-hidden="true">☼</span>
                        <div><strong>רגע לעצמכם</strong><span>פינה שקטה מחכה לכם</span></div>
                    </article>
                    <article className="feature-card">
                        <span className="feature-icon feature-icon-book" aria-hidden="true">▤</span>
                        <div><strong>כל ביקור הוא סיפור</strong><span>ספר טוב או שעה של ריכוז</span></div>
                    </article>
                    <article className="feature-card">
                        <span className="feature-icon feature-icon-leaf" aria-hidden="true">✳</span>
                        <div><strong>בדיוק בזמן שלכם</strong><span>בוחרים יום ושעה שנוחים לכם</span></div>
                    </article>
                </section>

                <section className="appointments" aria-labelledby="appointments-title">
                    <div className="section-heading">
                        <div>
                            <h2 id="appointments-title">התורים הקרובים</h2>
                            <p>כל הביקורים המתוכננים במקום אחד</p>
                        </div>
                        {!loading && !error && <span className="count-pill">{queues.length}</span>}
                    </div>

                    {!loading && !error && queues.length > 0 && (
                        <div className="queue-toolbar">
                            <label className="search-box">
                                <span aria-hidden="true">⌕</span>
                                <input
                                    type="search"
                                    aria-label="חיפוש תור לפי שם"
                                    placeholder="מחפשים תור לפי שם?"
                                    value={searchTerm}
                                    onChange={(event) => setSearchTerm(event.target.value)}
                                />
                                {searchTerm && (
                                    <button type="button" aria-label="ניקוי החיפוש" onClick={() => setSearchTerm("")}>×</button>
                                )}
                            </label>
                            <div className="filter-pills" role="group" aria-label="סינון לפי סוג ביקור">
                                {[
                                    { value: "all", label: "הכול" },
                                    { value: "Borrow", label: "השאלת ספר" },
                                    { value: "Read", label: "קריאה ולמידה" }
                                ].map((filter) => (
                                    <button
                                        key={filter.value}
                                        className={`filter-pill${typeFilter === filter.value ? " is-active" : ""}`}
                                        aria-pressed={typeFilter === filter.value}
                                        onClick={() => setTypeFilter(filter.value)}
                                    >
                                        {filter.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {error && (
                        <div className="notice" role="alert">
                            <p>{error}</p>
                            <button className="button button-outline button-small" onClick={fetchQueues}>לנסות שוב</button>
                        </div>
                    )}

                    {loading && !error && <p className="loading-state">רגע, מסדרים לכם את המדפים…</p>}

                    {!loading && !error && queues.length === 0 && (
                        <div className="empty-state">
                            <span className="empty-icon" aria-hidden="true">📚</span>
                            <h3>המדף הזה עדיין ריק</h3>
                            <p>קבעו את התור הראשון שלכם ונתחיל את הסיפור.</p>
                            <button className="button button-primary" onClick={() => navigate("/Add")}>
                                קובעים תור ראשון
                            </button>
                        </div>
                    )}

                    {!loading && !error && queues.length > 0 && visibleQueues.length === 0 && (
                        <div className="empty-state search-empty-state">
                            <span className="empty-icon" aria-hidden="true">⌕</span>
                            <h3>לא מצאנו תור מתאים</h3>
                            <p>אפשר לנסות שם אחר או לבחור סוג ביקור אחר.</p>
                            <button className="button button-outline" onClick={() => {
                                setSearchTerm("");
                                setTypeFilter("all");
                            }}>הצגת כל התורים</button>
                        </div>
                    )}

                    {!loading && !error && visibleQueues.length > 0 && (
                        <>
                            <p className="results-caption">מציגים {visibleQueues.length} {visibleQueues.length === 1 ? "תור" : "תורים"}, לפי יום ושעה</p>
                            <div className="queue-grid">
                            {visibleQueues.map((queue, index) => (
                                <Queue
                                    key={queue._id}
                                    queue={queue}
                                    dayLabel={days[queue.day] || `יום ${queue.day}`}
                                    isNext={index === 0}
                                    delete={deleteQueue}
                                    updateQueue={updateQueue}
                                />
                            ))}
                            </div>
                        </>
                    )}
                </section>
            </main>
            <footer className="site-footer">בין הדפים · קצת שקט, הרבה סיפורים</footer>
        </>
    );
};

export default QueueList;
