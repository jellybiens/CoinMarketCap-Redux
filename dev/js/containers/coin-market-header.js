import React, {Component} from 'react';
import coinmarketlogo from '../images/coinmarketcaplogo.png';
import caption from '../images/searchcompareinvest.png';
import githubImg from '../images/github.png';
import linkedinImg from '../images/linkedin.png';
import twitterImg from '../images/twitter.png';


class CoinMarketHeader extends Component{



    render() {

      let links = (<div className="links-container">
                    <div className="links-list">
                      <a href="https://twitter.com/jellybiens_"><img src={twitterImg} /></a>
                      <a href="https://www.linkedin.com/in/ethan-w-a1676a92/"><img src={linkedinImg} /></a>
                      <a href="https://github.com/jellybiens"><img src={githubImg} /></a>
                      <a href="https://ethanwatsonreactcv.herokuapp.com/">Ethan Watson React CV</a>
                    </div>
                  </div>)



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
