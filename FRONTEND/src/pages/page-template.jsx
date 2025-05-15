import style from "../styles/page.module.css";

function PageTemplate({ title, children }) {
    return (
        <>
            <div className="flex flex-col gap-4" >
                <p className={style.title} >{`${title}`}</p>
            </div>
            {children}
        </>
    );
}

export default PageTemplate;