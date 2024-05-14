import { Search } from "lucide-react";

const Searchbutton = () => {
    return ( 
        <>
        <div className="flex h-8 bg-slate-200">
            {/* <input type="text" /> */}
            <Search size={32} strokeWidth={3} />
        </div>
        </>
     );
}
 
export default Searchbutton;