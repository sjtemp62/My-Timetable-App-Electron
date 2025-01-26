document.getElementById('generate-btn').addEventListener('click', async () => {
    // 시간표 데이터 예제
    const schedules = [
      [
        [{ id: 1, name: "Mathematics", professor: "Dr. Kim", group: "A" }, null, null, null, { id: 2, name: "Physics", professor: "Dr. Lee", group: "B" }],
        [{ id: 1, name: "Mathematics", professor: "Dr. Kim", group: "A" }, null, null, null, { id: 2, name: "Physics", professor: "Dr. Lee", group: "B" }],
        [null, { id: 3, name: "Chemistry", professor: "Dr. Park", group: "A" }, null, null, null],
        [null, { id: 3, name: "Chemistry", professor: "Dr. Park", group: "A" }, null, null, null],
        [null, null, null, null, null],
        [null, null, null, null, null],
        [null, null, null, null, null],
        [null, null, null, null, null],
        [null, null, null, null, null],
      ],
    ];
  
    // 첫 번째 시간표 조합 선택
    const timetable = schedules[0];
  
    // 시간표 렌더링
    renderTimetable(timetable);
  });
  
  /**
   * 시간표를 렌더링하는 함수
   * @param {Array} timetable - 9x5 배열 (시간표 데이터)
   */
  function renderTimetable(timetable) {
    const container = document.getElementById('timetable-container');
    container.innerHTML = ''; // 기존 테이블 초기화
  
    // 테이블 생성
    const table = document.createElement('table');
    const days = ['월', '화', '수', '목', '금'];
  
    // 헤더 추가
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    headerRow.appendChild(document.createElement('th')); // 빈 셀 (교시 번호)
    days.forEach((day) => {
      const th = document.createElement('th');
      th.textContent = day;
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);
  
    // 테이블 내용 생성
    const tbody = document.createElement('tbody');
    timetable.forEach((row, rowIndex) => {
      const tr = document.createElement('tr');
  
      // 교시 번호 추가
      const th = document.createElement('th');
      th.textContent = `${rowIndex + 1}교시`;
      tr.appendChild(th);
  
      // 시간표 데이터 추가
      row.forEach((cell) => {
        const td = document.createElement('td');
        if (cell) {
          // 과목 ID에 따른 색상 클래스 추가
          td.classList.add(`subject-${cell.id}`);
  
          // 과목 정보 표시
          const infoDiv = document.createElement('div');
          infoDiv.classList.add('subject-info');
          infoDiv.innerHTML = `
            <div class="name">${cell.name}</div>
            <div class="professor">${cell.professor}</div>
            <div class="group">분반: ${cell.group}</div>
          `;
          td.appendChild(infoDiv);
        } else {
          td.classList.add('empty'); // 빈 칸 클래스 추가
        }
        tr.appendChild(td);
      });
  
      tbody.appendChild(tr);
    });
  
    table.appendChild(tbody);
    container.appendChild(table);
  }
  