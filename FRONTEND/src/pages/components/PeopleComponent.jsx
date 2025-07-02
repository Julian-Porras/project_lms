import { FaPlus } from "react-icons/fa";
import { ToastComponent } from "../../components/Toast";
import { ButtonCancel, ButtonCreate, ButtonSecondary } from "../../components/Button";
import { DividerDashed, DividerThin } from "../../components/Divider";
import { LoadingPage } from "../../components/Loading";
import { Modal } from "../../components/Modal";
import { InputText } from "../../components/Input";
import SelectOptions from "../../components/Select";
import { ButtonCard } from "../../components/Card";
import { ModuleNavComponent, ModuleStatusComponent } from "./ModuleNavigationComponent";
import { ModuleComponent } from "./ModuleComponent";
import { LuListStart } from "react-icons/lu";
import { SwitchComponent } from "../../components/Switch";
import { CONTENT } from "../../constants/content";
import { Fragment, useState } from "react";
import { NavLink, useLocation, useParams, useResolvedPath } from "react-router-dom";
import { CreateModuleModal, EditModuleModal, OrderModuleModal } from "./ModalComponent";
import ActivityLog from "./ActivityLog";
import { devClassModuleRouter, devCourseModuleRouter } from "../../router/developerRouter";
import style from "../../styles/page.module.css";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { DataGrid, DEFAULT_GRID_AUTOSIZE_OPTIONS, } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';


function ClassPeopleComponent({
    errors,
    isClassLoading,
    isClassError,
    classData,
    handleSubmit,
    credentials,
    setCredentials,
    isOpen,
    setIsOpen,
    isSubmitting,
    isOpenContent,
    setOpenContent,
    isOpenOrder,
    setOpenOrder,
    isOpenEdit,
    setOpenEdit,
    contentCredentials,
    setContentCredentials,
    handleContentChange,
    handleContentSubmit,
    setModuleId,
    handleEditSubmit,
    groupView,
    handleViewChange,
}) {
    const { class_id } = useParams();
    const location = useLocation();
    const base = location.pathname.split("/")[1];
    const param = class_id;
    let routes = [];
    routes = devClassModuleRouter;

    const [tabValue, setTabValue] = useState('1');
    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const ModuleNavData = {
        base: base,
        routes: routes,
        param: param,
        paramName: 'class_id',
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'firstName', headerName: 'First name', width: 130 },
        { field: 'lastName', headerName: 'Last name', width: 130 },
        {
            field: 'age',
            headerName: 'Age',
            type: 'number',
            width: 90,
        },
        {
            field: 'fullName',
            headerName: 'Full name',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 160,
            valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
        },
    ];

    const rows = [
        { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
        { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
        { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    ];

    const paginationModel = { page: 0, pageSize: 5 };

    // const [expand, setExpand] = useState(DEFAULT_GRID_AUTOSIZE_OPTIONS.expand = false);
    // const autosizeOptions = {
    //     expand,
    // };
    return (
        <div className="flex flex-row ">
            <ModuleNavComponent ModuleNavData={ModuleNavData} />
            {isClassLoading ? (<LoadingPage />) :
                <div className="flex flex-col w-full h-full mx-5">
                    <div className="flex flex-row items-center justify-between " >
                        <div className="flex flex-row items-center gap-4">
                            <p className={style.title} >{classData?.classroom_name}</p>
                            <p className=" text-xs text-gray-500 uppercase">people</p>
                        </div>
                    </div>
                    <DividerThin />
                    <TabContext value={tabValue}>
                        <Box sx={{ maxWidth: { xs: 320, sm: 480 }, margin: 'auto', bgcolor: 'background.paper' }}>
                            <TabList onChange={handleChange} centered >
                                <Tab label="Student" value="1" />
                                <Tab label="Request" value="2" />
                            </TabList>
                        </Box>
                        <TabPanel style={{ paddingInline: '0', paddingBlock: '1rem' }} value="1">

                            <Paper sx={{ height: '100%', width: '100%' }}>
                                <DataGrid
                                    rows={rows}
                                    rowHeight={38}
                                    columns={columns}
                                    initialState={{ pagination: { paginationModel } }}
                                    pageSizeOptions={[5, 10]}
                                    disableRowSelectionOnClick
                                    sx={{ border: 0 }}
                                    autosizeOptions={{expand: 'true'}}
                                />
                            </Paper>
                        </TabPanel>
                        <TabPanel value="2" style={{ paddingInline: '0', paddingBlock: '1rem' }} >
                            <div className={style.gridWrapper}>
                                <div className="flex flex-row items-center justify-center w-full h-full">
                                    <p className="text-lg text-gray-500">Request</p>
                                </div>
                            </div>
                        </TabPanel>
                    </TabContext>
                </div>
            }
        </div>
    );
}

export default ClassPeopleComponent;