import { Link } from 'react-router-dom'

import ServiceCard from '../components/ServiceCard'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <>
      <div className={`flex justify-evenly items-center ${styles.introContainer}`} style={{ minHeight: '85vh' }}>
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

          <div className='p-5' style={{ fontSize: '20px', textAlign: 'center', color: '#666' }}>
            <div>Keep The Story Going...</div>
            <div className='mb-5'>Find the book you’re looking for, and make it easier to read.</div>
            <div className='flex justify-center'>
              <Link to={'/library'} className={styles.explore}>
                Explore Now <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 9"><path fill="white" d="M12.5 5h-9c-.28 0-.5-.22-.5-.5s.22-.5.5-.5h9c.28 0 .5.22.5.5s-.22.5-.5.5" /><path fill="white" d="M10 8.5a.47.47 0 0 1-.35-.15c-.2-.2-.2-.51 0-.71l3.15-3.15l-3.15-3.15c-.2-.2-.2-.51 0-.71s.51-.2.71 0l3.5 3.5c.2.2.2.51 0 .71l-3.5 3.5c-.1.1-.23.15-.35.15Z" /></svg>
              </Link>
            </div>
          </div>

        </div>
        <iframe title="Book Nook" src="/Images/Intro.svg" style={{ width: '50vw', height: '500px' }}></iframe>
      </div>

      <div className='flex flex-wrap justify-center gap-5 m-5 p-5'>
        <ServiceCard title='Borrowing books' description='Allowing users to borrow digital or physical books temporarily, with options for renewals and return dates.' icon={`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='2em' height='2em' viewBox='0 0 64 64'%3E%3Cpath fill='%23256382' d='m55 35.1l7.5 7.4l-33.3 15.9s-4.4 2-6.5-1.2C14.5 44.4 55 35.1 55 35.1'/%3E%3Cpath fill='%23d9e3e8' d='M28.4 49.1s-6.4 2.2-5.2 6.5c1.2 4.4 6.3 1.7 6.3 1.7l31.6-14.7s-1.8-4.7 1.4-7.8z'/%3E%3Cpath fill='%2342ade2' d='M33.7 5L64 34.5l-35.8 14l-23-35.8z'/%3E%3Cpath fill='%23fff' d='m34.6 11.7l5.8 6.2l-21.7 7.8l-5.1-7.9z'/%3E%3Cpath fill='%2394989b' d='m61 38l-21.1 8.6l20.8-9.5zm-.3 2.6l-22.5 9.3l22.1-10.3zm.2 1.4L32.2 54.5l28.3-13.4z'/%3E%3Cpath fill='%23428bc1' d='M22.7 57.2c-3.5-7.3 5.5-8.6 5.5-8.6l-23-35.9S0 12.6 0 18c0 2.2 1 3.9 1 3.9z'/%3E%3C/svg%3E")`} />
        <ServiceCard title='Reading challenges' description='Encouraging users to participate in reading challenges with incentives such as badges, leaderboards, and prizes.' icon={`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='2em' height='2em' viewBox='0 0 24 24'%3E%3Cpath fill='%23ffff28' d='M12 11q.825 0 1.413-.587T14 9t-.587-1.412T12 7t-1.412.588T10 9t.588 1.413T12 11M7 21v-2h4v-3.1q-1.225-.275-2.187-1.037T7.4 12.95q-1.875-.225-3.137-1.637T3 8V7q0-.825.588-1.412T5 5h2V3h10v2h2q.825 0 1.413.588T21 7v1q0 1.9-1.263 3.313T16.6 12.95q-.45 1.15-1.412 1.913T13 15.9V19h4v2zm0-10.2V7H5v1q0 .95.55 1.713T7 10.8m10 0q.9-.325 1.45-1.088T19 8V7h-2z'/%3E%3C/svg%3E") `} />
        <ServiceCard title='Author features' description='Highlighting author interviews, and promotional materials to foster a sense of community and encourage user engagement.' icon={`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='2em' height='2em' viewBox='0 0 32 32'%3E%3Cpath fill='%231081c2' d='M5.77 2h-.16c-.8.16-1 .5-.98 1.32v25.37c0 .91.4 1.31 1.3 1.31h20.13c.92 0 1.32-.4 1.32-1.31V12.98c0-.46-.18-.93-.5-1.26L17.66 2.5c-.33-.32-.8-.5-1.26-.5zM21.1 2a1 1 0 0 0-.14.01c-.58.19-.78 1.08-.33 1.5l5.27 5.3c.49.46 1.46.06 1.49-.62V2.9a.91.91 0 0 0-.88-.88h-5.27a1 1 0 0 0-.14 0z'/%3E%3Cpath fill='%23f3f3f3' d='M5.94 3.31V28.7h20.12V12.94L16.44 3.3z'/%3E%3Cpath fill='%231081c2' d='M8.78 14.25v.87h3.94v-.87zm4.81 0v6.12h9.2v-6.12zm.66.66h7.88v4.8h-7.88zM8.78 16v.87h3.94V16zm0 1.75v.87h3.94v-.87zm0 1.75v.87h3.94v-.87zm0 1.75v.87h14v-.87zm0 1.75v.87h14V23zm0 1.75v.87h9.19v-.87z'/%3E%3Cpath fill='%2363bbee' d='M14.25 14.9h7.87v4.82h-7.87z'/%3E%3Cpath fill='%234d4d4d' d='M20.02 16.24c.53.27 1.44 1.2 2.1 1.87v.8H16.1a9.45 9.45 0 0 1 3.94-2.67z'/%3E%3Cpath fill='%23333' d='m18.1 17.8l.04-.38l.7-.3l.38-.37l.68-.28l-.18.45l-.26.48l-.16.51l-.11.3z'/%3E%3Cpath fill='%234d4d4d' d='M18.32 17.45a8 8 0 0 1-1.7-2c-.16.04-.15.02-.27 0l-1.05 1.6c-.35.54-1.05 1.33-1.05 1.33v.54h6.04s-1.44-1.06-1.97-1.47'/%3E%3Cpath fill='%23106802' d='M22.13 18.38h-.34l-1.5.27s-1.48-.4-1.7-.4c-.23 0-.93.13-1.06.13c-.1 0-.65-.27-.79-.27c-.22 0-.47.29-1.13.4c0 0-.19-.42-.31-.4c-.79.31-1.05.27-1.05.27v1.34h7.87v-1.34z'/%3E%3Cpath fill='%23035483' d='M14.25 18.65v1.07h6.82l.27-.27l-.27-.27l-.52-.26l-1.31-.27l-1.32-.13l-1.18.13z'/%3E%3Cpath fill='%23333' d='m14.78 18.11l.37-.6l.44-.54l.34-.63l.42-.63l-.28.8l-.21.65l-.1.42l-.2.44c-.07-.05-.16-.06-.25-.09l-.25.1z'/%3E%3Cpath fill='%23808080' d='m16.6 15.71l.25.8l.26.5l.22.74l.07.36l.24.08l.36-.08c.15-.02.3 0 .45 0l-.38-.59l-.68-.75l-.56-.75l-.22-.3zm3.54.74l.1.35l.44.7l.05.64l.26.2l.6-.1l.43-.02l-.3-.2l-.44-.59l-.64-.56zm-1.78 1.22l.3.45l.46.13l-.46-.34z'/%3E%3Cpath fill='%23666' d='m16.48 15.71l-.12.48l-.2.46l-.14.75l-.28.73h.37l.37-.24l.33.13l.35-.1l-.05-.34l-.2-.49l-.21-.42l-.05-.46zm3.51.74l-.12.48l-.2.46l-.17.54l-.11.31l.9.2l.45.02l-.22-.22l.03-.45l-.16-.42l-.22-.42z'/%3E%3Cpath fill='%230369a3' d='m14.51 18.92l-.26.8h6.56v-.27l-.26-.27l-1.31-.26l-1.31-.14l-1.32.14l-1.42.04z'/%3E%3Cpath fill='%231c99e0' d='m17.14 19.45l.26-.27h1.05l.79.27l.26.27h-.52z' opacity='0.5'/%3E%3Cpath fill='%23ff0' d='M22.13 16.22c-.73 0-1.32-.59-1.32-1.31h1.32z' opacity='0.74'/%3E%3C/svg%3E")`} />
      </div>
    </>
  )
}