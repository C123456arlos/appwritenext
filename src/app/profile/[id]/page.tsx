export default async function UserProfile({ params }: any) {
    const resolved = await params
    const id = resolved.id
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>profile</h1>
            <hr></hr>
            <p className="text-4xl">profile page
                <span className="p-2 rounded ml-2 bg-orange-500 text-black">{id}</span></p>
        </div>
    )
}