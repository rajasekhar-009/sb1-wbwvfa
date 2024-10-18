import React, { useState } from 'react';
import { Student } from '../types';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface StudentListProps {
  students: Student[];
  onSelectStudent: (student: Student) => void;
}

const StudentList: React.FC<StudentListProps> = ({ students, onSelectStudent }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = students.filter(student =>
    student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg shadow mt-4">
      <div
        className="p-4 flex justify-between items-center cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h2 className="text-lg font-semibold">Student List</h2>
        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </div>
      {isExpanded && (
        <div className="p-4 border-t">
          <input
            type="text"
            placeholder="Search by roll number or name"
            className="w-full p-2 border rounded mb-4"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="max-h-64 overflow-y-auto">
            {filteredStudents.map(student => (
              <div
                key={student.id}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => onSelectStudent(student)}
              >
                <p className="font-semibold">{student.name}</p>
                <p className="text-sm text-gray-600">Roll Number: {student.rollNumber}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentList;