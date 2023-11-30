'use client';
import * as React from 'react';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { green } from '@mui/material/colors';
import { useState, useEffect } from 'react'
export default function Page() {
    const [data, setData] = useState(null)
    useEffect(() => {
        fetch('api/getCartProducts')
            .then((res) => res.json())
            .then((data) => {
                setData(data)
            })
    }, [])
    if (!data) return <p>No data</p>
    const theme = createTheme({
        palette: {
            secondary: {
                main: green[500],
            },
        },
    });
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <div style={{ fontSize: '40px' }}>Cart</div>
                <div>
                    {
                        data.map((item, i) => (
                            <div style={{ padding: '20px' }} key={i} >
                                Unique ID: {item._id}
                                <br></br>
                                {item.pname}
                                {/*
                                -
                                {item.price}
                                <br></br>
                                <Button onClick={() => putInCart(item.pname)} variant="outlined"> Add to cart
                                </Button>
                                */}
                            </div>
                        ))
                    }
                </div>
            </Container>
        </ThemeProvider>
    );
}