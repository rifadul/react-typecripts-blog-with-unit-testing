import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
    Container,
    Pagination,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material/';

export interface InitPost {
    title: string;
    url: string;
    created_at: Date;
    author: string;
    objectID: number;
}

const Post = (props: any) => {
    const {posts,handleChange,page,currentPage,rowsPerPage}= props
    
    
    const navigate = useNavigate();

    //paginations
    // const [page, setPage] = useState<number>(1);
    // const [currentPage, setCurrentPage] = useState<number>(1);
    // const rowsPerPage = 20;


    // useEffect(() => {
    //     setCurrentPage(parseInt((posts.length / rowsPerPage).toString()));
    // }, [posts, rowsPerPage]);


    const postDetails = (post: InitPost) => {
        // console.log('i am click', post);
        navigate(`/post-details/${post.objectID}`, { state: post });
    };

    // const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    //     setPage(value);
    //     // console.log('pa3w', value);
    // };
    return (
        <Container maxWidth="xl" data-testid="post-component-testid">
            <h1>Post</h1>
            {/* <h1>page{pageNumber}</h1> */}
            {posts.length > 0 ? (
                <>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Title</TableCell>
                                    <TableCell align="center">Url</TableCell>
                                    <TableCell align="center">Author</TableCell>
                                    <TableCell align="center">
                                        Create At
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {posts
                                    .slice(
                                        rowsPerPage * (page - 1),
                                        rowsPerPage * (page - 1) + rowsPerPage
                                    )
                                    .map(
                                        (
                                            row: InitPost,
                                            i: React.Key | null | undefined
                                        ) => (
                                            <TableRow
                                                key={i}
                                                sx={{
                                                    '&:last-child td, &:last-child th':
                                                        {
                                                            border: 0,
                                                        },
                                                }}
                                                onClick={() => postDetails(row)}
                                                data-testid="click-testid">
                                                <TableCell
                                                    component="th"
                                                    scope="row"
                                                    data-testid="title-testid">
                                                    {row.title}
                                                </TableCell>
                                                <TableCell data-testid="url-testid">
                                                    {row.url}
                                                </TableCell>
                                                <TableCell data-testid="author-testid">
                                                    {row.author}
                                                </TableCell>
                                                <TableCell data-testid="create-at-testid">
                                                    {row.created_at}
                                                </TableCell>
                                            </TableRow>
                                        )
                                    )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Stack spacing={2}>
                        <Pagination
                            count={currentPage}
                            page={page}
                            onChange={handleChange}
                            color="secondary"
                            data-testid="pagination"
                        />
                    </Stack>
                </>
            ) : (
                <h3>Loading new Post Data...</h3>
            )}
        </Container>
    );
};

export default Post;
