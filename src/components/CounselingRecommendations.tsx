import React from 'react';
import { Student } from '../types';

interface CounselingRecommendationsProps {
  student: Student | null;
}

const CounselingRecommendations: React.FC<CounselingRecommendationsProps> = ({ student }) => {
  if (!student) return null;

  const generateRecommendations = (student: Student) => {
    const recommendations = [];

    if (student.riskScore > 70) {
      recommendations.push("Urgent intervention required. Schedule a one-on-one counseling session.");
    }

    if (student.attendance < 80) {
      recommendations.push("Improve attendance. Discuss potential barriers to regular class attendance.");
    }

    if (student.extracurricularEngagement < 5) {
      recommendations.push("Encourage participation in extracurricular activities to boost overall engagement.");
    }

    const lowGrades = student.grades.filter(grade => grade.score < 70);
    if (lowGrades.length > 0) {
      recommendations.push(`Provide additional support for ${lowGrades.map(g => g.subject).join(', ')}.`);
    }

    return recommendations;
  };

  const recommendations = generateRecommendations(student);

  return (
    <div className="bg-white rounded-lg shadow mt-4 p-4">
      <h2 className="text-xl font-semibold mb-4">Counseling Recommendations</h2>
      {recommendations.length > 0 ? (
        <ul className="list-disc pl-5">
          {recommendations.map((recommendation, index) => (
            <li key={index} className="mb-2">{recommendation}</li>
          ))}
        </ul>
      ) : (
        <p>No specific recommendations at this time. Keep up the good work!</p>
      )}
    </div>
  );
};

export default CounselingRecommendations;