import {Component} from '@angular/core';
import {ApiRequestsService} from "../shared/api-requests.service";
import {Article} from "../shared/article";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent {
  articles!: Article[];

  constructor(private ar: ApiRequestsService) {
  }

  ngOnInit(): void {
    this.readAll();
  }

  // TODO implement the form to get filter parameter
  onFilter(): void {
//    this.filterArticles(this.selectedLanguage, this.selectedTopics)
  }

  readAll(): void {
    this.ar.getAll().subscribe(
      {
        next: (response) => {
          this.articles = response;
          console.log(this.articles);
          return this.articles;
        },
        error: (err) => console.log(err),
        complete: () => console.log('getAll() completed')
      })
  }

  filterArticles(languages: string[], topics: string[]): void {
    this.ar.getFiltered(languages, topics).subscribe(
      {
        next: (response) => {
          this.articles = response;
          console.log(this.articles);
          return this.articles;
        },
        error: (err) => console.log(err),
        complete: () => console.log('getFiltered() completed')
      })
  }
}
