import React from 'react';
import classes from './PriceInfo.module.css'
import {useTranslation} from "react-i18next";
import {useGetMarketStats} from "../../../../../../../../queries";
import {useSelector} from "react-redux";
import Loading from "../../../../../../../../components/Loading/Loading";
import Error from "../../../../../../../../components/Error/Error";
import MostIncreasedPrice from "./components/MostIncreasedPrice/MostIncreasedPrice";
import MostDecreasedPrice from "./components/MostDecreasedPrice/MostDecreasedPrice";
import NullMarketStats from "../../../../../../../../components/NullMarketStats/NullMarketStats";

const PriceInfo = () => {

    const {t} = useTranslation();

    const interval = useSelector((state) => state.global.marketInterval)
    const {data:stats, isLoading, error} = useGetMarketStats(interval)
    const allSymbols = useSelector((state) => state.exchange.symbols)
    const mostIncreasedPrice = stats?.mostIncreasedPrice[0]
    const mostDecreasedPrice = stats?.mostDecreasedPrice[0]

    if(!isLoading) {
        mostIncreasedPrice.pairInfo = allSymbols.find(s => s.symbol === (mostIncreasedPrice?.symbol))
        mostDecreasedPrice.pairInfo = allSymbols.find(s => s.symbol === (mostDecreasedPrice?.symbol))
    }

    const mostIncreasedPriceContent = () => {
        if (isLoading) return <Loading/>
        if (error) return <Error/>
        // if (mostIncreasedPrice?.lastPrice === 0) return <NullMarketStats interval={interval}/>
        else return <MostIncreasedPrice mostIncreasedPrice={mostIncreasedPrice}/>
    }

    const mostDecreasedPriceContent = () => {
        if (isLoading) return <Loading/>
        if (error) return <Error/>
        // if (mostDecreasedPrice?.lastPrice === 0) return <NullMarketStats interval={interval}/>
        else return <MostDecreasedPrice mostDecreasedPrice={mostDecreasedPrice}/>
    }

    return (
        <div className={`${classes.container} row jc-between ai-center col-100`}>
            <div className={`card-background card-border height-100 col-48`}>
                <div className={`${classes.header} card-header-bg flex jc-center ai-center`}>
                    <span className={`text-orange`}>{t("MarketView.mostIncreased")}</span>
                </div>
                <div className={`${classes.content} column jc-around ai-center py-2 px-1`}>
                    {mostIncreasedPriceContent()}
                </div>
            </div>
            <div className={`card-background card-border height-100 col-48`}>

                <div className={`${classes.header} card-header-bg flex jc-center ai-center`}>
                    <span className={`text-orange`}>{t("MarketView.mostDecreased")}</span>
                </div>
                <div className={`${classes.content} column jc-around ai-center py-2 px-1`}>
                    {mostDecreasedPriceContent()}
                </div>

            </div>
        </div>
    );
};

export default PriceInfo;
