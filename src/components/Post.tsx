import axios from 'axios';
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

export const Post = () => {
    const [posts, setPosts] = useState<InitPost[]>([]);
    const [pageNumber, setPageNumber] = useState(0);
    const navigate = useNavigate();
    const [page, setPage] = useState<number>(1);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const rowsPerPage = 20;

    useEffect(() => {
        getPostData();
        const interval = setInterval(() => {
            setPageNumber((pageNumber) => pageNumber + 1);
            console.log('This will run every second!');
        }, 10000);
        return () => clearInterval(interval);
    }, [pageNumber]);

    useEffect(() => {
        setCurrentPage(parseInt((posts.length / rowsPerPage).toString()));
    }, [posts]);

    const getPostData = async () => {
        try {
            // console.log('pagenumber', pageNumber);

            const response = await axios.get(
                `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${pageNumber}`
            );
            // console.log(response.data.hits);
            // console.log([...posts, ...response.data.hits]);

            setPosts((posts) => [...posts, ...response.data.hits]);
        } catch (error) {
            console.error(error);
        }
    };

    const postDetails = (post: InitPost) => {
        console.log('i am click', post);
        navigate(`/post-details/${post.objectID}`, { state: post });
    };

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        console.log('pa3w', value);
    };
    return (
        <Container maxWidth="xl" data-testid="post-component-testid">
            <h1>Post</h1>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell align="right">Url</TableCell>
                            <TableCell align="right">Author</TableCell>
                            <TableCell align="right">Create At</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {posts
                            .slice(
                                rowsPerPage * (page - 1),
                                rowsPerPage * (page - 1) + rowsPerPage
                            )
                            .map((row, i) => (
                                <TableRow
                                    key={i}
                                    sx={{
                                        '&:last-child td, &:last-child th': {
                                            border: 0,
                                        },
                                    }}
                                    onClick={() => postDetails(row)}
                                    data-testid="click-testid">
                                    <TableCell component="th" scope="row">
                                        {row.title}
                                    </TableCell>
                                    <TableCell>{row.url}</TableCell>
                                    <TableCell>{row.author}</TableCell>
                                    <TableCell>{row.created_at}</TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Stack spacing={2}>
                {/* <Pagination
                    count={pageNumber + 1}
                    color="primary"
                    page={page}
                    onChange={handleChange}
                /> */}
                <Pagination
                    count={pageNumber}
                    page={page}
                    onChange={handleChange}
                    color="secondary"
                    data-testid="pagination"
                />
            </Stack>
        </Container>
    );
};
