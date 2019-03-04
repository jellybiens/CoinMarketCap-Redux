import React, {Component} from 'react';
import coinmarketlogo from '../images/coinmarketcaplogo.png';
import caption from '../images/searchcompareinvest.png';
import githubImg from '../images/github.png';
import linkedinImg from '../images/linkedin.png';
import twitterImg from '../images/twitter.png';


class CoinMarketHeader extends Component{



    render() {




        return (
            <div className="header">
              <div className="logo-cointainer">
                <div className="logo-flex-cointainer">
                  <img className="logo" src={coinmarketlogo} />
                </div>
                </div>
            </div>
        );
    }

}


export default CoinMarketHeader;
