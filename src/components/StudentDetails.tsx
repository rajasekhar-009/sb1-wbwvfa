import React from 'react';
import { Student } from '../types';

interface StudentDetailsProps {
  student: Student | null;
}

const StudentDetails: React.FC<StudentDetailsProps> = ({ student }) => {
  if (!student) return null;

  const averageGrade = student.grades.reduce((sum, grade) => sum + grade.score, 0) / student.grades.length;

  return (
    <div className="bg-white rounded-lg shadow mt-4 p-4">
      <h2 className="text-xl font-semibold mb-4">{student.name}</h2>
      <p className="mb-2">Roll Number: {student.rollNumber}</p>
      <p className="mb-2">Average Grade: {averageGrade.toFixed(2)}%</p>
      <p className="mb-2">Attendance: {student.attendance}%</p>
      <p className="mb-2">Extracurricular Engagement: {student.extracurricularEngagement}/10</p>
      <p className="mb-4">Risk Score: {student.riskScore.toFixed(2)}</p>
      
      <h3 className="text-lg font-semibold mb-2">Grades</h3>
      <ul>
        {student.grades.map((grade, index) => (
          <li key={index} className="mb-1">
            {grade.subject}: {grade.score}%
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentDetails;