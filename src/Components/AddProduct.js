import React, {Component} from 'react';
import {connect} from 'react-redux';
import {_SetCard, _ShowUp} from "../redux/actions";

class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            CardData: null
        }
    }

    componentWillUpdate(nextProps, nextState) {

    }

    componentDidMount() {
        this.setState(({CardData: this.props.data}));
        this.props._ShowUp(false)
    }


    render() {
        if (this.state.CardData === null) {
            return null
        }
        return (
            <div className="AddCard">
                <div className="AddCardBody col-8 ">
                    <div className="AddCardBodyClose c-p" onClick={() => {

                        this.props.onClose()
                    }
                    }>
                        CLOSE
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                        <div className="">
                            <b>{this.state.CardData.name}</b>
                            <p className="mb-0">tagline ( {this.state.CardData.tagline} ) </p>
                            <p className="mb-0">abv ( {this.state.CardData.abv} ) </p>
                            <p className="mb-0">description
                                ( {this.state.CardData.description.length >= 50 ? this.state.CardData.description.substr(0, 50) + "..." : this.state.CardData.description} ) </p>
                            <p className="mb-0">food_Pairing ( {this.state.CardData.food_pairing.join(",")} )</p>
                        </div>
                        <div className=""><img src={this.state.CardData.image_url} style={{width: "90%"}}/></div>
                    </div>
                    <div className="p-1 d-flex justify-content-end">

                            <span className="AddToCart" onClick={() => {

                                this.setState(({
                                    ShopList: "74px",
                                    ShowCart: false
                                }));
                                let data = this.props.Card
                                let pushData = this.props.data
                                pushData["count"] = 1
                                let flag = false

                                data.forEach(item => {

                                    if (Number(item.id) === Number(this.props.data.id)) {
                                        flag = true
                                    }
                                })
                                if (flag === false) {
                                    data = [pushData].concat(data)
                                }

                                this.props._SetCard(data)
                                if (this.props.ShowUp) {
                                    this.props._ShowUp(false)
                                } else {
                                    this.props._ShowUp(true)
                                }


                                this.props.onClose()
                            }
                            }>Add To Cart</span>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(
    mapStateToProps, {_SetCard, _ShowUp}
)(AddProduct);
