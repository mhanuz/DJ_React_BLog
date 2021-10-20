import React from 'react';
import { Link } from 'react-router-dom';
import slugify from 'react-slugify';
const SinglePost = ({post}) => {
    return (
        <div class="media content-section">
            <img class="rounded-circle article-img" src={`http://127.0.0.1:8000${post.user.image}/`} alt="userimage" />
            <div class="media-body">
                    <div class="article-metadata">
                        <Link class="mr-2" to={`/userallapost/${post.user.id}`}>{post.user.user.username}</Link>               
                        <small class="text-muted">{post.date}</small>
                    </div>

                    <h2><Link class="article-title" to={`/details/${slugify(post.title).slice(0,25)}/${post.id}/`}>{post.title}</Link></h2>
                    <p class="article-content" style={{textAlign: "justify", textIndent: '50px',overflow:"hidden",textOverflow:"ellipsis"}}>{post.description.substring(0,400)}.....</p>
            </div>
            {
                post === null && <h3>Data is not found</h3>
            }
        </div>
    );
};

export default SinglePost;