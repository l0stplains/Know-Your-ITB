import React from 'react';

export default function Result({ theme }: { theme: string }) {
  // theme can be 'ukm' or 'hmif', use it to choose color logic
  const color = theme === 'ukm' ? '#457082' : '#3c899f';
  return (
    <div>
      <button style={{ ...styles.button, color: color, borderColor: color }}>
        <div style={{ ...styles.backArrow, color: color }}>&lt;</div>
        <div style={styles.text}>Retake Test</div>
      </button>
      <div style={styles.container as React.CSSProperties}>
        <h1 style={styles.title}>Result</h1>
        <p style={styles.subtitle}>Here are the top 5 units that are the best match for you!</p>
      </div>
      {[1, 2, 3, 4, 5].map((index) => (
        <div key={index} style={styles.containerresult}>
          <div style={styles.indexContainer}>
            <div style={styles.index}>{index}</div>
          </div>
          <div style={styles.content}>
            <div style={styles.logo}>Logo</div>
            <div style={styles.textContainer as React.CSSProperties}>
              <div style={styles.titleresult}>Lorem Ipsum</div>
              <a href="#" style={styles.link}>See more about Lorem Ipsum</a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

const styles = {
  button: {
    display: 'flex',
    alignItems: 'center',
    padding: '2vh 4vh',
    cursor: 'pointer',
  },
  backArrow: {
    fontSize: '4vh',
    marginRight: '2vh',
    fontWeight: 'bold',
  },
  text: {
    fontSize: '3vh',
    fontWeight: 'bold',
  },
  container: {
    textAlign: 'center',
    marginTop: '-2vh',
  },
  title: {
    fontSize: '4vh',
    color: '#457082',
    margin: '0',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: '2vh',
    color: '#457082',
    marginTop: '1vh',
    fontWeight: 'bold',
  },
  containerresult: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '1vh 20vh',
    marginBottom: '2vh',
  },
  indexContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '6vh',
    height: '6vh',
    borderRadius: '50%',
    border: '5px solid #3c899f',
    marginRight: '1vh',
  },
  index: {
    fontSize: '4vh',
    color: '#3c899f',
    fontWeight: 'bold',
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
    backgroundColor: '#6a92a6',
    borderRadius: '15px',
    padding: '2vh',
  },
  logo: {
    width: '6vh',
    height: '6vh',
    borderRadius: '50%',
    border: '2px solid #ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff',
    fontSize: '2vh',
    marginRight: '2vh',
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  titleresult: {
    fontSize: '2vh',
    color: '#ffffff',
    marginBottom: '0.5vh',
  },
  link: {
    fontSize: '2vh',
    color: '#cce4ee',
    textDecoration: 'none',
  },
};