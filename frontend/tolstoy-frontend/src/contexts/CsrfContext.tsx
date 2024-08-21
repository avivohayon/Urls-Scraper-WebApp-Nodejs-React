import React, { createContext, useState, useEffect, ReactNode } from "react";
import { fetchCsrfToken } from "../utils/csrf";

interface CsrfContextType {
  csrfToken: string | null;
}

export const CsrfContext = createContext<CsrfContextType>({ csrfToken: null });

interface CsrfProviderProps {
  children: ReactNode;
}

export const CsrfProvider: React.FC<CsrfProviderProps> = ({ children }) => {
  const [csrfToken, setCsrfToken] = useState<string | null>(null);

  useEffect(() => {
    const getCsrfToken = async () => {
      try {
        const token = await fetchCsrfToken();
        setCsrfToken(token);
      } catch (error) {
        console.error("Error fetching CSRF token:", error);
      }
    };

    getCsrfToken();
  }, []);

  return (
    <CsrfContext.Provider value={{ csrfToken }}>
      {children}
    </CsrfContext.Provider>
  );
};
