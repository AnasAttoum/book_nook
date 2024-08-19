import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import StepperMUI from "../components/StepperMUI"


export default function Checkout() {

    const navigate = useNavigate()
    const { cart, deadline } = useSelector(state => state.Cart)

    useEffect(() => {
        if (cart.length === 0 || deadline === '')
            navigate('/library')
    }, [cart.length, deadline, navigate])


    return (
        <div className="p-5 m-5" style={{ minHeight: '80vh' }}>
            <StepperMUI />
        </div>
    )
}