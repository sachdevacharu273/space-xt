import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class DataService {
  launch_years = [
    "2006",
    "2007",
    "2008",
    "2009",
    "2010",
    "2011",
    "2012",
    "2013",
    "2014",
    "2015",
    "2016",
    "2017",
    "2018",
    "2019",
    "2020",
  ];
  base_url = "https://api.spacexdata.com/v3/launches?limit=100";

  constructor(private http: HttpClient) {}

  getAllLaunches() {
    return this.http.get(this.base_url);
  }

  getFilteredLaunches(filterString) {
    return this.http.get(this.base_url + `&${filterString}`);
  }
}
