import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={`flex justify-evenly items-center ${styles.introContainer}`} style={{minHeight:'85vh'}}>
      <div className='flex flex-col justify-center items-center gap-16'>

        <div className={`flex ${styles.title}`} style={{ fontSize: '60px' }}>
          <div className='flex flex-col me-2'>
            <div>B</div>
            <div>N</div>
          </div>
          <span className={styles.clip1}></span>
          <span className={styles.clip2}></span>
          <div className='flex flex-col'>
            <div>K</div>
            <div>K</div>
          </div>
        </div>

        <div className='p-5' style={{ fontSize: '20px',textAlign:'center',color:'#666' }}>
          <div>Keep The Story Going...</div>
          <div>Find the book you’re looking for easier to read.</div>
        </div>

      </div>
      <iframe title="Book Nook" src="/Images/Intro.svg" style={{ width: '50vw', height: '500px' }}></iframe>
    </div>
  )
}