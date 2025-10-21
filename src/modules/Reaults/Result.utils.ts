export const calculateGrade = (subjects: {
  tutorialMark: number;
  writtenMark: number;
  mcqMark: number;
}[]) => {
  const subjectResults = subjects.map((sub) => {
    const writtenPart = sub.writtenMark * 0.8;
    const mcqPart = sub.mcqMark * 0.8;
    const totalMark = sub.tutorialMark + writtenPart + mcqPart;
    return { ...sub, totalMark };
  });

  const totalMarks = subjectResults.reduce((sum, s) => sum + s.totalMark, 0);
  const average = totalMarks / subjectResults.length;

  let grade;
  if (average >= 80) grade = "A+";
  else if (average >= 70) grade = "A";
  else if (average >= 60) grade = "B";
  else if (average >= 50) grade = "C";
  else if (average >= 40) grade = "D";
  else grade = "F";

  return { subjectResults, totalMarks, average, grade };
};
