import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { nanoid } from '@reduxjs/toolkit' // To generated a random unique ID
import { postAdded } from './postsSlice'

export const AddPostForm = () => {
    // Hook
    // 1. Unlike with classes, the state doesn’t have to be an object. We can keep a number or a string if that’s all we need. 
    // 2. It returns a pair of values: the current state and a function that updates it.
    //  [] in JS is called, "array destructuring".
    //  const [fruit, setFruit] = useState('banana'); is equal to:
    //  var fruitStateVariable = useState('banana'); // Returns a pair
    //  var fruit = fruitStateVariable[0]; // First item in a pair
    //  var setFruit = fruitStateVariable[1]; // Second item in a pair
    const [title, setTitle] = useState('') // Declare a new state variable, which we'll call "title". The only argument to the useState() Hook is the initial state.
    const [content, setContent] = useState('')

    const dispatch = useDispatch()

    const onTitleChanged = e => setTitle(e.target.value)
    const onContentChanged = e => setContent(e.target.value)

    const onSavePostClicked = () => {
        if (title && content) {
            dispatch(
                postAdded(title, content)
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
                Post Title:
                <input
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    value={title}
                    onChange={onTitleChanged}
                />
                Content:
                <textarea
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChanged}
                />
                <button type="button" onClick={(onSavePostClicked)}>Save</button> {/* onClick={() => setTitle('New title') */}
            </form>
        </section>
    )
}