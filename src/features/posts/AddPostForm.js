import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { nanoid } from '@reduxjs/toolkit' // To generated a random unique ID
import { postAdded } from './postsSlice'

export const AddPostForm = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const dispatch = useDispatch()

    const onTitleChanged = e => setTitle(e.target.value)
    const onContentChanged = e => setContent(e.target.value)

    const onSavePostClicked = () => {
        if (title && content) {
            dispatch(
                postAdded({ id: nanoid(), title, content })
            )
        }
        setTitle('')
        setContent('')
    }

    return (
        <section>
            <h2>Add a new post</h2>
            <form>
                {/* Since for is a reserved word in JavaScript, React elements use htmlFor instead. */}
                <lable htmlFor="postTitle">Post Title:</lable>
                <input
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    value={title}
                    onChange={onTitleChanged}
                />
                <lable htmlFor="postContent">Content:</lable>
                <textarea
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChanged}
                />
                <button type="button" onClick={onSavePostClicked}>Save</button>
            </form>
        </section>
    )
}