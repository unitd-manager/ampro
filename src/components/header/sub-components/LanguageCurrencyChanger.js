import PropTypes from "prop-types";
import React from "react";
import { changeLanguage } from "redux-multilanguage";
import { getUser } from "../../../common/user";

const LanguageCurrencyChanger = ({
  currency,
  setCurrency,
  currentLanguageCode,
  dispatch
}) => {
  const changeLanguageTrigger = e => {
    const languageCode = e.target.value;
    dispatch(changeLanguage(languageCode));
  };
const user=getUser();
  const setCurrencyTrigger = e => {
    const currencyName = e.target.value;
    setCurrency(currencyName);
  };

  return (
    <div className="language-currency-wrap">
      <div className="same-language-currency ">
        <span>
          Email : info@ampro.com
        </span>
        <div className="lang-car-dropdown">
          <ul>
            {/* <li>
              <button value="fn" onClick={e => changeLanguageTrigger(e)}>
                French
              </button>
            </li>
            <li>
              <button value="de" onClick={e => changeLanguageTrigger(e)}>
                Germany
              </button>
            </li> */}
          </ul>
        </div>
      </div>

      <div className="same-language-currency">
        <p>Call Us +65 9028 8134</p>
      </div>
     {user&& <div className="same-language-currency welcome-section">
        <p>Welcome, {user.first_name}</p>
      </div>}
      <style jsx="true">{`
  .language-currency-wrap {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  .welcome-section {
    margin-left: auto;
  }
`}</style>
    </div>
    
  );
};

LanguageCurrencyChanger.propTypes = {
  setCurrency: PropTypes.func,
  currency: PropTypes.object,
  currentLanguageCode: PropTypes.string,
  dispatch: PropTypes.func
};

export default LanguageCurrencyChanger;
