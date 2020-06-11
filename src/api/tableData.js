import request from "@/utils/request";


export function getTableInfo(currentPage,currentPerNum) {
  /*console.log("currentPage", currentPage);
  console.log("currentPerNum", currentPerNum);*/
  return request({
    url: "/getUser.do",
    method: "post",
    data: {
        pageNumber:currentPage,
        pageContent:currentPerNum 
    }
  });
}

