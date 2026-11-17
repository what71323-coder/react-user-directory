function SearchBar({
    search,
    setSearch,
    city,
    setCity,
    cities,
    sortOrder,
    setSortOrder,
    onClear
}) {
    return (
        <section className="search-section">
            <div className="search-input">
                <span>⌕</span>
                <input
                    type="text"
                    placeholder="Search by name, email or phone..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <select value={city} onChange={(e) => setCity(e.target.value)}>
                <option value="">All Cities</option>

                {cities.map((cityName) => (
                    <option key={cityName} value={cityName}>
                        {cityName}
                    </option>
                ))}
            </select>

            <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
            >
                <option value="asc">Name A - Z</option>
                <option value="desc">Name Z - A</option>
            </select>

            <button className="clear-btn" onClick={onClear}>
                Clear Filters
            </button>
        </section>
    );
}

export default SearchBar;