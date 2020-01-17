import React, {Component} from 'react';
import {connect} from 'react-redux';
import {_SetCard,_ShowUp} from "../redux/actions";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

class ShopList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ShopList: "60px"
        }
    }

    getTotal() {
        let x = 0
        this.props.Card.map(item => {

            x += item.abv * item.count
        })
        return x
    }

    getList() {

        return this.props.Card
    }

    componentDidMount() {
        if (this.props.isShow) {
            this.setState(({
                ShopList: "60px"
            }));
        }

    }

    componentWillUpdate(nextProps, nextState) {
        if (this.props.isShow!==nextProps.isShow){
            if (nextProps.isShow){
                this.setState(({
                    ShopList: "60px"
                }));
            } else {
                this.setState(({
                    ShopList: "80%"
                }));
            }

        }
    }


    render() {
        return (


            <div className="shoplist" style={{top: `calc(100% - ${this.state.ShopList})`,    transform: `translate(0px, ${this.props.ShowUp?'-147px':"0px"})`}}>
                <p className="text-white text-center" onClick={() => {

                    if (this.state.ShopList === "80%") {
                        this.setState(({
                            ShopList: "60px"
                        }));
                        this.props.blur(false)
                        return
                    }
                    this.setState(({
                        ShopList: "80%"
                    }));
                    this.props._ShowUp(false)
                    this.props.blur(true)
                }}>
                        <span className="d-block">
                            ____
                        </span>
                    <img src={require("../imges/basket.png")} style={{width:"18px"}} alt=""/> Shopping Cart
                </p>
                <div className="h-100 overflow-auto">

                    {this.getList().map(item => (<div className="d-flex   justify-content-between mt-3" key={item.id}>


                            <span className="d-flex">
                            <span>

                                <img src={item.image_url} alt={item.image_url} style={{
                                    width: "27px",
                                    margin: "0 10px"
                                }}/>
                            </span>
                            <span className="text-white">
                                <b>{item.name}</b>
                                <p className="text-white-50">
                                  {item.tagline}
                                </p>
                            </span>
                        </span>


                        <span className="d-flex align-items-center">
                            <span className="d-flex align-items-center justify-content-between text-white">
                                <span className="mr-1 ml-1 btnRemove " onClick={() => {
                                    if (item.count === 1) {
                                        return
                                    }
                                    this.props._SetCard(this.props.Card.map(item2 => {
                                        if (item2.id === item.id) {
                                            item2.count = item2.count - 1
                                        }

                                        return item2
                                    }))

                                }}>-</span><span
                                className="mr-1 ml-1">{item.count}</span><span
                                className="mr-1 ml-1 btnAdd" onClick={() => {

                                this.props._SetCard(this.props.Card.map(item2 => {
                                    if (item2.id === item.id) {
                                        item2.count = 1 + item2.count
                                    }

                                    return item2
                                }))

                            }}>+</span>
                            </span>
                            <span className="text-danger c-p" onClick={() => {

                                this.props._SetCard(this.props.Card.filter(item2 => {
                                    if (item2.id === item.id) {
                                        return false
                                    }

                                    return true
                                }))
                            }}>
                            <DeleteOutlineIcon/>
                            </span>

                        </span>
                    </div>))}
                    <div className="pl-2 pr-2 pt-5">
                        <p className="m-0 text-white-50"> tips for waiters</p>
                        <div className="StyleforSelect">
                            <span>ZERO</span>
                            <span>ROUND UP</span>
                            <span>10%</span>
                            <span>CUSTOM</span>
                        </div>
                        <div className="pt-3 pb-3 text-white-50">
                            <p className="m-0 d-flex align-items-center justify-content-between">
                                <span>subtotal</span><span>19.20</span>
                            </p>
                            <p className="m-0 d-flex align-items-center justify-content-between">
                                <span>tips</span><span>2</span>
                            </p>
                        </div>
                        <div className="pt-5 pb-5 text-white">
                            <p className="m-0 d-flex align-items-center justify-content-between">
                                <span>Total</span><span>

                                {this.getTotal()}


                            </span>
                            </p>

                        </div>
                        <div className="StyleforSelect w-100">
                            <span className="d-block w-100 text-center"><b>Confirm Payment</b></span>

                        </div>

                    </div>
                    <div className="mb-5 mt-5 pt-5 pb-5"></div>
                    <div className="mb-5 mt-5 pt-5 pb-5"></div>
                </div>


            </div>

        );
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(
    mapStateToProps, {_SetCard,_ShowUp}
)(ShopList);
