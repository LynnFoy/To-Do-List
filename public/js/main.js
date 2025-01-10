import { saveToStorage, getFromStorage } from './storage.js';

const taskInput = document.getElementById('new-task');
const addTaskBtn = document.getElementById('add-task-btn');
const inProgressList = document.getElementById('in-progress-tasks');
const completedList = document.getElementById('completed-tasks');
const deletedList = document.getElementById('deleted-tasks');

let tasks = getFromStorage('tasks') || [];

//Rendre la liste des tâches
const renderTasks = () => {
  inProgressList.innerHTML = '';
  completedList.innerHTML = '';
  deletedList.innerHTML = '';

  tasks.forEach(task => {
    const li = document.createElement('li');
    li.classList.add('task');

    li.innerHTML = `
      <span>${task.text}</span>
      ${!task.deleted ? `
        <button class="complete-btn" data-id="${task.id}">
          ${task.completed ? '↩' : '✓'}
        </button>
        <button class="delete-btn" data-id="${task.id}">🗑</button>
      ` : `
        <button class="permanent-delete-btn" data-id="${task.id}">Supprimer définitivement</button>
      `}
    `;

    if (task.deleted) {
      deletedList.appendChild(li);
    } else if (task.completed) {
      completedList.appendChild(li);
    } else {
      inProgressList.appendChild(li);
    }
  });
};

//Ajouter une nouvelle tâche
addTaskBtn.addEventListener('click', () => {
  if (taskInput.value.trim() === '') return;

  const newTask = {
    id: Date.now(),
    text: taskInput.value,
    completed: false,
    deleted: false
  };

  tasks.push(newTask);
  saveToStorage('tasks', tasks);
  renderTasks();
  taskInput.value = '';
});

//Gestion de la complétion, suppression et suppression définitive
document.addEventListener('click', (e) => {
  const id = e.target.dataset.id;

  if (e.target.classList.contains('complete-btn')) {
    tasks = tasks.map(task =>
      task.id == id ? { ...task, completed: !task.completed } : task
    );
  }

  if (e.target.classList.contains('delete-btn')) {
    tasks = tasks.map(task =>
      task.id == id ? { ...task, deleted: true } : task
    );
  }

  if (e.target.classList.contains('permanent-delete-btn')) {
    tasks = tasks.filter(task => task.id != id);  
  }

  saveToStorage('tasks', tasks);
  renderTasks();
});

renderTasks();

const filterSelect = document.getElementById('filter');
const postIts = document.querySelectorAll('.postit');

//Fonction pour filtrer les post-its
filterSelect.addEventListener('change', () => {
  const selectedFilter = filterSelect.value;

  postIts.forEach(postIt => {
    if (selectedFilter === 'all') {
      postIt.style.display = 'flex';
    } else {
      if (postIt.id.includes(selectedFilter)) {
        postIt.style.display = 'flex';
      } else {
        postIt.style.display = 'none';
      }
    }
  });
});

//Sélectionner l'élément de la calculette
const carrotCalculator = document.querySelector('.carrot-calculator');

//Sélectionner l'élément audio
const carrotSound = document.getElementById('carrot-sound');

//Ajout un événement au survol de la calculette
carrotCalculator.addEventListener('mouseenter', () => {
    carrotSound.currentTime = 0; 
    carrotSound.play(); 
});





