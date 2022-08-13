import React from "react";
import classes from "./OrderBook.module.css";
import OrderBookTable from "./components/OrderBookTable/OrderBookTable";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import OrderBookTableSafari from "./components/OrderBookTableSafari/OrderBookTableSafari";
import {isSafari} from "react-device-detect";
import Error from "../../../../../../../../../../components/Error/Error";
import Loading from "../../../../../../../../../../components/Loading/Loading";
import {useOrderBook} from "../../../../../../../../../../queries";


const OrderBook = () => {
    const {t} = useTranslation();
    const activePair = useSelector((state) => state.exchange.activePair)
    const {data, isLoading, error} = useOrderBook(activePair.symbol)

    const tableRender = () => {
        if (error) return <Error/>
        if (isLoading) return <Loading/>

        if (isSafari) {
            return <>
                <OrderBookTableSafari data={data.asks}/>
                <OrderBookTableSafari data={data.bids} type="buy"/>
            </>
        } else {
            return <>
                <OrderBookTable data={data.asks}/>
                <OrderBookTable data={data.bids} type="buy"/>
            </>
        }
    }

    return (
        <div className={`container card-background card-border my-2 column ${classes.container}`}>
            <div className={`column border-bottom jc-between header-radius card-header-bg ${classes.header}`}>
                <div className="row jc-start">
                    <h3>
                        {t("orderBook.title")} ({t("currency." + activePair.baseAsset)}/
                        {t("currency." + activePair.quoteAsset)})
                    </h3>
                </div>
                <div className="row jc-center">
                    <span className="text-red">{t("sell")}</span>
                    <span className="text-green">{t("buy")}</span>
                </div>
            </div>
            <div className={`row container ${classes.content}`}>
                {tableRender()}
            </div>
        </div>
    );
};

export default OrderBook;