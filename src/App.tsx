import React, { useState, useEffect } from 'react';
import { Student } from './types';
import { generateSampleData } from './utils/generateSampleData';
import Dashboard from './components/Dashboard';
import StudentList from './components/StudentList';
import StudentDetails from './components/StudentDetails';
import CounselingRecommendations from './components/CounselingRecommendations';
import AddStudentForm from './components/AddStudentForm';
import { GraduationCap } from 'lucide-react';

function App() {
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  useEffect(() => {
    const sampleData = generateSampleData(100);
    setStudents(sampleData);
  }, []);

  const handleAddStudent = (newStudent: Student) => {
    setStudents([...students, newStudent]);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex items-center">
          <GraduationCap size={32} className="mr-2" />
          <h1 className="text-2xl font-bold">Intelligent Student Counseling System</h1>
        </div>
      </header>
      <main className="container mx-auto p-4">
        <Dashboard students={students} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="md:col-span-1">
            <StudentList students={students} onSelectStudent={setSelectedStudent} />
            <AddStudentForm onAddStudent={handleAddStudent} />
          </div>
          <div className="md:col-span-2">
            <StudentDetails student={selectedStudent} />
            <CounselingRecommendations student={selectedStudent} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;