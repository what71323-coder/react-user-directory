function UserCard({ user, onViewDetails, isFavorite, onToggleFavorite }) {
    return (
        <article className="user-card">
            <div className="card-top">
                <div className="avatar">
                    {user.name.charAt(0).toUpperCase()}
                </div>

                <button
                    className={isFavorite ? "favorite-btn selected" : "favorite-btn"}
                    onClick={() => onToggleFavorite(user.id)}
                    aria-label="Toggle favorite"
                >
                    {isFavorite ? "♥" : "♡"}
                </button>
            </div>

            <h3>{user.name}</h3>
            <p className="username">@{user.username}</p>

            <div className="user-info">
                <p>✉ {user.email}</p>
                <p>☎ {user.phone.split(" ")[0]}</p>
                <p>⌖ {user.address.city}</p>
            </div>

            <button
                className="details-btn"
                onClick={() => onViewDetails(user)}
            >
                View Details →
            </button>
        </article>
    );
}

export default UserCard;