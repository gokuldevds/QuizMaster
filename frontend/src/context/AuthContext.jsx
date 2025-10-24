import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // null = not logged in

  const login = (userData) => setUser({ ...userData, role: "admin" }); // Assuming logged-in user is admin for demo
  const logout = () => setUser(null);

  const resetPassword = async (email) => {
    // TODO: Implement your actual API call here
    try {
      // Mock API call - replace with your actual API endpoint
      const response = await fetch('/api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) throw new Error('Failed to send OTP');
    } catch (error) {
      throw new Error('Failed to send OTP');
    }
  };

  const verifyOtp = async (email, otp) => {
    // TODO: Implement your actual API call here
    try {
      // Mock API call - replace with your actual API endpoint
      const response = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });
      if (!response.ok) throw new Error('Invalid OTP');
    } catch (error) {
      throw new Error('Invalid OTP');
    }
  };

  const updatePassword = async (email, otp, newPassword) => {
    // TODO: Implement your actual API call here
    try {
      // Mock API call - replace with your actual API endpoint
      const response = await fetch('/api/update-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp, newPassword }),
      });
      if (!response.ok) throw new Error('Failed to update password');
    } catch (error) {
      throw new Error('Failed to update password');
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, resetPassword, verifyOtp, updatePassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
