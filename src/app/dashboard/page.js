'use client';
import * as React from 'react';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { green } from '@mui/material/colors';
import { useState, useEffect } from 'react'
export default function Page() {
    //
    // function for putting items into the shopping cart.
    //
    function putInCart(pname) {
        console.log("putting in cart: " + pname)
        fetch("api/putInCart?pname=" + pname);
    }
    const [data, setData] = useState(null)
    const [weather, setWeatherData] = useState(0)

    useEffect(() => {
        fetch('api/getProducts')
            .then((res) => res.json())
            .then((data) => {
                setData(data)
            })

        fetch('api/getWeather')
            .then((res)=>res.json())
            .then((weather)=>{
                setWeatherData(weather)
            })
    }, [])
    if (!data) return <p>No data</p>
    if(!weather)return<p>Noweather</p>
    const theme = createTheme({
        palette: {
            secondary: {
                main: green[500],
            },
        },
    });
    return (
        <ThemeProvider theme={theme}>
            Today's temperature: {JSON.stringify(weather.temp)}
            <Container component="main" maxWidth="xs">
                <div style={{ fontSize: '40px' }} > Dashboard</div>
                <div>
                    {
                        data.map((item, i) => (
                            <div style={{ padding: '20px' }} key={i} >
                                Unique ID: {item._id}
                                <br></br>
                                {item.pname}
                                -
                                {item.price}
                                <br></br>
                                <Button onClick={() => putInCart(item.pname)} variant="outlined"> Add to cart
                                </Button>
                            </div>
                        ))
                    }
                </div>
            </Container>
        </ThemeProvider>
    );
}