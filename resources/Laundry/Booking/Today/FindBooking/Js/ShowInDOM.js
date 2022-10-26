import { FindBookingHtmlFunc } from "./HtmlFuns/FromTemplate";

let StartFunc = async () => {
    let jVarLocalFromHbs = await FindBookingHtmlFunc();

    let jVarLocalKCont1 = document.getElementById("KCont1");
    jVarLocalKCont1.innerHTML = jVarLocalFromHbs;
};

export { StartFunc };