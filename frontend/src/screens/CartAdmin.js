import React from "react";

export default function CartAdmin() {
  return (
    <div className="grid-container">
        {/* <h3>Admin Portal</h3> */}
        
        <main>
        <nav>
            <section>
                <select name="customer" id="customer">
                    <option value="rt">High St. Deli</option>
                    <option value="rt">Scout Coffee</option>
                    <option value="rt">Kreuzberg</option>
                    <option value="rt">Novo</option>
                    <option value="rt">Milestone Tavern</option>
                    <option value="rt">Windows on the Water</option>
                    <option value="rt">Kin Coffee</option>
                    
                </select>
            </section>
            <h2>Cart</h2>
            <h3><a href="standingAdmin.html">Standing Orders</a></h3>
            <h3><a href="productAdmin.html">Products</a></h3>
            <h3><a href="customersAdmin.html">Customers</a></h3>
            <h3><a href="billingAdmin.html">Billing</a></h3>
            <h3><a href="settingsAdmin.html">Settings</a></h3>
            
        </nav>
        <h1 className="title">Cart Order:</h1>
            <div className="bulkInfo">
            
                <section className="orderInfo">
                    <div id="orderDate">
                        <label>Date of Delivery:
                        <input type="text" name="date" id="date" value="12/9/2020" />
                    </label>
                        
                    </div>
                    <br />
                    <div id="po">
                        <label>Purchase Order #:
                        <input type="text" name="po" id="po" value="123456" />
                            </label>
                    </div>
                    <br />
                    <div>
                        <label>Special Notes:
                        <textarea name="po" id="po" rows="4" cols="40">
                            Enter any special delivery notes or instructions.
                            </textarea>
                        </label>
                    </div>
                </section>

                <section className="custInfo">
                    <div id="address">
                        <h3>Delivery Address:</h3>
                        <h4>350 High St.</h4>
                        <h4>San Luis Obispo, CA</h4>
                        <h4>93401</h4>
                    </div>
                    <br />
                    <div id="phone">
                        <h3>Phone Number:</h3>
                        <h4>(805)541-4738</h4>
                    </div>
                </section>
                
                <section className="totalGrid">
                    <div className="subtotalLabel">Subtotal:</div>
                    <div className="Subtotal">$100</div>
                    <div className="deliveryLabel">Delivery:</div>
                    <div className="delivery">$2</div>
                    <div className="totalLabel">Total:</div>
                    <div className="total">$102</div>
                    <div className="termsLabel">Terms:</div>
                    <div className="terms">net 30</div>
                    
                </section>
            </div>
            <div className="chooseRoute">
                <label>Choose Route:</label>
                <section>
                    <select name="route" id="route">
                        <option value="rt">Pick up SLO</option>
                        <option value="rt">Pick up Carlton</option>
                        <option value="rt">Prado to Carlton</option>
                        <option value="rt">AM Pastry</option>
                        <option value="rt">High St.</option>
                        <option value="rt">Lunch 1</option>
                        <option value="rt">North County</option>
                        
                    </select>
                </section>
            </div>
            <div className="enterNewProduct">
                <label>Add a Product:</label>
                <section>
                    <select name="po" id="po">
                        <option value="pl">All Butter Croissant.....($1.50)</option>
                        <option value="bag">Ham and Cheese Croissant.....($2.75)</option>
                        <option value="bag">Brioche Burger Buns (8).....($5.40)</option>
                        <option value="bag">23" Baguette.....($2.20)</option>
                        
                    </select>
                    <input type="text" name="po" id="po" size="6" value="Qty"></input>
                    <button>+ ADD</button>
                </section>
            </div>
            
            <div className="currentOrder">

                    <img src="" />
                    <h4>Product</h4>
                    <h4>Price</h4>
                    <h4>SO</h4>
                    <h4>Order</h4>
                    <h4>Total</h4>
                
                    <img src="./resources/trashcan.png" />
                    <h4>Ham and Cheese Croissant</h4>
                    <h4>$2.75</h4>
                    <h4>10</h4>
                    <input type="text" name="order" id="order" size="5" value="Qty"></input>
                    <h4>$27.50</h4>
               
                    <img src="./resources/trashcan.png" />
                    <h4>All Butter Croissant</h4>
                    <h4>$1.50</h4>
                    <h4>10</h4>
                    <input type="text" name="order" id="order" size="5" value="Qty"></input>
                    <h4>$15.00</h4>
                
                    <img src="./resources/trashcan.png" />
                    <h4>Brioche Burger Buns (8)</h4>
                    <h4>$5.40</h4>
                    <h4>6</h4>
                    <input type="text" name="order" id="order" size="5" value="Qty"></input>
                    <h4>$32.40</h4>
                
                    <img src="./resources/trashcan.png" />
                    <h4>23" Baguette</h4>
                    <h4>$2.20</h4>
                    <h4>15</h4>
                    <input type="text" name="order" id="order" size="3" value="Qty"></input>
                    <h4>$33.00</h4>
                
            </div>
            <div className="buttons">
                <button>CLEAR ORDER</button>
                <button>REVERT TO STANDING ORDER</button>
                <button>SUBMIT ORDER</button>
            </div>
        </main>
    </div>
  );
}
