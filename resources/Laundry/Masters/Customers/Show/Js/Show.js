import { CustomersShowHtmlFunc } from "./HtmlFuns/FromHbs";
import { ChangeClassFunc } from "../../../../CommonFuncs/Header";
import { ShowDalFunc as CustomerShowDalFunc } from "./DalFuncs";
let CustomersShowFunc = async (inEvent) => {
    if ((inEvent === undefined) === false) {
        let jVarLocalCurrentTarget = inEvent.currentTarget;
        ChangeClassFunc({ inHtmlControl: jVarLocalCurrentTarget });
    };

    let jVarLocalFromTemplate = await CustomersShowHtmlFunc();

    var template = Handlebars.compile(jVarLocalFromTemplate);

    let jVarLocalDataNeeded = await CustomerShowDalFunc();

    if (jVarLocalDataNeeded.KTF === false) {

    };

    let jVarLocalHtml = template(jVarLocalDataNeeded.JsonData);

    document.getElementById("KCont1").innerHTML = jVarLocalHtml;

    LocalSetFocusFunc();
};

let LocalSetFocusFunc = () => {
    let jVarLocalCustomerName = document.getElementById("SearchQrCodeTable");
    jVarLocalCustomerName.focus();
};

export { CustomersShowFunc };