
const userTask = document.querySelector('.main input');
const addBtn = document.querySelector('.main button');
const output = document.querySelector('.output');
const main = document.querySelector('.main');

const message = document.createElement('div');
const downloadBtn = document.createElement('div');
const tasks = JSON.parse(localStorage.getItem('tasklist')) || [];


// Download button
downloadBtn.classList.add('btn');
downloadBtn.textContent = 'Download your list';
document.body.append(downloadBtn);
downloadBtn.style.display = 'none';

// Create empty input field message
message.style.display = 'none';
message.style.color = 'red';
main.append(message);

// Add list item
addBtn.addEventListener('click', createListItem);

// Remove empty input field message
userTask.addEventListener('change', (e)=>{
  message.style.display = 'none';
});

// Make download button clickable
downloadBtn.addEventListener('click', downloadFile);

if(tasks.length > 0){
  tasks.forEach((task) => {
    genItem(task.val, task.checked)
  });
  showDownload();
}


// Function that download file
function downloadFile(){
  const curList = output.querySelectorAll('li');
  let temp = 'My list \n';

  curList.forEach((el) => {
    if (el.classList.contains('ready')) {
      temp += '-';
    }
    temp += `${el.textContent}\n`;
  });

  const element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,'+encodeURIComponent(temp));
  element.setAttribute('download', 'My List');
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}


// Build tasks
function buildTasks(){
  tasks.length = 0;
  const curList = output.querySelectorAll('li');

  curList.forEach((el) => {
    const tempTask = {
      val: el.textContent,
      checked: false
    };

    if (el.classList.contains('ready')) {
      tempTask.checked = true;
    }

    tasks.push(tempTask);
  });
  saveTask();
}


// Function empty input field message
function errorMsg(msg){
  message.style.display = 'block';
  message.textContent = msg;
  userTask.focus();
}


// Function that show download button
function showDownload(){
  const curList = output.querySelectorAll('li');
  if(curList.length > 0){
    downloadBtn.style.display = 'block';
  }else {
    downloadBtn.style.display = 'none';
  }
}


// Generate list item function
function genItem(val, complete){
  const li = document.createElement('li');
  const temp = document.createTextNode(val);
  li.appendChild(temp);
  output.append(li);
  userTask.value = '';

  if(complete){
    li.classList.add('ready');
  }

  li.addEventListener('click', (e)=>{
    li.classList.toggle('ready');
    buildTasks();
  });
  const btn = document.createElement('button');
  btn.innerHTML = '<i class="fas fa-trash-alt"></i>';
  li.append(btn);
// Remove list item
  btn.addEventListener('click', (e)=>{
    li.remove();
    showDownload();
    buildTasks()
  });
  return val;
}


// Save task List
function saveTask(){
  localStorage.setItem('tasklist', JSON.stringify(tasks));
}


// Create list item function
function createListItem(){
  const val = userTask.value;
// Check if value is available
  if(val.length > 0){
    const myObj = {
      val:genItem(val, false),
      checked:false
    };
    tasks.push(myObj);
    saveTask();
    showDownload();
  }else {
// Show empty input field message
    errorMsg('Input text field is empty.');
  }
}
