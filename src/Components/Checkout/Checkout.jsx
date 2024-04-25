import { useContext, useState } from "react"
import "./Checkout.css"
import { CartContext } from '../../Context/CartContext'
import * as yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";
import http from "../../lib/http"
import { useAppDispatch, useAppSelector } from "../../store/store"
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner"
import { clearCart } from "../../store/slices/cart"
import { useNavigate } from "react-router-dom"


const Schema = yup.object({
    email: yup.string().email().required(),
    phone: yup.string().required(),
    name: yup.string().required(),
    address: yup.string().required(),
    city: yup.string().required()
})


export default function Checkout() {
    const { getTotalCartAmount, getCartDetail } = useContext(CartContext)
    const [isLoading, setIsLoading] = useState(false)
    const user = useAppSelector(state => state.auth?.user)
    const dispatch = useAppDispatch()
    const router = useNavigate()

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset
    } = useForm({
        "resolver": yupResolver(Schema),
        defaultValues: {
        }
    })


    const onSubmit = async (data) => {

        const payload = jwtDecode(user?.token ?? "");

        try {
            setIsLoading(true)
            await http.post("/api/Orders", {
                CustomerId: payload.sub,
                CustomerName: data.name,
                ShippingAddress: data.address,
                TotalAmount: getTotalCartAmount(),
                OrderItems: getCartDetail().map(order => ({
                    ProductId: order.productId,
                    Quantity: order.quantity
                }))
            }, {
                headers: {
                    "Authorization": `Bearer ${user?.token}`
                }
            })

            toast.success("Successfully", { description: "Thank you for purchasing from us. Your order will be processed soon." })
            dispatch(clearCart())
            router("/")
        } catch (error) { } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="body">

            <header>
                <h3>Checkout</h3>
            </header>

            <main>
                <section class="checkout-form">
                    <form onSubmit={handleSubmit(onSubmit)} method="get">
                        <h6>Contact information</h6>
                        <div class="form-control">
                            <label for="checkout-email">E-mail</label>
                            <div>
                                <span class="fa fa-envelope"></span>
                                <input type="email"
                                    id="checkout-email"
                                    name="checkout-email"
                                    placeholder="Enter your email..."
                                    {...register("email")}
                                />
                                {errors.email && <p className="error-label">
                                    Email is required
                                </p>}
                            </div>
                        </div>
                        <div class="form-control">
                            <label for="checkout-phone">Phone</label>
                            <div>
                                <span class="fa fa-phone"></span>
                                <input type="tel" name="checkout-phone" id="checkout-phone" placeholder="Enter you phone..." {...register("phone")} />
                            </div>
                            {errors.phone && <p className="error-label">
                                Phone is required
                            </p>}
                        </div>
                        <br />
                        <h6>Shipping address</h6>
                        <div class="form-control">
                            <label for="checkout-name">Full name</label>
                            <div>
                                <span class="fa fa-user-circle"></span>
                                <input type="text" id="checkout-name" name="checkout-name" placeholder="Enter you name..."    {...register("name")} />
                            </div>
                            {errors.name && <p className="error-label">
                                Full name is required
                            </p>}
                        </div>
                        <div class="form-control">
                            <label for="checkout-address">Address</label>
                            <div>
                                <span class="fa fa-home"></span>
                                <input type="text" name="checkout-address" id="checkout-address" placeholder="Your address..."    {...register("address")} />
                            </div>
                            {errors.address && <p className="error-label">
                                Address is required
                            </p>}
                        </div>
                        <div class="form-control">
                            <label for="checkout-city">City</label>
                            <div>
                                <span class="fa fa-building"></span>
                                <input type="text" name="checkout-city" id="checkout-city" placeholder="Your city..."    {...register("city")} />
                            </div>
                            {errors.city && <p className="error-label">
                                City is required
                            </p>}
                        </div>
                        <div class="form-control-btn">
                            <button disabled={isLoading}>{isLoading ? "Loading..." : "Complete Checkout"}</button>
                        </div>
                    </form>
                </section>

                <section class="checkout-details">
                    <div class="checkout-details-inner">

                        <div class="checkout-shipping">
                            <h6>Product Total</h6>
                            <p>£{getTotalCartAmount()}</p>
                        </div>
                        <div class="checkout-shipping">
                            <h6>Shipping</h6>
                            <p>£0</p>
                        </div>
                        <div class="checkout-total">
                            <h6>Total</h6>
                            <p>£{getTotalCartAmount()}</p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}
