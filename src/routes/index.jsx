import { Routes, Route } from "react-router-dom";
import Home from "../views/home.jsx";
import PostIndex from "../views/post/index.jsx";
import PostCreate from "../views/post/create.jsx";
import PostEdit from "../views/post/edit.jsx";

function RouteIndex(){
    return(
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts" element={<PostIndex />} />
            <Route path="/posts/create" element={<PostCreate />} />
            <Route path="/posts/edit/:id" element={<PostEdit />} />
        </Routes>
    )
}
export default RouteIndex;