const Navbar = () => {
    return (
        <div className="navbar bg-base-300 shadow-sm w-full m-0 px-4">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl text-white">👩‍💻DevTinder</a>
            </div>
            <div className="flex-none gap-2">
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="profile"
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;