import { Component, OnInit } from "@angular/core";
import { DataService } from "./service/data.service";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "Charu-xt";
  dev_name = "Charu";
  List_of_Years: any = [];
  List_of_Mission: any = [];
  Query_String = "";
  filterLaunch: any[] = [];
  filterLanding: any[] = [];
  constructor(
    private dataService: DataService,
    private router: Router,
    private _route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this._route.queryParams.subscribe((params) => {
      this.Query_String = Object.keys(params)
        .map((key) => key + "=" + params[key])
        .join("&");
      if (this.Query_String != "") {
        this.dataService.getFilteredLaunches(this.Query_String).subscribe(
          (data) => {
            this.List_of_Mission = data;
          },
          (error) => {
            console.error(error);
          }
        );
      } else {
        this.dataService.getAllLaunches().subscribe(
          (data) => {
            this.List_of_Mission = data;
          },
          (error) => {
            console.error(error);
          }
        );
      }
    });

    this.List_of_Years = this.dataService.launch_years;
  }

  clickedButton(event) {
    console.log(event);
    let temp = event.srcElement.parentNode;
    for (let i = 0; i < temp.childNodes.length; i++) {
      if (temp.childNodes[i].nodeName === "BUTTON") {
        if (temp.childNodes[i].classList.contains("active")) {
          temp.childNodes[i].classList.remove("active");
        }
      }
    }
    event.srcElement.classList.add("active");
  }
}
