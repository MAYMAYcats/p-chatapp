/*
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, User } from 'firebase/auth';
import { auth, db } from '../config';
import { setDoc, doc } from 'firebase/firestore';

// Define the shape of the authentication context
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean | undefined;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, username: string, profileUrl: string) => Promise<{ success: boolean, data?: User | null, msg?: string }>;
}

// Create the context with a default value of undefined
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthContextProvider component
interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        setUser(user);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    });
    return unsub;
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      // Implement login logic
    } catch (e) {
      // Handle login error
    }
  };

  const logout = async (): Promise<void> => {
    try {
      // Implement logout logic
    } catch (e) {
      // Handle logout error
    }
  };

  const register = async (email: string, password: string, username: string, profileUrl: string): Promise<{ success: boolean, data?: User | null, msg?: string }> => {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      console.log('response.user:', response.user);
      await setDoc(doc(db, 'user', response.user.uid), {
        username,
        profileUrl,
        userId: response.user.uid,
      });
      return { success: true, data: response.user };
    } catch (error) {
      return { success: false, msg: (error as Error).message };
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error('useAuth must be wrapped inside AuthContextProvider');
  }
  return value;
};

*/