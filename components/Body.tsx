import React, { useState } from 'react'
import axios from 'axios'

interface BodyProps {

}

export const Body: React.FC<BodyProps> = ({}) => {
    const [longURL, setLongURL] = useState<string>('')
    const [miniURL, setMiniURL] = useState<string>('')
    const [showCopyButton, setShowCopyButton] = useState<boolean>(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (longURL.trim().length === 0) {
            alert('The URL field cannot be empty!')
        } else {
            axios.post('/api/minify-url', {
                longURL: longURL
            })
            .then(res => {
                console.log(res)
                setMiniURL(res.data.miniURL)
            })
        }
    }

    const handleCopy = () => {
        setShowCopyButton(true)
        navigator.clipboard.writeText(window.location.href + miniURL)

        setTimeout(() => {
            setShowCopyButton(false)
        }, 2000)
    }

        return (
            <div className="container mx-auto flex flex-col items-center h-full w-full">
                <form onSubmit={handleSubmit} className="mb-10 mt-56 border-black w-11/12 sm:w-4/5 lg:w-2/3 p-4">
                    <h1 className="font-bold text-xl mb-2">Enter a url to be minified</h1>
                    <input value={longURL} onChange={(e) => setLongURL(e.target.value)} placeholder="Enter URL" className="p-1 w-full rounded-md border-2 border-black" />
                    <input type="submit" value="Get Minified URL" className="border-2 border-black bg-black text-white p-2 w-full mt-2 rounded-md hover:bg-blue-700 cursor-pointer active:bg-blue-500" />
                </form>
                {miniURL.length > 0 && (
                <>
                    <div className="text-lg">
                        {window.location.href + miniURL}
                    </div>
                    {showCopyButton 
                    ?
                        <button className="border-2 border-black bg-green-700 text-white px-4 py-1 mt-2 rounded-md">Copied!</button>
                    :
                        <button onClick={handleCopy} className="border-2 border-black bg-black text-white px-2 py-1 mt-2 rounded-md hover:bg-blue-700 cursor-pointer active:bg-blue-500">Copy URL</button>
                    }
                </>
                )}
            </div>
        );
}