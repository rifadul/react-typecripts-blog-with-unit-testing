import React from 'react';
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

import { InitPost } from '../App';

const Post = (props: any) => {
    const { posts, handleChange, page, currentPage, rowsPerPage } = props;

    const navigate = useNavigate();

    const postDetails = (post: InitPost) => {
        navigate(`/post-details/${post.objectID}`, { state: post });
    };

    return (
        <Container maxWidth="xl" data-testid="post-component-testid">
            <h1>Post</h1>
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
                                            postData: InitPost,
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
                                                onClick={() => postDetails(postData)}
                                                data-testid="click-testid">
                                                <TableCell
                                                    component="th"
                                                    scope="row"
                                                    data-testid="title-testid">
                                                    {postData.title}
                                                </TableCell>
                                                <TableCell data-testid="url-testid">
                                                    {postData.url}
                                                </TableCell>
                                                <TableCell data-testid="author-testid">
                                                    {postData.author}
                                                </TableCell>
                                                <TableCell data-testid="create-at-testid">
                                                    {postData.created_at}
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
