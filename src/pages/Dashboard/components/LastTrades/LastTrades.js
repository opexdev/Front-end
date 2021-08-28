import React, {useState, useEffect} from "react";
import classes from "./LastTrades.module.css";
import LastTradesTable from "./components/LastTradesTable/LastTradesTable";
import {useTranslation} from "react-i18next";
import axios from "axios";
import {connect} from "react-redux";
import {getLastTrades} from "./api/lastTrades";
import Error from "../../../../components/Error/Error";
import Loading from "../../../../components/Loading/Loading";

const LastTrades = (props) => {
  const {t} = useTranslation();
  const {activePair,accessToken} = props

  const [lastTrades, setLastTrades] = useState([]);
  const [error, setError] = useState(false);


const getLastTradesData = async () =>{
  const lastTradesReq = await getLastTrades(accessToken,activePair);

  if (lastTradesReq.status === 200) {
    setLastTrades(lastTradesReq.data)
  } else {
    setError(true)
  }
}


  useEffect(() => {
    getLastTradesData()
    const interval = setInterval(getLastTradesData, 10000);
    return () => clearInterval(interval);
  }, [props.activePair]);


  const content = () => {

    if (lastTrades.length === 0) {
      return <Loading/>
    }
    if (lastTrades.length > 0) {
      return <LastTradesTable data={lastTrades} />
    }
    if (error) {
      return <Error/>
    }

  }



  return (
    <div
      className={`container card-background card-border column ${classes.container}`}>
      <div
        className={`column border-bottom jc-center card-header-bg ${classes.header}`}>
        <div className="row jc-start ">
          <h3>{t("LastTrades.title")}</h3>
        </div>
      </div>
      <div className={`row container ${classes.content}`}>
        {content()}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    activePair: state.global.activePair,
    accessToken: state.auth.accessToken
  };
};

export default connect(mapStateToProps, null)(LastTrades);
