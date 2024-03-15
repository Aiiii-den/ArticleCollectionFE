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
  selectedLanguage: string[] = [];
  selectedTopic: string[] = [];

  constructor(private ar: ApiRequestsService) {
  }

  ngOnInit(): void {
    this.readAll();
  }

  /*
  // TODO implement the form to get filter parameter
  onFilter(): void {
      this.filterArticles(this.selectedLanguage, this.selectedTopics)
  }*/

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

  filterArticles(): void {
    // Pass searchQuery to service method for filtering
    this.ar.getFiltered(this.selectedLanguage,this.selectedTopic, ).subscribe({
      next: (response) => {
        this.articles = response;
        console.log(this.articles);
      },
      error: (err) => console.log(err),
      complete: () => console.log('Filtering completed')
    });
  }
}
