/**
 * timetable.js
 * 시간표 조합 로직
 */

// 시간 중복 여부 확인
function isConflict(timetable, subject) {
    for (const time of subject.times) {
      const { day, periods } = time;
      for (const period of periods) {
        if (timetable[period - 1][day] !== null) {
          return true;
        }
      }
    }
    return false;
  }
  
  // 시간표에 과목 추가
  function addSubjectToTimetable(timetable, subject) {
    for (const time of subject.times) {
      const { day, periods } = time;
      for (const period of periods) {
        timetable[period - 1][day] = subject.id;
      }
    }
  }
  
  // 시간표 조합 생성
  function generateSchedules(subjects) {
    const mandatorySubjects = subjects.filter((s) => s.isMandatory);
    const optionalSubjects = subjects.filter((s) => !s.isMandatory);
    const combinations = [];
    const timetable = Array.from({ length: 9 }, () => Array(5).fill(null));
  
    // 필수 과목 배치
    for (const subject of mandatorySubjects) {
      if (!isConflict(timetable, subject)) {
        addSubjectToTimetable(timetable, subject);
      }
    }
  
    // 선택 과목 조합 탐색
    function backtrack(index, currentTimetable) {
      if (index === optionalSubjects.length) {
        combinations.push(JSON.parse(JSON.stringify(currentTimetable)));
        return;
      }
  
      const subject = optionalSubjects[index];
      if (!isConflict(currentTimetable, subject)) {
        addSubjectToTimetable(currentTimetable, subject);
        backtrack(index + 1, currentTimetable);
        for (const time of subject.times) {
          const { day, periods } = time;
          for (const period of periods) {
            currentTimetable[period - 1][day] = null;
          }
        }
      }
      backtrack(index + 1, currentTimetable);
    }
  
    backtrack(0, timetable);
    return combinations;
  }
  
  module.exports = { generateSchedules };
  