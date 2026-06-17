import React, { useEffect, useState } from "react";
import { Users as UsersIcon, Search } from "lucide-react";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:8000/api/user",
        {
          headers: {
            Authorization: token,
          },
        }
      );

      const result = await response.json();
      console.log(result);
      const {success,user,email}= result
      if (success) {
        setUsers(user);
        setFilteredUsers(result.user);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        user.name
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        user.email
          ?.toLowerCase()
          .includes(search.toLowerCase())
    );

    setFilteredUsers(filtered);
  }, [search, users]);

  return (
    <div>

      <div className="flex items-center gap-3 mb-6">
        <UsersIcon size={35} />
        <h1 className="text-4xl font-black">
          Users
        </h1>
      </div>

      {/* Search */}
      <div className="mb-6 max-w-md">
        <div className="flex items-center bg-white/5 border border-white/10 rounded-xl px-4 py-3">

          <Search size={18} />

          <input
            type="text"
            placeholder="Search user..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="bg-transparent outline-none ml-3 w-full"
          />

        </div>
      </div>

      {/* Table */}
      <div className="bg-white/5 rounded-3xl border border-white/10 overflow-hidden">

        {loading ? (
          <div className="p-10 text-center">
            Loading Users...
          </div>
        ) : filteredUsers.length ===0 ? (
          <div className="p-10 text-center">
            No Users Found
          </div>
        ) : (
          <>
            <div className="grid grid-cols-4 bg-white/10 p-4 font-bold">

              <div>Name</div>
              <div>Email</div>
              <div>Role</div>
              <div>Joined</div>

            </div>

            {filteredUsers.map((user) => (
              <div
                key={user._id}
                className="grid grid-cols-4 p-4 border-t border-white/10 hover:bg-white/5"
              >

                <div>{user.name}</div>

                <div className="truncate">
                  {user.email}
                </div>

                <div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      user.role === "admin"
                        ? "bg-red-500/20 text-red-400"
                        : "bg-cyan-500/20 text-cyan-400"
                    }`}
                  >
                    {user.role}
                  </span>
                </div>

                <div>
                  {new Date(
                    user.createdAt
                  ).toLocaleDateString()}
                </div>

              </div>
            ))}
          </>
        )}

      </div>

    </div>
  );
};

export default Users;