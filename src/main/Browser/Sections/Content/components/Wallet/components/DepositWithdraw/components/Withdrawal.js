import classes from "../DepositWithdraw.module.css";
import TextInput from "../../../../../../../../../components/TextInput/TextInput";
import Button from "../../../../../../../../../components/Button/Button";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {Trans, useTranslation} from "react-i18next";
import {sendWithdrawReq} from "../../../api/wallet";
import {BN, parsePriceString} from "../../../../../../../../../utils/utils";
import {toast} from "react-hot-toast";
import {images} from "../../../../../../../../../assets/images";
import NumberInput from "../../../../../../../../../components/NumberInput/NumberInput";
import IRT from "./Deposit/components/IRT/IRT";

const Withdrawal = () => {
    const {t} = useTranslation();
    const {id} = useParams();
    const wallets = useSelector(state => state.auth.wallets);

    const [amount, setAmount] = useState({
        value: "0",
        alert: null,
    });
    const [address, setAddress] = useState({
        value: "",
        alert: null,
    });

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setAmount({value: "0", alert: null})
        setAddress({value: "", alert: null})
    }, [id]);

    const network = (id) => {
        switch (id) {
            case  "BTC":
                return 'Bit';
            case "ETH":
                return 'ethereum-ropsten';
            /*case "USDT":
                return '';*/
            default:
                return 'ethereum-ropsten';
        }
    };
    const calculateFee = (id) => {
        switch (id) {
            case "BTC":
                return 0.00035;
            case "ETH":
                return 0.005;
            case "USDT":
                return 10;
            default:
                return 0;
        }
    };

    const sendWithdrawHandler = async () => {
        if (isLoading) return false
        setIsLoading(true)
        sendWithdrawReq(amount.value, id, address.value, calculateFee(id), network(id)).then((r) =>{
            console.log(r)
            setIsLoading(false)
            setAmount({value: "0", alert: null})
            setAddress({value: "", alert: null})
            toast.success(<Trans
                i18nKey="DepositWithdrawTx.success"
                values={{
                    asset: t("currency." + id),
                    amount: amount.value,
                }}
            />);
        })
    }

    const submitButtonTextHandler = () => {
        if (isLoading) {
            return <img className={`${classes.thisLoading}`} src={images.linearLoadingBgOrange} alt="linearLoading"/>
        }
        return t('DepositWithdrawTx.withdrawReqSubmit')
    }

    const fillByWallet = () => {
        setAmount({
            value: wallets[id].free,
            alert: null
        })
    };


    const fillByMinWithdraw = () => {
        setAmount({
            value: new BN(calculateFee(id)).multipliedBy(1.1).toString(),
            alert: null
        })
    };


    if(id === "IRT") {
        return <div className={`flex jc-center ai-center px-1 py-2`} style={{height: "100%"}}>
            <h3>{t("comingSoon")}</h3>
        </div>
    }



    return (
        <div className={`px-1 py-2 column jc-between ${classes.content}`}>
            <div className="container row jc-between height-100">
                <div className="col-30 column jc-between">
                    <NumberInput
                        lead={t('volume') + " " + t("currency." + id)}
                        value={amount.value}
                        alert={amount.alert}
                        customClass={classes.withdrawNumberInput}
                        onchange={(e) =>
                            setAmount({...amount, value: parsePriceString(e.target.value)})
                        }
                        type="text"
                    />
                    <span>
                        {t("DepositWithdrawTx.freeWallet")}: <span className={`hover-text cursor-pointer`} onClick={() => {
                        fillByWallet()
                    }}>{wallets[id].free} {t("currency." + id)}</span>
                    </span>
                    <span>
                        {t('DepositWithdrawTx.minWithdraw')}: <span className={`hover-text cursor-pointer`} onClick={() => {
                        fillByMinWithdraw()
                    }}>{new BN(calculateFee(id)).multipliedBy(1.1).toString()} {t("currency." + id)}</span>
                    </span>
                    <span>
                        {t('DepositWithdrawTx.maxWithdraw')}: <span>2 {t("currency." + id)}</span>
                    </span>
                    <span>
                        {t('DepositWithdrawTx.maxMonthWithdraw')}: <span>2 {t("currency." + id)}</span>
                    </span>
                </div>
                <div className="col-70 pr-1 column jc-between">
                    <div className="column">
                        <TextInput
                            lead={t("DepositWithdrawTx.destAddress") + " " + t("currency." + id)}
                            customClass={classes.withdrawalInput}
                            type="text"
                            value={address.value}
                            alert={address.alert}
                            onchange={(e) =>
                                setAddress({...address, value: e.target.value})
                            }
                        />
                        <span className="pt-05 text-end">{t('DepositWithdrawTx.withdrawWarn')}</span>
                    </div>
                    <div className="row jc-between ai-center">
                        <div className="column">
                            <span>
                                {t('commission')}: <span className={`text-orange`}>{amount.value ? calculateFee(id) : 0} </span> <span>{t("currency." + id)}</span>
                            </span>
                            <span>
                                {t('DepositWithdrawTx.reqAmount')}: <span className={`text-green`}>{new BN(amount.value).minus(new BN(calculateFee(id))).isGreaterThan(0) ? new BN(amount.value).minus(new BN(calculateFee(id))).toFormat() : 0} </span> <span>{t("currency." + id)}</span>
                            </span>
                        </div>
                        <Button
                            buttonClass={`${classes.thisButton} ${classes.withdrawal} ${isLoading ? "cursor-not-allowed" : "cursor-pointer"}`}
                            buttonTitle={submitButtonTextHandler()}
                            disabled={!(new BN(amount.value).minus(new BN(calculateFee(id))).isGreaterThan(0)) || address.value.length <= 0 }
                            onClick={sendWithdrawHandler}
                        />
                    </div>
                </div>
            </div>
            <div className="pt-1">
                 <span>{t('DepositWithdraw.securityConsiderations')}</span>
            </div>
        </div>
    )
};

export default Withdrawal;