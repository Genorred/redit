import User from "../../pages/user/User.tsx";
import Auth from "../../pages/auth/Auth.tsx";
import Posts from "../../pages/posts/Posts.tsx";
import Post from "../../pages/post/Post.tsx";
import Comments from "../../pages/comment/Comments.tsx";
import CreatePost from "../../pages/create-post/CreatePost.tsx";
import {Navigate} from "react-router-dom";

export enum routePaths {
    Login = '/login',
    Registration = '/registration',
    User = '/user',
    Posts = '/',
    Post = '/post',
    Comments = '/user/comments',
    CreatePost = '/create'
}
export const authRoutes = [
    {
        path: routePaths.CreatePost,
        element: <CreatePost/>
    },
    {
        path: routePaths.Registration,
        element: <Navigate to={routePaths.Posts} replace/>
    },
    {
        path: routePaths.Login,
        element: <Navigate to={routePaths.Posts} replace/>
    },
]
export const publicRoutes = [
    {
        path: routePaths.Login,
        element: <Auth/>
    },
    {
        path: routePaths.Registration,
        element: <Auth/>
    },
    {
        path: routePaths.User,
        element: <User/>
    },
    {
        path: routePaths.Posts,
        element: <Posts/>
    },
    {
        path: routePaths.Post +'/:id',
        element: <Post/>
    },
    {
        path: routePaths.Comments,
        element: <Comments/>
    },
    {
        path: '/*',
        element: <Navigate to={routePaths.Posts} replace/>
    },
]