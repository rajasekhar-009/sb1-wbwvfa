import { Student } from '../types';

const subjects = ['Math', 'Science', 'English', 'History', 'Art'];

function generateRandomGrade() {
  return Math.floor(Math.random() * 41) + 60; // Random grade between 60 and 100
}

function generateRandomAttendance() {
  return Math.floor(Math.random() * 31) + 70; // Random attendance between 70% and 100%
}

function generateRandomEngagement() {
  return Math.floor(Math.random() * 11); // Random engagement score between 0 and 10
}

export function generateSampleData(count: number): Student[] {
  const students: Student[] = [];

  for (let i = 0; i < count; i++) {
    const grades = subjects.map(subject => ({
      subject,
      score: generateRandomGrade()
    }));

    const attendance = generateRandomAttendance();
    const extracurricularEngagement = generateRandomEngagement();

    const averageGrade = grades.reduce((sum, grade) => sum + grade.score, 0) / grades.length;
    const riskScore = 100 - (averageGrade * 0.4 + attendance * 0.4 + extracurricularEngagement * 2);

    students.push({
      id: i + 1,
      name: `Student ${i + 1}`,
      rollNumber: `R${(i + 1).toString().padStart(3, '0')}`,
      grades,
      attendance,
      extracurricularEngagement,
      riskScore
    });
  }

  return students;
}