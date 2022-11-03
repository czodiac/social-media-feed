import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { PostAuthor } from './PostAuthor'

export const SinglePostPage = ({ match }) => {
    const { postId } = match.params
    const post = useSelector(state => state.posts.find(post => post.id === postId))

    if (!post) {
        return (
            <section>
                <p2>Post not found.</p2>
            </section>
        )
    }

    return (
        <section>
            <article className="post">
                <h2>{post.title} - <PostAuthor userId={post.user} /></h2>
                <p className="post-content">{post.content}</p>
                <Link to={`/editPost/${post.id}`} className="button">Edit</Link>
            </article>
        </section>
    )
}