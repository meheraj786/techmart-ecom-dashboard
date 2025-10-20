import { useState } from "react";

const Setting = () => {
  const [user, setUser] = useState({
    name: "Meheraj Hosen",
    email: "meheraj@example.com",
    username: "meheraj786",
  });

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const [theme, setTheme] = useState("light");
  const [notifications, setNotifications] = useState(true);

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords({ ...passwords, [name]: value });
  };

  const handleSaveProfile = () => {
    alert("✅ Profile information updated!");
    console.log(user);
  };

  const handlePasswordUpdate = () => {
    if (passwords.new !== passwords.confirm) {
      alert("⚠️ New password and confirm password do not match!");
      return;
    }
    alert("🔒 Password changed successfully!");
    console.log(passwords);
    setPasswords({ current: "", new: "", confirm: "" });
  };

  const handleToggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-primary mb-8">
          ⚙️ Account Settings
        </h1>

        <div className="mb-10 border-b pb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            👤 Profile Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600 text-sm mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleUserChange}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-gray-600 text-sm mb-1">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={user.username}
                onChange={handleUserChange}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-gray-600 text-sm mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleUserChange}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
          <button
            onClick={handleSaveProfile}
            className="mt-4 bg-primary text-white px-4 py-2 rounded-lg hover:opacity-90 transition-all"
          >
            Save Changes
          </button>
        </div>

        <div className="mb-10 border-b pb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            🔒 Change Password
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600 text-sm mb-1">
                Current Password
              </label>
              <input
                type="password"
                name="current"
                value={passwords.current}
                onChange={handlePasswordChange}
                placeholder="Enter current password"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-gray-600 text-sm mb-1">
                New Password
              </label>
              <input
                type="password"
                name="new"
                value={passwords.new}
                onChange={handlePasswordChange}
                placeholder="Enter new password"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-gray-600 text-sm mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                name="confirm"
                value={passwords.confirm}
                onChange={handlePasswordChange}
                placeholder="Re-enter new password"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
          <button
            onClick={handlePasswordUpdate}
            className="mt-4 bg-primary text-white px-4 py-2 rounded-lg hover:opacity-90 transition-all"
          >
            Update Password
          </button>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            ⚡ General Preferences
          </h2>
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-700">Dark Mode</span>
            <button
              onClick={handleToggleTheme}
              className={`px-4 py-1 rounded-full text-white ${
                theme === "dark" ? "bg-gray-800" : "bg-primary"
              }`}
            >
              {theme === "dark" ? "Dark" : "Light"}
            </button>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-700">Enable Notifications</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications}
                onChange={() => setNotifications(!notifications)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:bg-primary transition-all"></div>
              <div className="absolute left-0.5 top-0.5 bg-white w-5 h-5 rounded-full peer-checked:translate-x-full transition-all"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
