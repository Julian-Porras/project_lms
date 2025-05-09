import style from '../styles/divider.module.css'
function DividerThin() {
    return (
        <div className={style.dividerThin}></div>
    );
}

function DividerSolid() {
    return (
        <div className={style.dividerSolid}></div>
    );
}

export { DividerThin, DividerSolid }