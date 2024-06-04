import { FC } from "react";
import './loader.css'
const Loader: FC = () => {
    return (<>
        <div className="w-full h-screen flex justify-center items-center">
            <div className="loader"></div>
        </div>
    </>);
}

export default Loader;