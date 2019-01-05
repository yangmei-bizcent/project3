
import {
  aixospatch,
  aixosput,
  axiosget,
  axiospost,
  axiosdel
} from "./config";

const menupost = (_url, data) => axiospost(`dynamic${_url}`, data);
const menuput = (_url, data) => aixosput(`dynamic${_url}`, data);
const menupatch = (_url, data) => aixospatch(`dynamic${_url}`, data);
const menuget = _url => axiosget(`dynamic${_url}`);
const menudel = (_url, data) => axiosdel(`dynamic${_url}`, data);

export const patienthomepageV2 = (platformHospitalId,dynamicfunctype,clientMobileType) => menuget(`/dynamic/func/patienthomepage/v2?platformHospitalId=${platformHospitalId}&dynamicfunctype=${dynamicfunctype}&module=homePage&clientMobileType=${clientMobileType}`);
