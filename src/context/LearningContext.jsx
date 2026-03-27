import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { getModules, updateModule } from "../api/api";

const LearningContext = createContext();

export function LearningProvider({ children }) {

  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadModules = useCallback(async () => {

    try {

      const data = await getModules();
      setModules(data || []);

    } catch (error) {

      console.error("Failed to load modules", error);

    } finally {

      setLoading(false);

    }

  }, []);

  useEffect(() => {
    loadModules();
  }, [loadModules]);

  const completeModule = async (id) => {

    try {

      await updateModule(id, { completed: true });

      setModules(prev =>
        prev.map(m =>
          m.id === id ? { ...m, completed: true } : m
        )
      );

    } catch (error) {

      console.error("Failed to update module", error);

    }

  };

  const completed = modules.filter(m => m.completed).length;

  const percent = modules.length
    ? Math.round((completed / modules.length) * 100)
    : 0;

  return (

    <LearningContext.Provider
      value={{
        modules,
        loading,
        percent,
        completed,
        completeModule,
        reload: loadModules
      }}
    >

      {children}

    </LearningContext.Provider>

  );

}

export const useLearning = () => {

  const context = useContext(LearningContext);

  if (!context) {
    throw new Error("useLearning must be used inside LearningProvider");
  }

  return context;

};