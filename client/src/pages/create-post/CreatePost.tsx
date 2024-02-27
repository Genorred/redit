import classes from './createPost.module.sass';
import {EditPanel} from "../../widgets/editPanel";
import {PostLeftPanel} from "../../widgets/postLeftPanel";
import {FieldSpot} from "../../widgets/fieldSpot";

const CreatePost = () => {
    return (
        <div className={classes.CreatePostCard}>
            <PostLeftPanel/>
            <FieldSpot/>
            <EditPanel/>
        </div>
    );
};

export default CreatePost;