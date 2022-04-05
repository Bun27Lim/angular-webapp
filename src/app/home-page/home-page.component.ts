import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { APIResponse, Game } from '../models';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  public sort: string;
  public items: Array<Game>;
  public platform: string;

  //Variable to retain search
  public currentSearch: string;

  private router: Router;

  constructor(
    //Declare objects
    private httpsService: HttpService,
    private activatedRoute: ActivatedRoute

  ) { }

  //Default search games
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {

      console.log(params['search-input'], params)

      if (params['search-input']) {

        //Set search variable
        this.currentSearch = params['search-input'];

        console.log("Activated Route Called 1")

        //Metacrit sort has more exposure
        this.searchGames('metacrit', params['search-input']);


      } else {
        console.log("Activated Route Called 2")
        this.searchGames('metacrit', this.currentSearch);
      }
    });
  }

  //Function parameters are what the games are sorted by and what was submitted
  //?Is not mandatory
  //Returns nothing
  searchGames(sort: string, search?: string): void{

    console.log("Game", search);

    if(search) {
      this.currentSearch = search;
    }

    //If search input doesn't exist then reset the search params.

    //Class Created calls getGameList in httpsService
    this.httpsService
    .getGameList(sort, this.currentSearch)
    .subscribe((gameList: APIResponse<Game>) => { //.subscribe pushes the api response into an observable.
      this.items = gameList.results;
      console.log(gameList);
    });
  }

  //Check for somewhat redundant platforms
  checkPlatform(platform: string): boolean{
    if(platform == "pc"
    || platform == "nintendo"
    || platform == "xbox"
    || platform == "playstation"
    || platform == "android"){
      return true;
    }

    return false;
  }

}
