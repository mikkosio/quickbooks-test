"use client";

import { useSession } from "next-auth/react";


export default function Home() {
    const { data: session } = useSession();
    console.log(session, 'session')
    
    return (
        <>
            <h1>hello</h1>
        </>
    )
}