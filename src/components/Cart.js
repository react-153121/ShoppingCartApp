import {useEffect,useState} from 'react';
import { Button,Modal} from 'react-bootstrap';

const Cart = ({state, dispatch}) => {
  const {cart} = state
  const [total, setTotal] = useState();
  const [show, setShow] = useState(false);
  
  useEffect(() => {
    setTotal(
      cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0)
      );
    }, [cart]);
  const changeQty = (id,qty) => dispatch({
    type: "CHANGE_CART_QTY",
    payload: {
      id: id,
      qty: qty,
    },
  })

  const placeOrder = () => {
    setShow(true);
  }
  const closeModal = () => {
    setShow(false);
  }

  return (
    <div style={{display:'flex', flexDirection:'column', margin:10, backgroundColor:'#ececec', padding:10, width:'20%'}}>
      
        <b style={{fontSize:30, alignSelf:'center'}}>Cart</b>
        <b style={{alignSelf:'center'}}>Subtotal: $ {total}</b>
        <div style={{display:'flex', flexDirection:'column', width:'100%'}}>
         {cart.length > 0 ?
             cart.map((prod)=>(
                <div key={prod.title} style={{display:'flex', padding:10, border:"1px solid grey", margin:5, justifyContent:'space-between'}}>
                    <div style={{display:'flex',gap:10}}>
                      <img src={prod.thumbnail} alt={prod.title} style={{width:70, objectFit:'cover'}}/>
                      <div style={{display:'flex', flexDirection:'column', justifyContent:'space-evenly'}}>
                          <span>{prod.title}</span>
                          <b>$ {prod.price}</b>
                      </div>
                    </div>
                    <div style={{display:'flex', alignItems:'center', gap:10}}>
                        <button onClick={() => changeQty(prod.id, prod.qty - 1)}>-</button>
                        <span>{prod.qty}</span>
                        <button onClick={() => changeQty(prod.id, prod.qty + 1)}>+</button>
                    </div>
                </div>
            ))
         : 
         <span style={{padding:20, alignSelf:'center'}}>Cart is empty</span>}
        </div>

        {total > 0 ?
          <button style={{padding:5,border:0,borderRadius:5,backgroundColor:'green',color:'white'}} onClick={() => placeOrder()}>
            BUY
          </button>:<></>
        }

        <Modal show={show}>
          <Modal.Body>Please Pay ${total} </Modal.Body>  
          <Modal.Footer>  
            <Button onClick={() => closeModal()}>Close</Button>
          </Modal.Footer>  
        </Modal>
    </div>
  )
}

export default Cart