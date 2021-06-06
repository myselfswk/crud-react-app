import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';

const Products = () => {

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [desc, setDesc] = useState('');
    const [products, setProducts] = useState([]);
    const [showAddProduct, setShowAddProduct] = useState(false);
    const [showAddUpdateButton, setShowAddUpdateButton] = useState(false);
    const [id, setId] = useState('');

    useEffect(() => {
        getProducts();
    }, [products]);

    const getProducts = async () => {
        const { data } = await axios.get(`https://mynodeapptestapi.herokuapp.com/products`);
        setProducts(data.result)
    }

    const insertProducts = async (e) => {
        e.preventDefault();
        const data = {
            name,
            price,
            desc
        }
        const response = await axios.post(`https://mynodeapptestapi.herokuapp.com/products`, data, {
            'Content-Type': 'text/javascript'
        });
        alert(response.data.message);
        setShowAddProduct(false);
    }

    const deleteProduct = async (id) => {
        setShowAddProduct(false);
        const response = await axios.delete(`https://mynodeapptestapi.herokuapp.com/products/${id}`);
        alert(response.data.message);
    }

    const showHideUpdate = (product) => {
        setShowAddProduct(true);
        setShowAddUpdateButton(true);
        setId(product.id);
        setName(product.name);
        setPrice(product.price)
        setDesc(product.desc)
    }
    const updateProduct = async () => {


        const data = {
            name,
            price,
            desc
        }
        await axios.put(`https://mynodeapptestapi.herokuapp.com/products/${id}`, data, {
            'Content-Type': 'text/javascript'

        });
        alert("Product Successfully Updated");
        setShowAddProduct(false);

    }




    return (
        <>
            <Navbar />
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'space-around' }} className="my-3" >
                    <h2>Product List</h2>
                    <button style= {showAddProduct ? { backgroundColor:'transparent',color:'red',border:'none'} : {}} className={showAddProduct ? "btn-outline-dark" : "btn btn-primary btn-sm" }  onClick={() => {
                        setShowAddProduct(!showAddProduct);
                        setShowAddUpdateButton(false)
                    }
                    }> {showAddProduct ? 'X' : 'Add Product'}  </button>
                </div>

                {showAddProduct && <div className="row">
                    <div className='col-md-8 offset-md-2 mt-4'>
                        <h1>Enter Product Details</h1>
                        <div className="form-group">
                            <input
                                className="form-control my-1"
                                type="text"
                                placeholder="Enter Product Name"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="number"
                                className="form-control my-1"
                                placeholder="Enter Product Price"
                                onChange={(e) => setPrice(e.target.value)}
                                value={price}
                            />
                        </div>
                        <div className="form-group">

                            <input
                                type="text"
                                className="form-control my-1"
                                placeholder="Enter Product Description"
                                onChange={(e) => setDesc(e.target.value)}
                                value={desc}
                            />
                        </div>
                        <div className="form-group d-flex justify-content-end mt-3" >
                            {
                                showAddUpdateButton ?
                                    <button onClick={updateProduct} className="btn btn-outline-dark btn-block">Update Data</button>
                                    :
                                    <button onClick={insertProducts} className="btn btn-outline-dark btn-block">Add Data</button>
                            }
                        </div>
                    </div>
                </div>}

                <div className="row" style={{ display: 'flex', justifyContent: 'center' }}>
                    {
                        products &&
                        products.map((product) => {
                            return <div className="py-2 my-2 col-md-4 mx-2 text-center" style={{ border: '1px solid black' }} key={product.id} >
                                <h3>{product.name}</h3>
                                <p>{product.desc}</p>
                                <h5>PKR {product.price}</h5>
                                <button onClick={() => deleteProduct(product.id)} className="btn btn-danger mx-1" >Delete</button>
                                <button onClick={() => showHideUpdate(product)} className="btn btn-warning" >Update</button>
                            </div>

                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Products;
