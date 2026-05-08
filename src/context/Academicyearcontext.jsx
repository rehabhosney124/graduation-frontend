import { createContext, useContext, useState } from "react";

const AcademicYearContext = createContext(null);

export function AcademicYearProvider({ children }) {
  const [academicYear, setAcademicYear] = useState(2025);

  return (
    <AcademicYearContext.Provider value={{ academicYear, setAcademicYear }}>
      {children}
    </AcademicYearContext.Provider>
  );
}

export function useAcademicYear() {
  const ctx = useContext(AcademicYearContext);
  if (!ctx) throw new Error("useAcademicYear must be used inside AcademicYearProvider");
  return ctx;
}