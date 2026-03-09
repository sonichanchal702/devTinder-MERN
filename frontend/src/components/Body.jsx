import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Body= () => {
    return (
        <div className="min-h-screen flex-col overflow-x-hidden w-full">
            <Navbar />

            <main className="flex-grow">
                <Outlet /> 
            </main>

            <Footer />     
        </div>
    );
}

export default Body;