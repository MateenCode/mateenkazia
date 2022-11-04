import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Mateen kazia</title>
        <meta name='description' content='Welcome~!' />
        <link rel='icon' href='/favicon.png' />
      </Head>
      <main className={styles.main}></main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
