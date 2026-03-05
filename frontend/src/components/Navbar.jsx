
const Navbar = () =>{
    return (
<div className="navbar bg-base-100 shadow-sm bg-opacity-90">
  <div className="flex-1">
    <a className="btn btn-ghost text-xl">👩‍💻DevTinder</a>
  </div>
  <div className="flex-none">
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full my-5">
          <img
            alt="Tailwind CSS Navbar component "
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
    </div>
  </div>
</div>
    );
}


export default Navbar