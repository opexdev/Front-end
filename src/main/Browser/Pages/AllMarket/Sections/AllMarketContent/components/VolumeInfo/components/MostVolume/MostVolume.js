import React from 'react';
import {images} from "../../../../../../../../../../assets/images";
import i18n from "i18next";
import {BN} from "../../../../../../../../../../utils/utils";
import {useTranslation} from "react-i18next";

const MostVolume = ({mostVolume}) => {

    const {t} = useTranslation();

    return (
        <>
            <img src={images[mostVolume?.pairInfo?.baseAsset]}
                 alt={mostVolume?.pairInfo?.baseAsset}
                 title={mostVolume?.pairInfo?.baseAsset}
                 className={`img-md-plus`}/>
            <span>{t("currency." + mostVolume?.pairInfo?.baseAsset)}</span>
            <div className={`${i18n.language !== "fa" ? 'row-reverse' : 'row'} jc-center ai-center width-100 text-green`}>
                <span className={`${i18n.language !== "fa" ? 'mr-025' : 'ml-025'} font-size-sm-mini`}>{mostVolume?.pairInfo?.quoteAsset}</span>
                <span className={`${i18n.language !== "fa" ? 'mL-025' : 'mr-025'} font-size-md`}>{new BN(mostVolume?.volume).toFormat()} </span>
            </div>
            <div className={`row jc-center ai-center width-100 text-green`}>
                <span>% {new BN(mostVolume?.change).toFormat(2)}+</span>
            </div>
        </>
    );
};

export default MostVolume;
