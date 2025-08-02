
// dynamic route does not auto cache request
// but you can update caching behavior implement ISR 
// by adding revalidate option to fetch 

async function getNote(noteId:string){
    const res = await fetch(`http://127.0.0.1:8090/api/collections/notes/records/${noteId}`,
        {
            next:{revalidate: 10}, // regenerate page on server if older than 10 secs
        }
    );
    const data = res.json();
    return data;
}
export default async function NotePage({params}: any){
    const note = await getNote(params.id);
    return (
        <div>
            <h1> note/{note.id}</h1>
            <div>
                <h3>{note.Title}</h3>
                <h5>{note.Content}</h5>
                <p>{note.created}</p>
            </div>
        </div>
    )
}