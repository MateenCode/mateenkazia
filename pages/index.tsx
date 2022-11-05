import Head from 'next/head';
import styles from '../styles/Home.module.css';
// import Image from 'next/image';
import ParticlesContainer from '../src/components/Particles';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Mateen kazia</title>
        <meta name='description' content='Welcome~!' />
        <link rel='icon' href='/favicon.png' />
      </Head>
      <main className={styles.main}>
        <ParticlesContainer />
        <Typography variant='h1'>Welcome to my website!</Typography>
        {/* <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            '& > :not(style)': {
              m: 1,
              width: 500,
              height: 500
            }
          }}
        >
          <Paper elevation={3} />
        </Box> */}
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
