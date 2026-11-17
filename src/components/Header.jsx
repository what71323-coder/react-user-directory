function Header({ totalUsers, activeView, setActiveView, onRefresh, loading }) {
    return (
        <header className="header">
            <div className="header-content">
                <div>
                    <h1>PeopleHub</h1>
                    <p>Manage and explore your user directory</p>
                </div>

                <div className="header-actions">
                    <button
                        className={activeView === "all" ? "nav-btn active" : "nav-btn"}
                        onClick={() => setActiveView("all")}
                    >
                        All Users
                    </button>

                    <button
                        className={activeView === "favorites" ? "nav-btn active" : "nav-btn"}
                        onClick={() => setActiveView("favorites")}
                    >
                        ♥ Favorites
                    </button>

                    <button
                        className="refresh-btn"
                        onClick={onRefresh}
                        disabled={loading}
                    >
                        {loading ? "Loading..." : "↻ Refresh"}
                    </button>
                </div>
            </div>

            <div className="header-stats">
                <span>{totalUsers} users available</span>
            </div>
        </header>
    );
}

export default Header;