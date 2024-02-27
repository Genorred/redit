import {HTMLAttributes} from "react";
import classes from './postCard.module.sass'
import {Post} from "../model/models.ts";
import {StaticRate} from "../../Rate";
import {useNavigate} from "react-router-dom";
import {routePaths} from "../../../shared/config/routes.tsx";

interface PostCardProps extends HTMLAttributes<HTMLDivElement>{
    post: Post
}
export const PostCard = ({ post, ...props }: PostCardProps) => {
    const navigate = useNavigate()
    const redirect = () => {
        navigate(`${routePaths.Post}/${post._id}`)
    }
    return (
        <section onClick={redirect} className={classes.postCard} {...props}>
            <p>
                {post._id}
            </p>
            <h3>{post.title}</h3>
            <p>{post.content[0].content}</p>
            <p>{post.rating}</p>
            <StaticRate rate={post.rating}/>
        </section>
    );
};