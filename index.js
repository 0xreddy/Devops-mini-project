const subjectDetails = document.getElementById('subject-details');
const numSubjectsInput = document.getElementById('num-subjects');

function createSubjectInputs(numSubjects) {
  for(let i=0; i<numSubjects; i++) {
    const div = document.createElement('div');
    div.innerHTML = `
      <h3>Subject ${i+1}</h3>
      <label for="credit${i}">Credit:</label>
      <input type="number" id="credit${i}">
      <br>
      <label for="grade${i}">Estimated Grade:</label>
      <select id="grade${i}">
        <option value="10">O</option>
        <option value="9">A+</option>
        <option value="8">A</option>
        <option value="7">B+</option>
        <option value="6">B</option>
        <option value="5">C</option>
        <option value="4">D</option>
        <option value="0">E (Reappear)</option>
        <option value="0">F (Fail)</option>
        <option value="0">G (Backlog)</option>
        <option value="0">I (Result Incomplete)</option>
      </select>
    `;
    subjectDetails.appendChild(div);
  }
}

numSubjectsInput.addEventListener('change', () => {
  const numSubjects = numSubjectsInput.value;
  subjectDetails.innerHTML = '';
  if(numSubjects > 0) {
    createSubjectInputs(numSubjects);
  }
});

function calculateGPA() {
  const numSubjects = parseInt(numSubjectsInput.value);
  let totalCredits = 0;
  let totalGradePoints = 0;
  let lastTermCGPA = 0;
  let termCGPA = 0;

  // get last term CGPA from user input
  const lastTermCGPAInput = document.getElementById('last-term-cgpa');
  if(lastTermCGPAInput.value !== '') {
    lastTermCGPA = parseFloat(lastTermCGPAInput.value);
  }

  // iterate over each subject and calculate TGPA
  for(let i=0; i<numSubjects; i++) {
    const credit = parseInt(document.getElementById(`credit${i}`).value);
    const grade = parseInt(document.getElementById(`grade${i}`).value);
    totalCredits += credit;
    totalGradePoints += (credit * grade);
  }

  // calculate TGPA and CGPA
  termCGPA = totalGradePoints / totalCredits;
  const currentCGPA = ((lastTermCGPA * numSubjects) + termCGPA) / (numSubjects + 1);

  // display the calculated GPA on the webpage
  const resultDiv = document.getElementById('result');

  if(resultDiv.hasChildNodes()) {
    resultDiv.removeChild(resultDiv.firstChild);
  }

  const p = document.createElement('p');
  p.textContent = `Your TGPA is: ${termCGPA.toFixed(2)}\nYour CGPA is: ${currentCGPA.toFixed(2)}`;

  resultDiv.appendChild(p);
}
