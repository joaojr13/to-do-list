import { Trash } from 'phosphor-react';
import styles from '../components/Task.module.css';

interface TaskProps {
  id: number,
  content: string,
  isDone: boolean,
  onCheckTask: (id: number) => void;
  onDeleteTask: (id: number) => void;
}

export function Task({ id, content, isDone, onCheckTask, onDeleteTask }: TaskProps) {

  function handleCheckTask() {
    onCheckTask(id);
  };

  function handleDeleteTask() {
    onDeleteTask(id);
  };

  return (
    <article className={styles.task}>
      <input
        type="checkbox"
        onClick={handleCheckTask}
      />
      <div className={isDone ? styles.taskContentDone : styles.taskContent}>
        <span>{content}</span>
      </div>
      <button
        onClick={handleDeleteTask}
      >
        <Trash />
      </button>
    </article>
  );
}