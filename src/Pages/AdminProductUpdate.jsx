import React, { useEffect, useState, useContext } from 'react'
import "./CSS/ProductUpdate.css"
import { ShopContext } from '../Context/ShopContext'
import { useParams } from 'react-router-dom'
import * as yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";
import http from "../lib/http"
import { useAppSelector } from '../store/store'
import { jwtDecode } from 'jwt-decode'
import { toast } from 'sonner'

const Schema = yup.object({
    name: yup.string().required(),
    categoryId: yup.string().required(),
    supplierId: yup.string().required(),
    description: yup.string().required(),
    price: yup.string().required(),
    stockQuantity: yup.string().required(),
    imageData: yup.string().required(),
})

export default function AdminProductUpdate() {
    const [categories, setCategories] = useState([])
    const [suppliers, setSuppliers] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const { getAProduct } = useContext(ShopContext)
    const { productId } = useParams();
    const user = useAppSelector(state => state.auth?.user)

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
        setValue
    } = useForm({
        "resolver": yupResolver(Schema),
        defaultValues: {
        }
    })

    const onSubmit = async (data) => {
        try {
            setIsLoading(true)
            await http.put(`/api/Products/${productId}`, {
                ...data
            }, {
                headers: {
                    "Authorization": `Bearer ${user?.token}`
                }
            })

            toast.success("Successfully", { description: "Thank you for purchasing from us. Your order will be processed soon." })

        } catch (error) { } finally {
            setIsLoading(false)
        }
    }


    useEffect(() => {
        async function fetchDetail() {
            try {
                const supRes = await http.get("/api/Suppliers")
                setSuppliers(supRes.data ?? [])
            } catch (error) {

            }

            try {
                const catRes = await http.get("/api/Categories")
                setCategories(catRes.data ?? [])
            } catch (error) {

            }


            const product = await getAProduct(productId)
            if (product) {
                setValue("name", product.name)
                setValue("categoryId", product.categoryId)
                setValue("supplierId", product.supplierId)
                setValue("description", product.description)
                setValue("price", product.price)
                setValue("stockQuantity", product.stockQuantity)
                setValue("imageData", atob(product.imageData))
            }
        }

        fetchDetail()
    }, [])

    console.log({ errors })


    return (
        <div>
            <div className='title-section'>
                <h2 className='title'>
                    Update Product Detail
                </h2>



            </div>

            <form onSubmit={handleSubmit(onSubmit)} className='form'>
                <div className='form-section'>
                    <label htmlFor="name">Name</label>
                    <input className='input' id='name' {...register("name")} />
                </div>

                <div className='form-section'>
                    <label htmlFor="category">Category</label>

                    <select className='input' id='category' {...register("categoryId")} >
                        {
                            categories.map(category => (
                                <option value={category.categoryId}>{category.name}</option>
                            ))
                        }
                    </select>
                </div>

                <div className='form-section'>
                    <label htmlFor="stock">Supplier</label>
                    <select className='input' id='stock' {...register("supplierId")} >
                        {
                            suppliers.map(supplier => (
                                <option value={supplier.supplierId}>{supplier.name}</option>
                            ))
                        }
                    </select>
                </div>

                <div className='form-section'>
                    <label htmlFor="description">Description</label>
                    <input className='input' id='description' {...register("description")} />
                </div>

                <div className='form-section'>
                    <label htmlFor="price">Price</label>
                    <input className='input' type='number' id='price' {...register("price")} />
                </div>

                <div className='form-section'>
                    <label htmlFor="stock">Stock Quantity</label>
                    <input className='input' type='number' id='stock' {...register("stockQuantity")} />
                </div>

                <div className='form-section'>
                    <label htmlFor="image">Image Url</label>
                    <input className='input' id='image' {...register("imageData")} />
                </div>

                <div className='form-section'>

                    <button disabled={isLoading} >{isLoading ? "Saving" : "Save"}</button>
                </div>
            </form>
        </div>
    )
}
