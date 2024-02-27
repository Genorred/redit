import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {findPost} from "../../shared/api/post.ts";
import {useFetching} from "../../shared/lib/hooks";
import {Post} from "../../entities/post/model/models.ts";
import classes from "../create-post/createPost.module.sass";

const Post = () => {
    const id = useParams().id
    const [post, setPost] = useState<Post | null>(null)
    const fetchPost = async() => {
        await findPost(id).then(data=>{
            setPost(data)
            console.log(data)
        })
    }
    const [fetching, isLoading, error] = useFetching(fetchPost)
    useEffect(() => {
        fetching()
    }, []);
    return (
        <div>
            {post?.content.map((field, index) =>
                <div key={index} className={classes.FieldSpot}>
                    <div
                         className={classes[field.type]}
                         style={field.styles}
                    >{field.content}</div>
                </div>
            )}
        </div>
    );
};

export default Post;