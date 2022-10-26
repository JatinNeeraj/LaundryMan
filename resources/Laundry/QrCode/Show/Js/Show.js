import { ChangeClassFunc } from "../../../CommonFuncs/Header";
import { QrcodeShowHtmlFunc } from "../Js/HtmlFuncs/FromHbs";
import { CompletedShowFunc } from "./Dalfuncs";

let QrcodeShow = async (inEvent) => {
    if ((inEvent === undefined) === false) {
        let jVarLocalCurrentTarget = inEvent.currentTarget;
        ChangeClassFunc({ inHtmlControl: jVarLocalCurrentTarget });
    };

    let jVarLocalFromTemplate = await QrcodeShowHtmlFunc();

    var template = Handlebars.compile(jVarLocalFromTemplate);

    let jVarLocalDataNeeded = await CompletedShowFunc();

    if (jVarLocalDataNeeded.KTF === false) {
    
    };

    if ("KReason" in jVarLocalDataNeeded) {
        console.log("KError : ", jVarLocalDataNeeded.KReason);
    };

    let jVarLocalHtml = template(jVarLocalDataNeeded.JsonData);

    document.getElementById("KCont1").innerHTML = jVarLocalHtml;

    LocalSetFocusFunc();
};

let LocalSetFocusFunc = () => {
    let jVarLocalCustomerName = document.getElementById("SearchQrCodeTable");
    jVarLocalCustomerName.focus();
};


export { QrcodeShow };