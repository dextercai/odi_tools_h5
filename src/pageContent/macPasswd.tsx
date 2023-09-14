import { SyntheticEvent, useState } from 'react'
import { Box, Container } from '@mui/system';
import React from 'react';
import Grid from '@mui/material/Grid'; 
import { TextField, Button, Snackbar, Alert } from '@mui/material';
import { string } from 'prop-types';
import md5 from 'md5'

function MacPasswd() {
  const [macAddr, setMacAddr] = useState('')
  const [macKey, setMacKey] = useState('')
  const [alertOpen, setAlertOpen] = useState(false)

  const [alertMessage, setAlertMessage] = useState('')

  const handleMacAddrChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMacAddr(event.target.value)
    console.log(event.target.value.length);
    if (event.target.value.replace(/:/g, '',).length === 12) {
      calcMacKey(event.target.value)
    }
  }

  const showAlert = (message: string) => {
    setAlertMessage(message)
    setAlertOpen(true)
  }

  const handleAlertClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertMessage('');
    setAlertOpen(false);
  };
  const cmacPrefix = 'hsgq1.9a';
  const calcMacKey = (ma: string) => {
    const mac: string = ma.replace(/:/g, '',);
    const regex = /^[0-9A-Fa-f]{12}$/
    if(!regex.exec(mac)) {
      return
    }
    // md5
    setMacKey(md5(cmacPrefix + mac.toUpperCase()).toLowerCase())
  }

  const handleCalcButton = () => {
    const mac: string = macAddr.replace(/:/g, '',);
    const regex = /^[0-9A-Fa-f]{12}$/;
    if(!regex.exec(mac)) {
      showAlert('MAC地址必须包含12位HEX字符')
      return
    }
    calcMacKey(macAddr)
  }
  return (
    <>
      <Grid container columns={1} style={{display: 'flex', flexDirection: 'column'}}>
        <h3>ODI SFP XPON MAC_KEY 生成器 (ODI DFP-34X-2C2)</h3>
        <TextField margin='dense' value={macAddr} label="ONU MAC Addr" variant="filled" onChange={handleMacAddrChange}></TextField>
        <TextField margin='dense' value={macKey} label="ODI ONU MAC Key" variant="filled"></TextField>
        <Grid container>
          <Grid item xs={12} md={3}>
            <Button variant='contained' fullWidth onClick={handleCalcButton}>计算</Button>
          </Grid>
        </Grid>
      </Grid>
      <Snackbar
        open={alertOpen}
        autoHideDuration={2000}
        onClose={handleAlertClose}
        anchorOrigin={{vertical: 'top', horizontal: 'center'}}
      >
        <Alert severity="error">{alertMessage}</Alert>
      </Snackbar>
    </>
  )
}

export default MacPasswd