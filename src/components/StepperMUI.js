import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InputMUI from './InputMUI';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useDispatch, useSelector } from 'react-redux'
import { addLibraryCardInformation, addOrderToHistory, addPersonalInformation, resetCart } from '../reducers/actions';
import InputDisableMUI from './InputDisableMUI';
import { books } from '../CONSTANTS/data';
import styles from '../styles/Cart.module.css'

const steps = ['Personal Information', 'Library Card Information', 'Summary and Confirmation'];
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function StepperMUI() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const personalData = useSelector(state => state.PersonalData)
  const { cart, deadline } = useSelector(state => state.Cart)
  const username = personalData.libraryCardInformation.username
  const cardNumber = personalData.libraryCardInformation.cardNumber

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [done, setDone] = React.useState(false);
  const dispatch = useDispatch()

  const step1FName = React.useRef(null)
  const step1LName = React.useRef(null)
  const step1Phone = React.useRef(null)
  const step1Address = React.useRef(null)
  const [step1HelperText, setStep1HelperText] = React.useState({
    fName: '',
    lName: '',
    phone: '',
    address: '',
  })

  const step2Username = React.useRef(null)
  const step2CardNumber = React.useRef(null)
  const [step2HelperText, setStep2HelperText] = React.useState({
    username: '',
    cardNumber: '',
  })

  React.useEffect(() => {
    // init values if exist
    if (step1FName.current !== null && step1LName.current !== null && step1Phone.current !== null && step1Address.current !== null) {
      step1FName.current.value = personalData.personalInformation.fName
      step1LName.current.value = personalData.personalInformation.lName
      step1Phone.current.value = personalData.personalInformation.phone
      step1Address.current.value = personalData.personalInformation.address
    }
    if (step2Username.current !== null && step2CardNumber.current !== null) {
      step2Username.current.value = personalData.libraryCardInformation.username
      step2CardNumber.current.value = personalData.libraryCardInformation.cardNumber
    }
  }, [personalData, activeStep])

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    if (activeStep === 0) {
      if (step1FName.current.value === '' || step1LName.current.value === '' || step1Phone.current.value === '' || step1Address.current.value === ''
        || step1FName.current.value.length < 3 || step1LName.current.value.length < 3 || step1Phone.current.value.length < 9 || step1Address.current.value.length < 5
      ) {
        if (step1FName.current.value === '' || step1FName.current.value.length < 3) {
          setStep1HelperText(prev => ({ ...prev, fName: 'Invalid First Name' }))
        }
        else {
          setStep1HelperText(prev => ({ ...prev, fName: '' }))
        }

        if (step1LName.current.value === '' || step1LName.current.value.length < 3) {
          setStep1HelperText(prev => ({ ...prev, lName: 'Invalid Last Name' }))
        }
        else {
          setStep1HelperText(prev => ({ ...prev, lName: '' }))
        }

        if (step1Phone.current.value === '' || step1Phone.current.value.length < 9 || !Number(step1Phone.current.value)) {
          setStep1HelperText(prev => ({ ...prev, phone: 'Invalid Phone Number, Phone number must be more than 9 character' }))
        }
        else {
          setStep1HelperText(prev => ({ ...prev, phone: '' }))
        }

        if (step1Address.current.value === '' || step1Address.current.value.length < 5) {
          setStep1HelperText(prev => ({ ...prev, address: 'Please enter specific address' }))
        }
        else {
          setStep1HelperText(prev => ({ ...prev, address: '' }))
        }
      }
      else {
        dispatch(addPersonalInformation({
          fName: step1FName.current.value,
          lName: step1LName.current.value,
          phone: step1Phone.current.value,
          address: step1Address.current.value
        }))
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
          newSkipped = new Set(newSkipped.values());
          newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
      }
    }
    else if (activeStep === 1) {
      if (step2Username.current.value === '' || step2CardNumber.current.value === '' || step2Username.current.value.length < 3 || step2CardNumber.current.value.length < 5) {
        if (step2Username.current.value === '' || step2Username.current.value.length < 3) {
          setStep2HelperText(prev => ({ ...prev, username: 'Invalid Username' }))
        }
        else {
          setStep2HelperText(prev => ({ ...prev, username: '' }))
        }

        if (step2CardNumber.current.value === '' || step2CardNumber.current.value.length < 5) {
          setStep2HelperText(prev => ({ ...prev, cardNumber: 'Invalid Card Number, It must be more than 4 charachter' }))
        }
        else {
          setStep2HelperText(prev => ({ ...prev, cardNumber: '' }))
        }
      }
      else {
        dispatch(addLibraryCardInformation({
          userName: step2Username.current.value,
          cardNumber: step2CardNumber.current.value
        }))
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
          newSkipped = new Set(newSkipped.values());
          newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
      }
    }
    else if (activeStep === 2) {
      handleClickOpen()
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const confirmOrder = () => {
    setDone(true)
    dispatch(addPersonalInformation({
      fName: '',
      lName: '',
      phone: '',
      address: ''
    }))
    dispatch(addLibraryCardInformation({
      userName: '',
      cardNumber: ''
    }))
    setTimeout(() => {
      dispatch(resetCart())
    }, 5000)

    dispatch(addOrderToHistory(
      {
        username: username,
        cardNumber: cardNumber
      },
      [...cart],
      deadline))
  }

  return (
    <>
      {done ? <>
        <iframe title='Order Confirmed' src='/Images/order_confirmed.svg' style={{ width: '100vw', height: '70vh' }} ></iframe>
        <div className='mt-5 text-center text-2xl' style={{ color: 'var(--primary)' }}>Your Order Is Confirmed</div>
      </>
        :
        <Box sx={{ width: '100%' }}>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              // if (isStepOptional(index)) {
              //   labelProps.optional = (
              //     <Typography variant="caption">Optional</Typography>
              //   );
              // }
              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button onClick={handleReset}>Reset</Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>{activeStep === 0 ?
                <div className='flex flex-col justify-center items-center gap-3 my-5' style={{ minHeight: '50vh' }}>
                  <InputMUI title='First Name' helperText={step1HelperText.fName} currentRef={step1FName} />
                  <InputMUI title='Last Name' helperText={step1HelperText.lName} currentRef={step1LName} />
                  <InputMUI title='Phone Number' helperText={step1HelperText.phone} currentRef={step1Phone} />
                  <InputMUI title='Address' helperText={step1HelperText.address} currentRef={step1Address} />
                </div>
                : activeStep === 1 ?
                  <div className='flex flex-col justify-center items-center gap-3 my-5' style={{ minHeight: '50vh' }}>
                    <InputMUI title='Username' helperText={step2HelperText.username} currentRef={step2Username} />
                    <InputMUI title='Library Card Number' helperText={step2HelperText.cardNumber} currentRef={step2CardNumber} />
                  </div>
                  :
                  <div className='flex flex-col justify-center items-center gap-3 my-5' style={{ minHeight: '50vh' }}>
                    <div className='mt-5'>Please return the order before <span style={{ color: 'var(--primary)' }}>{deadline.toString()}</span></div>

                    <InputDisableMUI title='First Name' text={personalData.personalInformation.fName} />
                    <InputDisableMUI title='Last Name' text={personalData.personalInformation.lName} />
                    <InputDisableMUI title='Phone Number' text={personalData.personalInformation.phone} />
                    <InputDisableMUI title='Address' text={personalData.personalInformation.address} />

                    <InputDisableMUI title='Username' text={personalData.libraryCardInformation.username} />
                    <InputDisableMUI title='Library Card Number' text={personalData.libraryCardInformation.cardNumber} />

                    <div style={{ width: '80vw' }}>
                      <div className={`flex justify-between text-2xl p-5 ${styles.header}`} style={{ borderBottom: '1px solid #aaa' }}>
                        <div>Books Cart</div>
                        <div>{cart.length} items</div>
                      </div>

                      <div>
                        <div className={`flex justify-center items-center gap-5 text-lg font-bold my-10 ${styles.headerTable}`}>
                          <div style={{ width: '10%' }}>Picture</div>
                          <div style={{ width: '20%' }}>Title</div>
                          <div style={{ width: '15%' }}>Pages</div>
                        </div>

                        <div className={`flex flex-col gap-5 ${styles.bodyTable}`}>
                          {cart.map((book, index) => {
                            return <div key={index} className='flex justify-center items-center gap-5'>
                              <div style={{ width: '10%' }}>
                                <img src={books[book].image} alt={books[book].name} style={{ height: '100px', borderRadius: '10px' }} />
                              </div>
                              <div style={{ width: '20%' }}>{books[book].name}</div>
                              <div style={{ width: '15%' }}>{books[book].pages}</div>
                            </div>
                          })}
                        </div>
                      </div>
                    </div>

                    <React.Fragment>
                      <Dialog
                        open={open}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={handleClose}
                        aria-describedby="alert-dialog-slide-description"
                      >
                        <DialogTitle>{"Are You Sure..?"}</DialogTitle>
                        <DialogContent>
                          Are you sure you want to confirm this order?
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleClose}>Disagree</Button>
                          <Button onClick={confirmOrder}>Agree</Button>
                        </DialogActions>
                      </Dialog>
                    </React.Fragment>

                  </div>
              }</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />

                <Button onClick={handleNext}>
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Box>
      }

    </>
  )
}
