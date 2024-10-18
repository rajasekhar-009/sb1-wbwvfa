import React, { useState } from 'react';
import { Student } from '../types';

interface AddStudentFormProps {
  onAddStudent: (student: Student) => void;
}

const AddStudentForm: React.FC<AddStudentFormProps> = ({ onAddStudent }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [name, setName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [grades, setGrades] = useState([{ subject: '', score: 0 }]);
  const [attendance, setAttendance] = useState(0);
  const [engagement, setEngagement] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newStudent: Student = {
      id: Date.now(),
      name,
      rollNumber,
      grades,
      attendance,
      extracurricularEngagement: engagement,
      riskScore: calculateRiskScore(),
    };
    onAddStudent(newStudent);
    resetForm();
  };

  const calculateRiskScore = () => {
    const averageGrade = grades.reduce((sum, grade) => sum + grade.score, 0) / grades.length;
    return 100 - (averageGrade * 0.4 + attendance * 0.4 + engagement * 2);
  };

  const resetForm = () => {
    setName('');
    setRollNumber('');
    setGrades([{ subject: '', score: 0 }]);
    setAttendance(0);
    setEngagement(0);
    setIsExpanded(false);
  };

  const addGradeField = () => {
    setGrades([...grades, { subject: '', score: 0 }]);
  };

  return (
    <div className="bg-white rounded-lg shadow mt-4">
      <div
        className="p-4 flex justify-between items-center cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h2 className="text-lg font-semibold">Add New Student</h2>
        {isExpanded ? '▲' : '▼'}
      </div>
      {isExpanded && (
        <form onSubmit={handleSubmit} className="p-4 border-t">
          <div className="mb-4">
            <label className="block mb-2">Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Roll Number:</label>
            <input
              type="text"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Grades:</label>
            {grades.map((grade, index) => (
              <div key={index} className="flex mb-2">
                <input
                  type="text"
                  value={grade.subject}
                  onChange={(e) => {
                    const newGrades = [...grades];
                    newGrades[index].subject = e.target.value;
                    setGrades(newGrades);
                  }}
                  placeholder="Subject"
                  className="w-1/2 p-2 border rounded mr-2"
                  required
                />
                <input
                  type="number"
                  value={grade.score}
                  onChange={(e) => {
                    const newGrades = [...grades];
                    newGrades[index].score = Number(e.target.value);
                    setGrades(newGrades);
                  }}
                  placeholder="Score"
                  className="w-1/2 p-2 border rounded"
                  min="0"
                  max="100"
                  required
                />
              </div>
            ))}
            <button type="button" onClick={addGradeField} className="text-blue-500">
              + Add Grade
            </button>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Attendance (%):</label>
            <input
              type="number"
              value={attendance}
              onChange={(e) => setAttendance(Number(e.target.value))}
              className="w-full p-2 border rounded"
              min="0"
              max="100"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Extracurricular Engagement (0-10):</label>
            <input
              type="number"
              value={engagement}
              onChange={(e) => setEngagement(Number(e.target.value))}
              className="w-full p-2 border rounded"
              min="0"
              max="10"
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Add Student
          </button>
        </form>
      )}
    </div>
  );
};

export default AddStudentForm;