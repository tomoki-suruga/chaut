import http from "k6/http"
export default function () {
  let res = http.get("https://chaut-dev.herokuapp.com")
}
