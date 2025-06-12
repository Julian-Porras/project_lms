import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import SelectOptions from './Select';
import { LIMIT } from '../constants/limit';

function PaginationBase({ page, totalPages, setPage, totalRecords, pageSize, limit, setLimit }) {
    const start = (page - 1) * pageSize + 1;
    const end = Math.min(page * pageSize, totalRecords);

    return (
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 my-4">
            {/* <div className="flex flex-col md:flex-row justify-center items-center gap-4 bg-white rounded-sm px-4 py-2 shadow-sm"> */}
            <div className='flex flex-row items-center gap-8 text-sm text-gray-600'>
                <div className="flex flex-row items-center gap-1">
                    <p>Items per page:</p>
                    <SelectOptions
                        name="limit"
                        id="limit"
                        options={
                            Object.entries(LIMIT).map(([key, value]) => ({
                                id: value,
                                name: value,
                            }))
                        }
                        getOptionLabel={(option) => option.name}
                        getOptionValue={(option) => option.id}
                        selected={limit}
                        setSelected={setLimit}
                        placeholder=""
                        isLoading={false}
                        width={"w-20"}
                    />
                </div>
                <p className="">
                    Page {page} of {totalPages}  •  Showing {start} – {end} of {totalRecords} results
                </p>
            </div>
            <Stack spacing={2}>
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={(_event, value) => setPage(value)}
                    showFirstButton
                    showLastButton
                    siblingCount={1}
                    variant="outlined"
                    shape="rounded"
                    sx={{
                        '& .MuiPaginationItem-root.Mui-selected': {
                            backgroundColor: 'var(--secondary-color, #134B70)',
                            color: '#fff',
                            borderColor: 'var(--secondary-color, #134B70)',
                            '&:hover': {
                                backgroundColor: 'var(--secondary-hover-color, #0f3a58)',
                            },
                        },
                    }}
                />
            </Stack>
        </div>
    );
}
export default PaginationBase;
