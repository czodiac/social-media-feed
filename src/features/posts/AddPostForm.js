import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postAdded } from './postsSlice'
import { addNewPost } from './postsSlice'

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
    const [userId, setUserId] = useState('')
    const [addRequestStatus, setAddRequestStatus] = useState('idle')

    const dispatch = useDispatch()
    const users = useSelector(state => state.users) // useSelector: Gets a specific value from state

    const onTitleChanged = e => setTitle(e.target.value)
    const onContentChanged = e => setContent(e.target.value)
    const onAuthorChanged = e => setUserId(e.target.value)

    const canSave = [title, content, userId].every(Boolean) && addRequestStatus === 'idle'
    const onSavePostClicked = async () => {
        if (canSave) {
            try {
                setAddRequestStatus('pending')
                // Without .unwrap(), catch(err) won't be executed and it won't log 'Failed to save post: ' to the console when there's error.
                // Redux Toolkit adds .unwrap() function to the returned Promise, which will return a new Promise that either has the actual action.payload value from a fulfilled action, or throws an error if it's the rejected action. This lets us handle success and failure in the component using normal try/catch logic.
                await dispatch(addNewPost({ title, content, user: userId })).unwrap()
                setTitle('')
                setContent('')
                setUserId('')
            } catch (err) {
                console.error('Failed to save post: ', err)
            } finally {
                setAddRequestStatus('idle')
            }
        }
    }

    /* Map: The map() function is used to iterate over an array and manipulate or change data items.
    const num2x = [3, 8, 11, 7, 5].map((n) => n * 2);
    console.log(num2x); // [6, 16, 22, 14, 10] 
    */
    const usersOptions = users.map(user => (
        <option key={user.id} value={user.id}>{user.name}</option>
    ))

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
                    placeholder="What's on your mind?"
                    value={title}
                    onChange={onTitleChanged}
                />
                Authors:
                <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
                    <option value=""></option>
                    {usersOptions}
                </select>
                Content:
                <textarea
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChanged}
                />
                <button type="button" onClick={(onSavePostClicked)} disabled={!canSave}>Save</button> {/* onClick={() => setTitle('New title') */}
            </form>
        </section>
    )
}