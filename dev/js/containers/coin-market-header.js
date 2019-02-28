import React, {Component} from 'react';
import coinmarketlogo from '../images/coinmarketcaplogo.png';


class CoinMarketHeader extends Component{



    render() {
        return (
            <div className="header">
              <div className="logo-container">
                <img src={coinmarketlogo} className="logo" />
              </div>
            </div>
        );
    }

}


export default CoinMarketHeader;
