import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';
import { Header } from './components/Header';
import { Task } from './components/Task';
import { ClipboardText, PlusCircle } from 'phosphor-react';
import styles from './App.module.css';
import './global.css';

interface Tarefas {
  id: number;
  content: string;
  isDone: boolean;
}

function App() {

  const [newTaskContent, setNewTaskContent] = useState('');

  function handleNewTaskContent(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('');
    setNewTaskContent(event.target.value);
  }

  const [listOfTasks, setListTask] = useState<Tarefas[]>([]);

  const totalOfDoneTasks = listOfTasks.filter(task => {
    return task.isDone === true;
  }).length;

  function handleNewTask(event: FormEvent) {
    event.preventDefault()
    setListTask((state) => {
      const newId = state.length + 1;
      return [{ id: newId, content: newTaskContent, isDone: false }, ...state]
    });
    setNewTaskContent('');
  }

  function handleNewTaskInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity('Este campo é obrigatório!!!')
  }

  function onDeleteTask(idToRemove: number) {
    const tasksWithoutDeletedOne = listOfTasks.filter(task => {
      return task.id != idToRemove
    });
    setListTask(tasksWithoutDeletedOne);
  }

  function onCheckTask(idToCheck: number) {
    const tasksWithCheckedOne = listOfTasks.map(task => {
      if (task.id === idToCheck) {
        return { ...task, isDone: !task.isDone }
      } else {
        return task;
      }
    });

    setListTask(tasksWithCheckedOne);
  }

  return (
    <div>
      <Header />

      <div className={styles.newTask}>
        <form
          onSubmit={handleNewTask}
          className={styles.newTaskForm}
        >
          <input
            onChange={handleNewTaskContent}
            onInvalid={handleNewTaskInvalid}
            type="text"
            value={newTaskContent}
            placeholder='Adicione uma nova tarefa'
            required
          />
          <button
            type='submit'
            title='Criar nova tarefa'
          >
            Criar
            <PlusCircle />
          </button>
        </form>
      </div>

      <main>

        <div className={styles.Tasks}>
          <strong
            className={styles.createdTasks}
          >
            Tarefas criadas <a>{listOfTasks.length}</a>
          </strong>

          <strong
            className={styles.doneTasks}
          >
            Concluídas <a>{totalOfDoneTasks} de {listOfTasks.length}</a>
          </strong>
        </div>

        {listOfTasks.length == 0 ?
          (
            <div className={styles.emptyTasks}>
              <ClipboardText size={56} />
              <strong>Você ainda não tem tarefas cadastradas</strong>
              <p>Crie tarefas e organize seus itens a fazer</p>
            </div>
          )
          :
          (
            listOfTasks.map(task => {
              return <Task
                onCheckTask={onCheckTask}
                onDeleteTask={onDeleteTask}
                id={task.id}
                content={task.content}
                isDone={task.isDone}
                key={task.id}
              />
            })
          )}

      </main>

    </div>
  )
}

export default App
