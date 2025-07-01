// import Breadcrumbs from '@mui/material/Breadcrumbs';
import { useUI } from '../context/uiContext';
// import { NavLink } from 'react-router-dom';
import React from "react";
import { Breadcrumbs, Menu, MenuItem, IconButton } from "@mui/material";
// import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { NavLink } from "react-router-dom";

export default function BreadCrumb() {
    const { breadcrumbs } = useUI() || {};
    const safeBreadcrumbs = Array.isArray(breadcrumbs) ? breadcrumbs : [];

    // Collapse everything except first and last two
    const shouldCollapse = safeBreadcrumbs.length > 4;
    const first = safeBreadcrumbs[0];
    const middle = shouldCollapse ? safeBreadcrumbs.slice(1, -1) : [];
    const lastTwo = shouldCollapse ? safeBreadcrumbs.slice(-1) : safeBreadcrumbs.slice(1);
    // Dropdown state
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleOpen = (e) => setAnchorEl(e.currentTarget);
    const handleClose = () => setAnchorEl(null);

    return (
        <div className="mb-2 text-[0.9rem] font-semibold text-gray-500 uppercase text-shadow-2xs">
            <Breadcrumbs aria-label="breadcrumb" sx={{ color: "inherit", fontSize: "inherit", fontWeight: "inherit" }}>
                <NavLink to={first?.link} className="hover:underline">{first?.label}</NavLink>

                {shouldCollapse && (
                    <button className=' hover:bg-gray-300 cursor-pointer px-2 rounded-full' onClick={handleOpen}>...</button>
                    // <IconButton onClick={handleOpen} size="small"> ... </IconButton>
                )}

                {(!shouldCollapse ? safeBreadcrumbs.slice(1) : lastTwo).map((breadcrumb, index) => (
                    <NavLink
                        key={index}
                        to={breadcrumb.link}
                        className={`${breadcrumb.active ? 'text-gray-800' : 'inherit'} hover:underline`}
                    >
                        {breadcrumb.label}
                    </NavLink>
                ))}

            </Breadcrumbs>

            {shouldCollapse && (
                <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                    {middle.map((item, i) => (
                        <MenuItem key={i} onClick={handleClose}>
                            <NavLink to={item.link} className="text-gray-700 hover:underline">{item.label}</NavLink>
                        </MenuItem>
                    ))}
                </Menu>
            )}
        </div>
    );
}
