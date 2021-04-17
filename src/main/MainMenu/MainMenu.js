import React, {Fragment, useState, useEffect} from "react";
import classes from "./MainMenu.module.css";
import {images} from "../../assets/images";
import {Link, NavLink} from "react-router-dom";
import Icon from "../../components/Icon/Icon";
import ReactTooltip from "react-tooltip";
import * as Routes from "../../routes/routes";
import {useTranslation} from "react-i18next";
import MessagesSubMenu from "../SubMenu/components/MessagesSubMenu/MessagesSubMenu";

const MainMenu = (props) => {
  const {t} = useTranslation();

  const [messages, setMessages] = useState([]);
  const [showMessages, setShowMessages] = useState(false);

  useEffect(() => {
    ReactTooltip.rebuild();
  });

  return (
    <Fragment>
      <div
        className={`column ai-center jc-between mainMenu-background ${classes.container}`}>
        <div className={`column jc-start ai-center ${classes.tabs}`}>
          <Link to={Routes.Dashboard} onClick={() => setShowMessages(false)}>
            <span className="flex">
              <img
                className="img-lg"
                src={images.opexLogo_light}
                alt="opexLogo_light"
                title={t("title")}
                style={{height: "7.5vh"}}
              />
            </span>
          </Link>
          <NavLink
            exact={true}
            to={Routes.Dashboard}
            activeClassName={classes.selected}
            onClick={() => setShowMessages(false)}
            data-html={true}
            data-place="left"
            data-effect="float"
            data-tip={`<span class="column jc-between col-100">${t(
              "market.title",
            )}</span>`}>
            <Icon iconName="icon-market font-size-lg" />
          </NavLink>
          <NavLink
            exact={true}
            to={Routes.Wallet}
            activeClassName={classes.selected}
            onClick={() => setShowMessages(false)}
            data-html={true}
            data-place="left"
            data-effect="float"
            data-tip={`<span class="column jc-between col-100">${t(
              "wallet.title",
            )}</span>`}>
            <Icon iconName="icon-safe font-size-lg" />
          </NavLink>
          <NavLink
            exact={true}
            to={Routes.Technical}
            activeClassName={classes.selected}
            onClick={() => setShowMessages(false)}
            data-html={true}
            data-place="left"
            data-effect="float"
            data-tip={`
                         <span class="column jc-between col-100">${t(
                           "technical.title",
                         )}</span>`}>
            <Icon iconName="icon-account font-size-lg" />
          </NavLink>
        </div>
        <div className={`column jc-end ai-center`}>
          <span
            className={`text-color ${classes.messages} ${
              showMessages ? classes.selected : ""
            }`}
            onClick={() => setShowMessages((prevState) => !prevState)}
            data-html={true}
            data-place="left"
            data-effect="float"
            data-tip={`
                         <span class="column jc-between col-100">${t(
                           "messages.title",
                         )}</span>`}>
            <Icon iconName="icon-messages-dotted font-size-lg" />
          </span>

          <NavLink
            to={Routes.Settings}
            activeClassName={classes.selected}
            onClick={() => setShowMessages(false)}
            data-html={true}
            data-place="left"
            data-effect="float"
            data-tip={`
                         <span class="column jc-between col-100">${t(
                           "settings.title",
                         )}</span>`}>
            <Icon iconName="icon-settings font-size-lg" />
          </NavLink>
        </div>
      </div>

      <Fragment>
        <div
          className={`${classes.subMenu} ${showMessages ? classes.show : ""}`}>
          <MessagesSubMenu />
        </div>
        <div
          className={`${classes.subMenuWrapper} ${
            showMessages ? classes.show : ""
          }`}
          onClick={() => setShowMessages(false)}
        />
      </Fragment>
    </Fragment>
  );
};

export default MainMenu;
