import { useSelector } from "react-redux"
import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InputMUI from "../components/InputMUI";
import TableMUI from "../components/TableMUI";

const steps = ['Log In', 'History'];


export default function History() {

    const AllOrderHistory = useSelector(state => state.OrderHistory)
    const [orderHistory, setOrderHistory] = React.useState([])

    const step1Username = React.useRef(null)
    const step1CardNumber = React.useRef(null)
    const [step1HelperText, setStep1HelperText] = React.useState({
        username: '',
        cardNumber: '',
    })


    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());


    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        if (activeStep === 0) {
            if (step1Username.current.value === '' || step1CardNumber.current.value === ''
                || step1Username.current.value.length < 3 || step1CardNumber.current.value.length < 5
            ) {
                if (step1Username.current.value === '' || step1Username.current.value.length < 3) {
                    setStep1HelperText(prev => ({ ...prev, username: 'Invalid Username' }))
                }
                else {
                    setStep1HelperText(prev => ({ ...prev, username: '' }))
                }

                if (step1CardNumber.current.value === '' || step1CardNumber.current.value.length < 5) {
                    setStep1HelperText(prev => ({ ...prev, cardNumber: 'Invalid Card Number, It must be more than 4 charachter' }))
                }
                else {
                    setStep1HelperText(prev => ({ ...prev, cardNumber: '' }))
                }
            }
            else {
                setOrderHistory(AllOrderHistory.filter((order) => {
                    return order.libraryCardInformation.username === step1Username.current.value && order.libraryCardInformation.cardNumber === step1CardNumber.current.value
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
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <div style={{ minHeight: '80vh' }}>

            <div className="p-5 m-5" style={{ minHeight: '80vh' }}>
                <Box sx={{ width: '100%' }}>
                    <Stepper activeStep={activeStep}>
                        {steps.map((label, index) => {
                            const stepProps = {};
                            const labelProps = {};

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
                                    <InputMUI title='Username' helperText={step1HelperText.username} currentRef={step1Username} />
                                    <InputMUI title='Library Card Number' helperText={step1HelperText.cardNumber} currentRef={step1CardNumber} />
                                </div>
                                :
                                <>
                                    {orderHistory.length === 0 ?
                                        <div className="flex flex-col justify-center items-center">
                                            <iframe style={{ width: '80vw', height: '70vh' }} title='Empty Cart' src='/Images/Empty.svg'></iframe>
                                            <div className='mt-5 text-center text-2xl' style={{ color: 'var(--primary)' }}>No Orders Here Yet</div>
                                        </div>
                                        :
                                        <div className='flex flex-col justify-center items-center gap-3 my-5' style={{ minHeight: '50vh' }}>
                                            <TableMUI orderHistory={orderHistory}/>
                                        </div>
                                    }
                                </>
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

                                {activeStep === steps.length - 1 ? <></> :
                                    <Button onClick={handleNext}>
                                        Next
                                    </Button>
                                }
                            </Box>
                        </React.Fragment>
                    )}
                </Box></div>


        </div>
    )
}