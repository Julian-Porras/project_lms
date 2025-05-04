import style from "../styles/header.module.css";

function Header(){
    return (
        <header >
            <div className={style.logoContainer}>
                <img src="/src/assets/images/react.svg" className="w-6" alt="" />
                <h2 className="text-md px-2">LMS</h2>
            </div>
        </header>
    );
}

export default Header;