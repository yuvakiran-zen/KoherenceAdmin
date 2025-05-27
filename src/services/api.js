// Mock API service for Koherence Admin

// Mock data
const programs = [
  {
    id: 1,
    name: 'Mindfulness Fundamentals',
    description: 'A beginner-friendly program to develop mindfulness practice.',
    category: 'meditation',
    duration: '4 weeks',
    routines: [1, 3, 5],
    createdAt: '2023-10-15T10:30:00Z',
    isActive: true
  },
  {
    id: 2,
    name: 'Yoga for Beginners',
    description: 'Introduction to basic yoga poses and breathing techniques.',
    category: 'yoga',
    duration: '6 weeks',
    routines: [2, 4],
    createdAt: '2023-09-22T14:15:00Z',
    isActive: true
  },
  {
    id: 3,
    name: 'Advanced Meditation',
    description: 'Deep meditation practices for experienced practitioners.',
    category: 'meditation',
    duration: '8 weeks',
    routines: [6, 7],
    createdAt: '2023-11-05T09:45:00Z',
    isActive: true
  },
  {
    id: 4,
    name: 'Sleep Improvement',
    description: 'Techniques to improve sleep quality and duration.',
    category: 'sleep',
    duration: '3 weeks',
    routines: [8],
    createdAt: '2023-10-30T16:20:00Z',
    isActive: false
  },
  {
    id: 5,
    name: 'Stress Reduction',
    description: 'Practical methods to manage and reduce daily stress.',
    category: 'wellness',
    duration: '5 weeks',
    routines: [9, 10],
    createdAt: '2023-11-10T11:00:00Z',
    isActive: true
  }
];

const routines = [
  {
    id: 1,
    name: 'Morning Mindfulness',
    description: 'Start your day with mindful awareness',
    duration: '15 minutes',
    category: 'meditation',
    steps: [1, 2, 3],
    createdAt: '2023-10-10T08:30:00Z'
  },
  {
    id: 2,
    name: 'Evening Yoga Flow',
    description: 'Gentle yoga sequence for evening relaxation',
    duration: '20 minutes',
    category: 'yoga',
    steps: [4, 5, 6],
    createdAt: '2023-09-20T17:45:00Z'
  },
  {
    id: 3,
    name: 'Breath Awareness',
    description: 'Focus on breathing patterns to center the mind',
    duration: '10 minutes',
    category: 'meditation',
    steps: [7, 8],
    createdAt: '2023-10-12T10:15:00Z'
  },
  // More routines would be here
];

const steps = [
  {
    id: 1,
    name: 'Body Scan',
    description: 'Systematically focus attention on different parts of the body',
    duration: '5 minutes',
    type: 'meditation',
    instruction: 'Find a comfortable position. Starting from your toes, move your attention slowly up through your body.',
    createdAt: '2023-10-05T09:20:00Z'
  },
  {
    id: 2,
    name: 'Breath Counting',
    description: 'Count breaths to anchor attention',
    duration: '5 minutes',
    type: 'meditation',
    instruction: 'Breathe naturally, counting each breath cycle from 1 to 10, then restart.',
    createdAt: '2023-10-06T10:30:00Z'
  },
  {
    id: 3,
    name: 'Open Awareness',
    description: 'Allow thoughts to come and go without judgment',
    duration: '5 minutes',
    type: 'meditation',
    instruction: 'Keep your attention open, noticing thoughts, sounds, and sensations without focusing on any one thing.',
    createdAt: '2023-10-07T14:15:00Z'
  },
  // More steps would be here
];

// API functions for Programs
export const programsAPI = {
  getAll: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...programs]);
      }, 500);
    });
  },
  
  getById: (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const program = programs.find(p => p.id === parseInt(id));
        if (program) {
          resolve({...program});
        } else {
          reject(new Error('Program not found'));
        }
      }, 300);
    });
  },
  
  create: (programData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newProgram = {
          id: programs.length + 1,
          ...programData,
          createdAt: new Date().toISOString(),
          routines: programData.routines || []
        };
        programs.push(newProgram);
        resolve(newProgram);
      }, 600);
    });
  },
  
  update: (id, programData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = programs.findIndex(p => p.id === parseInt(id));
        if (index !== -1) {
          const updatedProgram = { ...programs[index], ...programData };
          programs[index] = updatedProgram;
          resolve(updatedProgram);
        } else {
          reject(new Error('Program not found'));
        }
      }, 600);
    });
  },
  
  delete: (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = programs.findIndex(p => p.id === parseInt(id));
        if (index !== -1) {
          programs.splice(index, 1);
          resolve({ success: true });
        } else {
          reject(new Error('Program not found'));
        }
      }, 500);
    });
  }
};

// API functions for Routines
export const routinesAPI = {
  getAll: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...routines]);
      }, 500);
    });
  },
  
  getById: (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const routine = routines.find(r => r.id === parseInt(id));
        if (routine) {
          resolve({...routine});
        } else {
          reject(new Error('Routine not found'));
        }
      }, 300);
    });
  },
  
  create: (routineData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newRoutine = {
          id: routines.length + 1,
          ...routineData,
          createdAt: new Date().toISOString(),
          steps: routineData.steps || []
        };
        routines.push(newRoutine);
        resolve(newRoutine);
      }, 600);
    });
  },
  
  update: (id, routineData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = routines.findIndex(r => r.id === parseInt(id));
        if (index !== -1) {
          const updatedRoutine = { ...routines[index], ...routineData };
          routines[index] = updatedRoutine;
          resolve(updatedRoutine);
        } else {
          reject(new Error('Routine not found'));
        }
      }, 600);
    });
  },
  
  delete: (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = routines.findIndex(r => r.id === parseInt(id));
        if (index !== -1) {
          routines.splice(index, 1);
          resolve({ success: true });
        } else {
          reject(new Error('Routine not found'));
        }
      }, 500);
    });
  }
};

// API functions for Steps
export const stepsAPI = {
  getAll: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...steps]);
      }, 500);
    });
  },
  
  getById: (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const step = steps.find(s => s.id === parseInt(id));
        if (step) {
          resolve({...step});
        } else {
          reject(new Error('Step not found'));
        }
      }, 300);
    });
  },
  
  create: (stepData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newStep = {
          id: steps.length + 1,
          ...stepData,
          createdAt: new Date().toISOString()
        };
        steps.push(newStep);
        resolve(newStep);
      }, 600);
    });
  },
  
  update: (id, stepData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = steps.findIndex(s => s.id === parseInt(id));
        if (index !== -1) {
          const updatedStep = { ...steps[index], ...stepData };
          steps[index] = updatedStep;
          resolve(updatedStep);
        } else {
          reject(new Error('Step not found'));
        }
      }, 600);
    });
  },
  
  delete: (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = steps.findIndex(s => s.id === parseInt(id));
        if (index !== -1) {
          steps.splice(index, 1);
          resolve({ success: true });
        } else {
          reject(new Error('Step not found'));
        }
      }, 500);
    });
  }
};