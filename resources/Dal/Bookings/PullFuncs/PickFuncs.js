import { StartFunc as FuncsForPkStartFunc } from "../FuncsForPk/Start";
//import { StartFunc as QrCodesStartFunc } from "../../QrCodes/PullFuncs/Original";
import { StartFunc as QrCodesStartFunc } from "../../QrCodes/PullFuncs/WithBookingData";

import _ from "../../../js/lodash";

let FromPk = async ({ inRowPK }) => {
    let LocalJsonFileName = "Bookings.json";

    let LocalReturnObject = { KTF: false, KResult: "" };

    let LocalCustomersData = await Neutralino.filesystem.readFile(`./KData/JSON/2017/${LocalJsonFileName}`);
    let LocalCustomersDataAsJson = JSON.parse(LocalCustomersData);

    if (inRowPK in LocalCustomersDataAsJson) {
        LocalReturnObject.KTF = true;
        LocalReturnObject.KResult = LocalCustomersDataAsJson[inRowPK];
        LocalReturnObject.KResult = { ...LocalReturnObject.KResult, OrderNo: inRowPK };
    };

    return await LocalReturnObject;
};

let FromPkForQrCodes = async ({ inRowPK }) => {
    let LocalReturnObject = { KTF: false, KResult: "" };
    let LocalFromOriginalData = await FromPk({ inRowPK });

    if (LocalFromOriginalData.KTF === false) {
        LocalReturnObject.KReason = LocalFromOriginalData.KReason;
        return await LocalReturnObject;
    };

    LocalReturnObject.KTF = true;
    LocalReturnObject.ForQrCode = LocalFromOriginalData.KResult;

    let LocalGarmentsArray = Object.values(LocalReturnObject.ForQrCode.GarmentDetails).map(
        (LoopItem) => {
            return `${LoopItem.Name}:${LoopItem.Pcs}`
        }
    );

    let LocalGarmentsPcsArray = Object.values(LocalReturnObject.ForQrCode.GarmentDetails).map(LoopItem => LoopItem.Pcs);

    LocalReturnObject.ForQrCode.GarmentDetailsAsString = LocalGarmentsArray.toString();
    LocalReturnObject.ForQrCode.GarmentPcsTotal = LocalGarmentsPcsArray.reduce((a, b) => a + b, 0);

    console.log("LocalGarmentsPcsArray.ForQrCode : ", LocalGarmentsPcsArray);
    return await LocalReturnObject;
};

let FromPkWithQrCodeObject = async ({ inRowPK }) => {
    let LocalReturnObject = { KTF: false, KResult: "" };
    let LocalFromOriginalData = await FromPk({ inRowPK });

    if (LocalFromOriginalData.KTF === false) {
        LocalReturnObject.KReason = LocalFromOriginalData.KReason;
        return await LocalReturnObject;
    };

    LocalReturnObject.KTF = true;
    LocalReturnObject.ForQrCode = LocalFromOriginalData.KResult;

    let LocalFromQrCodesStartFunc = await QrCodesStartFunc();

    if (LocalFromQrCodesStartFunc.KTF === false) {
        LocalReturnObject.KReason = LocalFromQrCodesStartFunc.KReason;
        return await LocalReturnObject;
    };

    let LocalQrCodesNeeded = _.filter(LocalFromQrCodesStartFunc.JsonData, { BookingRef: inRowPK });
    let LocalKeyNeeded = ["GarmentsRef", "GarmentName", "QrCode"];

    let LocalQrCodesNeededWithKeys = _.map(LocalQrCodesNeeded, LoopItem => _.pick(LoopItem, LocalKeyNeeded));
    LocalReturnObject.ForQrCode.QrCodesArray = LocalQrCodesNeededWithKeys;

    return await LocalReturnObject;
};

let LastPkData = async () => {
    let LocalReturnObject = { KTF: false, KResult: "" };
    let LocalFromFromPk;

    let LocalFromFuncsForPkStartFunc = await FuncsForPkStartFunc();

    if (LocalFromFuncsForPkStartFunc.KTF === false) {
        LocalReturnObject.KReason = LocalFromFuncsForPkStartFunc.KReason;
        return await LocalReturnObject;
    };

    LocalFromFromPk = await FromPk({ inRowPK: LocalFromFuncsForPkStartFunc.LastPk });

    if (LocalFromFromPk.KTF === false) {
        LocalReturnObject.KReason = LocalFromFromPk.KReason;
        return await LocalReturnObject;
    };

    LocalReturnObject.KResult = LocalFromFromPk.KResult;
    LocalReturnObject.KTF = true;

    return await LocalReturnObject;

};

export { FromPk, LastPkData, FromPkForQrCodes, FromPkWithQrCodeObject };