import { useEffect, useCallback, useState } from 'react'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import io from 'socket.io-client'

const TOOLBAR_OPTIONS = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ["bold", "italic", "underline"],
    [{ color: [] }, { background: [] }],
    [{ script: 'sub' }, { script: 'super' }],
    [{ align: [] }],
    ['image', 'blackquote', 'code-block'],
    ['clean']
]

function TextForm() {
    const [socket, setSocket] = useState()
    const [quill, setQuill] = useState()

    useEffect(() => {
        const s = io("http://localhost:3001", {
            query: {
                "my-key": "my-value"
            }
        })
        console.log(`ssssssssssss`, s)
        setSocket(s)
        return () => {
            s.disconnect()
        }
    }, [])

    useEffect(() => {
        if (socket == null || quill == null) return
        const handler = (delta, oldDelta, source) => {
            if (source !== "users") return
            socket.emit("send-changes", delta)
        }
        quill.on('text-change', handler)
        return () => {
            quill.off('text-change', handler)
        }
    }, [socket])

    const wrapperRef = useCallback(wrapper => {
        if (wrapper == null) return
        wrapper.innerHTML = ''
        const editor = document.createElement('div')
        wrapper.append(editor)
        const q = new Quill(editor, { theme: 'snow', modules: { toolbar: TOOLBAR_OPTIONS } })
        setQuill(q)
    }, [])
    return <div id="container" ref={wrapperRef}></div>
}

export default TextForm
