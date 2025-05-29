import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

function PaginationBase({ page, totalPages, setPage, totalRecords, pageSize }) {
    const start = (page - 1) * pageSize + 1;
    const end = Math.min(page * pageSize, totalRecords);

    return (
        <div className="flex flex-col md:flex-row mt-4 justify-between items-center gap-2">
            <p className="text-sm text-gray-600">
                Page {page} of {totalPages}  •  Showing {start} – {end} of {totalRecords} results
            </p>
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
