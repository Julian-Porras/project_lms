import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useUI } from '../context/uiContext';
import { NavLink } from 'react-router-dom';

export default function BreadCrumb({

}) {
    const { breadcrumbs } = useUI();
    return (
        <div role="presentation" className='mb-2 text-[0.85rem] font-semibold text-gray-500 uppercase text-shadow-2xs ' >
            <Breadcrumbs aria-label="breadcrumb" sx={{ color: 'inherit', fontSize: 'inherit', fontWeight: 'inherit' }}>
                {breadcrumbs.map((breadcrumb, index) => (
                    <NavLink
                        key={index}
                        to={breadcrumb.link}
                        className={`${breadcrumb.active ? 'text-gray-800' : 'inherit'} ${'hover:underline'} flex flex-row items-center gap-1`}
                    >
                        {breadcrumb.icon && (
                            <span className=" text-shadow-2xs">
                                {breadcrumb.icon}
                            </span>
                        )}
                        {breadcrumb.label}
                    </NavLink>
                ))}
            </Breadcrumbs>
        </div>
    );
}