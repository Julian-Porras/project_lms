import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

export default function BreadCrumb({

}) {
    const active = true;
    return (
        <div role="presentation" className='mb-3 text-[0.85rem] font-semibold text-gray-500 uppercase' >
            <Breadcrumbs aria-label="breadcrumb" sx={{ color: 'inherit', fontSize: 'inherit', fontWeight: 'inherit' }}>
                <Link
                    underline="hover"
                    color='inherit'
                    href="/">
                    MUI
                </Link>
                <Link
                    underline="hover"
                    color='inherit'
                    href="/"
                >
                    Core
                </Link>
                <Link
                    underline="hover"
                    color={active ? 'textPrimary' : 'inherit'}
                    href="/"
                    aria-current="page"
                >
                    Breadcrumbs
                </Link>
            </Breadcrumbs>
        </div>
    );
}