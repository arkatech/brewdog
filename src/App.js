import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {Get_Beers} from "./Api";
import AddProduct from "./Components/AddProduct";
import ShopList from "./Components/ShopList";

class App extends Component {


    constructor(props) {
        super(props);
        this.tabControl = React.createRef()
        this.state = {
            tabWidth: 0,
            tabInto: 0,
            CardData: null,
            index: 0,
            ShopList: "60px",
            ShowCart: false,
            AllList: [],
            PizzaList: [],
            SteakList: [],
            ShoplistShow: true,
            blur: false
        }
    }

    componentDidMount() {
        setTimeout(() => {
            console.log(this.tabControl)
            this.setState(({
                tabWidth: this.tabControl.firstChild.offsetWidth
            }));
            window.onresize = () => {
                this.setState(({
                    tabWidth: this.tabControl.firstChild.offsetWidth
                }));
            }
        }, 100)
        Get_Beers("pizza").then((r) => {
            this.setState(({
                PizzaList: r.data
            }));
        })
        Get_Beers("steak").then((r) => {
            this.setState(({
                SteakList: r.data
            }));
        })
        Get_Beers().then((r) => {
            this.setState(({
                AllList: r.data
            }));
        })


        document.addEventListener('touchstart', handleTouchStart.bind(this), false);
        document.addEventListener('touchmove', handleTouchMove.bind(this), false);

        var xDown = null;
        var yDown = null;

        function getTouches(evt) {
            return evt.touches ||             // browser API
                evt.originalEvent.touches; // jQuery
        }

        function handleTouchStart(evt) {
            const firstTouch = getTouches(evt)[0];
            xDown = firstTouch.clientX;
            yDown = firstTouch.clientY;
        };

        function handleTouchMove(evt) {
            if (!xDown || !yDown) {
                return;
            }

            var xUp = evt.touches[0].clientX;
            var yUp = evt.touches[0].clientY;

            var xDiff = xDown - xUp;
            var yDiff = yDown - yUp;

            if (Math.abs(xDiff) > Math.abs(yDiff)) {/*most significant*/
                if (xDiff > 0) {
                    /* left swipe */
                    clearTimeout(this.controle)
                    this.controle = setTimeout(() => {
                        if (this.state.index===0) {
                            if (this.state.tabInto === 0) {
                                this.setState(({
                                    tabInto: 1
                                }));
                                return
                            }
                            if (this.state.tabInto === 1) {
                                this.setState(({
                                    tabInto: 2
                                }));
                                return
                            }
                        }
                    }, 100)


                } else {
                    /* right swipe */
                    clearTimeout(this.controle)
                    this.controle = setTimeout(() => {
                        if (this.state.index===0){
                            if (this.state.tabInto === 1) {
                                this.setState(({
                                    tabInto: 0
                                }));
                                return
                            }
                            if (this.state.tabInto === 2) {
                                this.setState(({
                                    tabInto: 1
                                }));
                                return
                            }
                        }

                    }, 100)
                }
            } else {
                if (yDiff > 0) {
            // top
                } else {

                }
            }
            /* reset values */
            xDown = null;
            yDown = null;
        };

    }

    blur(e) {
        this.setState(({
            blur: e
        }));
    }

    render() {
        return (
            <div>

                {this.state.ShowCart && <AddProduct data={this.state.CardData} onClose={() => {
                    this.setState(({
                        ShowCart: false
                    }));
                }}/>}
                   <ShopList blur={this.blur.bind(this)} isShow={this.state.ShoplistShow}/>
                {this.state.blur && <div className="position-fixed h-100 w-100" style={{zIndex:1}} onClick={()=>{
                    this.setState(({
                        ShoplistShow:false,
                        blur:false,
                    }));
                    setTimeout(()=>{
                        this.setState(({
                            ShoplistShow:true
                        }));

                    },10)
                }}> </div>}
                <div className="App" style={{filter: this.state.ShowCart || this.state.blur ? "blur(2px)" : "unset"}} >

                    <div className="HeaderTab text-center">
                        <p className="m-0 p-3"><b>Demo App</b></p>
                        <div className="tabRow position-relative" ref={tab => this.tabControl = tab}>

                            <div onClick={() => {
                                this.setState(({
                                    index: 0,
                                    tabInto: 0
                                }));
                            }}><span><img src={require("./imges/coffie.png")} alt=""/></span></div>
                            <div onClick={() => {
                                this.setState(({
                                    index: 1,
                                    tabInto: 0

                                }));
                            }}><span><img src={require("./imges/food.png")} alt=""/></span></div>
                            <div onClick={() => {
                                this.setState(({
                                    index: 2,
                                    tabInto: 0

                                }));
                            }}><span><img src={require("./imges/offer.png")} alt=""/></span></div>
                            <div onClick={() => {
                                this.setState(({
                                    index: 3,
                                    tabInto: 0

                                }));
                            }}><span onClick={() => {
                                this.setState(({
                                    index: 4,
                                    tabInto: 0

                                }));
                            }}><img src={require("./imges/search.png")} alt=""/></span></div>
                            <div className="TabHover " style={{
                                width: `${this.state.tabWidth}px`,
                                left: `${this.state.index * this.state.tabWidth}px`
                            }}/>
                        </div>
                    </div>
                    <div className="contentControl">
                        <div className=" position-relative d-flex ControlRowChange"
                             style={{left: (this.state.index * window.innerWidth) * -1, width: window.innerWidth * 4}}>


                            <div className="contentInto" style={{width: window.innerWidth}}>
                                <div className="contentIntoTabs">

                                    <div className="contentIntoTabsHeader">
                                        <div style={{color: this.state.tabInto === 0 ? "white" : "rgb(199, 193, 193)"}}
                                             onClick={() => {
                                                 this.setState(({
                                                     tabInto: 0
                                                 }));
                                             }}>ALL
                                        </div>
                                        <div style={{color: this.state.tabInto === 1 ? "white" : "rgb(199, 193, 193)"}}
                                             onClick={() => {
                                                 this.setState(({
                                                     tabInto: 1
                                                 }));
                                             }}>PIZZA
                                        </div>
                                        <div style={{color: this.state.tabInto === 2 ? "white" : "rgb(199, 193, 193)"}}
                                             onClick={() => {
                                                 this.setState(({
                                                     tabInto: 2
                                                 }));
                                             }}>STEAK
                                        </div>


                                    </div>
                                    <div className="contentIntoTabsContent">
                                        <div className="position-relative d-flex ControlRowChange" style={{
                                            width: window.innerWidth * 3,

                                            left: this.state.tabInto * window.innerWidth * -1
                                        }}>

                                            <div className="contentInto"
                                                 style={{width: window.innerWidth,height:window.innerHeight-200}}>

                                                {this.state.AllList.map(item => (
                                                    <div className="col-4 col-lg-3 text-center p-0" key={item.id}
                                                         onClick={() => {
                                                             this.setState(({
                                                                 ShowCart: true,
                                                                 CardData: item
                                                             }));
                                                         }}>
                                                        <div className="ProductContent">
                                                            <div className="ProductContentBox text-center">
                                                                <img src={item.image_url}
                                                                     style={{height: "100px", width: "50px"}} alt=""/>


                                                            </div>
                                                            <p className="m-0">
                                                                {item.name.length >= 20 ? item.name.substr(0, 20) + "..." : item.name}
                                                                 ( {item.abv} )
                                                            </p>
                                                        </div>
                                                    </div>

                                                ))}
                                          

                                            </div>
                                            <div className="contentInto" style={{width: window.innerWidth,height:window.innerHeight-200}}>


                                                {this.state.PizzaList.map(item => (
                                                    <div className="col-4 col-lg-3 text-center p-0" key={item.id}
                                                         onClick={() => {
                                                             this.setState(({
                                                                 ShowCart: true,
                                                                 CardData: item
                                                             }));
                                                         }}>
                                                        <div className="ProductContent">
                                                            <div className="ProductContentBox text-center">
                                                                <img src={item.image_url}
                                                                     style={{height: "100px", width: "50px"}} alt=""/>


                                                            </div>
                                                            <p className="m-0">
                                                                {item.name.length >= 20 ? item.name.substr(0, 20) + "..." : item.name}
                                                                ( {item.abv} )
                                                            </p>
                                                        </div>
                                                    </div>

                                                ))}
                                             
<div className="w-100 pt-5 pb-5"></div>

                                            </div>
                                            <div className="contentInto" style={{width: window.innerWidth,height:window.innerHeight-200}}>

                                                {this.state.SteakList.map(item => (
                                                    <div className="col-4 col-lg-3 text-center p-0" key={item.id}
                                                         onClick={() => {
                                                             this.setState(({
                                                                 ShowCart: true,
                                                                 CardData: item
                                                             }));
                                                         }}>
                                                        <div className="ProductContent">
                                                            <div className="ProductContentBox text-center">
                                                                <img src={item.image_url}
                                                                     style={{height: "100px", width: "50px"}} alt=""/>


                                                            </div>
                                                            <p className="m-0">
                                                                {item.name.length >= 20 ? item.name.substr(0, 20) + "..." : item.name}
                                                                ( {item.abv} )
                                                            </p>
                                                        </div>
                                                    </div>

                                                ))}
                                                <br/><br/><br/>

                                            </div>


                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="contentInto" style={{width: window.innerWidth}}>
                                <div className="contentIntoTabs">

                                    <div className="contentIntoTabsHeader">
                                        <div style={{color: this.state.tabInto === 0 ? "white" : "rgb(199, 193, 193)"}}
                                             onClick={() => {
                                                 this.setState(({
                                                     tabInto: 0
                                                 }));
                                             }}>ALL FOOD
                                        </div>


                                    </div>
                                    <div className="contentIntoTabsContent">
                                        <div className="position-relative d-flex ControlRowChange" style={{
                                            width: window.innerWidth * 1,
                                            left: this.state.tabInto * window.innerWidth * -1
                                        }}>
                                            <div
                                                className="contentInto d-flex align-items-center justify-content-center "
                                                style={{width: window.innerWidth}}>

                                                <b className="p-2 pt-5">Put Whatever you want here for the extras</b>

                                            </div>


                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="contentInto" style={{width: window.innerWidth}}>
                                <div className="contentIntoTabs">

                                    <div className="contentIntoTabsHeader">


                                    </div>
                                    <div className="contentIntoTabsContent">
                                        <div className="position-relative d-flex ControlRowChange" style={{
                                            width: window.innerWidth * 1,
                                            left: this.state.tabInto * window.innerWidth * -1
                                        }}>
                                            <div className="contentInto" style={{width: window.innerWidth}}>


                                            </div>


                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="contentInto" style={{width: window.innerWidth}}>
                                <div className="contentIntoTabs">

                                    <div className="contentIntoTabsHeader">


                                    </div>
                                    <div className="contentIntoTabsContent">
                                        <div className="position-relative d-flex ControlRowChange" style={{
                                            width: window.innerWidth * 1,
                                            left: this.state.tabInto * window.innerWidth * -1
                                        }}>
                                            <div className="contentInto  " style={{width: window.innerWidth}}>

                                            </div>


                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default App;