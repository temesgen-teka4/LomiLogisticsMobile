import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Task } from '../types';

interface TaskContextType {
  tasks: Task[];
  completeTask: (id: string) => void;
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
}

const TaskContext = createContext<TaskContextType | null>(null);

const SEED_TASKS: Task[] = [
  {
    id: '1',
    customer: 'Abebe Balcha',
    location: 'Bole, Addis Ababa',
    status: 'Pending',
    price: 250,
    phone: '+251911223344',
    latitude: 9.0054,
    longitude: 38.7636,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    customer: 'Sara Tekle',
    location: 'Piyassa, Addis Ababa',
    status: 'In Progress',
    price: 180,
    phone: '+251911556677',
    latitude: 9.0375,
    longitude: 38.7498,
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    customer: 'Lomi HQ',
    location: 'Mexico, Addis Ababa',
    status: 'Pending',
    price: 300,
    phone: '+251911889900',
    latitude: 9.0107,
    longitude: 38.7614,
    createdAt: new Date().toISOString(),
  },
];

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>(SEED_TASKS);

  const completeTask = (id: string) => {
    setTasks(prev =>
      prev.map(t =>
        t.id === id
          ? { ...t, status: 'Completed', completedAt: new Date().toISOString() }
          : t
      )
    );
  };

  const addTask = (task: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setTasks(prev => [newTask, ...prev]);
  };

  return (
    <TaskContext.Provider value={{ tasks, completeTask, addTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = (): TaskContextType => {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error('useTasks must be used inside <TaskProvider>');
  return ctx;
};
