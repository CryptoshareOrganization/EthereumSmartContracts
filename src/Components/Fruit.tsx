import React, { useState, useEffect } from 'react';
import { useEthers, useNotifications, useEtherBalance } from "@usedapp/core"
import { Sendpurchase } from '../Hooks/buyFruit';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import helperConfig from "../build/helper-config.json"
import { Container, Box, Button, CircularProgress, Snackbar, Alert } from "@mui/material"
import type { } from '@mui/lab/themeAugmentation';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Typography } from '@mui/material';
import { formatUnits } from "@ethersproject/units"
import WalletConnectProvider from "@walletconnect/web3-provider";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';



const theme = createTheme({
  typography: {
    fontFamily: [
      "Audiowide",
      "cursive",
    ].join(','),
  },
  palette: {
    primary: {
      light: '#757ce8',
      main: '#C2D52F',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#C2D52F',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: 'white',
          background: '#C2D52F',
          border: 0,
          borderRadius: 5,
          boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
          height: 48,
          padding: '0 30px',
          fontSize: '2rem'
        },
      },

    },
    MuiFab: {
      styleOverrides: {
        root: {
          background: "#C2D52F",
          color: "white"
        }
      }
    }
  }
})




export const Fruitpayment = () => {

  //Mint Logic

  const { chainId, account, activate, activateBrowserWallet, deactivate } = useEthers()

  async function onConnect() {
    const provider = new WalletConnectProvider({
      infuraId: "b04ea8396873436db4da7c31a48a9950",
    });

    //  Enable session (triggers QR Code modal)
    await provider.enable();
    await activate(provider)
  }// change inf

  const etherBalance = useEtherBalance(account)
  const formattedBalance: number = etherBalance
    ? parseFloat(formatUnits(etherBalance, 18))
    : 0;
  console.log(formattedBalance)
  const isConnected = account !== undefined

  const networkName = chainId ? helperConfig[chainId] : "dev"

  
  const [fruitType, setFruitType] = useState("");


  const { notifications } = useNotifications();
  const [count, setCount] = useState<number>(1)

  const increment = () => {
    if (count < 9) {
      setCount((count) => count + 1)
    }
  }

  const handleFruitChange = (event: any) => {
    setFruitType(event.target.value)
  }

  const decrement = () => {
    if (count > 1) {
      setCount((count) => count - 1)
    }
  }

  const {sendAppleAmount, applePurchaseState, sendBananaAmount, bananaPurchaseState, sendStrawberryAmount, strawberryPurchaseState, sendMangoAmount, mangoPurchaseState} = Sendpurchase()

  const [enoughEth, setEnoughEthState] = useState(true)


  const sendCountValue = () => {
    if (fruitType === "apple") {

      const bal = 0.02 * count
    if (formattedBalance < bal) {
      setEnoughEthState(false)
    }

    sendAppleAmount(count)

    } else if (fruitType === "banana") {

      const bal = 0.03 * count
    if (formattedBalance < bal) {
      setEnoughEthState(false)
    }

    sendBananaAmount(count)

    } else if (fruitType === "strawberry") {

      const bal = 0.04 * count
    if (formattedBalance < bal) {
      setEnoughEthState(false)
    }

    sendStrawberryAmount(count)

    }

    else if (fruitType === "mango") {

      const bal = 0.05 * count
    if (formattedBalance < bal) {
      setEnoughEthState(false)
    }

    sendMangoAmount(count)
    }
  }

  const handleeth = () => {
    setEnoughEthState(true)
  }

  const [showPurchaseSuccess, setPurchaseSuccess] = useState(false)

  const handleCloseSnack = () => {
    setPurchaseSuccess(false)
  }

  useEffect(() => {
    if (
      notifications.filter(
        (notification) =>
          notification.type === "transactionSucceed" &&
          notification.transactionName === "fruitpurchase"
      ).length > 0
    ) {
      setPurchaseSuccess(true)
    }

  }, [notifications, showPurchaseSuccess]);

  const isMining = applePurchaseState.status === "Mining" || bananaPurchaseState.status === "Mining" || strawberryPurchaseState.status === "Mining" || mangoPurchaseState.status === "Mining";

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md" sx={{ display: "flex", flexDirection: { xs: 'column', md: 'row' }, justifyContent: "center" }}>
        <Box>
          <Typography sx={{
            display: "flex",
            justifyContent: "center",
            mt: 13,
            fontWeight: "bold",
            fontSize: 30,
            fontFamily: 'Audiowide'
          }} color="primary.main">FRUIT SHOP</Typography>
          <Box sx={{
            bgcolor: "transparent",
            alignItems: "center",
            flexDirection: "column",
            minHeight: 400,
            minWidth: { sx: "auto", md: 400 },
            marginRight: "auto",
            marginLeft: "auto",
            justifyContent: "center",
            // borderRadius: 4,
            // borderStyle: "dotted",
            // borderColor: "#C2D52F",
            marginTop: 3,
          }}>
            
            <Box sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              m: 3,
              mt: 7,
            }}>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-standard-label">Fruits</InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={fruitType}
                        onChange={handleFruitChange}
                        label="Select Fruit"
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={"apple"}>Apple</MenuItem>
                        <MenuItem value={"banana"}>Banana</MenuItem>
                        <MenuItem value={"strawberry"}>Strawberry</MenuItem>
                        <MenuItem value={"mango"}>Mango</MenuItem>
                       
                    </Select>
                </FormControl>
                <Box component="span" sx={{ color: "primary.main", fontSize: 20, mt: 1, fontWeight: "medium", fontFamily: 'Audiowide' }}>1 Apple is 0.02 ETH</Box>
                <Box component="span" sx={{ color: "primary.main", fontSize: 20, mt: 1, fontWeight: "medium", fontFamily: 'Audiowide' }}>1 Banana is 0.03 ETH</Box>
                <Box component="span" sx={{ color: "primary.main", fontSize: 20, mt: 1, fontWeight: "medium", fontFamily: 'Audiowide' }}>1 Strawberry is 0.04 ETH</Box>
                <Box component="span" sx={{ color: "primary.main", fontSize: 20, mt: 1, fontWeight: "medium", fontFamily: 'Audiowide' }}>1 Mango is 0.05 ETH</Box>
              <Box sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                margin: 3,
              }}>
                <Fab size="small" onClick={decrement} aria-label="remove" sx={{ m: 1 }}>
                  <RemoveIcon />
                </Fab>
                <Box component="span" sx={{ m: 1, color: "white", fontSize: 16,  fontFamily: 'Audiowide', backgroundColor: "#C2D52F", padding: "10px", borderRadius:"5px"}}>{count}</Box>
                <Fab size="small" onClick={increment} aria-label="add" sx={{ m: 1 }}>
                  <AddIcon />
                </Fab>
              </Box>
              <Box sx={{
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "center"
              }}>
                {isConnected ? (
                  <Button
                    sx={{ m: 4, }}
                    color="primary" variant="contained"
                    onClick={sendCountValue}
                    disabled={isMining}>
                    {isMining ? <CircularProgress color="primary" size={35} /> : "Buy Fruit"}
                  </Button>
                ) : (
                  <Button
                  sx={{ m: 4, }}
                  color="primary" variant="contained"
                    onClick={() => activateBrowserWallet()}>
                    Metamask
                  </Button>
                )
                }
              </Box>
              <Box sx={{
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "center"
              }}>
                {isConnected ? (
                  <Button
                  sx={{ m: 4, fontSize: 15 }}
                  color="primary" variant="contained"
                  onClick={deactivate}>
                  Disconnect
                </Button>
                ) : (
                  <Button 
                  color="primary" variant="contained"
                    onClick={() => onConnect()}>
                    WalletConnect
                  </Button>
                )
                }
              </Box>
              <Box sx={{
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "center"
              }}>

              </Box>
              <Snackbar
                open={showPurchaseSuccess}
                autoHideDuration={5000}
                onClose={handleCloseSnack}>
                <Alert onClose={handleCloseSnack} severity="success">
                  You've succesfully purchased {count} {fruitType}
                </Alert>
              </Snackbar>
              <Snackbar
                open={!enoughEth}
                autoHideDuration={5000}
                onClose={handleeth}>
                <Alert onClose={handleeth} severity="error">
                  Oops! Not enough ETH
                </Alert>
              </Snackbar>

            </Box>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}