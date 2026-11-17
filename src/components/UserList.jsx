import UserCard from "./UserCard";

function UserList({
    users,
    onViewDetails,
    favorites,
    onToggleFavorite
}) {
    if (users.length === 0) {
        return (
            <div className="empty-state">
                <h2>No users found</h2>
                <p>Try changing your search or filter.</p>
            </div>
        );
    }

    return (
        <div className="user-grid">
            {users.map((user) => (
                <UserCard
                    key={user.id}
                    user={user}
                    onViewDetails={onViewDetails}
                    isFavorite={favorites.includes(user.id)}
                    onToggleFavorite={onToggleFavorite}
                />
            ))}
        </div>
    );
}

export default UserList;