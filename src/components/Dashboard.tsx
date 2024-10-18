import React from 'react';
import { Student } from '../types';
import { BarChart, Users, BookOpen, Award } from 'lucide-react';

interface DashboardProps {
  students: Student[];
}

const Dashboard: React.FC<DashboardProps> = ({ students }) => {
  const averageGrade = students.reduce((sum, student) => {
    const studentAvg = student.grades.reduce((gradeSum, grade) => gradeSum + grade.score, 0) / student.grades.length;
    return sum + studentAvg;
  }, 0) / students.length;

  const averageAttendance = students.reduce((sum, student) => sum + student.attendance, 0) / students.length;
  const averageEngagement = students.reduce((sum, student) => sum + student.extracurricularEngagement, 0) / students.length;
  const atRiskCount = students.filter(student => student.riskScore > 50).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Average Grade</p>
            <p className="text-2xl font-semibold">{averageGrade.toFixed(2)}%</p>
          </div>
          <BarChart className="text-blue-500" size={24} />
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Average Attendance</p>
            <p className="text-2xl font-semibold">{averageAttendance.toFixed(2)}%</p>
          </div>
          <Users className="text-green-500" size={24} />
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Average Engagement</p>
            <p className="text-2xl font-semibold">{averageEngagement.toFixed(2)}/10</p>
          </div>
          <Award className="text-yellow-500" size={24} />
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">At-Risk Students</p>
            <p className="text-2xl font-semibold">{atRiskCount}</p>
          </div>
          <BookOpen className="text-red-500" size={24} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;