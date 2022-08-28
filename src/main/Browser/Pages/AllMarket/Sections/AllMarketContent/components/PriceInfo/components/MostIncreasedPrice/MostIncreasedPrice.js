import React from 'react';
import {images} from "../../../../../../../../../../assets/images";
import i18n from "i18next";
import {BN} from "../../../../../../../../../../utils/utils";
import {useTranslation} from "react-i18next";

const MostIncreasedPrice = ({mostIncreasedPrice}) => {

    const {t} = useTranslation();

    return (
        <>
            <img  src={images[mostIncreasedPrice?.pairInfo?.baseAsset]}
                  alt={mostIncreasedPrice?.pairInfo?.baseAsset}
                  title={mostIncreasedPrice?.pairInfo?.baseAsset}
                  className={`img-md-plus`}/>
            <span>{t("currency." + mostIncreasedPrice?.pairInfo?.baseAsset)}</span>
            <div className={`${i18n.language !== "fa" ? 'row-reverse' : 'row'} jc-center ai-center width-100 text-green`}>
                <span className={`${i18n.language !== "fa" ? 'mr-025' : 'ml-025'} font-size-sm-mini`}>{mostIncreasedPrice?.pairInfo?.quoteAsset}</span>
                <span className={`${i18n.language !== "fa" ? 'mL-025' : 'mr-025'} font-size-md`}>{new BN(mostIncreasedPrice?.lastPrice).toFormat()}</span>
            </div>
            <div className={`row jc-center ai-center width-100 text-green`}>
                <span>% {new BN(mostIncreasedPrice?.priceChangePercent).toFormat(2)}+</span>
            </div>
        </>
    );
};

export default MostIncreasedPrice;
