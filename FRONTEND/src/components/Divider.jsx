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

function DividerDashed() {
    return (
        <div
            style={{
                borderTop: '1px dashed transparent',
                borderImage: 'repeating-linear-gradient(to right, #ccc 0 10px, transparent 10px 20px)',
                borderImageSlice: 1,
                height: 0,
                margin: '1rem 0',
            }}
        />
    );
}
export { DividerThin, DividerSolid, DividerDashed }