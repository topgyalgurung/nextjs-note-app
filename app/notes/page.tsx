import PocketBase from 'pocketbase';
import Link from "next/link";
import styles from './Notes.module.css'

// for caching now with pocketbase sdk, if not using fetch
export const dynamic = 'auto',
    dynamicParams = true,
    revalidate = 0, 
    fetchCache = 'auto',
    runtime = 'nodejs',
    preferredRegion = 'auto'


async function getNotes(){
    // Pocketbase own sdk works like orm 
    const db = new PocketBase('http://127.0.0.1:8090')
    const data = await db.collection('notes').getList(1,18);

    // treated like static page nextjs will auto cache since route segment not dynamic , to change add cache 
    // const res = await fetch('http://127.0.0.1:8090/api/collections/notes/records?page=1&perPage=30',
    //     {cache:'no-store'} // now will refetch from server every request 
        // this now same as getServerSideProps old feat
    // )
    // const data = await res.json();
    return data?.items as any[];
}
export default async function NotesPage(){
    const notes = await getNotes();
    return (
        <div className={styles.grid}>
            <h1> Notes</h1>
            <div>
                {notes?.map((note) => {
                return <Note key={note.id} note={note}/>;
            })}
                 </div>

        </div>
    )
}
// i know any ain't good type lol
function Note({note}:any){
    const {id, Title, Content, created} = note || {};
    return(
         <Link href={`/notes/${id}`}>
        <div className={styles.note}>
            <h2>{Title} </h2>
            <h5>{Content} </h5>
            <p> {created}</p>
        </div>
    </Link>
    )
}