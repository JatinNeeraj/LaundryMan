import { FindBookingHtmlFunc } from "./HtmlFuns/FromTemplate";

let StartFunc = async ({ inData, inCustomerName }) => {
    let jVarLocalFromHbs = await FindBookingHtmlFunc();

    let jVarLocalKCont1 = document.getElementById("KCont1");
    jVarLocalKCont1.innerHTML = jVarLocalFromHbs;

    console.log("inData : ", inCustomerName, inData);
};

export { StartFunc };