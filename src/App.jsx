import { useEffect, useState } from "react";

import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import UserList from "./components/UserList";
import UserDetails from "./components/UserDetails";

import { getUsers } from "./services/userApi";

function App() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [search, setSearch] = useState("");
    const [city, setCity] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");

    const [selectedUser, setSelectedUser] = useState(null);
    const [activeView, setActiveView] = useState("all");

    const [favorites, setFavorites] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("favorites")) || [];
        } catch {
            return [];
        }
    });

    const [currentPage, setCurrentPage] = useState(1);

    const usersPerPage = 6;

    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(() => {
        const controller = new AbortController();

        const fetchUsers = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await getUsers(controller.signal);

                setUsers(data);
            } catch (err) {
                if (err.name !== "AbortError") {
                    setError(err.message || "Something went wrong.");
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        };

        fetchUsers();

        return () => {
            controller.abort();
        };
    }, [refreshKey]);

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    const cities = [...new Set(
        users.map((user) => user.address.city)
    )].sort();

    const filteredUsers = users
        .filter((user) => {
            const searchText = search.toLowerCase();

            const matchesSearch =
                user.name.toLowerCase().includes(searchText) ||
                user.email.toLowerCase().includes(searchText) ||
                user.phone.toLowerCase().includes(searchText);

            const matchesCity =
                city === "" || user.address.city === city;

            const matchesFavorites =
                activeView === "all" || favorites.includes(user.id);

            return matchesSearch && matchesCity && matchesFavorites;
        })
        .sort((a, b) => {
            return sortOrder === "asc"
                ? a.name.localeCompare(b.name)
                : b.name.localeCompare(a.name);
        });

    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

    const startIndex = (currentPage - 1) * usersPerPage;

    const currentUsers = filteredUsers.slice(
        startIndex,
        startIndex + usersPerPage
    );

    const handleToggleFavorite = (userId) => {
        setFavorites((previous) =>
            previous.includes(userId)
                ? previous.filter((id) => id !== userId)
                : [...previous, userId]
        );
    };

    const handleClearFilters = () => {
        setSearch("");
        setCity("");
        setSortOrder("asc");
        setCurrentPage(1);
    };

    const handleRefresh = () => {
        setRefreshKey((previous) => previous + 1);
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [search, city, sortOrder, activeView]);

    return (
        <div className="app">
            <Header
                totalUsers={users.length}
                activeView={activeView}
                setActiveView={setActiveView}
                onRefresh={handleRefresh}
                loading={loading}
            />

            <main className="container">
                <div className="page-heading">
                    <div>
                        <h2>
                            {activeView === "all"
                                ? "Explore Users"
                                : "Your Favorites"}
                        </h2>

                        <p>Discover and manage user information</p>
                    </div>

                    <div className="result-count">
                        {filteredUsers.length} users found
                    </div>
                </div>

                <SearchBar
                    search={search}
                    setSearch={setSearch}
                    city={city}
                    setCity={setCity}
                    cities={cities}
                    sortOrder={sortOrder}
                    setSortOrder={setSortOrder}
                    onClear={handleClearFilters}
                />

                {loading && (
                    <div className="status-message">
                        <div className="loader"></div>
                        <h3>Loading users...</h3>
                        <p>Please wait while we fetch the data.</p>
                    </div>
                )}

                {!loading && error && (
                    <div className="status-message error-state">
                        <h3>Something went wrong!</h3>
                        <p>{error}</p>

                        <button className="details-btn" onClick={handleRefresh}>
                            Retry
                        </button>
                    </div>
                )}

                {!loading && !error && users.length === 0 && (
                    <div className="empty-state">
                        <h2>No users available</h2>
                        <p>The API returned an empty user list.</p>
                    </div>
                )}

                {!loading && !error && users.length > 0 && (
                    <>
                        <UserList
                            users={currentUsers}
                            onViewDetails={setSelectedUser}
                            favorites={favorites}
                            onToggleFavorite={handleToggleFavorite}
                        />

                        {totalPages > 1 && (
                            <div className="pagination">
                                <button
                                    disabled={currentPage === 1}
                                    onClick={() =>
                                        setCurrentPage((page) => page - 1)
                                    }
                                >
                                    Previous
                                </button>

                                <span>
                                    Page {currentPage} of {totalPages}
                                </span>

                                <button
                                    disabled={currentPage === totalPages}
                                    onClick={() =>
                                        setCurrentPage((page) => page + 1)
                                    }
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                )}
            </main>

            <UserDetails
                user={selectedUser}
                onClose={() => setSelectedUser(null)}
            />

            <footer>
                <p>PeopleHub © 2026 | Built with React & Vite</p>
            </footer>
        </div>
    );
}

export default App;