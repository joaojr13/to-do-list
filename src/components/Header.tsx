import styles from '../components/Header.module.css';
import todoLogo from '../assets/logo-to-do.svg';

export function Header() {
  return (
    <header className={styles.header}>
      <img
        src={todoLogo}
      />
    </header>
  );
}